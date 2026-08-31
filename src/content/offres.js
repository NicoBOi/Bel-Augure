// Source de vérité de la page Offres et de son pré-rendu SEO.
export const HERO_FILM_ID = '1211391558'

export const OFFERS = [
  {
    id: 'histoires', eyebrow: 'HISTOIRES', title: 'Trois histoires pour faire vivre votre univers.',
    short: 'Plusieurs récits courts, chacun avec sa propre émotion.', price: 'À partir de 3 900 € HT',
    for: 'Pour raconter plusieurs facettes de votre maison à travers des récits courts.',
    detail: 'Une collection de trois histoires indépendantes. Chaque film part d’une idée, d’une situation et d’une présence humaine pour laisser une impression singulière.',
    notes: ['Trois histoires de 15 à 30 secondes environ', 'Formats pensés selon les supports', 'Une journée principale de tournage'],
    includes: ['Conception et écriture', 'Casting et direction d’acteur selon l’histoire', 'Réalisation, lumière, montage, son et étalonnage', 'Adaptations prévues avant la production', 'Une série de retours structurée'],
  },
  {
    id: 'film', eyebrow: 'FILM', title: 'Une histoire pour incarner votre maison.',
    short: 'Un récit plus ample, porté par une mise en scène.', price: 'À partir de 6 900 € HT',
    for: 'Pour créer le film central qui porte réellement l’univers de votre marque.',
    detail: 'Une production narrative plus développée, avec le temps de faire exister une progression, des personnages, une voix, un silence ou une révélation.',
    notes: ['60 secondes à 2 minutes environ', 'La durée est décidée par l’histoire', 'Formats pensés selon les supports'],
    includes: ['Conception, écriture et préproduction', 'Casting, réalisation et direction d’acteur', 'Production dimensionnée selon le scénario', 'Montage, sound design et étalonnage', 'Deux séries de retours structurées'],
  },
]

export const EXTENSIONS = [
  { id: 'campagne', title: 'Une campagne ?', body: 'Pour un lancement important, nous réunissons un Film et plusieurs Histoires autour d’une même idée : un récit principal, puis les histoires qui le prolongent.', price: 'À partir de 9 900 € HT', cta: 'Parler d’une campagne' },
  { id: 'collaboration', title: 'Des films toute l’année ?', body: 'Pour les maisons qui ont besoin de nous régulièrement, nous développons dans le temps un langage visuel cohérent, avec une journée principale de production chaque mois.', price: 'À partir de 3 600 € HT / mois', cta: 'Parler d’un accompagnement' },
]

export const PROCESS = [
  { t: 'Comprendre', d: 'La maison, le lieu, l’expérience — et ce que le spectateur doit ressentir.' },
  { t: 'Écrire', d: 'Le concept, l’histoire, les personnages et la direction visuelle. Cette direction est validée avant le tournage.' },
  { t: 'Réaliser', d: 'Le tournage, puis le montage, le son, l’étalonnage et les masters.' },
]

export const FAQS = [
  { q: 'Quelle différence entre Histoires et Film ?', a: 'Histoires réunit trois récits courts qui explorent différentes facettes de votre univers. Film construit une histoire principale plus ample.' },
  { q: 'Peut-on tourner en vertical et en horizontal ?', a: 'Oui. Les formats sont pensés dès l’écriture selon le récit, les usages et les supports de diffusion.' },
  { q: 'Comment le concept est-il validé ?', a: 'La direction narrative et visuelle est présentée et validée avant le tournage.' },
  { q: 'Comment fonctionne le casting ?', a: 'Le casting et la direction d’acteur sont définis selon l’histoire et son périmètre de diffusion.' },
  { q: 'Que signifie « à partir de » ?', a: 'Chaque film est écrit sur mesure. Le scénario, le casting, les lieux et le périmètre de diffusion déterminent le devis final.' },
  { q: 'Peut-on travailler ensemble régulièrement ?', a: 'Oui. Nous pouvons devenir le studio de réalisation récurrent de votre maison, d’abord sur un premier cycle de trois mois.' },
]
