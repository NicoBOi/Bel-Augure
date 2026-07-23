import { useEffect, useState } from 'react'
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
    eyebrow: 'Le rendez-vous annuel',
    desc: 'Un film court à chaque saison, quatre par an, toujours la même écriture. Et toujours la même personne en face de vous.',
    detail: 'Une demi-journée de tournage à chaque saison.',
    bgColor: '#6e6350',
    ink: true,
  },
  {
    name: 'Sur Mesure',
    eyebrow: "L'exception",
    desc: 'Plusieurs films, des formats longs, du casting, des décors. Ce qui ne rentre pas dans les cases.',
    detail: 'On écrit le projet ensemble. Sur devis.',
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
      'On se parle, on vient voir le lieu, on écrit une note d’intention. Avant de tourner, vous savez déjà ce que vous verrez à l’écran.',
  },
  {
    n: '02',
    titre: 'Le tournage',
    texte:
      "Du matériel de cinéma, une petite équipe. Vous nous oublierez vite.",
  },
  {
    n: '03',
    titre: 'La livraison',
    texte:
      'Vous recevez le film, ses déclinaisons et les droits qui vont avec. Et s’il reste un détail qui vous chiffonne, deux séries de retouches sont comprises.',
  },
]

// Les questions qui reviennent : réponses courtes, sans renvoi.
const QUESTIONS = [
  {
    q: 'Combien ça coûte ?',
    r: 'Ça dépend du lieu et du format, alors on préfère en parler d’abord. Le devis qui suit est ferme.',
  },
  {
    q: 'Qu’attendez-vous de nous ?',
    r: 'Pas grand-chose. Un échange au début, quelqu’un à joindre le jour du tournage. Votre établissement reste ouvert.',
  },
  {
    q: 'Qui apparaît à l’écran ?',
    r: 'Votre équipe, des silhouettes qu’on caste, ou personne du tout. Les autorisations, on s’en occupe.',
  },
  {
    q: 'Vous déplacez-vous où ?',
    r: 'Nous sommes à Bordeaux. La Nouvelle-Aquitaine sans hésiter, plus loin si le projet vaut le voyage.',
  },
  {
    q: 'Et si le résultat ne nous plaît pas ?',
    r: 'C’est rare, parce que tout est validé avant de tourner. Et il reste deux séries de retouches pour ajuster.',
  },
  {
    q: 'À qui appartient le film ?',
    r: 'À vous. Site, réseaux, accueil : vous en faites ce que vous voulez. Seule la publicité payante se chiffre à part.',
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

  // Flèches clavier : on passe d'une offre à l'autre.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % OFFRES.length)
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + OFFRES.length) % OFFRES.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section
      ref={ref}
      aria-label="Offres"
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
          // Sous le titre : le paragraphe d'explication et ce qui est inclus,
          // séparés par une ligne (verticale en desktop, horizontale en
          // mobile). Les inclus se lisent en tirets.
          <div className="mt-10 grid w-full max-w-4xl gap-x-12 gap-y-8 text-left md:grid-cols-2">
            <p
              className={`fade-in self-center text-right text-[14px] font-semibold leading-[1.9] md:pr-2 ${
                ink ? 'text-sable/90' : 'text-encre/80'
              }`}
              style={{ '--d': '0.3s' }}
            >
              {offre.desc}
            </p>
            <ul
              className="fade-in space-y-3 border-t border-[#8A7E68] pt-8 md:border-l md:border-t-0 md:pl-12 md:pt-0"
              style={{ '--d': '0.42s' }}
            >
              {offre.inclus.map((item) => (
                <li
                  key={item}
                  className={`flex gap-3 text-[13.5px] font-light leading-[1.5] ${
                    ink ? 'text-sable/85' : 'text-encre/80'
                  }`}
                >
                  <span aria-hidden="true" className="text-[#8A7E68]">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <>
            <p
              className={`fade-in mx-auto mt-8 max-w-[52ch] text-[14px] font-light leading-[1.9] ${
                ink ? 'text-sable/90' : 'text-encre/80'
              }`}
              style={{ '--d': '0.3s' }}
            >
              {offre.desc}
            </p>
            <p
              className={`fade-in mt-6 text-[10.5px] font-normal uppercase tracking-[0.22em] ${
                ink ? 'text-or/85' : 'text-[#8f7d5f]'
              }`}
              style={{ '--d': '0.45s' }}
            >
              {offre.detail}
            </p>
          </>
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
