import { useEffect, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'
import BackLink from '../components/BackLink.jsx'
import VimeoBackground from '../components/VimeoBackground.jsx'
import VideoLoader from '../components/VideoLoader.jsx'

// Vidéo d'exemple montrée dans chaque offre en attendant les films du
// studio : identifiant Vimeo, lu en mode background.
const VIMEO_ID = '961941216'

const TIERS = [
  {
    name: 'Prélude',
    price: 'à partir de 7 000 € HT',
    tagline: 'Un premier film, pour commencer.',
    desc: "Une journée de tournage, un film d'une minute. Assez pour voir ce que votre maison donne à l'écran.",
    specs: [
      ['Le film', '45 à 60 secondes'],
      ['Le tournage', 'Une journée, un lieu'],
      ['Les déclinaisons', 'Écran et mobile'],
    ],
    includes: ['Une musique choisie et licenciée', 'Deux séries de retouches incluses'],
    meta: 'Livré en quatre semaines',
    tone: 'light',
  },
  {
    name: 'Signature',
    price: 'à partir de 12 000 € HT',
    tagline: 'Le film que vous montrerez partout.',
    desc: "Deux journées de tournage. Le film central d'une maison : site, accueil, salons. C'est le cœur de notre métier, et la raison du nom.",
    specs: [
      ['Le film', '90 secondes à 2 minutes'],
      ['Le tournage', "Deux journées, jusqu'à deux lieux"],
      ['Les déclinaisons', 'Écran, mobile et réseaux'],
    ],
    includes: [
      'Direction artistique et repérages',
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
    specs: [
      ['Le film', 'Deux à trois minutes, écrit comme un récit'],
      ['Le tournage', "Trois journées, jusqu'à trois lieux"],
      ['Les déclinaisons', 'Des réseaux au master 4K cinéma'],
    ],
    includes: [
      'Étalonnage cinéma',
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
    specs: [
      ['Les films', 'Quatre par an, 15 à 30 secondes'],
      ['Le tournage', 'Une demi-journée par saison'],
      ['Les déclinaisons', 'Deux formats par film'],
    ],
    includes: [
      'Design sonore immersif, sans musique : un parti pris',
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
    specs: [
      ['Le projet', 'Plusieurs films, formats longs'],
      ['La production', 'Casting, décors, droits étendus'],
    ],
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

// Le déroulé, en trois temps : ce que le client veut savoir avant d'écrire.
const DEROULE = [
  {
    n: '01',
    titre: "L'écriture",
    texte:
      'Un échange, un repérage, une note d’intention. Vous savez ce qui sera filmé avant le premier plan.',
  },
  {
    n: '02',
    titre: 'Le tournage',
    texte:
      "De l'équipement cinéma, une équipe à taille humaine, qui sait se faire oublier.",
  },
  {
    n: '03',
    titre: 'La livraison',
    texte:
      'Le film, ses déclinaisons, les droits pour vos canaux. Deux séries de retouches sont incluses.',
  },
]

// Les questions qui reviennent : réponses courtes, sans renvoi.
const QUESTIONS = [
  {
    q: 'À qui appartient le film ?',
    r: 'À vous. Les droits sont cédés pour votre site, vos réseaux et votre accueil. Les usages publicitaires étendus s’écrivent au devis.',
  },
  {
    q: 'Et la musique ?',
    r: 'Choisie avec vous, licenciée pour votre usage. Rien à gérer de votre côté.',
  },
  {
    q: 'S’il pleut le jour du tournage ?',
    r: 'Un jour de repli est posé ensemble au calendrier, sans surcoût.',
  },
  {
    q: 'Peut-on ajuster le film après livraison ?',
    r: 'Deux séries de retouches sont incluses dans chaque offre.',
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
  // Point d'or qui respire tant que la vidéo d'exemple n'a pas démarré
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    setVideoReady(false)
  }, [active])

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
                {!videoReady && <VideoLoader />}
                <VimeoBackground
                  id={VIMEO_ID}
                  title={`Exemple de film ${active.name}`}
                  onPlaying={() => setVideoReady(true)}
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

              {active.specs && (
                <div
                  className={`mt-6 space-y-4 border-t pt-6 ${
                    ink ? 'border-creme/15' : 'border-encre/10'
                  }`}
                >
                  {active.specs.map(([label, value]) => (
                    <div key={label}>
                      <p
                        className={`text-[9px] font-normal uppercase tracking-[0.28em] ${
                          ink ? 'text-sable/60' : 'text-grege'
                        }`}
                      >
                        {label}
                      </p>
                      <p
                        className={`mt-1.5 text-[14px] font-normal leading-[1.5] ${
                          ink ? 'text-creme' : 'text-encre'
                        }`}
                      >
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              )}

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
      className="flex h-full flex-col justify-start overflow-y-auto px-6 pb-14 pt-28 md:pb-[9vh] md:px-16"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
        <div>
          <h2 className="font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.15] text-encre">
            <span className="mask" style={{ '--d': '0.12s' }}>
              <span>
                Offres<span className="text-or">.</span>
              </span>
            </span>
          </h2>
        </div>

        <p
          className="reveal-up hidden max-w-[34ch] text-right text-[12px] font-light leading-[1.8] text-grege lg:block"
          style={{ '--d': '0.25s' }}
        >
          Du sanctuaire intimiste à la grande maison du bien-être, chaque
          lieu a son exigence.
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

              {/* L'essentiel — durée, tournage, déclinaisons — posé en
                  exergue : petit label, valeur en didone */}
              {tier.specs && (
                <span
                  className={`mt-5 block space-y-4 border-t pt-5 ${
                    ['dark', 'greige'].includes(tier.tone) ? 'border-creme/15' : 'border-encre/10'
                  }`}
                >
                  {tier.specs.map(([label, value]) => (
                    <span key={label} className="block">
                      <span
                        className={`block text-[9px] font-normal uppercase tracking-[0.28em] ${
                          ['dark', 'greige'].includes(tier.tone) ? 'text-sable/60' : 'text-grege'
                        }`}
                      >
                        {label}
                      </span>
                      <span
                        className={`mt-1.5 block text-[13px] font-normal leading-[1.5] ${
                          ['dark', 'greige'].includes(tier.tone) ? 'text-creme' : 'text-encre'
                        }`}
                      >
                        {value}
                      </span>
                    </span>
                  ))}
                </span>
              )}

              {/* Carte volontairement nue : le reste du périmètre se lit
                  dans le détail de l'offre */}
              <span aria-hidden="true" className="flex-1" />

              <span
                className={`mt-7 text-[10px] font-normal uppercase tracking-[0.18em] ${
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

      {/* Le déroulé et les questions : rassurer l'hésitant avant l'email */}
      <div className="mt-16 grid gap-14 border-t border-encre/10 pt-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <p className="text-[11px] font-normal uppercase tracking-[0.3em] text-grege">
            Comment ça se passe
          </p>
          <div className="mt-8 space-y-8">
            {DEROULE.map((etape) => (
              <div key={etape.n} className="flex gap-5">
                <span className="font-display text-[15px] leading-[1.6] text-or">{etape.n}</span>
                <div>
                  <p className="font-display text-[17px] text-encre">{etape.titre}</p>
                  <p className="mt-1.5 max-w-[38ch] text-[13px] font-light leading-[1.8] text-encre/75">
                    {etape.texte}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <p className="text-[11px] font-normal uppercase tracking-[0.3em] text-grege">
            Les questions qui reviennent
          </p>
          <dl className="mt-8 grid gap-x-8 gap-y-8 md:grid-cols-2">
            {QUESTIONS.map((item) => (
              <div key={item.q}>
                <dt className="font-display text-[16px] leading-[1.4] text-encre">
                  {item.q}
                </dt>
                <dd className="mt-2 text-[13px] font-light leading-[1.8] text-encre/75">
                  {item.r}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
