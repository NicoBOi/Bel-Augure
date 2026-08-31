// Source de vérité UNIQUE des trois offres : la page /offres (React) et le
// prérendu SEO (scripts/prerender.mjs) lisent tous deux ce fichier. Toute
// modification de prix ou de texte se propage donc partout au build — plus
// jamais un prix à l'écran différent de celui des meta ou du JSON-LD.
export const HERO_FILM_ID = '1211391558'

export const OFFERS = [
  {
    id: 'histoires',
    num: '01',
    name: 'Histoires',
    contactName: 'Histoires de marque',
    label: 'Trois récits',
    // La carte du haut et le chapitre portent la même promesse : le visiteur
    // retrouve mot pour mot ce qu'il a lu plus haut.
    cardPhrase: 'Trois histoires pour faire vivre votre univers.',
    promise: 'Trois histoires pour faire vivre votre univers.',
    description: [
      'Trois **films narratifs courts**, chacun construit autour d’une idée, d’une situation et d’une émotion propres.',
    ],
    formats: [
      {
        title: 'Trois histoires',
        // Les deux formules répondent aux mêmes questions, dans le même
        // ordre — nature, volume, rythme, usage — pour se comparer d'un
        // regard. nature = badge ; rows = fiche label/valeur, rythme d'une
        // carte de menu plutôt que deux chiffres isolés (un « 1 » géant
        // n'a rien d'un chiffre à mettre en avant).
        nature: 'Ponctuel',
        // Nombres en toutes lettres, comme partout ailleurs dans les textes
        // de marque (cf. FICHE-ENTREPRISE.md) : jamais un chiffre à côté
        // d'un mot écrit.
        rows: [
          { label: 'Volume', value: 'Trois films de 15 à 30 s' },
          { label: 'Rythme', value: 'Un tournage' },
        ],
        price: 'À partir de 3 900 € HT',
      },
      {
        title: 'Quatre saisons',
        nature: 'Récurrent',
        rows: [
          { label: 'Volume', value: 'Trois Histoires / mois' },
          { label: 'Rythme', value: 'Un tournage / mois' },
        ],
        price: 'À partir de 3 600 € HT / mois',
        priceNote: 'Premier cycle de trois mois',
      },
    ],
    receiveTitle: 'Inclut',
    receive: [
      'La conception, l’écriture et le casting',
      'La réalisation, la direction d’acteur et la lumière',
      'Le montage, le sound design, l’étalonnage et une série de retours',
      'Des formats définis dès l’écriture selon les supports de diffusion',
    ],
    receiveNote: [
      'Quatre saisons construit votre univers dans le temps, à mesure que nous apprenons à connaître votre maison, ses lieux et son langage visuel.',
    ],
    cta: 'Parler de votre projet',
  },
  {
    id: 'film',
    num: '02',
    name: 'Film',
    contactName: 'Film Signature',
    label: 'Un récit ample',
    cardPhrase: 'Une histoire pour incarner votre maison.',
    promise: 'Une histoire pour incarner votre maison.',
    price: 'À partir de 6 900 € HT',
    description: [
      'Un **récit plus ample**, pensé comme le film central de votre marque. Le scénario laisse vivre une progression, des personnages, une voix ou un silence.',
    ],
    receiveTitle: 'Inclut',
    receive: [
      'La conception, l’écriture, la préproduction et la direction artistique',
      'Le casting, la réalisation et la direction d’acteur',
      'Un tournage dimensionné selon le scénario',
      'Le montage, le sound design, l’étalonnage et deux séries de retours',
      'Un film d’environ 60 secondes à 2 minutes, avec les versions courtes définies en amont',
    ],
    cta: 'Parler de votre projet',
  },
  {
    id: 'campagne',
    num: '03',
    name: 'Campagne',
    label: 'Pour vos lancements',
    cardPhrase: 'Un récit principal, plusieurs histoires.',
    promise: 'Un récit principal, plusieurs histoires.',
    price: 'À partir de 9 900 € HT',
    description: [
      'Une **idée centrale**, un **Film principal** et plusieurs **Histoires** complémentaires, réunis par une même direction artistique.',
    ],
    receiveTitle: 'Inclut',
    // Ordre de production : le concept, la fabrication, puis les livrables.
    receive: [
      'Le concept et la direction artistique de la campagne',
      'L’écriture, le casting, la réalisation et la direction d’acteur',
      'Un Film principal et plusieurs Histoires autour de la même idée',
      'Le montage, le sound design et l’étalonnage',
      'Des formats définis selon les supports de diffusion',
      'Deux séries de retours par étape',
    ],
    priceNote:
      'Chaque projet est écrit sur mesure. Le devis final dépend du scénario, du casting, des lieux et du périmètre de diffusion.',
    cta: 'Parler de votre projet',
  },
]

// Bloc transverse (bas de page) — commun aux trois offres.
export const PROCESS = [
  {
    t: 'Comprendre',
    d: 'Découvrir votre marque, son expérience et ce que le film doit faire ressentir.',
  },
  {
    t: 'Écrire',
    d: 'Développer le concept, l’histoire et la direction visuelle, validés avant le tournage.',
  },
  {
    t: 'Réaliser',
    d: 'Mettre en scène et tourner le récit avec l’équipe adaptée au scénario.',
  },
  {
    t: 'Finaliser',
    d: 'Assurer le montage, le sound design et l’étalonnage jusqu’aux masters.',
  },
]
