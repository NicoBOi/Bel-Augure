import { useEffect, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'
import VimeoBackground from '../components/VimeoBackground.jsx'
import VideoLoader from '../components/VideoLoader.jsx'

// Un seul film pour l'instant, montré en grand. En ajouter un ici suffit :
// la page empile les films les uns sous les autres, même mise en scène.
const FILMS = [
  {
    id: 'jetee-dares',
    vimeoId: '1211391558',
    title: "Les Pieds Dans L'eau",
    world: "Bassin d'Arcachon",
    desc: "Voici le premier film de Bel Augure. Quelques images tournées sur le bassin d'Arcachon, un matin de marée montante. Rien à vendre, juste notre regard. C'est ce même regard qu'on pose sur votre lieu.",
  },
]

export default function Films({ setDark }) {
  const ref = useReveal(0.35)
  const [ready, setReady] = useState({})
  const [sound, setSound] = useState({})

  // Le film se regarde dans l'encre, comme en salle.
  useEffect(() => {
    setDark?.(true)
  }, [setDark])

  return (
    <section
      ref={ref}
      aria-label="Films"
      className="flex h-full flex-col justify-start overflow-y-auto px-6 pb-14 pt-28 md:px-16 md:pb-[9vh]"
    >
      <p
        className="reveal-up text-[11px] font-normal uppercase tracking-[0.3em] text-sable/60"
        style={{ '--d': '0.05s' }}
      >
        Films
      </p>

      {FILMS.map((film) => (
        <div key={film.id} className="mt-10 md:mt-12">
          <p
            className="reveal-up text-[11px] font-normal uppercase tracking-[0.3em] text-sable/60"
            style={{ '--d': '0.1s' }}
          >
            {film.world}
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.8rem,6.5vw,6rem)] leading-[1.02] text-creme">
            <span className="mask" style={{ '--d': '0.15s' }}>
              <span>
                {film.title}
                <span className="dot-breathe text-or">.</span>
              </span>
            </span>
          </h2>

          <div className="mt-8 grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-creme/15 bg-encre">
                {!ready[film.id] && <VideoLoader />}
                <VimeoBackground
                  id={film.vimeoId}
                  title={film.title}
                  soundOn={!!sound[film.id]}
                  onPlaying={() => setReady((s) => ({ ...s, [film.id]: true }))}
                  className="absolute inset-0 h-full w-full"
                />
                {ready[film.id] && (
                  <button
                    type="button"
                    aria-pressed={!!sound[film.id]}
                    onClick={() => setSound((s) => ({ ...s, [film.id]: !s[film.id] }))}
                    className="nav-link absolute bottom-4 right-6 z-[1] cursor-pointer py-1 text-[10px] font-normal uppercase tracking-[0.22em] text-creme/75 transition-colors duration-500 hover:text-creme"
                  >
                    <span className="nav-label">
                      {sound[film.id] ? 'Couper le son' : 'Activer le son'}
                    </span>
                  </button>
                )}
              </div>
            </div>

            <div className="lg:col-span-4">
              <p
                className="reveal-up max-w-[44ch] text-[13.5px] font-light leading-[1.9] text-sable/90"
                style={{ '--d': '0.3s' }}
              >
                {film.desc}
              </p>
            </div>
          </div>
        </div>
      ))}

      <p className="mt-14 text-[11px] font-light tracking-[0.04em] text-sable/60">
        Bel Augure — films pour l'hôtellerie et le bien-être. Bordeaux.
      </p>
    </section>
  )
}
