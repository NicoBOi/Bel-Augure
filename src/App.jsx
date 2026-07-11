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
const HERO_VIMEO_ID = '961941216'

const VIEWS = {
  accueil: Accueil,
  films: Films,
  studio: Studio,
  offres: Offres,
  contact: Contact,
  mentions: Mentions,
}

const TITLES = {
  accueil: 'Bel Augure · Studio de films signature',
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
    'Les films de Bel Augure : hôtellerie rare, thermes, domaines, cosmétique. Tournés à la lumière du jour, depuis Bordeaux.',
  studio:
    'Deux artisans, peu de films, bien faits. Bel Augure fait du cinéma pour le bien-être d’exception, depuis Bordeaux.',
  offres:
    'Formats et délais : tout est écrit. Films signature livrés de quatre à huit semaines.',
  contact:
    'Écrire à Bel Augure : un email suffit. Réponse sous deux jours, depuis Bordeaux.',
  mentions: 'Mentions légales et politique de confidentialité de Bel Augure.',
}

// La vue vit dans le hash (#offres, #studio…) : un rafraîchissement ou un
// lien partagé retombe sur la même page, pas sur l'accueil.
const viewFromHash = () => {
  const h = window.location.hash.slice(1)
  return VIEWS[h] ? h : 'accueil'
}

export default function App() {
  const [view, setView] = useState(viewFromHash)
  // L'accueil et la lecture d'un film vivent dans l'encre : le fond, le
  // header et le contenu transitionnent ensemble, sans overlay.
  const [dark, setDark] = useState(() => viewFromHash() === 'accueil')
  // Voile d'ouverture : l'encre porte le logo le temps que le film de
  // fond démarre. Il se lève dès que la vidéo joue (minimum une seconde
  // de présence), ou au bout de 2,6 s si elle tarde — jamais d'attente
  // infinie, jamais de player à moitié chargé à l'écran. Il n'a de sens
  // que sur l'accueil : ailleurs, la page arrive sans attente.
  const [veiled, setVeiled] = useState(() => viewFromHash() === 'accueil')
  const [heroReady, setHeroReady] = useState(false)
  const bootAt = useRef(performance.now())
  // Calque média du héros : l'accueil en scrute l'opacité pendant le
  // scroll, les autres vues le masquent sans arrêter la lecture.
  const heroMediaRef = useRef(null)
  const View = VIEWS[view]

  const navigate = (next) => {
    // L'accueil vit dans l'encre : y revenir sans repasser par un éclair
    // de crème (l'effet de la vue remettrait dark ensuite, trop tard).
    setDark(next === 'accueil')
    setView(next)
    window.history.replaceState(null, '', next === 'accueil' ? window.location.pathname : `#${next}`)
  }

  // Hash modifié à la main ou navigation historique : on suit.
  useEffect(() => {
    const onHash = () => {
      const next = viewFromHash()
      setDark(next === 'accueil')
      setView(next)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
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
            id={HERO_VIMEO_ID}
            title="Film de fond"
            onPlaying={() => setHeroReady(true)}
            className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-screen min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2"
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
