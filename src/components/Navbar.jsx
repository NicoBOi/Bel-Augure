import { useEffect, useState } from 'react'

const LINKS = [
  { view: 'films', label: 'Films' },
  { view: 'offres', label: 'Offres' },
  { view: 'studio', label: 'Studio' },
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

  // Menu ouvert : Échap le referme, et le passage au format desktop le
  // referme aussi — sinon l'état "ouvert" survit au redimensionnement et
  // le panneau réapparaît déplié au retour en mobile.
  useEffect(() => {
    if (!open) return
    const mq = window.matchMedia('(min-width: 48rem)')
    const closeOnDesktop = () => {
      if (mq.matches) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    closeOnDesktop()
    mq.addEventListener('change', closeOnDesktop)
    window.addEventListener('keydown', onKey)
    return () => {
      mq.removeEventListener('change', closeOnDesktop)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Sur la scène d'ouverture le mot-symbole géant occupe l'écran : le logo
  // s'efface. Dès que le scroll lève le jour (dark tombe), il apparaît
  // comme sur les autres pages.
  const logoHidden = activeView === 'accueil' && dark

  return (
    <header className="absolute inset-x-0 top-0 z-10">
      {/* Voile givré couvrant tout le header (rangée + panneau) quand le menu est ouvert */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 backdrop-blur-xl transition-opacity duration-500 md:hidden ${
          dark ? 'bg-encre/25' : 'bg-creme/25'
        } ${open ? 'opacity-100' : 'opacity-0'}`}
      />
      <div className="relative grid grid-cols-[1fr_auto_1fr] items-center px-6 py-7 md:px-16 md:py-10">
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
          className={`cursor-pointer justify-self-center font-display text-[24px] tracking-[0.02em] transition-opacity md:text-[28px] ${
            dark ? 'text-creme' : 'text-encre'
          } ${logoHidden ? 'pointer-events-none opacity-0 duration-0' : 'opacity-100 duration-500'}`}
        >
          Bel Augure<span className="text-or">.</span>
        </button>

        <div className="hidden justify-self-end md:block">
          <a
            href="mailto:nicolas@belaugure.studio"
            className={`nav-link text-[12px] tracking-[0.08em] transition-colors duration-500 ${
              dark ? 'text-creme/75 hover:text-creme' : 'text-encre/80 hover:text-encre'
            }`}
          >
            <span className="nav-label">nicolas@belaugure.studio</span>
          </a>
        </div>
      </div>

      <div id="menu-mobile" data-open={open} className="menu-panel relative md:hidden">
        <div className="menu-panel-inner">
          <nav
            aria-label="Navigation mobile"
            className={`border-b px-6 pb-8 pt-2 ${
              dark ? 'border-creme/10' : 'border-encre/10'
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
                href="mailto:nicolas@belaugure.studio"
                className={`text-[12px] tracking-[0.08em] ${dark ? 'text-creme/75' : 'text-encre/80'}`}
              >
                nicolas@belaugure.studio
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
