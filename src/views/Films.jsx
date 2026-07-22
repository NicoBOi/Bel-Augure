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
      className="flex h-full flex-col justify-center overflow-y-auto px-6 py-24 md:px-16"
    >
      <div className="mx-auto w-full max-w-[1500px]">
        <p
          className="reveal-up text-[11px] font-normal uppercase tracking-[0.3em] text-sable/60"
          style={{ '--d': '0.05s' }}
        >
          Films
        </p>

        {FILMS.map((film) => (
          <div key={film.id} className="mt-10 grid items-center gap-8 md:mt-12 lg:grid-cols-12 lg:gap-10">
            <div
              ref={(el) => (stageRefs.current[film.id] = el)}
              className="relative aspect-video w-full overflow-hidden rounded-3xl border border-creme/15 bg-encre lg:col-span-8"
            >
              {!ready[film.id] && <VideoLoader />}
              <VimeoBackground
                id={film.vimeoId}
                title={film.title}
                soundOn={!!sound[film.id]}
                onPlaying={() => setReady((s) => ({ ...s, [film.id]: true }))}
                className="absolute inset-0 h-full w-full"
              />

              {ready[film.id] && (
                <div className="absolute bottom-4 right-6 z-[1] flex items-center gap-6">
                  <button
                    type="button"
                    aria-pressed={!!sound[film.id]}
                    onClick={() => setSound((s) => ({ ...s, [film.id]: !s[film.id] }))}
                    className="nav-link cursor-pointer py-1 text-[10px] font-normal uppercase tracking-[0.22em] text-creme/75 transition-colors duration-500 hover:text-creme"
                  >
                    <span className="nav-label">
                      {sound[film.id] ? 'Couper le son' : 'Activer le son'}
                    </span>
                  </button>
                  <button
                    type="button"
                    aria-label="Agrandir la vidéo en plein écran"
                    onClick={() => enlarge(film.id)}
                    className="nav-link cursor-pointer py-1 text-[10px] font-normal uppercase tracking-[0.22em] text-creme/75 transition-colors duration-500 hover:text-creme"
                  >
                    <span className="nav-label">Plein écran</span>
                  </button>
                </div>
              )}
            </div>

            <div className="lg:col-span-4">
              <p
                className="reveal-up text-[11px] font-normal uppercase tracking-[0.3em] text-sable/60"
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
    </section>
  )
}
