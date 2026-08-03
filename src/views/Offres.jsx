import { useEffect } from 'react'
import { useReveal } from '../hooks/useReveal.js'

// Page /offres — pas de tableau de prix, pas d'images (on n'a que le film de
// l'accueil). Le luxe vient du type, de la lumière et de la matière : chaque
// offre est une scène « en salle », son nom projeté dans un halo chaud comme un
// carton de titre, sur un grain de pellicule, un grand chiffre fantôme en
// profondeur. Ça monte du fil continu (01) à l'ensemble réuni (03).
const OFFRES = [
  {
    name: 'Histoires de marque',
    eyebrow: '01',
    register: 'Le fil continu',
    accroche: 'Des récits courts pour faire vivre votre univers dans le temps.',
    description:
      'Une collection de films conçus autour de vos gestes, de vos lieux, de vos savoir-faire et de celles et ceux qui les incarnent.',
    compose: 'Chaque collection peut explorer',
    items: [
      'Un rituel ou un soin signature',
      'Le portrait d’un fondateur ou d’un artisan',
      'L’atmosphère d’un lieu',
      'L’origine d’un produit ou d’un ingrédient',
      'Les gestes d’un savoir-faire',
      'Les convictions et les histoires de la maison',
    ],
    usage:
      'Pensés principalement pour les réseaux sociaux, sans reprendre leurs codes ordinaires.',
    closing: 'Le nombre, la durée et les formats sont définis selon votre ligne éditoriale.',
  },
  {
    name: 'Film Signature',
    eyebrow: '02',
    register: 'La pièce maîtresse',
    accroche: 'Le film qui installe durablement votre univers.',
    description:
      'Une pièce centrale imaginée pour révéler ce que votre marque fait ressentir. Conception, écriture, mise en scène et production sont entièrement pensées autour de votre identité.',
    compose: 'La création peut réunir',
    items: [
      'Conception créative et écriture',
      'Direction artistique',
      'Repérage et préparation',
      'Mise en scène de l’expérience',
      'Tournage et direction de la photographie',
      'Montage, création sonore et étalonnage',
      'Adaptations aux supports de diffusion',
    ],
    usage:
      'Pour un lancement, votre site, une présentation, un salon, YouTube ou une diffusion cinéma.',
    closing: 'Une création entièrement conçue sur mesure.',
  },
  {
    name: 'Campagne signature',
    eyebrow: '03',
    register: 'Le déploiement complet',
    finale: true,
    accroche: 'Un même concept pour donner de la force à chaque prise de parole.',
    description:
      'Une campagne complète imaginée autour d’un lancement, d’une ouverture ou d’un temps fort. Film principal, récits courts et déclinaisons visuelles sont réunis au sein d’une même direction créative.',
    compose: 'La campagne peut associer',
    items: [
      'Conception du concept créatif',
      'Film Signature',
      'Collection d’Histoires de marque',
      'Déclinaisons horizontales et verticales',
      'Formats courts',
      'Photographies ou photogrammes de campagne',
      'Adaptations aux différents supports',
    ],
    usage: 'Pour lancer un lieu, une gamme, un soin, une saison ou une nouvelle identité.',
    closing: 'Un univers cohérent, pensé pour se déployer sur l’ensemble de vos supports.',
  },
]

const EXTENSIONS = {
  tagline: 'Prolonger le projet',
  intro:
    'Chaque création peut être complétée selon ses besoins de production et de diffusion.',
  items: [
    'Déclinaisons verticales et formats courts',
    'Version cinéma',
    'Photographies de campagne',
    'Banque d’images',
    'Voix off et création sonore originale',
    'Casting, stylisme et maquillage',
    'Journée de tournage supplémentaire',
    'Adaptations multilingues',
  ],
  closing: 'Ces éléments sont étudiés et chiffrés selon les besoins réels du projet.',
}

const QUESTIONS = [
  {
    q: 'Combien ça coûte ?',
    r: 'Chaque projet est chiffré sur mesure, selon votre lieu, l’ampleur du tournage et la diffusion visée. Parlons-en : on vous envoie un devis clair et détaillé.',
  },
  {
    q: "Qui apparaît à l'écran ?",
    r: 'Nous avons à cœur de travailler avec des acteurs pour rendre votre lieu vivant ! Nous nous occupons du casting.',
  },
  {
    q: 'Partout en France ?',
    r: 'Oui, partout en France ! Chaque projet est une occasion de découvrir de nouveaux décors et de faire naître de nouvelles idées.',
  },
  {
    q: 'À qui appartient le film ?',
    r: 'Les droits de diffusion sont inclus et définis avec vous, selon les supports et la durée d’exploitation visés.',
  },
]

// Grain de pellicule (aucune image chargée : bruit SVG inline).
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")"

// Halo chaud « projecteur », placé selon la scène (alterné, centré pour la finale).
const SPOT = [
  'radial-gradient(48% 42% at 22% 30%, rgba(217,198,166,0.12), transparent 62%)',
  'radial-gradient(48% 42% at 80% 28%, rgba(217,198,166,0.12), transparent 62%)',
  'radial-gradient(60% 55% at 50% 22%, rgba(217,198,166,0.16), transparent 64%)',
]
const NAME_SIZE = [
  'text-[clamp(2.3rem,6.4vw,4rem)]',
  'text-[clamp(2.7rem,7.4vw,4.9rem)]',
  'text-[clamp(3.1rem,9.5vw,6.2rem)]',
]

export default function Offres({ setDark, onNavigate }) {
  const ref = useReveal(0.35)

  useEffect(() => {
    setDark?.(true)
  }, [setDark])

  const requestQuote = (offre) => {
    const message = ['Bonjour,', '', `Je souhaite échanger sur l'offre ${offre.name}.`].join('\n')
    onNavigate?.('contact', { message, offer: offre.name })
  }

  const label = 'text-sable/70'

  return (
    <section
      ref={ref}
      aria-label="Offres"
      className="h-full overflow-y-auto bg-encre"
    >
      {/* Grain de pellicule sur toute la page */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.05] mix-blend-soft-light"
        style={{ backgroundImage: GRAIN, backgroundSize: '160px 160px' }}
      />

      <div className="relative z-[2] px-6 pt-28 md:px-16">
        {/* Ouverture */}
        <p
          className={`reveal-up mx-auto w-full max-w-[1160px] text-[11px] font-normal uppercase tracking-[0.34em] ${label}`}
          style={{ '--d': '0.06s' }}
        >
          Nos offres — du fil à l’ensemble
        </p>

        {/* Les trois scènes */}
        {OFFRES.map((offre, i) => (
          <article
            key={offre.name}
            className="relative mx-auto w-full max-w-[1160px] overflow-hidden py-[clamp(3.5rem,8vw,7rem)]"
          >
            {/* Halo projecteur */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: SPOT[i] }} />
            {/* Chiffre fantôme en profondeur */}
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute -top-4 select-none font-display leading-none text-sable/[0.035] text-[clamp(9rem,26vw,22rem)] ${
                i % 2 === 0 ? 'right-0 md:-right-6' : 'left-0 md:-left-6'
              }`}
            >
              {offre.eyebrow}
            </span>

            <div className={`relative ${offre.finale ? 'text-center' : ''}`}>
              {/* Surtitre : numéro + registre */}
              <p
                className={`flex items-baseline gap-3 text-[11px] font-normal uppercase tracking-[0.28em] ${
                  offre.finale ? 'justify-center' : ''
                }`}
              >
                <span className="font-display text-[15px] tracking-[0.1em] text-or">{offre.eyebrow}</span>
                <span className="text-or/85">{offre.register}</span>
              </p>

              {/* Le titre projeté */}
              <h2
                className={`mt-4 font-display leading-[0.98] text-creme ${NAME_SIZE[i]} ${
                  offre.finale ? 'mx-auto max-w-[15ch]' : 'max-w-[16ch]'
                }`}
              >
                {offre.name}
                <span className="text-or">.</span>
              </h2>

              {/* Accroche */}
              <p
                className={`mt-6 text-[clamp(1.2rem,2vw,1.7rem)] font-light italic leading-[1.4] text-sable ${
                  offre.finale ? 'mx-auto max-w-[30ch]' : 'max-w-[26ch]'
                }`}
              >
                {offre.accroche}
              </p>
            </div>

            {/* Corps : lecture + possibilités */}
            <div className="relative mt-12 grid gap-x-16 gap-y-10 border-t border-or/15 pt-11 md:grid-cols-12">
              <div className="md:col-span-6">
                <p className="max-w-[46ch] text-[15px] font-light leading-[1.8] text-sable/85">
                  {offre.description}
                </p>
                <p className="mt-5 max-w-[50ch] text-[12px] font-light leading-[1.7] text-sable/45">
                  {offre.usage}
                </p>
                <p className="mt-5 max-w-[42ch] text-[14px] font-light italic leading-[1.5] text-sable/90">
                  {offre.closing}
                </p>
                <button
                  type="button"
                  onClick={() => requestQuote(offre)}
                  className="group mt-8 inline-flex cursor-pointer items-center gap-2.5 border-b border-or pb-1 text-[12px] font-normal uppercase tracking-[0.16em] text-or transition-colors duration-500 hover:text-creme"
                >
                  Demander un devis
                  <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>

              <div className="md:col-span-6 lg:col-span-5 lg:col-start-8">
                <p className={`text-[11px] font-normal uppercase tracking-[0.26em] ${label}`}>
                  {offre.compose}
                </p>
                <ul className="mt-6">
                  {offre.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3.5 border-b border-creme/[0.06] py-3"
                    >
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-or/60" />
                      <span className="text-[13.5px] font-light leading-[1.5] text-sable/85">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}

        {/* Extensions */}
        <div className="relative mx-auto mt-4 w-full max-w-[1160px] border-t border-or/20 pt-14 pb-20">
          <p className={`text-[11px] font-normal uppercase tracking-[0.3em] ${label}`}>
            Extensions possibles
          </p>
          <h2 className="mt-5 font-display text-[clamp(1.5rem,2.6vw,2.2rem)] leading-[1.15] text-creme">
            {EXTENSIONS.tagline}
          </h2>
          <p className="mt-4 max-w-[60ch] text-[14px] font-light leading-[1.9] text-sable/85">
            {EXTENSIONS.intro}
          </p>
          <ul className="mt-8 grid gap-x-16 gap-y-3 sm:grid-cols-2">
            {EXTENSIONS.items.map((it) => (
              <li
                key={it}
                className="flex items-start gap-3.5 text-[13.5px] font-light leading-[1.5] text-sable/80"
              >
                <span aria-hidden="true" className="mt-[0.72em] h-px w-4 shrink-0 bg-or/55" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[12.5px] font-light leading-[1.7] text-sable/55">
            {EXTENSIONS.closing}
          </p>
        </div>

        {/* Questions */}
        <div className="relative mx-auto w-full max-w-[1160px] border-t border-or/20 pt-14 pb-28">
          <p className={`text-[11px] font-normal uppercase tracking-[0.3em] ${label}`}>
            Les questions qui reviennent
          </p>
          <dl className="mt-8 grid gap-x-12 gap-y-9 md:grid-cols-2">
            {QUESTIONS.map((item) => (
              <div key={item.q}>
                <dt className="font-display text-[16px] leading-[1.4] text-creme">{item.q}</dt>
                <dd className="mt-2 text-[13px] font-light leading-[1.8] text-sable/75">{item.r}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
