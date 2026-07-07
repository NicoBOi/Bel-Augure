import { useReveal } from '../hooks/useReveal.js'

export default function Studio() {
  const ref = useReveal(0.35)

  return (
    <section
      ref={ref}
      aria-label="Le studio"
      className="flex h-full flex-col justify-end px-6 pb-16 pt-32 md:px-16 md:pb-24"
    >
      <div className="max-w-3xl">
        <h2 className="font-display text-[clamp(2.2rem,4.5vw,4.2rem)] leading-[1.15] text-creme">
          <span className="mask" style={{ '--d': '0.15s' }}>
            <span>Un film signature</span>
          </span>
          <span className="mask" style={{ '--d': '0.3s' }}>
            <span>
              n'est pas une vidéo<span className="text-or">.</span>
            </span>
          </span>
        </h2>

        <p
          className="reveal-up mt-10 max-w-[48ch] text-[14px] font-light leading-[1.9] text-grege"
          style={{ '--d': '0.6s' }}
        >
          C'est un actif, qui travaille pour votre maison saison après saison.
          Bel Augure conçoit des films de patrimoine pour le bien-être
          d'exception : peu de projets chaque année, un regard d'auteur, des
          images faites pour durer.
        </p>
      </div>
    </section>
  )
}
