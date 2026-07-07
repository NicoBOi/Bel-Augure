import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'
import BackLink from '../components/BackLink.jsx'

// Projets fictifs en attendant les films fondateurs : les cartes encre
// reçoivent les stills étalonnés, la structure ne bouge pas.
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
  {
    id: 'ondine',
    title: 'Villa Ondine',
    world: 'Longévité · Genève',
    format: 'Film signature, 90 s',
    desc: 'Une villa où l\'on vient ralentir. Le film respire au même rythme qu\'elle, et rajeunit le regard que l\'on porte sur la maison.',
  },
]

// Position de chaque carte selon son écart à la carte active :
// la centrale s'avance, les voisines se rangent derrière en éventail.
function deckStyle(offset) {
  const abs = Math.abs(offset)
  return {
    transform: `translateX(${offset * 42}%) scale(${Math.max(1 - abs * 0.14, 0.6)})`,
    zIndex: 30 - abs * 10,
    // La profondeur vient de l'échelle et de l'ombre : les cartes voisines
    // restent encre, à peine voilées, jamais grises.
    opacity: abs > 2 ? 0 : abs === 0 ? 1 : abs === 1 ? 0.9 : 0.5,
    pointerEvents: abs > 2 ? 'none' : 'auto',
  }
}

export default function Films({ setDark }) {
  const reveal = useReveal(0.35)
  const sectionRef = useRef(null)
  const [selected, setSelected] = useState(null)
  const [index, setIndex] = useState(0)
  const wheelLock = useRef(false)
  const wheelAcc = useRef(0)

  const active = PROJECTS[index]

  const openProject = (project) => {
    setSelected(project)
    setDark(true)
  }

  const closeProject = () => {
    setSelected(null)
    setDark(false)
  }

  const step = (dir) => {
    setIndex((i) => Math.min(Math.max(i + dir, 0), PROJECTS.length - 1))
  }

  // Le scroll fait tourner le portefeuille : une carte à la fois,
  // verrouillé le temps que la transition se pose.
  useEffect(() => {
    const section = sectionRef.current
    if (!section || selected) return

    const onWheel = (e) => {
      e.preventDefault()
      if (wheelLock.current) return
      wheelAcc.current += e.deltaY + e.deltaX
      if (Math.abs(wheelAcc.current) > 40) {
        const dir = wheelAcc.current > 0 ? 1 : -1
        wheelAcc.current = 0
        wheelLock.current = true
        step(dir)
        setTimeout(() => {
          wheelLock.current = false
        }, 700)
      }
    }

    section.addEventListener('wheel', onWheel, { passive: false })
    return () => section.removeEventListener('wheel', onWheel)
  }, [selected])

  useEffect(() => {
    const onKey = (e) => {
      if (selected) {
        if (e.key === 'Escape') closeProject()
        return
      }
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  // Lecture d'un projet : le site entier est passé en encre (via setDark),
  // le détail remplace le carrousel dans la page. Aucun overlay.
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
            <div className="aspect-video w-full rounded-2xl border border-creme/15 bg-creme/5" />
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
      className="flex h-full flex-col justify-center overflow-hidden pb-12 pt-28"
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
            className="reveal-up mt-5 font-display text-[clamp(1.3rem,1.8vw,1.7rem)] leading-[1.4] text-encre"
            style={{ '--d': '0.2s' }}
          >
            Chaque maison a une lumière. Nos films la trouvent.
          </p>
        </div>

        {/* Progression du portefeuille */}
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
              className="absolute inset-y-0 left-0 w-full origin-left bg-encre/60 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transform: `scaleX(${(index + 1) / PROJECTS.length})`,
              }}
            />
          </span>
        </div>
      </div>

      {/* Le portefeuille : cartes 16:9 qui se chevauchent, l'active au centre */}
      <div
        className="reveal-up relative mx-auto mt-9 w-[86vw] md:w-[min(52vw,640px)]"
        style={{ '--d': '0.35s' }}
        role="group"
        aria-roledescription="carrousel"
        aria-label={`Projet ${index + 1} sur ${PROJECTS.length} : ${active.title}`}
      >
        {/* Réserve la hauteur du deck */}
        <div className="aspect-video" />

        {PROJECTS.map((project, i) => {
          const offset = i - index
          const isActive = offset === 0
          return (
            <button
              key={project.id}
              type="button"
              onClick={() => (isActive ? openProject(project) : setIndex(i))}
              tabIndex={Math.abs(offset) > 2 ? -1 : 0}
              aria-label={
                isActive ? `Voir le projet ${project.title}` : `Amener ${project.title} au centre`
              }
              className={`group absolute inset-0 cursor-pointer overflow-hidden rounded-2xl bg-encre transition-[transform,opacity,box-shadow] duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isActive
                  ? 'shadow-[0_36px_90px_-28px_rgb(26_21_18/0.4)]'
                  : 'shadow-[0_12px_40px_-20px_rgb(26_21_18/0.25)]'
              }`}
              style={deckStyle(offset)}
            >
              {isActive && (
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-normal uppercase tracking-[0.28em] text-creme/0 transition-colors duration-700 group-hover:text-creme/80">
                  Voir le film
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Légende de la carte active : fond enchaîné à chaque mouvement */}
      <div key={active.id} className="view-enter mt-8 text-center">
        <p className="font-display text-[clamp(1.2rem,1.6vw,1.5rem)] text-encre">
          {active.title}
          <span className="text-or">.</span>
        </p>
        <p className="mt-1.5 text-[10.5px] font-normal uppercase tracking-[0.2em] text-grege">
          {active.world}
        </p>
      </div>
    </section>
  )
}
