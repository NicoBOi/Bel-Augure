import { useReveal } from '../hooks/useReveal.js'

const TIERS = [
  { name: 'Prélude', price: '7 000 €' },
  { name: 'Signature', price: '12 000 €' },
  { name: 'Héritage', price: '18 000 €' },
  { name: 'Saisons', price: '16 000 € / an' },
  { name: 'Sur Mesure', price: 'dès 25 000 €' },
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

          <h2 className="mt-8 font-display text-[clamp(2rem,3.8vw,3.4rem)] leading-[1.3] text-encre">
            <span className="mask" style={{ '--d': '0.25s' }}>
              <span>Un film signature n'est pas</span>
            </span>
            <span className="mask" style={{ '--d': '0.4s' }}>
              <span>
                une vidéo. C'est un actif<span className="text-or">.</span>
              </span>
            </span>
          </h2>

          <p
            className="reveal-up mt-8 text-[13px] font-light tracking-[0.04em] text-grege"
            style={{ '--d': '0.55s' }}
          >
            On ne baisse jamais un prix. On réduit un périmètre.
          </p>
        </div>

        <div className="reveal-right lg:col-span-5 lg:col-start-8" style={{ '--d': '0.65s' }}>
          <ul aria-label="Grille des offres">
            {TIERS.map((tier) => (
              <li
                key={tier.name}
                className="flex items-baseline justify-between border-t border-encre/10 py-[0.9rem]"
              >
                <span className="font-display text-[17px] text-encre">{tier.name}</span>
                <span className="text-[13px] font-light text-grege">{tier.price}</span>
              </li>
            ))}
          </ul>

          <a
            href="mailto:nico@belaugure.studio?subject=Ouvrir%20un%20%C3%A9change"
            className="cta mt-10 inline-block px-10 py-4 text-[11px] font-normal uppercase tracking-[0.2em]"
          >
            Ouvrir un échange
          </a>
        </div>
      </div>
    </section>
  )
}
