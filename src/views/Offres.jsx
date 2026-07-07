import { useReveal } from '../hooks/useReveal.js'

const TIERS = [
  {
    name: 'Prélude',
    price: '7 000 €',
    tagline: 'Un premier film court, pour poser une image juste.',
  },
  {
    name: 'Signature',
    price: '12 000 €',
    tagline: "Le film central d'une maison, pensé pour durer.",
    featured: true,
  },
  {
    name: 'Héritage',
    price: '18 000 €',
    tagline: "Le grand récit d'origine, pour les maisons qui transmettent.",
  },
  {
    name: 'Saisons',
    price: '16 000 € / an',
    tagline: "Quatre rendez-vous par an pour faire vivre l'image.",
  },
  {
    name: 'Sur Mesure',
    price: 'dès 25 000 €',
    tagline: "Au-delà, tout s'écrit ensemble.",
  },
]

export default function Offres() {
  const ref = useReveal(0.35)

  return (
    <section
      ref={ref}
      aria-label="Offres"
      className="flex h-full flex-col justify-center px-6 pb-14 pt-28 md:px-16"
    >
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <p
            className="reveal-up text-[11px] font-normal uppercase tracking-[0.3em] text-grege"
            style={{ '--d': '0.1s' }}
          >
            Offres
          </p>

          <h2 className="mt-8 font-serif text-[clamp(1.9rem,3.4vw,3rem)] font-semibold leading-[1.25] tracking-[-0.01em] text-encre">
            <span className="mask" style={{ '--d': '0.25s' }}>
              <span>Un film signature s'amortit</span>
            </span>
            <span className="mask" style={{ '--d': '0.4s' }}>
              <span>
                sur des années, pas sur
                <span className="italic"> une campagne</span>
                <span className="text-or">.</span>
              </span>
            </span>
          </h2>

          <p
            className="reveal-up mt-8 max-w-[44ch] text-[13px] font-light leading-[1.8] text-grege"
            style={{ '--d': '0.55s' }}
          >
            La grille est publique et ne varie pas. Quand un budget se
            resserre, nous ajustons le périmètre, jamais l'exigence.
          </p>
        </div>

        <div className="reveal-right lg:col-span-5 lg:col-start-8" style={{ '--d': '0.65s' }}>
          <ul aria-label="Grille des offres">
            {TIERS.map((tier) => (
              <li
                key={tier.name}
                className={`group border-t border-encre/10 py-4 transition-colors duration-500 ${
                  tier.featured
                    ? 'border-l-2 border-l-or bg-sable/70 pl-5 pr-3'
                    : '-mx-3 px-3 hover:bg-sable/40'
                }`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="flex items-baseline gap-3">
                    <span className="font-display text-[19px] text-encre">{tier.name}</span>
                    {tier.featured && (
                      <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-grege">
                        Format central
                      </span>
                    )}
                  </span>
                  <span className="shrink-0 text-[13px] font-light text-encre/70">
                    {tier.price}
                  </span>
                </div>
                <p className="mt-1 text-[12px] font-light leading-[1.6] text-grege">
                  {tier.tagline}
                </p>
              </li>
            ))}
          </ul>

          <a
            href="mailto:nico@belaugure.studio?subject=Ouvrir%20un%20%C3%A9change"
            className="cta mt-9 inline-block px-10 py-4 text-[11px] font-normal uppercase tracking-[0.2em]"
          >
            Ouvrir un échange
          </a>
        </div>
      </div>
    </section>
  )
}
