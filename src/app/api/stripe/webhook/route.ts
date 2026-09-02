import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getSql } from '@/lib/db'
import { markOrderPaid } from '@/lib/fulfillment'
import { getStripe } from '@/lib/stripe'

export const runtime = 'nodejs'

type SessionWithOrder = Stripe.Checkout.Session & {
  metadata: {
    order_id?: string
    public_id?: string
    format?: string
  } | null
}

function paymentIntentId(session: Stripe.Checkout.Session) {
  if (!session.payment_intent) return null
  return typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent.id
}

async function setOrderPaymentState(orderId: string, state: 'processing' | 'failed') {
  const sql = getSql()

  if (state === 'processing') {
    await sql`
      UPDATE orders
      SET payment_status = 'processing', updated_at = now()
      WHERE id = ${orderId} AND payment_status = 'pending'
    `
  } else {
    await sql`
      UPDATE orders
      SET status = 'payment_failed', payment_status = 'failed', updated_at = now()
      WHERE id = ${orderId}
    `
  }
}

async function processCheckoutSession(session: SessionWithOrder, forcePaid = false) {
  const orderId = session.metadata?.order_id
  if (!orderId) throw new Error(`Checkout Session ${session.id} sem order_id`)

  const paid = forcePaid || session.payment_status === 'paid' || session.payment_status === 'no_payment_required'

  if (paid) {
    await markOrderPaid({
      orderId,
      paymentIntentId: paymentIntentId(session),
      paymentMethod: session.payment_method_types?.[0] || null,
    })
  } else {
    await setOrderPaymentState(orderId, 'processing')
  }
}

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    return NextResponse.json({ error: 'Webhook não configurado.' }, { status: 503 })
  }

  const signature = request.headers.get('stripe-signature')
  if (!signature) {
    return NextResponse.json({ error: 'Assinatura ausente.' }, { status: 400 })
  }

  const rawBody = await request.text()
  const stripe = getStripe()
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (error) {
    console.error('stripe_webhook_signature_error', error)
    return NextResponse.json({ error: 'Assinatura inválida.' }, { status: 400 })
  }

  const sql = getSql()

  try {
    const existing = await sql`
      SELECT processed_at
      FROM webhook_events
      WHERE provider = 'stripe' AND provider_event_id = ${event.id}
      LIMIT 1
    `

    if (existing[0]?.processed_at) {
      return NextResponse.json({ received: true, duplicate: true })
    }

    await sql`
      INSERT INTO webhook_events (provider, provider_event_id, event_type, payload)
      VALUES ('stripe', ${event.id}, ${event.type}, ${JSON.stringify(event)}::jsonb)
      ON CONFLICT (provider, provider_event_id) DO UPDATE
      SET event_type = EXCLUDED.event_type, payload = EXCLUDED.payload
    `

    switch (event.type) {
      case 'checkout.session.completed':
        await processCheckoutSession(event.data.object as SessionWithOrder)
        break

      case 'checkout.session.async_payment_succeeded':
        await processCheckoutSession(event.data.object as SessionWithOrder, true)
        break

      case 'checkout.session.async_payment_failed': {
        const session = event.data.object as SessionWithOrder
        const orderId = session.metadata?.order_id
        if (orderId) await setOrderPaymentState(orderId, 'failed')
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        const orderId = paymentIntent.metadata?.order_id
        if (orderId) await setOrderPaymentState(orderId, 'failed')
        break
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge
        const intentId = typeof charge.payment_intent === 'string' ? charge.payment_intent : charge.payment_intent?.id

        if (intentId) {
          const rows = await sql`
            UPDATE orders
            SET status = 'refunded', payment_status = 'refunded', updated_at = now()
            WHERE stripe_payment_intent_id = ${intentId}
            RETURNING id
          `

          for (const row of rows) {
            await sql`
              UPDATE digital_entitlements
              SET status = 'revoked', updated_at = now()
              WHERE order_item_id IN (
                SELECT id FROM order_items WHERE order_id = ${row.id as string}
              )
            `
          }
        }
        break
      }

      default:
        break
    }

    await sql`
      UPDATE webhook_events
      SET processed_at = now(), processing_error = NULL
      WHERE provider = 'stripe' AND provider_event_id = ${event.id}
    `

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('stripe_webhook_processing_error', event.id, error)

    try {
      await sql`
        UPDATE webhook_events
        SET processing_error = ${error instanceof Error ? error.message.slice(0, 1000) : 'unknown'}
        WHERE provider = 'stripe' AND provider_event_id = ${event.id}
      `
    } catch (loggingError) {
      console.error('stripe_webhook_error_logging_failed', loggingError)
    }

    return NextResponse.json({ error: 'Falha ao processar evento.' }, { status: 500 })
  }
}
