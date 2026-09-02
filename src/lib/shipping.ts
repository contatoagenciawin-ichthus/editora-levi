type MelhorEnvioQuote = {
  id?: number | string
  name?: string
  price?: string | number
  custom_price?: string | number
  delivery_time?: number
  custom_delivery_time?: number
  company?: {
    id?: number | string
    name?: string
  }
  error?: string
}

export type ShippingQuote = {
  id: string
  service: string
  carrier: string
  priceCents: number
  deliveryDays?: number
}

function digits(value: string) {
  return value.replace(/\D/g, '')
}

export function isShippingConfigured() {
  return Boolean(
    process.env.MELHOR_ENVIO_TOKEN &&
      process.env.MELHOR_ENVIO_ORIGIN_POSTAL_CODE &&
      process.env.MELHOR_ENVIO_USER_AGENT,
  )
}

export async function quoteShipping(destinationPostalCode: string): Promise<ShippingQuote[]> {
  const token = process.env.MELHOR_ENVIO_TOKEN
  const originPostalCode = process.env.MELHOR_ENVIO_ORIGIN_POSTAL_CODE
  const userAgent = process.env.MELHOR_ENVIO_USER_AGENT

  if (!token || !originPostalCode || !userAgent) {
    throw new Error('Integração de frete ainda não configurada')
  }

  const destination = digits(destinationPostalCode)
  const origin = digits(originPostalCode)

  if (destination.length !== 8 || origin.length !== 8) {
    throw new Error('CEP inválido')
  }

  const weight = Number(process.env.BOOK_WEIGHT_KG || '0.35')
  const width = Number(process.env.BOOK_WIDTH_CM || '16')
  const height = Number(process.env.BOOK_HEIGHT_CM || '3')
  const length = Number(process.env.BOOK_LENGTH_CM || '23')

  const response = await fetch('https://www.melhorenvio.com.br/api/v2/me/shipment/calculate', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': userAgent,
    },
    body: JSON.stringify({
      from: { postal_code: origin },
      to: { postal_code: destination },
      products: [
        {
          id: 'a-prisao-ou-o-milhao',
          width,
          height,
          length,
          weight,
          insurance_value: 49.9,
          quantity: 1,
        },
      ],
      options: {
        receipt: false,
        own_hand: false,
      },
    }),
    cache: 'no-store',
  })

  const payload = (await response.json()) as MelhorEnvioQuote[] | { message?: string }

  if (!response.ok || !Array.isArray(payload)) {
    const message = !Array.isArray(payload) && payload.message ? payload.message : 'Falha ao calcular frete'
    throw new Error(message)
  }

  return payload
    .filter((item) => !item.error && (item.custom_price ?? item.price))
    .map((item) => {
      const price = Number(item.custom_price ?? item.price)
      return {
        id: String(item.id ?? `${item.company?.name || 'transportadora'}-${item.name || 'servico'}`),
        service: item.name || 'Entrega',
        carrier: item.company?.name || 'Transportadora',
        priceCents: Math.round(price * 100),
        deliveryDays: item.custom_delivery_time ?? item.delivery_time,
      }
    })
    .filter((item) => Number.isFinite(item.priceCents) && item.priceCents >= 0)
    .sort((a, b) => a.priceCents - b.priceCents)
    .slice(0, 5)
}
