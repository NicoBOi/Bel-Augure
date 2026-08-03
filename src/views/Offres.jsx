import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'

// Page /offres — la première mouture, retravaillée. À GAUCHE on lit l'offre, à
// DROITE on compose (on coche ce qui parle au projet). Trois cartes de choix,
// mais elles ne se redimensionnent plus : la sélection se lit à la couleur, au
// cadre or, à la pastille — jamais à la taille. Rien ne se recompose, aucune
// phrase ne se casse pendant les interactions. Fond sombre uniforme, aucun prix.
const OFFRES = [
  {
    name: 'Film Signature',
    eyebrow: '01',
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
    name: 'Histoires de marque',
    eyebrow: '02',
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
  const [index, setIndex] = useState(0)
  const [selByOffer, setSelByOffer] = useState({})
  const offre = OFFRES[index]
  const sel = selByOffer[index] || {}

  useEffect(() => {
    setDark?.(true)
  }, [setDark])

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

  const label = 'text-sable/70'

  return (
    <section
      ref={ref}
      aria-label="Offres"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="flex h-full flex-col overflow-y-auto bg-encre px-6 pt-28 md:px-16"
    >
      {/* Sélecteur : trois cartes. Elles ne changent jamais de taille — la
          sélection se lit au cadre or, au fond, à la pastille. */}
      <p
        className={`reveal-up mx-auto mt-4 w-full max-w-[1180px] text-[11px] font-normal uppercase tracking-[0.32em] md:mt-8 ${label}`}
        style={{ '--d': '0.08s' }}
      >
        Trois offres — choisissez la vôtre
      </p>
      <div
        className="reveal-up mx-auto mt-5 flex w-full max-w-[1180px] flex-col gap-4 sm:flex-row sm:items-stretch"
        style={{ '--d': '0.14s' }}
      >
        {OFFRES.map((o, i) => {
          const on = i === index
          return (
            <button
              key={o.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-current={on ? 'true' : undefined}
              aria-label={`Choisir l’offre ${o.name}`}
              style={{ willChange: 'transform' }}
              className={`group flex cursor-pointer flex-col items-start rounded-2xl border p-6 text-left outline-none transition-[transform,border-color,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or md:p-7 sm:flex-1 ${
                on
                  ? 'border-or bg-[#211a13]/70 shadow-[0_26px_64px_-40px_rgba(0,0,0,0.9)] sm:scale-[1.02]'
                  : 'border-creme/12 hover:border-creme/28'
              }`}
            >
              <span
                className={`font-display text-[13px] tabular-nums tracking-[0.1em] transition-colors duration-500 ${
                  on ? 'text-or' : 'text-sable/35'
                }`}
              >
                {o.eyebrow}
              </span>
              <span
                className={`mt-2.5 font-display text-[clamp(1.55rem,2.4vw,2.2rem)] leading-[1.06] transition-colors duration-500 ${
                  on ? 'text-creme' : 'text-sable/55'
                }`}
              >
                {o.name}
                <span className={`text-or transition-opacity duration-300 ${on ? 'dot-breathe opacity-100' : 'opacity-0'}`}>
                  .
                </span>
              </span>
              <span
                className={`mt-2 text-[10px] font-normal uppercase tracking-[0.22em] transition-colors duration-500 ${
                  on ? 'text-or/85' : 'text-sable/40'
                }`}
              >
                {o.register}
              </span>
              {/* Emplacement réservé : la pastille apparaît sans jamais changer
                  la hauteur de la carte (donc rien ne se décale). */}
              <span className="mt-5 flex h-[26px] items-center">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full bg-or px-2.5 py-1 text-[10px] font-normal uppercase tracking-[0.2em] text-encre transition-opacity duration-500 ${
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

      {/* Contenu de l'offre en lecture. Fondu à l'opacité (offer-enter) : le
          texte ne se recompose pas, il se substitue en douceur. */}
      <div key={offre.name} className="offer-enter mx-auto w-full max-w-[1180px] pb-40 lg:pb-24">
        <h1 className="sr-only">Offre {offre.name} — Bel Augure</h1>

        <div className="mt-12 grid gap-x-16 gap-y-12 border-t border-or/20 pt-12 lg:grid-cols-12">
          {/* ── GAUCHE : lecture ── */}
          <div className="lg:col-span-6">
            <p className="max-w-[24ch] text-[clamp(1.5rem,2.5vw,2.15rem)] font-light leading-[1.2] text-creme">
              {offre.accroche}
            </p>
            <div className="mt-6 max-w-[52ch] space-y-4 text-[15px] font-light leading-[1.8] text-sable/85">
              {offre.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="mt-6 max-w-[50ch] text-[12px] font-light leading-[1.7] text-sable/45">
              {offre.usage}
            </p>
            <p className="mt-5 max-w-[42ch] text-[14px] font-light italic leading-[1.5] text-sable/90">
              {offre.closing}
            </p>
          </div>

          {/* ── DROITE : composer ── */}
          <div className="lg:col-span-6 lg:self-start">
            <div className="lg:sticky lg:top-24">
              <div className="flex flex-col rounded-2xl border border-or/20 bg-[#211a13]/45 p-6 backdrop-blur-sm md:p-7 lg:max-h-[calc(100dvh-7rem)]">
                <div className="shrink-0">
                  <h2 className={`text-[11px] font-normal uppercase tracking-[0.28em] ${label}`}>
                    {offre.compose}
                  </h2>
                  <p className="mt-2 text-[12.5px] font-light leading-[1.6] text-sable/65">
                    Cochez ce qui vous parle — on affine le projet ensemble.
                  </p>
                </div>

                <ul data-console className="mt-6 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-1">
                  {offre.items.map((item, i) => {
                    const checked = !!sel[i]
                    return (
                      <li key={item} className="flex items-center gap-4 border-b border-creme/10 py-3.5">
                        <button
                          type="button"
                          role="checkbox"
                          aria-checked={checked}
                          onClick={() => toggle(i)}
                          className="group flex flex-1 cursor-pointer items-start gap-3.5 rounded-md text-left outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or"
                        >
                          <span
                            aria-hidden="true"
                            className={`mt-[0.05em] flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-[5px] border transition-colors duration-300 ${
                              checked
                                ? 'border-or bg-or text-encre'
                                : 'border-creme/40 bg-creme/[0.04] group-hover:border-creme/70'
                            }`}
                          >
                            {checked && (
                              <span className="check-draw">
                                <IconCheck />
                              </span>
                            )}
                          </span>
                          <span className="min-w-0">
                            <span
                              className={`block text-[13.5px] font-light leading-[1.5] transition-colors duration-300 ${
                                checked ? 'text-creme' : 'text-sable/85'
                              }`}
                            >
                              {item}
                            </span>
                            <span
                              aria-hidden="true"
                              className="mt-1 block h-px origin-left bg-or/70"
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

                <div className="mt-6 hidden shrink-0 border-t border-or/25 pt-5 lg:block">
                  <p className="text-[11.5px] font-light leading-[1.5] text-sable/60">
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
          <p className="mt-8 text-[12.5px] font-light leading-[1.7] text-sable/55">
            {EXTENSIONS.closing}
          </p>
        </div>

        {/* ── Questions ── */}
        <div className="mt-16 border-t border-or/20 pt-14">
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
      </div>

      {/* Mobile : CTA en barre du bas, toujours accessible. */}
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
