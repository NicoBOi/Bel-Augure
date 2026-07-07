import { useReveal } from '../hooks/useReveal.js'

export default function Studio() {
  const ref = useReveal(0.35)

  return (
    <section
      ref={ref}
      aria-label="Le studio"
      className="flex h-full flex-col items-center justify-center px-6 text-center"
    >
      <p
        className="reveal-up text-[11px] font-normal uppercase tracking-[0.3em] text-grege"
        style={{ '--d': '0.1s' }}
      >
        Le studio
      </p>

      <h2 className="mt-10 max-w-[26ch] font-display text-[clamp(1.9rem,3.6vw,3.2rem)] leading-[1.35] text-encre">
        <span className="mask" style={{ '--d': '0.25s' }}>
          <span>Ceux qui vendent le film</span>
        </span>
        <span className="mask" style={{ '--d': '0.4s' }}>
          <span>
            sont ceux qui le fabriquent<span className="text-or">.</span>
          </span>
        </span>
      </h2>

      <p
        className="reveal-up mt-10 max-w-[52ch] text-[14px] font-light leading-[1.9] text-grege"
        style={{ '--d': '0.65s' }}
      >
        Studio de films de marque fondé à Bordeaux, deux artisans, zéro
        intermédiaire. Nico : direction, image, étalonnage. Corentin :
        montage, motion design. Lumière naturelle, caméra qui respire,
        temps long. Rien qui ressemble à de la pub.
      </p>
    </section>
  )
}
