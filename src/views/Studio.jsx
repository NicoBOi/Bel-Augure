import { useReveal } from '../hooks/useReveal.js'

const ARTISANS = [
  { name: 'Nico', role: 'Direction, image, étalonnage' },
  { name: 'Corentin', role: 'Montage, motion design' },
]

export default function Studio() {
  const ref = useReveal(0.35)

  return (
    <section
      ref={ref}
      aria-label="Le studio"
      className="flex h-full flex-col justify-center px-6 pb-14 pt-28 md:px-16"
    >
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <p
            className="reveal-up text-[11px] font-normal uppercase tracking-[0.3em] text-grege"
            style={{ '--d': '0.1s' }}
          >
            Le studio
          </p>

          <h2 className="mt-8 font-serif text-[clamp(1.9rem,3.4vw,3rem)] font-semibold leading-[1.25] tracking-[-0.01em] text-encre">
            <span className="mask" style={{ '--d': '0.25s' }}>
              <span>Ceux qui vendent le film</span>
            </span>
            <span className="mask" style={{ '--d': '0.4s' }}>
              <span>
                sont ceux qui le <span className="italic">fabriquent</span>
                <span className="text-or">.</span>
              </span>
            </span>
          </h2>
        </div>

        <div className="reveal-right lg:col-span-5 lg:col-start-8" style={{ '--d': '0.6s' }}>
          <p className="max-w-[46ch] text-[14px] font-light leading-[1.9] text-encre/80">
            Bel Augure est un studio fondé à Bordeaux par deux artisans de
            l'image. Nous travaillons en lumière naturelle, sans artifice, au
            rythme des lieux que nous filmons. Votre interlocuteur tient la
            caméra, et ce qu'il vous promet, il le tourne lui-même. Rien, dans
            nos films, ne ressemble à de la publicité.
          </p>

          <ul className="mt-10" aria-label="L'équipe">
            {ARTISANS.map((artisan) => (
              <li
                key={artisan.name}
                className="flex items-baseline justify-between gap-6 border-t border-encre/10 py-4"
              >
                <span className="font-display text-[17px] text-encre">{artisan.name}</span>
                <span className="text-right text-[13px] font-light text-grege">
                  {artisan.role}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
