import { useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'
import BackLink from '../components/BackLink.jsx'

const TIERS = [
  {
    name: 'Prélude',
    price: '7 000 €',
    tagline: 'Un premier film court, pour poser une image juste.',
    desc: "Le format d'entrée. Un film court qui installe une image juste, sans engager la maison au-delà du nécessaire.",
    includes: [
      'Film de 45 à 60 secondes',
      'Une journée de tournage',
      'Étalonnage cinéma',
      'Une déclinaison verticale',
    ],
    meta: 'Livraison sous trois semaines',
  },
  {
    name: 'Signature',
    price: '12 000 €',
    tagline: "Le film central d'une maison, pensé pour durer.",
    desc: "Le cœur de notre travail. Le film que l'on montre d'abord, partout, longtemps : site, accueil, salons, réseaux.",
    includes: [
      'Film de 90 secondes à 2 minutes',
      'Deux journées de tournage',
      'Design sonore original',
      'Trois déclinaisons sociales',
      'Photographies de tournage',
    ],
    meta: 'Livraison sous cinq semaines',
    featured: true,
  },
  {
    name: 'Héritage',
    price: '18 000 €',
    tagline: "Le grand récit d'origine, pour les maisons qui transmettent.",
    desc: "Le format long. Entretiens, archives, saisons : le film raconte d'où vient la maison et ce qu'elle devient.",
    includes: [
      'Film de 3 minutes',
      'Trois journées de tournage',
      'Entretiens et archives',
      'Cinq déclinaisons',
      'Photographies de tournage',
    ],
    meta: 'Livraison sous huit semaines',
  },
  {
    name: 'Saisons',
    price: '16 000 € / an',
    tagline: "Quatre rendez-vous par an pour faire vivre l'image.",
    desc: "L'image de la maison au fil de l'année. Quatre films courts, un par saison, dans une même écriture.",
    includes: [
      'Quatre films courts, un par saison',
      "Tournages répartis sur l'année",
      'Déclinaisons à chaque saison',
      'Un interlocuteur unique',
    ],
    meta: 'Engagement annuel',
  },
  {
    name: 'Sur Mesure',
    price: 'dès 25 000 €',
    tagline: "Au-delà, tout s'écrit ensemble.",
    desc: 'Certains projets ne tiennent dans aucune grille : plusieurs lieux, plusieurs films, une saison entière de tournage.',
    includes: [
      'Périmètre défini ensemble',
      'Plusieurs lieux ou plusieurs films',
      'Direction artistique dédiée',
    ],
    meta: 'Sur devis',
  },
]

export default function Offres() {
  const ref = useReveal(0.35)
  const [active, setActive] = useState(null)

  // Détail d'une offre : la grille s'efface, l'offre s'étale dans la page,
  // les autres restent accessibles en colonne pour circuler.
  if (active) {
    return (
      <section
        key={active.name}
        aria-label={`Offre ${active.name}`}
        className="view-enter flex h-full flex-col justify-start px-6 pb-14 pt-28 max-md:overflow-y-auto md:justify-end md:pb-[9vh] md:px-16"
      >
        <BackLink label="Toutes les offres" onClick={() => setActive(null)} />

        <div className="mt-10 grid items-end gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 className="font-display text-[clamp(2.6rem,6vw,5.2rem)] leading-[1.05] text-encre">
              {active.name}
              <span className="text-or">.</span>
            </h2>
            <p className="mt-4 text-[14px] font-light tracking-[0.06em] text-grege">
              {active.price}
              {active.featured && (
                <span className="ml-4 text-[9px] font-medium uppercase tracking-[0.2em] text-grege">
                  Format central
                </span>
              )}
            </p>
            <p className="mt-8 max-w-[42ch] text-[14px] font-light leading-[1.9] text-encre/80">
              {active.desc}
            </p>

            {/* Circuler entre les offres sans revenir à la grille */}
            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-2" aria-label="Autres offres">
              {TIERS.filter((t) => t.name !== active.name).map((tier) => (
                <li key={tier.name}>
                  <button
                    type="button"
                    onClick={() => setActive(tier)}
                    className="nav-link cursor-pointer text-[12px] font-light text-grege transition-colors duration-500 hover:text-encre"
                  >
                    <span className="nav-label">{tier.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-[10px] font-normal uppercase tracking-[0.25em] text-grege">
              Ce que comprend {active.name}
            </p>
            <ul className="mt-4">
              {active.includes.map((item) => (
                <li
                  key={item}
                  className="border-t border-encre/10 py-3 text-[13px] font-light text-encre/85"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[12px] font-light tracking-[0.06em] text-grege">
              {active.meta}
            </p>

            <a
              href={`mailto:nico@belaugure.studio?subject=${encodeURIComponent(`Échange · ${active.name}`)}`}
              className="cta mt-9 inline-block px-9 py-3.5 text-[13px] font-normal tracking-[0.06em]"
            >
              Ouvrir un échange
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={ref}
      aria-label="Offres"
      className="flex h-full flex-col justify-start px-6 pb-14 pt-28 max-md:overflow-y-auto md:justify-end md:pb-[9vh] md:px-16"
    >
      <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <p
            className="reveal-up text-[11px] font-normal uppercase tracking-[0.3em] text-grege"
            style={{ '--d': '0.05s' }}
          >
            Offres
          </p>

          <h2 className="mt-8 font-display text-[clamp(2rem,3.8vw,3.4rem)] leading-[1.3] text-encre">
            <span className="mask" style={{ '--d': '0.12s' }}>
              <span>Un film signature s'amortit</span>
            </span>
            <span className="mask" style={{ '--d': '0.05s' }}>
              <span>
                sur des années, pas sur une campagne
                <span className="text-or">.</span>
              </span>
            </span>
          </h2>

          <p
            className="reveal-up mt-8 max-w-[44ch] text-[13px] font-light leading-[1.8] text-grege"
            style={{ '--d': '0.08s' }}
          >
            La grille est publique et ne varie pas. Quand un budget se
            resserre, nous ajustons le périmètre, jamais l'exigence.
          </p>
        </div>

        <div className="reveal-right lg:col-span-5 lg:col-start-8" style={{ '--d': '0.18s' }}>
          {/* Les filets partagent tous les mêmes bornes : le bloc Signature
              reste net, rien ne file au-delà */}
          <ul aria-label="Grille des offres" className="-mx-4">
            {TIERS.map((tier) => (
              <li key={tier.name}>
                <button
                  type="button"
                  onClick={() => setActive(tier)}
                  className={`group relative w-full cursor-pointer border-t border-encre/10 py-4 text-left transition-colors duration-500 ${
                    tier.featured
                      ? 'border-l-2 border-l-or bg-sable/70 pl-[14px] pr-4 hover:bg-sable'
                      : 'px-4 hover:bg-sable/40'
                  }`}
                >
                  {/* Trait d'or qui s'étire le long du filet au survol */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-[-1px] h-px origin-left scale-x-0 bg-or transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                  />
                  <span className="flex items-baseline justify-between gap-4">
                    <span className="flex items-baseline gap-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5">
                      <span className="font-display text-[19px] text-encre">{tier.name}</span>
                      {tier.featured && (
                        <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-grege">
                          Format central
                        </span>
                      )}
                    </span>
                    <span className="shrink-0 text-[13px] font-light text-grege transition-colors duration-500 group-hover:text-encre">
                      {tier.price}
                    </span>
                  </span>
                  <span className="mt-1 flex items-baseline justify-between gap-4">
                    <span className="text-[12px] font-light leading-[1.6] text-grege transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5">
                      {tier.tagline}
                    </span>
                    <span className="shrink-0 -translate-x-2 text-[10px] font-normal uppercase tracking-[0.18em] text-grege opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                      Découvrir
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
