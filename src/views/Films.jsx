import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'
import BackLink from '../components/BackLink.jsx'

// Trois à quatre films fondateurs : la présentation est pensée pour peu de
// pièces, chacune traitée comme une œuvre. Les cartes encre reçoivent les
// stills étalonnés.
const PROJECTS = [
  {
    id: 'itsasoa',
    title: 'Maison Itsasoa',
    world: 'Hôtellerie · Côte basque',
    format: 'Film signature, 2 min',
    desc: "Tourné au lever du jour, quand l'océan tient encore la maison dans son silence. Le film suit ce que vos hôtes viennent chercher ici sans toujours savoir le nommer.",
  },
  {
    id: 'salies',
    title: 'Thermes de Salies',
    world: 'Thalasso · Béarn',
    format: 'Film signature et saisons',
    desc: "Un film central autour de l'eau et du geste, puis quatre variations qui accompagnent la maison au fil de l'année. L'image reste la même. La lumière change.",
  },
  {
    id: 'lisle',
    title: 'Domaine de Lisle',
    world: 'Vin · Médoc',
    format: 'Film héritage, 3 min',
    desc: "Le domaine se transmet depuis trois générations. Le film prend le temps d'aller chercher ce que l'étiquette ne dira jamais : la main, le chai, l'hiver.",
  },
  {
    id: 'almae',
    title: 'Maison Almae',
    world: 'Cosmétique · Bordeaux',
    format: 'Film signature, 45 s',
    desc: "Quarante-cinq secondes sur la matière première, avant le produit. Un format court qui se place partout et ne s'use pas.",
  },
]

export default function Films({ setDark }) {
  const reveal = useReveal(0.35)
  const sectionRef = useRef(null)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const wheelLock = useRef(false)

  const active = PROJECTS[current]

  const openProject = (project) => {
    setSelected(project)
    setDark(true)
  }

  const closeProject = () => {
    setSelected(null)
    setDark(false)
  }

  // La molette parcourt l'index, une pièce à la fois.
  useEffect(() => {
    const section = sectionRef.current
    if (!section || selected) return

    const onWheel = (e) => {
      if (wheelLock.current) return
      if (Math.abs(e.deltaY) < 25) return
      wheelLock.current = true
      const dir = e.deltaY > 0 ? 1 : -1
      setCurrent((i) => Math.min(Math.max(i + dir, 0), PROJECTS.length - 1))
      setTimeout(() => {
        wheelLock.current = false
      }, 550)
    }

    section.addEventListener('wheel', onWheel, { passive: true })
    return () => section.removeEventListener('wheel', onWheel)
  }, [selected])

  useEffect(() => {
    const onKey = (e) => {
      if (selected) {
        if (e.key === 'Escape') closeProject()
        return
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight')
        setCurrent((i) => Math.min(i + 1, PROJECTS.length - 1))
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') setCurrent((i) => Math.max(i - 1, 0))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  // Lecture d'un projet : le site entier est passé en encre (via setDark),
  // le détail remplace l'index dans la page. Aucun overlay.
  if (selected) {
    return (
      <section
        key={selected.id}
        aria-label={selected.title}
        className="view-enter flex h-full flex-col justify-center px-6 pb-14 pt-28 md:px-16"
      >
        <BackLink label="Tous les films" onClick={closeProject} light />

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Zone média : reçoit le film ou le still étalonné */}
          <div className="lg:col-span-7">
            <div className="aspect-video w-full rounded-3xl border border-creme/15 bg-creme/5" />
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-[11px] font-normal uppercase tracking-[0.3em] text-grege">
              {selected.world}
            </p>
            <h3 className="mt-6 font-display text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.2] text-creme">
              {selected.title}
              <span className="text-or">.</span>
            </h3>
            <p className="mt-3 text-[12px] font-light tracking-[0.08em] text-grege">
              {selected.format}
            </p>
            <p className="mt-8 max-w-[44ch] text-[14px] font-light leading-[1.9] text-sable">
              {selected.desc}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={(el) => {
        reveal(el)
        sectionRef.current = el
      }}
      aria-label="Films"
      className="flex h-full flex-col justify-center px-6 pb-14 pt-28 md:px-16"
    >
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Index : chaque film est un chapitre */}
        <div className="lg:col-span-4">
          <p
            className="reveal-up text-[11px] font-normal uppercase tracking-[0.3em] text-grege"
            style={{ '--d': '0.1s' }}
          >
            Films
          </p>

          <p
            className="reveal-up mt-5 max-w-[30ch] font-display text-[clamp(1.2rem,1.6vw,1.5rem)] leading-[1.45] text-encre"
            style={{ '--d': '0.2s' }}
          >
            Chaque maison a une lumière. Nos films la trouvent.
          </p>

          <ul className="reveal-up mt-10" style={{ '--d': '0.4s' }} aria-label="Nos films">
            {PROJECTS.map((project, i) => (
              <li key={project.id}>
                <button
                  type="button"
                  onMouseEnter={() => setCurrent(i)}
                  onFocus={() => setCurrent(i)}
                  onClick={() => (i === current ? openProject(project) : setCurrent(i))}
                  aria-current={i === current ? 'true' : undefined}
                  className={`group flex w-full cursor-pointer items-baseline justify-between gap-4 border-t border-encre/10 py-4 text-left transition-colors duration-700 ${
                    i === current ? 'text-encre' : 'text-encre/35 hover:text-encre/70'
                  }`}
                >
                  <span className="font-display text-[clamp(1.4rem,1.9vw,1.8rem)] leading-tight">
                    {project.title}
                    <span
                      className={`transition-opacity duration-700 ${
                        i === current ? 'text-or opacity-100' : 'opacity-0'
                      }`}
                    >
                      .
                    </span>
                  </span>
                  <span
                    className={`shrink-0 text-[10px] font-normal uppercase tracking-[0.18em] transition-opacity duration-700 ${
                      i === current ? 'text-grege opacity-100' : 'opacity-0'
                    }`}
                  >
                    Voir
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Aperçu : la pièce active, en fondu enchaîné */}
        <div className="reveal-up lg:col-span-7 lg:col-start-6" style={{ '--d': '0.35s' }}>
          <div className="relative aspect-video w-full">
            {PROJECTS.map((project, i) => (
              <button
                key={project.id}
                type="button"
                onClick={() => openProject(project)}
                tabIndex={i === current ? 0 : -1}
                aria-label={`Voir le projet ${project.title}`}
                aria-hidden={i !== current}
                className={`group absolute inset-0 cursor-pointer overflow-hidden rounded-3xl bg-encre shadow-[0_36px_100px_-30px_rgb(26_21_18/0.4)] transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  i === current
                    ? 'scale-100 opacity-100'
                    : 'pointer-events-none scale-[0.985] opacity-0'
                }`}
              >
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-normal uppercase tracking-[0.28em] text-creme/0 transition-colors duration-700 group-hover:text-creme/80">
                  Voir le film
                </span>
              </button>
            ))}
          </div>

          <div key={active.id} className="view-enter mt-5 flex items-baseline justify-between">
            <p className="text-[10.5px] font-normal uppercase tracking-[0.2em] text-grege">
              {active.world}
            </p>
            <p className="text-[12px] font-light tracking-[0.06em] text-grege">
              {active.format}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
