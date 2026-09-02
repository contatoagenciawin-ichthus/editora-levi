import Link from 'next/link'
import { BookCard } from '@/components/BookCard'
import { WhatsAppLink } from '@/components/WhatsAppLink'
import { books } from '@/data/books'

export default function Home() {
  return (
    <>
      <section className="home-hero home-hero-refined">
        <div className="shell home-hero-grid">
          <div className="home-hero-copy">
            <span className="eyebrow gold">Editora Levi</span>
            <h1>Sua história pode virar um livro.</h1>
            <p>
              A Editora Levi trabalha para transformar ideias, experiências e conhecimento em obras publicadas —
              da organização do conteúdo à chegada do livro ao leitor.
            </p>
            <div className="actions">
              <WhatsAppLink
                className="btn btn-gold"
                message="Olá! Conheci a Editora Levi pelo site e quero conversar sobre a publicação do meu livro."
              >
                Quero publicar meu livro
              </WhatsAppLink>
              <Link className="btn btn-outline-light" href="#obras">
                Conhecer as obras
              </Link>
            </div>
          </div>

          <div className="home-library-stage" aria-label="Obras publicadas pela Editora Levi">
            <img
              src={books[0].cover}
              alt="Capa de A Prisão ou o Milhão"
              width={300}
              height={450}
              className="home-book home-book-main"
              fetchPriority="high"
            />
            <img
              src={books[1].cover}
              alt="Capa de O Poder das Escolhas"
              width={250}
              height={375}
              className="home-book home-book-left"
              fetchPriority="high"
            />
            <img
              src={books[2].cover}
              alt="Capa de Homens Não Lavam Vasilhas"
              width={250}
              height={375}
              className="home-book home-book-right"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <section className="home-proof-strip" aria-label="Editora Levi em resumo">
        <div className="shell home-proof-grid">
          <div>
            <strong>3 obras</strong>
            <span>já publicadas de Adilson Borges</span>
          </div>
          <div>
            <strong>Ghostwriting · ISBN</strong>
            <span>estrutura editorial para tirar uma obra do papel</span>
          </div>
          <div>
            <strong>Contato direto</strong>
            <span>pedidos e novos projetos pelo WhatsApp</span>
          </div>
        </div>
      </section>

      <section className="featured-book featured-book-home">
        <div className="shell featured-grid">
          <div className="featured-cover">
            <img
              src={books[0].cover}
              alt="Capa do livro A Prisão ou o Milhão"
              width={380}
              height={570}
              loading="eager"
              decoding="async"
            />
          </div>
          <div>
            <span className="eyebrow gold">Obra em destaque · Prefácio de Dr. Augusto Cury</span>
            <h2>A Prisão ou o Milhão</h2>
            <p className="lead">Todo mundo tem uma prisão. Poucos escolhem o milhão.</p>
            <p>
              Adilson Borges começou a escrever quando ainda enfrentava dívidas, perdas e as consequências de
              decisões que não deram certo. O livro nasce desse período e acompanha a tentativa de compreender
              como pensamentos, escolhas, fé e responsabilidade participam de uma reconstrução real.
            </p>
            <div className="feature-facts" aria-label="Destaques do livro">
              <span>História real</span>
              <span>Reflexões e exercícios</span>
              <span>Livro físico · PDF · EPUB</span>
            </div>
            <Link className="btn btn-gold" href="/a-prisao-ou-o-milhao">
              Conhecer o livro
            </Link>
          </div>
        </div>
      </section>

      <section className="section editorial-territory">
        <div className="shell editorial-territory-grid">
          <div>
            <span className="eyebrow">Um autor, três conversas</span>
            <h2>Escolhas, responsabilidade e propósito aparecem por caminhos diferentes.</h2>
          </div>
          <div className="territory-copy">
            <p>
              Em <strong>A Prisão ou o Milhão</strong>, a conversa começa no fracasso e na reconstrução.
            </p>
            <p>
              Em <strong>O Poder das Escolhas</strong>, o foco está nos padrões que repetimos e nas decisões que
              moldam relações, trabalho, fé e emoções.
            </p>
            <p>
              Em <strong>Homens Não Lavam Vasilhas</strong>, a provocação se volta para presença, responsabilidade,
              família e propósito masculino.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="obras">
        <div className="shell">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Obras publicadas</span>
              <h2>Livros de Adilson Borges</h2>
            </div>
            <p>
              Não são três versões da mesma ideia. Cada livro parte de uma pergunta diferente e abre uma conversa
              própria com o leitor.
            </p>
          </div>
          <div className="books-grid">
            {books.map((book) => (
              <BookCard key={book.slug} book={book} />
            ))}
          </div>
        </div>
      </section>

      <section className="section author-home">
        <div className="shell author-home-grid">
          <div className="author-signature" aria-hidden="true">
            <span>AB</span>
            <small>Adilson Borges</small>
          </div>
          <div>
            <span className="eyebrow gold">O autor</span>
            <h2>Adilson Borges</h2>
            <p>
              Bacharel em Direito, empresário, compositor e multi-instrumentista autodidata, Adilson escreve a
              partir de experiências vividas e de temas que atravessam decisões, relações, fé, trabalho e propósito.
            </p>
            <p>
              Suas obras partem de situações concretas — uma queda financeira, padrões de escolha, a presença do
              homem na família — para provocar reflexão sem separar a ideia das consequências que ela produz na vida.
            </p>
            <Link className="text-link" href="/#obras">
              Conhecer as obras →
            </Link>
          </div>
        </div>
      </section>

      <section className="publish publish-refined" id="publique">
        <div className="shell publish-grid">
          <div>
            <span className="eyebrow gold">Publique com a Editora Levi</span>
            <h2>Você tem algo a dizer. O próximo passo é transformar isso em livro.</h2>
          </div>
          <div>
            <p>
              A Editora Levi acompanha projetos que precisam sair da ideia e ganhar estrutura de obra publicada.
              O atendimento começa por uma conversa direta para entender o projeto, o estágio do material e o
              caminho editorial mais adequado.
            </p>
            <div className="service-list">
              <span>Ghostwriting</span>
              <span>ISBN</span>
              <span>Publicação profissional</span>
            </div>
            <WhatsAppLink
              className="btn btn-gold"
              message="Olá! Vi o trabalho da Editora Levi e quero entender como funciona para publicar meu livro."
            >
              Falar sobre meu livro
            </WhatsAppLink>
          </div>
        </div>
      </section>

      <section className="order-band order-band-refined">
        <div className="shell order-band-grid">
          <div>
            <span className="eyebrow gold">Livros e atendimento</span>
            <h2>Quer pedir uma obra ou falar sobre seu projeto?</h2>
            <p>
              O atendimento da Editora Levi é feito diretamente pelo WhatsApp. Para comprar, informe o título
              desejado. Para publicar, conte em poucas palavras o que você pretende transformar em livro.
            </p>
          </div>
          <WhatsAppLink
            className="btn btn-gold"
            message="Olá! Conheci a Editora Levi pelo site e quero falar com vocês."
          >
            Falar com a Editora Levi
          </WhatsAppLink>
        </div>
      </section>
    </>
  )
}
