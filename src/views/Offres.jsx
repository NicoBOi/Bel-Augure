import { useEffect } from 'react'
import { useReveal } from '../hooks/useReveal.js'

// Trois offres, trois natures : le film central d'une maison, le
// rendez-vous des saisons, et ce qui sort du cadre. La hiérarchie de la
// page suit cette réalité : Signature domine, les deux autres l'entourent.
const SIGNATURE = {
  name: 'Signature',
  eyebrow: 'Le film central',
  desc: "Le film qui porte l'image d'une maison : son site, son accueil, ses salons. De 90 secondes à 2 minutes.",
  detail: 'Deux journées de tournage. Livré en six semaines.',
}

const AUTRES = [
  {
    name: 'Saisons',
    eyebrow: 'Le rendez-vous annuel',
    desc: 'Quatre films courts par an, un par saison, dans la même écriture.',
    detail: 'Une demi-journée de tournage à chaque saison.',
  },
  {
    name: 'Sur Mesure',
    eyebrow: "L'exception",
    desc: 'Campagnes, formats longs, casting et décors.',
    detail: 'Le périmètre s’écrit ensemble. Sur devis.',
  },
]

// Le déroulé, en trois temps : ce que le client veut savoir avant d'écrire.
const DEROULE = [
  {
    n: '01',
    titre: "L'écriture",
    texte:
      'Un échange, un repérage, une note d’intention. Vous savez ce qui sera filmé avant le premier plan.',
  },
  {
    n: '02',
    titre: 'Le tournage',
    texte:
      "De l'équipement cinéma, une équipe à taille humaine, qui sait se faire oublier.",
  },
  {
    n: '03',
    titre: 'La livraison',
    texte:
      'Le film, ses déclinaisons, les droits pour vos canaux. Deux séries de retouches sont incluses.',
  },
]

// Les questions qui reviennent : réponses courtes, sans renvoi.
const QUESTIONS = [
  {
    q: 'Combien ça coûte ?',
    r: 'Chaque projet est devisé après un premier échange, selon le lieu et le format. Le devis est ferme, sans surprise ensuite.',
  },
  {
    q: 'Qu’attendez-vous de nous ?',
    r: 'Très peu. Un échange au départ, un contact sur place le jour du tournage. Votre maison reste ouverte.',
  },
  {
    q: 'Qui apparaît à l’écran ?',
    r: 'Votre équipe, des silhouettes castées, ou personne. Nous composons selon votre image et gérons les autorisations.',
  },
  {
    q: 'Vous déplacez-vous où ?',
    r: 'En Nouvelle-Aquitaine d’abord. Plus loin, au cas par cas : parlons-en.',
  },
  {
    q: 'Et si le résultat ne nous plaît pas ?',
    r: 'Vous validez la direction avant le premier plan, et deux séries de retouches sont incluses.',
  },
  {
    q: 'À qui appartient le film ?',
    r: 'À vous. Les droits sont cédés pour votre site, vos réseaux et votre accueil. Les usages publicitaires étendus s’écrivent au devis.',
  },
]

// Chaque nom porte la couleur de sa gamme, assombrie pour rester pleine
// sur le crème : encre pour Héritage, or profond pour Signature, bronze
// doux pour Prélude, grège pour Saisons. Sur Mesure se signale par son
// filet pointillé.
const NAME_COLORS = {
  dark: 'text-encre',
  gold: 'text-[#9c7f4e]',
  light: 'text-[#8f7d5f]',
  greige: 'text-grege',
  dashed: 'text-encre/75',
}

// Planches : en attendant les stills étalonnés de chaque format, une
// matière cinéma sombre propre à chaque offre, teintée de sa gamme.
const STILLS = {
  light: 'bg-[linear-gradient(135deg,#3a322a,#1a1512_62%)]',
  gold: 'bg-[linear-gradient(135deg,#4a3d28,#1a1512_66%)]',
  dark: 'bg-[linear-gradient(135deg,#241d17,#0e0b09_72%)]',
  greige: 'bg-[linear-gradient(135deg,#4c4436,#1a1512_66%)]',
  dashed: 'bg-[linear-gradient(135deg,#2e2820,#1a1512_62%)]',
}


export default function Offres({ setDark }) {
  const ref = useReveal(0.35)

  useEffect(() => {
    setDark?.(false)
  }, [setDark])

  return (
    <section
      ref={ref}
      aria-label="Offres"
      className="flex h-full flex-col justify-start overflow-y-auto px-6 pb-14 pt-28 md:pb-[9vh] md:px-16"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
        <p
          className="reveal-up text-[11px] font-normal uppercase tracking-[0.3em] text-grege"
          style={{ '--d': '0.05s' }}
        >
          Offres
        </p>

        <p
          className="reveal-up hidden max-w-[34ch] text-right text-[12px] font-light leading-[1.8] text-grege lg:block"
          style={{ '--d': '0.25s' }}
        >
          Du sanctuaire intimiste à la grande maison du bien-être, chaque
          lieu a son exigence.
        </p>
      </div>

      {/* Une bande dominante pour Signature, puis les deux autres natures
          côte à côte sous un filet : la hiérarchie est la composition. */}
      <div className="mt-12 lg:mt-16">
        <div className="reveal-up grid items-end gap-8 border-b border-encre/10 pb-12 lg:grid-cols-12 lg:gap-8 lg:pb-14" style={{ '--d': '0.15s' }}>
          <div className="lg:col-span-7">
            <p className="text-[11px] font-normal uppercase tracking-[0.3em] text-grege">
              {SIGNATURE.eyebrow}
            </p>
            <h3 className="mt-4 font-display text-[clamp(3.2rem,7vw,6.4rem)] leading-[0.98] text-encre">
              {SIGNATURE.name}
              <span className="text-or">.</span>
            </h3>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-[44ch] text-[14px] font-light leading-[1.9] text-encre/80">
              {SIGNATURE.desc}
            </p>
            <p className="mt-4 text-[11px] font-normal uppercase tracking-[0.2em] text-grege">
              {SIGNATURE.detail}
            </p>
          </div>
        </div>

        <div className="grid gap-10 pt-10 md:grid-cols-2 md:gap-0 lg:pt-12">
          {AUTRES.map((offre, i) => (
            <div
              key={offre.name}
              className={`reveal-up ${i === 1 ? 'md:border-l md:border-encre/10 md:pl-12 lg:pl-16' : 'md:pr-12 lg:pr-16'}`}
              style={{ '--d': `${0.3 + i * 0.1}s` }}
            >
              <p className="text-[11px] font-normal uppercase tracking-[0.3em] text-grege">
                {offre.eyebrow}
              </p>
              <h3 className="mt-3 font-display text-[clamp(1.8rem,2.8vw,2.6rem)] leading-[1.1] text-encre">
                {offre.name}
                <span className="text-or">.</span>
              </h3>
              <p className="mt-4 max-w-[44ch] text-[13.5px] font-light leading-[1.85] text-encre/80">
                {offre.desc}
              </p>
              <p className="mt-3 text-[11px] font-normal uppercase tracking-[0.2em] text-grege">
                {offre.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Le déroulé et les questions : rassurer l'hésitant avant l'email */}
      <div className="mt-16 grid gap-14 border-t border-encre/10 pt-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <p className="text-[11px] font-normal uppercase tracking-[0.3em] text-grege">
            Comment ça se passe
          </p>
          <div className="mt-8 space-y-8">
            {DEROULE.map((etape) => (
              <div key={etape.n} className="flex gap-5">
                <span className="font-display text-[15px] leading-[1.6] text-or">{etape.n}</span>
                <div>
                  <p className="font-display text-[17px] text-encre">{etape.titre}</p>
                  <p className="mt-1.5 max-w-[38ch] text-[13px] font-light leading-[1.8] text-encre/75">
                    {etape.texte}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <p className="text-[11px] font-normal uppercase tracking-[0.3em] text-grege">
            Les questions qui reviennent
          </p>
          <dl className="mt-8 grid gap-x-8 gap-y-8 md:grid-cols-2">
            {QUESTIONS.map((item) => (
              <div key={item.q}>
                <dt className="font-display text-[16px] leading-[1.4] text-encre">
                  {item.q}
                </dt>
                <dd className="mt-2 text-[13px] font-light leading-[1.8] text-encre/75">
                  {item.r}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
