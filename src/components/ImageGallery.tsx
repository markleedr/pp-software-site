import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageGalleryProps {
  images: string[]
  alt: string
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  if (images.length === 0) return null

  const scrollBy = (dir: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: dir * track.clientWidth * 0.9, behavior: 'smooth' })
  }

  return (
    <div className="relative mt-8">
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${alt} — screenshot ${i + 1}`}
            className="h-64 w-auto shrink-0 snap-start rounded-lg border border-border object-cover"
          />
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Scroll images left"
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 items-center justify-center rounded-pill bg-white border border-border shadow-md h-9 w-9 hover:bg-muted transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Scroll images right"
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-pill bg-white border border-border shadow-md h-9 w-9 hover:bg-muted transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}
    </div>
  )
}
