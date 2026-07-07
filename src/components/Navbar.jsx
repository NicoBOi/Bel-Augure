import { useEffect, useState } from 'react'

const LINKS = [
  { index: '01', label: 'Films', href: '#films' },
  { index: '02', label: 'Studio', href: '#studio' },
  { index: '03', label: 'Offres', href: '#offres' },
  { index: '04', label: 'Contact', href: '#contact' },
]

function formatBordeauxTime() {
  return new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Paris',
  }).format(new Date())
}

function useBordeauxClock() {
  const [time, setTime] = useState(formatBordeauxTime)

  useEffect(() => {
    const interval = setInterval(() => setTime(formatBordeauxTime()), 15_000)
    return () => clearInterval(interval)
  }, [])

  return time
}

function NavLink({ index, label, href, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="nav-link group inline-flex items-baseline gap-2 py-1 text-[13px] font-normal tracking-[0.04em] text-creme"
    >
      <span className="text-[10px] font-medium tabular-nums text-grege transition-colors duration-500 group-hover:text-or">
        {index}
      </span>
      <span className="text-grege">/</span>
      <span className="nav-label">{label}</span>
    </a>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const time = useBordeauxClock()

  return (
    <header className="absolute inset-x-0 top-0 z-10">
      <div className="flex items-center justify-between px-6 py-6 md:px-10 md:py-7">
        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {LINKS.map((link) => (
              <li key={link.index}>
                <NavLink {...link} />
              </li>
            ))}
          </ul>
        </nav>

        {/* Marque discrète côté mobile, la nav passe dans le panneau */}
        <a
          href="/"
          className="font-display text-lg text-creme md:hidden"
          aria-label="Bel Augure, accueil"
        >
          Bel Augure<span className="text-or">.</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <a
            href="mailto:nico@belaugure.studio"
            className="nav-link text-[13px] tracking-[0.04em] text-creme"
          >
            <span className="nav-label">nico@belaugure.studio</span>
          </a>
          <p className="text-[13px] tracking-[0.14em] text-grege">
            BORDEAUX <time className="tabular-nums text-sable">{time}</time>
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
                <li key={link.index}>
                  <NavLink {...link} onClick={() => setOpen(false)} />
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center justify-between border-t border-creme/10 pt-6">
              <a
                href="mailto:nico@belaugure.studio"
                className="text-[13px] tracking-[0.04em] text-creme"
              >
                nico@belaugure.studio
              </a>
              <p className="text-[12px] tracking-[0.14em] text-grege">
                BORDEAUX <time className="tabular-nums text-sable">{time}</time>
              </p>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
