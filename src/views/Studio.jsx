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
      className="flex h-full flex-col gap-10 px-6 pb-14 pt-28 max-md:overflow-y-auto md:px-16 md:pb-[9vh]"
    >
      {/* Deux colonnes, tout ferré à gauche : le nom et le récit à gauche,
          les deux artisans (nom + métier) posés à droite, en regard. */}
      <div className="flex flex-1 flex-col justify-center">
        <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-8">
          <div className="md:col-span-7">
            <h2 className="font-display text-[clamp(2.4rem,5vw,4.6rem)] leading-[1.14] text-encre">
              <span className="mask" style={{ '--d': '0.12s' }}>
                <span>
                  Nicolas <span className="text-or">&amp;</span> Corentin
                </span>
              </span>
            </h2>

            <div
              className="reveal-up mt-9 max-w-[54ch] space-y-5 text-[14px] font-light leading-[1.95] text-encre/80"
              style={{ '--d': '0.3s' }}
            >
              <p>
                Bel Augure c'est nous deux, Nicolas et Corentin. Quinze ans
                qu'on se connaît. L'un vient de l'événementiel, l'autre du
                cinéma et de la mode.
              </p>
              <p>
                On a longtemps travaillé chacun de son côté avant de se
                décider à monter quelque chose ensemble, à Bordeaux.
                Aujourd'hui on filme vos enseignes à deux pour continuer
                notre aventure.
              </p>
            </div>
          </div>

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
      </div>

      {/* Le credo, en exergue tout en bas */}
      <p
        className="reveal-up max-w-[42ch] font-display text-[clamp(1.1rem,1.5vw,1.4rem)] leading-[1.75] text-encre/85"
        style={{ '--d': '0.5s' }}
      >
        Peu de films par an. C'est ce qui nous permet de les faire bien
        <span className="text-or">.</span>
      </p>

      <p className="pt-4 text-center text-[11px] font-light tracking-[0.04em] text-grege">
        Studio de production basé à Bordeaux
      </p>
    </section>
  )
}
