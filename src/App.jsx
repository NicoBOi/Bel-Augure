import { useState } from 'react'
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

export default function App() {
  const [view, setView] = useState('accueil')
  const View = VIEWS[view]

  return (
    <div className="relative h-[100dvh] overflow-hidden bg-encre text-creme">
      <div aria-hidden="true" className="grain" />
      <Navbar activeView={view} onNavigate={setView} />
      <main className="relative z-[1] h-full">
        <div key={view} className="view-enter h-full">
          <View onNavigate={setView} />
        </div>
      </main>
    </div>
  )
}
