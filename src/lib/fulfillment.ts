import { offers, type ProductFormat } from '@/lib/catalog'
import { getSql } from '@/lib/db'
import { createCopyFingerprint } from '@/lib/security'

export async function ensureDigitalEntitlements(orderId: string) {
  const sql = getSql()
  const items = await sql`
    SELECT oi.id, oi.format, o.customer_id
    FROM order_items oi
    JOIN orders o ON o.id = oi.order_id
    WHERE oi.order_id = ${orderId}
      AND oi.format IN ('pdf', 'epub')
  `

  for (const item of items) {
    const format = item.format as ProductFormat
    const objectKey = offers[format]?.fileObjectKey
    if (!objectKey) continue

    await sql`
      INSERT INTO digital_entitlements (
        order_item_id,
        customer_id,
        format,
        file_object_key,
        copy_fingerprint
      )
      VALUES (
        ${item.id as string},
        ${item.customer_id as string},
        ${format},
        ${objectKey},
        ${createCopyFingerprint()}
      )
      ON CONFLICT (order_item_id) DO NOTHING
    `
  }
}

export async function markOrderPaid(params: {
  orderId: string
  paymentIntentId?: string | null
  paymentMethod?: string | null
}) {
  const sql = getSql()
  const physicalRows = await sql`
    SELECT EXISTS(
      SELECT 1 FROM order_items WHERE order_id = ${params.orderId} AND format = 'physical'
    ) AS has_physical
  `
  const hasPhysical = Boolean(physicalRows[0]?.has_physical)
  const fulfillmentStatus = hasPhysical ? 'processing' : 'digital_ready'

  await sql`
    UPDATE orders
    SET
      status = 'paid',
      payment_status = 'paid',
      fulfillment_status = ${fulfillmentStatus},
      stripe_payment_intent_id = COALESCE(${params.paymentIntentId || null}, stripe_payment_intent_id),
      payment_method = COALESCE(${params.paymentMethod || null}, payment_method),
      paid_at = COALESCE(paid_at, now()),
      updated_at = now()
    WHERE id = ${params.orderId}
  `

  await sql`
    INSERT INTO order_events (order_id, event_type, details)
    VALUES (
      ${params.orderId},
      'payment_confirmed',
      ${JSON.stringify({ paymentMethod: params.paymentMethod || null })}::jsonb
    )
  `

  if (!hasPhysical) {
    await ensureDigitalEntitlements(params.orderId)
  }
}
