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
    receiveTitle: 'Inclut',
    // Ordre de production : ce que nous faisons, puis ce qui est livré.
    receive: [
      'L’écriture, la réalisation et toute la postproduction',
      'La musique et deux séries de retours',
      'Un film de marque de 60 à 90 secondes',
      'Ses versions courtes de 30 et 15 secondes',
      'Des formats adaptés à votre site et à vos réseaux',
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
        sub: 'Une journée pour créer votre prochaine collection de contenus.',
        body: [
          'Une journée de tournage consacrée à une expérience, une gamme ou un temps fort de votre marque.',
          'À partir de trois films principaux et leurs déclinaisons courtes, pensés pour multiplier les prises de parole sur vos réseaux.',
        ],
        closing: 'Ponctuel',
        price: 'À partir de 3 500 € HT',
      },
      {
        title: 'Quatre saisons',
        sub: 'De nouvelles histoires à raconter chaque mois.',
        body: [
          'Une journée de tournage chaque mois pour renouveler les images de votre marque au rythme de vos saisons, nouveautés et temps forts.',
          'Chaque tournage produit une collection de films et formats courts prêts à alimenter vos réseaux pendant le mois.',
        ],
        closing: 'Récurrent',
        price: 'À partir de 3 000 € HT par mois',
        priceNote: 'Engagement de douze mois',
      },
    ],
    receiveTitle: 'Inclut',
    // Ordre de production : ce que nous faisons, puis ce qui est livré.
    receive: [
      'L’écriture, le tournage, le montage, l’étalonnage, le son et la musique',
      'Des films courts conçus autour de vos expériences, produits et temps forts',
      'Des formats et déclinaisons pensés pour multiplier vos prises de parole',
      'Des versions verticales prêtes à diffuser sur vos réseaux',
    ],
    receiveNote: ['Quatre saisons comprend également le calendrier annuel des sujets.'],
    cta: 'Parler de votre projet',
  },
  {
    id: 'campagne',
    num: '03',
    name: 'Campagne',
    label: 'Pour un lancement',
    cardPhrase: 'Créez l’engouement autour de votre prochaine ouverture ou de votre prochain lancement.',
    price: 'À partir de 15 000 € HT',
    promise: 'Donnez à votre prochain temps fort toute l’ampleur qu’il mérite.',
    description: [
      'Pour une ouverture, un lancement ou une nouvelle identité, nous imaginons un concept créatif capable de porter toute votre communication.',
      'Un film principal en révèle l’univers. Une série de films courts l’annonce, en dévoile les détails et prolonge son impact sur vos différents points de contact.',
      'Une seule idée, déclinée en plusieurs films qui se répondent et se reconnaissent au premier regard.',
    ],
    receiveTitle: 'Inclut',
    // Ordre de production : le concept, la fabrication, puis les livrables.
    receive: [
      'Un concept créatif pensé pour l’ensemble de la campagne',
      'L’écriture, la réalisation et toute la postproduction',
      'La musique et deux séries de retours par étape',
      'Un film principal de 60 à 90 secondes',
      'Au moins trois films courts de 15 à 30 secondes',
      'Des formats adaptés à vos différents supports de diffusion',
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
