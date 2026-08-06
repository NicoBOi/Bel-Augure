import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { useReveal } from '../hooks/useReveal.js'
import VimeoBackground from '../components/VimeoBackground.jsx'

gsap.registerPlugin(ScrollToPlugin)

// Page /offres — direction éditoriale « montrer puis expliquer ».
// Premier écran en deux temps : à gauche le titre, à droite le film ; en bas
// trois cartes très condensées (nom, phrase, prix, Découvrir). Puis trois
// chapitres, chacun une vraie séquence : promesse courte, quatre éléments
// compris au plus, prix, appel à l'action, et le détail technique (droits,
// cadre, extensions) replié dans un accordéon. Palette unique : les offres se
// distinguent par la composition et — à terme — par un grand plan de film,
// pas par trois univers colorés.
const HERO_FILM_ID = '1211391558'

const OFFERS = [
  {
    id: 'film',
    num: '01',
    name: 'Film Signature',
    label: 'Un film central',
    cardPhrase: 'Devenez le premier choix avant même la première visite.',
    price: 'À partir de 5 500 € HT',
    promise: 'Faites ressentir ce qui vous distingue.',
    usage: 'Pour une ouverture, un repositionnement ou un nouveau souffle.',
    description: [
      'Nous partons de votre vision, de vos gestes, de vos produits ou de votre lieu pour créer le film central de votre communication. Une pièce forte, entièrement pensée pour vous, conçue pour porter durablement votre image.',
    ],
    receiveTitle: 'Ce que vous recevez',
    receive: [
      'Un film de marque sur mesure, de 60 à 90 secondes',
      'Ses versions courtes de 30 et 15 secondes pour vos réseaux',
      'Une musique choisie pour votre film',
      'De l’écriture au montage, tout est pris en charge',
    ],
    cadre: [
      'Première version deux semaines après le tournage',
      'Deux séries de retours incluses',
      'Droits d’utilisation : deux ans, en France, web et réseaux',
      'Un suivi assuré directement par les deux fondateurs',
    ],
    extensionsTitle: 'En option',
    extensions: [
      'Déclinaisons verticales, voix off ou musique originale',
      'Images aériennes',
      'Journée de tournage supplémentaire',
      'Diffusion TV, cinéma, affichage ou à l’international',
      'Durée d’utilisation étendue',
    ],
    cta: 'Prendre rendez-vous',
  },
  {
    id: 'histoires',
    num: '02',
    name: 'Histoires de marque',
    label: 'Des récits ciblés',
    cardPhrase: 'Mettez en lumière chacune de vos expériences pour donner envie de venir (et de revenir).',
    price: 'À partir de 3 500 € HT',
    priceNote: 'pour une histoire',
    promise: 'Des films courts qui révèlent, un à un, ce qui vous distingue.',
    usage: 'Pour une communication régulière, plusieurs sujets à valoriser.',
    description: [
      'Vos gestes, vos lieux, vos savoir-faire, celles et ceux qui les incarnent : chaque histoire en isole un et lui donne toute la place, dans une écriture qui prolonge votre identité au fil de la saison.',
    ],
    formatsTitle: 'Trois formats au choix',
    formats: [
      {
        label: 'Une histoire',
        price: 'À partir de 3 500 € HT',
        desc: 'Un film autonome consacré à un sujet précis.',
        usage: 'Pour mettre en lumière une expérience, un produit, une personne ou un savoir-faire.',
      },
      {
        label: 'Une collection',
        tag: 'Format conseillé',
        price: 'À partir de 8 500 € HT',
        desc: 'Trois histoires imaginées et tournées ensemble autour de plusieurs facettes de la marque.',
        usage: 'Pour construire une prise de parole cohérente tout en optimisant la production.',
      },
      {
        label: 'Un partenariat saisonnier',
        price: 'À partir de 3 000 € HT / mois · engagement de trois mois',
        desc: 'Une nouvelle collection planifiée sur trois mois, avec des livraisons progressives.',
        usage: 'Engagement d’une saison, renouvelable d’un commun accord.',
      },
    ],
    receiveTitle: 'Ce que vous recevez',
    receive: [
      'Un format principal et une adaptation verticale ou horizontale',
      'Un à deux extraits courts par histoire',
      'Musique et postproduction incluses',
    ],
    cadre: [
      'Tournages groupés, une à deux journées par vague',
      'Deux séries de retours par vague',
      'Droits d’utilisation : deux ans à compter de chaque livraison',
      'Casting, stylisme et décors en supplément selon les besoins',
    ],
    cta: 'Prendre rendez-vous',
  },
  {
    id: 'campagne',
    num: '03',
    name: 'Campagne Sensorielle',
    label: 'Un dispositif complet',
    cardPhrase: 'Créez l’engouement autour de votre prochaine ouverture ou de votre prochain lancement.',
    price: 'À partir de 15 000 € HT',
    promise: 'Donnez à votre prochain temps fort toute son ampleur.',
    usage: 'Pour un temps fort à fort enjeu.',
    description: [
      'Pour une ouverture, un lancement ou une nouvelle identité, nous imaginons l’idée qui donnera sa cohérence à toute votre prise de parole.',
      'Elle prend vie dans un film principal, plusieurs films courts et les formats conçus pour vos différents supports. Chaque création a son propre rôle : annoncer, révéler ou prolonger le lancement. Ensemble, elles forment une campagne immédiatement reconnaissable.',
    ],
    receiveTitle: 'Ce que vous recevez',
    receive: [
      'Une idée directrice et une direction créative commune',
      'Un film principal de 60 à 90 secondes',
      'Trois films courts minimum, de 15 à 30 secondes',
      'Les formats adaptés à vos différents supports',
      'De l’idée à la livraison, tout est pris en charge',
      'Musique incluse',
    ],
    receiveNote: [
      'Les films courts sont de vraies pièces à part entière, pas de simples extraits du film principal.',
    ],
    rhythm: {
      title: 'Photographie de campagne — en option',
      body: [
        'Une série photographique, dans la même direction artistique, peut être réalisée pendant le tournage avec un photographe partenaire.',
      ],
    },
    cadre: [
      'Un calendrier construit sur votre date de lancement',
      'Environ huit à dix semaines, de la validation à la livraison',
      'Deux séries de retours incluses',
      'Un suivi assuré directement par les deux fondateurs',
      'Droits d’utilisation : deux ans, France, web et campagnes sponsorisées',
    ],
    note: 'Chaque campagne fait l’objet d’une proposition dédiée.',
    cta: 'Écrire au studio',
  },
]

// Bloc transverse (bas de page) — commun aux trois offres.
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

// Révélation au scroll : quand l'élément entre dans le viewport, on lui ajoute
// `is-visible` et son contenu `.reveal-up` s'anime (fondu + léger glissement).
// Mouvement réduit : révélé immédiatement, sans animation.
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-visible')
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('is-visible')
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={className}>
      <div className="reveal-up" style={{ '--d': `${delay}ms` }}>
        {children}
      </div>
    </div>
  )
}

// Un chapitre d'offre. Tout se dévoile au scroll : le grand numéro d'abord, puis
// l'identité et la promesse, la description, et chaque bloc d'info apparaît au
// fur et à mesure qu'on descend. Vertical, structuré, sans fioriture.
function OfferChapter({ o, i, onContact }) {
  const ink = o.id === 'campagne'
  const band = ink ? '#1a1512' : i % 2 === 1 ? '#E6D8C1' : '#F4ECDF'
  const cTitle = ink ? 'text-creme' : 'text-encre'
  const cBody = ink ? 'text-sable/85' : 'text-encre/80'
  const cMuted = ink ? 'text-sable/70' : 'text-encre/70'
  const cFaint = ink ? 'text-sable/55' : 'text-encre/55'
  const cPromise = ink ? 'text-sable/90' : 'text-encre/90'
  const cAccent = ink ? 'text-or' : 'text-orfonce'
  const cSection = ink ? 'text-sable/70' : 'text-encre/70'
  const cNum = ink ? 'text-creme/20' : 'text-encre/20'
  const cRule = ink ? 'border-or/20' : 'border-orfonce/25'

  return (
    <div
      id={`detail-${o.id}`}
      className="scroll-mt-24 px-6 py-24 md:px-16 md:py-32"
      style={{ backgroundColor: band }}
    >
      <article className="mx-auto w-full max-w-[1180px]">
        {/* En-tête : le grand numéro se révèle, puis l'identité et la description */}
        <div className="flex items-start gap-6 sm:gap-10">
          <Reveal className="shrink-0">
            <span className={`block font-display text-[clamp(3rem,9vw,6.5rem)] font-light leading-[0.75] tabular-nums ${cNum}`}>
              {o.num}
            </span>
          </Reveal>
          <div className="min-w-0 flex-1">
            <div className="grid gap-x-16 gap-y-8 lg:grid-cols-2 lg:items-center">
              <Reveal delay={90} className="max-w-[46ch] pt-1">
                <p className={`text-[11px] font-normal uppercase tracking-[0.28em] ${cAccent}`}>{o.label}</p>
                <h2 className={`mt-2 font-display text-[clamp(2.1rem,4.6vw,3.2rem)] font-light leading-[1.02] ${cTitle}`}>
                  {o.name}
                </h2>
                <p className={`mt-4 text-[clamp(1.2rem,2vw,1.6rem)] font-light leading-[1.2] ${cPromise}`}>{o.promise}</p>
              </Reveal>
              {o.description && (
                <Reveal delay={180}>
                  <p className={`max-w-[56ch] text-[16px] font-light leading-[1.75] lg:pt-2 ${cBody}`}>
                    {o.description.join(' ')}
                  </p>
                </Reveal>
              )}
            </div>
          </div>
        </div>

        {/* Détail : chaque bloc apparaît en descendant */}
        <div className="mt-16 space-y-12 md:mt-20">
          {o.formats && (
            <Reveal>
              <section className={`border-t pt-9 ${cRule}`}>
                <h3 className={`text-[11px] font-normal uppercase tracking-[0.28em] ${cSection}`}>{o.formatsTitle}</h3>
                <div className="mt-7 grid gap-x-10 gap-y-7 sm:grid-cols-3">
                  {o.formats.map((f) => (
                    <div
                      key={f.label}
                      className={`flex flex-col rounded-lg border p-5 ${f.tag ? 'border-orfonce/50 bg-black/[0.02]' : 'border-encre/12'}`}
                    >
                      <div className="flex min-h-[1.2em] items-baseline">
                        {f.tag && <span className="text-[9.5px] font-normal uppercase tracking-[0.2em] text-orfonce">{f.tag}</span>}
                      </div>
                      <span className="mt-1 font-display text-[clamp(1.2rem,1.7vw,1.45rem)] font-light leading-[1.1] text-encre">
                        {f.label}
                      </span>
                      <p className="mt-3 flex-1 text-[14px] font-light leading-[1.55] text-encre/80">{f.desc}</p>
                      <p className="mt-4 text-[15px] font-normal tabular-nums text-encre">{f.price}</p>
                      <p className="mt-1 text-[12px] font-light leading-[1.5] text-encre/65">{f.usage}</p>
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>
          )}

          {o.receive && (
            <Reveal>
              <section className={`border-t pt-9 ${cRule}`}>
                <h3 className={`text-[11px] font-normal uppercase tracking-[0.28em] ${cSection}`}>{o.receiveTitle}</h3>
                <DashList items={o.receive} cols={2} ink={ink} className="mt-6" />
                {o.receiveNote && (
                  <div className={`mt-6 max-w-[72ch] space-y-2 text-[12.5px] font-light leading-[1.65] ${cMuted}`}>
                    {o.receiveNote.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                )}
              </section>
            </Reveal>
          )}

          {o.rhythm && (
            <Reveal>
              <section className={`border-t pt-9 ${cRule}`}>
                <h3 className={`text-[11px] font-normal uppercase tracking-[0.28em] ${cSection}`}>{o.rhythm.title}</h3>
                <div className={`mt-5 max-w-[72ch] space-y-3 text-[15px] font-light leading-[1.75] ${cBody}`}>
                  {o.rhythm.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            </Reveal>
          )}

          {o.cadre && (
            <Reveal>
              <section className={`border-t pt-9 ${cRule}`}>
                <h3 className={`text-[11px] font-normal uppercase tracking-[0.28em] ${cSection}`}>Délais, retours et droits</h3>
                <DashList items={o.cadre} cols={2} muted ink={ink} className="mt-6" />
              </section>
            </Reveal>
          )}

          {o.extensions && (
            <Reveal>
              <section className={`border-t pt-9 ${cRule}`}>
                <h3 className={`text-[11px] font-normal uppercase tracking-[0.28em] ${cSection}`}>{o.extensionsTitle}</h3>
                <DashList items={o.extensions} cols={2} muted ink={ink} className="mt-6" />
              </section>
            </Reveal>
          )}

          <Reveal>
            <div className={`flex flex-col items-start gap-6 border-t pt-9 sm:flex-row sm:items-end sm:justify-between ${cRule}`}>
              <div>
                <p className={`text-[10px] font-normal uppercase tracking-[0.22em] ${cFaint}`}>Tarif</p>
                <p className={`mt-1.5 font-display text-[clamp(1.4rem,2.2vw,1.9rem)] font-light tabular-nums leading-none ${cTitle}`}>
                  {o.price}
                </p>
                {o.priceNote && <p className={`mt-2 text-[12.5px] font-light ${cMuted}`}>{o.priceNote}</p>}
              </div>
              <button type="button" onClick={() => onContact(o.name)} className={ink ? CTA_INK : CTA_LIGHT}>
                {o.cta}
              </button>
            </div>
          </Reveal>
        </div>
      </article>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// Offres épinglées « pas à pas » (bureau) — une seule scène `position: sticky`
// (100svh) reste fixée pendant qu'on traverse les trois offres, posées en
// absolute. L'épingle est native (pas de `pin` GSAP → pas de tremblement) et le
// scroll est verrouillé pendant la séquence : chaque geste de scroll déroule
// UNE offre entière d'un coup (le numéro monumental → réduction vers son repère
// → promesse au masque → panneau au clip-path → précisions → CTA), puis un
// indicateur invite à continuer. La timeline est en pause et jouée d'un repère
// au suivant (tweenTo), jamais scrubbée. transform / opacity / clip-path.
// ══════════════════════════════════════════════════════════════════════════

// Une ligne révélée au masque : le texte part caché sous un conteneur
// overflow-hidden et remonte (yPercent), piloté par GSAP. Net et éditorial.
function MaskLine({ children, className = '' }) {
  return (
    <span className="block overflow-hidden pb-[0.09em]">
      <span data-line className={`block ${className}`}>
        {children}
      </span>
    </span>
  )
}

// Un chapitre de la version épinglée. Le numéro n'est plus ici : c'est le
// compteur partagé (voir OffersExperience) qui l'incarne pour toute la
// séquence. Chaque offre pose sa composition en deux colonnes — la promesse à
// gauche (révélée au masque), le panneau de détail à droite (ouvert au
// clip-path) — puis le pied (prix + CTA). Les attributs data-* sont les prises
// de la timeline ; GSAP pose les états initiaux avant la première peinture.
function EnhancedChapter({ o, i, onContact }) {
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
  const panelTint = ink ? 'rgba(255,255,255,0.045)' : 'rgba(26,21,18,0.035)'
  const ruleColor = ink ? 'bg-or/35' : 'bg-orfonce/40'

  return (
    <div data-chapter={i} data-ink={ink ? '1' : '0'} className="absolute inset-0">
      <div data-bg className="absolute inset-0" style={{ backgroundColor: band }} />
      <div className="pointer-events-none absolute inset-0">
        <div
          data-content
          className="mx-auto flex h-full w-full max-w-[1180px] flex-col justify-center px-6 pb-10 pt-28 md:px-16"
        >
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[1.05fr_1fr] lg:items-center">
            {/* Colonne gauche : la promesse, révélée au masque. Marge à gauche
                pour laisser le compteur partagé vivre dans la gouttière. */}
            <div className="lg:pl-[clamp(3.5rem,8vw,7rem)]">
              <MaskLine className={`text-[11px] font-normal uppercase tracking-[0.3em] ${cAccent}`}>
                {o.label}
              </MaskLine>
              <h2 className={`mt-4 font-display text-[clamp(2.4rem,4.9vw,3.5rem)] font-light leading-[1.02] ${cTitle}`}>
                <MaskLine>{o.name}</MaskLine>
              </h2>
              <p className={`mt-5 max-w-[24ch] font-display text-[clamp(1.3rem,2.1vw,1.75rem)] font-light leading-[1.2] ${cPromise}`}>
                <MaskLine>{o.promise}</MaskLine>
              </p>
              <div data-desc className={`mt-7 max-w-[46ch] space-y-3 text-[15px] font-light leading-[1.75] ${cBody}`}>
                {o.description.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>

            {/* Colonne droite : le panneau de détail qui s'ouvre au clip-path. */}
            <div
              data-panel
              className="relative overflow-hidden rounded-[3px]"
              style={{ backgroundColor: panelTint }}
            >
              <div data-panel-inner className="px-6 py-7 md:px-8 md:py-8">
                <div data-rule className={`h-px w-full origin-left ${ruleColor}`} />
                <h3 className={`mt-6 text-[11px] font-normal uppercase tracking-[0.28em] ${cSection}`}>
                  {o.formats ? o.formatsTitle : o.receiveTitle}
                </h3>
                {o.formats ? (
                  <ul className={`mt-4 divide-y ${ink ? 'divide-or/15' : 'divide-encre/12'}`}>
                    {o.formats.map((f) => (
                      <li data-detail key={f.label} className="flex items-baseline justify-between gap-6 py-3">
                        <span className={`min-w-0 flex-1 font-display text-[16px] font-light ${cTitle}`}>
                          {f.label}
                          {f.tag && (
                            <span className="ml-2 align-middle text-[9px] uppercase tracking-[0.2em] text-orfonce">
                              {f.tag}
                            </span>
                          )}
                        </span>
                        <span className={`w-[38%] shrink-0 text-right text-[13px] font-normal leading-[1.4] tabular-nums ${cMuted}`}>
                          {f.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="mt-5 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                    {o.receive.map((it) => (
                      <li
                        data-detail
                        key={it}
                        className={`flex items-start gap-3.5 text-[14.5px] font-light leading-[1.5] ${ink ? 'text-sable/90' : 'text-encre/85'}`}
                      >
                        <span aria-hidden="true" className={`mt-[0.6em] h-px w-4 shrink-0 ${ink ? 'bg-or/60' : 'bg-orfonce/70'}`} />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Pied : prix + appel à l'action (le CTA arrive en dernier). */}
          <div
            data-footer
            className={`mt-9 flex flex-col items-start gap-5 border-t pt-6 sm:flex-row sm:items-end sm:justify-between ${cRule}`}
          >
            <div>
              <p className={`text-[10px] font-normal uppercase tracking-[0.22em] ${cFaint}`}>Tarif</p>
              <p className={`mt-1.5 font-display text-[clamp(1.4rem,2.2vw,1.9rem)] font-light leading-none tabular-nums ${cTitle}`}>
                {o.price}
              </p>
              {o.priceNote && <p className={`mt-2 text-[12.5px] font-light ${cMuted}`}>{o.priceNote}</p>}
            </div>
            <button
              data-cta
              type="button"
              onClick={() => onContact(o.name)}
              className={`pointer-events-auto ${ink ? CTA_INK : CTA_LIGHT}`}
            >
              {o.cta}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Construit la timeline (EN PAUSE, non scrubbée) et pose des repères de lecture.
// Elle n'est PAS liée à la progression du scroll : chaque offre se déroule d'un
// seul geste (voir le « stepper » dans OffersExperience), en jouant d'un repère
// au suivant. La scène est épinglée nativement (`position: sticky`) et le scroll
// est verrouillé pendant la séquence.
//
// Repères : s0 = affiche (numéro monumental) ; s1 = offre 0 lisible ; s2 = offre
// 1 lisible ; s3 = offre 2 lisible. Un geste de scroll = un segment joué.
// Déroulé d'un segment : le numéro rétrécit et rejoint son repère → la promesse
// se révèle au masque → le panneau s'ouvre (clip-path) → la ligne se déploie,
// les précisions puis le CTA ; à l'offre suivante le contenu est repris au
// masque et le compteur roule vers le numéro suivant.
function buildOffersTimeline(scene) {
  const chapters = Array.from(scene.querySelectorAll('[data-chapter]'))
  const N = chapters.length
  const counter = scene.querySelector('[data-counter]')
  const strip = scene.querySelector('[data-counter-strip]')

  // Transform « monumental » du compteur : sa boîte naturelle (échelle 1)
  // ramenée au centre de la scène. Réévalué via valeurs-fonctions (invalidate
  // au redimensionnement).
  const centered = () => {
    const saved = counter.style.transform
    counter.style.transform = 'none'
    const r = counter.getBoundingClientRect()
    const s = scene.getBoundingClientRect()
    counter.style.transform = saved
    // Le chiffre repose bas dans sa boîte de ligne : on remonte de ~0.14em
    // (fraction de la hauteur) pour centrer le glyphe, pas la boîte.
    return {
      x: s.left + s.width / 2 - (r.left + r.width / 2),
      y: s.top + s.height / 2 - (r.top + r.height / 2) - r.height * 0.14,
    }
  }
  const MARK = 0.15 // échelle du repère (numéro réduit)
  const inkColor = (el) => (el.dataset.ink === '1' ? '#F3E9DA' : '#1a1512')

  const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } })

  // ── Compteur partagé — état de départ : monumental, sur l'offre 1 ──
  gsap.set(counter, {
    transformOrigin: 'left top',
    color: inkColor(chapters[0]),
    x: () => centered().x,
    y: () => centered().y,
    scale: 1,
  })
  gsap.set(strip, { yPercent: 0 })

  chapters.forEach((ch, i) => {
    const b = i
    const isLast = i === N - 1
    const bg = ch.querySelector('[data-bg]')
    const content = ch.querySelector('[data-content]')
    const lines = ch.querySelectorAll('[data-line]')
    const desc = ch.querySelector('[data-desc]')
    const panel = ch.querySelector('[data-panel]')
    const panelInner = ch.querySelector('[data-panel-inner]')
    const rule = ch.querySelector('[data-rule]')
    const details = ch.querySelectorAll('[data-detail]')
    const footer = ch.querySelector('[data-footer]')
    const cta = ch.querySelector('[data-cta]')

    // États initiaux (posés avant peinture) — transform/opacity/clip uniquement
    gsap.set(bg, { autoAlpha: i === 0 ? 1 : 0 })
    gsap.set(content, { clipPath: 'inset(0% 0% 0% 0%)' })
    gsap.set(lines, { yPercent: 115 })
    gsap.set([desc, footer, cta], { autoAlpha: 0, y: 20 })
    gsap.set(panel, { clipPath: 'inset(50% 0% 50% 0%)' })
    gsap.set(panelInner, { scale: 1.06, transformOrigin: '50% 50%' })
    gsap.set(rule, { scaleX: 0 })
    gsap.set(details, { autoAlpha: 0, y: 16 })

    // Le fond en fondu croisé (l'offre 0 est déjà là). Anticipé pour que le
    // prochain univers commence à poindre avant la disparition du précédent.
    if (i !== 0) tl.to(bg, { autoAlpha: 1, duration: 0.16, ease: 'none' }, Math.max(0, b - 0.1))

    // ── Le numéro rétrécit vers son repère (15–35 %) ──
    tl.to(counter, { x: 0, y: 0, scale: MARK, duration: 0.2, ease: 'power2.inOut' }, b + 0.15)

    // ── Tableau 3 — la promesse se révèle au masque (28–48 %) ──
    tl.to(lines, { yPercent: 0, duration: 0.16, ease: 'power3.out', stagger: 0.06 }, b + 0.28)
    tl.to(desc, { autoAlpha: 1, y: 0, duration: 0.16 }, b + 0.42)

    // ── Tableau 4 — le panneau s'ouvre au clip-path (40–65 %) ──
    tl.to(panel, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.22, ease: 'power2.inOut' }, b + 0.4)
    tl.to(panelInner, { scale: 1, duration: 0.26, ease: 'power2.out' }, b + 0.4)

    // ── Tableau 5 — la ligne se déploie, les précisions, puis le CTA (50–75 %) ──
    tl.to(rule, { scaleX: 1, duration: 0.16, ease: 'power2.inOut' }, b + 0.5)
    tl.to(details, { autoAlpha: 1, y: 0, duration: 0.14, stagger: 0.05 }, b + 0.55)
    tl.to(footer, { autoAlpha: 1, y: 0, duration: 0.12 }, b + 0.62)
    tl.to(cta, { autoAlpha: 1, y: 0, duration: 0.12 }, b + 0.69)

    // 75–88 % : composition complète maintenue (aucune animation)

    // ── Tableau 6 — transition continue vers l'offre suivante (88–100 %) ──
    if (!isLast) {
      // Le contenu est repris par un masque (clip vers le haut)
      tl.to(content, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.12, ease: 'power2.in' }, b + 0.88)
      tl.to(bg, { autoAlpha: 0, duration: 0.16, ease: 'none' }, b + 0.9)
      // Le compteur grandit à nouveau et roule vers le numéro suivant
      tl.to(counter, { x: () => centered().x, y: () => centered().y, scale: 1, duration: 0.12, ease: 'power2.inOut' }, b + 0.88)
      tl.to(strip, { yPercent: -(100 / N) * (i + 1), duration: 0.12, ease: 'power2.inOut' }, b + 0.88)
      // La couleur du numéro suit l'univers de l'offre suivante (crème si sombre)
      if (inkColor(chapters[i + 1]) !== inkColor(ch)) {
        tl.to(counter, { color: inkColor(chapters[i + 1]), duration: 0.12, ease: 'none' }, b + 0.9)
      }
    }
  })

  // Verrouille la durée totale à N puis pose les repères de lecture : s0 =
  // affiche (numéro monumental, rien de dévoilé) ; s(i+1) = offre i lisible.
  tl.to({}, { duration: 0.001 }, N)
  tl.addLabel('s0', 0)
  chapters.forEach((_, i) => tl.addLabel('s' + (i + 1), i + 0.85))

  return tl
}

// Choisit la mise en scène et gère le thème sombre du header.
// - Bureau, écran assez grand, mouvement non réduit → scrollytelling épinglé.
// - Sinon (mobile, écran court, prefers-reduced-motion) → repli : les chapitres
//   classiques, dévoilés au scroll, où tout le détail reste présent.
function OffersExperience({ offers, onContact, setDark }) {
  const [enhanced, setEnhanced] = useState(false)
  const sceneRef = useRef(null)
  const trackRef = useRef(null)

  // Mode d'affichage — recalculé au redimensionnement et au changement de
  // préférence de mouvement. Épinglé seulement si la fenêtre est confortable.
  useEffect(() => {
    const mqW = window.matchMedia('(min-width: 1024px)')
    const mqH = window.matchMedia('(min-height: 720px)')
    const mqR = window.matchMedia('(prefers-reduced-motion: reduce)')
    const compute = () => setEnhanced(mqW.matches && mqH.matches && !mqR.matches)
    compute()
    mqW.addEventListener('change', compute)
    mqH.addEventListener('change', compute)
    mqR.addEventListener('change', compute)
    return () => {
      mqW.removeEventListener('change', compute)
      mqH.removeEventListener('change', compute)
      mqR.removeEventListener('change', compute)
    }
  }, [])

  // Repli : le header bascule en clair quand la bande sombre (Campagne) passe
  // sous lui, puis revient au clair. (Même logique qu'avant, ici quand la
  // version épinglée n'est pas active.)
  useEffect(() => {
    if (enhanced) return
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
  }, [enhanced, setDark])

  // Version épinglée « pas à pas ». L'épingle est NATIVE (`position: sticky`) et
  // le scroll est verrouillé pendant la séquence : un geste (molette, doigt,
  // clavier) = une offre entière qui se déroule d'un coup, du numéro à tout le
  // reste. Entre chaque, un indicateur invite à continuer. Aucun scrub : la
  // timeline (en pause) est jouée d'un repère au suivant (tweenTo).
  useLayoutEffect(() => {
    if (!enhanced) return
    const scene = sceneRef.current
    const track = trackRef.current
    const scroller = document.querySelector('section[aria-label="Offres"]')
    if (!scene || !track || !scroller) return

    const N = offers.length
    const hint = scene.querySelector('[data-hint]')
    let tl
    const ctx = gsap.context(() => {
      tl = buildOffersTimeline(scene)
    }, scene)
    gsap.set(hint, { autoAlpha: 0 })

    // Thème sombre du header : lu sur l'état réel de la bande Campagne (opacité
    // animée + position sous le header), évalué au ticker et remonté uniquement
    // au changement. Couvre le déroulé animé comme la sortie vers le bas de page.
    const inkBg = scene.querySelector('[data-chapter][data-ink="1"] [data-bg]')
    let darkOn = false
    const tickDark = () => {
      if (!inkBg) return
      const r = inkBg.getBoundingClientRect()
      let d = false
      if (r.top <= 90 && r.bottom > 90) d = parseFloat(getComputedStyle(inkBg).opacity || '0') > 0.5
      if (d !== darkOn) {
        darkOn = d
        setDark?.(d)
        gsap.set(hint, { color: d ? '#F3E9DA' : '#1a1512' })
      }
    }
    gsap.ticker.add(tickDark)

    // ── État du « stepper » ──
    let step = 0 // 0 = affiche (numéro), 1..N = offre lisible
    let engaged = false
    let animating = false
    let cooldown = false
    let lastY = scroller.scrollTop
    let exitTween = null

    const pinStart = () => track.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop
    const pinRange = () => scroller.clientHeight * 0.5 // trackH(1.5·écran) − scène(1·écran)
    const lock = () => {
      const s = pinStart()
      if (Math.abs(scroller.scrollTop - s) > 0.5) scroller.scrollTop = s
    }
    const showHint = (v) => gsap.to(hint, { autoAlpha: v ? 1 : 0, y: v ? 0 : 8, duration: v ? 0.45 : 0.15, ease: 'power2.out' })

    const gotoStep = (s) => {
      step = s
      animating = true
      showHint(false)
      tl.tweenTo('s' + s, {
        duration: 1.25,
        ease: 'power2.inOut',
        onComplete: () => {
          animating = false
          cooldown = true
          window.setTimeout(() => {
            cooldown = false
          }, 260)
          showHint(true)
        },
      })
    }

    const disengage = (dir) => {
      engaged = false
      animating = false
      cooldown = true
      showHint(false)
      const trackH = scroller.clientHeight * 1.5
      const to = dir > 0 ? pinStart() + trackH - 4 : pinStart() - scroller.clientHeight * 0.75
      exitTween = gsap.to(scroller, {
        scrollTo: { y: Math.max(0, to) },
        duration: 0.75,
        ease: 'power2.inOut',
        onComplete: () => {
          cooldown = false
        },
      })
    }

    const advance = (dir) => {
      if (!engaged || animating || cooldown) return
      if (dir > 0) step < N ? gotoStep(step + 1) : disengage(1)
      else step > 0 ? gotoStep(step - 1) : disengage(-1)
    }

    const engage = (fromBelow) => {
      if (engaged) return
      engaged = true
      step = fromBelow ? N : 0
      tl.seek('s' + step).pause()
      lock()
      showHint(true)
      // Court répit : l'élan (molette/pavé) qui a amené dans la zone ne doit pas
      // enchaîner tout de suite — on se pose d'abord sur le numéro / l'offre.
      cooldown = true
      window.setTimeout(() => {
        cooldown = false
      }, 320)
    }

    // Engagement : quand le scroll natif (intro / bas de page) entre dans la
    // zone épinglée, on prend la main.
    const onScroll = () => {
      const y = scroller.scrollTop
      if (!engaged && !cooldown) {
        const s = pinStart()
        if (y >= s - 4 && y <= s + pinRange()) engage(y < lastY)
      }
      lastY = y
    }
    scroller.addEventListener('scroll', onScroll, { passive: true })

    const onWheel = (e) => {
      if (!engaged) return
      e.preventDefault()
      lock()
      if (Math.abs(e.deltaY) < 4) return
      advance(e.deltaY > 0 ? 1 : -1)
    }
    scroller.addEventListener('wheel', onWheel, { passive: false })

    let touchY = null
    const onTouchStart = (e) => {
      if (engaged) touchY = e.touches[0].clientY
    }
    const onTouchMove = (e) => {
      if (!engaged) return
      e.preventDefault()
      lock()
      if (touchY === null) return
      const dy = touchY - e.touches[0].clientY
      if (Math.abs(dy) > 26) {
        advance(dy > 0 ? 1 : -1)
        touchY = null
      }
    }
    scroller.addEventListener('touchstart', onTouchStart, { passive: true })
    scroller.addEventListener('touchmove', onTouchMove, { passive: false })

    // Clavier (accessibilité, puisque le scroll est capté)
    const onKey = (e) => {
      if (!engaged) return
      if (['ArrowDown', 'PageDown', ' ', 'Spacebar'].includes(e.key)) {
        e.preventDefault()
        advance(1)
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault()
        advance(-1)
      }
    }
    window.addEventListener('keydown', onKey)

    // Redimensionnement : on ré-évalue les mesures (centre du compteur) et on
    // repose l'état courant. Jamais pendant le scroll.
    let rz
    const onResize = () => {
      window.clearTimeout(rz)
      rz = window.setTimeout(() => {
        tl.invalidate().seek('s' + step).pause()
        if (engaged) lock()
      }, 160)
    }
    window.addEventListener('resize', onResize)

    return () => {
      scroller.removeEventListener('scroll', onScroll)
      scroller.removeEventListener('wheel', onWheel)
      scroller.removeEventListener('touchstart', onTouchStart)
      scroller.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      window.clearTimeout(rz)
      exitTween && exitTween.kill()
      gsap.ticker.remove(tickDark)
      ctx.revert()
      setDark?.(false)
    }
  }, [enhanced, offers, setDark])

  if (!enhanced) {
    return offers.map((o, i) => <OfferChapter key={o.id} o={o} i={i} onContact={onContact} />)
  }

  // Un seul conteneur épinglé (la scène `sticky`, 100svh, offres en absolute).
  // La piste dépasse la scène d'une demi-hauteur d'écran : assez pour que
  // `sticky` accroche, le reste du parcours étant piloté au geste (scroll
  // verrouillé), pas à la position.
  return (
    <div className="w-full">
      <div ref={trackRef} id="detail-film" className="relative w-full" style={{ height: 'calc(100svh * 1.5)' }}>
        <div
          ref={sceneRef}
          className="sticky top-0 h-[100svh] w-full overflow-hidden"
          style={{ backgroundColor: BG }}
        >
          {offers.map((o, i) => (
            <EnhancedChapter key={o.id} o={o} i={i} onContact={onContact} />
          ))}

          {/* Compteur éditorial partagé : un seul numéro pour toute la séquence,
              monumental puis repère, qui roule 01 → 02 → 03 aux transitions.
              Taille CSS fixe : seule l'échelle (scale) est animée. */}
          <div className="pointer-events-none absolute inset-0 z-20">
            <div className="relative mx-auto h-full w-full max-w-[1180px]">
              <div
                data-counter
                aria-hidden="true"
                className="absolute left-6 top-[27vh] font-display font-light leading-[1] tabular-nums md:left-16"
                style={{ fontSize: '62vh', willChange: 'transform' }}
              >
                <div className="overflow-hidden" style={{ height: '1em' }}>
                  <div data-counter-strip>
                    {offers.map((o) => (
                      <div key={o.id} className="leading-[1]">
                        {o.num}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Indicateur : « faites défiler » pour passer à l'offre suivante.
              Masqué pendant l'animation, réaffiché quand l'offre est posée. */}
          <div
            data-hint
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-[5vh] z-30 flex justify-center"
            style={{ color: '#1a1512' }}
          >
            <span className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-normal uppercase tracking-[0.28em] opacity-70">Faites défiler</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="motion-safe:animate-bounce"
              >
                <path d="M12 5v14M6 13l6 6 6-6" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Offres({ setDark, onNavigate }) {
  const ref = useReveal(0.35)

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

      {/* ══ Premier écran : titre + film, puis trois cartes condensées ══
          Le padding haut (dégagement du header) vit ici, plus sur la section :
          ainsi la scène épinglée `sticky top-0` colle bien au bord du viewport. */}
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
            <VimeoBackground
              id={HERO_FILM_ID}
              title="Film Bel Augure"
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>

        {/* Bas : trois cartes très condensées, contenu centré (ni prix ni
            bouton). Le détail se trouve plus bas. */}
        <div className="reveal-up grid gap-px pt-12 sm:grid-cols-3 md:pt-16" style={{ '--d': '0.16s' }}>
          {OFFERS.map((o) => (
            <div key={o.id} className={`flex flex-col items-center px-4 py-7 text-center sm:border-r sm:px-8 sm:last:border-r-0 ${RULE}`}>
              <p className="text-[10px] font-normal uppercase tracking-[0.24em] text-orfonce">{o.label}</p>
              <h3 className="mt-3 font-display text-[clamp(1.15rem,1.8vw,1.4rem)] font-light leading-[1.15] text-encre">
                {o.name}
              </h3>
              <p className="mt-2 max-w-[32ch] text-[14.5px] font-light leading-[1.5] text-encre/80">{o.cardPhrase}</p>
            </div>
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

      {/* ══ Chapitres ══ Bureau : scrollytelling épinglé, chaque offre est un
          chapitre animé au scroll (voir OffersExperience → EnhancedChapter).
          Mobile / mouvement réduit : repli sur les chapitres classiques
          dévoilés au scroll (OfferChapter), tout le détail présent. */}
      <OffersExperience offers={OFFERS} onContact={goContact} setDark={setDark} />

      {/* ══ Bloc transverse : comment nous travaillons ══ */}
      <div className="mx-auto w-full max-w-[1180px] px-6 pb-40 md:px-16 lg:pb-24">
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

          <div className={`mt-12 border-t pt-8 ${RULE}`}>
            <h3 className="font-display text-[16px] leading-[1.4] text-encre">{DIFFUSION.title}</h3>
            <p className="mt-3 max-w-[70ch] text-[14px] font-light leading-[1.85] text-encre/80">{DIFFUSION.body}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
