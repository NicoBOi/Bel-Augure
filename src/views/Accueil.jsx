import { useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal.js'

// Bouts de projets qui dépassent du bas : hauteurs variées façon Pinterest.
const TEASERS = [
  { id: 't1', w: 'w-[150px] md:w-[200px]', h: 'h-[180px] md:h-[240px]' },
  { id: 't2', w: 'w-[130px] md:w-[170px]', h: 'h-[220px] md:h-[300px]' },
  { id: 't3', w: 'w-[170px] md:w-[230px]', h: 'h-[150px] md:h-[200px]' },
  { id: 't4', w: 'w-[130px] md:w-[170px]', h: 'h-[200px] md:h-[270px]' },
  { id: 't5', w: 'w-[150px] md:w-[210px]', h: 'h-[170px] md:h-[230px]' },
]

export default function Accueil({ onNavigate }) {
  const reveal = useReveal(0.35)
  const sectionRef = useRef(null)
  const fired = useRef(false)

  // Un geste de scroll sur le héros emmène vers les films.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const onWheel = (e) => {
      if (fired.current || e.deltaY < 30) return
      fired.current = true
      onNavigate('films')
    }
    el.addEventListener('wheel', onWheel, { passive: true })
    return () => el.removeEventListener('wheel', onWheel)
  }, [onNavigate])

  return (
    <section
      ref={(el) => {
        reveal(el)
        sectionRef.current = el
      }}
      aria-labelledby="hero-titre"
      className="relative flex h-full flex-col items-center justify-center px-6 text-center"
    >
      {/* Le signe favorable : deux anneaux d'or en rotation lente */}
      <div
        aria-hidden="true"
        className="rings pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <svg
          viewBox="0 0 100 100"
          className="h-[min(88vw,620px)] w-[min(88vw,620px)] -translate-y-[4vh]"
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

      <div className="relative -translate-y-[7vh]">
        <h1
          id="hero-titre"
          className="font-display text-[clamp(3.2rem,9.5vw,8.5rem)] leading-[1.05] tracking-[0.005em] text-encre"
        >
          <span className="mask" style={{ '--d': '0.2s' }}>
            <span>
              Bel Augure<span className="dot-breathe text-or">.</span>
            </span>
          </span>
        </h1>

        <p
          className="reveal-up mt-6 font-title text-[clamp(1rem,1.5vw,1.3rem)] font-normal tracking-[0.06em] text-encre/75"
          style={{ '--d': '0.7s' }}
        >
          Les films signatures du bien-être d'exception
        </p>
      </div>

      {/* Les films affleurent en bas : on devine qu'il y a plus */}
      <div
        className="reveal-up absolute inset-x-0 bottom-0 flex translate-y-[42%] items-end justify-center gap-5 md:gap-8"
        style={{ '--d': '1s' }}
      >
        {TEASERS.map((teaser, i) => (
          <button
            key={teaser.id}
            type="button"
            onClick={() => onNavigate('films')}
            aria-label="Découvrir nos films"
            style={{ '--i': i }}
            className={`hero-card cursor-pointer rounded-2xl bg-encre transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-3 ${teaser.w} ${teaser.h} ${
              i > 3 ? 'hidden md:block' : ''
            }`}
          />
        ))}
      </div>
    </section>
  )
}
