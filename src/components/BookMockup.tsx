type BookMockupProps = {
  src: string
  alt: string
  className?: string
  priority?: boolean
}

export function BookMockup({ src, alt, className = '', priority = false }: BookMockupProps) {
  return (
    <div className={`book-mockup ${className}`.trim()}>
      <div className="book-mockup__volume">
        <span className="book-mockup__pages" aria-hidden="true" />
        <span className="book-mockup__spine" aria-hidden="true" />
        <img
          src={src}
          alt={alt}
          className="book-mockup__cover"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
        />
      </div>
    </div>
  )
}
