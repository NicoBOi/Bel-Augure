import { useState } from 'react'

const LINKS = [
  { view: 'films', label: 'Films' },
  { view: 'studio', label: 'Studio' },
  { view: 'offres', label: 'Offres' },
  { view: 'contact', label: 'Contact' },
]

function NavLink({ view, label, active, onNavigate, dark }) {
  return (
    <button
      type="button"
      onClick={() => onNavigate(view)}
      aria-current={active ? 'page' : undefined}
      className={`nav-link inline-block cursor-pointer py-3 -my-2 text-[12px] font-normal tracking-[0.08em] transition-colors duration-500 ${
        dark ? 'text-creme/75 hover:text-creme' : 'text-encre/80 hover:text-encre'
      }`}
    >
      <span className="nav-label">{label}</span>
    </button>
  )
}

export default function Navbar({ activeView, onNavigate, dark }) {
  const [open, setOpen] = useState(false)

  const navigate = (view) => {
    onNavigate(view)
    setOpen(false)
  }

  // Sur la scène d'ouverture le mot-symbole géant occupe l'écran : le logo
  // s'efface. Dès que le scroll lève le jour (dark tombe), il apparaît
  // comme sur les autres pages.
  const logoHidden = activeView === 'accueil' && dark

  return (
    <header className="absolute inset-x-0 top-0 z-10">
      <div
        className={`grid grid-cols-[1fr_auto_1fr] items-center px-6 py-7 transition-colors duration-700 max-md:backdrop-blur-sm md:px-16 md:py-10 ${
          dark ? 'max-md:bg-encre/85' : 'max-md:bg-creme/85'
        }`}
      >
        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex items-center gap-12">
            {LINKS.map((link) => (
              <li key={link.view}>
                <NavLink
                  {...link}
                  active={activeView === link.view}
                  onNavigate={navigate}
                  dark={dark}
                />
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="relative flex h-11 w-11 items-center justify-center justify-self-start md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`absolute h-px w-6 bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              open ? 'rotate-45' : '-translate-y-[4px]'
            }`}
          />
          <span
            className={`absolute h-px w-6 bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              open ? '-rotate-45' : 'translate-y-[4px]'
            }`}
          />
        </button>

        {/* Logo centré, retour accueil depuis n'importe quelle vue */}
        <button
          type="button"
          onClick={() => navigate('accueil')}
          aria-label="Bel Augure, retour à l'accueil"
          tabIndex={logoHidden ? -1 : 0}
          className={`cursor-pointer justify-self-center font-display text-[19px] tracking-[0.02em] transition-opacity duration-500 ${
            dark ? 'text-creme' : 'text-encre'
          } ${logoHidden ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
        >
          Bel Augure<span className="text-or">.</span>
        </button>

        <div className="hidden justify-self-end md:block">
          <a
            href="mailto:nico@belaugure.studio"
            className={`nav-link text-[12px] tracking-[0.08em] transition-colors duration-500 ${
              dark ? 'text-creme/75 hover:text-creme' : 'text-encre/80 hover:text-encre'
            }`}
          >
            <span className="nav-label">nico@belaugure.studio</span>
          </a>
        </div>
      </div>

      <div id="menu-mobile" data-open={open} className="menu-panel md:hidden">
        <div className="menu-panel-inner">
          <nav
            aria-label="Navigation mobile"
            className={`border-b px-6 pb-8 pt-2 backdrop-blur-sm ${
              dark ? 'border-creme/10 bg-encre/95' : 'border-encre/10 bg-creme/95'
            }`}
          >
            <ul className="flex flex-col gap-5">
              {LINKS.map((link) => (
                <li key={link.view}>
                  <NavLink
                    {...link}
                    active={activeView === link.view}
                    onNavigate={navigate}
                    dark={dark}
                  />
                </li>
              ))}
            </ul>
            <div className={`mt-8 border-t pt-6 ${dark ? 'border-creme/10' : 'border-encre/10'}`}>
              <a
                href="mailto:nico@belaugure.studio"
                className={`text-[12px] tracking-[0.08em] ${dark ? 'text-creme/75' : 'text-encre/80'}`}
              >
                nico@belaugure.studio
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
