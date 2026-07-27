import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'

// Deux offres, deux lumières : Les Tableaux dans l'or pâle, Signature dans
// l'encre. Choisir une offre change la matière de la page — la hiérarchie
// n'est pas un style de texte, c'est la pièce qui change de lumière. Chaque
// offre est un configurateur : socle fixe, options cochables (certaines avec
// quantité), prix recalculé en direct, éléments sur devis mentionnés à part.
const OFFRES = [
  {
    name: 'Les Tableaux',
    eyebrow: 'Un tableau par espace',
    base: 3500,
    priceLabel: '3 500 €',
    from: false,
    accroche:
      'Cinq films courts, un par espace de votre établissement. Une comédienne dirigée, une lumière construite, une journée chez vous.',
    description: [
      "Votre hammam, votre bassin, votre cabine de soin, votre tisanerie. Chaque espace a sa raison d'être et chacun mérite son film.",
      "Nous en composons un tableau. Une comédienne joue ce que vit votre client, elle dit ce qu'il ressent. Lumière construite, son direct, direction d'acteur.",
      'Vous repartez avec de quoi parler de chaque espace séparément, pendant un trimestre.',
    ],
    inclus: [
      'Entretien de cadrage et repérage en visioconférence, 30 minutes',
      'Écriture des textes, une version par espace',
      'Une journée de tournage sur site, deux opérateurs',
      'Une comédienne professionnelle, dirigée et déclarée',
      'Lumière construite sur chaque espace, micro-canon, son direct',
      'Cinq tableaux — films verticaux de 15 à 25 secondes, un par espace',
      'Étalonnage et mixage',
      'Sous-titres incrustés',
      'Fichiers 4K, format 9:16, prêts à publier',
      'Dossier de livraison avec instructions de publication',
      'Cession de droits illimitée dans le temps — France, web, réseaux sociaux, publicité en ligne',
      'Livraison sous 7 jours ouvrés',
    ],
    options: [
      { label: 'Le Film — un film de 45 secondes sans parole et 10 photographies', price: 1000 },
      { label: 'Espace supplémentaire', price: 450, qty: [1, 3] },
      {
        label: 'Journée de tournage supplémentaire — jusqu’à cinq espaces de plus',
        price: 2500,
        qty: [1, 2],
      },
      { label: 'Comédienne supplémentaire', price: 400, qty: [1, 2] },
      { label: 'Dix photographies supplémentaires', price: 400, qty: [1, 3] },
      { label: 'Version anglaise sous-titrée', price: 250 },
      { label: 'Extension télévision, affichage, presse imprimée', quote: true },
    ],
    nonInclus: [
      'Stratégie éditoriale, rédaction de légendes, publication, community management',
      "rapport d'audience",
      'drone, machinerie, groupe électrogène',
      'stylisme, accessoires',
      'fichiers sources et rushes',
      "achat d'espace publicitaire",
    ],
    bgColor: 'rgb(217 198 166 / 0.45)',
    ink: false,
  },
  {
    name: 'Signature',
    eyebrow: 'Le film central',
    base: 9500,
    priceLabel: 'à partir de 9 500 €',
    from: true,
    accroche:
      'Un film écrit et joué. Trente secondes tenues, faites pour durer trois ans.',
    description: [
      "Celui qu'on met en page d'accueil. Celui qu'on envoie à la presse, qu'on projette en salon, qu'on montre à un investisseur.",
      "Un scénario, une équipe, une direction d'acteur. Nous écrivons, nous tournons, nous montons. Vous n'avez rien à préparer.",
    ],
    inclus: [
      "Entretien de cadrage et note d'intention",
      'Écriture du scénario et des dialogues, deux versions',
      'Repérage sur site, une demi-journée',
      "Casting et direction d'acteur",
      'Une journée de tournage',
      'Équipe complète — deux opérateurs, un comédien, une maquilleuse-coiffeuse, un assistant lumière, tous déclarés',
      'Un film de 30 secondes',
      'Une version longue de 60 secondes issue du même montage',
      'Deux déclinaisons, 9:16 et 1:1',
      'Quinze photographies de plateau',
      'Étalonnage, création sonore, mixage',
      'Musique sous licence pour la durée de la cession',
      'Fichiers 4K, prêts à publier, sous-titres incrustés sur les verticales et fichier séparé pour le film',
      'Deux allers-retours de montage',
      'Cession de droits 2 ans — France, digital et réseaux sociaux',
      'Livraison sous 3 semaines',
    ],
    options: [
      { label: 'Journée de tournage supplémentaire', price: 3500, qty: [1, 2] },
      { label: 'Comédien supplémentaire', price: 900, qty: [1, 3] },
      {
        label: 'Exploitation cinéma — DCP, extension de droits, contrats comédiens étendus',
        price: 2500,
      },
      { label: 'Voix off professionnelle', price: 600 },
      { label: 'Version anglaise sous-titrée', price: 250 },
      { label: 'Aller-retour de montage supplémentaire', price: 350, qty: [1, 3] },
      { label: 'Extension télévision, affichage, presse imprimée', quote: true },
    ],
    note: 'Renouvellement de licence à partir du 25ᵉ mois — 20 % du prix par an.',
    nonInclus: [
      "Achat d'espace, en salle comme ailleurs",
      'décors, stylisme, accessoires',
      'autorisations de tournage payantes',
      'figuration au-delà du comédien principal',
      'fichiers sources et rushes',
    ],
    bgColor: '#1a1512',
    ink: true,
  },
]

// Conditions communes aux deux offres, en pied de page.
const CONDITIONS = [
  'Acompte 50 % à la commande, solde à la livraison',
  'journée de 8 heures, heures supplémentaires majorées',
  'déplacement au-delà de 80 km depuis Bordeaux, repas et hébergement en sus',
  "report sans frais jusqu'à 7 jours avant le tournage",
  'fichiers sources conservés 12 mois, non livrés',
  'TVA 20 % en sus',
]

const euros = (n) => `${n.toLocaleString('fr-FR')} €`

export default function Offres({ setDark }) {
  const ref = useReveal(0.35)
  const [index, setIndex] = useState(0)
  // sel : { [indexOption]: quantité }. Une entrée absente = option non cochée.
  const [sel, setSel] = useState({})
  const offre = OFFRES[index]
  const ink = offre.ink

  // Le header suit la lumière de la pièce : crème sur l'encre, encre sur l'or.
  useEffect(() => {
    setDark?.(ink)
  }, [ink, setDark])

  // Changer d'offre remet toutes les options à zéro.
  useEffect(() => {
    setSel({})
  }, [index])

  // Flèches clavier : on passe d'une offre à l'autre.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % OFFRES.length)
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + OFFRES.length) % OFFRES.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Mobile : un glissement horizontal net fait défiler les offres, sans gêner
  // le scroll vertical de la page.
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
      setIndex((i) =>
        dx < 0 ? (i + 1) % OFFRES.length : (i - 1 + OFFRES.length) % OFFRES.length,
      )
    }
  }

  const toggle = (i) =>
    setSel((s) => {
      const next = { ...s }
      if (next[i]) delete next[i]
      else next[i] = offre.options[i].qty ? offre.options[i].qty[0] : 1
      return next
    })

  const step = (i, delta) =>
    setSel((s) => {
      const [min, max] = offre.options[i].qty
      const v = Math.min(max, Math.max(min, (s[i] || min) + delta))
      return { ...s, [i]: v }
    })

  // Prix en direct : le socle plus les options chiffrées. Les options « sur
  // devis » n'entrent jamais dans le calcul.
  const optionsTotal = offre.options.reduce((sum, o, i) => {
    if (!sel[i] || o.quote || !o.price) return sum
    return sum + o.price * sel[i]
  }, 0)
  const total = offre.base + optionsTotal
  const quoteSel = offre.options.filter((o, i) => o.quote && sel[i])

  // « Demander un devis » : la configuration retenue part par email, prête à
  // l'envoi. Aucun backend, aucun stockage — le récapitulatif se compose ici.
  const requestQuote = () => {
    const lines = offre.options
      .map((o, i) => {
        if (!sel[i]) return null
        if (o.quote) return `— ${o.label} (sur devis)`
        const qty = o.qty ? ` × ${sel[i]}` : ''
        const amount = o.price ? ` · ${euros(o.price * sel[i])}` : ''
        return `— ${o.label}${qty}${amount}`
      })
      .filter(Boolean)
    const body = [
      `Offre retenue : ${offre.name} — ${offre.priceLabel}`,
      '',
      lines.length ? 'Options :' : 'Sans option.',
      ...lines,
      '',
      `Estimation : ${offre.from ? 'à partir de ' : ''}${euros(total)} HT (TVA 20 % en sus)`,
    ].join('\n')
    window.location.href = `mailto:nicolas@belaugure.studio?subject=${encodeURIComponent(
      `Devis · ${offre.name}`,
    )}&body=${encodeURIComponent(body)}`
  }

  const label = ink ? 'text-sable/75' : 'text-encre/70'
  const dash = ink ? 'text-or/75' : 'text-[#8A7E68]'
  const priceText = ink ? 'text-or' : 'text-[#8f7d5f]'

  return (
    <section
      ref={ref}
      aria-label="Offres"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="flex h-full flex-col overflow-y-auto px-6 pt-28 transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:px-16"
      style={{ backgroundColor: offre.bgColor }}
    >
      {/* Le sélecteur : les deux noms, dans la langue des liens du site */}
      <nav aria-label="Choisir une offre" className="reveal-up mt-4 md:mt-8" style={{ '--d': '0.15s' }}>
        <ul className="flex flex-wrap items-baseline justify-center gap-x-10 gap-y-2">
          {OFFRES.map((o, i) => (
            <li key={o.name}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-current={i === index ? 'true' : undefined}
                className={`nav-link cursor-pointer py-3 font-display text-[clamp(1.15rem,1.7vw,1.6rem)] transition-colors duration-500 ${
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

      {/* Le contenu se rejoue à chaque changement d'offre (key) : titres et
          textes réapparaissent en fondu. */}
      <div key={offre.name} className="mx-auto w-full max-w-[1100px] pb-40">
        {/* En-tête : surtitre, nom, accroche, description */}
        <header className="mt-12 text-center md:mt-16">
          <p
            className={`fade-in text-[11px] font-normal uppercase tracking-[0.3em] ${label}`}
            style={{ '--d': '0.05s' }}
          >
            {offre.eyebrow}
          </p>
          <h1
            className={`mt-5 font-display text-[clamp(2.6rem,6vw,5.4rem)] leading-[1.02] ${
              ink ? 'text-creme' : 'text-encre'
            }`}
          >
            <span className="mask" style={{ '--d': '0.1s' }}>
              <span>
                {offre.name}
                <span className="dot-breathe text-or">.</span>
              </span>
            </span>
          </h1>
          <p
            className={`fade-in mx-auto mt-7 max-w-[52ch] font-display text-[clamp(1.15rem,1.7vw,1.5rem)] leading-[1.55] ${
              ink ? 'text-sable' : 'text-encre'
            }`}
            style={{ '--d': '0.24s' }}
          >
            {offre.accroche}
          </p>
          <div
            className={`fade-in mx-auto mt-8 max-w-[60ch] space-y-4 text-[14px] font-light leading-[1.9] ${
              ink ? 'text-sable/85' : 'text-encre/80'
            }`}
            style={{ '--d': '0.34s' }}
          >
            {offre.description.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </header>

        {/* Deux colonnes : ce qui est inclus, puis les options cochables */}
        <div
          className={`fade-in mt-16 grid gap-14 border-t pt-14 lg:grid-cols-12 lg:gap-10 ${
            ink ? 'border-or/25' : 'border-or/45'
          }`}
          style={{ '--d': '0.1s' }}
        >
          {/* Inclus — liste fixe */}
          <div className="lg:col-span-5">
            <p className={`text-[11px] font-normal uppercase tracking-[0.3em] ${label}`}>
              Ce qui est inclus
            </p>
            <ul className="mt-8 space-y-3.5">
              {offre.inclus.map((item) => (
                <li
                  key={item}
                  className={`flex gap-3 text-[13.5px] font-light leading-[1.6] ${
                    ink ? 'text-sable/85' : 'text-encre/80'
                  }`}
                >
                  <span aria-hidden="true" className={`mt-[0.15em] ${dash}`}>
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Options — cochables, certaines avec quantité */}
          <div className="lg:col-span-6 lg:col-start-7">
            <p className={`text-[11px] font-normal uppercase tracking-[0.3em] ${label}`}>
              Les options
            </p>
            <ul className="mt-6">
              {offre.options.map((o, i) => {
                const on = !!sel[i]
                return (
                  <li
                    key={o.label}
                    className={`flex items-center gap-4 border-b py-4 ${
                      ink ? 'border-creme/10' : 'border-encre/10'
                    }`}
                  >
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={on}
                      onClick={() => toggle(i)}
                      className="group flex flex-1 cursor-pointer items-start gap-3.5 text-left"
                    >
                      <span
                        aria-hidden="true"
                        className={`mt-[0.1em] flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-[5px] border transition-colors duration-300 ${
                          on
                            ? 'border-or bg-or text-encre'
                            : ink
                              ? 'border-creme/30 group-hover:border-creme/60'
                              : 'border-encre/25 group-hover:border-encre/50'
                        }`}
                      >
                        {on && <IconCheck />}
                      </span>
                      <span
                        className={`text-[13.5px] font-light leading-[1.5] ${
                          on
                            ? ink
                              ? 'text-creme'
                              : 'text-encre'
                            : ink
                              ? 'text-sable/85'
                              : 'text-encre/80'
                        }`}
                      >
                        {o.label}
                      </span>
                    </button>

                    <div className="flex shrink-0 items-center gap-3">
                      {o.qty && on && (
                        <span
                          className={`flex items-center gap-2.5 rounded-full border px-2.5 py-1 ${
                            ink ? 'border-creme/25' : 'border-encre/20'
                          }`}
                        >
                          <button
                            type="button"
                            aria-label="Réduire la quantité"
                            onClick={() => step(i, -1)}
                            disabled={sel[i] <= o.qty[0]}
                            className={`cursor-pointer text-[15px] leading-none transition-opacity disabled:cursor-default disabled:opacity-25 ${
                              ink ? 'text-creme' : 'text-encre'
                            }`}
                          >
                            −
                          </button>
                          <span
                            aria-live="polite"
                            className={`w-3 text-center text-[13px] tabular-nums ${
                              ink ? 'text-creme' : 'text-encre'
                            }`}
                          >
                            {sel[i]}
                          </span>
                          <button
                            type="button"
                            aria-label="Augmenter la quantité"
                            onClick={() => step(i, 1)}
                            disabled={sel[i] >= o.qty[1]}
                            className={`cursor-pointer text-[15px] leading-none transition-opacity disabled:cursor-default disabled:opacity-25 ${
                              ink ? 'text-creme' : 'text-encre'
                            }`}
                          >
                            +
                          </button>
                        </span>
                      )}
                      <span
                        className={`whitespace-nowrap text-[12.5px] tracking-[0.02em] ${
                          o.quote ? (ink ? 'text-sable/55' : 'text-encre/55') : priceText
                        }`}
                      >
                        {o.quote ? 'sur devis' : `+ ${euros(o.price)}`}
                      </span>
                    </div>
                  </li>
                )
              })}
            </ul>

            {offre.note && (
              <p className={`mt-5 text-[12px] font-light leading-[1.7] ${ink ? 'text-sable/60' : 'text-encre/60'}`}>
                {offre.note}
              </p>
            )}

            {/* Non inclus — au ras de l'offre, en atténué */}
            <div className="mt-12">
              <p className={`text-[11px] font-normal uppercase tracking-[0.3em] ${label}`}>
                Non inclus
              </p>
              <ul className="mt-5 flex flex-wrap items-baseline gap-y-2">
                {offre.nonInclus.map((item, i) => (
                  <li
                    key={item}
                    className={`text-[12.5px] font-light leading-[1.5] ${
                      ink ? 'text-sable/55' : 'text-encre/55'
                    }`}
                  >
                    {i > 0 && <span className={`mx-2 ${dash}`}>·</span>}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Conditions communes aux deux offres */}
        <div className={`mt-16 border-t pt-10 ${ink ? 'border-or/20' : 'border-or/40'}`}>
          <p className={`text-[10px] font-normal uppercase tracking-[0.3em] ${label}`}>
            Conditions communes
          </p>
          <p
            className={`mt-4 max-w-[80ch] text-[12px] font-light leading-[1.9] ${
              ink ? 'text-sable/55' : 'text-encre/55'
            }`}
          >
            {CONDITIONS.map((c, i) => (
              <span key={c}>
                {i > 0 && <span className={`mx-2 ${dash}`}>·</span>}
                {c}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Barre de prix : collée en bas, toujours visible pendant qu'on coche —
          y compris sur mobile. Le montant se recalcule en direct. */}
      <div
        className={`sticky bottom-0 z-10 -mx-6 mt-auto border-t px-6 py-4 backdrop-blur-md md:-mx-16 md:px-16 ${
          ink ? 'border-or/25 bg-encre/85' : 'border-or/45 bg-creme/85'
        }`}
      >
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-x-8 gap-y-3">
          <div>
            <p className={`text-[10px] font-normal uppercase tracking-[0.28em] ${label}`}>
              Votre configuration
            </p>
            <p
              className={`mt-1 font-display leading-none ${ink ? 'text-creme' : 'text-encre'}`}
              aria-live="polite"
            >
              {offre.from && (
                <span className={`font-sans text-[13px] font-light tracking-[0.02em] ${label}`}>
                  à partir de{' '}
                </span>
              )}
              <span className="text-[clamp(1.7rem,3vw,2.3rem)]">{euros(total)}</span>
              <span className={`ml-1.5 font-sans text-[12px] font-light ${label}`}>HT</span>
            </p>
            {quoteSel.length > 0 && (
              <p className={`mt-1.5 text-[11.5px] font-light leading-[1.5] ${priceText}`}>
                + sur devis : {quoteSel.map((o) => o.label).join(' · ')}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={requestQuote}
            className={`cta w-max shrink-0 cursor-pointer px-8 py-3 text-[13px] font-normal tracking-[0.06em] ${
              ink ? 'cta-light' : ''
            }`}
          >
            Demander un devis
          </button>
        </div>
      </div>
    </section>
  )
}

// Coche fine, dessinée à la charte.
function IconCheck() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}
