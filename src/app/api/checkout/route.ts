import { NextResponse } from 'next/server'
import { BOOK_NAME, BOOK_SLUG, isProductFormat, offers } from '@/lib/catalog'
import { getSql } from '@/lib/db'
import { createPublicOrderId } from '@/lib/security'
import { isShippingConfigured, quoteShipping } from '@/lib/shipping'
import { getStripe } from '@/lib/stripe'

export const runtime = 'nodejs'

type CheckoutBody = {
  format?: unknown
  customer?: {
    fullName?: string
    email?: string
    phone?: string
  }
  shipping?: {
    postalCode?: string
    street?: string
    number?: string
    complement?: string
    neighborhood?: string
    city?: string
    state?: string
    quoteId?: string
  }
  attribution?: {
    source?: string
    utmSource?: string
    utmMedium?: string
    utmCampaign?: string
    utmContent?: string
    utmTerm?: string
  }
}

function clean(value: unknown, max = 180) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

function validEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: Request) {
  let orderId: string | null = null

  try {
    const body = (await request.json()) as CheckoutBody

    if (!isProductFormat(body.format)) {
      return NextResponse.json({ error: 'Formato inválido.' }, { status: 400 })
    }

    const offer = offers[body.format]
    const fullName = clean(body.customer?.fullName, 160)
    const email = clean(body.customer?.email, 254).toLowerCase()
    const phone = clean(body.customer?.phone, 40)

    if (fullName.length < 3 || !validEmail(email)) {
      return NextResponse.json({ error: 'Preencha nome e e-mail corretamente.' }, { status: 400 })
    }

    let shippingCents = 0
    let shippingService: string | null = null
    let shippingCarrier: string | null = null
    let shippingQuoteId: string | null = null

    const postalCode = clean(body.shipping?.postalCode, 16).replace(/\D/g, '')
    const street = clean(body.shipping?.street, 180)
    const number = clean(body.shipping?.number, 40)
    const complement = clean(body.shipping?.complement, 120)
    const neighborhood = clean(body.shipping?.neighborhood, 120)
    const city = clean(body.shipping?.city, 120)
    const state = clean(body.shipping?.state, 2).toUpperCase()

    if (body.format === 'physical') {
      if (!isShippingConfigured()) {
        return NextResponse.json(
          { error: 'O frete ainda não está configurado para finalizar compras físicas.' },
          { status: 503 },
        )
      }

      if (
        postalCode.length !== 8 ||
        !street ||
        !number ||
        !neighborhood ||
        !city ||
        state.length !== 2 ||
        !body.shipping?.quoteId
      ) {
        return NextResponse.json({ error: 'Complete o endereço e selecione uma opção de frete.' }, { status: 400 })
      }

      const quotes = await quoteShipping(postalCode)
      const quote = quotes.find((item) => item.id === body.shipping?.quoteId)

      if (!quote) {
        return NextResponse.json({ error: 'A opção de frete expirou. Calcule novamente.' }, { status: 409 })
      }

      shippingCents = quote.priceCents
      shippingService = quote.service
      shippingCarrier = quote.carrier
      shippingQuoteId = quote.id
    }

    const sql = getSql()
    const publicId = createPublicOrderId()
    const totalCents = offer.unitAmount + shippingCents

    const customers = await sql`
      INSERT INTO customers (email, full_name, phone)
      VALUES (${email}, ${fullName}, ${phone || null})
      ON CONFLICT ((lower(email)))
      DO UPDATE SET
        full_name = EXCLUDED.full_name,
        phone = COALESCE(EXCLUDED.phone, customers.phone),
        updated_at = now()
      RETURNING id
    `

    const customerId = customers[0]?.id as string | undefined
    if (!customerId) throw new Error('Falha ao criar comprador')

    const orders = await sql`
      INSERT INTO orders (
        public_id,
        customer_id,
        subtotal_cents,
        shipping_cents,
        total_cents,
        source,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_content,
        utm_term
      )
      VALUES (
        ${publicId},
        ${customerId},
        ${offer.unitAmount},
        ${shippingCents},
        ${totalCents},
        ${clean(body.attribution?.source, 120) || null},
        ${clean(body.attribution?.utmSource, 180) || null},
        ${clean(body.attribution?.utmMedium, 180) || null},
        ${clean(body.attribution?.utmCampaign, 180) || null},
        ${clean(body.attribution?.utmContent, 180) || null},
        ${clean(body.attribution?.utmTerm, 180) || null}
      )
      RETURNING id
    `

    orderId = orders[0]?.id as string | undefined || null
    if (!orderId) throw new Error('Falha ao criar pedido')

    await sql`
      INSERT INTO order_items (
        order_id,
        product_slug,
        product_name,
        format,
        unit_price_cents,
        quantity,
        line_total_cents
      )
      VALUES (
        ${orderId},
        ${BOOK_SLUG},
        ${BOOK_NAME},
        ${offer.format},
        ${offer.unitAmount},
        1,
        ${offer.unitAmount}
      )
    `

    if (body.format === 'physical') {
      await sql`
        INSERT INTO shipping_addresses (
          order_id,
          recipient_name,
          postal_code,
          street,
          number,
          complement,
          neighborhood,
          city,
          state,
          shipping_service,
          shipping_carrier,
          shipping_quote_id
        )
        VALUES (
          ${orderId},
          ${fullName},
          ${postalCode},
          ${street},
          ${number},
          ${complement || null},
          ${neighborhood},
          ${city},
          ${state},
          ${shippingService},
          ${shippingCarrier},
          ${shippingQuoteId}
        )
      `
    }

    await sql`
      INSERT INTO order_events (order_id, event_type, details)
      VALUES (${orderId}, 'order_created', ${JSON.stringify({ format: offer.format })}::jsonb)
    `

    const stripe = getStripe()
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://editoralevi.com.br'

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card', 'pix'],
      customer_email: email,
      client_reference_id: publicId,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'brl',
            unit_amount: offer.unitAmount,
            product_data: {
              name: offer.name,
              description:
                offer.format === 'physical'
                  ? 'Edição impressa de A Prisão ou o Milhão'
                  : `Versão digital em ${offer.format.toUpperCase()}`,
            },
          },
        },
      ],
      ...(shippingCents > 0
        ? {
            shipping_options: [
              {
                shipping_rate_data: {
                  type: 'fixed_amount' as const,
                  fixed_amount: { amount: shippingCents, currency: 'brl' },
                  display_name: `${shippingCarrier} — ${shippingService}`,
                },
              },
            ],
          }
        : {}),
      metadata: {
        order_id: orderId,
        public_id: publicId,
        format: offer.format,
      },
      payment_intent_data: {
        metadata: {
          order_id: orderId,
          public_id: publicId,
          format: offer.format,
        },
      },
      success_url: `${siteUrl}/pedido/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout?format=${offer.format}&cancelled=1`,
    })

    await sql`
      UPDATE orders
      SET stripe_checkout_session_id = ${session.id}, updated_at = now()
      WHERE id = ${orderId}
    `

    await sql`
      INSERT INTO order_events (order_id, event_type, details)
      VALUES (${orderId}, 'checkout_created', ${JSON.stringify({ sessionId: session.id })}::jsonb)
    `

    return NextResponse.json({ url: session.url, order: publicId })
  } catch (error) {
    console.error('checkout_error', error)

    if (orderId) {
      try {
        const sql = getSql()
        await sql`
          INSERT INTO order_events (order_id, event_type, details)
          VALUES (${orderId}, 'checkout_error', ${JSON.stringify({ message: error instanceof Error ? error.message : 'unknown' })}::jsonb)
        `
      } catch (loggingError) {
        console.error('checkout_error_logging_failed', loggingError)
      }
    }

    return NextResponse.json(
      { error: 'Não foi possível iniciar o pagamento. Tente novamente ou fale com a Editora Levi.' },
      { status: 500 },
    )
  }
}
