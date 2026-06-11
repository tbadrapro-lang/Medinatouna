'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Carousel({
  images,
  caption,
  aspect = 'aspect-[4/3]',
}: {
  images: string[]
  caption?: string
  aspect?: string
}) {
  const [index, setIndex] = useState(0)
  const [errored, setErrored] = useState<Record<number, boolean>>({})
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)

  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length])
  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length])

  const startTimer = useCallback(() => {
    if (timer.current) clearInterval(timer.current)
    timer.current = setInterval(next, 4000)
  }, [next])

  useEffect(() => {
    startTimer()
    return () => { if (timer.current) clearInterval(timer.current) }
  }, [startTimer])

  const pause = () => { if (timer.current) clearInterval(timer.current) }
  const resume = () => startTimer()

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    const child = el.children[index] as HTMLElement | undefined
    if (child) {
      el.scrollTo({ left: child.offsetLeft - el.offsetLeft, behavior: 'smooth' })
    }
  }, [index])

  const goTo = (i: number) => {
    pause()
    setIndex(i)
    resume()
  }

  return (
    <div className="relative" onMouseEnter={pause} onMouseLeave={resume} onTouchStart={pause} onTouchEnd={resume}>
      {/* Mobile: horizontal scroll-snap */}
      <div
        ref={scrollerRef}
        className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-3 pb-2 -mx-1 px-1"
      >
        {images.map((src, i) => (
          <div key={i} className={`flex-shrink-0 w-[85vw] snap-start ${aspect} border border-gold/15 overflow-hidden bg-forest/40`}>
            {errored[i] ? (
              <ArabicFallback />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={src} alt="" className="w-full h-full object-cover" onError={() => setErrored(e => ({ ...e, [i]: true }))} />
            )}
          </div>
        ))}
      </div>

      {/* Desktop: single image with arrows + dots */}
      <div className="hidden md:block">
        <div className={`relative ${aspect} border border-gold/15 overflow-hidden bg-forest/40`}>
          {errored[index] ? (
            <ArabicFallback />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={images[index]} alt="" className="w-full h-full object-cover transition-opacity duration-500" onError={() => setErrored(e => ({ ...e, [index]: true }))} />
          )}
          <button
            onClick={() => { pause(); prev(); resume() }}
            aria-label="Précédent"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-night/60 border border-gold/30 text-ivory hover:border-gold transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => { pause(); next(); resume() }}
            aria-label="Suivant"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-night/60 border border-gold/30 text-ivory hover:border-gold transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="flex justify-center gap-2 mt-3">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Image ${i + 1}`}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition-colors ${i === index ? 'bg-gold' : 'bg-ivory/20'}`}
            />
          ))}
        </div>
      </div>

      {caption && <p className="text-center text-xs uppercase tracking-widest text-gold/70 mt-3">{caption}</p>}
    </div>
  )
}

function ArabicFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-forest to-night">
      <p className="font-arabic text-3xl text-gold/60" dir="rtl">مدينتنا</p>
    </div>
  )
}
