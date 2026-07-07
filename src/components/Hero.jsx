import { useReveal } from '../hooks/useReveal.js'

const TIERS = [
  { name: 'Prélude', price: '7 000 €' },
  { name: 'Signature', price: '12 000 €' },
  { name: 'Héritage', price: '18 000 €' },
  { name: 'Saisons', price: '16 000 € / an' },
]

export default function Hero() {
  const ref = useReveal(0.35)

  return (
    <section
      ref={ref}
      aria-labelledby="hero-titre"
      className="flex min-h-[100dvh] flex-col justify-end px-6 pb-16 pt-32 md:px-12 md:pb-20"
    >
      <div className="grid items-end gap-14 lg:grid-cols-12 lg:gap-8">
        {/* Colonne gauche : eyebrow + mot-symbole */}
        <div className="lg:col-span-8">
          <p
            className="reveal-up mb-9 flex items-center gap-3 text-[11px] font-normal uppercase tracking-[0.2em] text-grege md:mb-12"
            style={{ '--d': '0.1s' }}
          >
            <span aria-hidden="true" className="dot-pulse h-1.5 w-1.5 rounded-full bg-or" />
            Studio de films signature · Nouvelle-Aquitaine
          </p>

          <h1
            id="hero-titre"
            className="font-display text-[clamp(3.8rem,11vw,10.5rem)] leading-[1.02] tracking-[0.005em] text-creme lg:whitespace-nowrap"
          >
            <span className="mask" style={{ '--d': '0.25s' }}>
              <span>
                Bel Augure<span className="text-or">.</span>
              </span>
            </span>
          </h1>
        </div>

        {/* Colonne droite : pitch + offres + CTA */}
        <div className="reveal-right lg:col-span-4 lg:col-start-9" style={{ '--d': '0.6s' }}>
          <p className="max-w-[40ch] text-[15px] font-light leading-[1.9] text-sable">
            Un film signature n'est pas une vidéo. C'est un actif, qui travaille
            pour votre maison saison après saison.
          </p>

          <ul className="mt-10" aria-label="Offres du studio">
            {TIERS.map((tier) => (
              <li
                key={tier.name}
                className="flex items-baseline justify-between border-t border-creme/8 py-[1.15rem]"
              >
                <span className="font-display text-[17px] text-creme">{tier.name}</span>
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
