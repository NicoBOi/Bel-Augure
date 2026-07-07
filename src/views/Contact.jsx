import { useReveal } from '../hooks/useReveal.js'

export default function Contact() {
  const ref = useReveal(0.35)

  return (
    <section
      ref={ref}
      aria-label="Contact"
      className="flex h-full flex-col justify-end px-6 pb-16 pt-32 md:px-16 md:pb-24"
    >
      <div>
        <p
          className="reveal-up text-[12px] font-normal uppercase tracking-[0.2em] text-grege"
          style={{ '--d': '0.1s' }}
        >
          Bordeaux · Nouvelle-Aquitaine
        </p>

        <h2 className="mt-6 font-display text-[clamp(1.8rem,4.5vw,4.2rem)] leading-[1.15] text-creme">
          <span className="mask" style={{ '--d': '0.25s' }}>
            <span>
              <a
                href="mailto:nico@belaugure.studio"
                className="transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-or"
              >
                nico@belaugure.studio
              </a>
            </span>
          </span>
        </h2>

        <a
          href="mailto:nico@belaugure.studio?subject=Ouvrir%20un%20%C3%A9change"
          className="cta reveal-up mt-12 inline-block px-10 py-4 text-[11px] font-normal uppercase tracking-[0.2em]"
          style={{ '--d': '0.55s' }}
        >
          Ouvrir un échange
        </a>
      </div>
    </section>
  )
}
