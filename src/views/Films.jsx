import { useReveal } from '../hooks/useReveal.js'

export default function Films() {
  const ref = useReveal(0.35)

  return (
    <section
      ref={ref}
      aria-label="Films"
      className="flex h-full flex-col justify-center px-6 pb-14 pt-28 md:px-16"
    >
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Colonne éditoriale, façon sommaire */}
        <div className="lg:col-span-4 lg:pt-10">
          <p
            className="reveal-up text-[11px] font-normal uppercase tracking-[0.3em] text-grege"
            style={{ '--d': '0.1s' }}
          >
            Films
          </p>

          <p
            className="reveal-up mt-8 max-w-[38ch] text-[14px] font-light leading-[1.9] text-encre/80"
            style={{ '--d': '0.25s' }}
          >
            Les films fondateurs du studio sont en cours d'écriture. Chaque
            pièce se découvre en projection privée.
          </p>

          <a
            href="mailto:nico@belaugure.studio?subject=Projection%20priv%C3%A9e"
            className="nav-link reveal-up mt-10 inline-block text-[11px] font-normal uppercase tracking-[0.22em] text-encre"
            style={{ '--d': '0.4s' }}
          >
            <span className="nav-label">Demander une projection</span>
          </a>
        </div>

        {/* Pièces : cases encre en attente des stills étalonnés */}
        <div
          className="reveal-right flex items-start gap-6 md:gap-8 lg:col-span-7 lg:col-start-6"
          style={{ '--d': '0.5s' }}
        >
          <figure className="min-w-0 flex-1">
            <div className="aspect-[16/10] w-full bg-encre" />
            <figcaption className="mt-3 text-[11px] uppercase tracking-[0.18em] text-grege">
              Film fondateur I
            </figcaption>
          </figure>

          <figure className="mt-14 w-[34%] shrink-0 md:mt-20">
            <div className="aspect-[3/4] w-full bg-encre" />
            <figcaption className="mt-3 text-[11px] uppercase tracking-[0.18em] text-grege">
              Film fondateur II
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
