import type { AnchorHTMLAttributes, PropsWithChildren } from 'react'

type Props = PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>> & {
  message: string
}

export function WhatsAppLink({ message, children, className, ...props }: Props) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '')
  const href = number
    ? `https://wa.me/${number}?text=${encodeURIComponent(message)}`
    : `mailto:?subject=${encodeURIComponent('Contato Editora Levi')}&body=${encodeURIComponent(message)}`

  return (
    <a href={href} className={className} target={number ? '_blank' : undefined} rel={number ? 'noopener noreferrer' : undefined} {...props}>
      {children}
    </a>
  )
}
