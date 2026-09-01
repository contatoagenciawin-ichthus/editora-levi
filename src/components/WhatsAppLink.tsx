import type { AnchorHTMLAttributes, PropsWithChildren } from 'react'

type Props = PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>> & {
  message: string
}

const DEFAULT_WHATSAPP_NUMBER = '553197799353'

export function WhatsAppLink({ message, children, className, ...props }: Props) {
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
