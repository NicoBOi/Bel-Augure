import { useReveal } from '../hooks/useReveal.js'

export default function Accueil({ onNavigate }) {
  const ref = useReveal(0.35)

  return (
    <section
      ref={ref}
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
          className="h-[min(88vw,660px)] w-[min(88vw,660px)]"
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

      <h1
        id="hero-titre"
        className="relative font-display text-[clamp(3.2rem,9.5vw,9rem)] leading-[1.05] tracking-[0.005em] text-encre"
      >
        <span className="mask" style={{ '--d': '0.2s' }}>
          <span>
            Bel Augure<span className="dot-breathe text-or">.</span>
          </span>
        </span>
      </h1>

      <p
        className="reveal-up relative mt-7 max-w-[34ch] font-serif text-[clamp(1.1rem,1.7vw,1.5rem)] font-medium italic leading-[1.5] text-encre/75"
        style={{ '--d': '0.7s' }}
      >
        Les films signatures du bien-être d'exception
      </p>

      <button
        type="button"
        onClick={() => onNavigate('films')}
        className="cta reveal-up relative mt-12 cursor-pointer px-10 py-4 text-[11px] font-normal uppercase tracking-[0.2em]"
        style={{ '--d': '1s' }}
      >
        Découvrir nos films
      </button>
    </section>
  )
}
