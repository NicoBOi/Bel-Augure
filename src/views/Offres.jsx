import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'

// Page /offres — la lumière monte du papier vers la salle obscure : 01 crème,
// 02 doré (encre sur papier chaud), puis 03 en vrai mode sombre (or sur encre,
// où l'or reprend tout son éclat). Cartes hiérarchisées par rang (pips 1·2·3,
// liseré croissant), jamais redimensionnées : la sélection se lit au cadre, au
// fond, à la pastille — aucune phrase ne bouge. Aucun prix : sur mesure.
const OFFRES = [
  {
    name: 'Histoires de marque',
    eyebrow: '01',
    register: 'Le fil continu',
    rank: 1,
    bgColor: 'rgb(217 198 166 / 0.45)',
    ink: false,
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
    rank: 2,
    bgColor: '#1a1512',
    ink: true,
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
    rank: 3,
    bgColor: '#221a11',
    ink: true,
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

export default function Offres({ setDark, onNavigate }) {
  const ref = useReveal(0.35)
  const [index, setIndex] = useState(1)
  const [selByOffer, setSelByOffer] = useState({})
  const offre = OFFRES[index]
  const ink = offre.ink
  const sel = selByOffer[index] || {}

  // Le header suit la lumière de l'offre (sombre sur la Campagne).
  useEffect(() => {
    setDark?.(ink)
  }, [ink, setDark])

  useEffect(() => {
    const onKey = (e) => {
      if (document.activeElement?.closest('[data-console]')) return
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % OFFRES.length)
      else if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + OFFRES.length) % OFFRES.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

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

  const toggle = (i) =>
    setSelByOffer((all) => {
      const cur = { ...(all[index] || {}) }
      if (cur[i]) delete cur[i]
      else cur[i] = true
      return { ...all, [index]: cur }
    })

  const selected = offre.items.filter((_, i) => sel[i])

  const requestQuote = () => {
    const message = [
      'Bonjour,',
      '',
      `Je souhaite échanger sur l'offre ${offre.name}.`,
      '',
      selected.length ? 'Ce qui m’intéresse :' : 'Je vous laisse me guider.',
      ...selected.map((l) => `— ${l}`),
    ].join('\n')
    onNavigate?.('contact', { message, offer: offre.name })
  }

  // Teintes selon la lumière : or/crème sur l'encre (mode sombre), encre sur
  // les papiers chauds (où l'or serait illisible).
  const label = ink ? 'text-sable/70' : 'text-encre/70'
  const line = ink ? 'border-or/25' : 'border-orfonce/30'
  const dash = ink ? 'bg-or/60' : 'bg-orfonce/70'
  const ctaClass = ink
    ? 'w-full cursor-pointer rounded-full border border-or/55 py-3.5 text-[13px] font-normal tracking-[0.06em] text-creme transition-colors duration-500 hover:border-or hover:bg-or hover:text-encre'
    : 'w-full cursor-pointer rounded-full border border-encre/55 py-3.5 text-[13px] font-normal tracking-[0.06em] text-encre transition-colors duration-500 hover:border-encre hover:bg-encre hover:text-creme'

  return (
    <section
      ref={ref}
      aria-label="Offres"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="flex h-full flex-col overflow-y-auto px-6 pt-28 transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:px-16"
      style={{ backgroundColor: offre.bgColor }}
    >
      <p
        className={`reveal-up mx-auto mt-4 w-full max-w-[1180px] text-[11px] font-normal uppercase tracking-[0.32em] md:mt-8 ${label}`}
        style={{ '--d': '0.08s' }}
      >
        Trois offres — du fil au grand jeu
      </p>
      <div
        className="reveal-up mx-auto mt-5 flex w-full max-w-[1180px] flex-col gap-4 sm:flex-row sm:items-stretch"
        style={{ '--d': '0.14s' }}
      >
        {OFFRES.map((o, i) => {
          const on = i === index
          const r = o.rank
          const rankBorder = ink
            ? r === 3 ? 'border-or/55' : r === 2 ? 'border-or/30' : 'border-creme/15'
            : r === 3 ? 'border-orfonce/55' : r === 2 ? 'border-orfonce/32' : 'border-orfonce/16'
          const border = on ? 'border-highlight' : `${rankBorder} ${ink ? 'hover:border-creme/40' : 'hover:border-orfonce/60'}`
          const bg = on ? 'bg-highlight/[0.18]' : ''
          const lift = on ? 'sm:scale-[1.02]' : ''
          const shadow = on
            ? ink
              ? 'shadow-[0_26px_64px_-40px_rgba(0,0,0,0.9)]'
              : 'shadow-[0_22px_54px_-34px_rgba(26,21,18,0.5)]'
            : ''
          const numCol = ink ? (on ? 'text-or' : 'text-sable/45') : (on ? 'text-orfonce' : 'text-encre/45')
          const pipCol = ink ? (on ? 'bg-or' : 'bg-or/55') : (on ? 'bg-orfonce' : 'bg-orfonce/55')
          const nameCol = ink ? (on ? 'text-creme' : 'text-sable/55') : (on ? 'text-encre' : 'text-encre/60')
          const regCol = ink ? (on ? 'text-or' : 'text-sable/45') : (on ? 'text-orfonce' : 'text-encre/55')
          return (
            <button
              key={o.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-current={on ? 'true' : undefined}
              aria-label={`Choisir l’offre ${o.name}`}
              style={{ willChange: 'transform' }}
              className={`group flex cursor-pointer flex-col items-start rounded-2xl border p-6 text-left outline-none transition-[transform,border-color,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${ink ? 'focus-visible:outline-or' : 'focus-visible:outline-encre'} md:p-7 sm:flex-1 ${border} ${bg} ${lift} ${shadow}`}
            >
              <span className="flex w-full items-center justify-between">
                <span className={`font-display text-[13px] tabular-nums tracking-[0.1em] transition-colors duration-500 ${numCol}`}>
                  {o.eyebrow}
                </span>
                <span aria-hidden="true" className="flex items-center gap-1">
                  {Array.from({ length: r }).map((_, k) => (
                    <span key={k} className={`h-[5px] w-[5px] rounded-full transition-colors duration-500 ${pipCol}`} />
                  ))}
                </span>
              </span>
              <span className={`mt-2.5 font-display text-[clamp(1.55rem,2.4vw,2.2rem)] leading-[1.06] transition-colors duration-500 ${nameCol}`}>
                {o.name}
                <span className={`transition-opacity duration-300 ${ink ? 'text-or' : 'text-orfonce'} ${on ? 'dot-breathe opacity-100' : 'opacity-0'}`}>
                  .
                </span>
              </span>
              <span className={`mt-2 text-[10px] font-normal uppercase tracking-[0.22em] transition-colors duration-500 ${regCol}`}>
                {o.register}
              </span>
              <span className="mt-5 flex h-[26px] items-center">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full bg-highlight px-2.5 py-1 text-[10px] font-normal uppercase tracking-[0.2em] text-encre transition-opacity duration-500 ${
                    on ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <IconCheck />
                  Sélectionné
                </span>
              </span>
            </button>
          )
        })}
      </div>

      <div key={offre.name} className="offer-enter mx-auto w-full max-w-[1180px] pb-40 lg:pb-24">
        <h1 className="sr-only">Offre {offre.name} — Bel Augure</h1>

        <div className={`mt-12 grid gap-x-16 gap-y-12 border-t pt-12 lg:grid-cols-12 ${line}`}>
          {/* ── GAUCHE : lecture ── */}
          <div className="lg:col-span-6">
            <p className={`max-w-[24ch] text-[clamp(1.5rem,2.5vw,2.15rem)] font-light leading-[1.2] ${ink ? 'text-creme' : 'text-encre'}`}>
              {offre.accroche}
            </p>
            <div className={`mt-6 max-w-[52ch] space-y-4 text-[15px] font-light leading-[1.8] ${ink ? 'text-sable/85' : 'text-encre/80'}`}>
              {offre.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className={`mt-6 max-w-[50ch] text-[12.5px] font-light leading-[1.7] ${ink ? 'text-sable/55' : 'text-encre/60'}`}>
              {offre.usage}
            </p>
            <p className={`mt-5 max-w-[42ch] text-[14px] font-light italic leading-[1.5] ${ink ? 'text-sable/90' : 'text-encre/85'}`}>
              {offre.closing}
            </p>
          </div>

          {/* ── DROITE : composer ── */}
          <div className="lg:col-span-6 lg:self-start">
            <div className="lg:sticky lg:top-24">
              <div className={`flex flex-col rounded-2xl border p-6 md:p-7 lg:max-h-[calc(100dvh-7rem)] ${ink ? 'border-or/20 bg-[#211a13]/45 backdrop-blur-sm' : 'border-encre/12 bg-black/[0.03]'}`}>
                <div className="shrink-0">
                  <h2 className={`text-[11px] font-normal uppercase tracking-[0.28em] ${label}`}>
                    {offre.compose}
                  </h2>
                  <p className={`mt-2 text-[12.5px] font-light leading-[1.6] ${ink ? 'text-sable/65' : 'text-encre/65'}`}>
                    Cochez ce qui vous parle — on affine le projet ensemble.
                  </p>
                </div>

                <ul data-console className="mt-6 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-1">
                  {offre.items.map((item, i) => {
                    const checked = !!sel[i]
                    return (
                      <li key={item} className={`flex items-center gap-4 border-b py-3.5 ${ink ? 'border-creme/10' : 'border-encre/12'}`}>
                        <button
                          type="button"
                          role="checkbox"
                          aria-checked={checked}
                          onClick={() => toggle(i)}
                          className={`group flex flex-1 cursor-pointer items-start gap-3.5 rounded-md text-left outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${ink ? 'focus-visible:outline-or' : 'focus-visible:outline-encre'}`}
                        >
                          <span
                            aria-hidden="true"
                            className={`mt-[0.05em] flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-[5px] border transition-colors duration-300 ${
                              checked
                                ? 'border-highlight bg-highlight text-encre'
                                : ink ? 'border-creme/40 bg-creme/[0.04] group-hover:border-creme/70' : 'border-orfonce/45 bg-black/[0.03] group-hover:border-orfonce/70'
                            }`}
                          >
                            {checked && (
                              <span className="check-draw">
                                <IconCheck />
                              </span>
                            )}
                          </span>
                          <span className="min-w-0">
                            <span className={`block text-[13.5px] font-light leading-[1.5] transition-colors duration-300 ${checked ? (ink ? 'text-creme' : 'text-encre') : ink ? 'text-sable/85' : 'text-encre/85'}`}>
                              {item}
                            </span>
                            <span
                              aria-hidden="true"
                              className="mt-1 block h-px origin-left bg-highlight"
                              style={{
                                transform: checked ? 'scaleX(1)' : 'scaleX(0)',
                                transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
                              }}
                            />
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>

                <div className={`mt-6 hidden shrink-0 border-t pt-5 lg:block ${line}`}>
                  <p className={`text-[11.5px] font-light leading-[1.5] ${ink ? 'text-sable/60' : 'text-encre/60'}`}>
                    Devis établi sur mesure, selon votre projet.
                  </p>
                  <button type="button" onClick={requestQuote} className={`mt-5 ${ctaClass}`}>
                    Demander un devis
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Extensions possibles ── */}
        <div className={`mt-16 border-t pt-12 ${line}`}>
          <h2 className={`text-[11px] font-normal uppercase tracking-[0.3em] ${label}`}>
            Extensions possibles
          </h2>
          <p className={`mt-5 font-display text-[clamp(1.4rem,2.2vw,2rem)] leading-[1.15] ${ink ? 'text-creme' : 'text-encre'}`}>
            {EXTENSIONS.tagline}
          </p>
          <p className={`mt-4 max-w-[60ch] text-[14px] font-light leading-[1.9] ${ink ? 'text-sable/85' : 'text-encre/80'}`}>
            {EXTENSIONS.intro}
          </p>
          <ul className="mt-8 grid gap-x-16 gap-y-3 sm:grid-cols-2">
            {EXTENSIONS.items.map((it) => (
              <li key={it} className={`flex items-start gap-3.5 text-[13.5px] font-light leading-[1.5] ${ink ? 'text-sable/80' : 'text-encre/80'}`}>
                <span aria-hidden="true" className={`mt-[0.72em] h-px w-4 shrink-0 ${dash}`} />
                <span>{it}</span>
              </li>
            ))}
          </ul>
          <p className={`mt-8 text-[12.5px] font-light leading-[1.7] ${ink ? 'text-sable/55' : 'text-encre/60'}`}>
            {EXTENSIONS.closing}
          </p>
        </div>

        {/* ── Questions ── */}
        <div className={`mt-16 border-t pt-14 ${line}`}>
          <h2 className={`text-[11px] font-normal uppercase tracking-[0.3em] ${label}`}>
            Les questions qui reviennent
          </h2>
          <dl className="mt-8 grid gap-x-12 gap-y-9 md:grid-cols-2">
            {QUESTIONS.map((item) => (
              <div key={item.q}>
                <dt className={`font-display text-[16px] leading-[1.4] ${ink ? 'text-creme' : 'text-encre'}`}>{item.q}</dt>
                <dd className={`mt-2 text-[13px] font-light leading-[1.8] ${ink ? 'text-sable/75' : 'text-encre/75'}`}>{item.r}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Mobile : CTA en barre du bas. */}
      <div
        className={`sticky bottom-0 z-10 -mx-6 mt-auto border-t backdrop-blur-md md:-mx-16 lg:hidden ${ink ? 'border-or/25 bg-encre/90' : 'border-encre/15'}`}
        style={ink ? undefined : { backgroundColor: 'rgba(240,230,216,0.82)' }}
      >
        <div
          className="px-6 pt-4 md:px-16"
          style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
        >
          <button type="button" onClick={requestQuote} className={ctaClass}>
            Demander un devis
          </button>
        </div>
      </div>
    </section>
  )
}

function IconCheck() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}
