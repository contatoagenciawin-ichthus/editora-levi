import type { AnchorHTMLAttributes, PropsWithChildren } from 'react'

type Props = PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>> & {
  message: string
}

const DEFAULT_WHATSAPP_NUMBER = '553197799353'

function purchaseFormatFromMessage(message: string) {
  const normalized = message.toLocaleLowerCase('pt-BR')

  if (normalized.includes('comprar o livro físico') || normalized.includes('comprar o livro fisico')) {
    return 'physical'
  }
  if (normalized.includes('versão pdf') || normalized.includes('versao pdf')) {
    return 'pdf'
  }
  if (normalized.includes('versão epub') || normalized.includes('versao epub')) {
    return 'epub'
  }

  return null
}

export function WhatsAppLink({ message, children, className, ...props }: Props) {
  const purchaseFormat = purchaseFormatFromMessage(message)

  if (purchaseFormat) {
    return (
      <a href={`/checkout?format=${purchaseFormat}`} className={className} {...props}>
        {children}
      </a>
    )
  }

  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER).replace(/\D/g, '')
  const href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  )
}
