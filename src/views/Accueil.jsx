import { useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal.js'

// Vidéo de fond : identifiant Vimeo, lu en mode background (muet, en
// boucle, sans contrôles). Vider la constante pour revenir au fond encre.
const VIMEO_ID = '961941216'

export default function Accueil({ onNavigate, setDark }) {
  const reveal = useReveal(0.35)
  const sectionRef = useRef(null)
  const mediaRef = useRef(null)
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
      if (mediaRef.current) {
        mediaRef.current.style.opacity = String(Math.max(1 - p * 1.15, 0))
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
      const next = reduce ? t : c + (t - c) * 0.075
      current.current = Math.abs(next - t) < 0.0005 ? t : next
      apply(current.current)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const onWheel = (e) => {
      target.current = Math.min(Math.max(target.current + e.deltaY / 1100, 0), 1)
    }
    section.addEventListener('wheel', onWheel, { passive: true })

    // Au doigt : le glissement pilote la même progression
    let touchY = null
    const onTouchStart = (e) => {
      touchY = e.touches[0].clientY
    }
    const onTouchMove = (e) => {
      if (touchY === null) return
      const delta = touchY - e.touches[0].clientY
      touchY = e.touches[0].clientY
      target.current = Math.min(Math.max(target.current + delta / 500, 0), 1)
    }
    const onTouchEnd = () => {
      touchY = null
      // La scène se pose sur l'état le plus proche
      target.current = target.current > 0.5 ? 1 : 0
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
      {/* La vidéo de fond, sous un voile d'encre pour la lisibilité */}
      <div ref={mediaRef} aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden">
        <div className="h-full w-full bg-encre" />
        {VIMEO_ID && (
          <iframe
            title="Film de fond"
            src={`https://player.vimeo.com/video/${VIMEO_ID}?background=1&autoplay=1&loop=1&muted=1&autopause=0&controls=0&title=0&byline=0&portrait=0&dnt=1`}
            allow="autoplay; fullscreen"
            tabIndex={-1}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-screen min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2 border-0"
          />
        )}
        <div className="absolute inset-0 bg-encre/40" />
      </div>

      {/* Mot-symbole en bas à gauche, catchline en face : la scène d'ouverture */}
      <div ref={wordRef} className="absolute inset-x-6 bottom-[9vh] z-[2] md:inset-x-16">
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <h1
              id="hero-titre"
              className="font-display text-[clamp(3.4rem,10.5vw,10rem)] leading-[1.02] tracking-[0.005em] text-creme lg:whitespace-nowrap"
            >
              <span className="mask" style={{ '--d': '0.2s' }}>
                <span>
                  Bel Augure<span className="dot-breathe text-or">.</span>
                </span>
              </span>
            </h1>
          </div>

          <div className="reveal-up lg:col-span-4 lg:pb-4" style={{ '--d': '0.7s' }}>
            <p className="max-w-[22ch] font-display text-[clamp(1.2rem,1.7vw,1.7rem)] leading-[1.45] text-sable">
              Les films signatures du bien-être d'exception
            </p>
          </div>
        </div>
      </div>

      {/* Le studio se présente quand le jour se lève */}
      <div
        ref={studioRef}
        className="absolute inset-x-6 top-1/2 z-[2] max-w-2xl -translate-y-1/2 opacity-0 md:inset-x-16"
        style={{ pointerEvents: 'none' }}
      >
        <p className="text-[11px] font-normal uppercase tracking-[0.3em] text-grege">
          Le studio
        </p>

        <h2 className="mt-7 font-display text-[clamp(2rem,3.8vw,3.4rem)] leading-[1.25] text-encre">
          Le film central de votre maison<span className="text-or">.</span>
        </h2>

        <p className="mt-7 max-w-[50ch] text-[14px] font-light leading-[1.9] text-encre/80">
          Bel Augure est un studio de films de marque fondé à Bordeaux. Nous
          concevons la pièce maîtresse de l'image d'une maison : un film
          signature en lumière naturelle, étalonné comme au cinéma, décliné
          pour vivre partout, des années.
        </p>

        {/* Le portefeuille de films : trois vignettes qui s'éventaillent */}
        <button
          type="button"
          onClick={() => onNavigate('films')}
          className="group mt-9 flex cursor-pointer items-center gap-5"
        >
          <span aria-hidden="true" className="relative block h-7 w-14">
            <span className="absolute left-1/2 top-1/2 h-6 w-10 -translate-y-1/2 translate-x-[calc(-50%-9px)] rotate-[-10deg] rounded-[5px] bg-encre/85 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[calc(-50%-17px)] group-hover:rotate-[-16deg]" />
            <span className="absolute left-1/2 top-1/2 h-6 w-10 -translate-y-1/2 translate-x-[calc(-50%+9px)] rotate-[10deg] rounded-[5px] bg-encre/85 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[calc(-50%+17px)] group-hover:rotate-[16deg]" />
            <span className="absolute left-1/2 top-1/2 h-6 w-10 -translate-x-1/2 -translate-y-1/2 rounded-[5px] bg-encre shadow-[0_6px_16px_-6px_rgb(26_21_18/0.5)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-[calc(-50%-3px)]" />
          </span>
          <span className="text-[11px] font-normal uppercase tracking-[0.22em] text-encre/80 transition-colors duration-500 group-hover:text-encre">
            Découvrir les quatre films<span className="text-or">.</span>
          </span>
        </button>
      </div>
    </section>
  )
}
