import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'

// Projets fictifs en attendant les films fondateurs : les cases encre
// reçoivent les stills étalonnés, la structure ne bouge pas.
const PROJECTS = [
  {
    id: 'itsasoa',
    title: 'Maison Itsasoa',
    world: 'Hôtellerie · Côte basque',
    format: 'Film signature, 2 min',
    desc: "Tourné au lever du jour, quand l'océan tient encore la maison dans son silence. Le film suit ce que vos hôtes viennent chercher ici sans toujours savoir le nommer.",
    tile: 'wide',
  },
  {
    id: 'salies',
    title: 'Thermes de Salies',
    world: 'Thalasso · Béarn',
    format: 'Film signature et saisons',
    desc: "Un film central autour de l'eau et du geste, puis quatre variations qui accompagnent la maison au fil de l'année. L'image reste la même. La lumière change.",
    tile: 'tall',
  },
  {
    id: 'lisle',
    title: 'Domaine de Lisle',
    world: 'Vin · Médoc',
    format: 'Film héritage, 3 min',
    desc: "Le domaine se transmet depuis trois générations. Le film prend le temps d'aller chercher ce que l'étiquette ne dira jamais : la main, le chai, l'hiver.",
    tile: 'wide',
  },
  {
    id: 'almae',
    title: 'Maison Almae',
    world: 'Cosmétique · Bordeaux',
    format: 'Film signature, 45 s',
    desc: "Quarante-cinq secondes sur la matière première, avant le produit. Un format court qui se place partout et ne s'use pas.",
    tile: 'tall',
  },
  {
    id: 'ondine',
    title: 'Villa Ondine',
    world: 'Longévité · Genève',
    format: 'Film signature, 90 s',
    desc: 'Une villa où l\'on vient ralentir. Le film respire au même rythme qu\'elle, et rajeunit le regard que l\'on porte sur la maison.',
    tile: 'wide',
  },
]

export default function Films({ setDark }) {
  const ref = useReveal(0.35)
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [selected, setSelected] = useState(null)
  const [progress, setProgress] = useState(0)

  const openProject = (project) => {
    setSelected(project)
    setDark(true)
  }

  const closeProject = () => {
    setSelected(null)
    setDark(false)
  }

  // Le scroll vertical devient un défilement horizontal de la galerie.
  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track || selected) return

    const onWheel = (e) => {
      e.preventDefault()
      track.scrollLeft += e.deltaY + e.deltaX
    }

    section.addEventListener('wheel', onWheel, { passive: false })
    return () => section.removeEventListener('wheel', onWheel)
  }, [selected])

  useEffect(() => {
    if (!selected) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeProject()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const onTrackScroll = () => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setProgress(max > 0 ? el.scrollLeft / max : 0)
  }

  // Lecture d'un projet : le site entier est passé en encre (via setDark),
  // le détail remplace la galerie dans la page. Aucun overlay.
  if (selected) {
    return (
      <section
        key={selected.id}
        aria-label={selected.title}
        className="view-enter flex h-full flex-col justify-center px-6 pb-14 pt-28 md:px-16"
      >
        <button
          type="button"
          onClick={closeProject}
          className="nav-link w-max cursor-pointer text-[11px] font-normal uppercase tracking-[0.22em] text-creme/70 transition-colors duration-500 hover:text-creme"
        >
          <span className="nav-label">Tous les films</span>
        </button>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Zone média : reçoit le film ou le still étalonné */}
          <div className="lg:col-span-7">
            <div className="aspect-video w-full border border-creme/15 bg-creme/5" />
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
        ref.current = el
        sectionRef.current = el
      }}
      aria-label="Films"
      className="flex h-full flex-col justify-center pb-14 pt-28"
    >
      <div className="flex items-end justify-between px-6 md:px-16">
        <div>
          <p
            className="reveal-up text-[11px] font-normal uppercase tracking-[0.3em] text-grege"
            style={{ '--d': '0.1s' }}
          >
            Films
          </p>

          <p
            className="reveal-up mt-6 font-display text-[clamp(1.3rem,1.8vw,1.7rem)] leading-[1.4] text-encre"
            style={{ '--d': '0.2s' }}
          >
            Chaque maison a une lumière. Nos films la trouvent.
          </p>
        </div>

        {/* Indication de défilement horizontal */}
        <div
          className="reveal-up mb-1 hidden items-center gap-4 md:flex"
          style={{ '--d': '0.45s' }}
          aria-hidden="true"
        >
          <span className="text-[10px] font-normal uppercase tracking-[0.22em] text-grege">
            Faire défiler
          </span>
          <span className="relative block h-px w-24 bg-encre/15">
            <span
              className="absolute inset-y-0 left-0 w-full origin-left bg-encre/60 transition-transform duration-300 ease-out"
              style={{ transform: `scaleX(${Math.max(progress, 0.06)})` }}
            />
          </span>
        </div>
      </div>

      {/* Tuiles à hauteur commune : la rangée reste calme, seuls les ratios varient */}
      <div
        ref={trackRef}
        onScroll={onTrackScroll}
        className="reveal-up no-scrollbar mt-10 flex items-start gap-8 overflow-x-auto px-6 md:gap-12 md:px-16"
        style={{ '--d': '0.3s' }}
      >
        {PROJECTS.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() => openProject(project)}
            className="group shrink-0 cursor-pointer text-left transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5"
            aria-label={`Voir le projet ${project.title}`}
          >
            <div className="overflow-hidden">
              <div
                className={`h-[38vh] max-h-[400px] w-auto bg-encre transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] md:h-[44vh] ${
                  project.tile === 'wide' ? 'aspect-[16/10]' : 'aspect-[3/4]'
                }`}
              />
            </div>
            <p className="mt-4 font-display text-[16px] text-encre">{project.title}</p>
            <p className="mt-1 text-[10.5px] font-normal uppercase tracking-[0.18em] text-grege">
              {project.world}
            </p>
          </button>
        ))}
      </div>
    </section>
  )
}
