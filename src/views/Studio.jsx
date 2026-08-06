import { useReveal } from '../hooks/useReveal.js'

export default function Studio() {
  const ref = useReveal(0.35)

  return (
    <section
      ref={ref}
      aria-label="Le studio"
      className="flex h-full flex-col px-6 pb-14 pt-28 overflow-y-auto md:px-16 md:pb-[9vh]"
    >
      {/* Le titre, ferré à gauche en mobile, centré en desktop, sur une ligne. */}
      <div className="flex flex-1 flex-col justify-center text-left md:text-center">
        <p
          className="reveal-up mb-5 text-[11px] font-normal uppercase tracking-[0.3em] text-orfonce md:mb-6"
          style={{ '--d': '0.06s' }}
        >
          Studio de production · Bordeaux
        </p>
        <h1 className="font-display text-[clamp(1.55rem,8.5vw,4.6rem)] leading-[1.1] text-encre">
          <span className="mask" style={{ '--d': '0.12s' }}>
            <span className="whitespace-nowrap">
              Nicolas <span className="text-or">&amp;</span> Corentin
            </span>
          </span>
        </h1>

        <div
          className="reveal-up mt-12 max-w-[60ch] space-y-5 text-[15px] font-light leading-[1.95] text-encre/85 md:mx-auto md:mt-14"
          style={{ '--d': '0.42s' }}
        >
          <p>
            Bel Augure, c'est nous deux&nbsp;: Nicolas et Corentin. Quinze ans
            d'amitié et deux parcours qui se complètent — l'un vient de
            l'événementiel, l'autre du cinéma et de la mode.
          </p>
          <p>
            Ensemble, nous prenons en charge tout votre film, de la première
            idée à la dernière image&nbsp;: l'écriture et la direction, le
            tournage, puis toute la postproduction, réalisée à Bordeaux dans
            notre studio. Un seul interlocuteur, deux regards sur chaque plan.
          </p>
        </div>

        <p
          className="reveal-up mt-12 max-w-[46ch] font-display text-[clamp(1.1rem,1.5vw,1.4rem)] leading-[1.75] text-encre/85 md:mx-auto md:mt-14"
          style={{ '--d': '0.55s' }}
        >
          Filmer celles et ceux qui prennent soin des autres, c'est exactement
          ce que nous avons choisi de faire
          <span className="text-or">.</span>
        </p>
      </div>

      <p className="mt-10 text-center text-[11px] font-light tracking-[0.04em] text-grege">
        Studio de production basé à Bordeaux
      </p>
    </section>
  )
}
