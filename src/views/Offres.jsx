import { useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal.js'
import VimeoBackground from '../components/VimeoBackground.jsx'

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
      className="-mx-6 scroll-mt-24 px-6 py-24 md:-mx-16 md:px-16 md:py-32"
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

export default function Offres({ setDark, onNavigate }) {
  const ref = useReveal(0.35)

  // La page vit dans la lumière, sauf la dernière offre (Campagne) qui passe
  // en sombre : quand sa bande glisse sous le header transparent, on bascule
  // l'en-tête en clair pour garder le contraste, puis on revient au clair
  // dès qu'on la quitte.
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

  const goContact = (name) => onNavigate?.('contact', { offer: name })
  const scrollToDetail = (id) =>
    document.getElementById(`detail-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section
      ref={ref}
      aria-label="Offres"
      className="h-full overflow-y-auto scroll-smooth px-6 pt-28 md:px-16"
      style={{ backgroundColor: BG }}
    >
      <h1 className="sr-only">Nos offres — Bel Augure</h1>

      {/* ══ Premier écran : titre + film, puis trois cartes condensées ══ */}
      <div className="mx-auto flex min-h-[calc(100dvh-9rem)] w-full max-w-[1180px] flex-col">
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

      {/* ══ Chapitres ══ Chaque offre est une bande pleine largeur (fond
          alterné, sombre pour la Campagne). Le détail défile horizontalement
          — voir le composant OfferChapter. */}
      {OFFERS.map((o, i) => (
        <OfferChapter key={o.id} o={o} i={i} onContact={goContact} />
      ))}

      {/* ══ Bloc transverse : comment nous travaillons ══ */}
      <div className="mx-auto w-full max-w-[1180px] pb-40 lg:pb-24">
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
