export type Book = {
  slug: string
  title: string
  subtitle: string
  description: string
  theme: string
  author: string
  cover: string
  href: string
  external?: boolean
}

export const books: Book[] = [
  {
    slug: 'a-prisao-ou-o-milhao',
    title: 'A Prisão ou o Milhão',
    subtitle: 'Uma escolha real na superação do fracasso',
    description:
      'Uma história escrita durante a queda, quando perdas, dívidas e escolhas difíceis ainda faziam parte do presente e a reconstrução não tinha um final pronto.',
    theme: 'Queda · escolhas · reconstrução',
    author: 'Adilson Borges',
    cover: '/books/prisão.png',
    href: '/a-prisao-ou-o-milhao',
  },
  {
    slug: 'o-poder-das-escolhas',
    title: 'O Poder das Escolhas',
    subtitle: 'Como reprogramar sua mente; romper padrões invisíveis e mudar seu destino',
    description:
      'Uma reflexão sobre padrões que se repetem antes mesmo de percebermos e sobre o que muda quando decisões passam a ser feitas com mais consciência.',
    theme: 'Decisão · padrões · responsabilidade',
    author: 'Adilson Borges',
    cover: '/books/poder-escolhas.png',
    href: 'https://www.amazon.com.br/dp/B0FFNJMT2T',
    external: true,
  },
  {
    slug: 'homens-nao-lavam-vasilhas',
    title: 'Homens Não Lavam Vasilhas',
    subtitle: 'Um convite a um propósito muito maior',
    description:
      'O título provoca, mas a conversa vai além dele: presença, responsabilidade, família e o lugar que o homem escolhe ocupar dentro dessas relações.',
    theme: 'Presença · família · propósito',
    author: 'Adilson Borges',
    cover: '/books/homensa-vasilhas.png',
    href: 'https://www.amazon.com.br/dp/B0FLF37K3P',
    external: true,
  },
]
