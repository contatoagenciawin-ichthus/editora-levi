import Link from 'next/link'
import { BookCard } from '@/components/BookCard'
import { BookMockup } from '@/components/BookMockup'
import { WhatsAppLink } from '@/components/WhatsAppLink'
import { books } from '@/data/books'

export default function Home() {
  return (
    <>
      <section className="home-hero home-hero-refined">
        <div className="shell home-hero-grid">
          <div className="home-hero-copy">
            <span className="eyebrow gold">Editora Levi</span>
            <h1>Uma boa história precisa de forma para virar livro.</h1>
            <p>
              A Editora Levi organiza, desenvolve e publica projetos para autores que têm algo consistente a dizer —
              do material inicial à obra pronta para chegar ao leitor.
            </p>
            <div className="actions">
              <WhatsAppLink
                className="btn btn-gold"
                message="Olá! Conheci a Editora Levi pelo site e quero conversar sobre a publicação do meu livro."
              >
                Quero publicar meu livro
              </WhatsAppLink>
              <Link className="btn btn-outline-light" href="#obras">
                Conhecer o catálogo
              </Link>
            </div>
          </div>

          <div className="home-library-stage" aria-label="Obras publicadas pela Editora Levi">
            <BookMockup
              src={books[0].cover}
              alt="A Prisão ou o Milhão"
              className="home-mockup home-mockup-main"
              priority
            />
            <BookMockup
              src={books[1].cover}
              alt="O Poder das Escolhas"
              className="home-mockup home-mockup-left"
              priority
            />
            <BookMockup
              src={books[2].cover}
              alt="Homens Não Lavam Vasilhas"
              className="home-mockup home-mockup-right"
              priority
            />
          </div>
        </div>
      </section>

      <section className="home-proof-strip" aria-label="Editora Levi em resumo">
        <div className="shell home-proof-grid">
          <div>
            <strong>3 obras publicadas</strong>
            <span>o catálogo começa com os livros de Adilson Borges</span>
          </div>
          <div>
            <strong>Texto · edição · publicação</strong>
            <span>estrutura editorial para transformar material em obra</span>
          </div>
          <div>
            <strong>Projeto por projeto</strong>
            <span>atendimento direto e decisões construídas com o autor</span>
          </div>
        </div>
      </section>

      <section className="featured-book featured-book-home">
        <div className="shell featured-grid">
          <div className="featured-cover">
            <BookMockup
              src={books[0].cover}
              alt="Capa do livro A Prisão ou o Milhão"
              className="featured-mockup"
              priority
            />
          </div>
          <div>
            <span className="eyebrow gold">Obra em destaque · Prefácio de Dr. Augusto Cury</span>
            <h2>A Prisão ou o Milhão</h2>
            <p className="lead">Um livro escrito no meio da crise, não depois dela.</p>
            <p>
              Adilson Borges começou a escrever enquanto ainda tentava reconstruir a própria vida. Não havia um
              final pronto para transformar em lição. Havia consequências reais, escolhas que precisavam ser
              encaradas e uma pergunta difícil de ignorar: o que ainda depende de mim a partir daqui?
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
            <span className="eyebrow">Três livros, três pontos de partida</span>
            <h2>O catálogo não repete a mesma conversa.</h2>
          </div>
          <div className="territory-copy">
            <p>
              <strong>A Prisão ou o Milhão</strong> começa na queda e acompanha escolhas, consequências e
              reconstrução.
            </p>
            <p>
              <strong>O Poder das Escolhas</strong> olha para padrões que se repetem e para a responsabilidade por
              decisões que moldam relações, trabalho, fé e emoções.
            </p>
            <p>
              <strong>Homens Não Lavam Vasilhas</strong> parte de uma provocação para discutir presença,
              responsabilidade, família e propósito masculino.
            </p>
          </div>
        </div>
      </section>

      <section className="section catalog-section" id="obras">
        <div className="shell">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Catálogo</span>
              <h2>Livros de Adilson Borges</h2>
            </div>
            <p>
              Cada obra nasce de uma pergunta diferente. O ponto em comum é a tentativa de olhar para escolhas e
              consequências sem transformar experiência em fórmula pronta.
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
          <figure className="author-portrait-card">
            <img
              src="https://prisao-milhao.vercel.app/media/adilson.jpg"
              alt="Adilson Borges"
              loading="lazy"
              decoding="async"
            />
            <figcaption>Adilson Borges</figcaption>
          </figure>
          <div>
            <span className="eyebrow gold">O autor</span>
            <h2>Adilson Borges</h2>
            <p>
              Bacharel em Direito, empresário, compositor e multi-instrumentista autodidata, Adilson escreve a partir
              de experiências que atravessam escolhas, fé, trabalho, família e responsabilidade.
            </p>
            <p>
              Seus três livros partem de situações diferentes — uma queda financeira, padrões de decisão e a presença
              do homem na família — sem separar as ideias das consequências que elas produzem na vida.
            </p>
            <Link className="text-link" href="/#obras">
              Conhecer o catálogo →
            </Link>
          </div>
        </div>
      </section>

      <section className="publish publish-refined" id="publique">
        <div className="shell publish-grid">
          <div>
            <span className="eyebrow gold">Publique com a Editora Levi</span>
            <h2>Seu livro não precisa chegar pronto. Precisa começar com clareza.</h2>
          </div>
          <div>
            <p>
              Alguns autores chegam com um manuscrito. Outros com anotações, gravações, uma história ou uma ideia
              ainda pela metade. Nosso trabalho começa entendendo em que ponto o projeto está e definindo o caminho
              editorial até a publicação.
            </p>
            <div className="service-list">
              <span>Estrutura editorial</span>
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
            <span className="eyebrow gold">Catálogo e novos projetos</span>
            <h2>Quer conhecer um livro ou conversar sobre o seu?</h2>
            <p>
              As obras disponíveis têm seus caminhos de compra no catálogo. Para projetos editoriais, o contato é
              direto pelo WhatsApp.
            </p>
          </div>
          <WhatsAppLink
            className="btn btn-gold"
            message="Olá! Conheci a Editora Levi pelo site e quero falar sobre um projeto editorial."
          >
            Conversar com a Editora Levi
          </WhatsAppLink>
        </div>
      </section>
    </>
  )
}
