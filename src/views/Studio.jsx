import { useReveal } from '../hooks/useReveal.js'

const ARTISANS = [
  { name: 'Nicolas', role: 'Direction, image, étalonnage' },
  { name: 'Corentin', role: 'Montage, motion design' },
]

export default function Studio() {
  const ref = useReveal(0.35)

  return (
    <section
      ref={ref}
      aria-label="Le studio"
      className="flex h-full flex-col px-6 pb-14 pt-28 max-md:overflow-y-auto md:px-16 md:pb-[9vh]"
    >
      {/* Ferré à gauche : les deux prénoms sur une ligne, le métier de
          chacun juste dessous, puis le récit et le credo. */}
      <div className="flex flex-1 flex-col justify-center text-left md:text-center">
        <div className="flex flex-nowrap items-start justify-start gap-x-4 md:justify-center md:gap-x-10">
          {ARTISANS.map((artisan, i) => (
            <div key={artisan.name} className="flex items-start gap-x-4 md:gap-x-10">
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="font-display text-[clamp(1.75rem,6vw,4.6rem)] leading-[1.05] text-or"
                >
                  &amp;
                </span>
              )}
              {/* Chaque bloc (prénom + métier) est ferré vers l'esperluette :
                  à droite pour le premier, à gauche pour le second. */}
              <div className={i === 0 ? 'text-right' : 'text-left'}>
                <p className="font-display text-[clamp(1.75rem,6vw,4.6rem)] leading-[1.05] text-encre">
                  <span className="mask" style={{ '--d': `${0.12 + i * 0.08}s` }}>
                    <span>{artisan.name}</span>
                  </span>
                </p>
                <p
                  className="reveal-up mt-4 text-[11px] font-normal uppercase tracking-[0.22em] text-grege"
                  style={{ '--d': `${0.3 + i * 0.08}s` }}
                >
                  {artisan.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="reveal-up mt-12 max-w-[60ch] space-y-5 text-[14px] font-light leading-[1.95] text-encre/80 md:mx-auto md:mt-14"
          style={{ '--d': '0.42s' }}
        >
          <p>
            Bel Augure c'est nous deux, Nicolas et Corentin. Quinze ans qu'on
            se connaît. L'un vient de l'événementiel, l'autre du cinéma et de
            la mode.
          </p>
          <p>
            On a longtemps travaillé chacun de son côté avant de se décider à
            monter quelque chose ensemble, à Bordeaux. Aujourd'hui on filme
            vos enseignes à deux pour continuer notre aventure.
          </p>
        </div>

        <p
          className="reveal-up mt-12 max-w-[46ch] font-display text-[clamp(1.1rem,1.5vw,1.4rem)] leading-[1.75] text-encre/85 md:mx-auto md:mt-14"
          style={{ '--d': '0.55s' }}
        >
          Peu de films par an. C'est ce qui nous permet de les faire bien
          <span className="text-or">.</span>
        </p>
      </div>

      <p className="mt-10 text-center text-[11px] font-light tracking-[0.04em] text-grege">
        Studio de production basé à Bordeaux
      </p>
    </section>
  )
}
