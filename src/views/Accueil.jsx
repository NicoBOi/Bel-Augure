import { useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal.js'
import SiteFooter from '../components/SiteFooter.jsx'
import { useVimeoThumb } from '../hooks/useVimeoThumb.js'

// Le film de fond vit dans App (calque persistant) : ici on ne fait que
// scruter son opacité via mediaRef pendant la transition au scroll.
const FILM_VIMEO_ID = '1211391558'

export default function Accueil({ onNavigate, setDark, mediaRef }) {
  const reveal = useReveal(0.35)
  // Vignette du film pour le photogramme du bouton « Découvrir le film ».
  const filmThumb = useVimeoThumb(FILM_VIMEO_ID, 320)
  const sectionRef = useRef(null)
  const creamRef = useRef(null)
  const wordRef = useRef(null)
  const hintRef = useRef(null)
  const studioRef = useRef(null)
  const footerRef = useRef(null)
  const target = useRef(0)
  const current = useRef(0)
  const wasDark = useRef(true)

  // Le héros s'ouvre dans l'encre : la salle obscure avant le film.
  useEffect(() => {
    setDark(true)
    wasDark.current = true
    // Filet : si un rendu précédent avait laissé une opacité en ligne sur le
    // calque vidéo, on la rend au navigateur.
    if (mediaRef?.current) mediaRef.current.style.opacity = ''
  }, [setDark, mediaRef])

  // Le scroll scrute la transition : la vidéo s'estompe, le site passe au
  // jour et le texte du studio se révèle. Boucle rAF, transforms et
  // opacités uniquement. Molette au bureau, glissement au doigt.
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf

    // Une écriture DOM n'a lieu que si la valeur change vraiment : sans ce
    // filtre, `inert` et `pointer-events` étaient réécrits soixante fois par
    // seconde et invalidaient le style à chaque image.
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
    // Trois décimales suffisent à l'œil et divisent d'autant les écritures.
    const r3 = (v) => Math.round(v * 1000) / 1000

    const apply = (p) => {
      // Le calque crème suffit à couvrir le film : on ne touche plus à
      // l'opacité du calque vidéo. Faire varier l'opacité d'une iframe en
      // lecture oblige le navigateur à recomposer la vidéo à chaque image —
      // c'était le vrai coût de la transition.
      write(creamRef.current, 'opacity', String(r3(p)))
      write(wordRef.current, 'opacity', String(r3(Math.max(1 - p * 1.6, 0))))
      write(wordRef.current, 'transform', `translateY(${r3(-p * 8)}vh)`)
      write(wordRef.current, 'inert', p > 0.5)
      // L'invite au film ne vit que sur la scène d'ouverture : elle s'efface
      // vite dès qu'un geste de scroll commence.
      write(hintRef.current, 'opacity', String(r3(Math.max(1 - p * 3, 0))))
      write(hintRef.current, 'inert', p > 0.15)
      // Le studio et la signature montent ensemble avec le jour.
      const q = Math.min(Math.max((p - 0.55) / 0.45, 0), 1)
      for (const el of [studioRef.current, footerRef.current]) {
        write(el, 'opacity', String(r3(q)))
        write(el, 'pointerEvents', q > 0.6 ? 'auto' : 'none')
        write(el, 'inert', q < 0.5) // invisible = hors du parcours clavier
      }
      write(studioRef.current, 'transform', `translateY(${r3((1 - q) * 24)}px)`)
      // Le site entier passe au jour à mi-course, header compris
      const darkNow = p < 0.5
      if (darkNow !== wasDark.current) {
        wasDark.current = darkNow
        setDark(darkNow)
      }
    }

    // Les deux grands calques animés sont promus en couche compositée le
    // temps du geste seulement : le navigateur n'a plus à repeindre le plein
    // écran à chaque image, et la mémoire est rendue une fois la scène posée.
    const promote = (on) => {
      if (creamRef.current) creamRef.current.style.willChange = on ? 'opacity' : ''
    }

    // La boucle ne tourne que tant qu'il reste du chemin : arrivée à
    // destination, elle s'arrête, et un geste (molette/doigt/clavier) la
    // relance. Le rattrapage est exprimé en temps réel, donc identique à
    // 60 comme à 120 Hz, et assez vif pour que le geste réponde tout de suite.
    let lastT = 0
    const loop = (now) => {
      const dt = lastT ? Math.min(now - lastT, 50) : 16.7
      lastT = now
      const t = target.current
      const c = current.current
      const k = reduce ? 1 : 1 - Math.pow(1 - 0.22, dt / 16.6667)
      const next = c + (t - c) * k
      current.current = Math.abs(next - t) < 0.0005 ? t : next
      apply(current.current)
      if (current.current === t) {
        raf = null
        lastT = 0
        promote(false)
        return
      }
      raf = requestAnimationFrame(loop)
    }
    const ensure = () => {
      if (raf == null) {
        promote(true)
        raf = requestAnimationFrame(loop)
      }
    }
    ensure()

    // La molette agit proportionnellement, comme le doigt : la lumière suit le
    // geste. À l'arrêt, la scène se pose dans le SENS du geste — vers le bas
    // le jour se lève, vers le haut la nuit revient. Aucune zone morte : un
    // seul cran suffit. L'ancien seuil « à mi-course » renvoyait un petit
    // scroll en arrière, ce qui se lisait comme un temps de latence.
    let wheelSettle
    let wheelDir = 0
    const onWheel = (e) => {
      if (e.deltaY !== 0) wheelDir = e.deltaY > 0 ? 1 : -1
      target.current = Math.min(Math.max(target.current + e.deltaY / 700, 0), 1)
      ensure()
      clearTimeout(wheelSettle)
      wheelSettle = setTimeout(() => {
        target.current = wheelDir >= 0 ? 1 : 0
        ensure()
      }, 110)
    }
    section.addEventListener('wheel', onWheel, { passive: true })

    // Au doigt : le glissement scrute, le relâcher pose la scène dans le
    // sens du geste
    let touchY = null
    let touchDir = 0
    const onTouchStart = (e) => {
      touchY = e.touches[0].clientY
    }
    const onTouchMove = (e) => {
      if (touchY === null) return
      const delta = touchY - e.touches[0].clientY
      touchDir = delta === 0 ? touchDir : delta > 0 ? 1 : -1
      touchY = e.touches[0].clientY
      target.current = Math.min(Math.max(target.current + delta / 500, 0), 1)
      ensure()
    }
    const onTouchEnd = () => {
      touchY = null
      target.current = touchDir >= 0 ? (target.current > 0.12 ? 1 : 0) : target.current < 0.88 ? 0 : 1
      ensure()
    }
    section.addEventListener('touchstart', onTouchStart, { passive: true })
    section.addEventListener('touchmove', onTouchMove, { passive: true })
    section.addEventListener('touchend', onTouchEnd, { passive: true })

    // Clavier : le jour se lève / retombe sans dépendre de la molette
    // (accessibilité). Bas/Fin/PageBas → jour ; Haut/Début/PageHaut/Échap → nuit.
    const onKey = (e) => {
      if (['ArrowDown', 'PageDown', 'End'].includes(e.key)) {
        target.current = 1
      } else if (['ArrowUp', 'PageUp', 'Home', 'Escape'].includes(e.key)) {
        target.current = 0
      } else {
        return
      }
      e.preventDefault()
      ensure()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(wheelSettle)
      section.removeEventListener('wheel', onWheel)
      section.removeEventListener('touchstart', onTouchStart)
      section.removeEventListener('touchmove', onTouchMove)
      section.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKey)
    }
  }, [setDark])

  return (
    <section
      ref={(el) => {
        reveal(el)
        sectionRef.current = el
      }}
      aria-labelledby="hero-titre"
      className="relative h-full overflow-hidden"
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

      {/* Mot-symbole en bas à gauche, catchline en face : la scène d'ouverture */}
      <div ref={wordRef} className="absolute inset-x-6 bottom-[9vh] z-[2] md:inset-x-16">
        <div className="grid items-end gap-3 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <h1
              id="hero-titre"
              className="font-display text-[clamp(3.4rem,10.5vw,10rem)] leading-[1.02] tracking-[0.005em] text-creme lg:whitespace-nowrap"
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
          </div>

          <div className="reveal-up lg:col-span-4 lg:pb-4" style={{ '--d': '0.05s' }}>
            <p className="max-w-[26ch] font-display text-[clamp(1.1rem,1.6vw,1.6rem)] leading-[1.45] text-or">
              Le studio de production du bien-être d’exception
            </p>
          </div>
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
        {/* Le paragraphe épouse la largeur du titre : le conteneur prend la
            largeur du titre (max-content, le titre étant sur une ligne), et
            le paragraphe la remplit via w-0 + min-w-full. */}
        {/* Titre et paragraphe partagent la même largeur : le paragraphe
            s'aligne sur le titre au lieu d'être tassé au centre. */}
        <div className="mx-auto w-full max-w-[38rem] text-center">
        <h2
          className="font-display text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.2] text-encre"
          style={{ textWrap: 'balance' }}
        >
          Des films à la hauteur de votre expérience<span className="text-or">.</span>
        </h2>

        <div className="mt-8 space-y-4 text-[15px] font-light leading-[1.85] text-encre/80" style={{ textWrap: 'pretty' }}>
          <p>
            Bel Augure crée des films qui révèlent vos lieux, vos produits et votre savoir-faire.
            Pour que votre image porte la même exigence que ce que vous offrez.
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

      {/* Signature et accès légaux, révélés avec le jour. Invisibles sur la
          scène d'ouverture sombre : hors clic et hors parcours clavier tant
          qu'ils ne sont pas là (piloté dans apply, comme le bloc studio). */}
      <div
        ref={footerRef}
        className="pointer-events-none absolute inset-x-0 bottom-[3.5vh] z-[2] opacity-0"
      >
        <SiteFooter onNavigate={onNavigate} />
      </div>
    </section>
  )
}
