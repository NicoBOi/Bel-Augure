import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'
import VimeoBackground from '../components/VimeoBackground.jsx'
import VideoLoader from '../components/VideoLoader.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import { useVimeoThumb } from '../hooks/useVimeoThumb.js'

// Photogramme fixe posé sous le lecteur, comme sur l'accueil et les offres :
// si Vimeo échoue (réseau, session expirée…), la scène retombe sur cette
// image plutôt que sur un aplat uni ou l'écran d'erreur natif du player.
function FilmPoster({ vimeoId }) {
  const thumb = useVimeoThumb(vimeoId, 960)
  if (!thumb) return null
  return (
    <img
      src={thumb}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover"
    />
  )
}

// Un seul film pour l'instant, montré en grand et centré. En ajouter un ici
// suffit : la page empile les films les uns sous les autres, même mise en scène.
const FILMS = [
  {
    id: 'jetee-dares',
    vimeoId: '1211391558',
    title: "Les Pieds dans l'eau",
    world: "Bassin d'Arcachon",
    desc: "Un film tourné sur le bassin d'Arcachon, au crépuscule d'une marée montante.",
  },
]

export default function Films({ setDark, onNavigate }) {
  const ref = useReveal(0.35)
  const [ready, setReady] = useState({})
  const [sound, setSound] = useState({})
  const [paused, setPaused] = useState({})
  const stageRefs = useRef({})

  // Le film se pose sur l'or pâle de la charte : fond chaud, texte encre.
  useEffect(() => {
    setDark?.(false)
  }, [setDark])

  // Le plein écran natif n'existe pas sur iPhone (l'API Fullscreen n'y
  // couvre pas les éléments) : on masque le bouton là où c'est impossible.
  const canFullscreen =
    typeof document !== 'undefined' &&
    (document.fullscreenEnabled || document.webkitFullscreenEnabled)

  // Plein écran de la scène du film : l'image emplit l'écran, l'encre
  // disparaît, seul le film reste. Préfixe webkit pour Safari.
  const enlarge = (id) => {
    const el = stageRefs.current[id]
    if (!el) return
    const fsEl = document.fullscreenElement || document.webkitFullscreenElement
    if (fsEl) {
      ;(document.exitFullscreen || document.webkitExitFullscreen)?.call(document)
    } else {
      ;(el.requestFullscreen || el.webkitRequestFullscreen)?.call(el)
    }
  }

  return (
    <section
      ref={ref}
      aria-label="Films"
      className="flex h-full flex-col overflow-y-auto bg-or py-24"
    >
      <div className="mx-auto w-full lg:flex lg:max-w-[1500px] lg:flex-1 lg:flex-col lg:justify-center lg:px-16">
        {FILMS.map((film) => (
          <div
            key={film.id}
            className="mt-8 lg:mt-12 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10"
          >
            {/* La scène n'est pas un bouton (elle contiendrait des boutons —
                anti-pattern ARIA) : le clic pour mettre en pause est un
                confort pointeur. La pause au clavier passe par un bouton
                dédié dans les contrôles ci-dessous. */}
            <div
              ref={(el) => (stageRefs.current[film.id] = el)}
              onClick={(e) => {
                if (!ready[film.id]) return
                // Un appui sur les contrôles (pause, son, plein écran) est ignoré.
                if (e.target.closest('[data-ctrl]')) return
                setPaused((s) => ({ ...s, [film.id]: !s[film.id] }))
              }}
              className="film-stage relative aspect-video w-full cursor-pointer overflow-hidden bg-encre lg:col-span-8 lg:rounded-3xl"
            >
              <FilmPoster vimeoId={film.vimeoId} />
              {!ready[film.id] && <VideoLoader />}
              <VimeoBackground
                id={film.vimeoId}
                title={film.title}
                background={false}
                soundOn={!!sound[film.id]}
                paused={!!paused[film.id]}
                onPlaying={() => setReady((s) => ({ ...s, [film.id]: true }))}
                onError={() => setReady((s) => ({ ...s, [film.id]: false }))}
                className="absolute inset-0 h-full w-full"
              />

              {/* Voyant lecture au centre quand la vidéo est en pause. */}
              {ready[film.id] && paused[film.id] && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 z-[1] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-encre/40 text-creme backdrop-blur-sm"
                >
                  <IconPlay />
                </span>
              )}

              {/* data-ctrl : ces boutons sont ignorés par le clic-pause. */}
              {ready[film.id] && (
                <div
                  data-ctrl
                  className="absolute bottom-4 right-4 z-[2] flex items-center gap-1 rounded-full bg-encre/35 px-1.5 py-1 backdrop-blur-sm"
                >
                  <button
                    type="button"
                    aria-pressed={!!paused[film.id]}
                    aria-label={paused[film.id] ? 'Reprendre la lecture' : 'Mettre en pause'}
                    onClick={() => setPaused((s) => ({ ...s, [film.id]: !s[film.id] }))}
                    className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-creme/70 transition-colors duration-500 hover:bg-creme/10 hover:text-creme"
                  >
                    {paused[film.id] ? <IconPlaySmall /> : <IconPause />}
                  </button>
                  <button
                    type="button"
                    aria-pressed={!!sound[film.id]}
                    aria-label={sound[film.id] ? 'Couper le son' : 'Activer le son'}
                    onClick={() => setSound((s) => ({ ...s, [film.id]: !s[film.id] }))}
                    className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-creme/70 transition-colors duration-500 hover:bg-creme/10 hover:text-creme"
                  >
                    {sound[film.id] ? <IconSoundOn /> : <IconSoundOff />}
                  </button>
                  {canFullscreen && (
                    <button
                      type="button"
                      aria-label="Agrandir la vidéo en plein écran"
                      onClick={() => enlarge(film.id)}
                      className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-creme/70 transition-colors duration-500 hover:bg-creme/10 hover:text-creme"
                    >
                      <IconFullscreen />
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="px-6 lg:col-span-4 lg:px-0">
              <p
                className="reveal-up mt-8 text-[11px] font-normal uppercase tracking-[0.3em] text-encre/55 lg:mt-0"
                style={{ '--d': '0.1s' }}
              >
                {film.world}
              </p>
              <h1 className="mt-4 font-display text-[clamp(2.4rem,4vw,3.8rem)] leading-[1.05] text-encre">
                <span className="mask" style={{ '--d': '0.15s' }}>
                  <span>
                    {film.title}
                    <span className="dot-breathe text-or">.</span>
                  </span>
                </span>
              </h1>
              <p
                className="reveal-up mt-6 max-w-[46ch] text-[13.5px] font-light leading-[1.9] text-encre/80"
                style={{ '--d': '0.3s' }}
              >
                {film.desc}
              </p>
              <button
                type="button"
                onClick={() => onNavigate?.('contact')}
                className="reveal-up mt-9 inline-flex cursor-pointer items-center justify-center rounded-full border border-encre/45 px-8 py-3.5 text-[13px] font-normal tracking-[0.06em] text-encre transition-colors duration-300 hover:bg-encre hover:text-creme"
                style={{ '--d': '0.42s' }}
              >
                Écrivons votre film
              </button>
            </div>
          </div>
        ))}
      </div>

      <SiteFooter
        onNavigate={onNavigate}
        tone="or"
        className="mx-auto mt-auto w-full px-6 pt-16 lg:max-w-[1500px] lg:px-16"
      />
    </section>
  )
}

// Icônes minces, dessinées à la charte : traits fins, couleur héritée du bouton.
function IconSoundOn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9H4z" />
      <path d="M16.5 8.5a5 5 0 0 1 0 7" />
      <path d="M19 6a8 8 0 0 1 0 12" />
    </svg>
  )
}

function IconSoundOff() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9H4z" />
      <path d="M17 9.5l4 5" />
      <path d="M21 9.5l-4 5" />
    </svg>
  )
}

function IconFullscreen() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 3H3v5" />
      <path d="M16 3h5v5" />
      <path d="M21 16v5h-5" />
      <path d="M3 16v5h5" />
    </svg>
  )
}

function IconPlay() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

// Petites icônes pour le bouton lecture/pause des contrôles.
function IconPlaySmall() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function IconPause() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <path d="M9 5v14M15 5v14" />
    </svg>
  )
}
