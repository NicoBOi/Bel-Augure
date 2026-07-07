import { useReveal } from '../hooks/useReveal.js'

const TIERS = [
  { name: 'Prélude', price: '7 000 €' },
  { name: 'Signature', price: '12 000 €' },
  { name: 'Héritage', price: '18 000 €' },
  { name: 'Saisons', price: '16 000 € / an' },
]

export default function Offres() {
  const ref = useReveal(0.35)

  return (
    <section
      ref={ref}
      aria-label="Offres"
      className="flex h-full flex-col justify-end px-6 pb-16 pt-32 md:px-16 md:pb-24"
    >
      <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <h2 className="font-display text-[clamp(2.2rem,4.5vw,4.2rem)] leading-[1.15] text-creme">
            <span className="mask" style={{ '--d': '0.15s' }}>
              <span>Quatre manières</span>
            </span>
            <span className="mask" style={{ '--d': '0.3s' }}>
              <span>
                d'écrire votre film<span className="text-or">.</span>
              </span>
            </span>
          </h2>
        </div>

        <div className="reveal-right lg:col-span-5 lg:col-start-8" style={{ '--d': '0.55s' }}>
          <ul aria-label="Offres du studio">
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
