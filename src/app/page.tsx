import Link from 'next/link'
import { BookCard } from '@/components/BookCard'
import { WhatsAppLink } from '@/components/WhatsAppLink'
import { books } from '@/data/books'

export default function Home() {
  return (
    <>
      <section className="home-hero home-hero-refined home-hero-institutional">
        <div className="shell home-hero-institutional-grid">
          <div className="home-hero-copy">
            <span className="eyebrow gold">Editora Levi</span>
            <h1>Livros com direção editorial, identidade e presença.</h1>
            <p>
              A Editora Levi transforma originais, ideias e experiências em obras prontas para chegar ao leitor,
              acompanhando cada projeto da construção editorial à publicação.
            </p>
            <div className="actions">
              <WhatsAppLink
                className="btn btn-gold"
                message="Olá! Conheci a Editora Levi pelo site e quero conversar sobre a publicação do meu livro."
              >
                Apresentar meu projeto
              </WhatsAppLink>
              <Link className="btn btn-outline-light" href="#processo">
                Conhecer a editora
              </Link>
            </div>
          </div>

          <div className="home-hero-statement" aria-label="Atuação editorial da Editora Levi">
            <span>Do original ao livro publicado</span>
            <p>
              Direção editorial, preparação, revisão, projeto gráfico, publicação e acompanhamento em uma mesma
              estrutura.
            </p>
          </div>
        </div>
      </section>

      <section className="home-proof-strip" aria-label="Editora Levi em resumo">
        <div className="shell home-proof-grid">
          <div>
            <strong>Obras publicadas</strong>
            <span>projetos que já saíram do original e chegaram ao leitor</span>
          </div>
          <div>
            <strong>Estrutura editorial</strong>
            <span>texto, preparação, revisão, projeto gráfico, ISBN e publicação</span>
          </div>
          <div>
            <strong>Acompanhamento direto</strong>
            <span>cada projeto começa por uma conversa sobre obra, estágio e objetivo</span>
          </div>
        </div>
      </section>

      <section className="section editorial-capability" id="processo">
        <div className="shell">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Capacidade editorial</span>
              <h2>Publicar não é apenas colocar um arquivo à venda.</h2>
            </div>
            <p>
              Uma obra precisa de coerência entre conteúdo, linguagem, projeto gráfico, acabamento e forma de
              chegar ao público. É nesse conjunto que a Editora Levi trabalha.
            </p>
          </div>

          <div className="capability-grid">
            <article>
              <span>01</span>
              <h3>Construção editorial</h3>
              <p>Organização do original, desenvolvimento do texto e ghostwriting quando o projeto exige.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Preparação da obra</h3>
              <p>Revisão, estrutura, diagramação e decisões gráficas que transformam conteúdo em livro.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Publicação</h3>
              <p>ISBN, arquivos finais e preparação dos formatos necessários para a obra circular.</p>
            </article>
            <article>
              <span>04</span>
              <h3>Presença e entrega</h3>
              <p>Um projeto pensado para existir como produto editorial, não apenas como documento finalizado.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section works-proof" id="obras">
        <div className="shell">
          <div className="section-heading works-proof-heading">
            <div>
              <span className="eyebrow">Obras publicadas</span>
              <h2>O catálogo é parte da nossa apresentação.</h2>
            </div>
            <p>
              Capas, formatos e propostas diferentes, conduzidos até se tornarem obras publicadas. Os livros abaixo
              mostram o trabalho concluído, não uma promessa de serviço.
            </p>
          </div>
          <div className="books-grid books-grid-mockups">
            {books.map((book) => (
              <BookCard key={book.slug} book={book} />
            ))}
          </div>
        </div>
      </section>

      <section className="featured-book featured-book-home production-proof">
        <div className="shell production-proof-grid">
          <figure className="production-proof-visual">
            <img
              src="/media/prisao-ambientado.webp"
              alt="A Prisão ou o Milhão em composição editorial com exemplares físicos"
              width={720}
              height={1081}
              loading="lazy"
              decoding="async"
            />
          </figure>
          <div className="production-proof-copy">
            <span className="eyebrow gold">Projeto em destaque</span>
            <h2>Quando o livro precisa existir também como presença.</h2>
            <p className="lead">A Prisão ou o Milhão · projeto editorial e lançamento</p>
            <p>
              O lançamento reúne conteúdo, identidade visual, edição física e versões digitais em um mesmo projeto.
              É um exemplo de como uma obra pode ser preparada para chegar ao público com unidade entre mensagem e
              apresentação.
            </p>
            <div className="feature-facts" aria-label="Entregas do projeto">
              <span>Livro físico</span>
              <span>PDF e EPUB</span>
              <span>Landing própria</span>
            </div>
            <Link className="btn btn-gold" href="/a-prisao-ou-o-milhao">
              Conhecer o projeto
            </Link>
          </div>
        </div>
      </section>

      <section className="publish publish-refined" id="publique">
        <div className="shell publish-grid">
          <div>
            <span className="eyebrow gold">Publique com a Editora Levi</span>
            <h2>O ponto de partida é entender o livro que você quer colocar no mundo.</h2>
          </div>
          <div>
            <p>
              Alguns autores chegam com um manuscrito pronto. Outros têm capítulos, anotações ou apenas a história
              que desejam contar. A conversa inicial serve para identificar o estágio do projeto e o trabalho
              editorial necessário.
            </p>
            <div className="service-list">
              <span>Ghostwriting</span>
              <span>Preparação e revisão</span>
              <span>Projeto gráfico</span>
              <span>ISBN</span>
              <span>Publicação</span>
            </div>
            <WhatsAppLink
              className="btn btn-gold"
              message="Olá! Vi o trabalho da Editora Levi e quero conversar sobre o meu projeto de livro."
            >
              Conversar sobre meu projeto
            </WhatsAppLink>
          </div>
        </div>
      </section>

      <section className="section editorial-capability" id="editora">
        <div className="shell">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Sobre a Editora Levi</span>
              <h2>Uma estrutura editorial construída para acompanhar a obra inteira.</h2>
            </div>
            <p>
              A Editora Levi reúne direção editorial, preparação, revisão, projeto gráfico e publicação em uma mesma
              estrutura. Fundada por Adilson Borges, nasceu da experiência prática de conduzir livros da ideia ao
              produto editorial final e hoje organiza esse processo para novos projetos e autores.
            </p>
          </div>
        </div>
      </section>

      <section className="order-band order-band-refined">
        <div className="shell order-band-grid">
          <div>
            <span className="eyebrow gold">Editora Levi</span>
            <h2>Tem um original, uma ideia ou uma história para publicar?</h2>
            <p>
              Conte em poucas palavras o que você já tem e em que ponto está. A partir daí conseguimos indicar o
              próximo passo editorial.
            </p>
          </div>
          <WhatsAppLink
            className="btn btn-gold"
            message="Olá! Quero apresentar um projeto de livro para a Editora Levi."
          >
            Falar com a Editora Levi
          </WhatsAppLink>
        </div>
      </section>
    </>
  )
}
