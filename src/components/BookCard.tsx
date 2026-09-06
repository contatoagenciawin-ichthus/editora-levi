import Link from 'next/link'
import type { Book } from '@/data/books'
import { BookMockup } from '@/components/BookMockup'

export function BookCard({ book }: { book: Book }) {
  const content = (
    <>
      <div className="book-cover-wrap">
        <BookMockup src={book.cover} alt={`Capa do livro ${book.title}`} className="catalog-mockup" />
      </div>
      <div className="book-meta">
        <span className="book-theme">{book.theme}</span>
        <h3>{book.title}</h3>
        <p className="book-subtitle">{book.subtitle}</p>
        <p className="book-description">{book.description}</p>
        <strong>{book.external ? 'Ver na Amazon' : 'Conhecer a obra'} →</strong>
      </div>
    </>
  )

  if (book.external) {
    return (
      <a className="book-card" href={book.href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }

  return (
    <Link className="book-card" href={book.href}>
      {content}
    </Link>
  )
}
