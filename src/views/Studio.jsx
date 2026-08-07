import { useReveal } from '../hooks/useReveal.js'

export default function Studio({ onNavigate }) {
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
          className="reveal-up mx-auto mt-8 max-w-[38rem] space-y-4 text-[15px] font-light leading-[1.85] text-encre/80"
          style={{ '--d': '0.42s', textWrap: 'pretty' }}
        >
          <p>
            Bel Augure est un studio neuf&nbsp;; ses fondateurs ne le sont pas.
            Nicolas Sempere et Corentin Crestia, quinze ans d'amitié, ont chacun
            fait leurs armes de leur côté — Nicolas dans l'événementiel,
            Corentin sur les plateaux, entre cinéma et mode — avant de réunir
            leurs deux métiers dans un même studio.
          </p>
          <p>
            Ensemble, nous prenons en charge tout votre film, de la première
            idée à la dernière image&nbsp;: l'écriture et la direction, le
            tournage, puis toute la postproduction, réalisée en interne, à
            Bordeaux. Un seul interlocuteur, deux regards sur chaque plan.
          </p>
        </div>

        <p
          className="reveal-up mx-auto mt-9 max-w-[38rem] font-display text-[clamp(1.1rem,1.5vw,1.4rem)] leading-[1.75] text-encre/85"
          style={{ '--d': '0.55s', textWrap: 'balance' }}
        >
          Filmer celles et ceux qui prennent soin des autres, c'est exactement
          ce que nous avons choisi de faire
          <span className="text-or">.</span>
        </p>

        <p className="reveal-up mx-auto mt-10 text-left md:text-center" style={{ '--d': '0.65s' }}>
          <button
            type="button"
            onClick={() => onNavigate?.('contact')}
            className="inline-flex cursor-pointer items-center justify-center rounded-full border border-encre/45 px-8 py-3.5 text-[13px] font-normal tracking-[0.06em] text-encre transition-colors duration-300 hover:bg-encre hover:text-creme"
          >
            Parler de votre projet
          </button>
        </p>
      </div>

      <p className="mt-10 text-center text-[11px] font-light tracking-[0.04em] text-grege">
        Studio de production basé à Bordeaux
      </p>
    </section>
  )
}
