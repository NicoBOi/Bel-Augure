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

export default function Accueil({ onNavigate, setDark }) {
  const reveal = useReveal(0.35)
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  const wordRef = useRef(null)
  const infoRef = useRef(null)
  const target = useRef(0)
  const current = useRef(0)

  // Le héros vit dans l'encre : la salle obscure avant le film.
  useEffect(() => {
    setDark(true)
  }, [setDark])

  // Le scroll ne bascule pas d'un état à l'autre : il scrute le lever de
  // rideau. Une boucle rAF lisse la progression (lerp) et n'écrit que des
  // transforms et des opacités. Molette au bureau, glissement au doigt.
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
        const dy = (desktop ? 76 : 64) * (1 - p)
        const s0 = desktop ? 74 / 56 : 1
        const s = s0 + (1 - s0) * p
        cardRef.current.style.transform = `translate(-50%, -50%) translate(${dx}vw, ${dy}vh) scale(${s})`
      }
      if (wordRef.current) {
        wordRef.current.style.opacity = String(Math.max(1 - p * 1.6, 0))
        wordRef.current.style.transform = `translateY(${-p * 8}vh)`
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
      className="relative h-full overflow-hidden"
    >
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

      {/* La carte du film affleure sous le pli : le rideau se lève au scroll */}
      <button
        ref={cardRef}
        type="button"
        onClick={() => {
          if (current.current > 0.9) onNavigate('films')
          else target.current = 1
        }}
        aria-label={`Découvrir le film ${FEATURED.title}`}
        className="fade-in absolute left-1/2 top-[40vh] z-[1] aspect-video w-[88vw] cursor-pointer overflow-hidden rounded-3xl bg-[#0f0c0a] shadow-[0_-10px_50px_-22px_rgb(217_198_166/0.12)] ring-1 ring-creme/15 md:left-[34vw] md:top-1/2 md:w-[56vw]"
        style={{
          '--d': '1.1s',
          transform: 'translate(-50%, -50%) translate(16vw, 76vh) scale(1.32)',
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
        <h2 className="mt-4 font-display text-[clamp(1.5rem,2.2vw,2.1rem)] leading-[1.2] text-creme">
          {FEATURED.title}
          <span className="text-or">.</span>
        </h2>
        <p className="mt-2 text-[12px] font-light tracking-[0.08em] text-grege">
          {FEATURED.format}
        </p>
        <p className="mt-6 hidden max-w-[36ch] text-[13px] font-light leading-[1.9] text-sable md:block">
          {FEATURED.desc}
        </p>

        {/* Le portefeuille de films : trois vignettes qui s'éventaillent */}
        <button
          type="button"
          onClick={() => onNavigate('films')}
          className="group mt-8 flex cursor-pointer items-center gap-5"
        >
          <span aria-hidden="true" className="relative block h-7 w-14">
            <span className="absolute left-1/2 top-1/2 h-6 w-10 -translate-y-1/2 translate-x-[calc(-50%-9px)] rotate-[-10deg] rounded-[5px] bg-creme/15 ring-1 ring-creme/25 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[calc(-50%-17px)] group-hover:rotate-[-16deg]" />
            <span className="absolute left-1/2 top-1/2 h-6 w-10 -translate-y-1/2 translate-x-[calc(-50%+9px)] rotate-[10deg] rounded-[5px] bg-creme/15 ring-1 ring-creme/25 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[calc(-50%+17px)] group-hover:rotate-[16deg]" />
            <span className="absolute left-1/2 top-1/2 h-6 w-10 -translate-x-1/2 -translate-y-1/2 rounded-[5px] bg-creme/25 ring-1 ring-creme/40 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-[calc(-50%-3px)]" />
          </span>
          <span className="text-[11px] font-normal uppercase tracking-[0.22em] text-creme/80 transition-colors duration-500 group-hover:text-creme">
            Découvrir les quatre films<span className="text-or">.</span>
          </span>
        </button>
      </div>
    </section>
  )
}
