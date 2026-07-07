import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'

export default function App() {
  return (
    <div className="relative min-h-[100dvh] bg-encre text-creme">
      <div aria-hidden="true" className="halo" />
      <div aria-hidden="true" className="grain" />
      <Navbar />
      <main className="relative z-[1]">
        <Hero />
      </main>
    </div>
  )
}
