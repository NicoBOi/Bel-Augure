import { useReveal } from '../hooks/useReveal.js'

const PRINCIPES = [
  'La lumière naturelle, jamais les projecteurs.',
  "Le son travaillé au niveau de l'image.",
  'Neuf films par an, pas un de plus.',
]

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
      <div className="flex items-baseline justify-between gap-8">
        <p
          className="reveal-up text-[11px] font-normal uppercase tracking-[0.3em] text-grege"
          style={{ '--d': '0.05s' }}
        >
          Le studio
        </p>
        <p
          className="reveal-up hidden text-[11px] font-light tracking-[0.14em] text-grege lg:block"
          style={{ '--d': '0.1s' }}
        >
          Bordeaux · Nouvelle-Aquitaine
        </p>
      </div>

      <div className="mt-10 grid gap-12 lg:mt-0 lg:flex-1 lg:grid-cols-12 lg:gap-8">
        {/* Le credo, en manifeste : la parole de la maison */}
        <div className="lg:col-span-7 lg:flex lg:flex-col lg:justify-end">
          <h2 className="font-display text-[clamp(2.4rem,4.8vw,4.6rem)] leading-[1.14] text-encre">
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

        {/* Le récit, les principes, puis les deux artisans sur la base */}
        <div
          className="reveal-right lg:col-span-4 lg:col-start-9 lg:flex lg:flex-col lg:justify-end"
          style={{ '--d': '0.32s' }}
        >
          <p className="max-w-[46ch] text-[14px] font-light leading-[2] text-encre/80">
            Bel Augure est né à Bordeaux d'une conviction simple : les maisons
            d'exception méritent des images qui leur ressemblent. Deux
            artisans, une caméra qui respire, le temps qu'il faut. Nous
            filmons vos lieux comme on filme un visage : à la lumière du
            jour, sans rien maquiller.
          </p>

          <ul className="mt-9 space-y-3" aria-label="Les principes du studio">
            {PRINCIPES.map((principe) => (
              <li
                key={principe}
                className="flex items-start gap-3 text-[13px] font-light leading-[1.6] text-encre/85"
              >
                <span aria-hidden="true" className="mt-[0.6em] h-px w-4 shrink-0 bg-or" />
                {principe}
              </li>
            ))}
          </ul>

          <ul className="mt-10" aria-label="L'équipe">
            {ARTISANS.map((artisan) => (
              <li
                key={artisan.name}
                className="flex items-baseline justify-between gap-6 border-t border-encre/10 py-4"
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
