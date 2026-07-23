import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'
import VimeoBackground from '../components/VimeoBackground.jsx'
import VideoLoader from '../components/VideoLoader.jsx'

// Un seul film pour l'instant, montré en grand et centré. En ajouter un ici
// suffit : la page empile les films les uns sous les autres, même mise en scène.
const FILMS = [
  {
    id: 'jetee-dares',
    vimeoId: '1211391558',
    title: "Les Pieds Dans L'eau",
    world: "Bassin d'Arcachon",
    desc: "Voici le premier film de Bel Augure. Quelques images tournées sur le bassin d'Arcachon, au crépuscule d'une marée montante.",
  },
]

export default function Films({ setDark }) {
  const ref = useReveal(0.35)
  const [ready, setReady] = useState({})
  const [sound, setSound] = useState({})
  const [paused, setPaused] = useState({})
  const stageRefs = useRef({})

  // Le film se regarde dans l'encre, comme en salle.
  useEffect(() => {
    setDark?.(true)
  }, [setDark])

  // Plein écran natif du navigateur sur la scène du film : l'image emplit
  // l'écran, l'encre disparaît, seul le film reste.
  const enlarge = (id) => {
    const el = stageRefs.current[id]
    if (!el) return
    if (document.fullscreenElement) document.exitFullscreen?.()
    else el.requestFullscreen?.()
  }

  return (
    <section
      ref={ref}
      aria-label="Films"
      className="flex h-full flex-col overflow-y-auto py-24"
    >
      <div className="mx-auto flex w-full max-w-[1700px] flex-1 flex-col justify-center">
        <p
          className="reveal-up px-6 text-[11px] font-normal uppercase tracking-[0.3em] text-sable/60 md:px-16"
          style={{ '--d': '0.05s' }}
        >
          Films
        </p>

        {FILMS.map((film) => (
          <div key={film.id} className="mt-8">
            <div
              ref={(el) => (stageRefs.current[film.id] = el)}
              className="film-stage relative aspect-video w-full overflow-hidden bg-encre"
            >
              {!ready[film.id] && <VideoLoader />}
              <VimeoBackground
                id={film.vimeoId}
                title={film.title}
                soundOn={!!sound[film.id]}
                paused={!!paused[film.id]}
                onPlaying={() => setReady((s) => ({ ...s, [film.id]: true }))}
                className="absolute inset-0 h-full w-full"
              />

              {/* Toute la surface est cliquable : un clic met en pause ou
                  relance. Les boutons (son, plein écran) passent au-dessus. */}
              {ready[film.id] && (
                <button
                  type="button"
                  aria-label={paused[film.id] ? 'Reprendre la lecture' : 'Mettre en pause'}
                  onClick={() => setPaused((s) => ({ ...s, [film.id]: !s[film.id] }))}
                  className="absolute inset-0 z-[1] cursor-pointer"
                >
                  {paused[film.id] && (
                    <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-encre/40 text-creme backdrop-blur-sm">
                      <IconPlay />
                    </span>
                  )}
                </button>
              )}

              {ready[film.id] && (
                <div className="absolute bottom-4 right-5 z-[2] flex items-center gap-3">
                  <button
                    type="button"
                    aria-pressed={!!sound[film.id]}
                    aria-label={sound[film.id] ? 'Couper le son' : 'Activer le son'}
                    onClick={() => setSound((s) => ({ ...s, [film.id]: !s[film.id] }))}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-creme/70 transition-colors duration-500 hover:bg-creme/10 hover:text-creme"
                  >
                    {sound[film.id] ? <IconSoundOn /> : <IconSoundOff />}
                  </button>
                  <button
                    type="button"
                    aria-label="Agrandir la vidéo en plein écran"
                    onClick={() => enlarge(film.id)}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-creme/70 transition-colors duration-500 hover:bg-creme/10 hover:text-creme"
                  >
                    <IconFullscreen />
                  </button>
                </div>
              )}
            </div>

            <div className="px-6 md:px-16">
              <p
                className="reveal-up mt-8 text-[11px] font-normal uppercase tracking-[0.3em] text-sable/60"
                style={{ '--d': '0.1s' }}
              >
                {film.world}
              </p>
              <h2 className="mt-4 font-display text-[clamp(2.4rem,4vw,3.8rem)] leading-[1.05] text-creme">
                <span className="mask" style={{ '--d': '0.15s' }}>
                  <span>
                    {film.title}
                    <span className="dot-breathe text-or">.</span>
                  </span>
                </span>
              </h2>
              <p
                className="reveal-up mt-6 max-w-[46ch] text-[13.5px] font-light leading-[1.9] text-sable/90"
                style={{ '--d': '0.3s' }}
              >
                {film.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-16 w-full max-w-[1700px] px-6 text-center text-[11px] font-light tracking-[0.04em] text-sable/60 md:px-16">
        Bel Augure — films pour l'hôtellerie et le bien-être. Bordeaux.
      </p>
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
