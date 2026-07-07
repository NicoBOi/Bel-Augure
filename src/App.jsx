import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Accueil from './views/Accueil.jsx'
import Films from './views/Films.jsx'
import Studio from './views/Studio.jsx'
import Offres from './views/Offres.jsx'
import Contact from './views/Contact.jsx'

const VIEWS = {
  accueil: Accueil,
  films: Films,
  studio: Studio,
  offres: Offres,
  contact: Contact,
}

const TITLES = {
  accueil: 'Bel Augure · Studio de films signature',
  films: 'Films · Bel Augure',
  studio: 'Studio · Bel Augure',
  offres: 'Offres · Bel Augure',
  contact: 'Contact · Bel Augure',
}

export default function App() {
  const [view, setView] = useState('accueil')
  // L'accueil et la lecture d'un film vivent dans l'encre : le fond, le
  // header et le contenu transitionnent ensemble, sans overlay.
  const [dark, setDark] = useState(true)
  // Voile d'ouverture : l'encre porte le logo le temps que le film de
  // fond démarre. Il se lève dès que la vidéo joue (minimum une seconde
  // de présence), ou au bout de 2,6 s si elle tarde — jamais d'attente
  // infinie, jamais de player à moitié chargé à l'écran.
  const [veiled, setVeiled] = useState(true)
  const [heroReady, setHeroReady] = useState(false)
  const bootAt = useRef(performance.now())
  const View = VIEWS[view]

  const navigate = (next) => {
    setDark(false)
    setView(next)
  }

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
  }, [view])

  return (
    <div
      className={`relative h-[100dvh] overflow-hidden transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        dark ? 'bg-encre text-creme' : 'bg-creme text-encre'
      }`}
    >
      <Navbar activeView={view} onNavigate={navigate} dark={dark} />
      <main className="relative z-[1] h-full">
        <div key={view} className="view-enter h-full">
          <View
            onNavigate={navigate}
            setDark={setDark}
            onHeroReady={() => setHeroReady(true)}
          />
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
