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
    label: 'Pour présenter votre marque',
    // La carte du haut et le chapitre portent la même promesse : le visiteur
    // retrouve mot pour mot ce qu'il a lu plus haut.
    cardPhrase: 'Donnez à votre marque son film de référence.',
    promise: 'Donnez à votre marque son film de référence.',
    price: 'À partir de 5 500 € HT',
    description: [
      'Un film pensé pour présenter votre marque dans son ensemble : son univers, son savoir-faire, ses lieux ou ses produits.',
      'La pièce centrale de votre image, conçue pour votre site, vos présentations et vos rendez-vous professionnels.',
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
      'Chaque film se concentre sur un sujet : un soin, un produit, une expérience, un geste ou un savoir-faire.',
      'Des films courts conçus pour les réseaux, avec la même exigence d’image.',
    ],
    formats: [
      {
        title: 'Collection',
        sub: 'Plusieurs films, tournés ensemble.',
        body: [
          'À partir de trois films autour d’un même sujet, accompagnés de leurs déclinaisons courtes.',
        ],
        closing: 'Ponctuel',
        price: 'À partir de 3 500 € HT',
      },
      {
        title: 'Quatre saisons',
        sub: 'De nouveaux films chaque mois.',
        body: [
          'Une journée de tournage mensuelle pour suivre vos saisons, vos nouveautés et vos temps forts.',
          'Chaque mois, au moins quatre films et leurs déclinaisons, prêts à diffuser sur vos réseaux.',
        ],
        closing: 'Récurrent',
        price: 'À partir de 3 000 € HT / mois',
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
    label: 'Pour un lancement',
    cardPhrase: 'Donnez à votre lancement toute son ampleur.',
    promise: 'Donnez à votre lancement toute son ampleur.',
    price: 'À partir de 15 000 € HT',
    description: [
      'Pour une ouverture, un nouveau produit ou une nouvelle gamme, nous imaginons un concept créatif pensé pour l’ensemble du lancement.',
      'Un film principal en pose l’univers. Les films courts l’annoncent, en révèlent les détails et le prolongent sur vos différents supports.',
      'Une seule idée, déclinée dans chaque film.',
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
