import type { Metadata } from 'next'
import { isProductFormat, type ProductFormat } from '@/lib/catalog'
import { CheckoutClient } from './CheckoutClient'

export const metadata: Metadata = {
  title: 'Finalizar compra — A Prisão ou o Milhão',
  description: 'Finalize sua compra de A Prisão ou o Milhão com segurança.',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ format?: string; cancelled?: string }>
}) {
  const params = await searchParams
  const initialFormat: ProductFormat = isProductFormat(params.format) ? params.format : 'physical'

  return <CheckoutClient initialFormat={initialFormat} cancelled={params.cancelled === '1'} />
}
