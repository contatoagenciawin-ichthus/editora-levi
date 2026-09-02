import { NextResponse } from 'next/server'
import { isShippingConfigured, quoteShipping } from '@/lib/shipping'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { postalCode?: string }
    const postalCode = body.postalCode?.replace(/\D/g, '') || ''

    if (postalCode.length !== 8) {
      return NextResponse.json({ error: 'Informe um CEP válido.' }, { status: 400 })
    }

    if (!isShippingConfigured()) {
      return NextResponse.json(
        {
          error: 'O cálculo de frete está sendo finalizado. Tente novamente em instantes.',
          code: 'SHIPPING_NOT_CONFIGURED',
        },
        { status: 503 },
      )
    }

    const quotes = await quoteShipping(postalCode)

    if (!quotes.length) {
      return NextResponse.json({ error: 'Não encontramos uma opção de entrega para este CEP.' }, { status: 422 })
    }

    return NextResponse.json({ quotes })
  } catch (error) {
    console.error('shipping_quote_error', error)
    return NextResponse.json({ error: 'Não foi possível calcular o frete agora.' }, { status: 500 })
  }
}
