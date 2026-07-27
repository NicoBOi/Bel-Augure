import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'

// Page /offres — une console d'atelier, pas un panier. À GAUCHE on lit l'offre
// (accroche, description, ce qui est déjà compris) ; à DROITE on la compose
// (les options qu'on ajoute) et le devis se recompose en direct, comme un
// panneau de stats. On emprunte la structure du loadout de jeu vidéo — slots,
// états francs, un seul chiffre qui compte — jamais son esthétique (pas de HUD,
// pas de néon). La pièce change de lumière selon l'offre : or pâle pour Les
// Tableaux, encre pour Signature.
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

// Les questions qui reviennent, gardées en bas de page. Réponses courtes.
const QUESTIONS = [
  {
    q: 'Combien ça coûte ?',
    r: 'Deux offres : Les Tableaux à 3 500 € et Signature à partir de 9 500 €. Vous composez ensuite avec les options, le prix se met à jour en direct.',
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
    r: 'Les droits de diffusion sont inclus : sans limite de temps pour Les Tableaux, deux ans pour Signature.',
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
  // Repli du récapitulatif sur mobile (barre du bas dépliable).
  const [openDetail, setOpenDetail] = useState(false)
  const offre = OFFRES[index]
  const ink = offre.ink

  // Le header suit la lumière de la pièce : crème sur l'encre, encre sur l'or.
  useEffect(() => {
    setDark?.(ink)
  }, [ink, setDark])

  // Changer d'offre remet toutes les options à zéro.
  useEffect(() => {
    setSel({})
    setOpenDetail(false)
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

  // Composition du devis : socle + options chiffrées, les « sur devis » à part.
  const priced = offre.options
    .map((o, i) =>
      !sel[i] || o.quote || !o.price
        ? null
        : { label: o.label, qty: o.qty ? sel[i] : 1, hasQty: !!o.qty, amount: o.price * sel[i] },
    )
    .filter(Boolean)
  const quoteItems = offre.options.filter((o, i) => o.quote && sel[i]).map((o) => o.label)
  const items = [{ label: offre.name, amount: offre.base, base: true }, ...priced]
  const total = items.reduce((s, it) => s + it.amount, 0)
  const hasQuote = quoteItems.length > 0
  const fromPrice = offre.from || hasQuote

  // « Demander un devis » : la configuration retenue part par email, prête à
  // l'envoi. Aucun backend, aucun stockage — le récapitulatif se compose ici.
  const requestQuote = () => {
    const lines = [
      ...priced.map(
        (it) => `— ${it.label}${it.hasQty ? ` × ${it.qty}` : ''} · ${euros(it.amount)}`,
      ),
      ...quoteItems.map((l) => `— ${l} (sur devis)`),
    ]
    const body = [
      `Offre retenue : ${offre.name} — ${offre.priceLabel}`,
      '',
      lines.length ? 'Options :' : 'Sans option.',
      ...lines,
      '',
      `Estimation : ${fromPrice ? 'à partir de ' : ''}${euros(total)} HT (TVA 20 % en sus)`,
    ].join('\n')
    window.location.href = `mailto:nicolas@belaugure.studio?subject=${encodeURIComponent(
      `Devis · ${offre.name}`,
    )}&body=${encodeURIComponent(body)}`
  }

  const label = ink ? 'text-sable/75' : 'text-encre/70'
  const dash = ink ? 'text-or/75' : 'text-[#8A7E68]'
  const priceText = ink ? 'text-or' : 'text-[#8f7d5f]'
  const lineParts = { items, quoteItems, ink, priceText, label }

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

      {/* Tout le contenu se rejoue à chaque changement d'offre (key) */}
      <div key={offre.name} className="mx-auto w-full max-w-[1180px] pb-40 lg:pb-24">
        {/* En-tête, ferré à gauche sur la colonne lecture */}
        <header className="mt-12 md:mt-16">
          <p
            className={`fade-in text-[11px] font-normal uppercase tracking-[0.3em] ${label}`}
            style={{ '--d': '0.05s' }}
          >
            {offre.eyebrow}
          </p>
          <h1
            className={`mt-4 font-display text-[clamp(2.6rem,6vw,5.4rem)] leading-[1.02] ${
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
            className={`fade-in mt-4 text-[12px] font-normal uppercase tracking-[0.22em] ${priceText}`}
            style={{ '--d': '0.18s' }}
          >
            {offre.from ? 'À partir de ' : ''}
            {offre.priceLabel.replace('à partir de ', '')} · HT
          </p>
        </header>

        {/* Le split : lire à gauche, composer à droite */}
        <div
          className={`mt-12 grid gap-x-16 gap-y-12 border-t pt-12 lg:grid-cols-12 ${
            ink ? 'border-or/25' : 'border-or/45'
          }`}
        >
          {/* ── GAUCHE : lecture ───────────────────────────────── */}
          <div className="lg:col-span-6">
            <p
              className={`fade-in max-w-[52ch] font-display text-[clamp(1.2rem,1.8vw,1.6rem)] leading-[1.5] ${
                ink ? 'text-sable' : 'text-encre'
              }`}
              style={{ '--d': '0.24s' }}
            >
              {offre.accroche}
            </p>
            <div
              className={`fade-in mt-8 max-w-[60ch] space-y-4 text-[14px] font-light leading-[1.9] ${
                ink ? 'text-sable/85' : 'text-encre/80'
              }`}
              style={{ '--d': '0.34s' }}
            >
              {offre.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            {/* Compris : coché, verrouillé — la substance de l'offre */}
            <p className={`mt-12 text-[11px] font-normal uppercase tracking-[0.3em] ${label}`}>
              Compris dans l’offre
            </p>
            <ul className="mt-6 space-y-3">
              {offre.inclus.map((item) => (
                <li
                  key={item}
                  className={`flex gap-3 text-[13px] font-light leading-[1.55] ${
                    ink ? 'text-sable/80' : 'text-encre/75'
                  }`}
                >
                  <span aria-hidden="true" className="mt-[0.15em] shrink-0 text-or">
                    <IconCheck />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── DROITE : la console ────────────────────────────── */}
          <div className="lg:col-span-6">
            <div className="lg:sticky lg:top-24 lg:max-h-[calc(100dvh-7rem)] lg:overflow-y-auto lg:pr-1">
              <div
                className={`rounded-2xl border p-6 backdrop-blur-sm md:p-7 ${
                  ink ? 'border-or/20 bg-[#221c17]/55' : 'border-or/35 bg-creme/45'
                }`}
              >
                <p className={`text-[11px] font-normal uppercase tracking-[0.3em] ${label}`}>
                  Composez votre film
                </p>
                <p className={`mt-2 text-[12.5px] font-light leading-[1.6] ${ink ? 'text-sable/70' : 'text-encre/65'}`}>
                  Le socle est compris. Ajoutez ce qui vous ressemble.
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
                            className={`mt-[0.05em] flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-[5px] border transition-colors duration-300 ${
                              on
                                ? 'border-or bg-or text-encre'
                                : ink
                                  ? 'border-creme/30 group-hover:border-creme/60'
                                  : 'border-encre/25 group-hover:border-encre/55'
                            }`}
                          >
                            {on && <IconCheck />}
                          </span>
                          <span className="min-w-0">
                            <span
                              className={`block text-[13.5px] font-light leading-[1.5] ${
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
                            {/* Filet or qui se trace sous la ligne retenue */}
                            <span
                              aria-hidden="true"
                              className="mt-1 block h-px origin-left bg-or/70"
                              style={{
                                transform: on ? 'scaleX(1)' : 'scaleX(0)',
                                transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
                              }}
                            />
                          </span>
                        </button>

                        <div className="flex shrink-0 items-center gap-3">
                          {o.qty && on && (
                            <span
                              className={`flex items-center gap-2 rounded-full border px-2.5 py-1 ${
                                ink ? 'border-creme/25' : 'border-encre/20'
                              }`}
                            >
                              <button
                                type="button"
                                aria-label={`Réduire la quantité — ${o.label}`}
                                onClick={() => step(i, -1)}
                                disabled={sel[i] <= o.qty[0]}
                                className={`-my-1 flex h-9 w-8 cursor-pointer items-center justify-center text-[16px] leading-none transition-transform active:scale-90 disabled:cursor-default disabled:opacity-25 ${
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
                                aria-label={`Augmenter la quantité — ${o.label}`}
                                onClick={() => step(i, 1)}
                                disabled={sel[i] >= o.qty[1]}
                                className={`-my-1 flex h-9 w-8 cursor-pointer items-center justify-center text-[16px] leading-none transition-transform active:scale-90 disabled:cursor-default disabled:opacity-25 ${
                                  ink ? 'text-creme' : 'text-encre'
                                }`}
                              >
                                +
                              </button>
                            </span>
                          )}
                          <span
                            className={`whitespace-nowrap text-[12.5px] tracking-[0.02em] ${
                              o.quote
                                ? `italic ${ink ? 'text-sable/55' : 'text-encre/55'}`
                                : priceText
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
                  <p className={`mt-4 text-[12px] font-light leading-[1.7] ${ink ? 'text-sable/60' : 'text-encre/60'}`}>
                    {offre.note}
                  </p>
                )}

                {/* Le devis, en direct — desktop (sur mobile : barre du bas) */}
                <div className={`mt-7 hidden border-t pt-6 lg:block ${ink ? 'border-or/25' : 'border-or/45'}`}>
                  <p className={`text-[11px] font-normal uppercase tracking-[0.3em] ${label}`}>Votre devis</p>
                  <div className="mt-5">
                    <ReceiptLines {...lineParts} />
                  </div>
                  <div
                    className={`mt-6 flex items-end justify-between border-t pt-5 ${ink ? 'border-creme/12' : 'border-encre/12'}`}
                    aria-live="polite"
                  >
                    <span className={`text-[12px] font-light ${label}`}>Total{fromPrice ? ' estimé' : ''}</span>
                    <span className={`font-display leading-none ${ink ? 'text-creme' : 'text-encre'}`}>
                      {fromPrice && (
                        <span className={`font-sans text-[12px] font-light ${label}`}>à partir de </span>
                      )}
                      <span key={total} className="price-pulse text-[clamp(1.8rem,2.4vw,2.3rem)] tabular-nums">
                        {euros(total)}
                      </span>
                      <span className={`ml-1.5 font-sans text-[12px] font-light ${label}`}>HT</span>
                    </span>
                  </div>
                  {hasQuote && (
                    <p className={`mt-2 text-[11.5px] font-light leading-[1.5] ${priceText}`}>
                      + éléments sur devis, chiffrés avec vous
                    </p>
                  )}
                  <p className={`mt-1.5 text-[11px] font-light ${ink ? 'text-sable/50' : 'text-encre/50'}`}>
                    TVA 20 % en sus
                  </p>
                  <button
                    type="button"
                    onClick={requestQuote}
                    className={`cta mt-6 w-full cursor-pointer py-3.5 text-[13px] font-normal tracking-[0.06em] ${
                      ink ? 'cta-light' : ''
                    }`}
                  >
                    Demander un devis
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Épilogue pleine largeur : questions, non-inclus, conditions ── */}
        <div className={`mt-20 border-t pt-14 ${ink ? 'border-or/25' : 'border-or/45'}`}>
          <p className={`text-[11px] font-normal uppercase tracking-[0.3em] ${label}`}>
            Les questions qui reviennent
          </p>
          <dl className="mt-8 grid gap-x-12 gap-y-9 md:grid-cols-2">
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

        <div className="mt-16">
          <p className={`text-[11px] font-normal uppercase tracking-[0.3em] ${label}`}>Non inclus</p>
          <p
            className={`mt-4 max-w-[80ch] text-[12.5px] font-light leading-[1.9] ${
              ink ? 'text-sable/55' : 'text-encre/55'
            }`}
          >
            {offre.nonInclus.map((item, i) => (
              <span key={item}>
                {i > 0 && <span className={`mx-2 ${dash}`}>·</span>}
                {item}
              </span>
            ))}
          </p>
        </div>

        <div className={`mt-14 border-t pt-10 ${ink ? 'border-or/20' : 'border-or/40'}`}>
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

      {/* Mobile : le devis se glisse en barre du bas, toujours visible, et se
          déplie pour montrer le détail ligne par ligne. */}
      <div
        className={`sticky bottom-0 z-10 -mx-6 mt-auto border-t backdrop-blur-md md:-mx-16 lg:hidden ${
          ink ? 'border-or/25 bg-encre/90' : 'border-or/45 bg-creme/90'
        }`}
      >
        {openDetail && (
          <div className="max-h-[45vh] overflow-y-auto px-6 pt-5 md:px-16">
            <ReceiptLines {...lineParts} />
            {hasQuote && (
              <p className={`mt-3 text-[11.5px] font-light ${priceText}`}>
                + éléments sur devis, chiffrés avec vous
              </p>
            )}
          </div>
        )}
        <div className="flex items-center justify-between gap-4 px-6 py-4 md:px-16">
          <button
            type="button"
            onClick={() => setOpenDetail((v) => !v)}
            aria-expanded={openDetail}
            className="cursor-pointer text-left"
          >
            <span className={`block text-[10px] font-normal uppercase tracking-[0.25em] ${label}`}>
              {openDetail ? 'Masquer le détail' : 'Votre devis'}
            </span>
            <span className={`font-display leading-none ${ink ? 'text-creme' : 'text-encre'}`}>
              {fromPrice && <span className={`font-sans text-[12px] font-light ${label}`}>à partir de </span>}
              <span key={total} className="price-pulse text-[clamp(1.5rem,7vw,1.9rem)] tabular-nums">
                {euros(total)}
              </span>
              <span className={`ml-1 inline-block align-middle transition-transform ${openDetail ? 'rotate-180' : ''} ${label}`}>
                <IconChevron />
              </span>
            </span>
          </button>
          <button
            type="button"
            onClick={requestQuote}
            className={`cta w-max shrink-0 cursor-pointer px-6 py-3 text-[13px] font-normal tracking-[0.06em] ${
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

// Les lignes du devis, partagées entre la console (desktop) et la barre (mobile).
// Récap itémisé : socle, options chiffrées (× quantité, sous-total), sur-devis.
function ReceiptLines({ items, quoteItems, ink, priceText, label }) {
  const rowText = ink ? 'text-sable/85' : 'text-encre/80'
  const strong = ink ? 'text-creme' : 'text-encre'
  return (
    <ul className="space-y-3">
      {items.map((it, i) => (
        <li key={`${it.label}-${i}`} className="flex items-baseline justify-between gap-4">
          <span className={`text-[13px] font-light leading-[1.4] ${it.base ? strong : rowText}`}>
            {it.label}
            {it.qty > 1 && <span className={label}> × {it.qty}</span>}
          </span>
          <span className={`shrink-0 text-[13px] tabular-nums ${it.base ? strong : priceText}`}>
            {it.base ? '' : '+ '}
            {euros(it.amount)}
          </span>
        </li>
      ))}
      {quoteItems.map((l) => (
        <li key={l} className="flex items-baseline justify-between gap-4">
          <span className={`text-[13px] font-light leading-[1.4] ${rowText}`}>{l}</span>
          <span className={`shrink-0 text-[12px] italic ${ink ? 'text-sable/55' : 'text-encre/55'}`}>
            sur devis
          </span>
        </li>
      ))}
    </ul>
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

function IconChevron() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}
