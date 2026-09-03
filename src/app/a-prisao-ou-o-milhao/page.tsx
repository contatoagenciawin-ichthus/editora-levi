import type { Metadata } from 'next'
import Image from 'next/image'
import { WhatsAppLink } from '@/components/WhatsAppLink'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://editoralevi.com.br'
const pageUrl = `${siteUrl}/a-prisao-ou-o-milhao`

export const metadata: Metadata = {
  title: 'A Prisão ou o Milhão — Adilson Borges',
  description:
    'A Prisão ou o Milhão, de Adilson Borges. Uma história real de queda, escolhas e reconstrução. Prefácio de Dr. Augusto Cury.',
  alternates: { canonical: '/a-prisao-ou-o-milhao' },
  openGraph: {
    type: 'book',
    locale: 'pt_BR',
    siteName: 'Editora Levi',
    url: '/a-prisao-ou-o-milhao',
    title: 'A Prisão ou o Milhão — Adilson Borges',
    description: 'Uma história real de queda, escolhas e reconstrução. Prefácio de Dr. Augusto Cury.',
  },
  twitter: {
    card: 'summary',
    title: 'A Prisão ou o Milhão — Adilson Borges',
    description: 'Uma história real de queda, escolhas e reconstrução. Prefácio de Dr. Augusto Cury.',
  },
}

const bookSchema = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: 'A Prisão ou o Milhão',
  alternateName: 'A Prisão ou o Milhão: Uma escolha real na superação do fracasso',
  url: pageUrl,
  isbn: '9786501430751',
  inLanguage: 'pt-BR',
  author: { '@type': 'Person', name: 'Adilson Borges' },
  publisher: { '@type': 'Organization', name: 'Editora Levi', url: siteUrl },
  description:
    'Uma história real de queda, escolhas e reconstrução, escrita por Adilson Borges e apresentada com prefácio de Dr. Augusto Cury.',
}

const reflections = [
  'Uma decisão que você sabe que precisa tomar — mas continua adiando.',
  'Uma fase da vida que parece durar mais do que deveria.',
  'Um erro que ainda pesa nas escolhas que você faz hoje.',
  'A sensação de que alguma coisa precisa mudar, mesmo sem saber exatamente por onde começar.',
]

const styles = `
body:has(.book-v2) .site-header,
body:has(.book-v2) .footer { display: none !important; }
body:has(.book-v2) { background: #090806; }
body:has(.book-v2) main { overflow: hidden; }

.book-v2 {
  --ink: #090806;
  --ink-2: #12100d;
  --paper: #f2eee5;
  --paper-2: #e8e1d4;
  --gold: #c88b16;
  --gold-2: #e6ad38;
  --white: #f8f4ec;
  --muted: #bbb2a4;
  background: var(--ink);
  color: var(--white);
  font-family: Arial, Helvetica, sans-serif;
}
.book-v2 * { box-sizing: border-box; }
.book-v2 .v2-shell { width: min(1180px, calc(100% - 72px)); margin: 0 auto; }
.book-v2 .v2-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--gold-2);
  font-size: 12px;
  line-height: 1;
  font-weight: 800;
  letter-spacing: .17em;
  text-transform: uppercase;
}
.book-v2 .v2-eyebrow::before {
  content: '';
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--gold-2);
  box-shadow: 0 0 16px rgba(230, 173, 56, .75);
}
.book-v2 .v2-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  padding: 0 28px;
  border-radius: 999px;
  border: 1px solid rgba(255, 222, 151, .38);
  background: linear-gradient(180deg, #efb94c 0%, #c98913 100%);
  color: #161009;
  text-decoration: none;
  font-size: 13px;
  font-weight: 900;
  letter-spacing: .035em;
  box-shadow: 0 16px 38px rgba(200, 139, 22, .22);
  transition: transform .2s ease, filter .2s ease;
}
.book-v2 .v2-btn:hover { transform: translateY(-2px); filter: brightness(1.05); }
.book-v2 .v2-btn::after { content: '→'; margin-left: 13px; font-size: 17px; }

.book-v2 .v2-hero {
  height: 100svh;
  min-height: 620px;
  max-height: 820px;
  position: relative;
  overflow: hidden;
  isolation: isolate;
  background: #050403;
}
.book-v2 .v2-hero video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 66% 50%;
  z-index: -4;
  filter: saturate(.9) contrast(1.08) brightness(.74);
  transform: scale(1.012);
}
.book-v2 .v2-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -3;
  background: linear-gradient(90deg, rgba(5,4,3,.98) 0%, rgba(5,4,3,.92) 25%, rgba(5,4,3,.64) 47%, rgba(5,4,3,.25) 70%, rgba(5,4,3,.08) 100%);
}
.book-v2 .v2-hero::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -2;
  background: linear-gradient(0deg, rgba(5,4,3,.90) 0%, rgba(5,4,3,.13) 26%, transparent 52%, rgba(5,4,3,.12) 100%);
}
.book-v2 .v2-hero-inner {
  height: 100%;
  display: flex;
  align-items: flex-start;
  padding-top: clamp(48px, 8vh, 78px);
  padding-bottom: 42px;
}
.book-v2 .v2-hero-copy { width: 52%; max-width: 620px; text-shadow: 0 3px 24px rgba(0,0,0,.42); }
.book-v2 .v2-hero .v2-eyebrow {
  padding: 10px 14px;
  margin-bottom: 20px;
  border: 1px solid rgba(230,173,56,.34);
  border-radius: 999px;
  background: rgba(8,7,5,.48);
  backdrop-filter: blur(7px);
}
.book-v2 .v2-hero h1 {
  margin: 0;
  max-width: 590px;
  font-size: clamp(64px, 6.2vw, 84px);
  line-height: .88;
  letter-spacing: -.065em;
  font-weight: 950;
  text-transform: uppercase;
}
.book-v2 .v2-hero h1 span { display: block; color: var(--gold-2); }
.book-v2 .v2-kicker {
  margin: 22px 0 12px;
  max-width: 540px;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(21px, 2vw, 25px);
  line-height: 1.18;
  font-weight: 700;
}
.book-v2 .v2-lead {
  margin: 0 0 18px;
  max-width: 535px;
  color: #e3ddd3;
  font-size: 15.5px;
  line-height: 1.52;
}
.book-v2 .v2-meta { margin-top: 11px; color: #bdb5a8; font-size: 11px; letter-spacing: .03em; }
.book-v2 .v2-author-stamp {
  position: absolute;
  right: 38px;
  bottom: 26px;
  z-index: 2;
  padding: 10px 13px;
  border: 1px solid rgba(230,173,56,.32);
  background: rgba(7,6,4,.58);
  backdrop-filter: blur(7px);
  color: #e7d4a8;
  font-size: 10px;
  letter-spacing: .14em;
  text-transform: uppercase;
}

.book-v2 .v2-statement { background: var(--paper); color: #17130e; padding: 108px 0; }
.book-v2 .v2-statement-grid { display: grid; grid-template-columns: 1.06fr .94fr; gap: 86px; align-items: end; }
.book-v2 .v2-statement .v2-eyebrow { color: #8d641d; margin-bottom: 23px; }
.book-v2 .v2-statement h2 {
  margin: 0;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(46px, 5vw, 65px);
  line-height: 1.02;
  letter-spacing: -.038em;
}
.book-v2 .v2-statement h2 em { color: var(--gold); font-style: normal; }
.book-v2 .v2-statement-copy { color: #433b31; font-size: 17px; line-height: 1.72; }
.book-v2 .v2-question {
  margin: 28px 0 30px;
  color: #19140d;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 30px;
  line-height: 1.2;
  font-weight: 700;
}

.book-v2 .v2-cinema {
  min-height: 500px;
  position: relative;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: radial-gradient(circle at 70% 38%, rgba(207,142,20,.24), transparent 26%), #0b0805;
}
.book-v2 .v2-cinema-book {
  position: absolute;
  right: 8%;
  top: 50%;
  width: min(360px, 30vw);
  height: auto;
  transform: translateY(-48%) rotate(2deg);
  opacity: .48;
  filter: blur(.2px) saturate(.82);
  box-shadow: 0 34px 80px rgba(0,0,0,.58);
}
.book-v2 .v2-cinema::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(5,4,3,.88) 0%, rgba(5,4,3,.66) 52%, rgba(5,4,3,.32) 75%, rgba(5,4,3,.68) 100%);
}
.book-v2 .v2-cinema-content { position: relative; z-index: 2; text-align: center; }
.book-v2 .v2-cinema blockquote {
  margin: 0 auto;
  max-width: 930px;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(36px, 4.2vw, 52px);
  line-height: 1.12;
}
.book-v2 .v2-cinema strong { color: var(--gold-2); font-weight: 400; }

.book-v2 .v2-cury {
  padding: 112px 0;
  background: radial-gradient(circle at 12% 65%, rgba(203,139,23,.17), transparent 31%), #070604;
}
.book-v2 .v2-cury-grid { display: grid; grid-template-columns: 1.02fr .98fr; gap: 76px; align-items: center; }
.book-v2 .v2-cury .v2-eyebrow { margin-bottom: 24px; }
.book-v2 .v2-cury h2 {
  margin: 0 0 25px;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(45px, 4.8vw, 62px);
  line-height: 1.02;
  letter-spacing: -.036em;
}
.book-v2 .v2-cury p { max-width: 650px; color: #d3ccbf; font-size: 17px; line-height: 1.7; }
.book-v2 .v2-cury-quote {
  margin: 32px 0 0;
  padding-left: 23px;
  border-left: 2px solid var(--gold);
  color: #fff6e7;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 26px;
  line-height: 1.34;
}
.book-v2 .v2-cury-signature { margin-top: 15px; color: #c9a76a; font-size: 11px; letter-spacing: .09em; text-transform: uppercase; }
.book-v2 .v2-cury-photo {
  min-height: 570px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(230,173,56,.22);
  border-radius: 5px;
  background: #17100a;
  box-shadow: 0 28px 90px rgba(0,0,0,.38);
}
.book-v2 .v2-cury-photo img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 25%; filter: grayscale(1) sepia(.16) contrast(1.05) brightness(.82); }
.book-v2 .v2-cury-photo::after { content: ''; position: absolute; inset: 0; background: linear-gradient(0deg, rgba(7,6,4,.92), transparent 54%), linear-gradient(90deg, rgba(7,6,4,.25), transparent 48%); }
.book-v2 .v2-cury-label { position: absolute; z-index: 2; left: 27px; bottom: 27px; }
.book-v2 .v2-cury-label strong { display: block; font-family: Georgia, 'Times New Roman', serif; font-size: 28px; }
.book-v2 .v2-cury-label span { display: block; margin-top: 6px; color: #d3b978; font-size: 10px; letter-spacing: .14em; text-transform: uppercase; }

.book-v2 .v2-identify { padding: 108px 0 116px; background: linear-gradient(180deg, #f3efe7, #ece5d8); color: #17130e; }
.book-v2 .v2-identify-top { display: grid; grid-template-columns: 1.18fr .82fr; gap: 82px; align-items: end; margin-bottom: 48px; }
.book-v2 .v2-identify .v2-eyebrow { color: #8d651f; margin-bottom: 21px; }
.book-v2 .v2-identify h2 { margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: clamp(48px, 5.2vw, 66px); line-height: 1.02; letter-spacing: -.036em; }
.book-v2 .v2-identify-intro { color: #494136; font-size: 17px; line-height: 1.68; }
.book-v2 .v2-cards { display: grid; grid-template-columns: repeat(2, 1fr); gap: 17px; }
.book-v2 .v2-card { min-height: 205px; position: relative; overflow: hidden; padding: 29px; border: 1px solid #d3c8b6; background: rgba(255,255,255,.57); }
.book-v2 .v2-card-number { position: absolute; top: 4px; right: 18px; color: rgba(185,128,22,.18); font-size: 70px; line-height: 1; font-weight: 900; letter-spacing: -.08em; }
.book-v2 .v2-card p { max-width: 82%; margin: 68px 0 0; font-family: Georgia, 'Times New Roman', serif; font-size: 23px; line-height: 1.25; }
.book-v2 .v2-identify-close { display: flex; align-items: center; justify-content: space-between; gap: 38px; margin-top: 43px; padding-top: 31px; border-top: 1px solid #d2c5b1; }
.book-v2 .v2-identify-close h3 { max-width: 760px; margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 37px; line-height: 1.08; }
.book-v2 .v2-identify-close h3 span { color: #a66e0c; }

.book-v2 .v2-close { padding: 92px 0 86px; background: radial-gradient(circle at 72% 38%, rgba(207,142,20,.19), transparent 29%), #080604; }
.book-v2 .v2-close-grid { display: grid; grid-template-columns: .8fr 1.2fr; gap: 80px; align-items: center; }
.book-v2 .v2-close-cover { display: flex; justify-content: center; }
.book-v2 .v2-close-cover img { width: min(330px, 80%); height: auto; filter: drop-shadow(0 30px 55px rgba(0,0,0,.54)); }
.book-v2 .v2-close .v2-eyebrow { margin-bottom: 22px; }
.book-v2 .v2-close h2 { max-width: 730px; margin: 0 0 20px; font-family: Georgia, 'Times New Roman', serif; font-size: clamp(46px, 5vw, 64px); line-height: 1.03; letter-spacing: -.038em; }
.book-v2 .v2-close h2 span { color: var(--gold-2); }
.book-v2 .v2-close p { max-width: 620px; margin: 0 0 27px; color: #d2cabd; font-size: 17px; line-height: 1.67; }
.book-v2 .v2-formats { margin-top: 14px; color: #aa9f90; font-size: 11px; letter-spacing: .08em; text-transform: uppercase; }

@media (max-width: 900px) {
  .book-v2 .v2-shell { width: min(100% - 40px, 680px); }
  .book-v2 .v2-hero { height: auto; min-height: 820px; max-height: none; }
  .book-v2 .v2-hero video { object-position: 61% 50%; }
  .book-v2 .v2-hero::before { background: linear-gradient(180deg, rgba(5,4,3,.96) 0%, rgba(5,4,3,.80) 39%, rgba(5,4,3,.25) 64%, rgba(5,4,3,.40) 100%); }
  .book-v2 .v2-hero::after { background: linear-gradient(0deg, rgba(5,4,3,.91), transparent 48%); }
  .book-v2 .v2-hero-inner { min-height: 820px; padding-top: 42px; padding-bottom: 36px; }
  .book-v2 .v2-hero-copy { width: 100%; max-width: 100%; }
  .book-v2 .v2-hero h1 { font-size: clamp(52px, 15vw, 66px); max-width: 500px; }
  .book-v2 .v2-kicker { max-width: 92%; font-size: 22px; }
  .book-v2 .v2-lead { max-width: 94%; font-size: 15px; }
  .book-v2 .v2-author-stamp { display: none; }
  .book-v2 .v2-statement-grid,
  .book-v2 .v2-cury-grid,
  .book-v2 .v2-identify-top,
  .book-v2 .v2-close-grid { grid-template-columns: 1fr; gap: 34px; }
  .book-v2 .v2-statement,
  .book-v2 .v2-cury,
  .book-v2 .v2-identify,
  .book-v2 .v2-close { padding: 78px 0; }
  .book-v2 .v2-statement h2,
  .book-v2 .v2-cury h2,
  .book-v2 .v2-identify h2,
  .book-v2 .v2-close h2 { font-size: 42px; }
  .book-v2 .v2-question { font-size: 27px; }
  .book-v2 .v2-cinema { min-height: 430px; }
  .book-v2 .v2-cinema-book { width: 55vw; right: -10%; opacity: .34; }
  .book-v2 .v2-cinema blockquote { font-size: 33px; }
  .book-v2 .v2-cury-grid { display: flex; flex-direction: column-reverse; }
  .book-v2 .v2-cury-photo { width: 100%; min-height: 450px; }
  .book-v2 .v2-cury-quote { font-size: 23px; }
  .book-v2 .v2-cards { grid-template-columns: 1fr; }
  .book-v2 .v2-card p { max-width: 90%; font-size: 22px; }
  .book-v2 .v2-identify-close { align-items: flex-start; flex-direction: column; }
  .book-v2 .v2-identify-close h3 { font-size: 32px; }
  .book-v2 .v2-close-cover { order: 2; }
  .book-v2 .v2-close-copy { order: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .book-v2 .v2-hero video { display: none; }
}
`

export default function BookLandingPage() {
  return (
    <div className="book-v2">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }} />

      <section className="v2-hero" id="top">
        <video autoPlay muted loop playsInline preload="auto" aria-hidden="true">
          <source src="/book-hero-v2.mp4" type="video/mp4" />
        </video>
        <div className="v2-shell v2-hero-inner">
          <div className="v2-hero-copy">
            <div className="v2-eyebrow">Prefácio de Dr. Augusto Cury</div>
            <h1>
              A Prisão <span>ou o Milhão</span>
            </h1>
            <div className="v2-kicker">Um livro escrito no meio da crise — não depois dela.</div>
            <p className="v2-lead">
              Com prefácio de Dr. Augusto Cury, a obra parte de uma história real sobre queda, escolhas e reconstrução.
            </p>
            <a className="v2-btn" href="#historia">
              Quero conhecer o livro
            </a>
            <div className="v2-meta">Livro físico · PDF · EPUB</div>
          </div>
        </div>
        <div className="v2-author-stamp">Adilson Borges · Editora Levi</div>
      </section>

      <section className="v2-statement" id="historia">
        <div className="v2-shell v2-statement-grid">
          <div>
            <div className="v2-eyebrow">Uma história escrita durante a queda</div>
            <h2>
              Não é uma história de sucesso contada <em>depois que tudo deu certo.</em>
            </h2>
          </div>
          <div className="v2-statement-copy">
            Adilson Borges começou a escrever <em>A Prisão ou o Milhão</em> enquanto ainda tentava reconstruir a própria vida.
            <br />
            <br />
            Não havia um final pronto para transformar em lição. Havia consequências reais, escolhas que precisavam ser encaradas e uma pergunta difícil de ignorar:
            <div className="v2-question">O que ainda depende de mim a partir daqui?</div>
            <a className="v2-btn" href="#prefacio">
              Quero seguir nessa história
            </a>
          </div>
        </div>
      </section>

      <section className="v2-cinema" aria-label="A origem da obra">
        <Image
          className="v2-cinema-book"
          src="/books/a-prisao-ou-o-milhao.svg"
          alt=""
          width={430}
          height={650}
        />
        <div className="v2-shell v2-cinema-content">
          <blockquote>
            Algumas histórias são escritas depois da batalha. <strong>Esta começou durante ela.</strong>
          </blockquote>
        </div>
      </section>

      <section className="v2-cury" id="prefacio">
        <div className="v2-shell v2-cury-grid">
          <div>
            <div className="v2-eyebrow">Prefácio</div>
            <h2>Uma história que chamou a atenção de Augusto Cury.</h2>
            <p>
              No prefácio de <em>A Prisão ou o Milhão</em>, Dr. Augusto Cury conduz o leitor para uma das questões centrais da obra: é possível conquistar muito por fora e continuar preso por dentro.
            </p>
            <blockquote className="v2-cury-quote">
              “Procurar aquilo que o dinheiro não pode comprar talvez seja a chave que esta obra conduza.”
            </blockquote>
            <div className="v2-cury-signature">Dr. Augusto Cury · Prefácio de A Prisão ou o Milhão</div>
          </div>
          <div className="v2-cury-photo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5b/Augusto_Cury%2C_escritor_%2828339139296%29.jpg"
              alt="Dr. Augusto Cury"
            />
            <div className="v2-cury-label">
              <strong>Dr. Augusto Cury</strong>
              <span>Escritor · Prefaciador da obra</span>
            </div>
          </div>
        </div>
      </section>

      <section className="v2-identify">
        <div className="v2-shell">
          <div className="v2-identify-top">
            <div>
              <div className="v2-eyebrow">E onde você entra nessa história?</div>
              <h2>Talvez a sua prisão tenha outro nome.</h2>
            </div>
            <div className="v2-identify-intro">
              Você não precisa ter vivido a mesma história de Adilson Borges para reconhecer algumas das perguntas que deram origem a este livro.
            </div>
          </div>

          <div className="v2-cards">
            {reflections.map((reflection, index) => (
              <article className="v2-card" key={reflection}>
                <div className="v2-card-number">{String(index + 1).padStart(2, '0')}</div>
                <p>{reflection}</p>
              </article>
            ))}
          </div>

          <div className="v2-identify-close">
            <h3>
              A história é de Adilson. <span>Algumas perguntas podem ser suas.</span>
            </h3>
            <a className="v2-btn" href="#interesse">
              Quero começar a leitura
            </a>
          </div>
        </div>
      </section>

      <section className="v2-close" id="interesse">
        <div className="v2-shell v2-close-grid">
          <div className="v2-close-cover">
            <Image
              src="/books/a-prisao-ou-o-milhao.svg"
              alt="Capa do livro A Prisão ou o Milhão"
              width={430}
              height={650}
            />
          </div>
          <div className="v2-close-copy">
            <div className="v2-eyebrow">A Prisão ou o Milhão</div>
            <h2>
              A prisão e o milhão começam dentro da mesma pessoa. <span>O que muda é a escolha.</span>
            </h2>
            <p>
              Conheça a obra de Adilson Borges, com prefácio de Dr. Augusto Cury, em edição física ou digital.
            </p>
            <WhatsAppLink
              className="v2-btn"
              message="Olá! Quero saber como adquirir A Prisão ou o Milhão, de Adilson Borges."
            >
              Quero meu exemplar
            </WhatsAppLink>
            <div className="v2-formats">Livro físico · PDF · EPUB</div>
          </div>
        </div>
      </section>
    </div>
  )
}
