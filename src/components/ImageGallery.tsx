import { useRef } from 'react'
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react'

interface ImageGalleryProps {
  images: string[]
  alt: string
}

// Every product gets this slot filled — a real screenshot once one exists,
// a clearly-marked placeholder (dashed border, no shadow) until then, so
// half the products don't look finished and half don't. Never a fabricated
// screenshot — see CLAUDE.md on real vs. invented product data.
export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  if (images.length === 0) {
    return (
      <div className="aspect-video w-full rounded-lg border border-dashed border-border bg-muted flex flex-col items-center justify-center gap-2 px-4 text-center">
        <ImageIcon size={22} className="text-muted-foreground/50" strokeWidth={1.5} />
        <p className="text-xs font-medium text-muted-foreground/70">Screenshot coming soon</p>
      </div>
    )
  }

  const scrollBy = (dir: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: dir * track.clientWidth, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${alt} — screenshot${images.length > 1 ? ` ${i + 1}` : ''}`}
            className="aspect-video w-full shrink-0 snap-start rounded-lg border border-border object-cover shadow-lg"
          />
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Scroll images left"
            className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-pill bg-white border border-border shadow-md h-8 w-8 hover:bg-muted transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Scroll images right"
            className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-pill bg-white border border-border shadow-md h-8 w-8 hover:bg-muted transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </>
      )}
    </div>
  )
}
