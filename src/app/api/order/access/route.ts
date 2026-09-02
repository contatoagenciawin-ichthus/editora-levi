import { NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { ensureDigitalEntitlements, markOrderPaid } from '@/lib/fulfillment'
import { createDownloadSecret, sha256 } from '@/lib/security'
import { getStripe } from '@/lib/stripe'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { sessionId?: string; deviceId?: string }
    const sessionId = body.sessionId?.trim() || ''
    const deviceId = body.deviceId?.trim() || ''

    if (!sessionId || sessionId.length > 255) {
      return NextResponse.json({ error: 'Sessão de pagamento inválida.' }, { status: 400 })
    }

    const stripe = getStripe()
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    const orderId = session.metadata?.order_id

    if (!orderId) {
      return NextResponse.json({ error: 'Pedido não localizado.' }, { status: 404 })
    }

    const paid = session.payment_status === 'paid' || session.payment_status === 'no_payment_required'

    if (!paid) {
      return NextResponse.json({
        status: 'processing',
        paid: false,
        message: 'O pagamento ainda está sendo confirmado.',
      })
    }

    await markOrderPaid({
      orderId,
      paymentIntentId:
        typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id || null,
      paymentMethod: session.payment_method_types?.[0] || null,
    })

    const sql = getSql()
    const orders = await sql`
      SELECT id, public_id, status, fulfillment_status, total_cents
      FROM orders
      WHERE id = ${orderId} AND stripe_checkout_session_id = ${sessionId}
      LIMIT 1
    `
    const order = orders[0]

    if (!order) {
      return NextResponse.json({ error: 'Pedido não localizado.' }, { status: 404 })
    }

    const itemRows = await sql`
      SELECT format
      FROM order_items
      WHERE order_id = ${orderId}
    `
    const formats = itemRows.map((item) => String(item.format))
    const physical = formats.includes('physical')
    const totalCents = Number(order.total_cents || 0)

    if (physical) {
      return NextResponse.json({
        status: 'paid',
        paid: true,
        publicId: order.public_id,
        physical: true,
        fulfillmentStatus: order.fulfillment_status,
        totalCents,
        formats,
        downloads: [],
      })
    }

    if (!deviceId || deviceId.length < 16 || deviceId.length > 180) {
      return NextResponse.json({ error: 'Identificação do dispositivo inválida.' }, { status: 400 })
    }

    await ensureDigitalEntitlements(orderId)

    const entitlements = await sql`
      SELECT
        de.id,
        de.format,
        de.status,
        de.max_downloads,
        de.max_devices,
        de.download_count,
        de.copy_fingerprint
      FROM digital_entitlements de
      JOIN order_items oi ON oi.id = de.order_item_id
      WHERE oi.order_id = ${orderId}
      ORDER BY de.format
    `

    const deviceHash = sha256(deviceId)
    const downloads: Array<{
      format: string
      url: string
      remainingDownloads: number
    }> = []

    for (const entitlement of entitlements) {
      if (entitlement.status !== 'active') continue

      const existingDevice = await sql`
        SELECT id
        FROM entitlement_devices
        WHERE entitlement_id = ${entitlement.id as string}
          AND device_hash = ${deviceHash}
        LIMIT 1
      `

      if (!existingDevice.length) {
        const deviceCountRows = await sql`
          SELECT count(*)::int AS total
          FROM entitlement_devices
          WHERE entitlement_id = ${entitlement.id as string}
        `
        const deviceCount = Number(deviceCountRows[0]?.total || 0)
        const maxDevices = Number(entitlement.max_devices)

        if (deviceCount >= maxDevices) {
          continue
        }

        await sql`
          INSERT INTO entitlement_devices (entitlement_id, device_hash)
          VALUES (${entitlement.id as string}, ${deviceHash})
          ON CONFLICT (entitlement_id, device_hash) DO UPDATE
          SET last_seen_at = now()
        `
      } else {
        await sql`
          UPDATE entitlement_devices
          SET last_seen_at = now()
          WHERE entitlement_id = ${entitlement.id as string}
            AND device_hash = ${deviceHash}
        `
      }

      const remainingDownloads = Number(entitlement.max_downloads) - Number(entitlement.download_count)
      if (remainingDownloads <= 0) continue

      const secret = createDownloadSecret()
      const tokenHash = sha256(`${secret}:${deviceHash}`)
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000)

      await sql`
        INSERT INTO download_tokens (entitlement_id, token_hash, expires_at)
        VALUES (${entitlement.id as string}, ${tokenHash}, ${expiresAt.toISOString()})
      `

      downloads.push({
        format: String(entitlement.format).toUpperCase(),
        url: `/api/download/${secret}?d=${encodeURIComponent(deviceId)}`,
        remainingDownloads,
      })
    }

    return NextResponse.json({
      status: 'paid',
      paid: true,
      publicId: order.public_id,
      physical: false,
      totalCents,
      formats,
      downloads,
    })
  } catch (error) {
    console.error('order_access_error', error)
    return NextResponse.json({ error: 'Não foi possível validar este pedido agora.' }, { status: 500 })
  }
}
