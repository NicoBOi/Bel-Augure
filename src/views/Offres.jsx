import { useEffect, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'
import BackLink from '../components/BackLink.jsx'
import VimeoBackground from '../components/VimeoBackground.jsx'

// Vidéo d'exemple montrée dans chaque offre en attendant les films du
// studio : identifiant Vimeo, lu en mode background.
const VIMEO_ID = '961941216'

const TIERS = [
  {
    name: 'Prélude',
    price: 'à partir de 7 000 € HT',
    tagline: 'Un premier film, pour commencer.',
    desc: "Une journée de tournage, un film d'une minute. Assez pour voir ce que votre maison donne à l'écran.",
    includes: [
      'Un film de 45 à 60 secondes',
      'Une journée de tournage, un lieu',
      'Deux formats : écran et mobile',
      'Une musique choisie et licenciée',
      'Deux séries de retouches incluses',
    ],
    meta: 'Livré en quatre semaines',
    tone: 'light',
  },
  {
    name: 'Signature',
    price: 'à partir de 12 000 € HT',
    tagline: 'Le film que vous montrerez partout.',
    desc: "Deux journées de tournage. Le film central d'une maison : site, accueil, salons. C'est le cœur de notre métier, et la raison du nom.",
    includes: [
      "Un film de 90 secondes à 2 minutes",
      'Direction artistique et repérages',
      "Deux journées de tournage, jusqu'à deux lieux",
      'Trois formats : écran, mobile et réseaux',
      'Design sonore et musique licenciée',
      'Deux séries de retouches incluses',
    ],
    meta: 'Livré en six semaines',
    tone: 'gold',
  },
  {
    name: 'Héritage',
    price: 'à partir de 18 000 € HT',
    tagline: "Trois minutes pour dire d'où vous venez.",
    desc: 'Trois journées, des entretiens, vos archives. Pour les maisons qui se transmettent.',
    includes: [
      'Un film de deux à trois minutes, écrit comme un récit',
      "Trois journées de tournage, jusqu'à trois lieux",
      'Étalonnage cinéma',
      'Cinq formats, des réseaux au master 4K cinéma',
      'Design sonore et musique licenciée',
      'Deux séries de retouches incluses',
    ],
    meta: 'Livré en huit semaines',
    tone: 'dark',
  },
  {
    name: 'Saisons',
    price: '16 000 € HT / an',
    tagline: 'Votre image, quatre fois par an.',
    desc: "Quatre films courts, un par saison, dans la même écriture. Un seul interlocuteur, toute l'année.",
    includes: [
      'Quatre films de 15 à 30 secondes, un par saison',
      'Un tournage léger à chaque saison, une demi-journée sur place',
      'Deux formats par film',
      'Design sonore immersif, sans musique — un parti pris',
      'Une série de retouches par film',
    ],
    meta: 'Facturé 4 000 € HT par trimestre',
    tone: 'greige',
  },
  {
    name: 'Sur Mesure',
    price: 'à partir de 25 000 € HT',
    tagline: 'Votre projet, écrit ensemble.',
    desc: 'Plusieurs lieux, plusieurs films, une saison entière de tournage. Nous écrivons le périmètre ensemble, puis nous le tenons.',
    includes: [
      'Campagnes de plusieurs films',
      'Formats longs',
      'Casting et décors',
      'Droits publicitaires étendus',
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

// Le détail reprend la matière de sa carte : Héritage plonge la page dans
// l'encre, Saisons dans le grège, Signature dans l'or pâle.
const DETAIL_BG = {
  light: '',
  gold: 'bg-or/45',
  dark: 'bg-encre',
  greige: 'bg-grege',
  dashed: '',
}

export default function Offres({ setDark }) {
  const ref = useReveal(0.35)
  const [active, setActive] = useState(null)

  // Le header suit la matière du détail : texte crème sur encre et grège
  useEffect(() => {
    setDark?.(active ? ['dark', 'greige'].includes(active.tone) : false)
  }, [active, setDark])

  // Détail : la vidéo d'exemple prend la scène, le périmètre à côté.
  // La page entière se teinte de la matière de la carte cliquée.
  if (active) {
    const ink = ['dark', 'greige'].includes(active.tone)
    return (
      <section
        key={active.name}
        aria-label={`Offre ${active.name}`}
        className={`view-enter flex h-full flex-col justify-start px-6 pb-14 pt-28 max-md:overflow-y-auto md:pb-[9vh] md:px-16 ${DETAIL_BG[active.tone]}`}
      >
        <BackLink label="Toutes les offres" onClick={() => setActive(null)} light={ink} />

        <div className="mt-8 md:mt-auto">
          <h2
            className={`font-display text-[clamp(2.8rem,6.5vw,6rem)] leading-[1.02] ${
              ink ? 'text-creme' : 'text-encre'
            }`}
          >
            {active.name}
            <span className="text-or">.</span>
          </h2>
          <p
            className={`mt-3 text-[13px] font-light tracking-[0.08em] ${
              ink ? 'text-sable/75' : 'text-grege'
            }`}
          >
            {active.price}
          </p>

          <div className="mt-8 grid items-start gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <div
                className={`relative aspect-video w-full overflow-hidden rounded-3xl bg-encre ${
                  ink ? 'border border-creme/15' : ''
                }`}
              >
                <VimeoBackground
                  id={VIMEO_ID}
                  title={`Exemple de film ${active.name}`}
                  className="absolute inset-0 h-full w-full"
                />
              </div>
              <p
                className={`mt-3 text-[11px] font-normal uppercase tracking-[0.2em] ${
                  ink ? 'text-sable/70' : 'text-grege'
                }`}
              >
                Exemple de réalisation
              </p>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <p
                className={`max-w-[44ch] text-[13.5px] font-light leading-[1.85] ${
                  ink ? 'text-creme/80' : 'text-encre/80'
                }`}
              >
                {active.desc}
              </p>

              <ul className="mt-5">
                {active.includes.map((item) => (
                  <li
                    key={item}
                    className={`flex items-start gap-2.5 border-t py-2.5 text-[13px] font-light ${
                      ink ? 'border-creme/15 text-creme/85' : 'border-encre/10 text-encre/85'
                    }`}
                  >
                    <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-or" />
                    {item}
                  </li>
                ))}
              </ul>
              <p
                className={`mt-4 text-[11px] font-normal uppercase tracking-[0.18em] ${
                  ink ? 'text-sable/65' : 'text-grege'
                }`}
              >
                {active.meta}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3">
                <a
                  href={`mailto:nico@belaugure.studio?subject=${encodeURIComponent(`Échange · ${active.name}`)}`}
                  className={`cta inline-block px-9 py-3.5 text-[13px] font-normal tracking-[0.06em] ${
                    ink ? 'cta-light' : ''
                  }`}
                >
                  Écrire au studio
                </a>
                <ul className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Autres offres">
                  {TIERS.filter((t) => t.name !== active.name).map((tier) => (
                    <li key={tier.name}>
                      <button
                        type="button"
                        onClick={() => setActive(tier)}
                        className={`nav-link cursor-pointer py-2 text-[12px] font-light transition-colors duration-500 ${
                          ink ? 'text-sable/70 hover:text-creme' : 'text-grege hover:text-encre'
                        }`}
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
              <span>Formats, prix, délais :</span>
            </span>
            <span className="mask md:ml-[4vw]" style={{ '--d': '0.18s' }}>
              <span>
                tout est écrit<span className="text-or">.</span>
              </span>
            </span>
          </h2>
        </div>

        <p
          className="reveal-up hidden max-w-[34ch] text-right text-[12px] font-light leading-[1.8] text-grege lg:block"
          style={{ '--d': '0.25s' }}
        >
          Nous tournons pour les hôtels rares, les maisons de soin, les
          domaines et la cosmétique.
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
