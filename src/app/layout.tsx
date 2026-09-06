import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import './globals.css'
import './enhancements.css'
import './official-assets.css'
import './hero-video-quality.css'
import './editorial-v2.css'
import './typography-v2.css'
import './capability-v2.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant',
  weight: ['400', '500', '600'],
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://editoralevi.com.br'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Editora Levi — Livros com direção editorial',
    template: '%s | Editora Levi',
  },
  description:
    'Desenvolvimento editorial, ghostwriting, ISBN e publicação de livros. Conheça o catálogo da Editora Levi e converse sobre seu projeto.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Editora Levi',
    url: '/',
    title: 'Editora Levi — Livros com direção editorial',
    description: 'Histórias, ideias e experiências transformadas em obras com estrutura editorial.',
  },
  twitter: {
    card: 'summary',
    title: 'Editora Levi — Livros com direção editorial',
    description: 'Histórias, ideias e experiências transformadas em obras com estrutura editorial.',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Editora Levi',
  url: siteUrl,
  description: 'Editora com desenvolvimento editorial, ghostwriting, ISBN e publicação profissional.',
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
      <body className={`${inter.variable} ${cormorant.variable}`}>
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
