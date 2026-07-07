import { useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'
import BackLink from '../components/BackLink.jsx'

// Vidéo d'exemple montrée dans chaque offre en attendant les films du
// studio : identifiant Vimeo, lu en mode background.
const VIMEO_ID = '961941216'

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
    tone: 'light',
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
    tone: 'gold',
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
    tone: 'dark',
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
    tone: 'greige',
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
    tone: 'dashed',
  },
]

// Chaque format a sa matière, déclinée de la charte : du crème léger à
// l'encre profonde, l'or au centre de la gamme.
// Silhouette en escalier : la rangée culmine sur Héritage, au centre,
// et redescend doucement vers les bords. Base commune, sommets étagés.
const LIFTS = {
  light: 'xl:mt-10',
  gold: 'xl:mt-4',
  dark: 'xl:mt-0',
  greige: 'xl:mt-4',
  dashed: 'xl:mt-10',
}

const TONES = {
  light: 'border-encre/10 hover:border-encre/20 hover:bg-sable/40',
  gold: 'border-or bg-or/45 shadow-[0_24px_60px_-36px_rgb(217_198_166)] hover:bg-or/60',
  dark: 'border-encre bg-encre shadow-[0_24px_60px_-36px_rgb(26_21_18/0.55)] hover:bg-[#251e18]',
  greige: 'border-grege bg-grege shadow-[0_24px_60px_-36px_rgb(110_99_80/0.6)] hover:bg-[#7a6e59]',
  dashed: 'border-dashed border-encre/30 hover:border-encre/45 hover:bg-sable/30',
}

export default function Offres() {
  const ref = useReveal(0.35)
  const [active, setActive] = useState(null)

  // Détail : la vidéo d'exemple prend la scène, le périmètre à côté.
  if (active) {
    return (
      <section
        key={active.name}
        aria-label={`Offre ${active.name}`}
        className="view-enter flex h-full flex-col justify-start px-6 pb-14 pt-28 max-md:overflow-y-auto md:pb-[9vh] md:px-16"
      >
        <BackLink label="Toutes les offres" onClick={() => setActive(null)} />

        <div className="mt-8 md:mt-auto">
          <h2 className="font-display text-[clamp(2.8rem,6.5vw,6rem)] leading-[1.02] text-encre">
            {active.name}
            <span className="text-or">.</span>
          </h2>
          <p className="mt-3 text-[13px] font-light tracking-[0.08em] text-grege">
            {active.price}
            {active.featured && (
              <span className="ml-4 text-[9px] font-medium uppercase tracking-[0.2em] text-grege">
                Format central
              </span>
            )}
          </p>

          <div className="mt-8 grid items-start gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-encre">
                <iframe
                  title={`Exemple de film ${active.name}`}
                  src={`https://player.vimeo.com/video/${VIMEO_ID}?background=1&autoplay=1&loop=1&muted=1&autopause=0&controls=0&title=0&byline=0&portrait=0&dnt=1`}
                  allow="autoplay; fullscreen"
                  tabIndex={-1}
                  className="pointer-events-none absolute inset-0 h-full w-full border-0"
                />
              </div>
              <p className="mt-3 text-[11px] font-normal uppercase tracking-[0.2em] text-grege">
                Exemple de réalisation
              </p>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <p className="max-w-[44ch] text-[13.5px] font-light leading-[1.85] text-encre/80">
                {active.desc}
              </p>

              <ul className="mt-5">
                {active.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 border-t border-encre/10 py-2.5 text-[13px] font-light text-encre/85"
                  >
                    <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-or" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[11px] font-normal uppercase tracking-[0.18em] text-grege">
                {active.meta}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3">
                <a
                  href={`mailto:nico@belaugure.studio?subject=${encodeURIComponent(`Échange · ${active.name}`)}`}
                  className="cta inline-block px-9 py-3.5 text-[13px] font-normal tracking-[0.06em]"
                >
                  Ouvrir un échange
                </a>
                <ul className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Autres offres">
                  {TIERS.filter((t) => t.name !== active.name).map((tier) => (
                    <li key={tier.name}>
                      <button
                        type="button"
                        onClick={() => setActive(tier)}
                        className="nav-link cursor-pointer py-2 text-[12px] font-light text-grege transition-colors duration-500 hover:text-encre"
                      >
                        <span className="nav-label">{tier.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={ref}
      aria-label="Offres"
      className="flex h-full flex-col justify-start px-6 pb-14 pt-28 max-md:overflow-y-auto md:pb-[9vh] md:px-16"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
        <div>
          <p
            className="reveal-up text-[11px] font-normal uppercase tracking-[0.3em] text-grege"
            style={{ '--d': '0.05s' }}
          >
            Offres
          </p>

          <h2 className="mt-6 max-w-[34ch] font-display text-[clamp(1.7rem,2.6vw,2.4rem)] leading-[1.3] text-encre">
            <span className="mask" style={{ '--d': '0.12s' }}>
              <span>Un film signature s'amortit sur des années,</span>
            </span>
            <span className="mask" style={{ '--d': '0.18s' }}>
              <span>
                pas sur une campagne<span className="text-or">.</span>
              </span>
            </span>
          </h2>
        </div>

        <p
          className="reveal-up hidden max-w-[34ch] text-right text-[12px] font-light leading-[1.8] text-grege lg:block"
          style={{ '--d': '0.25s' }}
        >
          La grille est publique et ne varie pas. Quand un budget se resserre,
          nous ajustons le périmètre, jamais l'exigence.
        </p>
      </div>

      {/* Les cinq formats en cases : Héritage au centre, Signature en or */}
      <ul
        aria-label="Grille des offres"
        className="reveal-up mt-8 grid gap-4 md:grid-cols-2 lg:mt-10 lg:flex-1 xl:grid-cols-5 xl:gap-5"
        style={{ '--d': '0.3s' }}
      >
        {TIERS.map((tier) => (
          <li key={tier.name} className={`flex ${LIFTS[tier.tone]}`}>
            <button
              type="button"
              onClick={() => setActive(tier)}
              className={`group relative flex w-full cursor-pointer flex-col rounded-2xl border p-6 text-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 ${TONES[tier.tone]}`}
            >
              {tier.featured && (
                <span className="absolute right-5 top-5 text-[8.5px] font-medium uppercase tracking-[0.22em] text-encre/60">
                  Format central
                </span>
              )}

              <span
                className={`font-display text-[clamp(1.4rem,1.8vw,1.8rem)] leading-tight ${
                  ['dark', 'greige'].includes(tier.tone) ? 'text-creme' : 'text-encre'
                }`}
              >
                {tier.name}
                <span className="text-or opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  .
                </span>
              </span>

              <span
                className={`mt-2 text-[14.5px] font-normal ${
                  ['dark', 'greige'].includes(tier.tone) ? 'text-creme/85' : 'text-encre/85'
                }`}
              >
                {tier.price}
              </span>

              <span
                className={`mt-3 text-[12px] font-light leading-[1.7] ${
                  ['dark', 'greige'].includes(tier.tone) ? 'text-sable/75' : 'text-grege'
                }`}
              >
                {tier.tagline}
              </span>

              <span
                aria-hidden="true"
                className={`mb-4 mt-5 block h-px w-full ${
                  ['dark', 'greige'].includes(tier.tone) ? 'bg-creme/15' : 'bg-encre/10'
                }`}
              />

              <ul className="flex-1 space-y-2.5">
                {tier.includes.map((item) => (
                  <li
                    key={item}
                    className={`flex items-start gap-2.5 text-[12px] font-light leading-[1.55] ${
                      ['dark', 'greige'].includes(tier.tone) ? 'text-creme/80' : 'text-encre/80'
                    }`}
                  >
                    <span aria-hidden="true" className="mt-[0.55em] h-px w-3 shrink-0 bg-or" />
                    {item}
                  </li>
                ))}
              </ul>

              <span
                className={`mt-5 text-[10px] font-normal uppercase tracking-[0.18em] ${
                  ['dark', 'greige'].includes(tier.tone) ? 'text-sable/65' : 'text-grege'
                }`}
              >
                {tier.meta}
              </span>

              <span
                className={`mt-2 text-[10px] font-normal uppercase tracking-[0.18em] opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
                  ['dark', 'greige'].includes(tier.tone) ? 'text-creme' : 'text-encre'
                }`}
              >
                Découvrir
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
