import { useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal.js'
import SiteFooter from '../components/SiteFooter.jsx'
import { useVimeoThumb } from '../hooks/useVimeoThumb.js'
import { OFFERS } from '../content/offres.js'

// Le film de fond vit dans App (calque persistant) : ici on ne fait que
// scruter son opacité via mediaRef pendant la transition au scroll.
const FILM_VIMEO_ID = '1211391558'

// Essai (12/08) : la home ne s'arrêtait plus après le hero — la molette n'y
// faisait plus rien une fois le jour levé. Le hero est repensé en panneau
// épinglé (position: sticky) au lieu d'un écran unique qui capte la molette :
// le défilement redevient natif, réel, et se poursuit dans deux sections
// éditoriales après lui. La transition nuit → jour suit désormais la
// position de défilement réelle plutôt qu'une accumulation de deltas.
export default function Accueil({ onNavigate, setDark, mediaRef }) {
  const revealHero = useReveal(0.35)
  const revealWays = useReveal(0.25)
  const revealTeam = useReveal(0.25)
  // Vignette du film pour le photogramme du bouton « Découvrir le film ».
  const filmThumb = useVimeoThumb(FILM_VIMEO_ID, 320)
  const outerRef = useRef(null)
  const pinRef = useRef(null)
  const creamRef = useRef(null)
  const wordRef = useRef(null)
  const hintRef = useRef(null)
  const studioRef = useRef(null)
  const wasDark = useRef(true)

  // Le héros s'ouvre dans l'encre : la salle obscure avant le film.
  useEffect(() => {
    setDark(true)
    wasDark.current = true
    // Filet : si un rendu précédent avait laissé une opacité en ligne sur le
    // calque vidéo, on la rend au navigateur.
    if (mediaRef?.current) mediaRef.current.style.opacity = ''
  }, [setDark, mediaRef])

  // Le défilement réel pilote la transition : la vidéo s'estompe, le site
  // passe au jour et le texte du studio se révèle, exactement à la même
  // vitesse que le geste — plus de reconstitution par accumulation de deltas.
  useEffect(() => {
    const outer = outerRef.current
    const pin = pinRef.current
    if (!outer || !pin) return

    // Une écriture DOM n'a lieu que si la valeur change vraiment.
    const memo = new WeakMap()
    const write = (el, prop, value) => {
      if (!el) return
      let seen = memo.get(el)
      if (!seen) memo.set(el, (seen = {}))
      if (seen[prop] === value) return
      seen[prop] = value
      if (prop === 'inert') el.inert = value
      else el.style[prop] = value
    }
    const r3 = (v) => Math.round(v * 1000) / 1000

    const apply = (p) => {
      write(creamRef.current, 'opacity', String(r3(p)))
      write(wordRef.current, 'opacity', String(r3(Math.max(1 - p * 1.6, 0))))
      write(wordRef.current, 'transform', `translateY(${r3(-p * 8)}vh)`)
      write(wordRef.current, 'inert', p > 0.5)
      // L'invite au film ne vit que sur la scène d'ouverture : elle s'efface
      // vite dès qu'un geste de scroll commence.
      write(hintRef.current, 'opacity', String(r3(Math.max(1 - p * 3, 0))))
      write(hintRef.current, 'inert', p > 0.15)
      const q = Math.min(Math.max((p - 0.55) / 0.45, 0), 1)
      write(studioRef.current, 'opacity', String(r3(q)))
      write(studioRef.current, 'pointerEvents', q > 0.6 ? 'auto' : 'none')
      write(studioRef.current, 'inert', q < 0.5)
      write(studioRef.current, 'transform', `translateY(${r3((1 - q) * 24)}px)`)
      const darkNow = p < 0.5
      if (darkNow !== wasDark.current) {
        wasDark.current = darkNow
        setDark(darkNow)
      }
    }

    let raf = null
    const compute = () => {
      raf = null
      // Distance de défilement réservée à la transition : la hauteur du
      // panneau épingleur moins un écran (ce qui reste visible en continu).
      const dist = Math.max(pin.offsetHeight - outer.clientHeight, 1)
      const p = Math.min(Math.max(outer.scrollTop / dist, 0), 1)
      apply(p)
    }
    compute()

    const onScroll = () => {
      if (raf == null) raf = requestAnimationFrame(compute)
    }
    outer.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      outer.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [setDark])

  return (
    <div ref={outerRef} className="h-full overflow-y-auto overflow-x-hidden bg-encre">
      {/* Panneau épingleur : sa hauteur au-delà d'un écran est la distance de
          défilement consommée par la transition nuit → jour. Le hero reste
          collé en haut tant qu'on progresse dans cette distance, puis se
          libère normalement pour laisser place aux sections suivantes. */}
      <div ref={pinRef} className="relative h-[135dvh]">
        <section
          ref={(el) => {
            revealHero(el)
          }}
          aria-labelledby="hero-titre"
          className="sticky top-0 h-[100dvh] overflow-hidden"
        >
          {/* Voile dégradé sous le texte : garantit la lisibilité du titre et de
              la catchline quelle que soit la frame du film (indépendant de la
              vidéo). Masqué par le calque crème dès que le jour se lève. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[60%] bg-gradient-to-t from-encre/65 via-encre/20 to-transparent"
          />

          {/* Le jour se lève exactement au rythme du scroll */}
          <div ref={creamRef} aria-hidden="true" className="absolute inset-0 z-[1] bg-creme opacity-0" />

          {/* Mot-symbole et signature en vis-à-vis : la signature reprend sa
              place à droite, alignée sur le pied du mot-symbole. Elle reste
              composée en Montserrat — le didone perd ses déliés sous 24px. */}
          <div ref={wordRef} className="absolute inset-x-6 bottom-[9vh] z-[2] md:inset-x-16">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:gap-10">
              <h1
                id="hero-titre"
                className="font-display text-[clamp(3.4rem,10.5vw,10rem)] leading-[1.02] tracking-[0.005em] text-creme lg:shrink-0 lg:whitespace-nowrap"
              >
                <span className="mask" style={{ '--d': '0.05s' }}>
                  <span>
                    Bel Augure<span className="dot-breathe text-or">.</span>
                  </span>
                </span>
                <span className="sr-only">
                  — studio de production de films pour hôtels, spas, lieux de bien-être,
                  skincare et marques de soins, à Bordeaux
                </span>
              </h1>

              {/* Relevée d'un cran au-dessus du pied du mot-symbole : calée sur
                  sa ligne de base réelle, elle tombait au niveau du paraphe qui
                  descend sous « Augure », trop bas pour l'œil. Une ombre portée
                  dédiée assure son contraste indépendamment du plan du film sous
                  elle. La coupe est fixée après « production ». */}
              <p
                className="reveal-up text-[11px] font-light uppercase leading-[2.1] tracking-[0.24em] text-creme lg:pb-4"
                style={{ '--d': '0.05s', textShadow: '0 1px 12px rgb(0 0 0 / 0.55)' }}
              >
                <span className="block whitespace-nowrap">Le studio de production</span>
                <span className="block whitespace-nowrap">
                  du bien<span className="font-medium text-or">-</span>être d’exception
                </span>
              </p>
            </div>
          </div>

          {/* Invite discrète, mobile seulement : dans la zone du pouce, un
              bouton lecture pulsé qui ouvre le film. Disparaît au scroll. */}
          <button
            ref={hintRef}
            type="button"
            onClick={() => onNavigate('films')}
            aria-label="Voir le film"
            className="absolute right-[-26px] top-[58%] z-[2] flex min-h-[44px] -translate-y-1/2 items-center rounded-l-lg border border-r-0 border-creme/15 bg-encre/90 py-3 pl-5 pr-11 shadow-[0_6px_22px_-8px_rgba(0,0,0,0.55)] md:hidden"
          >
            <span className="hint-shimmer text-[10px] font-normal uppercase tracking-[0.22em]">
              Voir le film
            </span>
          </button>

          {/* Le studio se présente quand le jour se lève, au centre de la scène */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-[2] w-full -translate-x-1/2 -translate-y-1/2 px-6 text-center">
            <div ref={studioRef} className="opacity-0" style={{ pointerEvents: 'none' }}>
              <div className="mx-auto w-full max-w-[38rem] text-center">
                <h2
                  className="font-display text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.2] text-encre"
                  style={{ textWrap: 'balance' }}
                >
                  Des films à la hauteur de votre expérience<span className="text-or">.</span>
                </h2>

                <div className="mt-8 space-y-4 text-[15px] font-light leading-[1.85] text-encre/80" style={{ textWrap: 'pretty' }}>
                  <p>
                    <span className="block">Vous avez pensé chaque détail de votre univers.</span>
                    <span className="block">Nous créons l’image qui donnera envie d’y entrer.</span>
                  </p>
                </div>
              </div>

              {/* Une seule vignette, comme un photogramme posé sur la table */}
              <button
                type="button"
                onClick={() => onNavigate('films')}
                className="group mx-auto mt-9 flex cursor-pointer items-center gap-5"
              >
                <span aria-hidden="true" className="relative block h-9 w-16">
                  <span className="absolute left-1/2 top-1/2 h-9 w-16 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[6px] bg-encre shadow-[0_6px_16px_-6px_rgb(26_21_18/0.5)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-3 group-hover:translate-y-[calc(-50%-3px)]">
                    {filmThumb && (
                      <img
                        src={filmThumb}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    )}
                  </span>
                </span>
                <span className="text-[11px] font-normal uppercase tracking-[0.22em] text-encre/80 transition-colors duration-500 group-hover:text-encre">
                  Découvrir le film<span className="text-or">.</span>
                </span>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* ── Vos trois façons de travailler avec nous ── */}
      <section
        ref={revealWays}
        aria-label="Nos façons de travailler"
        className="bg-creme px-6 py-20 md:px-16 md:py-28"
      >
        <div className="mx-auto w-full max-w-[68rem]">
          <h2 className="reveal-up max-w-[20ch] font-display text-[clamp(1.8rem,3.4vw,2.8rem)] font-light leading-[1.12] text-encre">
            Vos trois façons de travailler avec nous
          </h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-encre/10 sm:grid-cols-3">
            {OFFERS.map((o, i) => (
              <button
                key={o.id}
                type="button"
                onClick={() => onNavigate('offres')}
                className="reveal-up group flex flex-col items-start bg-[#F4ECDF] p-8 text-left transition-colors duration-300 hover:bg-[#EFE4D5] sm:p-9"
                style={{ '--d': `${0.08 + i * 0.06}s` }}
              >
                <p className="text-[10.5px] font-normal uppercase tracking-[0.24em] text-orfonce">
                  {o.label}
                </p>
                <h3 className="mt-3 font-display text-[clamp(1.4rem,2vw,1.7rem)] font-light leading-[1.15] text-encre">
                  {o.name}
                </h3>
                <p className="mt-3 text-[13.5px] font-light leading-[1.6] text-encre/75">
                  {o.cardPhrase}
                </p>
                <span className="mt-6 text-[11px] font-normal uppercase tracking-[0.18em] text-encre/50 transition-colors duration-300 group-hover:text-encre">
                  Voir l’offre →
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Derrière chaque film, nous sommes deux — puis l'appel final ── */}
      <section
        ref={revealTeam}
        aria-label="Le studio"
        className="bg-creme px-6 pb-24 pt-4 text-center md:px-16 md:pb-32"
      >
        <div className="mx-auto w-full max-w-[42rem]">
          <h2 className="reveal-up font-display text-[clamp(1.8rem,3.4vw,2.8rem)] font-light leading-[1.15] text-encre">
            Derrière chaque film, nous sommes deux<span className="text-or">.</span>
          </h2>
          <p
            className="reveal-up mx-auto mt-6 max-w-[38ch] text-[15px] font-light leading-[1.85] text-encre/80"
            style={{ '--d': '0.08s' }}
          >
            Nicolas et Corentin sont présents à chaque étape de votre film, du premier
            échange jusqu’à la livraison.
          </p>

          <button
            type="button"
            onClick={() => onNavigate('studio')}
            className="reveal-up mt-7 inline-flex cursor-pointer items-center gap-2 text-[12px] font-normal uppercase tracking-[0.18em] text-encre/70 transition-colors duration-300 hover:text-encre"
            style={{ '--d': '0.14s' }}
          >
            En savoir plus sur le studio
            <span aria-hidden="true">→</span>
          </button>

          <div className="reveal-up mt-14 border-t border-orfonce/20 pt-14" style={{ '--d': '0.2s' }}>
            <h3 className="font-display text-[clamp(1.6rem,2.6vw,2.1rem)] font-light leading-[1.25] text-encre">
              Parlons de votre prochain film<span className="text-or">.</span>
            </h3>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="mt-8 inline-flex cursor-pointer items-center justify-center rounded-full border border-encre/45 px-9 py-3.5 text-[13px] font-normal tracking-[0.06em] text-encre transition-colors duration-300 hover:bg-encre hover:text-creme"
            >
              Votre projet
            </button>
          </div>
        </div>
      </section>

      <SiteFooter onNavigate={onNavigate} className="bg-creme px-6 pb-16 md:px-16" />
    </div>
  )
}
