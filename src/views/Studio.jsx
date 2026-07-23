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
      className="flex h-full flex-col justify-between gap-10 px-6 pb-14 pt-28 max-md:overflow-y-auto md:px-16 md:pb-[9vh]"
    >
      {/* Le credo : grand, à gauche, la seconde ligne décalée comme un
          plan qui se recadre */}
      <div>

        <h2 className="mt-7 font-display text-[clamp(2.4rem,5vw,4.6rem)] leading-[1.14] text-encre">
          <span className="mask" style={{ '--d': '0.12s' }}>
            <span>
              Nicolas <span className="text-or">&amp;</span> Corentin
            </span>
          </span>
        </h2>
      </div>

      {/* Le récit, posé à droite : la diagonale éditoriale */}
      <div
        className="reveal-up max-w-[54ch] space-y-5 text-[14px] font-light leading-[1.95] text-encre/80 md:mr-[4vw] md:self-end"
        style={{ '--d': '0.3s' }}
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

      {/* La base partagée : le credo en exergue, les artisans en face */}
      <div className="grid gap-10 md:grid-cols-12 md:items-end">
        <p
          className="reveal-up font-display text-[clamp(1.1rem,1.5vw,1.4rem)] leading-[1.75] text-encre/85 md:col-span-7"
          style={{ '--d': '0.42s' }}
        >
          Peu de films par an. C'est ce qui nous permet de les faire bien
          <span className="text-or">.</span>
        </p>

        <div className="reveal-up md:col-span-4 md:col-start-9" style={{ '--d': '0.5s' }}>
          <span aria-hidden="true" className="mb-6 block h-px w-10 bg-or" />
          <div className="flex divide-x divide-encre/15">
            {ARTISANS.map((artisan, i) => (
              <div key={artisan.name} className={i === 0 ? 'pr-8 md:pr-10' : 'pl-8 md:pl-10'}>
                <p className="font-display text-[clamp(1.3rem,1.8vw,1.7rem)] text-encre">
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

      <p className="pt-4 text-center text-[11px] font-light tracking-[0.04em] text-grege">
        Studio de production basé à Bordeaux
      </p>
    </section>
  )
}
