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
      'Uma história escrita no meio da queda, quando dívidas, perdas e escolhas difíceis obrigaram Adilson Borges a rever a própria vida e encontrar um caminho de reconstrução.',
    theme: 'Queda · escolhas · reconstrução',
    author: 'Adilson Borges',
    cover: 'https://m.media-amazon.com/images/I/61aPFhnGmGL._SL1000_.jpg',
    href: '/a-prisao-ou-o-milhao',
  },
  {
    slug: 'o-poder-das-escolhas',
    title: 'O Poder das Escolhas',
    subtitle: 'Como reprogramar sua mente; romper padrões invisíveis e mudar seu destino',
    description:
      'Uma reflexão sobre os padrões que se repetem sem percebermos e sobre a responsabilidade de escolher com mais consciência nos relacionamentos, na fé, no trabalho e nas emoções.',
    theme: 'Decisão · padrões · responsabilidade',
    author: 'Adilson Borges',
    cover: 'https://m.media-amazon.com/images/I/71L77rah7bL._SL1500_.jpg',
    href: 'https://www.amazon.com.br/dp/B0FFNJMT2T',
    external: true,
  },
  {
    slug: 'homens-nao-lavam-vasilhas',
    title: 'Homens Não Lavam Vasilhas',
    subtitle: 'Um convite a um propósito muito maior',
    description:
      'Uma provocação sobre presença, responsabilidade e o papel do homem dentro da família — sem defender um modelo autoritário ou reduzir a discussão ao título.',
    theme: 'Presença · família · propósito',
    author: 'Adilson Borges',
    cover: 'https://m.media-amazon.com/images/I/71eeUk6AHNL._SL1500_.jpg',
    href: 'https://www.amazon.com.br/dp/B0FLF37K3P',
    external: true,
  },
]
