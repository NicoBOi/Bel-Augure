import { useReveal } from '../hooks/useReveal.js'

export default function Accueil() {
  const ref = useReveal(0.35)

  return (
    <section
      ref={ref}
      aria-labelledby="hero-titre"
      className="flex h-full flex-col justify-end px-6 pb-16 pt-32 md:px-16 md:pb-24"
    >
      <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8">
          <h1
            id="hero-titre"
            className="font-display text-[clamp(3.8rem,11vw,10.5rem)] leading-[1.02] tracking-[0.005em] text-creme lg:whitespace-nowrap"
          >
            <span className="mask" style={{ '--d': '0.2s' }}>
              <span>
                Bel Augure<span className="text-or">.</span>
              </span>
            </span>
          </h1>
        </div>

        {/* Catchline, pile en face du mot-symbole */}
        <div className="reveal-right lg:col-span-4 lg:pb-4" style={{ '--d': '0.65s' }}>
          <p className="max-w-[16ch] font-display text-[clamp(1.4rem,1.9vw,1.9rem)] leading-[1.4] text-sable">
            Studio de films signature en Nouvelle&#8209;Aquitaine.
          </p>
        </div>
      </div>
    </section>
  )
}
