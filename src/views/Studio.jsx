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
      className="flex h-full flex-col justify-start px-6 pb-14 pt-28 max-md:overflow-y-auto md:pb-[9vh] md:px-16"
    >
      <div className="grid gap-12 lg:flex-1 lg:grid-cols-12 lg:gap-8">
        {/* Gauche : l'eyebrow tient le haut, le manifeste descend s'asseoir */}
        <div className="lg:col-span-7 lg:flex lg:flex-col lg:justify-between">
          <p
            className="reveal-up text-[11px] font-normal uppercase tracking-[0.3em] text-grege"
            style={{ '--d': '0.05s' }}
          >
            Le studio
          </p>

          <h2 className="mt-8 font-display text-[clamp(2.4rem,5vw,4.8rem)] leading-[1.18] text-encre lg:mt-0">
            <span className="mask" style={{ '--d': '0.12s' }}>
              <span>Ceux qui vendent le film</span>
            </span>
            <span className="mask" style={{ '--d': '0.2s' }}>
              <span>
                sont ceux qui le fabriquent<span className="text-or">.</span>
              </span>
            </span>
          </h2>
        </div>

        {/* Droite : le propos en haut de colonne, l'équipe sur la base */}
        <div
          className="reveal-right lg:col-span-4 lg:col-start-9 lg:flex lg:flex-col lg:justify-between lg:pt-20"
          style={{ '--d': '0.32s' }}
        >
          <p className="max-w-[46ch] text-[14px] font-light leading-[2] text-encre/80">
            Bel Augure est un studio fondé à Bordeaux par deux artisans de
            l'image. Nous travaillons en lumière naturelle, sans artifice, au
            rythme des lieux que nous filmons. Votre interlocuteur tient la
            caméra, et ce qu'il vous promet, il le tourne lui-même. Rien, dans
            nos films, ne ressemble à de la publicité.
          </p>

          <ul className="mt-12" aria-label="L'équipe">
            {ARTISANS.map((artisan) => (
              <li
                key={artisan.name}
                className="flex items-baseline justify-between gap-6 border-t border-encre/10 py-5"
              >
                <span className="font-display text-[19px] text-encre">{artisan.name}</span>
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
