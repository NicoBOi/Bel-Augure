import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'

// Page /offres — on lit l'offre à gauche (accroche-titre, description, usages,
// conclusion) et, à droite, la liste des possibilités que la création peut
// réunir : des repères éditoriaux, pas des cases à cocher. Le fond reste sombre
// et uniforme d'une offre à l'autre, pour la continuité et la comparaison.
// Aucun prix : tout est chiffré sur mesure.
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
  const offre = OFFRES[index]

  // Le fond des offres est sombre, sur toute la page : le header suit.
  useEffect(() => {
    setDark?.(true)
  }, [setDark])

  // Flèches clavier : on passe d'une offre à l'autre — sauf quand le focus est
  // dans la console (le CTA), pour ne pas changer d'offre par mégarde.
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

  // « Demander un devis » : on reprend l'offre dans un message qui pré-remplit
  // la page Contact. Aucun prix — le chiffrage se fait sur mesure.
  const requestQuote = () => {
    const message = [
      'Bonjour,',
      '',
      `Je souhaite échanger sur l'offre ${offre.name}.`,
    ].join('\n')
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
      {/* Le sélecteur : trois cartes de choix. La carte active fait office de
          titre — numéro et nom, nettement dominante. Une pastille « Sélectionné »
          rend le geste explicite. */}
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
                  ? 'border-or bg-[#221c17]/70 sm:flex-[1.7_1_0%]'
                  : 'border-creme/12 hover:border-creme/30 sm:flex-[1_1_0%]'
              }`}
            >
              <span
                className={`whitespace-nowrap text-[10px] font-normal uppercase tracking-[0.28em] transition-colors duration-500 ${
                  on ? 'text-sable/75' : 'text-sable/40'
                }`}
              >
                {o.eyebrow}
              </span>
              <span
                className={`mt-2 font-display leading-[1.04] transition-[color,font-size] duration-500 ${
                  on
                    ? 'text-[clamp(1.75rem,3vw,2.7rem)] text-creme'
                    : 'text-[clamp(1.3rem,2.1vw,1.85rem)] text-sable/45'
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

        {/* Le split : lire à gauche (dominant), consulter les possibilités à droite */}
        <div className="mt-10 grid gap-x-16 gap-y-12 border-t border-or/20 pt-12 lg:grid-cols-12">
          {/* ── GAUCHE : lecture ───────────────────────────────── */}
          <div className="lg:col-span-7">
            {/* Accroche = titre principal de la section : grande, contrastée,
                largeur resserrée pour l'impact — même fonte lisible qu'avant. */}
            <p className="max-w-[22ch] text-[clamp(1.7rem,2.9vw,2.7rem)] font-light leading-[1.15] text-creme">
              {offre.accroche}
            </p>
            {/* Description : juste dessous, poids intermédiaire. */}
            <div className="mt-5 max-w-[52ch] space-y-3 text-[15px] font-light leading-[1.75] text-sable/85">
              {offre.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            {/* Usage : information secondaire — plus petit, moins contrasté. */}
            <p className="mt-5 max-w-[50ch] text-[12px] font-light leading-[1.7] text-sable/45">
              {offre.usage}
            </p>

            {/* Conclusion en italique, rapprochée du reste. */}
            <p className="mt-4 max-w-[42ch] text-[14px] font-light italic leading-[1.5] text-sable/90">
              {offre.closing}
            </p>
          </div>

          {/* ── DROITE : les possibilités (repères éditoriaux, non interactifs) ── */}
          <div className="lg:col-span-5 lg:self-start">
            <div className="lg:sticky lg:top-24">
              <div
                data-console
                className="flex flex-col rounded-2xl border border-creme/10 bg-[#211a14]/35 p-6 backdrop-blur-sm md:p-7 lg:max-h-[calc(100dvh-7rem)]"
              >
                {/* Sous-titre du bloc — renforcé, mais sous l'accroche. */}
                <h2 className="shrink-0 text-[13px] font-normal uppercase tracking-[0.24em] text-creme/90">
                  {offre.compose}
                </h2>

                {/* Les possibilités : une liste éditoriale, chaque ligne marquée
                    d'un simple filet or. Aucune case, aucune sélection. */}
                <ul className="mt-6 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-1">
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

                {/* Pied de console — CTA (desktop). Aucun prix : devis sur mesure. */}
                <div className="mt-6 hidden shrink-0 border-t border-creme/10 pt-5 lg:block">
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

        {/* ── Extensions possibles : commun aux trois offres ── */}
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

      {/* Mobile : le CTA reste accessible en barre du bas. */}
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

// Coche fine, dessinée à la charte (pastille « Sélectionné », listes).
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
