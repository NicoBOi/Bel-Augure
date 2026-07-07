import { useReveal } from '../hooks/useReveal.js'

export default function Accueil() {
  const ref = useReveal(0.35)

  return (
    <section
      ref={ref}
      aria-labelledby="hero-titre"
      className="flex h-full flex-col items-center justify-center px-6 text-center"
    >
      <h1
        id="hero-titre"
        className="font-display text-[clamp(3.5rem,10.5vw,10rem)] leading-[1.05] tracking-[0.005em] text-encre"
      >
        <span className="mask" style={{ '--d': '0.2s' }}>
          <span>
            Bel Augure<span className="text-or">.</span>
          </span>
        </span>
      </h1>

      <p
        className="reveal-up mt-8 text-[11px] font-normal uppercase tracking-[0.3em] text-grege md:mt-10"
        style={{ '--d': '0.7s' }}
      >
        Studio de films signature · Nouvelle-Aquitaine
      </p>
    </section>
  )
}
