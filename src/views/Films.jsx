import { useEffect, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'
import BackLink from '../components/BackLink.jsx'
import VimeoBackground from '../components/VimeoBackground.jsx'
import VideoLoader from '../components/VideoLoader.jsx'

// Boucle d'exemple montrée dans chaque film en attendant les boucles
// propres à chaque projet.
const VIMEO_ID = '961941216'

// Trois à quatre films fondateurs. Les calques de fond par projet sont
// prêts à recevoir la boucle vidéo ou le still étalonné de chacun.
const PROJECTS = [
  {
    id: 'itsasoa',
    title: 'Maison Itsasoa',
    world: 'Hôtellerie · Côte basque',
    format: 'Film signature, 2 min',
    desc: "Un hôtel face à l'océan, côte basque. Trois matins de tournage, un film de deux minutes. Il ouvre le site de la maison et tourne à l'accueil.",
  },
  {
    id: 'salies',
    title: 'Thermes de Salies',
    world: 'Thalasso · Béarn',
    format: 'Film signature et saisons',
    desc: "Des thermes en Béarn. Un film central de quatre-vingt-dix secondes, puis quatre déclinaisons, une par saison. Tourné dans la vapeur, à hauteur de geste.",
  },
  {
    id: 'lisle',
    title: 'Domaine de Lisle',
    world: 'Vin · Médoc',
    format: 'Film héritage, 3 min',
    desc: "Un domaine du Médoc, trois générations. Trois minutes d'entretiens, de chai et d'hiver. Ce que l'étiquette ne dit pas.",
  },
  {
    id: 'almae',
    title: 'Maison Almae',
    world: 'Cosmétique · Bordeaux',
    format: 'Film signature, 45 s',
    desc: "Une maison de cosmétique à Bordeaux. Quarante-cinq secondes sur la matière — plante, huile, peau. Le format se place partout.",
  },
]

export default function Films({ setDark }) {
  const reveal = useReveal(0.35)
  const [hovered, setHovered] = useState(null)
  const [selected, setSelected] = useState(null)
  // Point d'or qui respire tant que la vidéo n'a pas démarré
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    setVideoReady(false)
  }, [selected])

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
  }, [selected])

  // Lecture d'un projet : même architecture que le détail d'une offre —
  // grand titre, vidéo légendée à gauche, récit et navigation à droite.
  if (selected) {
    return (
      <section
        key={selected.id}
        aria-label={selected.title}
        className="view-enter scroll-fade flex h-full flex-col justify-start px-6 pb-14 pt-28 max-md:overflow-y-auto md:pb-[9vh] md:px-16"
      >
        <BackLink label="Tous les films" onClick={closeProject} light />

        <div className="mt-8 md:mt-auto">
          <h2 className="font-display text-[clamp(2.8rem,6.5vw,6rem)] leading-[1.02] text-creme">
            {selected.title}
            <span className="text-or">.</span>
          </h2>
          <p className="mt-3 text-[13px] font-light tracking-[0.08em] text-sable/75">
            {selected.world}
          </p>

          <div className="mt-8 grid items-start gap-10 lg:grid-cols-12 lg:gap-8">
            {/* Zone média : la boucle vidéo, point d'or en attendant qu'elle joue */}
            <div className="lg:col-span-7">
              <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-creme/15 bg-encre">
                {!videoReady && <VideoLoader />}
                <VimeoBackground
                  id={VIMEO_ID}
                  title={`Film ${selected.title}`}
                  onPlaying={() => setVideoReady(true)}
                  className="absolute inset-0 h-full w-full"
                />
              </div>
              <p className="mt-3 text-[11px] font-normal uppercase tracking-[0.2em] text-sable/70">
                {selected.format}
              </p>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <p className="max-w-[44ch] text-[13.5px] font-light leading-[1.85] text-creme/80">
                {selected.desc}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-creme/15 pt-6">
                <a
                  href={`mailto:nico@belaugure.studio?subject=${encodeURIComponent(`Échange · ${selected.title}`)}`}
                  className="cta cta-light inline-block px-9 py-3.5 text-[13px] font-normal tracking-[0.06em]"
                >
                  Écrire au studio
                </a>
                <ul className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Autres films">
                  {PROJECTS.filter((p) => p.id !== selected.id).map((project) => (
                    <li key={project.id}>
                      <button
                        type="button"
                        onClick={() => openProject(project)}
                        className="nav-link cursor-pointer py-2 text-[12px] font-light text-sable/70 transition-colors duration-500 hover:text-creme"
                      >
                        <span className="nav-label">{project.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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
          className={`reveal-up text-[11px] font-normal uppercase tracking-[0.3em] transition-colors duration-300 ${
            hovered ? 'text-sable/70' : 'text-grege'
          }`}
          style={{ '--d': '0.05s' }}
        >
          Films
        </p>

        <ul className="reveal-up mt-8" style={{ '--d': '0.08s' }} onMouseLeave={leave}>
          {PROJECTS.map((project, index) => {
            const isHovered = hovered === project.id
            const dimmed = hovered !== null && !isHovered
            return (
              <li key={project.id}>
                {/* Chaque titre se décale d'un cran : l'escalier éditorial
                    de la page Studio, décliné en filmographie */}
                <button
                  type="button"
                  onMouseEnter={() => enter(project)}
                  onFocus={() => enter(project)}
                  onBlur={leave}
                  onClick={() => openProject(project)}
                  style={{ '--indent': `${index * 4}vw` }}
                  className={`flex w-full cursor-pointer items-baseline gap-6 py-3 text-left font-display text-[clamp(2rem,4.6vw,4rem)] leading-[1.12] transition-colors duration-300 md:py-4 md:pl-[var(--indent)] ${
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
                    className={`ml-auto hidden shrink-0 text-[10.5px] font-normal uppercase tracking-[0.22em] text-sable/80 transition-all duration-300 md:block ${
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
