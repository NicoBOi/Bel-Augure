import { useEffect, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'
import VimeoBackground from '../components/VimeoBackground.jsx'
import VideoLoader from '../components/VideoLoader.jsx'
import { useVimeoThumb } from '../hooks/useVimeoThumb.js'
import { HERO_FILM_ID, OFFERS, PROCESS, DIFFUSION } from '../content/offres.js'
import SiteFooter from '../components/SiteFooter.jsx'

// Page /offres — direction éditoriale « montrer puis expliquer ».
// Premier écran en deux temps : à gauche le titre, à droite le film ; en bas
// trois cartes très condensées. Puis les trois offres empilées (scroll
// classique, sans animation) : grand numéro à gauche, tout le reste composé à
// droite (identité, promesse, description, détail, prix, appel à l'action).
// Palette unique : les offres se distinguent par la composition et la teinte
// de bande, pas par trois univers colorés.
// Les textes et les prix vivent dans src/content/offres.js, partagé avec le
// prérendu SEO : une seule source de vérité.

// Palette — page entièrement claire (encre sur papier chaud). Une seule teinte
// de fond pour toute la section : la distinction se joue par la typographie,
// l'espace et le grand plan de film à venir.
const DASH = 'bg-orfonce/70'
const RULE = 'border-orfonce/20'
const BG = '#EFE4D5'

function DashList({ items, className = '', muted = false, cols = 1, ink = false }) {
  const dash = ink ? 'bg-or/60' : DASH
  const txt = muted ? (ink ? 'text-sable/60' : 'text-encre/65') : ink ? 'text-sable/90' : 'text-encre/85'
  return (
    <ul className={`${cols === 2 ? 'grid gap-x-10 gap-y-3 sm:grid-cols-2' : 'space-y-3'} ${className}`}>
      {items.map((it) => (
        <li key={it} className={`flex items-start gap-3.5 font-light leading-[1.55] ${muted ? 'text-[13.5px]' : 'text-[15px]'} ${txt}`}>
          <span aria-hidden="true" className={`mt-[0.6em] h-px w-4 shrink-0 ${dash}`} />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

const CTA_LIGHT =
  'inline-flex cursor-pointer items-center justify-center rounded-full border border-encre/55 px-8 py-3.5 text-[13px] font-normal tracking-[0.06em] text-encre transition-colors duration-300 hover:bg-encre hover:text-creme'
const CTA_INK =
  'inline-flex cursor-pointer items-center justify-center rounded-full border border-or/55 px-8 py-3.5 text-[13px] font-normal tracking-[0.06em] text-creme transition-colors duration-300 hover:bg-or hover:text-encre'

// Un chapitre d'offre — empilé, scroll classique (aucune animation au scroll).
// Grand numéro à gauche, tout le reste composé à droite : identité, promesse,
// description, détail, prix et appel à l'action.
function OfferChapter({ o, i, onContact }) {
  const ink = o.id === 'campagne'
  const band = ink ? '#1a1512' : i % 2 === 1 ? '#E6D8C1' : '#F4ECDF'
  const cTitle = ink ? 'text-creme' : 'text-encre'
  const cBody = ink ? 'text-sable/85' : 'text-encre/80'
  const cMuted = ink ? 'text-sable/70' : 'text-encre/70'
  const cFaint = ink ? 'text-sable/55' : 'text-encre/55'
  const cPromise = ink ? 'text-sable/92' : 'text-encre/90'
  const cAccent = ink ? 'text-or' : 'text-orfonce'
  const cSection = ink ? 'text-sable/70' : 'text-encre/70'
  const cRule = ink ? 'border-or/20' : 'border-orfonce/25'
  const cNum = ink ? 'text-creme' : 'text-encre'

  return (
    <div
      id={`detail-${o.id}`}
      className="scroll-mt-24 px-6 py-24 md:px-16 md:py-32"
      style={{ backgroundColor: band }}
    >
      <article className="mx-auto grid w-full max-w-[1180px] items-start gap-x-10 gap-y-8 lg:grid-cols-[minmax(0,13rem)_1fr] lg:gap-x-24">
        {/* Colonne gauche : le grand numéro, seul */}
        <span className={`block font-display text-[clamp(4.5rem,10vw,8.5rem)] font-light leading-[0.8] tabular-nums ${cNum}`}>
          {o.num}
        </span>

        {/* Colonne droite : tout le reste, bien composé */}
        <div className="min-w-0">
          <p className={`text-[11px] font-normal uppercase tracking-[0.3em] ${cAccent}`}>{o.label}</p>
          <h2 className={`mt-3 font-display text-[clamp(2.3rem,4.8vw,3.4rem)] font-light leading-[1.03] ${cTitle}`}>
            {o.name}
          </h2>
          <p className={`mt-5 max-w-[30ch] font-display text-[clamp(1.3rem,2.1vw,1.75rem)] font-light leading-[1.22] ${cPromise}`}>
            {o.promise}
          </p>
          <div className={`mt-7 max-w-[62ch] space-y-3 text-[16px] font-light leading-[1.75] ${cBody}`}>
            {o.description.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="mt-12 space-y-10 md:mt-14">
            {o.formats && (
              <section className={`border-t pt-8 ${cRule}`}>
                <h3 className={`text-[11px] font-normal uppercase tracking-[0.28em] ${cSection}`}>{o.formatsTitle}</h3>
                {/* Cartes verticales : on comprend qu'on choisit une formule.
                    Chacune porte son intitulé, son récit et son propre tarif —
                    les deux formules n'ont pas le même prix. */}
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {o.formats.map((f) => (
                    <div
                      key={f.title}
                      className="flex h-full flex-col rounded-xl border border-encre/12 bg-[#F4ECDF] p-7"
                    >
                      <h4 className="font-display text-[clamp(1.5rem,2vw,1.9rem)] font-light leading-[1.1] text-encre">
                        {f.title}
                      </h4>
                      <p className="mt-2.5 text-[14.5px] font-light leading-[1.45] text-encre/60">{f.sub}</p>
                      <div className="mt-4 flex-1 space-y-3 text-[14px] font-light leading-[1.7] text-encre/75">
                        {f.body.map((p) => (
                          <p key={p}>{p}</p>
                        ))}
                      </div>
                      <div className="mt-7 border-t border-encre/10 pt-5">
                        <p className="text-[11px] font-normal uppercase tracking-[0.22em] text-orfonce">
                          {f.closing}
                        </p>
                        {f.price && (
                          <p className="mt-2.5 font-display text-[clamp(1.25rem,1.8vw,1.55rem)] font-light leading-none tabular-nums text-encre">
                            {f.price}
                          </p>
                        )}
                        {f.priceNote && (
                          <p className="mt-2 text-[12.5px] font-light text-encre/70">{f.priceNote}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {o.receive && (
              <section className={`border-t pt-8 ${cRule}`}>
                <h3 className={`text-[11px] font-normal uppercase tracking-[0.28em] ${cSection}`}>{o.receiveTitle}</h3>
                <DashList items={o.receive} cols={2} ink={ink} className="mt-6" />
                {o.receiveNote && (
                  <div className={`mt-6 max-w-[70ch] space-y-2 text-[12.5px] font-light leading-[1.65] ${cMuted}`}>
                    {o.receiveNote.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                )}
              </section>
            )}

            <div
              className={`flex flex-col items-start gap-6 border-t pt-8 sm:flex-row sm:items-end ${
                o.price ? 'sm:justify-between' : ''
              } ${cRule}`}
            >
              {o.price && (
                <div>
                  <p className={`text-[10px] font-normal uppercase tracking-[0.22em] ${cFaint}`}>Tarif</p>
                  <p className={`mt-1.5 font-display text-[clamp(1.4rem,2.2vw,1.9rem)] font-light leading-none tabular-nums ${cTitle}`}>
                    {o.price}
                  </p>
                  {o.priceNote && <p className={`mt-2 text-[12.5px] font-light ${cMuted}`}>{o.priceNote}</p>}
                </div>
              )}
              <button type="button" onClick={() => onContact(o.name)} className={ink ? CTA_INK : CTA_LIGHT}>
                {o.cta}
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

// Les trois offres empilées, scroll classique. Un seul rôle en plus du rendu :
// basculer le header en clair quand la bande sombre (Campagne) passe dessous,
// puis revenir au clair.
function OffersExperience({ offers, onContact, setDark }) {
  useEffect(() => {
    const NAV = 90
    let raf = 0
    const check = () => {
      raf = 0
      const band = document.getElementById('detail-campagne')
      if (!band) {
        setDark?.(false)
        return
      }
      const r = band.getBoundingClientRect()
      setDark?.(r.top <= NAV && r.bottom > NAV)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check)
    }
    const scroller = document.querySelector('section[aria-label="Offres"]')
    scroller?.addEventListener('scroll', onScroll, { passive: true })
    check()
    return () => {
      scroller?.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [setDark])

  return offers.map((o, i) => <OfferChapter key={o.id} o={o} i={i} onContact={onContact} />)
}

export default function Offres({ setDark, onNavigate }) {
  const ref = useReveal(0.35)
  // Le film met un instant à démarrer : d'ici là, sa propre vignette tient
  // l'écran, avec le chargeur maison par-dessus. Plus de rectangle noir.
  const [heroReady, setHeroReady] = useState(false)
  const heroThumb = useVimeoThumb(HERO_FILM_ID)

  const goContact = (name) => onNavigate?.('contact', { offer: name })
  const scrollToDetail = (id) =>
    document.getElementById(`detail-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section
      ref={ref}
      aria-label="Offres"
      className="h-full overflow-y-auto"
      style={{ backgroundColor: BG }}
    >
      <h1 className="sr-only">Nos offres — Bel Augure</h1>

      {/* ══ Premier écran : titre + film, puis trois cartes condensées ══ */}
      <div className="mx-auto flex min-h-[calc(100dvh-7rem)] w-full max-w-[1180px] flex-col px-6 pt-28 md:px-16">
        {/* Haut : titre à gauche, film à droite */}
        <div className="reveal-up grid flex-1 items-center gap-10 lg:grid-cols-2 lg:gap-16" style={{ '--d': '0.08s' }}>
          <div>
            <p className="text-[11px] font-normal uppercase tracking-[0.32em] text-orfonce">Nos offres</p>
            <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(2rem,4.4vw,3.4rem)] font-light leading-[1.08] text-encre">
              Trois façons d’écrire votre histoire
            </h2>
            <p className="mt-6 max-w-[48ch] text-[16px] font-light leading-[1.7] text-encre/75">
              <span className="font-medium text-encre">Un film</span> pour en révéler l’essence,{' '}
              <span className="font-medium text-encre">des récits</span> pour en dévoiler les facettes,{' '}
              <span className="font-medium text-encre">une campagne</span> pour lui donner toute son ampleur.
            </p>
          </div>

          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-encre lg:rounded-3xl">
            {/* Écran d'attente : la vignette du film, puis le chargeur.
                Il s'efface en fondu quand la lecture démarre vraiment. */}
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 z-[1] transition-opacity duration-700 ${
                heroReady ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {heroThumb && (
                <img
                  src={heroThumb}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-55"
                />
              )}
              <VideoLoader />
            </div>
            <VimeoBackground
              id={HERO_FILM_ID}
              title="Film Bel Augure"
              onPlaying={() => setHeroReady(true)}
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>

        {/* Bas : trois cartes très condensées, cliquables — chacune mène à son
            chapitre détaillé plus bas. */}
        <div className="reveal-up grid gap-px pt-12 sm:grid-cols-3 md:pt-16" style={{ '--d': '0.16s' }}>
          {OFFERS.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => scrollToDetail(o.id)}
              aria-label={`Voir le détail de l’offre ${o.name}`}
              className={`group flex cursor-pointer flex-col items-center px-4 py-7 text-center transition-colors duration-300 hover:bg-encre/[0.04] sm:border-r sm:px-8 sm:last:border-r-0 ${RULE}`}
            >
              <p className="text-[10px] font-normal uppercase tracking-[0.24em] text-orfonce">{o.label}</p>
              <h3 className="mt-3 font-display text-[clamp(1.15rem,1.8vw,1.4rem)] font-light leading-[1.15] text-encre">
                {o.name}
              </h3>
              <p className="mt-2 max-w-[32ch] text-[14.5px] font-light leading-[1.5] text-encre/80">{o.cardPhrase}</p>
            </button>
          ))}
        </div>

        {/* Indicateur unique étendu sur toute la largeur : les filets de part et
            d'autre passent sous les trois cartes, si bien que la flèche (unique)
            se rapporte aux trois offres, pas seulement à celle du milieu. */}
        <div className="reveal-up pb-4 pt-10 md:pt-12" style={{ '--d': '0.22s' }}>
          <button
            type="button"
            onClick={() => scrollToDetail('film')}
            aria-label="Voir le détail des trois offres, plus bas"
            className="group flex w-full cursor-pointer flex-col items-center gap-3"
          >
            <span className="flex w-full items-center gap-5">
              <span className="h-px flex-1 bg-orfonce/25 transition-colors duration-300 group-hover:bg-orfonce/45" />
              <span className="whitespace-nowrap text-[10px] font-normal uppercase tracking-[0.24em] text-orfonce transition-colors duration-300 group-hover:text-encre">
                Le détail des trois offres
              </span>
              <span className="h-px flex-1 bg-orfonce/25 transition-colors duration-300 group-hover:bg-orfonce/45" />
            </span>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="text-orfonce transition-colors duration-300 group-hover:text-encre motion-safe:animate-bounce"
            >
              <path d="M12 5v14M6 13l6 6 6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* ══ Les trois offres, empilées (scroll classique) ══ */}
      <OffersExperience offers={OFFERS} onContact={goContact} setDark={setDark} />

      {/* ══ Bloc transverse : comment nous travaillons ══ */}
      <div className="mx-auto w-full max-w-[1180px] px-6 pb-16 md:px-16">
        <div className={`border-t pt-14 ${RULE}`}>
          <h2 className="text-[11px] font-normal uppercase tracking-[0.3em] text-encre/70">Comment nous travaillons</h2>
          <ol className="mt-8 grid gap-x-14 gap-y-9 sm:grid-cols-2">
            {PROCESS.map((step, i) => (
              <li key={step.t} className="flex items-start gap-4">
                <span className="font-display text-[13px] tabular-nums text-orfonce">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>
                  <span className="block font-display text-[16px] leading-[1.35] text-encre">{step.t}</span>
                  <span className="mt-1.5 block text-[13.5px] font-light leading-[1.7] text-encre/75">{step.d}</span>
                </span>
              </li>
            ))}
          </ol>

          <div className={`mt-12 border-t pt-8 text-center ${RULE}`}>
            <h3 className="font-display text-[16px] leading-[1.4] text-encre">{DIFFUSION.title}</h3>
            <p className="mx-auto mt-3 max-w-[70ch] text-[14px] font-light leading-[1.85] text-encre/80">{DIFFUSION.body}</p>
          </div>
        </div>
      </div>

      {/* Signature et accès légaux, communs à toutes les pages. */}
      <SiteFooter onNavigate={onNavigate} className="px-6 pb-28 md:px-16 lg:pb-20" />
    </section>
  )
}
