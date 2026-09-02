export type ProductFormat = 'physical' | 'pdf' | 'epub'

export type ProductOffer = {
  format: ProductFormat
  name: string
  shortName: string
  unitAmount: number
  compareAtAmount?: number
  digital: boolean
  fileObjectKey?: string
}

export const BOOK_SLUG = 'a-prisao-ou-o-milhao'
export const BOOK_NAME = 'A Prisão ou o Milhão'

export const offers: Record<ProductFormat, ProductOffer> = {
  physical: {
    format: 'physical',
    name: 'A Prisão ou o Milhão — Livro físico',
    shortName: 'Livro físico',
    unitAmount: 4990,
    compareAtAmount: 5990,
    digital: false,
  },
  pdf: {
    format: 'pdf',
    name: 'A Prisão ou o Milhão — PDF',
    shortName: 'PDF',
    unitAmount: 1990,
    digital: true,
    fileObjectKey: 'digital/a-prisao-ou-o-milhao.pdf',
  },
  epub: {
    format: 'epub',
    name: 'A Prisão ou o Milhão — EPUB',
    shortName: 'EPUB',
    unitAmount: 1990,
    digital: true,
    fileObjectKey: 'digital/a-prisao-ou-o-milhao.epub',
  },
}

export function isProductFormat(value: unknown): value is ProductFormat {
  return value === 'physical' || value === 'pdf' || value === 'epub'
}

export function formatBRL(cents: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cents / 100)
}
