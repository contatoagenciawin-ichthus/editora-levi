import Image from 'next/image'
import Link from 'next/link'
import { BookCard } from '@/components/BookCard'
import { WhatsAppLink } from '@/components/WhatsAppLink'
import { books } from '@/data/books'

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="shell home-hero-grid">
          <div className="home-hero-copy">
            <span className="eyebrow gold">Editora Levi</span>
            <h1>Sua história pode virar um livro.</h1>
            <p>
              Transformamos ideias, experiências e conhecimento em obras publicadas, com direção editorial,
              ghostwriting, ISBN e publicação profissional.
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
          <div className="home-hero-visual" aria-hidden="true">
            <div className="halo" />
            <Image src="/brand/logo.svg" alt="" width={330} height={330} className="hero-logo" priority />
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
              Três obras, diferentes pontos de partida e um fio em comum: escolhas, responsabilidade,
              relações e propósito.
            </p>
          </div>
          <div className="books-grid">
            {books.map((book) => (
              <BookCard key={book.slug} book={book} />
            ))}
          </div>
        </div>
      </section>

      <section className="order-band">
        <div className="shell order-band-grid">
          <div>
            <span className="eyebrow gold">Pedidos</span>
            <h2>Quer comprar um dos livros?</h2>
            <p>
              Fale diretamente com a Editora Levi pelo WhatsApp. Informe a obra desejada e receba as orientações para o pedido.
            </p>
          </div>
          <WhatsAppLink
            className="btn btn-gold"
            message="Olá! Conheci os livros da Editora Levi pelo site e quero fazer um pedido."
          >
            Fazer meu pedido
          </WhatsAppLink>
        </div>
      </section>

      <section className="featured-book">
        <div className="shell featured-grid">
          <div className="featured-cover">
            <Image
              src="/books/a-prisao-ou-o-milhao.svg"
              alt="Capa do livro A Prisão ou o Milhão"
              width={380}
              height={570}
            />
          </div>
          <div>
            <span className="eyebrow gold">Obra em destaque · Prefácio de Dr. Augusto Cury</span>
            <h2>A Prisão ou o Milhão</h2>
            <p className="lead">Todo mundo tem uma prisão. Poucos escolhem o milhão.</p>
            <p>
              Um livro nascido em uma fase de perdas, dívidas e reconstrução. A história é real; a pergunta
              que fica para o leitor é o que suas próprias escolhas estão construindo agora.
            </p>
            <Link className="btn btn-gold" href="/a-prisao-ou-o-milhao">
              Conhecer o livro
            </Link>
          </div>
        </div>
      </section>

      <section className="publish" id="publique">
        <div className="shell publish-grid">
          <div>
            <span className="eyebrow gold">Publique com a Editora Levi</span>
            <h2>Você tem a história. A Editora Levi ajuda a transformá-la em livro.</h2>
          </div>
          <div>
            <p>
              Ghostwriting, organização do conteúdo, ISBN e publicação profissional para autores que querem
              colocar uma obra no mundo sem improviso editorial.
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
    </>
  )
}
