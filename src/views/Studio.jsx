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
      {/* Une seule composition, ferrée à gauche : le nom en bandeau, puis
          le récit et les artisans alignés en haut, et le credo qui referme
          le bloc — tout centré verticalement d'un seul tenant. */}
      <div className="flex flex-1 flex-col justify-center">
        <h2 className="font-display text-[clamp(2.4rem,5vw,4.6rem)] leading-[1.14] text-encre">
          <span className="mask" style={{ '--d': '0.12s' }}>
            <span>
              Nicolas <span className="text-or">&amp;</span> Corentin
            </span>
          </span>
        </h2>

        <div className="mt-12 grid gap-12 md:mt-14 md:grid-cols-12 md:items-start md:gap-8">
          <p className="text-[14px] font-light leading-[1.95] text-encre/80 md:col-span-6">
            {[
              "Bel Augure c'est nous deux, Nicolas et Corentin.",
              "Quinze ans qu'on se connaît.",
              "L'un vient de l'événementiel,",
              "l'autre du cinéma et de la mode.",
              'On a longtemps travaillé chacun de son côté',
              'avant de se décider à monter quelque chose ensemble,',
              'à Bordeaux. Aujourd\'hui on filme vos enseignes',
              'à deux pour continuer notre aventure.',
            ].map((ligne, i) => (
              <span
                key={ligne}
                className="reveal-up block"
                style={{ paddingLeft: `${i * 0.95}rem`, '--d': `${0.28 + i * 0.06}s` }}
              >
                {ligne}
              </span>
            ))}
          </p>

          <div className="reveal-up md:col-span-4 md:col-start-9" style={{ '--d': '0.42s' }}>
            <span aria-hidden="true" className="mb-7 block h-px w-10 bg-or" />
            <div className="space-y-7">
              {ARTISANS.map((artisan) => (
                <div key={artisan.name}>
                  <p className="font-display text-[clamp(1.4rem,2vw,1.9rem)] text-encre">
                    {artisan.name}
                  </p>
                  <p className="mt-1.5 text-[12px] font-light tracking-[0.04em] text-grege">
                    {artisan.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p
          className="reveal-up mt-14 max-w-[42ch] font-display text-[clamp(1.1rem,1.5vw,1.4rem)] leading-[1.75] text-encre/85 md:mt-16"
          style={{ '--d': '0.5s' }}
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
