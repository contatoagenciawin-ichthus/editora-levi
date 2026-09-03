import type { Metadata } from 'next'
import video1 from './_media/video1'
import video2 from './_media/video2'
import video3 from './_media/video3'
import poster from './_media/poster'
import cinema1 from './_media/cinema1'
import cinema2 from './_media/cinema2'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://editoralevi.com.br'
const pageUrl = `${siteUrl}/a-prisao-ou-o-milhao`

export const metadata: Metadata = {
  title: 'A Prisão ou o Milhão — Adilson Borges',
  description: 'A Prisão ou o Milhão, de Adilson Borges. Uma história real de queda, escolhas e reconstrução. Prefácio de Dr. Augusto Cury.',
  alternates: { canonical: '/a-prisao-ou-o-milhao' },
}

const VIDEO_DATA = `data:video/mp4;base64,${video1}${video2}${video3}`
const POSTER_DATA = `data:image/jpeg;base64,${poster}`
const CINEMA_DATA = `data:image/jpeg;base64,${cinema1}${cinema2}`

const bookSchema = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: 'A Prisão ou o Milhão',
  url: pageUrl,
  isbn: '9786501430751',
  inLanguage: 'pt-BR',
  author: { '@type': 'Person', name: 'Adilson Borges' },
  publisher: { '@type': 'Organization', name: 'Editora Levi', url: siteUrl },
}

const pageStyles = `
body:has(.book-v2-html) .site-header,
body:has(.book-v2-html) .footer { display: none !important; }
body:has(.book-v2-html) main { overflow: hidden; }

:root{
  --ink:#090806;
  --ink2:#12100d;
  --paper:#f2eee5;
  --paper2:#e8e1d4;
  --gold:#c88b16;
  --gold2:#e6ad38;
  --white:#f8f4ec;
  --muted:#b7b0a3;
}
*{box-sizing:border-box} html{scroll-behavior:smooth} body{margin:0;background:var(--ink);color:var(--white);font-family:Arial,Helvetica,sans-serif;overflow-x:hidden}.serif{font-family:Georgia,'Times New Roman',serif}.wrap{max-width:1240px;margin:auto;padding:0 56px}.eyebrow{letter-spacing:.18em;text-transform:uppercase;font-size:12px;font-weight:800}.btn{display:inline-flex;align-items:center;justify-content:center;padding:16px 24px;border-radius:999px;background:linear-gradient(180deg,var(--gold2),var(--gold));color:#12100d;text-decoration:none;font-weight:900;font-size:13px;letter-spacing:.04em;box-shadow:0 14px 40px rgba(200,139,22,.22)}.btn:after{content:'→';margin-left:12px;font-size:17px}.hero{min-height:910px;position:relative;overflow:hidden;background:radial-gradient(circle at 78% 22%,rgba(213,144,26,.21),transparent 34%),linear-gradient(115deg,#050403 0%,#0b0906 52%,#1a0d04 100%)}.hero:before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.05),rgba(0,0,0,0) 52%,rgba(0,0,0,.2));pointer-events:none}.hero .wrap{min-height:910px;display:flex;align-items:center;position:relative;z-index:2}.hero-copy{width:54%;padding-top:18px}.hero .eyebrow{color:var(--gold2);margin-bottom:24px}.hero h1{margin:0;font-family:Arial,Helvetica,sans-serif;text-transform:uppercase;line-height:.88;letter-spacing:-.06em;font-size:96px;font-weight:950}.hero h1 span{display:block;color:var(--gold2)}.hero .kicker{font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.2;margin:34px 0 18px;max-width:690px}.hero .lead{max-width:610px;color:#d7d1c5;font-size:17px;line-height:1.65;margin-bottom:26px}.hero .meta{font-size:12px;color:#bcb4a7;margin-top:13px}.hero-visual{position:absolute;right:-80px;top:0;width:58%;height:100%;z-index:1}.hero-visual:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,#090806 0%,rgba(9,8,6,.32) 22%,rgba(9,8,6,0) 50%),linear-gradient(0deg,#090806 0%,rgba(9,8,6,0) 28%)}.hero-visual img{width:100%;height:100%;object-fit:cover;object-position:53% 47%;filter:saturate(.92) contrast(1.05)}.hero-stamp{position:absolute;right:60px;bottom:52px;z-index:3;border:1px solid rgba(230,173,56,.45);padding:12px 16px;background:rgba(8,7,5,.72);backdrop-filter:blur(8px);font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#e9d6aa}

.light{background:var(--paper);color:#17130e}.statement{padding:118px 0 110px}.statement .grid{display:grid;grid-template-columns:1.1fr .9fr;gap:90px;align-items:end}.statement h2{font-family:Georgia,'Times New Roman',serif;font-size:64px;line-height:1.04;letter-spacing:-.035em;margin:0}.statement h2 em{font-style:normal;color:var(--gold)}.statement .copy{font-size:18px;line-height:1.72;color:#40392f}.statement .question{font-family:Georgia,'Times New Roman',serif;font-weight:bold;font-size:31px;line-height:1.22;margin:30px 0 30px;color:#19140d}.statement .eyebrow{color:#8c641d;margin-bottom:25px}

.cinema{height:560px;position:relative;overflow:hidden;background:#100b07}.cinema img{position:absolute;inset:-10%;width:120%;height:120%;object-fit:cover;object-position:center 62%;filter:brightness(.42) saturate(.78) blur(.2px)}.cinema:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(5,4,3,.84),rgba(5,4,3,.36),rgba(5,4,3,.78)),linear-gradient(0deg,rgba(5,4,3,.7),transparent 46%,rgba(5,4,3,.34))}.cinema .wrap{position:relative;z-index:2;height:100%;display:flex;align-items:center;justify-content:center;text-align:center}.cinema blockquote{font-family:Georgia,'Times New Roman',serif;font-size:44px;line-height:1.13;max-width:910px;margin:0}.cinema blockquote strong{color:var(--gold2);font-weight:normal}

.cury{background:radial-gradient(circle at 12% 65%,rgba(203,139,23,.18),transparent 32%),#070604;padding:120px 0;position:relative;overflow:hidden}.cury .grid{display:grid;grid-template-columns:1.05fr .95fr;gap:80px;align-items:center}.cury .eyebrow{color:var(--gold2);margin-bottom:24px}.cury h2{font-family:Georgia,'Times New Roman',serif;font-size:62px;line-height:1.02;margin:0 0 28px;letter-spacing:-.035em}.cury .body{color:#d3ccbf;font-size:17px;line-height:1.7;max-width:650px}.cury .quote{margin-top:34px;border-left:2px solid var(--gold);padding-left:24px;font-family:Georgia,'Times New Roman',serif;font-size:27px;line-height:1.35;color:#fff6e7}.cury .sig{margin-top:16px;color:#c9a76a;font-size:12px;letter-spacing:.08em;text-transform:uppercase}.portrait{height:620px;border-radius:6px;overflow:hidden;position:relative;background:radial-gradient(circle at 65% 25%,#594520 0,#24170b 36%,#0b0805 72%);border:1px solid rgba(230,173,56,.24);box-shadow:0 28px 90px rgba(0,0,0,.4)}.portrait .remote{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 20%;filter:grayscale(1) sepia(.18) contrast(1.03);opacity:.9}.portrait .fallback{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:Georgia,'Times New Roman',serif;font-size:140px;color:rgba(230,173,56,.19);letter-spacing:-.08em}.portrait:after{content:'';position:absolute;inset:0;background:linear-gradient(0deg,rgba(7,6,4,.88),transparent 58%),linear-gradient(90deg,rgba(7,6,4,.42),transparent 45%)}.portrait-label{position:absolute;z-index:3;left:28px;bottom:28px}.portrait-label strong{display:block;font-family:Georgia,'Times New Roman',serif;font-size:29px}.portrait-label span{display:block;color:#d3b978;font-size:11px;letter-spacing:.14em;text-transform:uppercase;margin-top:6px}

.identify{padding:118px 0 128px;background:linear-gradient(180deg,#f3efe7,#ece5d8);color:#17130e}.identify .top{display:grid;grid-template-columns:1.2fr .8fr;gap:90px;align-items:end;margin-bottom:54px}.identify .eyebrow{color:#8d651f;margin-bottom:22px}.identify h2{font-family:Georgia,'Times New Roman',serif;font-size:66px;line-height:1.02;margin:0;letter-spacing:-.035em}.identify .intro{font-size:17px;line-height:1.7;color:#494136}.cards{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}.card{min-height:210px;padding:30px;border:1px solid #d3c8b6;background:rgba(255,255,255,.58);position:relative;overflow:hidden}.card .n{font-size:70px;font-weight:900;letter-spacing:-.08em;color:rgba(185,128,22,.18);position:absolute;right:18px;top:6px}.card p{font-family:Georgia,'Times New Roman',serif;font-size:25px;line-height:1.25;max-width:80%;margin:70px 0 0}.identify .closing{display:flex;align-items:center;justify-content:space-between;gap:40px;margin-top:46px;padding-top:34px;border-top:1px solid #d2c5b1}.identify .closing h3{font-family:Georgia,'Times New Roman',serif;font-size:38px;line-height:1.08;margin:0;max-width:780px}.identify .closing h3 span{color:#a66e0c}

@media(max-width:900px){.wrap{padding:0 24px}.hero{min-height:980px}.hero .wrap{min-height:980px;display:block;padding-top:54px}.hero-copy{width:100%;position:relative;z-index:3}.hero .eyebrow{font-size:10px;margin-bottom:16px}.hero h1{font-size:57px;line-height:.92}.hero .kicker{font-size:24px;margin:24px 0 14px;max-width:95%}.hero .lead{font-size:15px;max-width:95%;line-height:1.58}.hero-visual{width:100%;right:0;top:345px;height:635px}.hero-visual:after{background:linear-gradient(180deg,#090806 0%,rgba(9,8,6,.16) 20%,rgba(9,8,6,0) 44%),linear-gradient(0deg,#090806 0%,rgba(9,8,6,0) 28%)}.hero-visual img{object-position:center 50%}.hero .btn{margin-top:460px}.hero .meta{position:absolute;top:900px}.hero-stamp{display:none}.statement{padding:80px 0}.statement .grid,.cury .grid,.identify .top{grid-template-columns:1fr;gap:34px}.statement h2,.cury h2,.identify h2{font-size:43px}.statement .copy{font-size:16px}.statement .question{font-size:27px}.cinema{height:480px}.cinema blockquote{font-size:34px}.cury{padding:82px 0}.cury .grid{display:flex;flex-direction:column-reverse}.portrait{width:100%;height:470px}.cury .quote{font-size:24px}.identify{padding:80px 0 86px}.cards{grid-template-columns:1fr}.card p{font-size:23px;max-width:88%}.identify .closing{align-items:flex-start;flex-direction:column}.identify .closing h3{font-size:33px}}

/* V2.2 — hero em vídeo, mais próximo do ritmo do modelo */
.hero{min-height:760px;background:#050403;isolation:isolate}
.hero:before{z-index:1;background:linear-gradient(90deg,rgba(5,4,3,.97) 0%,rgba(5,4,3,.90) 26%,rgba(5,4,3,.62) 46%,rgba(5,4,3,.26) 68%,rgba(5,4,3,.10) 100%)}
.hero:after{content:'';position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(0deg,rgba(5,4,3,.86) 0%,rgba(5,4,3,.16) 22%,transparent 48%,rgba(5,4,3,.10) 100%)}
.hero-media{position:absolute;inset:0;z-index:0;overflow:hidden;background:#070503}
.hero-media .hero-poster,.hero-media video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:66% 48%}
.hero-media .hero-poster{z-index:0;filter:saturate(.9) contrast(1.06) brightness(.7)}
.hero-media video{z-index:1;filter:saturate(.88) contrast(1.08) brightness(.74);transform:scale(1.015)}
.hero .wrap{min-height:760px;z-index:2;align-items:flex-start;padding-top:110px;padding-bottom:56px}
.hero-copy{width:50%;max-width:610px;padding-top:0;text-shadow:0 2px 22px rgba(0,0,0,.42)}
.hero .eyebrow{display:inline-flex;align-items:center;gap:10px;padding:9px 13px;border:1px solid rgba(230,173,56,.34);background:rgba(8,7,5,.43);backdrop-filter:blur(7px);border-radius:999px;margin-bottom:18px}
.hero .eyebrow:before{content:'';width:7px;height:7px;border-radius:50%;background:var(--gold2);box-shadow:0 0 18px rgba(230,173,56,.9)}
.hero h1{font-size:82px;max-width:560px;margin-bottom:0}
.hero .kicker{font-size:22px;line-height:1.18;margin:22px 0 14px;max-width:540px}
.hero .lead{max-width:520px;color:#e2ddd3;font-size:16px;line-height:1.55;margin-bottom:18px}
.hero .meta{font-size:11px;letter-spacing:.02em;margin-top:10px}
.hero-stamp{z-index:3;bottom:28px}
@media(max-width:900px){
  .hero{min-height:850px}
  .hero .wrap{min-height:850px;display:flex;align-items:flex-start;padding-top:42px;padding-bottom:68px}
  .hero-copy{width:100%;max-width:100%;padding-top:0;text-shadow:0 2px 22px rgba(0,0,0,.7)}
  .hero-media{inset:0}
  .hero-media .hero-poster,.hero-media video{object-position:61% 50%;transform:none}
  .hero-media video{filter:saturate(.82) contrast(1.06) brightness(.6)}
  .hero:before{background:linear-gradient(180deg,rgba(5,4,3,.96) 0%,rgba(5,4,3,.89) 33%,rgba(5,4,3,.54) 61%,rgba(5,4,3,.56) 100%)}
  .hero:after{background:linear-gradient(0deg,rgba(5,4,3,.88) 0%,rgba(5,4,3,.08) 47%,transparent 72%)}
  .hero h1{font-size:55px;max-width:540px}
  .hero .kicker{font-size:23px;max-width:520px;margin:23px 0 14px}
  .hero .lead{font-size:15px;max-width:520px;margin-bottom:22px}
  .hero .btn{margin-top:0}
  .hero .meta{position:static;margin-top:13px}
}
@media(prefers-reduced-motion:reduce){.hero-media video{display:none}.hero-media .hero-poster{filter:saturate(.86) contrast(1.06) brightness(.66)}}
`

export default function BookLandingV2() {
  return (
    <div className="book-v2-html">
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }} />

      <section className="hero" id="top">
        <div className="hero-media" aria-hidden="true">
          <img className="hero-poster" src={POSTER_DATA} alt="" />
          <video autoPlay muted loop playsInline preload="metadata" poster={POSTER_DATA}>
            <source src={VIDEO_DATA} type="video/mp4" />
          </video>
        </div>
        <div className="wrap">
          <div className="hero-copy">
            <div className="eyebrow">Prefácio de Dr. Augusto Cury</div>
            <h1>A Prisão <span>ou o Milhão</span></h1>
            <div className="kicker">Um livro escrito no meio da crise — não depois dela.</div>
            <div className="lead">Com prefácio de Dr. Augusto Cury, a obra parte de uma história real sobre queda, escolhas e reconstrução.</div>
            <a className="btn" href="#historia">Quero conhecer o livro</a>
            <div className="meta">Livro físico · PDF · EPUB</div>
          </div>
        </div>
        <div className="hero-stamp">Adilson Borges · Editora Levi</div>
      </section>

      <section className="statement light" id="historia">
        <div className="wrap">
          <div className="grid">
            <div>
              <div className="eyebrow">Uma história escrita durante a queda</div>
              <h2>Não é uma história de sucesso contada <em>depois que tudo deu certo.</em></h2>
            </div>
            <div className="copy">
              Adilson Borges começou a escrever <em>A Prisão ou o Milhão</em> enquanto ainda tentava reconstruir a própria vida.<br /><br />
              Não havia um final pronto para transformar em lição. Havia consequências reais, escolhas que precisavam ser encaradas e uma pergunta difícil de ignorar:
              <div className="question">O que ainda depende de mim a partir daqui?</div>
              <a className="btn" href="#prefacio">Quero ler essa história</a>
            </div>
          </div>
        </div>
      </section>

      <section className="cinema">
        <img src={CINEMA_DATA} alt="" />
        <div className="wrap">
          <blockquote>Algumas histórias são escritas depois da batalha. <strong>Esta começou durante ela.</strong></blockquote>
        </div>
      </section>

      <section className="cury" id="prefacio">
        <div className="wrap">
          <div className="grid">
            <div>
              <div className="eyebrow">Prefácio</div>
              <h2>Uma história que chamou a atenção de Augusto Cury.</h2>
              <div className="body">No prefácio de <em>A Prisão ou o Milhão</em>, Dr. Augusto Cury conduz o leitor para uma das questões centrais da obra: é possível conquistar muito por fora e continuar preso por dentro.</div>
              <div className="quote">“Procurar aquilo que o dinheiro não pode comprar talvez seja a chave que esta obra conduza.”</div>
              <div className="sig">Dr. Augusto Cury · Prefácio de A Prisão ou o Milhão</div>
            </div>
            <div className="portrait">
              <div className="fallback">AC</div>
              <img className="remote" src="https://portalzumm.com.br/wp-content/uploads/2022/10/Augusto-Cury.jpg" alt="Dr. Augusto Cury" />
              <div className="portrait-label"><strong>Dr. Augusto Cury</strong><span>Escritor · Prefaciador da obra</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="identify">
        <div className="wrap">
          <div className="top">
            <div>
              <div className="eyebrow">E onde você entra nessa história?</div>
              <h2>Talvez a sua prisão tenha outro nome.</h2>
            </div>
            <div className="intro">Você não precisa ter vivido a mesma história de Adilson Borges para reconhecer algumas das perguntas que deram origem a este livro.</div>
          </div>
          <div className="cards">
            <div className="card"><div className="n">01</div><p>Uma decisão que você sabe que precisa tomar — mas continua adiando.</p></div>
            <div className="card"><div className="n">02</div><p>Uma fase da vida que parece durar mais do que deveria.</p></div>
            <div className="card"><div className="n">03</div><p>Um erro que ainda pesa nas escolhas que você faz hoje.</p></div>
            <div className="card"><div className="n">04</div><p>A sensação de que alguma coisa precisa mudar, mesmo sem saber por onde começar.</p></div>
          </div>
          <div className="closing">
            <h3>A história é de Adilson. <span>Algumas perguntas podem ser suas.</span></h3>
            <a className="btn" href="#top">Quero começar a leitura</a>
          </div>
        </div>
      </section>
    </div>
  )
}
