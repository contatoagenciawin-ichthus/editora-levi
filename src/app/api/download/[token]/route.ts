import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { createProtectedDownloadUrl, isR2Configured } from '@/lib/r2'
import { sanitizeFilePart, sha256 } from '@/lib/security'

export const runtime = 'nodejs'

async function registerEvent(entitlementId: string, deviceHash: string, result: string, request: NextRequest) {
  try {
    const sql = getSql()
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || ''
    const userAgent = request.headers.get('user-agent') || ''

    await sql`
      INSERT INTO download_events (entitlement_id, device_hash, ip_hash, user_agent_hash, result)
      VALUES (
        ${entitlementId},
        ${deviceHash || null},
        ${ip ? sha256(ip) : null},
        ${userAgent ? sha256(userAgent) : null},
        ${result}
      )
    `
  } catch (error) {
    console.error('download_event_error', error)
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ token: string }> },
) {
  const { token } = await context.params
  const deviceId = request.nextUrl.searchParams.get('d') || ''

  if (!token || !deviceId || deviceId.length < 16) {
    return NextResponse.json({ error: 'Link inválido.' }, { status: 400 })
  }

  if (!isR2Configured()) {
    return NextResponse.json(
      { error: 'A entrega digital ainda está sendo finalizada. Seu pedido permanece registrado.' },
      { status: 503 },
    )
  }

  const deviceHash = sha256(deviceId)
  const tokenHash = sha256(`${token}:${deviceHash}`)
  const sql = getSql()

  try {
    const rows = await sql`
      SELECT
        dt.id AS token_id,
        dt.used_at,
        dt.expires_at,
        de.id AS entitlement_id,
        de.status AS entitlement_status,
        de.download_count,
        de.max_downloads,
        de.file_object_key,
        de.copy_fingerprint,
        de.format,
        o.public_id
      FROM download_tokens dt
      JOIN digital_entitlements de ON de.id = dt.entitlement_id
      JOIN order_items oi ON oi.id = de.order_item_id
      JOIN orders o ON o.id = oi.order_id
      WHERE dt.token_hash = ${tokenHash}
      LIMIT 1
    `

    const row = rows[0]
    if (!row) {
      return NextResponse.json({ error: 'Link inválido ou vinculado a outro dispositivo.' }, { status: 404 })
    }

    const entitlementId = String(row.entitlement_id)

    if (row.entitlement_status !== 'active') {
      await registerEvent(entitlementId, deviceHash, 'revoked', request)
      return NextResponse.json({ error: 'Este acesso não está mais ativo.' }, { status: 403 })
    }

    if (row.used_at || new Date(String(row.expires_at)).getTime() <= Date.now()) {
      await registerEvent(entitlementId, deviceHash, 'expired_token', request)
      return NextResponse.json({ error: 'Este link expirou. Volte à confirmação do pedido para gerar outro.' }, { status: 410 })
    }

    if (Number(row.download_count) >= Number(row.max_downloads)) {
      await registerEvent(entitlementId, deviceHash, 'blocked_limit', request)
      return NextResponse.json({ error: 'O limite de downloads desta compra foi atingido.' }, { status: 429 })
    }

    const claimedToken = await sql`
      UPDATE download_tokens
      SET used_at = now()
      WHERE id = ${String(row.token_id)}
        AND used_at IS NULL
        AND expires_at > now()
      RETURNING id
    `

    if (!claimedToken.length) {
      await registerEvent(entitlementId, deviceHash, 'expired_token', request)
      return NextResponse.json({ error: 'Este link já foi utilizado ou expirou.' }, { status: 410 })
    }

    const updatedEntitlement = await sql`
      UPDATE digital_entitlements
      SET download_count = download_count + 1, updated_at = now()
      WHERE id = ${entitlementId}
        AND status = 'active'
        AND download_count < max_downloads
      RETURNING download_count
    `

    if (!updatedEntitlement.length) {
      await registerEvent(entitlementId, deviceHash, 'blocked_limit', request)
      return NextResponse.json({ error: 'O limite de downloads desta compra foi atingido.' }, { status: 429 })
    }

    const extension = String(row.format).toLowerCase() === 'epub' ? 'epub' : 'pdf'
    const orderPart = sanitizeFilePart(String(row.public_id))
    const fingerprintPart = sanitizeFilePart(String(row.copy_fingerprint).slice(0, 12))
    const filename = `A-Prisao-ou-o-Milhao-${orderPart}-${fingerprintPart}.${extension}`
    const signedUrl = await createProtectedDownloadUrl(String(row.file_object_key), filename)

    await registerEvent(entitlementId, deviceHash, 'granted', request)

    return NextResponse.redirect(signedUrl, 302)
  } catch (error) {
    console.error('download_error', error)
    return NextResponse.json({ error: 'Não foi possível liberar o arquivo agora.' }, { status: 500 })
  }
}
