import Link from 'next/link'

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div>
          <div className="footer-brand">Editora Levi</div>
          <p>Transformamos ideias, experiências e conhecimento em obras publicadas.</p>
        </div>
        <div>
          <span className="eyebrow">Navegação</span>
          <div className="footer-links">
            <Link href="/#obras">Obras</Link>
            <Link href="/#publique">Publique seu livro</Link>
            <Link href="/a-prisao-ou-o-milhao">A Prisão ou o Milhão</Link>
          </div>
        </div>
        <div>
          <span className="eyebrow">Editora Levi</span>
          <p>Ghostwriting · ISBN · Publicação profissional</p>
        </div>
      </div>
      <div className="shell footer-bottom">© {new Date().getFullYear()} Editora Levi.</div>
    </footer>
  )
}
