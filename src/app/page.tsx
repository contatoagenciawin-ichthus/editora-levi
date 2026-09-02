import Image from 'next/image'
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
              Ideias, experiências e conhecimento ganham forma editorial, publicação e um caminho para chegar ao leitor.
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
            <Image
              src="/books/a-prisao-ou-o-milhao.svg"
              alt="Capa de A Prisão ou o Milhão"
              width={300}
              height={450}
              className="home-book home-book-main"
              priority
            />
            <Image
              src="/books/o-poder-das-escolhas.svg"
              alt="Capa de O Poder das Escolhas"
              width={250}
              height={375}
              className="home-book home-book-left"
              priority
            />
            <Image
              src="/books/homens-nao-lavam-vasilhas.svg"
              alt="Capa de Homens Não Lavam Vasilhas"
              width={250}
              height={375}
              className="home-book home-book-right"
              priority
            />
          </div>
        </div>
      </section>

      <section className="home-proof-strip" aria-label="Editora Levi em resumo">
        <div className="shell home-proof-grid">
          <div>
            <strong>3</strong>
            <span>obras publicadas de Adilson Borges</span>
          </div>
          <div>
            <strong>Ghostwriting · ISBN</strong>
            <span>estrutura para transformar uma ideia em obra publicada</span>
          </div>
          <div>
            <strong>Contato direto</strong>
            <span>pedidos e projetos editoriais pelo WhatsApp</span>
          </div>
        </div>
      </section>

      <section className="featured-book featured-book-home">
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
              Um livro nascido em uma fase de perdas, dívidas e reconstrução. A história é real; a leitura avança
              sobre escolhas, responsabilidade, mentalidade e a possibilidade de recomeçar sem transformar o
              fracasso em espetáculo.
            </p>
            <div className="feature-facts" aria-label="Destaques do livro">
              <span>História real</span>
              <span>Reflexões e exercícios</span>
              <span>Físico, PDF e EPUB</span>
            </div>
            <Link className="btn btn-gold" href="/a-prisao-ou-o-milhao">
              Conhecer o livro
            </Link>
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
              Três títulos que partem de temas diferentes e se encontram em um território comum: escolhas,
              responsabilidade, relações e propósito.
            </p>
          </div>
          <div className="books-grid">
            {books.map((book) => (
              <BookCard key={book.slug} book={book} />
            ))}
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
