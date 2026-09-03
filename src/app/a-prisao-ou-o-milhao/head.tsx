import posterHd1 from './_media/posterHd1'
import posterHd2 from './_media/posterHd2'

const POSTER_HD = `data:image/jpeg;base64,${posterHd1}${posterHd2}`

export default function Head() {
  return (
    <style>{`
      .hero-media .hero-poster {
        content: url("${POSTER_HD}") !important;
        filter: saturate(.92) contrast(1.08) brightness(.72) !important;
      }

      .hero-media video {
        opacity: .24 !important;
        filter: saturate(.94) contrast(1.06) brightness(.84) !important;
        mix-blend-mode: screen;
      }

      @media (max-width: 900px) {
        .hero-media .hero-poster {
          object-position: 66% 50% !important;
        }
        .hero-media video {
          opacity: .18 !important;
          mix-blend-mode: screen;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .hero-media video { display: none !important; }
      }
    `}</style>
  )
}
