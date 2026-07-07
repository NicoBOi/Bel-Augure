import { useEffect, useState } from 'react'

const LINKS = [
  { view: 'films', label: 'Films' },
  { view: 'studio', label: 'Studio' },
  { view: 'offres', label: 'Offres' },
  { view: 'contact', label: 'Contact' },
]

function formatBordeauxTime() {
  const parts = new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Paris',
  })
    .format(new Date())
    .split(':')
  return `${parts[0]} h ${parts[1]}`
}

function useBordeauxClock() {
  const [time, setTime] = useState(formatBordeauxTime)

  useEffect(() => {
    const interval = setInterval(() => setTime(formatBordeauxTime()), 15_000)
    return () => clearInterval(interval)
  }, [])

  return time
}

function NavLink({ view, label, active, onNavigate }) {
  return (
    <button
      type="button"
      onClick={() => onNavigate(view)}
      aria-current={active ? 'page' : undefined}
      className="nav-link inline-block cursor-pointer py-1 text-[12px] font-normal tracking-[0.08em] text-creme/90"
    >
      <span className="nav-label">{label}</span>
    </button>
  )
}

export default function Navbar({ activeView, onNavigate }) {
  const [open, setOpen] = useState(false)
  const time = useBordeauxClock()

  const navigate = (view) => {
    onNavigate(view)
    setOpen(false)
  }

  return (
    <header className="absolute inset-x-0 top-0 z-10">
      <div className="flex items-center justify-between px-6 py-7 md:px-16 md:py-10">
        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex items-center gap-12">
            {LINKS.map((link) => (
              <li key={link.view}>
                <NavLink {...link} active={activeView === link.view} onNavigate={navigate} />
              </li>
            ))}
          </ul>
        </nav>

        {/* Marque discrète côté mobile, la nav passe dans le panneau */}
        <button
          type="button"
          onClick={() => navigate('accueil')}
          className="cursor-pointer font-display text-lg text-creme md:hidden"
          aria-label="Bel Augure, accueil"
        >
          Bel Augure<span className="text-or">.</span>
        </button>

        <div className="hidden items-center gap-12 md:flex">
          <a
            href="mailto:nico@belaugure.studio"
            className="nav-link text-[12px] tracking-[0.08em] text-creme/90"
          >
            <span className="nav-label">nico@belaugure.studio</span>
          </a>
          <p className="text-[12px] font-light tracking-[0.06em] text-grege">
            Bordeaux, <time>{time}</time>
          </p>
        </div>

        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`absolute h-px w-6 bg-creme transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              open ? 'rotate-45' : '-translate-y-[4px]'
            }`}
          />
          <span
            className={`absolute h-px w-6 bg-creme transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              open ? '-rotate-45' : 'translate-y-[4px]'
            }`}
          />
        </button>
      </div>

      <div id="menu-mobile" data-open={open} className="menu-panel md:hidden">
        <div className="menu-panel-inner">
          <nav
            aria-label="Navigation mobile"
            className="border-b border-creme/10 bg-encre/95 px-6 pb-8 pt-2 backdrop-blur-sm"
          >
            <ul className="flex flex-col gap-5">
              {LINKS.map((link) => (
                <li key={link.view}>
                  <NavLink {...link} active={activeView === link.view} onNavigate={navigate} />
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center justify-between border-t border-creme/10 pt-6">
              <a
                href="mailto:nico@belaugure.studio"
                className="text-[12px] tracking-[0.08em] text-creme/90"
              >
                nico@belaugure.studio
              </a>
              <p className="text-[12px] font-light text-grege">
                Bordeaux, <time>{time}</time>
              </p>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
