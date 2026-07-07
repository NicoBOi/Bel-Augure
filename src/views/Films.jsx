import { useReveal } from '../hooks/useReveal.js'

export default function Films() {
  const ref = useReveal(0.35)

  return (
    <section
      ref={ref}
      aria-label="Films"
      className="flex h-full flex-col justify-end px-6 pb-16 pt-32 md:px-16 md:pb-24"
    >
      <div className="max-w-3xl">
        <h2 className="font-display text-[clamp(2.2rem,4.5vw,4.2rem)] leading-[1.15] text-creme">
          <span className="mask" style={{ '--d': '0.15s' }}>
            <span>Nos films se découvrent</span>
          </span>
          <span className="mask" style={{ '--d': '0.3s' }}>
            <span>
              en projection privée<span className="text-or">.</span>
            </span>
          </span>
        </h2>

        <p
          className="reveal-up mt-10 max-w-[46ch] text-[14px] font-light leading-[1.9] text-grege"
          style={{ '--d': '0.6s' }}
        >
          Le showreel est en préparation. En attendant, chaque film se partage
          en privé, dans les conditions qu'il mérite.
        </p>

        <a
          href="mailto:nico@belaugure.studio?subject=Projection%20priv%C3%A9e"
          className="nav-link reveal-up mt-8 inline-block text-[12px] font-normal uppercase tracking-[0.2em] text-or"
          style={{ '--d': '0.75s' }}
        >
          <span className="nav-label">Demander une projection</span>
        </a>
      </div>
    </section>
  )
}
