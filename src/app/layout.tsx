import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import './globals.css'
import './enhancements.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://editoralevi.com.br'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Editora Levi — Histórias que se tornam livros',
    template: '%s | Editora Levi',
  },
  description: 'Editora Levi. Ghostwriting, ISBN, publicação profissional e obras de Adilson Borges.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Editora Levi',
    url: '/',
    title: 'Editora Levi — Histórias que se tornam livros',
    description: 'Transformamos ideias, experiências e conhecimento em obras publicadas.',
  },
  twitter: {
    card: 'summary',
    title: 'Editora Levi — Histórias que se tornam livros',
    description: 'Transformamos ideias, experiências e conhecimento em obras publicadas.',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Editora Levi',
  url: siteUrl,
  description: 'Editora com serviços de ghostwriting, ISBN e publicação profissional.',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+55 31 9779-9353',
    contactType: 'customer service',
    availableLanguage: 'Portuguese',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
