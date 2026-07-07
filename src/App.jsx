import { useEffect, useState } from 'react'
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
  const View = VIEWS[view]

  // La page ne navigue jamais : le titre du document reflète la vue active
  // pour l'historique mental et les lecteurs d'écran.
  useEffect(() => {
    document.title = TITLES[view]
  }, [view])

  return (
    <div className="relative h-[100dvh] overflow-hidden bg-creme text-encre">
      <Navbar activeView={view} onNavigate={setView} />
      <main className="relative z-[1] h-full">
        <div key={view} className="view-enter h-full">
          <View onNavigate={setView} />
        </div>
      </main>
    </div>
  )
}
