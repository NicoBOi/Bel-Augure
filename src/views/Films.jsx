import { useEffect, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'
import BackLink from '../components/BackLink.jsx'

// Trois à quatre films fondateurs. Les calques de fond par projet sont
// prêts à recevoir la boucle vidéo ou le still étalonné de chacun.
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
  const [hovered, setHovered] = useState(null)
  const [selected, setSelected] = useState(null)

  // Survoler un nom fait monter le film en fond : tout le site glisse vers
  // l'encre (header compris), les noms passent en crème.
  const enter = (project) => {
    setHovered(project.id)
    setDark(true)
  }

  const leave = () => {
    setHovered(null)
    if (!selected) setDark(false)
  }

  const openProject = (project) => {
    setHovered(null)
    setSelected(project)
    setDark(true)
  }

  const closeProject = () => {
    setSelected(null)
    setDark(false)
  }

  useEffect(() => {
    if (!selected) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeProject()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  // Lecture d'un projet : le détail se déploie dans la page, sur l'encre.
  if (selected) {
    return (
      <section
        key={selected.id}
        aria-label={selected.title}
        className="view-enter flex h-full flex-col justify-center px-6 pb-14 pt-28 md:justify-end md:pb-[9vh] md:px-16"
      >
        <BackLink label="Tous les films" onClick={closeProject} light />

        <div className="mt-10 grid items-end gap-10 lg:grid-cols-12 lg:gap-8">
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
    <section ref={reveal} aria-label="Films" className="relative h-full overflow-hidden">
      {/* Calques de fond : un par film, prêts pour la vidéo */}
      {PROJECTS.map((project) => (
        <div
          key={project.id}
          aria-hidden="true"
          className={`absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            hovered === project.id ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="h-full w-full bg-encre" />
        </div>
      ))}

      <div className="relative z-[1] flex h-full flex-col justify-end px-6 pb-[9vh] pt-28 md:px-16">
        <p
          className="reveal-up text-[11px] font-normal uppercase tracking-[0.3em] text-grege"
          style={{ '--d': '0.05s' }}
        >
          Films
        </p>

        <ul className="reveal-up mt-8" style={{ '--d': '0.08s' }} onMouseLeave={leave}>
          {PROJECTS.map((project) => {
            const isHovered = hovered === project.id
            const dimmed = hovered !== null && !isHovered
            return (
              <li key={project.id}>
                <button
                  type="button"
                  onMouseEnter={() => enter(project)}
                  onFocus={() => enter(project)}
                  onBlur={leave}
                  onClick={() => openProject(project)}
                  className={`flex w-full cursor-pointer items-baseline gap-6 py-3 text-left font-display text-[clamp(2rem,4.6vw,4rem)] leading-[1.12] transition-colors duration-300 md:py-4 ${
                    isHovered ? 'text-creme' : dimmed ? 'text-creme/25' : 'text-encre'
                  }`}
                >
                  <span>
                    {project.title}
                    <span
                      className={`text-or transition-opacity duration-300 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      .
                    </span>
                  </span>
                  <span
                    className={`ml-auto hidden shrink-0 text-[10.5px] font-normal uppercase tracking-[0.22em] text-grege transition-all duration-300 md:block ${
                      isHovered ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0'
                    }`}
                  >
                    {project.world}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
