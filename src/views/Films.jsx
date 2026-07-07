import { useReveal } from '../hooks/useReveal.js'

export default function Films() {
  const ref = useReveal(0.35)

  return (
    <section
      ref={ref}
      aria-label="Films"
      className="flex h-full flex-col items-center justify-center px-6 text-center"
    >
      <p
        className="reveal-up text-[11px] font-normal uppercase tracking-[0.3em] text-grege"
        style={{ '--d': '0.1s' }}
      >
        Films
      </p>

      <h2 className="mt-10 max-w-[24ch] font-display text-[clamp(1.9rem,3.6vw,3.2rem)] leading-[1.35] text-encre">
        <span className="mask" style={{ '--d': '0.25s' }}>
          <span>Nos films se découvrent</span>
        </span>
        <span className="mask" style={{ '--d': '0.4s' }}>
          <span>
            en projection privée<span className="text-or">.</span>
          </span>
        </span>
      </h2>

      <p
        className="reveal-up mt-10 max-w-[44ch] text-[14px] font-light leading-[1.9] text-grege"
        style={{ '--d': '0.65s' }}
      >
        Le showreel est en préparation. Chaque film se partage en privé,
        dans les conditions qu'il mérite.
      </p>

      <a
        href="mailto:nico@belaugure.studio?subject=Projection%20priv%C3%A9e"
        className="nav-link reveal-up mt-10 inline-block text-[11px] font-normal uppercase tracking-[0.22em] text-encre"
        style={{ '--d': '0.8s' }}
      >
        <span className="nav-label">Demander une projection</span>
      </a>
    </section>
  )
}
