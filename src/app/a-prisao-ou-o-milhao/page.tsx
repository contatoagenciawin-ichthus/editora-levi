import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { WhatsAppLink } from '@/components/WhatsAppLink'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://editoralevi.com.br'
const pageUrl = `${siteUrl}/a-prisao-ou-o-milhao`

export const metadata: Metadata = {
  title: 'A Prisão ou o Milhão — Adilson Borges',
  description:
    'A Prisão ou o Milhão, de Adilson Borges. Uma escolha real na superação do fracasso. Prefácio de Dr. Augusto Cury.',
  alternates: {
    canonical: '/a-prisao-ou-o-milhao',
  },
  openGraph: {
    type: 'book',
    locale: 'pt_BR',
    siteName: 'Editora Levi',
    url: '/a-prisao-ou-o-milhao',
    title: 'A Prisão ou o Milhão — Adilson Borges',
    description:
      'Uma história real de queda, escolhas e reconstrução. Prefácio de Dr. Augusto Cury.',
  },
  twitter: {
    card: 'summary',
    title: 'A Prisão ou o Milhão — Adilson Borges',
    description:
      'Uma história real de queda, escolhas e reconstrução. Prefácio de Dr. Augusto Cury.',
  },
}

const themes = [
  'Pensamentos negativos e padrões de escolha',
  'Gratidão, fé e pensamento positivo',
  'Inteligência emocional e autossugestão',
  'Paciência, sonhos, objetivos e propósito',
  'Relacionamentos e reconstrução',
  'Exercícios práticos ao longo da leitura',
]

const steps = [
  'Admitir o caos',
  'Afastar-se do barulho',
  'Reescrever os pensamentos',
  'Agradecer o pouco como se fosse tudo',
  'Nutrir a mente',
  'Perdoar quem feriu — e também se perdoar',
  'Escolher todos os dias',
]

const testimonials = [
  {
    quote: 'A Prisão ou o Milhão é mais do que uma história — é realmente um grito de superação em meio ao caos.',
    name: 'Pr. Washington Oliveira',
    role: 'Presidente Comunidade Amor Ágape',
  },
  {
    quote: 'Comecei a leitura esperando uma autobiografia e me deparei com uma obra que é muito mais do que isso.',
    name: 'Fernanda Pessoa',
    role: 'Reprogramadora Neural, Psicanalista e Hipnoterapeuta',
  },
  {
    quote: 'É uma leitura que vale a pena, especialmente porque muitos já estiveram, estão ou estarão no fundo do poço.',
    name: 'Alisson Rodrigues da Silva',
    role: 'Pastor e Influenciador Cristão',
  },
  {
    quote: 'A verdadeira transformação começa de dentro para fora.',
    name: 'Victor Pessoa',
    role: 'Advogado e Instrutor MasterMind',
  },
]

const faqs = [
  {
    question: 'É um livro sobre como ficar milionário?',
    answer:
      'Não. O dinheiro faz parte da história relatada pelo autor, mas o livro não apresenta fórmula de enriquecimento nem promete resultado financeiro. O significado do “milhão” é desenvolvido ao longo da obra de maneira muito mais ampla.',
  },
  {
    question: 'É uma autobiografia?',
    answer:
      'A história de Adilson Borges está presente em toda a obra, mas o livro não se limita ao relato biográfico. Os acontecimentos vividos pelo autor servem de ponto de partida para reflexões, conceitos e exercícios.',
  },
  {
    question: 'Preciso estar passando por uma crise para ler?',
    answer:
      'Não. Quem está atravessando uma fase difícil provavelmente encontrará identificação mais imediata, mas a obra também trata de escolhas, mentalidade, relacionamentos, objetivos, propósito e desenvolvimento pessoal.',
  },
  {
    question: 'PDF e EPUB têm conteúdos diferentes?',
    answer:
      'Não. São formatos diferentes do mesmo livro. O PDF mantém a diagramação das páginas, enquanto o EPUB é preparado para leitores e aplicativos digitais compatíveis.',
  },
  {
    question: 'O livro físico possui o mesmo conteúdo?',
    answer: 'Sim.',
  },
]

const bookSchema = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: 'A Prisão ou o Milhão',
  alternateName: 'A Prisão ou o Milhão: Uma escolha real na superação do fracasso',
  url: pageUrl,
  isbn: '9786501430751',
  inLanguage: 'pt-BR',
  author: {
    '@type': 'Person',
    name: 'Adilson Borges',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Editora Levi',
    url: siteUrl,
  },
  description:
    'Uma história real de queda, escolhas e reconstrução, escrita por Adilson Borges e apresentada com prefácio de Dr. Augusto Cury.',
  offers: [
    {
      '@type': 'Offer',
      priceCurrency: 'BRL',
      price: '49.90',
      url: `${pageUrl}#comprar`,
      itemCondition: 'https://schema.org/NewCondition',
      name: 'Livro físico',
    },
    {
      '@type': 'Offer',
      priceCurrency: 'BRL',
      price: '19.90',
      url: `${pageUrl}#comprar`,
      name: 'PDF',
    },
    {
      '@type': 'Offer',
      priceCurrency: 'BRL',
      price: '19.90',
      url: `${pageUrl}#comprar`,
      name: 'EPUB',
    },
  ],
}

export default function BookLandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }}
      />

      <section className="lp-hero">
        <div className="shell lp-hero-grid">
          <div className="lp-cover-stage">
            <Image
              src="/books/a-prisao-ou-o-milhao.svg"
              alt="Capa de A Prisão ou o Milhão, de Adilson Borges"
              width={430}
              height={650}
              priority
            />
          </div>
          <div className="lp-copy">
            <span className="eyebrow gold">Prefácio de Dr. Augusto Cury</span>
            <h1>A Prisão ou o Milhão</h1>
            <p className="lp-subtitle">Uma escolha real na superação do fracasso</p>
            <h2>Todo mundo tem uma prisão. Poucos escolhem o milhão.</h2>
            <p>
              Adilson Borges começou a escrever este livro em uma das fases mais difíceis da própria vida.
              Havia dívidas, problemas pessoais, medo, decisões que não deram certo e a sensação de que
              aquilo que havia construído estava desmoronando.
            </p>
            <p>
              <strong>
                A Prisão ou o Milhão nasceu daí. Não de uma teoria sobre superação. De uma experiência real.
              </strong>
            </p>
            <div className="actions">
              <a className="btn btn-gold" href="#comprar">
                Escolher minha versão
              </a>
              <span className="lp-format-note">Livro físico · PDF · EPUB</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section narrative">
        <div className="shell narrow">
          <span className="eyebrow">A origem do livro</span>
          <h2>Este livro foi escrito no fundo do poço.</h2>
          <p>
            Normalmente, quem conta uma história de superação já conhece o final. Adilson começou a escrever
            enquanto ainda estava tentando descobrir o dele.
          </p>
          <p>
            Em determinado momento, chegou a dormir no chão de uma fábrica. As dívidas cresciam. A pensão das
            filhas estava atrasada. Havia cobranças, problemas judiciais e uma vida muito diferente daquela que
            imaginava estar construindo.
          </p>
          <p>
            Ao mesmo tempo, percebeu que esperar apenas pelas circunstâncias mudarem não resolveria o problema.
            Alguma coisa precisaria começar nele.
          </p>
          <blockquote>“O fundo do poço não é o fim. É o chão firme de onde me impulsiono.”</blockquote>
        </div>
      </section>

      <section className="section questions-section">
        <div className="shell questions-grid">
          <div>
            <span className="eyebrow">Uma história real</span>
            <h2>A história é dele. As perguntas podem ser de muita gente.</h2>
          </div>
          <div className="question-list">
            <p>Por que continuo repetindo determinadas escolhas?</p>
            <p>Quanto da minha situação atual está fora do meu controle — e quanto ainda depende de mim?</p>
            <p>O que preciso mudar para não continuar chegando ao mesmo lugar?</p>
          </div>
        </div>
      </section>

      <section className="section dark-section">
        <div className="shell two-col-copy">
          <div>
            <span className="eyebrow gold">O sentido do título</span>
            <h2>O “milhão” não é uma promessa de dinheiro fácil.</h2>
          </div>
          <div>
            <p>
              Dinheiro faz parte da história porque fez parte da vida do autor. Há perdas, dívidas, negócios,
              trabalho e reconstrução financeira. Mas o livro não ensina a ficar rico.
            </p>
            <p>
              O significado do milhão vai se ampliando ao longo da leitura: paz recuperada, fé reconstruída,
              propósito, relações e a consciência de que ainda existem escolhas possíveis.
            </p>
            <blockquote>“O milhão não é um destino. É uma decisão.”</blockquote>
            <p className="quote-note">“Este não é um livro sobre dinheiro. É sobre valor.”</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-heading compact">
            <div>
              <span className="eyebrow">Durante a leitura</span>
              <h2>O que você vai encontrar no livro</h2>
            </div>
          </div>
          <div className="theme-grid">
            {themes.map((theme, index) => (
              <div className="theme-card" key={theme}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{theme}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section practical-section">
        <div className="shell practical-grid">
          <div>
            <span className="eyebrow gold">Capítulo bônus</span>
            <h2>O livro também traz uma parte prática.</h2>
            <p>
              No capítulo bônus, Adilson reúne os sete passos que considera importantes no processo que viveu
              para sair do fundo do poço. O capítulo também traz um mini guia de reprogramação de pensamentos e
              exercícios para transformar parte das reflexões da leitura em prática.
            </p>
          </div>
          <ol className="steps-list">
            {steps.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section cury-section">
        <div className="shell cury-grid">
          <div className="cury-number" aria-hidden="true">
            AC
          </div>
          <div>
            <span className="eyebrow gold">Prefácio de Dr. Augusto Cury</span>
            <h2>Uma leitura que começa antes da introdução.</h2>
            <p>
              Dr. Augusto Cury apresenta A Prisão ou o Milhão destacando o caráter provocador da obra. No
              prefácio, chama atenção para pessoas que podem conquistar bens, reconhecimento e posições
              importantes e, ainda assim, continuar vivendo conflitos internos profundos.
            </p>
            <p>
              Sua leitura ajuda a compreender um ponto que atravessa toda a obra: prosperidade e liberdade não
              são definidas apenas por aquilo que alguém consegue acumular.
            </p>
          </div>
        </div>
      </section>

      <section className="section author-band">
        <div className="shell author-band-grid">
          <div>
            <span className="eyebrow gold">O autor</span>
            <h2>Adilson Borges</h2>
          </div>
          <div>
            <p>
              Adilson Borges é bacharel em Direito, empresário, compositor e multi-instrumentista autodidata.
              Sua trajetória passou por diferentes áreas e por momentos muito distintos entre si.
            </p>
            <p>
              Viveu fases de crescimento e conquistas, mas também enfrentou perdas importantes, crises pessoais
              e um período que mudou profundamente sua maneira de enxergar sucesso, dinheiro, relacionamentos e
              propósito. A Prisão ou o Milhão nasceu dessa experiência.
            </p>
            <Link href="/#obras" className="text-link">
              Conhecer outras obras →
            </Link>
          </div>
        </div>
      </section>

      <section className="section testimonials-section">
        <div className="shell">
          <div className="section-heading compact">
            <div>
              <span className="eyebrow">Quem já leu</span>
              <h2>O que dizem alguns leitores</h2>
            </div>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <figure className="testimonial-card" key={testimonial.name}>
                <blockquote>“{testimonial.quote}”</blockquote>
                <figcaption>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section purchase" id="comprar">
        <div className="shell">
          <div className="purchase-head">
            <span className="eyebrow">Escolha sua versão</span>
            <h2>Leia no formato que faz sentido para você.</h2>
            <p>Enquanto o checkout próprio é finalizado, os pedidos podem ser concluídos diretamente com a Editora Levi pelo WhatsApp.</p>
          </div>
          <div className="purchase-grid">
            <article className="purchase-card featured">
              <span className="format">Livro físico</span>
              <h3>A Prisão ou o Milhão</h3>
              <p className="old-price">R$ 59,90</p>
              <p className="price">R$ 49,90</p>
              <WhatsAppLink
                className="btn btn-gold"
                message="Olá! Quero comprar o livro físico A Prisão ou o Milhão por R$ 49,90."
              >
                Comprar livro físico
              </WhatsAppLink>
              <small>Pedido direto com a Editora Levi pelo WhatsApp.</small>
            </article>
            <article className="purchase-card">
              <span className="format">PDF</span>
              <h3>Versão digital</h3>
              <p className="price">R$ 19,90</p>
              <WhatsAppLink
                className="btn btn-dark"
                message="Olá! Quero comprar a versão PDF de A Prisão ou o Milhão por R$ 19,90."
              >
                Comprar PDF
              </WhatsAppLink>
              <small>Pedido direto com a Editora Levi pelo WhatsApp.</small>
            </article>
            <article className="purchase-card">
              <span className="format">EPUB</span>
              <h3>Versão digital</h3>
              <p className="price">R$ 19,90</p>
              <WhatsAppLink
                className="btn btn-dark"
                message="Olá! Quero comprar a versão EPUB de A Prisão ou o Milhão por R$ 19,90."
              >
                Comprar EPUB
              </WhatsAppLink>
              <small>Para leitores e aplicativos compatíveis com EPUB.</small>
            </article>
          </div>
          <p className="amazon-note">
            A obra também está publicada na Amazon.{' '}
            <a href="https://www.amazon.com.br/dp/B0FD7Y1PB1" target="_blank" rel="noopener noreferrer">
              Ver na Amazon →
            </a>
          </p>
        </div>
      </section>

      <section className="section faq-section">
        <div className="shell faq-grid">
          <div>
            <span className="eyebrow">Perguntas frequentes</span>
            <h2>Antes de escolher sua versão</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-closing">
        <div className="shell narrow">
          <span className="eyebrow gold">A Prisão ou o Milhão</span>
          <h2>A prisão nem sempre tem grades. E o milhão nem sempre está em uma conta bancária.</h2>
          <p>
            Entre um e outro existem decisões. Algumas grandes. Muitas pequenas. E quase sempre tomadas quando
            ainda não existe garantia de que tudo dará certo.
          </p>
          <blockquote>“O milhão não é um destino. É uma decisão.”</blockquote>
          <a className="btn btn-gold" href="#comprar">
            Escolher minha versão
          </a>
        </div>
      </section>

      <div className="mobile-buy-bar" aria-label="Atalho para compra">
        <div>
          <strong>A Prisão ou o Milhão</strong>
          <span>A partir de R$ 19,90</span>
        </div>
        <a className="btn btn-gold" href="#comprar">
          Comprar
        </a>
      </div>
    </>
  )
}
