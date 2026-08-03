import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'

// Page /offres — une console d'atelier, pas un panier. À GAUCHE on lit l'offre
// (accroche, description, usages) ; à DROITE on compose (on coche les éléments
// qui parlent au projet) et le studio reprend cette sélection pour un devis sur
// mesure. On emprunte la structure du loadout de jeu vidéo — slots, états
// francs — jamais son esthétique (pas de HUD, pas de néon). Aucun prix affiché :
// tout est chiffré selon les besoins réels. La pièce change de lumière selon
// l'offre.
const OFFRES = [
  {
    name: 'Film Signature',
    eyebrow: '01',
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
    bgColor: '#1a1512',
    ink: true,
  },
  {
    name: 'Histoires de marque',
    eyebrow: '02',
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
    bgColor: 'rgb(217 198 166 / 0.45)',
    ink: false,
  },
  {
    name: 'Campagne signature',
    eyebrow: '03',
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
    bgColor: '#241c15',
    ink: true,
  },
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
  const [index, setIndex] = useState(0)
  // Sélection conservée PAR offre : { [indexOffre]: { [indexÉlément]: true } }.
  // Changer d'offre ne détruit plus la composition — on la retrouve en revenant.
  const [selByOffer, setSelByOffer] = useState({})
  // Repli du récapitulatif sur mobile (barre du bas dépliable).
  const [openDetail, setOpenDetail] = useState(false)
  const offre = OFFRES[index]
  const ink = offre.ink
  const sel = selByOffer[index] || {}

  // Le header suit la lumière de la pièce : crème sur l'encre, encre sur l'or.
  useEffect(() => {
    setDark?.(ink)
  }, [ink, setDark])

  // Changer d'offre referme le détail mobile (la sélection, elle, est conservée).
  useEffect(() => {
    setOpenDetail(false)
  }, [index])

  // Flèches clavier : on passe d'une offre à l'autre — sauf quand le focus est
  // dans la console (cases), pour ne pas changer d'offre par mégarde.
  useEffect(() => {
    const onKey = (e) => {
      if (document.activeElement?.closest('[data-console]')) return
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % OFFRES.length)
      else if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + OFFRES.length) % OFFRES.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Mobile : un glissement horizontal net fait défiler les offres, sans gêner
  // le scroll vertical de la page.
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

  // Les éléments cochés de l'offre courante, dans l'ordre.
  const selected = offre.items.filter((_, i) => sel[i])

  // « Demander un devis » : on reprend l'offre et la sélection dans un message
  // qui pré-remplit la page Contact. Le prospect n'a plus qu'à laisser ses
  // coordonnées et envoyer. Aucun prix — le chiffrage se fait sur mesure.
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

  const label = ink ? 'text-sable/75' : 'text-encre/70'

  return (
    <section
      ref={ref}
      aria-label="Offres"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="flex h-full flex-col overflow-y-auto px-6 pt-28 transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:px-16"
      style={{ backgroundColor: offre.bgColor }}
    >
      {/* Le sélecteur : trois cartes de choix. La carte active fait office de
          titre — numéro et nom. Un mot d'intro et une pastille « Sélectionné »
          rendent le geste explicite : on choisit une offre, et le choix change
          la lumière de la page. */}
      <p
        className={`reveal-up mx-auto mt-4 w-full max-w-[1180px] text-[11px] font-normal uppercase tracking-[0.3em] md:mt-8 ${label}`}
        style={{ '--d': '0.08s' }}
      >
        Trois offres — choisissez la vôtre
      </p>
      <div
        className="reveal-up mx-auto mt-4 flex w-full max-w-[1180px] flex-col gap-4 sm:flex-row"
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
              className={`group flex w-full cursor-pointer flex-col items-start overflow-hidden rounded-2xl border p-6 text-left outline-none transition-[flex-grow,border-color,background-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or sm:min-w-0 md:p-7 ${
                on
                  ? `sm:flex-[1.6_1_0%] ${ink ? 'border-or bg-[#221c17]/60' : 'border-or bg-creme/55'}`
                  : `sm:flex-[1_1_0%] ${ink ? 'border-creme/15 hover:border-creme/35' : 'border-encre/15 hover:border-encre/35'}`
              }`}
            >
              <span
                className={`whitespace-nowrap text-[10px] font-normal uppercase tracking-[0.28em] transition-colors duration-500 ${
                  on ? (ink ? 'text-sable/75' : 'text-encre/70') : ink ? 'text-sable/50' : 'text-encre/50'
                }`}
              >
                {o.eyebrow}
              </span>
              <span
                className={`mt-2 font-display text-[clamp(1.7rem,2.9vw,2.6rem)] leading-[1.04] transition-colors duration-500 ${
                  on ? (ink ? 'text-creme' : 'text-encre') : ink ? 'text-sable/65' : 'text-encre/60'
                }`}
              >
                {o.name}
                <span className={`text-or transition-opacity duration-300 ${on ? 'dot-breathe opacity-100' : 'opacity-0'}`}>
                  .
                </span>
              </span>
              {/* Mention de sélection : seule la carte active porte une pastille
                  surlignée or ; l'inactive reste vide. */}
              {on && (
                <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-or px-2.5 py-1 text-[10px] font-normal uppercase tracking-[0.2em] text-encre">
                  <IconCheck />
                  Sélectionné
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Contenu, rejoué à chaque changement d'offre (key). La carte active
          tient lieu de titre visible ; un h1 discret sert les lecteurs d'écran. */}
      <div key={offre.name} className="offer-enter mx-auto w-full max-w-[1180px] pb-40 lg:pb-24">
        <h1 className="sr-only">Offre {offre.name} — Bel Augure</h1>

        {/* Le split : lire à gauche, composer à droite */}
        <div
          className={`mt-10 grid gap-x-16 gap-y-12 border-t pt-12 lg:grid-cols-12 ${
            ink ? 'border-or/25' : 'border-or/45'
          }`}
        >
          {/* ── GAUCHE : lecture ───────────────────────────────── */}
          <div className="lg:col-span-6">
            <p
              className={`max-w-[46ch] text-[clamp(1.05rem,1.4vw,1.3rem)] font-light leading-[1.65] ${
                ink ? 'text-sable' : 'text-encre'
              }`}
            >
              {offre.accroche}
            </p>
            <div
              className={`mt-8 max-w-[60ch] space-y-4 text-[14px] font-light leading-[1.9] ${
                ink ? 'text-sable/85' : 'text-encre/80'
              }`}
            >
              {offre.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            {/* Où le montrer */}
            <p
              className={`mt-9 max-w-[54ch] text-[13px] font-light leading-[1.85] ${
                ink ? 'text-sable/65' : 'text-encre/60'
              }`}
            >
              {offre.usage}
            </p>

            {/* Note de clôture — la promesse sur mesure */}
            <p
              className={`mt-8 max-w-[46ch] text-[14.5px] font-light italic leading-[1.55] ${
                ink ? 'text-sable' : 'text-encre'
              }`}
            >
              {offre.closing}
            </p>
          </div>

          {/* ── DROITE : la console ────────────────────────────── */}
          <div className="lg:col-span-6 lg:self-start">
            <div className="lg:sticky lg:top-24">
              <div
                className={`flex flex-col rounded-2xl border p-6 backdrop-blur-sm md:p-7 lg:max-h-[calc(100dvh-7rem)] ${
                  ink ? 'border-or/20 bg-[#221c17]/55' : 'border-or/35 bg-creme/45'
                }`}
              >
                {/* En-tête de console — toujours visible */}
                <div className="shrink-0">
                  <h2 className={`text-[11px] font-normal uppercase tracking-[0.3em] ${label}`}>
                    {offre.compose}
                  </h2>
                  <p className={`mt-2 text-[12.5px] font-light leading-[1.6] ${ink ? 'text-sable/70' : 'text-encre/65'}`}>
                    Cochez ce qui vous parle — on affine le projet ensemble.
                  </p>
                </div>

                {/* Les éléments : seule zone qui défile en interne sur écran court —
                    l'en-tête et le pied (devis) restent toujours en vue.
                    data-console : les flèches clavier n'y changent pas d'offre. */}
                <ul data-console className="mt-6 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-1">
                  {offre.items.map((item, i) => {
                    const on = !!sel[i]
                    return (
                      <li
                        key={item}
                        className={`flex items-center gap-4 border-b py-4 ${
                          ink ? 'border-creme/10' : 'border-encre/10'
                        }`}
                      >
                        <button
                          type="button"
                          role="checkbox"
                          aria-checked={on}
                          onClick={() => toggle(i)}
                          className="group flex flex-1 cursor-pointer items-start gap-3.5 rounded-md text-left outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or"
                        >
                          <span
                            aria-hidden="true"
                            className={`mt-[0.05em] flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-[5px] border transition-colors duration-300 ${
                              on
                                ? 'border-or bg-or text-encre'
                                : ink
                                  ? 'border-creme/40 bg-creme/[0.04] group-hover:border-creme/70'
                                  : 'border-encre/45 bg-encre/[0.04] group-hover:border-encre/70'
                            }`}
                          >
                            {on && (
                              <span className="check-draw">
                                <IconCheck />
                              </span>
                            )}
                          </span>
                          <span className="min-w-0">
                            <span
                              className={`block text-[13.5px] font-light leading-[1.5] ${
                                on
                                  ? ink
                                    ? 'text-creme'
                                    : 'text-encre'
                                  : ink
                                    ? 'text-sable/85'
                                    : 'text-encre/80'
                              }`}
                            >
                              {item}
                            </span>
                            {/* Filet or qui se trace sous la ligne retenue */}
                            <span
                              aria-hidden="true"
                              className="mt-1 block h-px origin-left bg-or/70"
                              style={{
                                transform: on ? 'scaleX(1)' : 'scaleX(0)',
                                transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
                              }}
                            />
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>

                {/* Pied de console — toujours visible : note + CTA */}
                <div className="shrink-0">
                  {/* Aucun prix affiché : le devis est établi sur mesure avec le
                      studio, à partir de la sélection transmise. */}
                  <div className={`mt-6 hidden border-t pt-5 lg:block ${ink ? 'border-or/25' : 'border-or/45'}`}>
                    <p className={`text-[11.5px] font-light leading-[1.5] ${ink ? 'text-sable/60' : 'text-encre/60'}`}>
                      Devis établi sur mesure, selon votre projet.
                    </p>
                    <button
                      type="button"
                      onClick={requestQuote}
                      className={`cta mt-5 w-full cursor-pointer py-3.5 text-[13px] font-normal tracking-[0.06em] ${
                        ink ? 'cta-light' : ''
                      }`}
                    >
                      Demander un devis
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Épilogue : questions ── */}
        <div className={`mt-20 border-t pt-14 ${ink ? 'border-or/25' : 'border-or/45'}`}>
          <h2 className={`text-[11px] font-normal uppercase tracking-[0.3em] ${label}`}>
            Les questions qui reviennent
          </h2>
          <dl className="mt-8 grid gap-x-12 gap-y-9 md:grid-cols-2">
            {QUESTIONS.map((item) => (
              <div key={item.q}>
                <dt className={`font-display text-[16px] leading-[1.4] ${ink ? 'text-creme' : 'text-encre'}`}>
                  {item.q}
                </dt>
                <dd className={`mt-2 text-[13px] font-light leading-[1.8] ${ink ? 'text-sable/75' : 'text-encre/75'}`}>
                  {item.r}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── Extensions possibles : commun aux trois offres ── */}
        <div className={`mt-16 border-t pt-12 ${ink ? 'border-or/25' : 'border-or/45'}`}>
          <h2 className={`text-[11px] font-normal uppercase tracking-[0.3em] ${label}`}>
            Extensions possibles
          </h2>
          <p
            className={`mt-5 font-display text-[clamp(1.4rem,2.2vw,2rem)] leading-[1.15] ${
              ink ? 'text-creme' : 'text-encre'
            }`}
          >
            {EXTENSIONS.tagline}
          </p>
          <p
            className={`mt-4 max-w-[60ch] text-[14px] font-light leading-[1.9] ${
              ink ? 'text-sable/85' : 'text-encre/80'
            }`}
          >
            {EXTENSIONS.intro}
          </p>
          <ul className="mt-8 grid gap-x-16 gap-y-3 sm:grid-cols-2">
            {EXTENSIONS.items.map((it) => (
              <li
                key={it}
                className={`flex gap-3 text-[13.5px] font-light leading-[1.5] ${
                  ink ? 'text-sable/80' : 'text-encre/75'
                }`}
              >
                <span aria-hidden="true" className="mt-[0.15em] shrink-0 text-or">
                  <IconCheck />
                </span>
                <span>{it}</span>
              </li>
            ))}
          </ul>
          <p className={`mt-8 text-[12.5px] font-light leading-[1.7] ${ink ? 'text-sable/60' : 'text-encre/60'}`}>
            {EXTENSIONS.closing}
          </p>
        </div>
      </div>

      {/* Mobile : le devis se glisse en barre du bas, toujours visible, et se
          déplie pour montrer la sélection. */}
      <div
        className={`sticky bottom-0 z-10 -mx-6 mt-auto border-t backdrop-blur-md md:-mx-16 lg:hidden ${
          ink ? 'border-or/25 bg-encre/90' : 'border-or/45 bg-creme/90'
        }`}
      >
        {openDetail && (
          <div className="max-h-[45vh] overflow-y-auto px-6 pt-5 md:px-16">
            <ReceiptLines selected={selected} ink={ink} />
          </div>
        )}
        <div
          className="flex items-center justify-between gap-4 px-6 pt-4 md:px-16"
          style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
        >
          <button
            type="button"
            onClick={() => setOpenDetail((v) => !v)}
            aria-expanded={openDetail}
            className="flex min-h-[44px] items-center gap-2 cursor-pointer text-left"
          >
            <span className={`text-[11px] font-normal uppercase tracking-[0.25em] ${label}`}>
              {openDetail ? 'Masquer le détail' : 'Votre sélection'}
            </span>
            <span className={`inline-block align-middle transition-transform ${openDetail ? 'rotate-180' : ''} ${label}`}>
              <IconChevron />
            </span>
          </button>
          <button
            type="button"
            onClick={requestQuote}
            className={`cta w-max shrink-0 cursor-pointer px-6 py-3 text-[13px] font-normal tracking-[0.06em] ${
              ink ? 'cta-light' : ''
            }`}
          >
            Demander un devis
          </button>
        </div>
      </div>
    </section>
  )
}

// La sélection reprise sous la barre mobile : les éléments cochés, ou une
// invite quand rien n'est encore coché.
function ReceiptLines({ selected, ink }) {
  const rowText = ink ? 'text-sable/85' : 'text-encre/80'
  if (!selected.length) {
    return (
      <p className={`text-[13px] font-light leading-[1.5] ${ink ? 'text-sable/60' : 'text-encre/60'}`}>
        Rien de coché pour l’instant — cochez ce qui vous intéresse, ou laissez-nous vous guider.
      </p>
    )
  }
  return (
    <ul className="space-y-2.5">
      {selected.map((l) => (
        <li
          key={l}
          className={`flex items-baseline gap-2.5 text-[13px] font-light leading-[1.4] ${rowText}`}
        >
          <span aria-hidden="true" className="mt-[0.15em] shrink-0 text-or">
            <IconCheck />
          </span>
          <span>{l}</span>
        </li>
      ))}
    </ul>
  )
}

// Coche fine, dessinée à la charte.
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

function IconChevron() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}
