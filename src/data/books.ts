export type Book = {
  slug: string
  title: string
  subtitle: string
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
    author: 'Adilson Borges',
    cover: '/books/a-prisao-ou-o-milhao.svg',
    href: '/a-prisao-ou-o-milhao',
  },
  {
    slug: 'o-poder-das-escolhas',
    title: 'O Poder das Escolhas',
    subtitle: 'A decisão que muda seu destino',
    author: 'Adilson Borges',
    cover: '/books/o-poder-das-escolhas.svg',
    href: 'https://www.amazon.com.br/dp/B0FFNJMT2T',
    external: true,
  },
  {
    slug: 'homens-nao-lavam-vasilhas',
    title: 'Homens Não Lavam Vasilhas',
    subtitle: 'Um convite a um propósito muito maior',
    author: 'Adilson Borges',
    cover: '/books/homens-nao-lavam-vasilhas.svg',
    href: 'https://www.amazon.com.br/dp/B0FLF37K3P',
    external: true,
  },
]
