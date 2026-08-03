import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'

// Page /offres — pas un tableau de prix, un générique. Les trois offres sont
// « billées » comme au cinéma : leurs noms montent en échelle typographique, du
// fil continu à l'ensemble réuni, et celui qu'on regarde s'allume en or. La
// hiérarchie vit dans la taille du nom — le geste le plus proche d'une affiche.
// On choisit un nom, sa scène se dévoile dessous. Fond sombre, aucun prix.
const OFFRES = [
  {
    name: 'Histoires de marque',
    eyebrow: '01',
    register: 'Le fil continu',
    accroche: 'Des récits courts pour faire vivre votre univers dans le temps.',
    description: [
      'Une collection de films conçus autour de vos gestes, de vos lieux, de vos savoir-faire et de celles et ceux qui les incarnent.',
    ],
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
    description: [
      'Une pièce centrale imaginée pour révéler ce que votre marque fait ressentir. Conception, écriture, mise en scène et production sont entièrement pensées autour de votre identité.',
    ],
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
    accroche: 'Un même concept pour donner de la force à chaque prise de parole.',
    description: [
      'Une campagne complète imaginée autour d’un lancement, d’une ouverture ou d’un temps fort. Film principal, récits courts et déclinaisons visuelles sont réunis au sein d’une même direction créative.',
    ],
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

// Échelle typographique du générique : le nom grandit avec le périmètre.
const SIZE = [
  'text-[clamp(1.7rem,5.2vw,2.6rem)]',
  'text-[clamp(2.1rem,6.4vw,3.3rem)]',
  'text-[clamp(2.6rem,8vw,4.2rem)]',
]

// Extensions communes aux trois offres : de quoi prolonger le projet.
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

// Les questions qui reviennent, gardées en bas de page. Réponses courtes.
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

export default function Offres({ setDark, onNavigate }) {
  const ref = useReveal(0.35)
  // On ouvre sur la pièce maîtresse (Film Signature), au cœur du générique.
  const [index, setIndex] = useState(1)
  const offre = OFFRES[index]

  useEffect(() => {
    setDark?.(true)
  }, [setDark])

  // Flèches clavier : on change d'offre — sauf focus dans la scène/console.
  useEffect(() => {
    const onKey = (e) => {
      if (document.activeElement?.closest('[data-console]')) return
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') setIndex((i) => (i + 1) % OFFRES.length)
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp')
        setIndex((i) => (i - 1 + OFFRES.length) % OFFRES.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Mobile : glissement horizontal net pour changer d'offre.
  const touch = useRef(null)
  const onTouchStart = (e) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const onTouchEnd = (e) => {
    if (!touch.current) return
    const dx = e.changedTouches[0].clientX - touch.current.x
    const dy = e.changedTouches[0].clientY - touch.current.y
    touch.current = null
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      setIndex((i) =>
        dx < 0 ? (i + 1) % OFFRES.length : (i - 1 + OFFRES.length) % OFFRES.length,
      )
    }
  }

  const requestQuote = () => {
    const message = ['Bonjour,', '', `Je souhaite échanger sur l'offre ${offre.name}.`].join('\n')
    onNavigate?.('contact', { message, offer: offre.name })
  }

  const label = 'text-sable/75'

  return (
    <section
      ref={ref}
      aria-label="Offres"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="flex h-full flex-col overflow-y-auto bg-encre px-6 pt-28 md:px-16"
    >
      {/* ── Le générique : les trois noms billés en échelle ─────────────── */}
      <p
        className={`reveal-up mx-auto w-full max-w-[1180px] text-[11px] font-normal uppercase tracking-[0.34em] ${label}`}
        style={{ '--d': '0.06s' }}
      >
        Le programme — du fil à l’ensemble
      </p>

      <div
        role="tablist"
        aria-label="Nos offres"
        className="reveal-up mx-auto mt-8 w-full max-w-[1180px]"
        style={{ '--d': '0.12s' }}
      >
        {OFFRES.map((o, i) => {
          const on = i === index
          return (
            <button
              key={o.name}
              type="button"
              role="tab"
              aria-selected={on}
              aria-label={`Afficher l’offre ${o.name}`}
              onClick={() => setIndex(i)}
              className="group block w-full cursor-pointer py-4 text-left outline-none md:py-5"
            >
              <span className="flex items-baseline gap-3">
                <span
                  className={`font-display text-[13px] tabular-nums tracking-[0.12em] transition-colors duration-500 ${
                    on ? 'text-or' : 'text-sable/25'
                  }`}
                >
                  {o.eyebrow}
                </span>
                <span
                  className={`text-[10px] font-normal uppercase tracking-[0.26em] transition-colors duration-500 ${
                    on ? 'text-or' : 'text-sable/25 group-hover:text-sable/45'
                  }`}
                >
                  {o.register}
                </span>
              </span>
              <span className="relative mt-1.5 inline-block">
                <span
                  className={`font-display leading-[1.0] transition-colors duration-500 ${SIZE[i]} ${
                    on
                      ? 'text-creme'
                      : 'text-sable/25 group-hover:text-sable/55 group-focus-visible:text-sable/55'
                  }`}
                >
                  {o.name}
                  <span className={`text-or transition-opacity duration-500 ${on ? 'opacity-100' : 'opacity-0'}`}>
                    .
                  </span>
                </span>
                {/* Le trait or qui se trace sous le nom en lecture (marquee). */}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 block h-px w-full origin-left bg-or"
                  style={{
                    transform: on ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'transform 0.55s cubic-bezier(0.16,1,0.3,1)',
                  }}
                />
              </span>
            </button>
          )
        })}
      </div>

      {/* ── La scène : le contenu de l'offre en lecture, en fondu ────────── */}
      <div
        key={offre.name}
        role="tabpanel"
        className="offer-enter mx-auto w-full max-w-[1180px] pb-40 lg:pb-24"
      >
        <h1 className="sr-only">Offre {offre.name} — Bel Augure</h1>

        <div className="mt-12 grid gap-x-16 gap-y-12 border-t border-or/20 pt-12 lg:grid-cols-12">
          {/* ── GAUCHE : lecture ── */}
          <div className="lg:col-span-7">
            <p className="max-w-[24ch] text-[clamp(1.4rem,2.3vw,2rem)] font-light leading-[1.2] text-creme">
              {offre.accroche}
            </p>
            <div className="mt-5 max-w-[52ch] space-y-3 text-[15px] font-light leading-[1.75] text-sable/85">
              {offre.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="mt-5 max-w-[50ch] text-[12px] font-light leading-[1.7] text-sable/45">
              {offre.usage}
            </p>
            <p className="mt-4 max-w-[42ch] text-[14px] font-light italic leading-[1.5] text-sable/90">
              {offre.closing}
            </p>
          </div>

          {/* ── DROITE : les possibilités (repères éditoriaux) ── */}
          <div className="lg:col-span-5 lg:self-start">
            <div className="lg:sticky lg:top-24">
              <div data-console className="flex flex-col">
                <h2 className="shrink-0 text-[13px] font-normal uppercase tracking-[0.24em] text-creme/90">
                  {offre.compose}
                </h2>
                <ul className="mt-6">
                  {offre.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3.5 border-b border-creme/[0.07] py-3.5"
                    >
                      <span aria-hidden="true" className="mt-[0.72em] h-px w-4 shrink-0 bg-or/55" />
                      <span className="text-[13.5px] font-light leading-[1.5] text-sable/85">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 hidden shrink-0 lg:block">
                  <p className="text-[11.5px] font-light leading-[1.5] text-sable/55">
                    Devis établi sur mesure, selon votre projet.
                  </p>
                  <button
                    type="button"
                    onClick={requestQuote}
                    className="cta cta-light mt-5 w-full cursor-pointer py-3.5 text-[13px] font-normal tracking-[0.06em]"
                  >
                    Demander un devis
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Épilogue : questions ── */}
        <div className="mt-20 border-t border-or/20 pt-14">
          <h2 className={`text-[11px] font-normal uppercase tracking-[0.3em] ${label}`}>
            Les questions qui reviennent
          </h2>
          <dl className="mt-8 grid gap-x-12 gap-y-9 md:grid-cols-2">
            {QUESTIONS.map((item) => (
              <div key={item.q}>
                <dt className="font-display text-[16px] leading-[1.4] text-creme">{item.q}</dt>
                <dd className="mt-2 text-[13px] font-light leading-[1.8] text-sable/75">{item.r}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── Extensions possibles ── */}
        <div className="mt-16 border-t border-or/20 pt-12">
          <h2 className={`text-[11px] font-normal uppercase tracking-[0.3em] ${label}`}>
            Extensions possibles
          </h2>
          <p className="mt-5 font-display text-[clamp(1.4rem,2.2vw,2rem)] leading-[1.15] text-creme">
            {EXTENSIONS.tagline}
          </p>
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
          <p className="mt-8 text-[12.5px] font-light leading-[1.7] text-sable/60">
            {EXTENSIONS.closing}
          </p>
        </div>
      </div>

      {/* Mobile : CTA en barre du bas. */}
      <div className="sticky bottom-0 z-10 -mx-6 mt-auto border-t border-or/20 bg-encre/90 backdrop-blur-md md:-mx-16 lg:hidden">
        <div
          className="px-6 pt-4 md:px-16"
          style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
        >
          <button
            type="button"
            onClick={requestQuote}
            className="cta cta-light w-full cursor-pointer py-3.5 text-[13px] font-normal tracking-[0.06em]"
          >
            Demander un devis
          </button>
        </div>
      </div>
    </section>
  )
}
