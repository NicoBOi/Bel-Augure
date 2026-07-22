import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'

// Le film de fond vit dans App (calque persistant) : ici on ne fait que
// scruter son opacité via mediaRef pendant la transition au scroll.
// La vignette du CTA : une frame du film, demandée à Vimeo (oEmbed, CORS
// ouvert). Si la requête échoue, la pastille encre reste — rien ne casse.
const FILM_VIMEO_URL = 'https://vimeo.com/1211391558'

export default function Accueil({ onNavigate, setDark, mediaRef }) {
  const reveal = useReveal(0.35)
  const [filmThumb, setFilmThumb] = useState(null)

  useEffect(() => {
    let alive = true
    fetch(
      `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(FILM_VIMEO_URL)}&width=320`,
    )
      .then((r) => r.json())
      .then((d) => {
        if (alive && d.thumbnail_url) setFilmThumb(d.thumbnail_url)
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])
  const sectionRef = useRef(null)
  const creamRef = useRef(null)
  const wordRef = useRef(null)
  const studioRef = useRef(null)
  const target = useRef(0)
  const current = useRef(0)
  const wasDark = useRef(true)

  // Le héros s'ouvre dans l'encre : la salle obscure avant le film.
  useEffect(() => {
    setDark(true)
    wasDark.current = true
  }, [setDark])

  // Le scroll scrute la transition : la vidéo s'estompe, le site passe au
  // jour et le texte du studio se révèle. Boucle rAF, transforms et
  // opacités uniquement. Molette au bureau, glissement au doigt.
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf

    const apply = (p) => {
      if (mediaRef?.current) {
        mediaRef.current.style.opacity = String(Math.max(1 - p * 1.15, 0))
      }
      if (creamRef.current) {
        creamRef.current.style.opacity = String(p)
      }
      if (wordRef.current) {
        wordRef.current.style.opacity = String(Math.max(1 - p * 1.6, 0))
        wordRef.current.style.transform = `translateY(${-p * 8}vh)`
        wordRef.current.inert = p > 0.5
      }
      if (studioRef.current) {
        const q = Math.min(Math.max((p - 0.55) / 0.45, 0), 1)
        studioRef.current.style.opacity = String(q)
        studioRef.current.style.transform = `translateY(${(1 - q) * 24}px)`
        studioRef.current.style.pointerEvents = q > 0.6 ? 'auto' : 'none'
        // Invisible = hors du parcours clavier
        studioRef.current.inert = q < 0.5
      }
      // Le site entier passe au jour à mi-course, header compris
      const darkNow = p < 0.5
      if (darkNow !== wasDark.current) {
        wasDark.current = darkNow
        setDark(darkNow)
      }
    }

    const loop = () => {
      const t = target.current
      const c = current.current
      const next = reduce ? t : c + (t - c) * 0.11
      current.current = Math.abs(next - t) < 0.0005 ? t : next
      apply(current.current)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // Un geste décide de la destination, l'animation reste interruptible :
    // scroller vers le bas lève le jour, remonter ramène la nuit.
    const onWheel = (e) => {
      if (e.deltaY > 12) target.current = 1
      else if (e.deltaY < -12) target.current = 0
    }
    section.addEventListener('wheel', onWheel, { passive: true })

    // Au doigt : le glissement scrute, le relâcher pose la scène dans le
    // sens du geste
    let touchY = null
    let touchDir = 0
    const onTouchStart = (e) => {
      touchY = e.touches[0].clientY
    }
    const onTouchMove = (e) => {
      if (touchY === null) return
      const delta = touchY - e.touches[0].clientY
      touchDir = delta === 0 ? touchDir : delta > 0 ? 1 : -1
      touchY = e.touches[0].clientY
      target.current = Math.min(Math.max(target.current + delta / 500, 0), 1)
    }
    const onTouchEnd = () => {
      touchY = null
      target.current = touchDir >= 0 ? (target.current > 0.12 ? 1 : 0) : target.current < 0.88 ? 0 : 1
    }
    section.addEventListener('touchstart', onTouchStart, { passive: true })
    section.addEventListener('touchmove', onTouchMove, { passive: true })
    section.addEventListener('touchend', onTouchEnd, { passive: true })

    const onKey = (e) => {
      if (e.key === 'Escape') target.current = 0
    }
    window.addEventListener('keydown', onKey)

    return () => {
      cancelAnimationFrame(raf)
      section.removeEventListener('wheel', onWheel)
      section.removeEventListener('touchstart', onTouchStart)
      section.removeEventListener('touchmove', onTouchMove)
      section.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKey)
    }
  }, [setDark])

  return (
    <section
      ref={(el) => {
        reveal(el)
        sectionRef.current = el
      }}
      aria-labelledby="hero-titre"
      className="relative h-full overflow-hidden"
    >
      {/* Le jour se lève exactement au rythme du scroll */}
      <div ref={creamRef} aria-hidden="true" className="absolute inset-0 z-[1] bg-creme opacity-0" />

      {/* Mot-symbole en bas à gauche, catchline en face : la scène d'ouverture */}
      <div ref={wordRef} className="absolute inset-x-6 bottom-[9vh] z-[2] md:inset-x-16">
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <h1
              id="hero-titre"
              className="font-display text-[clamp(3.4rem,10.5vw,10rem)] leading-[1.02] tracking-[0.005em] text-creme lg:whitespace-nowrap"
            >
              <span className="mask" style={{ '--d': '0.05s' }}>
                <span>
                  Bel Augure<span className="dot-breathe text-or">.</span>
                </span>
              </span>
            </h1>
          </div>

          <div className="reveal-up lg:col-span-4 lg:pb-4" style={{ '--d': '0.05s' }}>
            <p className="max-w-[22ch] font-display text-[clamp(1.2rem,1.7vw,1.7rem)] leading-[1.45] text-sable">
              Les films signature du bien-être d'exception
            </p>
          </div>
        </div>
      </div>

      {/* Le studio se présente quand le jour se lève, au centre de la scène */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-[2] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 px-6 text-center">
        <div ref={studioRef} className="opacity-0" style={{ pointerEvents: 'none' }}>
        <h2 className="font-display text-[clamp(2rem,3.8vw,3.4rem)] leading-[1.25] text-encre">
          Notre film devient votre signature<span className="text-or">.</span>
        </h2>

        <p className="mx-auto mt-7 max-w-[50ch] text-[14px] font-light leading-[1.9] text-encre/80">
          Il existe des lieux dont on se souvient longtemps après en être
          sorti. Un parfum, une lumière, un instant. Ces lieux méritent
          mieux qu'une vidéo qui disparaît en trois secondes sous votre
          pouce. Bel Augure réalise des films d'exception pour faire de
          votre nom une signature intemporelle.
        </p>

        {/* Une seule vignette, comme un photogramme posé sur la table */}
        <button
          type="button"
          onClick={() => onNavigate('films')}
          className="group mx-auto mt-9 flex cursor-pointer items-center gap-5"
        >
          <span aria-hidden="true" className="relative block h-9 w-16">
            <span className="absolute left-1/2 top-1/2 h-9 w-16 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[6px] bg-encre shadow-[0_6px_16px_-6px_rgb(26_21_18/0.5)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-3 group-hover:translate-y-[calc(-50%-3px)]">
              {filmThumb && (
                <img
                  src={filmThumb}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              )}
            </span>
          </span>
          <span className="text-[11px] font-normal uppercase tracking-[0.22em] text-encre/80 transition-colors duration-500 group-hover:text-encre">
            Découvrir le film<span className="text-or">.</span>
          </span>
          </button>
        </div>
      </div>
    </section>
  )
}
