import { useReveal } from '../hooks/useReveal.js'

export default function Contact() {
  const ref = useReveal(0.35)

  return (
    <section
      ref={ref}
      aria-label="Contact"
      className="flex h-full flex-col justify-center px-6 pb-14 pt-28 md:px-16"
    >
      <div>
        <p
          className="reveal-up text-[11px] font-normal uppercase tracking-[0.3em] text-grege"
          style={{ '--d': '0.1s' }}
        >
          Contact
        </p>

        <p
          className="reveal-up mt-8 max-w-[48ch] text-[14px] font-light leading-[1.9] text-encre/80"
          style={{ '--d': '0.2s' }}
        >
          Une demi-heure d'échange suffit pour savoir si nous sommes le bon
          studio pour votre maison.
        </p>

        <h2 className="mt-8 font-display text-[clamp(1.7rem,4.2vw,3.8rem)] leading-[1.2] text-encre">
          <span className="mask" style={{ '--d': '0.25s' }}>
            <span>
              <a
                href="mailto:nico@belaugure.studio"
                className="transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-grege"
              >
                nico@belaugure.studio
              </a>
            </span>
          </span>
        </h2>

        <p
          className="reveal-up mt-6 text-[12px] font-light tracking-[0.1em] text-grege"
          style={{ '--d': '0.5s' }}
        >
          Bordeaux · Nouvelle-Aquitaine
        </p>

        <a
          href="mailto:nico@belaugure.studio?subject=Ouvrir%20un%20%C3%A9change"
          className="cta reveal-up mt-12 inline-block px-10 py-4 text-[11px] font-normal uppercase tracking-[0.2em]"
          style={{ '--d': '0.65s' }}
        >
          Ouvrir un échange
        </a>
      </div>
    </section>
  )
}
