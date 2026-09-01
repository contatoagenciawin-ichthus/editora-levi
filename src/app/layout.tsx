import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://editoralevi.com.br'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Editora Levi — Histórias que se tornam livros',
    template: '%s | Editora Levi',
  },
  description: 'Editora Levi. Ghostwriting, ISBN, publicação profissional e obras de Adilson Borges.',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Editora Levi',
    title: 'Editora Levi — Histórias que se tornam livros',
    description: 'Transformamos ideias, experiências e conhecimento em obras publicadas.',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
