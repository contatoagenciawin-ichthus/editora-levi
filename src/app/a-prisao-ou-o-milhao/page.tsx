import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'A Prisão ou o Milhão — Adilson Borges',
  description: 'A Prisão ou o Milhão, de Adilson Borges. Uma escolha real na superação do fracasso. Prefácio de Dr. Augusto Cury.',
}

const themes = [
  'Pensamentos negativos e padrões de escolha',
  'Gratidão, fé e pensamento positivo',
  'Inteligência emocional e autossugestão',
  'Paciência, sonhos, objetivos e propósito',
  'Relacionamentos e reconstrução',
  'Exercícios práticos ao longo da leitura',
]

export default function BookLandingPage() {
  return (
    <>
      <section className="lp-hero">
        <div className="shell lp-hero-grid">
          <div className="lp-cover-stage">
            <Image src="/books/a-prisao-ou-o-milhao.svg" alt="Capa de A Prisão ou o Milhão, de Adilson Borges" width={430} height={650} priority />
          </div>
          <div className="lp-copy">
            <span className="eyebrow gold">Prefácio de Dr. Augusto Cury</span>
            <h1>A Prisão ou o Milhão</h1>
            <p className="lp-subtitle">Uma escolha real na superação do fracasso</p>
            <h2>Todo mundo tem uma prisão. Poucos escolhem o milhão.</h2>
            <p>
              Adilson Borges começou a escrever este livro em uma das fases mais difíceis da própria vida. Havia dívidas, problemas pessoais, medo, decisões que não deram certo e a sensação de que aquilo que havia construído estava desmoronando.
            </p>
            <p><strong>A Prisão ou o Milhão nasceu daí. Não de uma teoria sobre superação. De uma experiência real.</strong></p>
            <a className="btn btn-gold" href="#comprar">Escolher minha versão</a>
          </div>
        </div>
      </section>

      <section className="section narrative">
        <div className="shell narrow">
          <span className="eyebrow">A origem do livro</span>
          <h2>Este livro foi escrito no fundo do poço.</h2>
          <p>
            Normalmente, quem conta uma história de superação já conhece o final. Adilson começou a escrever enquanto ainda estava tentando descobrir o dele.
          </p>
          <p>
            Em determinado momento, chegou a dormir no chão de uma fábrica. As dívidas cresciam. A pensão das filhas estava atrasada. Havia cobranças, problemas judiciais e uma vida muito diferente daquela que imaginava estar construindo.
          </p>
          <blockquote>“O fundo do poço não é o fim. É o chão firme de onde me impulsiono.”</blockquote>
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
              Dinheiro faz parte da história porque fez parte da vida do autor. Há perdas, dívidas, negócios, trabalho e reconstrução financeira. Mas o livro não ensina a ficar rico.
            </p>
            <p>
              O significado do milhão vai se ampliando ao longo da leitura: paz recuperada, fé reconstruída, propósito, relações e a consciência de que ainda existem escolhas possíveis.
            </p>
            <blockquote>“O milhão não é um destino. É uma decisão.”</blockquote>
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

      <section className="section author-band">
        <div className="shell author-band-grid">
          <div>
            <span className="eyebrow gold">O autor</span>
            <h2>Adilson Borges</h2>
          </div>
          <div>
            <p>
              Bacharel em Direito, empresário, compositor e multi-instrumentista autodidata. Sua trajetória passou por períodos de crescimento e por perdas importantes, experiências que mudaram sua maneira de enxergar sucesso, dinheiro, relacionamentos e propósito.
            </p>
            <Link href="/#obras" className="text-link">Conhecer outras obras →</Link>
          </div>
        </div>
      </section>

      <section className="section purchase" id="comprar">
        <div className="shell">
          <div className="purchase-head">
            <span className="eyebrow">Escolha sua versão</span>
            <h2>Leia no formato que faz sentido para você.</h2>
          </div>
          <div className="purchase-grid">
            <article className="purchase-card featured">
              <span className="format">Livro físico</span>
              <h3>A Prisão ou o Milhão</h3>
              <p className="old-price">R$ 59,90</p>
              <p className="price">R$ 49,90</p>
              <button className="btn btn-gold" type="button" disabled>Comprar livro físico</button>
              <small>Checkout será conectado na etapa comercial.</small>
            </article>
            <article className="purchase-card">
              <span className="format">PDF</span>
              <h3>Versão digital</h3>
              <p className="price">R$ 19,90</p>
              <button className="btn btn-dark" type="button" disabled>Comprar PDF</button>
              <small>Entrega individual protegida após a confirmação do pagamento.</small>
            </article>
            <article className="purchase-card">
              <span className="format">EPUB</span>
              <h3>Versão digital</h3>
              <p className="price">R$ 19,90</p>
              <button className="btn btn-dark" type="button" disabled>Comprar EPUB</button>
              <small>Para leitores e aplicativos compatíveis com EPUB.</small>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
