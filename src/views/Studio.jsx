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
      className="flex h-full flex-col items-center justify-start px-6 pb-14 pt-28 text-center max-md:overflow-y-auto md:px-16 md:pb-[9vh]"
    >
      <p
        className="reveal-up text-[11px] font-normal uppercase tracking-[0.3em] text-grege"
        style={{ '--d': '0.05s' }}
      >
        Le studio
      </p>

      {/* Le credo de la maison */}
      <h2 className="mt-8 max-w-[26ch] font-display text-[clamp(2.2rem,4.2vw,3.8rem)] leading-[1.2] text-encre">
        <span className="mask" style={{ '--d': '0.12s' }}>
          <span>Ceux qui vendent le film</span>
        </span>
        <span className="mask" style={{ '--d': '0.2s' }}>
          <span>
            sont ceux qui le fabriquent<span className="text-or">.</span>
          </span>
        </span>
      </h2>

      {/* Le récit et les principes respirent au centre de la page */}
      <div className="flex flex-1 flex-col items-center justify-center py-4">
      <div
        className="reveal-up max-w-[60ch] space-y-5 text-[14px] font-light leading-[1.95] text-encre/80"
        style={{ '--d': '0.3s' }}
      >
        <p>
          Bel Augure est né à Bordeaux d'une conviction simple : les maisons
          d'exception méritent des images qui leur ressemblent. Nous sommes
          deux artisans, et nous restons deux. Celui qui écoute votre
          histoire est celui qui cadrera votre lumière.
        </p>
        <p>
          Nous filmons vos lieux comme on filme un visage : à la lumière du
          jour, sans rien maquiller. Une caméra qui respire, le temps qu'il
          faut, et un montage qui laisse la maison parler. C'est plus lent.
          C'est aussi pour cela que ça dure.
        </p>
      </div>

      </div>

      {/* Les principes, en exergue avant la signature */}
      <blockquote className="reveal-up mb-12" style={{ '--d': '0.42s' }}>
        <p className="font-display text-[clamp(1.15rem,1.6vw,1.45rem)] leading-[1.75] text-encre/85">
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

      {/* Les deux artisans, assis sur la base */}
      <div className="reveal-up" style={{ '--d': '0.5s' }}>
        <span aria-hidden="true" className="mx-auto mb-7 block h-px w-10 bg-or" />
        <div className="flex items-start justify-center divide-x divide-encre/15">
          {ARTISANS.map((artisan) => (
            <div key={artisan.name} className="w-56 px-6 md:w-64 md:px-8">
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
    </section>
  )
}
