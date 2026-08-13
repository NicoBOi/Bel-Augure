// Source de vérité UNIQUE des trois offres : la page /offres (React) et le
// prérendu SEO (scripts/prerender.mjs) lisent tous deux ce fichier. Toute
// modification de prix ou de texte se propage donc partout au build — plus
// jamais un prix à l'écran différent de celui des meta ou du JSON-LD.
export const HERO_FILM_ID = '1211391558'

export const OFFERS = [
  {
    id: 'film',
    num: '01',
    name: 'Film Signature',
    label: 'Pour votre image',
    // La carte du haut et le chapitre portent la même promesse : le visiteur
    // retrouve mot pour mot ce qu'il a lu plus haut.
    cardPhrase: 'Donnez à votre marque son film de référence.',
    promise: 'Donnez à votre marque son film de référence.',
    price: 'À partir de 9 500 € HT',
    description: [
      'Votre marque dans ce qu’elle a de plus **essentiel**. Un **film de référence** qui en réunit le lieu, les gestes, le savoir-faire et l’atmosphère.',
    ],
    receiveTitle: 'Inclut',
    // Ordre de production : ce que nous faisons, puis ce qui est livré.
    receive: [
      'L’écriture, la réalisation et toute la postproduction',
      'La musique et deux séries de retours',
      'Un film de 60 à 90 secondes',
      'Deux coupes du film principal, en 30 et 15 secondes',
      'Des formats adaptés à votre site et à vos supports de présentation',
    ],
    cta: 'Parler de votre projet',
  },
  {
    id: 'histoires',
    num: '02',
    name: 'Histoires de marque',
    label: 'Pour vos réseaux',
    cardPhrase: 'Faites vivre votre marque sur les réseaux.',
    promise: 'Faites vivre votre marque sur les réseaux.',
    description: [
      'Chaque détail de votre marque peut devenir **une histoire**. Un soin, un geste, un produit, un lieu : autant de **films courts** pour faire vivre votre univers sur les **réseaux**.',
    ],
    formats: [
      {
        title: 'Collection',
        // Les deux formules répondent aux quatre mêmes questions, dans le
        // même ordre — nature, volume, rythme, usage — pour se comparer d'un
        // regard. nature = badge ; numbers = les deux chiffres clés, en
        // grand ; usage = la seule ligne en texte.
        nature: 'Ponctuel',
        numbers: [
          { n: '3', label: 'films minimum' },
          { n: '1', label: 'tournage' },
        ],
        usage: 'Pour un sujet précis',
        price: 'À partir de 5 500 € HT',
      },
      {
        title: 'Quatre saisons',
        nature: 'Récurrent',
        numbers: [
          { n: '4', label: 'films / mois' },
          { n: '1', label: 'tournage / mois' },
        ],
        usage: 'Pour faire vivre la marque',
        price: 'À partir de 4 500 € HT / mois',
        priceNote: 'Engagement de douze mois',
      },
    ],
    receiveTitle: 'Inclut',
    receive: [
      'L’écriture, le tournage et toute la postproduction',
      'Un film court par sujet',
      'Leurs déclinaisons adaptées à vos prises de parole',
      'Des formats verticaux prêts à diffuser',
    ],
    receiveNote: [
      'Quatre saisons comprend également la préparation du calendrier annuel des sujets.',
    ],
    cta: 'Parler de votre projet',
  },
  {
    id: 'campagne',
    num: '03',
    name: 'Campagne',
    label: 'Pour vos lancements',
    cardPhrase: 'Donnez à votre lancement toute son ampleur.',
    promise: 'Donnez à votre lancement toute son ampleur.',
    price: 'À partir de 15 000 € HT',
    description: [
      'Vous avez quelque chose de nouveau à dévoiler. Nous construisons son lancement comme **un récit** : un **film principal** pour en poser l’univers, puis plusieurs **films courts** pour l’annoncer, le révéler et le faire perdurer.',
    ],
    receiveTitle: 'Inclut',
    // Ordre de production : le concept, la fabrication, puis les livrables.
    receive: [
      'Le concept créatif de la campagne',
      'L’écriture, la réalisation et toute la postproduction',
      'La musique et deux séries de retours par étape',
      'Un film principal de 60 à 90 secondes',
      'Au moins trois films courts de 15 à 30 secondes',
      'Des formats adaptés à vos différents supports',
    ],
    cta: 'Parler de votre projet',
  },
]

// Bloc transverse (bas de page) — commun aux trois offres.
export const PROCESS = [
  {
    t: 'Un échange de trente minutes',
    d: 'Nous cadrons votre projet, votre échéance et votre budget.',
  },
  {
    t: 'Une proposition détaillée',
    d: 'Livrables, calendrier et prix sont définis avant de commencer.',
  },
  {
    t: 'Le tournage',
    d: 'Une équipe de trois à cinq personnes, dans le respect de votre lieu et de vos clients.',
  },
  {
    t: 'La postproduction',
    d: 'Entièrement réalisée au studio, avec deux séries de retours incluses.',
  },
]
