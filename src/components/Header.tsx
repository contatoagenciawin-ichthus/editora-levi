import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label="Editora Levi - Início">
          <Image src="/brand/logo.svg" alt="" width={54} height={54} className="brand-mark" priority />
          <div>
            <strong>Editora Levi</strong>
            <span>Livros, autores e publicação</span>
          </div>
        </Link>
        <nav className="nav" aria-label="Navegação principal">
          <Link href="/#obras">Obras</Link>
          <Link href="/#publique">Publique seu livro</Link>
          <Link href="/a-prisao-ou-o-milhao">A Prisão ou o Milhão</Link>
        </nav>
      </div>
    </header>
  )
}
