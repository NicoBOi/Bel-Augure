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
    desc: "Voici le premier film de Bel Augure. Quelques images tournées sur le bassin d'Arcachon, au crépuscule d'une marée montante.",
  },
]

export default function Films({ setDark }) {
  const ref = useReveal(0.35)
  const [ready, setReady] = useState({})

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
        <div key={film.id} className="mt-10 grid items-center gap-8 md:mt-12 lg:grid-cols-12 lg:gap-10">
          <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-creme/15 bg-encre lg:col-span-7">
            {!ready[film.id] && <VideoLoader />}
            <VimeoBackground
              id={film.vimeoId}
              title={film.title}
              controls
              onPlaying={() => setReady((s) => ({ ...s, [film.id]: true }))}
              className="absolute inset-0 h-full w-full"
            />
          </div>

          <div className="lg:col-span-5">
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

      <p className="mt-14 text-[11px] font-light tracking-[0.04em] text-sable/60">
        Bel Augure — films pour l'hôtellerie et le bien-être. Bordeaux.
      </p>
    </section>
  )
}
