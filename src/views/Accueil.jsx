import { useEffect, useRef, useState } from 'react'
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
  const [expanded, setExpanded] = useState(false)
  const lock = useRef(false)

  // Scroll : la carte s'étend en plein écran ; un second geste mène aux
  // films ; remonter replie.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const onWheel = (e) => {
      if (lock.current) return
      if (e.deltaY > 30) {
        lock.current = true
        setExpanded((was) => {
          if (was) onNavigate('films')
          return true
        })
        setTimeout(() => {
          lock.current = false
        }, 1050)
      } else if (e.deltaY < -30) {
        lock.current = true
        setExpanded(false)
        setTimeout(() => {
          lock.current = false
        }, 1050)
      }
    }

    el.addEventListener('wheel', onWheel, { passive: true })
    return () => el.removeEventListener('wheel', onWheel)
  }, [onNavigate])

  useEffect(() => {
    if (!expanded) return
    const onKey = (e) => {
      if (e.key === 'Escape') setExpanded(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [expanded])

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
        aria-hidden="true"
        className={`rings pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
          expanded ? 'opacity-0' : 'opacity-100'
        }`}
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

      {/* Mot-symbole : s'efface quand le film prend l'écran */}
      <div
        className={`absolute inset-x-0 top-[38vh] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          expanded
            ? 'pointer-events-none -translate-y-[16vh] opacity-0'
            : '-translate-y-1/2 opacity-100'
        }`}
      >
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

      {/* La carte du film : affleure en bas, s'étend au scroll */}
      <button
        type="button"
        onClick={() => (expanded ? onNavigate('films') : setExpanded(true))}
        aria-label={
          expanded ? 'Découvrir tous nos films' : `Découvrir le film ${FEATURED.title}`
        }
        className={`reveal-up absolute aspect-video -translate-x-1/2 -translate-y-1/2 cursor-pointer overflow-hidden rounded-3xl bg-encre shadow-[0_40px_110px_-30px_rgb(26_21_18/0.45)] transition-all duration-[1150ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          expanded
            ? 'left-1/2 top-[40vh] w-[88vw] md:left-[34vw] md:top-1/2 md:w-[56vw]'
            : 'left-1/2 top-[102vh] w-[88vw] md:top-[110vh] md:w-[min(74vw,900px)]'
        }`}
        style={{ '--d': '0.9s' }}
      />

      {/* Les informations du film, sur le côté quand la carte est en scène */}
      <div
        aria-hidden={!expanded}
        className={`absolute text-left transition-all delay-200 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          expanded ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-6 opacity-0'
        } inset-x-6 bottom-[4vh] md:inset-x-auto md:bottom-auto md:right-[6vw] md:top-1/2 md:w-[26vw] md:max-w-[330px] md:-translate-y-1/2`}
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

        <button
          type="button"
          onClick={() => onNavigate('films')}
          className="group mt-7 flex cursor-pointer items-center gap-3 text-[11px] font-normal uppercase tracking-[0.22em] text-encre/80 transition-colors duration-500 hover:text-encre"
        >
          Tous nos films
          <svg
            width="20"
            height="10"
            viewBox="0 0 20 10"
            fill="none"
            aria-hidden="true"
            className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
          >
            <path
              d="M1 5h18M19 5l-4.2-4M19 5l-4.2 4"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  )
}
