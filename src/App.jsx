import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import VimeoBackground from './components/VimeoBackground.jsx'
// L'accueil (le héros) est critique : chargé d'emblée. Les autres vues,
// surtout textuelles, sont découpées en fragments à part et ne sont
// téléchargées qu'à la première visite — le bundle initial fond d'autant.
import Accueil from './views/Accueil.jsx'
const Films = lazy(() => import('./views/Films.jsx'))
const Studio = lazy(() => import('./views/Studio.jsx'))
const Offres = lazy(() => import('./views/Offres.jsx'))
const Contact = lazy(() => import('./views/Contact.jsx'))
const Mentions = lazy(() => import('./views/Mentions.jsx'))

// Film de fond du héros. Monté ici, au niveau de l'application : il ne se
// démonte jamais quand on navigue, la lecture continue en coulisse et le
// retour à l'accueil retrouve le film déjà lancé, sans rechargement.
const HERO_VIMEO_ID = '1211391558'
// Fond du héros décliné pour le mobile : montage vertical, chargé
// uniquement sous 768px. Le desktop garde la version paysage ci-dessus.
const HERO_VIMEO_ID_MOBILE = '1212142686'
const MOBILE_QUERY = '(max-width: 767px)'

const VIEWS = {
  accueil: Accueil,
  films: Films,
  studio: Studio,
  offres: Offres,
  contact: Contact,
  mentions: Mentions,
}

const TITLES = {
  accueil: 'Bel Augure · Films pour hôtels, spas et maisons de bien-être · Bordeaux',
  films: 'Films · Bel Augure',
  studio: 'Studio · Bel Augure',
  offres: 'Offres · Bel Augure',
  contact: 'Contact · Bel Augure',
  mentions: 'Mentions légales · Bel Augure',
}

// La description suit la vue : chaque page raconte sa propre promesse
// aux moteurs et aux aperçus de lien.
const DESCRIPTIONS = {
  accueil:
    'Films pour hôtels, spas, thermes et maisons de bien-être. Deux réalisateurs, toute la chaîne. Bordeaux.',
  films:
    "Les Pieds dans l'eau : le premier film de Bel Augure, tourné sur le bassin d'Arcachon, au crépuscule d'une marée montante.",
  studio:
    "Nicolas et Corentin, deux réalisateurs à Bordeaux. Peu de films par an, faits main, pour le bien-être d'exception.",
  offres:
    'Formats et délais : tout est écrit. Films signature livrés de quatre à huit semaines.',
  contact:
    'Écrire à Bel Augure : un email suffit. Réponse sous deux jours, depuis Bordeaux.',
  mentions: 'Mentions légales et politique de confidentialité de Bel Augure.',
}

// Chaque vue vit à sa propre URL (/films, /offres…) : indexable,
// partageable, pré-rendue au build. Les anciennes ancres #films sont
// reconnues et réécrites en chemin.
const VIEW_PATHS = {
  accueil: '/',
  films: '/films',
  studio: '/studio',
  offres: '/offres',
  contact: '/contact',
  mentions: '/mentions-legales',
}

const PATH_VIEWS = Object.fromEntries(
  Object.entries(VIEW_PATHS).map(([view, path]) => [path, view]),
)

const SITE = 'https://www.belaugure.studio'

const viewFromLocation = () => {
  const h = window.location.hash.slice(1)
  if (VIEWS[h]) return h
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  return PATH_VIEWS[path] || 'accueil'
}

export default function App() {
  const [view, setView] = useState(viewFromLocation)
  // L'accueil et la lecture d'un film vivent dans l'encre : le fond, le
  // header et le contenu transitionnent ensemble, sans overlay.
  const [dark, setDark] = useState(() => viewFromLocation() === 'accueil')
  // Voile d'ouverture : l'encre porte le logo le temps que le film de
  // fond démarre. Il se lève dès que la vidéo joue (minimum une seconde
  // de présence), ou au bout de 2,6 s si elle tarde — jamais d'attente
  // infinie, jamais de player à moitié chargé à l'écran. Il n'a de sens
  // que sur l'accueil : ailleurs, la page arrive sans attente.
  const [veiled, setVeiled] = useState(() => viewFromLocation() === 'accueil')
  const [heroReady, setHeroReady] = useState(false)
  // Progression du chargement (0→100) : grimpe pendant que le film se prépare,
  // n'atteint 100 % qu'une fois la vidéo prête.
  const [progress, setProgress] = useState(0)
  // Compteur de navigation : sert de clé de remontage des vues (voir navigate).
  const [navTick, setNavTick] = useState(0)
  const bootAt = useRef(performance.now())
  // Calque média du héros : l'accueil en scrute l'opacité pendant le
  // scroll, les autres vues le masquent sans arrêter la lecture.
  const heroMediaRef = useRef(null)
  // Choix de la déclinaison du fond selon la largeur d'écran. On suit les
  // changements (rotation, redimensionnement) pour recharger la bonne vidéo.
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches,
  )
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY)
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  const View = VIEWS[view]

  const navigate = (next) => {
    // L'accueil vit dans l'encre : y revenir sans repasser par un éclair
    // de crème (l'effet de la vue remettrait dark ensuite, trop tard).
    setDark(next === 'accueil')
    setView(next)
    // Remonte : chaque navigation remonte la vue (clé qui change), même vers
    // la vue déjà active — cliquer le logo depuis l'accueil scrollé remet
    // donc bien la scène en haut au lieu de rester sur place.
    setNavTick((t) => t + 1)
    window.history.pushState(null, '', VIEW_PATHS[next])
  }

  // Ancien lien en #hash : réécrit une fois vers le chemin propre.
  useEffect(() => {
    const h = window.location.hash.slice(1)
    if (VIEWS[h]) {
      window.history.replaceState(null, '', VIEW_PATHS[h])
    }
  }, [])

  // Les vues découpées sont préchargées pendant un temps mort, une fois la
  // scène d'ouverture posée : le bundle initial reste léger, mais la
  // navigation vers Films/Offres/Studio… est ensuite instantanée.
  useEffect(() => {
    const warm = () => {
      import('./views/Films.jsx')
      import('./views/Offres.jsx')
      import('./views/Studio.jsx')
      import('./views/Contact.jsx')
      import('./views/Mentions.jsx')
    }
    const ric = window.requestIdleCallback || ((cb) => setTimeout(cb, 1500))
    const cancel = window.cancelIdleCallback || clearTimeout
    const id = ric(warm)
    return () => cancel(id)
  }, [])

  // Navigation historique (précédent/suivant) : on suit.
  useEffect(() => {
    const onPop = () => {
      const next = viewFromLocation()
      setDark(next === 'accueil')
      setView(next)
      setNavTick((t) => t + 1)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // La barre se remplit en douceur, corrélée au chargement de la vidéo :
  // elle approche 90 % tant que le film n'est pas prêt, puis file à 100 %
  // dès qu'il l'est (heroReady). Un plafond de sûreté (4 s) évite tout
  // blocage si l'événement de lecture ne remonte jamais.
  useEffect(() => {
    if (!veiled) return
    let raf
    const loop = () => {
      setProgress((p) => {
        const capped = performance.now() - bootAt.current > 4000
        const target = heroReady || capped ? 100 : 90
        const next = p + (target - p) * 0.045
        return target === 100 && next > 99.5 ? 100 : next
      })
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [veiled, heroReady])

  // À 100 %, on marque un très bref temps plein puis le voile se lève.
  useEffect(() => {
    if (!veiled || progress < 100) return
    const t = setTimeout(() => setVeiled(false), 220)
    return () => clearTimeout(t)
  }, [veiled, progress])

  // La page ne navigue jamais : le titre du document reflète la vue active
  // pour l'historique mental et les lecteurs d'écran.
  useEffect(() => {
    document.title = TITLES[view]
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', DESCRIPTIONS[view])
    const url = SITE + (VIEW_PATHS[view] === '/' ? '/' : VIEW_PATHS[view])
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', url)
  }, [view])

  return (
    <div
      className={`relative h-[100dvh] overflow-hidden transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        dark ? 'bg-encre text-creme' : 'bg-creme text-encre'
      }`}
    >
      {/* Film de fond persistant : visible sur l'accueil, masqué ailleurs
          (visibility préserve la lecture, contrairement à un démontage) */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 z-0 ${view === 'accueil' ? '' : 'invisible'}`}
      >
        <div ref={heroMediaRef} className="absolute inset-0 isolate overflow-hidden">
          <div className="h-full w-full bg-encre" />
          <VimeoBackground
            key={isMobile ? 'mobile' : 'desktop'}
            id={isMobile ? HERO_VIMEO_ID_MOBILE : HERO_VIMEO_ID}
            title="Film de fond"
            paused={view !== 'accueil'}
            onPlaying={() => setHeroReady(true)}
            className={
              isMobile
                ? 'absolute left-1/2 top-1/2 h-[177.78vw] min-h-full w-screen min-w-[56.25vh] -translate-x-1/2 -translate-y-1/2'
                : 'absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-screen min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2'
            }
          />
          {/* Voile en fondu multiply : baisse les blancs du film sans
              remonter les noirs (noir × encre = noir). Un alpha simple,
              lui, décollait les noirs vers le gris-encre. */}
          <div className="absolute inset-0 bg-encre/25 mix-blend-multiply" />
        </div>
      </div>

      <Navbar activeView={view} onNavigate={navigate} dark={dark} />
      <main className="relative z-[1] h-full">
        <div key={`${view}-${navTick}`} className="view-enter h-full">
          <Suspense fallback={null}>
            <View onNavigate={navigate} setDark={setDark} mediaRef={heroMediaRef} />
          </Suspense>
        </div>
      </main>

      {/* Voile d'ouverture : la salle obscure, le temps que le film démarre */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-encre transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          veiled ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex flex-col items-center">
          <p className="font-display text-[clamp(1.6rem,3vw,2.4rem)] text-creme">
            Bel Augure<span className="dot-breathe text-or">.</span>
          </p>
          {/* Filet de chargement : l'or se remplit au rythme du chargement
              de la vidéo, avec le pourcentage sous le filet. */}
          <span className="mt-7 block h-px w-44 overflow-hidden bg-creme/12">
            <span className="block h-full bg-or" style={{ width: `${progress}%` }} />
          </span>
          <span className="mt-3 text-[10px] font-light tabular-nums tracking-[0.25em] text-creme/45">
            {Math.round(progress)} %
          </span>
        </div>
      </div>
    </div>
  )
}
