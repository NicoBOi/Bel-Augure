import { useEffect } from 'react'
import { useReveal } from '../hooks/useReveal.js'

// Trois offres, trois natures : le film central d'une maison, le
// rendez-vous des saisons, et ce qui sort du cadre. La hiérarchie de la
// page suit cette réalité : Signature domine, les deux autres l'entourent.
const SIGNATURE = {
  name: 'Signature',
  eyebrow: 'Le film central',
  desc: "Le film qui porte l'image d'une maison : son site, son accueil, ses salons. De 90 secondes à 2 minutes.",
  detail: 'Deux journées de tournage. Livré en six semaines.',
}

const AUTRES = [
  {
    name: 'Saisons',
    eyebrow: 'Le rendez-vous annuel',
    desc: 'Quatre films courts par an, un par saison, dans la même écriture.',
    detail: 'Une demi-journée de tournage à chaque saison.',
  },
  {
    name: 'Sur Mesure',
    eyebrow: "L'exception",
    desc: 'Campagnes, formats longs, casting et décors.',
    detail: 'Le périmètre s’écrit ensemble. Sur devis.',
  },
]

export default function Offres({ setDark }) {
  const ref = useReveal(0.35)

  useEffect(() => {
    setDark?.(false)
  }, [setDark])

  return (
    <section
      ref={ref}
      aria-label="Offres"
      className="flex h-full flex-col px-6 pb-14 pt-28 max-md:overflow-y-auto md:pb-[9vh] md:px-16"
    >
      <p
        className="reveal-up text-[11px] font-normal uppercase tracking-[0.3em] text-grege"
        style={{ '--d': '0.05s' }}
      >
        Offres
      </p>

      {/* Trois offres, rien d'autre : Signature domine, les deux autres
          natures se partagent le dessous. La page tient dans l'écran. */}
      <div className="flex flex-1 flex-col justify-center">
        <div className="reveal-up grid items-end gap-8 border-b border-encre/10 pb-12 lg:grid-cols-12 lg:gap-8 lg:pb-14" style={{ '--d': '0.15s' }}>
          <div className="lg:col-span-7">
            <p className="text-[11px] font-normal uppercase tracking-[0.3em] text-grege">
              {SIGNATURE.eyebrow}
            </p>
            <h3 className="mt-4 font-display text-[clamp(3.2rem,7vw,6.4rem)] leading-[0.98] text-encre">
              {SIGNATURE.name}
              <span className="text-or">.</span>
            </h3>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-[44ch] text-[14px] font-light leading-[1.9] text-encre/80">
              {SIGNATURE.desc}
            </p>
            <p className="mt-4 text-[11px] font-normal uppercase tracking-[0.2em] text-grege">
              {SIGNATURE.detail}
            </p>
          </div>
        </div>

        <div className="grid gap-10 pt-10 md:grid-cols-2 md:gap-0 lg:pt-12">
          {AUTRES.map((offre, i) => (
            <div
              key={offre.name}
              className={`reveal-up ${i === 1 ? 'md:border-l md:border-encre/10 md:pl-12 lg:pl-16' : 'md:pr-12 lg:pr-16'}`}
              style={{ '--d': `${0.3 + i * 0.1}s` }}
            >
              <p className="text-[11px] font-normal uppercase tracking-[0.3em] text-grege">
                {offre.eyebrow}
              </p>
              <h3 className="mt-3 font-display text-[clamp(1.8rem,2.8vw,2.6rem)] leading-[1.1] text-encre">
                {offre.name}
                <span className="text-or">.</span>
              </h3>
              <p className="mt-4 max-w-[44ch] text-[13.5px] font-light leading-[1.85] text-encre/80">
                {offre.desc}
              </p>
              <p className="mt-3 text-[11px] font-normal uppercase tracking-[0.2em] text-grege">
                {offre.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p
        className="reveal-up mt-4 text-[12.5px] font-light leading-[1.8] text-grege"
        style={{ '--d': '0.5s' }}
      >
        Chaque projet est devisé après un premier échange.{' '}
        <a
          href="mailto:nicolas@belaugure.studio"
          className="nav-link text-encre/80 transition-colors duration-500 hover:text-encre"
        >
          <span className="nav-label">Écrire au studio</span>
        </a>
      </p>

    </section>
  )
}
