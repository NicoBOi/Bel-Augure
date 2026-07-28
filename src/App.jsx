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
    "Nicolas et Corentin, deux réalisateurs à Bordeaux qui filment les maisons de bien-être d'exception.",
  offres:
    'Deux offres claires : UGC Créatif, des films courts par espace dès 3 500 €, et Film Signature, le film central à partir de 9 500 €.',
  contact:
    'Parler de votre prochain film avec Bel Augure, studio à Bordeaux. Un email, une idée, et le projet commence.',
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
  // Progression du chargement, pilotée hors React (ref + écriture directe de
  // la largeur) pour ne pas re-rendre tout l'arbre à chaque frame pendant le
  // moment le plus sensible (démarrage vidéo).
  const progressRef = useRef(0)
  const barRef = useRef(null)
  // Compteur de navigation : sert de clé de remontage des vues (voir navigate).
  const [navTick, setNavTick] = useState(0)
  const bootAt = useRef(performance.now())
  // Zone de contenu principal : reçoit le focus après chaque navigation pour
  // que les utilisateurs clavier / lecteur d'écran atterrissent dans la
  // nouvelle vue plutôt que de rester sur le bouton de navigation.
  const mainRef = useRef(null)
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

  // La barre progresse d'un seul mouvement continu : elle s'approche en
  // douceur d'un plafond tant que le film se prépare (92 %), puis, dès qu'il
  // joue (heroReady) ou après un plafond de sûreté, la même courbe la mène
  // jusqu'au bout — pas de saut, pas de palier, un remplissage fluide.
  // On écrit la largeur directement (pas de setState par frame) et le voile
  // ne se lève qu'une fois, quand la barre est quasi pleine.
  useEffect(() => {
    if (!veiled) return
    let raf
    let lifted = false
    const loop = () => {
      const p = progressRef.current
      const done = heroReady || performance.now() - bootAt.current > 3000
      const goal = done ? 100 : 92
      progressRef.current = p + (goal - p) * 0.08
      if (barRef.current) barRef.current.style.width = `${progressRef.current}%`
      if (done && progressRef.current >= 99.3 && !lifted) {
        lifted = true
        if (barRef.current) barRef.current.style.width = '100%'
        setTimeout(() => setVeiled(false), 160)
        return
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [veiled, heroReady])

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

  // La barre du navigateur (mobile) suit la lumière de la vue : encre sur les
  // scènes sombres (accueil, films, offre Film), crème sur les vues claires.
  useEffect(() => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', dark ? '#1a1512' : '#f2ede4')
  }, [dark])

  // Après une navigation, on déplace le focus dans la nouvelle vue (jamais au
  // premier rendu). preventScroll : sans lui, le navigateur fait défiler pour
  // amener l'élément focalisé à vue et provoque un à-coup vertical.
  useEffect(() => {
    if (navTick > 0) mainRef.current?.focus({ preventScroll: true })
  }, [navTick])

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
        <div ref={mainRef} tabIndex={-1} key={`${view}-${navTick}`} className="view-enter h-full outline-none">
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
          {/* Filet de chargement : l'or se remplit au rythme du film. */}
          <span className="mt-7 block h-px w-44 overflow-hidden bg-creme/12">
            <span ref={barRef} className="block h-full bg-or" style={{ width: '0%' }} />
          </span>
        </div>
      </div>
    </div>
  )
}
