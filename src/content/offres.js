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
    cardPhrase: 'Devenez le premier choix avant même la première visite.',
    price: 'À partir de 5 500 € HT',
    promise: 'Faites ressentir ce qui vous distingue.',
    description: [
      'Une atmosphère, un geste, une manière de prendre soin : le Film Signature réunit ce que vos clients doivent ressentir pour avoir envie de vous choisir.',
      'Il devient le film de référence de votre site, de vos présentations et de vos réseaux.',
    ],
    receiveTitle: 'Ce que vous recevez',
    receive: [
      'Un film de marque de 60 à 90 secondes',
      'Ses versions courtes de 30 et 15 secondes',
      'Les versions horizontales et verticales convenues',
      'L’écriture, la réalisation et toute la postproduction',
      'La musique et deux séries de retours',
    ],
    cta: 'Parler de votre projet',
  },
  {
    id: 'histoires',
    num: '02',
    name: 'Histoires de marque',
    label: 'Pour faire vivre vos réseaux',
    cardPhrase: 'Mettez en lumière chacune de vos expériences pour donner envie de vous découvrir, de vous choisir et de revenir vers vous.',
    promise: 'Chaque film donne une nouvelle raison de vous choisir.',
    description: [
      'Un soin, un lieu, un produit ou un savoir-faire peut devenir une histoire à part entière.',
      'Nous en faisons des films courts capables d’attirer l’attention sur les réseaux sans banaliser votre image.',
    ],
    formatsTitle: 'Ponctuellement ou toute l’année',
    formats: [
      {
        title: 'Collection',
        sub: 'Trois films tournés en une journée.',
        body: [
          'Trois films courts tournés en une journée autour d’un même sujet, déclinés en formats verticaux pour les réseaux.',
          'Une même idée pour présenter une expérience, une gamme, une personne ou un savoir-faire.',
        ],
        closing: 'Ponctuel',
        price: 'À partir de 3 500 € HT',
      },
      {
        title: 'Quatre saisons',
        sub: 'Un nouveau film chaque mois, sans repartir de zéro.',
        body: [
          'Nous préparons l’année autour de vos saisons, de vos nouveautés et de vos temps forts.',
          'Votre image reste cohérente et vous travaillez avec un studio qui connaît déjà votre marque.',
        ],
        closing: 'Mensuel',
        price: '3 000 € HT par mois',
        priceNote: 'Engagement de douze mois',
      },
    ],
    receiveTitle: 'Dans les deux formules',
    receive: [
      'Des films courts écrits et réalisés pour votre marque',
      'Les versions horizontales et verticales convenues',
      'La musique, le montage, l’étalonnage et le travail sonore',
      'Deux séries de retours',
    ],
    receiveNote: [
      'Quatre saisons comprend également le calendrier annuel et les livraisons mensuelles.',
    ],
    cta: 'Parler de votre projet',
  },
  {
    id: 'campagne',
    num: '03',
    name: 'Campagne',
    label: 'Pour un lancement',
    cardPhrase: 'Créez l’engouement autour de votre prochaine ouverture ou de votre prochain lancement.',
    price: 'À partir de 15 000 € HT',
    promise: 'Faites de votre prochain temps fort un moment que l’on retient.',
    description: [
      'Pour une ouverture, un lancement ou une nouvelle identité, nous imaginons une idée forte, déclinée dans un film principal et plusieurs films courts.',
      'Le film principal révèle le projet. Les autres l’annoncent, en dévoilent les détails et prolongent le lancement.',
      'Chaque film peut vivre seul, mais tous se reconnaissent au premier regard.',
    ],
    receiveTitle: 'Ce que vous recevez',
    receive: [
      'Une idée créative commune à toute la campagne',
      'Un film principal de 60 à 90 secondes',
      'Au moins trois films courts de 15 à 30 secondes',
      'Les versions horizontales et verticales convenues',
      'L’écriture, la réalisation et toute la postproduction',
      'La musique et deux séries de retours par étape',
    ],
    cta: 'Parler de votre projet',
  },
]

// Bloc transverse (bas de page) — commun aux trois offres.
export const PROCESS = [
  {
    t: 'Un échange de trente minutes',
    d: 'Votre projet, votre échéance, votre budget. Nous vous disons ce qui est possible.',
  },
  {
    t: 'Une proposition détaillée',
    d: 'Livrables, calendrier, prix : tout est écrit avant de commencer.',
  },
  {
    t: 'Le tournage',
    d: 'Une équipe légère, deux à trois personnes, dans le respect de votre lieu et de vos clients.',
  },
  {
    t: 'La livraison',
    d: 'Postproduction entièrement réalisée au studio. Deux allers-retours de validation inclus.',
  },
]

export const DIFFUSION = {
  title: 'La diffusion, en clair',
  body: 'Tous les droits sont cédés à durée illimitée dès la livraison du film.',
}
