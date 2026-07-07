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
      className="flex h-full flex-col items-center justify-center px-6 text-center"
    >
      <p
        className="reveal-up text-[11px] font-normal uppercase tracking-[0.3em] text-grege"
        style={{ '--d': '0.1s' }}
      >
        Offres
      </p>

      <h2 className="mt-10 max-w-[24ch] font-display text-[clamp(1.9rem,3.6vw,3.2rem)] leading-[1.35] text-encre">
        <span className="mask" style={{ '--d': '0.25s' }}>
          <span>Un film signature n'est pas</span>
        </span>
        <span className="mask" style={{ '--d': '0.4s' }}>
          <span>
            une vidéo. C'est un actif<span className="text-or">.</span>
          </span>
        </span>
      </h2>

      <ul
        aria-label="Grille des offres"
        className="reveal-up mt-12 w-full max-w-sm"
        style={{ '--d': '0.6s' }}
      >
        {TIERS.map((tier) => (
          <li
            key={tier.name}
            className="flex items-baseline justify-between border-t border-encre/10 py-4"
          >
            <span className="font-display text-[17px] text-encre">{tier.name}</span>
            <span className="text-[13px] font-light text-grege">{tier.price}</span>
          </li>
        ))}
      </ul>

      <p
        className="reveal-up mt-8 text-[12px] font-light tracking-[0.04em] text-grege"
        style={{ '--d': '0.75s' }}
      >
        On ne baisse jamais un prix. On réduit un périmètre.
      </p>

      <a
        href="mailto:nico@belaugure.studio?subject=Ouvrir%20un%20%C3%A9change"
        className="cta reveal-up mt-10 inline-block px-10 py-4 text-[11px] font-normal uppercase tracking-[0.2em]"
        style={{ '--d': '0.9s' }}
      >
        Ouvrir un échange
      </a>
    </section>
  )
}
