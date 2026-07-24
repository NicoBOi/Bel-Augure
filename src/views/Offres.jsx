import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'

// Trois offres, trois cartons : la page Offres est une salle obscure et
// chaque offre passe comme un intertitre de film muet, dans son cadre à
// double filet. Un studio de cinéma présente ses offres comme un film.
// Trois offres, trois mondes : choisir une offre change la page entière
// de matière — l'or pâle de Signature, le grège de Saisons, l'encre de
// Sur Mesure. La hiérarchie n'est pas un style de texte, c'est la pièce
// qui change de lumière.
const OFFRES = [
  {
    name: 'Signature',
    eyebrow: 'Le film central',
    desc: "Un film court écrit, tourné et monté par nos soins. Il est la vitrine de l'émotion que l'on éprouve chez vous.",
    inclus: [
      'Un film de 45 à 90 s',
      'Deux jours de tournage',
      'Un acteur',
      'Du matériel cinéma professionnel',
      'Les teasers pour deux réseaux sociaux au choix',
    ],
    bgColor: 'rgb(217 198 166 / 0.45)',
    ink: false,
  },
  {
    name: 'Saisons',
    eyebrow: "Toute l'année",
    desc: 'Un film court à chaque saison, pour que vos clients vous suivent au fil du temps.',
    inclus: [
      'Quatre films de 15 à 30 s',
      'Un jour de tournage par saison',
      'Un acteur par film',
      'Du matériel cinéma professionnel',
      'Les déclinaisons pour deux réseaux sociaux au choix',
    ],
    bgColor: '#6e6350',
    ink: true,
  },
  {
    name: 'Sur Mesure',
    eyebrow: "L'exception",
    desc: "La pièce maîtresse de votre enseigne est maintenant taillée sur mesure, plus de limite de temps, d'acteurs ou de décors. C'est vous qui donnez les limites et nous réalisons avec.",
    bgColor: '#1a1512',
    ink: true,
  },
]

// Le déroulé, en trois temps : ce que le client veut savoir avant d'écrire.
const DEROULE = [
  {
    n: '01',
    titre: "L'écriture",
    texte:
      "Après un premier rendez-vous et quelques prises de notes, nous écrivons un script qui fera ressentir l'essence de votre enseigne.",
  },
  {
    n: '02',
    titre: 'Le tournage',
    texte:
      'Une petite équipe de tournage, du matériel léger et fiable : nous savons nous faire discrets.',
  },
  {
    n: '03',
    titre: 'La livraison',
    texte:
      "Vous recevez le film, ses déclinaisons et les droits qui vont avec. S'il reste un détail qui vous chiffonne, deux séries de retouches sont comprises.",
  },
]

// Les questions qui reviennent : réponses courtes, sans renvoi.
const QUESTIONS = [
  {
    q: 'Combien ça coûte ?',
    r: 'Nous avons trois formules, Signature, Saisons et Sur Mesure. Chacune a sa gamme de prix, à vous de voir laquelle vous convient le mieux.',
  },
  {
    q: "Qui apparaît à l'écran ?",
    r: 'Nous avons à cœur de travailler avec des acteurs pour rendre votre lieu vivant ! Nous nous occupons du casting.',
  },
  {
    q: 'Partout en France ?',
    r: 'Oui, partout en France ! Chaque projet est une occasion de découvrir de nouveaux décors et de faire naître de nouvelles idées.',
  },
  {
    q: 'À qui appartient le film ?',
    r: "Les droits de diffusion sont inclus dans l'offre pour deux ans.",
  },
]

export default function Offres({ setDark }) {
  const ref = useReveal(0.35)
  const [index, setIndex] = useState(0)
  const offre = OFFRES[index]
  const ink = offre.ink

  // Le header suit la lumière de la pièce : crème sur grège et encre,
  // encre sur l'or pâle.
  useEffect(() => {
    setDark?.(ink)
  }, [ink, setDark])

  const next = () => setIndex((i) => (i + 1) % OFFRES.length)
  const prev = () => setIndex((i) => (i - 1 + OFFRES.length) % OFFRES.length)

  // Flèches clavier : on passe d'une offre à l'autre.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Mobile : un glissement horizontal fait défiler les offres. On ne réagit
  // qu'aux gestes nettement horizontaux, pour ne pas gêner le scroll vertical.
  const touch = useRef(null)
  const onTouchStart = (e) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const onTouchEnd = (e) => {
    if (!touch.current) return
    const dx = e.changedTouches[0].clientX - touch.current.x
    const dy = e.changedTouches[0].clientY - touch.current.y
    touch.current = null
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      dx < 0 ? next() : prev()
    }
  }

  return (
    <section
      ref={ref}
      aria-label="Offres"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="flex h-full flex-col justify-start overflow-y-auto px-6 pb-14 pt-28 transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:px-16 md:pb-[9vh]"
      style={{ backgroundColor: offre.bgColor }}
    >
      {/* Le sélecteur : les trois noms, dans la langue des liens du site */}
      <nav aria-label="Choisir une offre" className="reveal-up mt-10 md:mt-12" style={{ '--d': '0.15s' }}>
        <ul className="flex flex-wrap items-baseline justify-center gap-x-8 gap-y-2">
          {OFFRES.map((o, i) => (
            <li key={o.name}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-current={i === index ? 'true' : undefined}
                className={`nav-link cursor-pointer py-2 font-display text-[clamp(1.15rem,1.6vw,1.5rem)] transition-colors duration-500 ${
                  i === index
                    ? ink
                      ? 'text-creme'
                      : 'text-encre'
                    : ink
                      ? 'text-sable/45 hover:text-sable/80'
                      : 'text-encre/40 hover:text-encre/70'
                }`}
              >
                <span className="nav-label">
                  {o.name}
                  <span
                    className={`text-or transition-opacity duration-300 ${
                      i === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    .
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* La scène : tout est centré, posé au milieu de la pièce — le
          grand titre sous masque, le texte en colonne noble. */}
      <div key={offre.name} className="flex flex-1 flex-col items-center justify-center py-14 text-center md:py-16">
        <p
          className={`fade-in text-[11px] font-normal uppercase tracking-[0.3em] ${
            ink ? 'text-sable/60' : 'text-grege'
          }`}
          style={{ '--d': '0.05s' }}
        >
          {offre.eyebrow}
        </p>
        <h3
          className={`mt-5 font-display text-[clamp(2.8rem,6.5vw,6rem)] leading-[1.02] ${
            ink ? 'text-creme' : 'text-encre'
          }`}
        >
          <span className="mask" style={{ '--d': '0.1s' }}>
            <span>
              {offre.name}
              <span className="dot-breathe text-or">.</span>
            </span>
          </span>
        </h3>

        {offre.inclus ? (
          // Sous le titre : un chapô centré, puis les inclus en grille deux
          // colonnes — tirets alignés, blocs équilibrés. Pas de ligne.
          <div className="mt-8 flex w-full flex-col items-center">
            <p
              className={`fade-in max-w-[44ch] text-center text-[15px] font-light leading-[1.85] ${
                ink ? 'text-sable/90' : 'text-encre/80'
              }`}
              style={{ '--d': '0.3s' }}
            >
              {offre.desc}
            </p>
            <ul
              className="fade-in mt-10 grid max-w-xl gap-x-12 gap-y-3.5 text-left sm:grid-cols-2"
              style={{ '--d': '0.42s' }}
            >
              {offre.inclus.map((item) => (
                <li
                  key={item}
                  className={`flex gap-3 text-[13px] font-light leading-[1.5] ${
                    ink ? 'text-sable/85' : 'text-encre/80'
                  }`}
                >
                  <span aria-hidden="true" className={`mt-[0.1em] ${ink ? 'text-or/75' : 'text-[#8A7E68]'}`}>—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p
            className={`fade-in mx-auto mt-8 max-w-[52ch] text-[14px] font-light leading-[1.9] ${
              ink ? 'text-sable/90' : 'text-encre/80'
            }`}
            style={{ '--d': '0.3s' }}
          >
            {offre.desc}
          </p>
        )}
      </div>

      {/* Le déroulé et les questions : dans la lumière de l'offre choisie */}
      <div
        className={`mt-16 grid gap-14 border-t pt-14 transition-colors duration-700 lg:grid-cols-12 lg:gap-8 ${
          ink ? 'border-or/30' : 'border-or/50'
        }`}
      >
        <div className="lg:col-span-4">
          <p className={`text-[11px] font-normal uppercase tracking-[0.3em] ${ink ? 'text-sable/60' : 'text-grege'}`}>
            Comment ça se passe
          </p>
          <div className="mt-8 space-y-8">
            {DEROULE.map((etape) => (
              <div key={etape.n} className="flex gap-5">
                <span className="font-display text-[15px] leading-[1.6] text-or">{etape.n}</span>
                <div>
                  <p className={`font-display text-[17px] ${ink ? 'text-creme' : 'text-encre'}`}>{etape.titre}</p>
                  <p className={`mt-1.5 max-w-[38ch] text-[13px] font-light leading-[1.8] ${ink ? 'text-sable/75' : 'text-encre/75'}`}>
                    {etape.texte}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <p className={`text-[11px] font-normal uppercase tracking-[0.3em] ${ink ? 'text-sable/60' : 'text-grege'}`}>
            Les questions qui reviennent
          </p>
          <dl className="mt-8 grid gap-x-8 gap-y-8 md:grid-cols-2">
            {QUESTIONS.map((item) => (
              <div key={item.q}>
                <dt className={`font-display text-[16px] leading-[1.4] ${ink ? 'text-creme' : 'text-encre'}`}>
                  {item.q}
                </dt>
                <dd className={`mt-2 text-[13px] font-light leading-[1.8] ${ink ? 'text-sable/75' : 'text-encre/75'}`}>
                  {item.r}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <p
        className={`mt-auto pt-16 text-center text-[11px] font-light tracking-[0.04em] transition-colors duration-700 ${
          ink ? 'text-sable/60' : 'text-grege'
        }`}
      >
        Studio de production basé à Bordeaux
      </p>
    </section>
  )
}
