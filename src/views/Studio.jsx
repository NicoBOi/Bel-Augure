import { useReveal } from '../hooks/useReveal.js'

const PRINCIPES = [
  'La lumière naturelle, jamais les projecteurs.',
  "Le son travaillé au niveau de l'image.",
  'Neuf films par an, pas un de plus.',
]

const ARTISANS = [
  { name: 'Nico', role: 'Direction, image, étalonnage' },
  { name: 'Corentin', role: 'Montage, motion design' },
]

export default function Studio() {
  const ref = useReveal(0.35)

  return (
    <section
      ref={ref}
      aria-label="Le studio"
      className="scroll-fade flex h-full flex-col justify-between gap-10 px-6 pb-14 pt-28 max-md:overflow-y-auto md:px-16 md:pb-[9vh]"
    >
      {/* Le credo : grand, à gauche, la seconde ligne décalée comme un
          plan qui se recadre */}
      <div>
        <p
          className="reveal-up text-[11px] font-normal uppercase tracking-[0.3em] text-grege"
          style={{ '--d': '0.05s' }}
        >
          Le studio
        </p>

        <h2 className="mt-7 font-display text-[clamp(2.4rem,5vw,4.6rem)] leading-[1.14] text-encre">
          <span className="mask" style={{ '--d': '0.12s' }}>
            <span>Nous sommes deux.</span>
          </span>
          <span className="mask md:ml-[10vw]" style={{ '--d': '0.2s' }}>
            <span>
              Nous restons deux<span className="text-or">.</span>
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
          Nico et Corentin. Amis depuis l'enfance, associés aujourd'hui.
          Celui qui vous serre la main est celui qui fera le film — au
          studio, il n'y a personne d'autre, et c'est voulu.
        </p>
        <p>
          Nous avons créé Bel Augure à Bordeaux parce que le bien-être
          d'exception méritait du cinéma, et que personne ne lui en faisait.
          Nous tournons à la lumière du jour. Nous prenons le temps. Le film
          se regarde encore dans trois ans.
        </p>
      </div>

      {/* La base partagée : les principes en exergue, les artisans en face */}
      <div className="grid gap-10 md:grid-cols-12 md:items-end">
        <blockquote className="reveal-up md:col-span-7" style={{ '--d': '0.42s' }}>
          <p className="font-display text-[clamp(1.1rem,1.5vw,1.4rem)] leading-[1.75] text-encre/85">
            <span aria-hidden="true" className="text-or">«&nbsp;</span>
            {PRINCIPES.map((principe, i) => (
              <span key={principe}>
                {principe}
                {i < PRINCIPES.length - 1 && <br />}
              </span>
            ))}
            <span aria-hidden="true" className="text-or">&nbsp;»</span>
          </p>
        </blockquote>

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
    </section>
  )
}
