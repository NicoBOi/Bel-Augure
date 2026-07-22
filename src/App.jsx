import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import VimeoBackground from './components/VimeoBackground.jsx'
import Accueil from './views/Accueil.jsx'
import Films from './views/Films.jsx'
import Studio from './views/Studio.jsx'
import Offres from './views/Offres.jsx'
import Contact from './views/Contact.jsx'
import Mentions from './views/Mentions.jsx'

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
    "Jetée d'Arès : film d'étude tourné sur le bassin d'Arcachon. L'écriture de Bel Augure, avant les premières signatures clients.",
  studio:
    'Deux artisans, peu de films, bien faits. Bel Augure fait du cinéma pour le bien-être d’exception, depuis Bordeaux.',
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
    window.history.pushState(null, '', VIEW_PATHS[next])
  }

  // Ancien lien en #hash : réécrit une fois vers le chemin propre.
  useEffect(() => {
    const h = window.location.hash.slice(1)
    if (VIEWS[h]) {
      window.history.replaceState(null, '', VIEW_PATHS[h])
    }
  }, [])

  // Navigation historique (précédent/suivant) : on suit.
  useEffect(() => {
    const onPop = () => {
      const next = viewFromLocation()
      setDark(next === 'accueil')
      setView(next)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    if (!veiled) return
    const elapsed = performance.now() - bootAt.current
    const delay = heroReady ? Math.max(1000 - elapsed, 0) : Math.max(2600 - elapsed, 0)
    const t = setTimeout(() => setVeiled(false), delay)
    return () => clearTimeout(t)
  }, [heroReady, veiled])

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
        <div ref={heroMediaRef} className="absolute inset-0 overflow-hidden">
          <div className="h-full w-full bg-encre" />
          <VimeoBackground
            key={isMobile ? 'mobile' : 'desktop'}
            id={isMobile ? HERO_VIMEO_ID_MOBILE : HERO_VIMEO_ID}
            title="Film de fond"
            onPlaying={() => setHeroReady(true)}
            className={
              isMobile
                ? 'absolute left-1/2 top-1/2 h-[177.78vw] min-h-full w-screen min-w-[56.25vh] -translate-x-1/2 -translate-y-1/2'
                : 'absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-screen min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2'
            }
          />
          <div className="absolute inset-0 bg-encre/40" />
        </div>
      </div>

      <Navbar activeView={view} onNavigate={navigate} dark={dark} />
      <main className="relative z-[1] h-full">
        <div key={view} className="view-enter h-full">
          <View onNavigate={navigate} setDark={setDark} mediaRef={heroMediaRef} />
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
          {/* Filet de chargement : l'or avance, vif puis patient */}
          <span className="mt-7 block h-px w-44 overflow-hidden bg-creme/12">
            <span className="veil-bar block h-full w-full bg-or" />
          </span>
        </div>
      </div>
    </div>
  )
}
