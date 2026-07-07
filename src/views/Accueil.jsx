import { useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal.js'

// Le film mis en avant sur le héros : la carte reçoit le still ou la boucle
// muette du film fondateur dès qu'ils existent.
const FEATURED = {
  title: 'Maison Itsasoa',
  world: 'Hôtellerie · Côte basque',
  format: 'Film signature, 2 min',
  desc: "Tourné au lever du jour, quand l'océan tient encore la maison dans son silence.",
}

export default function Accueil({ onNavigate }) {
  const reveal = useReveal(0.35)
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  const wordRef = useRef(null)
  const ringsRef = useRef(null)
  const infoRef = useRef(null)
  const target = useRef(0)
  const current = useRef(0)

  // Le scroll ne bascule pas d'un état à l'autre : il scrute la transition.
  // Une boucle rAF lisse la progression (lerp) et n'écrit que des transforms
  // et des opacités. Molette au bureau, glissement au doigt sur mobile.
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const desktopQuery = window.matchMedia('(min-width: 768px)')
    let raf

    const apply = (p) => {
      const desktop = desktopQuery.matches
      if (cardRef.current) {
        const dx = desktop ? 16 * (1 - p) : 0
        const dy = (desktop ? 60 : 62) * (1 - p)
        const s0 = desktop ? 74 / 56 : 1
        const s = s0 + (1 - s0) * p
        cardRef.current.style.transform = `translate(-50%, -50%) translate(${dx}vw, ${dy}vh) scale(${s})`
      }
      if (wordRef.current) {
        wordRef.current.style.opacity = String(Math.max(1 - p * 1.6, 0))
        wordRef.current.style.transform = `translateY(${-p * 10}vh)`
      }
      if (ringsRef.current) {
        ringsRef.current.style.opacity = String(1 - p)
      }
      if (infoRef.current) {
        const q = Math.min(Math.max((p - 0.5) / 0.5, 0), 1)
        infoRef.current.style.opacity = String(q)
        infoRef.current.style.transform = `translateX(${(1 - q) * 26}px)`
        infoRef.current.style.pointerEvents = q > 0.6 ? 'auto' : 'none'
        // Invisible = hors du parcours clavier
        infoRef.current.inert = q < 0.5
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
      // La carte se pose sur l'état le plus proche
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
  }, [onNavigate])

  return (
    <section
      ref={(el) => {
        reveal(el)
        sectionRef.current = el
      }}
      aria-labelledby="hero-titre"
      className="relative h-full overflow-hidden text-center"
    >
      {/* Le signe favorable : deux anneaux d'or en rotation lente */}
      <div
        ref={ringsRef}
        aria-hidden="true"
        className="rings pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <svg
          viewBox="0 0 100 100"
          className="h-[min(80vw,560px)] w-[min(80vw,560px)] -translate-y-[9vh]"
          fill="none"
        >
          <circle
            className="ring-a"
            cx="50"
            cy="50"
            r="48.5"
            stroke="#d9c6a6"
            strokeWidth="0.18"
            strokeDasharray="0.2 1.6"
            opacity="0.55"
          />
          <circle
            className="ring-b"
            cx="50"
            cy="50"
            r="41"
            stroke="#d9c6a6"
            strokeWidth="0.22"
            strokeDasharray="92 166"
            strokeLinecap="round"
            opacity="0.4"
          />
        </svg>
      </div>

      {/* Mot-symbole : se dissout à mesure que le film prend l'écran */}
      <div className="pointer-events-none absolute inset-x-0 top-[38vh] -translate-y-1/2">
        <div ref={wordRef}>
          <h1
            id="hero-titre"
            className="font-display text-[clamp(3rem,9vw,8rem)] leading-[1.05] tracking-[0.005em] text-encre"
          >
            <span className="mask" style={{ '--d': '0.2s' }}>
              <span>
                Bel Augure<span className="dot-breathe text-or">.</span>
              </span>
            </span>
          </h1>

          <p
            className="reveal-up mt-5 font-display text-[clamp(1.1rem,1.7vw,1.5rem)] leading-[1.5] text-encre/75"
            style={{ '--d': '0.7s' }}
          >
            Les films signatures du bien-être d'exception
          </p>
        </div>
      </div>

      {/* La carte du film : sa géométrie est écrite par la boucle de scroll */}
      <button
        ref={cardRef}
        type="button"
        onClick={() => {
          if (current.current > 0.9) onNavigate('films')
          else target.current = 1
        }}
        aria-label={`Découvrir le film ${FEATURED.title}`}
        className="fade-in absolute left-1/2 top-[40vh] aspect-video w-[88vw] cursor-pointer overflow-hidden rounded-3xl bg-encre shadow-[0_40px_110px_-30px_rgb(26_21_18/0.45)] md:left-[34vw] md:top-1/2 md:w-[56vw]"
        style={{
          '--d': '0.9s',
          transform: 'translate(-50%, -50%) translate(16vw, 60vh) scale(1.32)',
        }}
      />

      {/* Les informations du film, révélées par la fin de course */}
      <div
        ref={infoRef}
        className="absolute inset-x-6 bottom-[4vh] text-left opacity-0 md:inset-x-auto md:bottom-auto md:right-[6vw] md:top-1/2 md:w-[26vw] md:max-w-[330px] md:-translate-y-1/2"
        style={{ pointerEvents: 'none' }}
      >
        <p className="text-[10.5px] font-normal uppercase tracking-[0.28em] text-grege">
          {FEATURED.world}
        </p>
        <h2 className="mt-4 font-display text-[clamp(1.5rem,2.2vw,2.1rem)] leading-[1.2] text-encre">
          {FEATURED.title}
          <span className="text-or">.</span>
        </h2>
        <p className="mt-2 text-[12px] font-light tracking-[0.08em] text-grege">
          {FEATURED.format}
        </p>
        <p className="mt-6 hidden max-w-[36ch] text-[13px] font-light leading-[1.9] text-encre/75 md:block">
          {FEATURED.desc}
        </p>

        {/* Le portefeuille de films : trois vignettes qui s'éventaillent */}
        <button
          type="button"
          onClick={() => onNavigate('films')}
          className="group mt-8 flex cursor-pointer items-center gap-5"
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
