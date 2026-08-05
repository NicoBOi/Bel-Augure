import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'

// Page /offres (v2 post-audit) — la lumière monte du papier vers la salle
// obscure : 01 Film Signature (crème, l'acquisition), 02 Histoires de marque
// (doré, le programme), 03 Campagne Sensorielle (vrai mode sombre, sur
// consultation). Cartes hiérarchisées, jamais redimensionnées. Prix ancrés sur
// le 01, droits/délais/retours affichés, jargon retiré.
const OFFRES = [
  {
    name: 'Film Signature',
    eyebrow: '01',
    register: 'La pièce maîtresse',
    rank: 1,
    icon: 'film',
    bgColor: '#F0E6D8',
    ink: false,
    accroche: 'Faites ressentir ce qui vous distingue.',
    description: [
      'Nous partons de votre vision, de vos gestes, de vos produits ou de votre lieu pour créer le film central de votre communication. Une pièce forte, entièrement pensée pour vous, conçue pour porter durablement votre image.',
    ],
    context: 'Pour installer votre univers, le révéler ou lui donner un nouveau souffle.',
    receiveTitle: 'Ce que comprend le projet',
    receive: [
      'Un film de marque sur mesure de 60 à 90 secondes',
      'Selon le périmètre retenu, une ou deux versions horizontales de 30 et 15 secondes',
      'La conception, l’écriture, la direction artistique et les repérages',
      'Un à deux jours de tournage, dans les lieux définis pour le projet',
      'Le montage, la création sonore et l’étalonnage, réalisés au studio',
      'Une musique licenciée, choisie pour le film',
    ],
    cadre: [
      'Première version présentée sous deux semaines après le tournage',
      'Deux séries de retours incluses',
      'Droits d’utilisation inclus pendant deux ans en France : site internet, réseaux sociaux, présentations et salons',
      'Votre projet est suivi directement par les deux fondateurs',
    ],
    consoleTitle: 'Extensions possibles',
    consoleIntro: 'Cochez ce qui vous intéresse — chiffré dans la proposition.',
    itemsMode: 'options',
    itemGroups: [
      {
        label: 'Création',
        items: ['Déclinaisons verticales', 'Voix off', 'Musique originale', 'Prises de vues aériennes'],
      },
      {
        label: 'Production',
        items: ['Journée de tournage supplémentaire'],
      },
      {
        label: 'Droits d’utilisation',
        items: ['Télévision, affichage ou cinéma', 'Diffusion internationale', 'Durée d’utilisation étendue'],
      },
    ],
    items: [
      'Déclinaisons verticales',
      'Voix off',
      'Musique originale',
      'Prises de vues aériennes',
      'Journée de tournage supplémentaire',
      'Télévision, affichage ou cinéma',
      'Diffusion internationale',
      'Durée d’utilisation étendue',
    ],
    cta: 'Prendre rendez-vous',
  },
  {
    name: 'Histoires de marque',
    eyebrow: '02',
    register: 'Le programme',
    rank: 2,
    icon: 'collection',
    bgColor: '#D9C6A6',
    ink: false,
    accroche: 'Révélez une nouvelle facette de votre univers à chaque film.',
    description: [
      'Nous imaginons une collection de films courts autour d’un produit, d’un rituel, d’un savoir-faire, d’une personne ou d’un lieu. Chaque histoire explore un sujet différent ; ensemble, elles font vivre votre marque au fil de l’année, dans une même continuité.',
    ],
    context: 'Pour communiquer régulièrement tout en restant immédiatement reconnaissable.',
    receiveTitle: 'Ce que vous recevez',
    receive: [
      'Une collection de quatre films minimum, de 30 à 60 secondes chacun',
      'Chaque film livré aux formats de vos canaux, horizontal et vertical',
      'Une ligne éditoriale construite avec vous au démarrage',
      'Des tournages groupés, une à deux journées par vague',
      'Montage, son et étalonnage réalisés au studio',
    ],
    cadre: [
      'Nombre de films, durées et calendrier fixés à la proposition',
      'Deux allers-retours de validation par film',
      'Diffusion incluse : deux ans, France, digital et réseaux sociaux',
      'Programme trimestriel ou saisonnier, reconduit d’un commun accord',
    ],
    consoleTitle: 'Chaque collection peut explorer',
    consoleIntro: 'Choisissez ce qui vous parle — on affine le projet ensemble.',
    itemsMode: 'subjects',
    items: [
      'Un rituel ou un soin signature',
      'Le portrait d’un fondateur ou d’un artisan',
      'L’atmosphère d’un lieu',
      'L’origine d’un produit ou d’un ingrédient',
      'Les gestes d’un savoir-faire',
      'Les convictions et les histoires de la maison',
    ],
    bridge:
      'Le programme prolonge naturellement un Film Signature : même univers, déployé dans le temps.',
    cta: 'Prendre rendez-vous',
  },
  {
    name: 'Campagne Sensorielle',
    eyebrow: '03',
    register: 'Le déploiement complet',
    rank: 3,
    icon: 'campaign',
    bgColor: '#1a1512',
    ink: true,
    accroche: 'Donnez à votre prochain temps fort toute son ampleur.',
    description: [
      'Pour une ouverture, un lancement ou une nouvelle identité, nous imaginons une campagne audiovisuelle complète : un film principal, des histoires courtes et leurs déclinaisons. Tout est créé autour d’une même idée, pour former un univers fort sur chacun de vos supports.',
    ],
    context: null,
    receive: null,
    cadre: [
      'Huit à dix semaines entre la validation de la proposition et la livraison',
      'La campagne est suivie directement par les deux fondateurs',
      'Diffusion incluse : deux ans, France, digital et réseaux sociaux ; les autres usages sont chiffrés dès la proposition',
    ],
    consoleTitle: 'Elle réunit',
    consoleIntro: 'Chaque campagne fait l’objet d’une proposition dédiée.',
    itemsMode: 'included',
    items: [
      'Une idée directrice',
      'Un Film Signature',
      'Une collection d’Histoires de marque',
      'Les déclinaisons horizontales et verticales de l’ensemble',
      'La photographie de campagne, avec un photographe partenaire, en option',
    ],
    cta: 'Écrire au studio',
  },
]

// Bloc transverse (bas de page) — même pour les trois offres.
const PROCESS = [
  {
    t: 'Un échange de trente minutes',
    d: 'Votre projet, votre échéance, votre budget. Nous vous disons ce qui est possible.',
  },
  {
    t: 'Une proposition détaillée',
    d: 'Livrables, calendrier, prix : tout est écrit avant de commencer.',
  },
  {
    t: 'Le tournage',
    d: 'Une équipe légère, deux à trois personnes, dans le respect de votre lieu et de vos clients.',
  },
  {
    t: 'La livraison',
    d: 'Postproduction entièrement réalisée au studio. Deux allers-retours de validation inclus.',
  },
]

const DIFFUSION = {
  title: 'La diffusion, en clair',
  body: 'Tous nos prix incluent deux ans d’utilisation en France, sur le digital et les réseaux sociaux. Télévision, affichage, cinéma, international ou durée étendue : ces usages sont définis et chiffrés dès la proposition.',
}

export default function Offres({ setDark, onNavigate }) {
  const ref = useReveal(0.35)
  const [index, setIndex] = useState(0)
  const [selByOffer, setSelByOffer] = useState({})
  const offre = OFFRES[index]
  const ink = offre.ink
  const sel = selByOffer[index] || {}
  const hasConsole = offre.itemsMode !== 'none'

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
    const intro =
      offre.itemsMode === 'options'
        ? 'Options qui m’intéressent :'
        : offre.itemsMode === 'subjects'
          ? 'Sujets qui m’intéressent :'
          : ''
    const message = [
      'Bonjour,',
      '',
      `Je souhaite échanger sur l'offre ${offre.name}.`,
      '',
      selected.length ? intro : 'Je vous laisse me guider.',
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

  // Une entrée de console (case ou ligne « incluse »). L'index reste global sur
  // offre.items pour que la sélection et la demande de devis restent alignées,
  // même lorsque les items sont présentés en sous-groupes.
  const renderConsoleItem = (item, i) => {
    const included = offre.itemsMode === 'included'
    const checked = included || !!sel[i]
    const inner = (
      <>
        <span
          aria-hidden="true"
          className={`mt-[0.05em] flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-[5px] border transition-colors duration-300 ${
            checked
              ? ink ? 'border-or bg-or text-encre' : 'border-encre bg-encre text-or'
              : ink ? 'border-creme/40 bg-creme/[0.04] group-hover:border-creme/70' : 'border-orfonce/45 bg-black/[0.03] group-hover:border-orfonce/70'
          }`}
        >
          {checked && (
            <span className={included ? undefined : 'check-draw'}>
              <IconCheck />
            </span>
          )}
        </span>
        <span className="min-w-0">
          <span className={`block text-[13.5px] font-light leading-[1.5] transition-colors duration-300 ${checked ? (ink ? 'text-creme' : 'text-encre') : ink ? 'text-sable/85' : 'text-encre/85'}`}>
            {item}
          </span>
          {!included && (
            <span
              aria-hidden="true"
              className={`mt-1 block h-px origin-left ${ink ? 'bg-or/70' : 'bg-encre/70'}`}
              style={{
                transform: checked ? 'scaleX(1)' : 'scaleX(0)',
                transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
              }}
            />
          )}
        </span>
      </>
    )
    return (
      <li key={item} className={`flex items-center gap-4 border-b py-3.5 ${ink ? 'border-creme/10' : 'border-encre/12'}`}>
        {included ? (
          <span className="flex flex-1 items-start gap-3.5">{inner}</span>
        ) : (
          <button
            type="button"
            role="checkbox"
            aria-checked={checked}
            onClick={() => toggle(i)}
            className={`group flex flex-1 cursor-pointer items-start gap-3.5 rounded-md text-left outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${ink ? 'focus-visible:outline-or' : 'focus-visible:outline-encre'}`}
          >
            {inner}
          </button>
        )}
      </li>
    )
  }

  return (
    <section
      ref={ref}
      aria-label="Offres"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="flex h-full flex-col overflow-y-auto px-6 pt-28 transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:px-16"
      style={{ backgroundColor: offre.bgColor }}
    >
      <div className="reveal-up mx-auto w-full max-w-[1180px]" style={{ '--d': '0.08s' }}>
        <p className={`mt-4 text-[11px] font-normal uppercase tracking-[0.32em] md:mt-8 ${label}`}>
          Trois façons de travailler ensemble
        </p>
        <p
          className={`mt-3 max-w-[40ch] text-[clamp(1.05rem,1.7vw,1.4rem)] font-light leading-[1.35] ${ink ? 'text-creme' : 'text-encre'}`}
        >
          Un film fondateur. Un univers qui vit. Un déploiement complet.
        </p>
      </div>

      <div
        className="reveal-up mx-auto mt-8 flex w-full max-w-[1180px] flex-col gap-4 sm:flex-row sm:items-stretch"
        style={{ '--d': '0.14s' }}
      >
        {OFFRES.map((o, i) => {
          const on = i === index
          const r = o.rank
          const rankBorder = ink
            ? r === 3 ? 'border-or/55' : r === 2 ? 'border-or/30' : 'border-creme/15'
            : r === 3 ? 'border-orfonce/55' : r === 2 ? 'border-orfonce/32' : 'border-orfonce/16'
          const border = on ? (ink ? 'border-or' : 'border-encre') : `${rankBorder} ${ink ? 'hover:border-creme/40' : 'hover:border-orfonce/60'}`
          const bg = on ? (ink ? 'bg-[#241c13]/55' : 'bg-black/[0.04]') : ''
          const numCol = ink ? (on ? 'text-or' : 'text-sable/45') : (on ? 'text-orfonce' : 'text-encre/45')
          const iconCol = ink ? (on ? 'text-or' : 'text-or/55') : (on ? 'text-orfonce' : 'text-orfonce/55')
          const nameCol = ink ? (on ? 'text-creme' : 'text-sable/55') : (on ? 'text-encre' : 'text-encre/60')
          const regCol = ink ? (on ? 'text-or' : 'text-sable/45') : (on ? 'text-orfonce' : 'text-encre/55')
          return (
            <button
              key={o.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-current={on ? 'true' : undefined}
              aria-label={`Choisir l’offre ${o.name}`}
              className={`group flex cursor-pointer flex-col items-center rounded-2xl border p-5 text-center outline-none transition-[border-color,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${ink ? 'focus-visible:outline-or' : 'focus-visible:outline-encre'} md:p-6 sm:min-w-0 sm:flex-1 ${border} ${bg}`}
            >
              <span className={`font-display text-[13px] tabular-nums tracking-[0.1em] transition-colors duration-500 ${numCol}`}>
                {o.eyebrow}
              </span>
              <span
                aria-hidden="true"
                className={`mt-4 flex h-[34px] items-center justify-center transition-opacity duration-500 ${on ? 'opacity-100' : 'opacity-0'}`}
              >
                <OfferIcon kind={o.icon} bg={offre.bgColor} className={iconCol} />
              </span>
              <span className={`mt-4 whitespace-nowrap font-display text-[clamp(1.05rem,1.9vw,1.5rem)] leading-[1.1] transition-colors duration-500 ${nameCol}`}>
                {o.name}
                <span className={`transition-opacity duration-300 ${ink ? 'text-or' : 'text-orfonce'} ${on ? 'dot-breathe opacity-100' : 'opacity-0'}`}>
                  .
                </span>
              </span>
              <span className={`mt-2 text-[10px] font-normal uppercase tracking-[0.22em] transition-colors duration-500 ${regCol}`}>
                {o.register}
              </span>
              <span className="mt-4 flex h-[24px] items-center justify-center">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-normal uppercase tracking-[0.2em] ${
                    ink ? 'bg-or text-encre' : 'bg-encre text-or'
                  } ${on ? 'opacity-100' : 'opacity-0'}`}
                >
                  <IconCheck />
                  Sélectionné
                </span>
              </span>
            </button>
          )
        })}
      </div>

      <div key={offre.name} className="offer-enter mx-auto w-full max-w-[1180px]">
        <h1 className="sr-only">Offre {offre.name} — Bel Augure</h1>

        <div className={`mt-12 grid gap-x-16 gap-y-12 border-t pt-12 lg:grid-cols-12 ${line}`}>
          {/* ── GAUCHE : lecture ── */}
          <div className="lg:col-span-7">
            <p className={`max-w-[24ch] text-[clamp(1.5rem,2.5vw,2.15rem)] font-light leading-[1.2] ${ink ? 'text-creme' : 'text-encre'}`}>
              {offre.accroche}
            </p>
            <div className={`mt-6 max-w-[56ch] space-y-4 text-[15px] font-light leading-[1.8] ${ink ? 'text-sable/85' : 'text-encre/80'}`}>
              {offre.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {offre.context && (
              <p className={`mt-6 max-w-[52ch] text-[12.5px] font-light leading-[1.7] ${ink ? 'text-sable/55' : 'text-encre/60'}`}>
                {offre.context}
              </p>
            )}

            {/* Ce que vous recevez */}
            {offre.receive && (
              <div className={`mt-10 border-t pt-8 ${line}`}>
                <h2 className={`text-[11px] font-normal uppercase tracking-[0.28em] ${label}`}>
                  {offre.receiveTitle}
                </h2>
                <ul className="mt-5 space-y-3">
                  {offre.receive.map((it) => (
                    <li key={it} className={`flex items-start gap-3.5 text-[14px] font-light leading-[1.55] ${ink ? 'text-sable/85' : 'text-encre/85'}`}>
                      <span aria-hidden="true" className={`mt-[0.62em] h-px w-4 shrink-0 ${dash}`} />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Le cadre */}
            <div className={`mt-8 border-t pt-8 ${line}`}>
              <h2 className={`text-[11px] font-normal uppercase tracking-[0.28em] ${label}`}>
                Le cadre
              </h2>
              <ul className="mt-5 space-y-3">
                {offre.cadre.map((it) => (
                  <li key={it} className={`flex items-start gap-3.5 text-[13.5px] font-light leading-[1.55] ${ink ? 'text-sable/70' : 'text-encre/70'}`}>
                    <span aria-hidden="true" className={`mt-[0.62em] h-px w-4 shrink-0 ${dash}`} />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>

            {offre.bridge && (
              <p className={`mt-8 max-w-[52ch] text-[13.5px] font-light italic leading-[1.6] ${ink ? 'text-sable/80' : 'text-encre/75'}`}>
                {offre.bridge}
              </p>
            )}
          </div>

          {/* ── DROITE : composer / demander ── */}
          <div className="lg:col-span-5 lg:self-start">
            <div className="lg:sticky lg:top-24">
              <div className={`flex flex-col rounded-2xl border p-6 md:p-7 lg:max-h-[calc(100dvh-7rem)] ${ink ? 'border-or/20 bg-[#211a13]/45 backdrop-blur-sm' : 'border-encre/12 bg-black/[0.03]'}`}>
                {hasConsole && (
                  <>
                    <div className="shrink-0">
                      <h2 className={`text-[11px] font-normal uppercase tracking-[0.28em] ${label}`}>
                        {offre.consoleTitle}
                      </h2>
                      <p className={`mt-2 text-[12.5px] font-light leading-[1.6] ${ink ? 'text-sable/65' : 'text-encre/65'}`}>
                        {offre.consoleIntro}
                      </p>
                    </div>

                    <ul data-console className="mt-6 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-1">
                      {offre.itemGroups
                        ? (() => {
                            let gi = 0
                            return offre.itemGroups.map((g, idx) => (
                              <li key={g.label} className="list-none">
                                <p
                                  className={`${idx === 0 ? 'pt-0.5' : 'pt-5'} pb-0.5 text-[10px] font-normal uppercase tracking-[0.22em] ${ink ? 'text-or/70' : 'text-orfonce/70'}`}
                                >
                                  {g.label}
                                </p>
                                <ul>{g.items.map((item) => renderConsoleItem(item, gi++))}</ul>
                              </li>
                            ))
                          })()
                        : offre.items.map((item, i) => renderConsoleItem(item, i))}
                    </ul>
                  </>
                )}

                <div className={`shrink-0 ${hasConsole ? `mt-6 border-t pt-5 ${line}` : ''}`}>
                  <button type="button" onClick={requestQuote} className={ctaClass}>
                    {offre.cta}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bloc transverse : comment nous travaillons ── */}
      <div className="mx-auto w-full max-w-[1180px] pb-40 lg:pb-24">
        <div className={`mt-16 border-t pt-14 ${line}`}>
          <h2 className={`text-[11px] font-normal uppercase tracking-[0.3em] ${label}`}>
            Comment nous travaillons
          </h2>
          <ol className="mt-8 grid gap-x-14 gap-y-9 sm:grid-cols-2">
            {PROCESS.map((step, i) => (
              <li key={step.t} className="flex items-start gap-4">
                <span className={`font-display text-[13px] tabular-nums ${ink ? 'text-or' : 'text-orfonce'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>
                  <span className={`block font-display text-[16px] leading-[1.35] ${ink ? 'text-creme' : 'text-encre'}`}>
                    {step.t}
                  </span>
                  <span className={`mt-1.5 block text-[13px] font-light leading-[1.7] ${ink ? 'text-sable/75' : 'text-encre/75'}`}>
                    {step.d}
                  </span>
                </span>
              </li>
            ))}
          </ol>

          <div className={`mt-12 border-t pt-8 ${line}`}>
            <h3 className={`font-display text-[16px] leading-[1.4] ${ink ? 'text-creme' : 'text-encre'}`}>
              {DIFFUSION.title}
            </h3>
            <p className={`mt-3 max-w-[70ch] text-[13.5px] font-light leading-[1.85] ${ink ? 'text-sable/80' : 'text-encre/80'}`}>
              {DIFFUSION.body}
            </p>
          </div>
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
            {offre.cta}
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

// Icône de livrable, même langage que les cadres de format mais en pile :
// chaque cadre est un écran plein, rempli de la couleur du fond de la carte,
// si bien que la pile se masque comme de vraies cartes empilées (jamais un
// enchevêtrement de traits). Les cadres du fond sont plus pâles : la
// profondeur se lit à l'opacité.
//  · collection — une pile de récits verticaux : « plusieurs », sans nombre
//  · film       — un cadre horizontal : la pièce unique
//  · campaign   — une pile de formats mêlés : le déploiement, l'abondance
function OfferIcon({ kind, bg, className }) {
  const s = { fill: bg, stroke: 'currentColor', strokeWidth: 1, strokeLinejoin: 'round' }
  return (
    <svg
      viewBox="0 0 40 34"
      height="34"
      aria-hidden="true"
      className={`transition-colors duration-500 ${className}`}
    >
      {kind === 'collection' && (
        <>
          <rect x="3.5" y="9" width="14" height="24" rx="2" {...s} opacity="0.45" />
          <rect x="9" y="6" width="14" height="24" rx="2" {...s} opacity="0.7" />
          <rect x="14.5" y="3" width="14" height="24" rx="2" {...s} />
        </>
      )}
      {kind === 'film' && <rect x="5" y="8.5" width="30" height="17" rx="2.5" {...s} />}
      {kind === 'campaign' && (
        <>
          <rect x="23" y="2.5" width="13" height="22" rx="2" {...s} opacity="0.5" />
          <rect x="3.5" y="5.5" width="24" height="14" rx="2" {...s} opacity="0.72" />
          <rect x="8" y="14" width="24" height="14" rx="2" {...s} />
        </>
      )}
    </svg>
  )
}
