import { useReveal } from '../hooks/useReveal.js'

const TIERS = [
  { name: 'Prélude', price: '7 k€' },
  { name: 'Signature', price: '12 k€' },
  { name: 'Héritage', price: '18 k€' },
  { name: 'Saisons', price: '16 k€ / an' },
]

export default function Hero() {
  const ref = useReveal(0.35)

  return (
    <section
      ref={ref}
      aria-labelledby="hero-titre"
      className="flex min-h-[100dvh] flex-col justify-end px-6 pb-14 pt-32 md:px-10 md:pb-16"
    >
      <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Colonne gauche : eyebrow + mot-symbole */}
        <div className="lg:col-span-7">
          <p
            className="reveal-up mb-8 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-grege md:mb-10"
            style={{ '--d': '0.1s' }}
          >
            <span aria-hidden="true" className="dot-pulse h-1.5 w-1.5 rounded-full bg-or" />
            Studio de films signature · Nouvelle-Aquitaine
          </p>

          <h1
            id="hero-titre"
            className="font-display text-[clamp(4.5rem,15vw,13rem)] leading-[0.92] tracking-[-0.01em] text-creme"
          >
            <span className="mask" style={{ '--d': '0.2s' }}>
              <span>Bel</span>
            </span>
            <span className="mask" style={{ '--d': '0.34s' }}>
              <span>
                Augure<span className="text-or">.</span>
              </span>
            </span>
          </h1>
        </div>

        {/* Colonne droite : pitch + tiers + CTA */}
        <div className="reveal-right lg:col-span-4 lg:col-start-9" style={{ '--d': '0.55s' }}>
          <p className="max-w-[42ch] text-[15px] leading-relaxed text-sable">
            Un film signature n'est pas une vidéo. C'est un actif, qui travaille
            pour votre maison saison après saison.
          </p>

          <ul className="mt-8 grid grid-cols-2 border-t border-creme/12" aria-label="Offres du studio">
            {TIERS.map((tier, i) => (
              <li
                key={tier.name}
                className={`flex flex-col gap-1 border-b border-creme/12 py-4 ${
                  i % 2 === 0 ? 'border-r border-r-creme/12 pr-5' : 'pl-5'
                }`}
              >
                <span className="text-[13px] font-medium text-creme">{tier.name}</span>
                <span className="text-[13px] font-light tabular-nums text-grege">
                  {tier.price}
                </span>
              </li>
            ))}
          </ul>

          <a
            href="mailto:nico@belaugure.studio?subject=Ouvrir%20un%20%C3%A9change"
            className="cta mt-8 inline-flex items-center gap-3 px-7 py-3.5 text-[13px] font-medium tracking-[0.08em]"
          >
            Ouvrir un échange
            <span aria-hidden="true" className="text-[15px] leading-none">↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}
