// Pré-rendu statique : après `vite build`, écrit une page HTML par route
// avec titre, description, canonical et le contenu réel en HTML — visible
// par les moteurs, les aperçus de lien et les navigateurs sans JavaScript.
// React remplace ce contenu au montage (même texte, mise en scène complète).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const SITE = 'https://www.belaugure.studio'

const template = readFileSync(resolve(dist, 'index.html'), 'utf8')

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')

// Le texte du site, tel qu'il existe dans les vues React.
const ROUTES = [
  {
    path: '/',
    title: 'Bel Augure · Films pour hôtels, spas et maisons de bien-être · Bordeaux',
    desc: 'Films pour hôtels, spas, thermes et maisons de bien-être. Deux réalisateurs, toute la chaîne. Bordeaux.',
    h1: 'Bel Augure — studio de films pour hôtels, spas et maisons de bien-être à Bordeaux',
    body: `
      <p>Les films signature du bien-être d'exception.</p>
      <h2>Notre film devient votre signature.</h2>
      <p>Tout se décide sur une image, c'est le seul moyen de ressentir avant d'expérimenter. Mais aujourd'hui la plupart des marques confient la leur à du contenu jetable. Bel Augure travaille avec les moyens du cinéma : de l'écriture au montage en passant par le tournage, nous construisons chaque étape pour qu'on retrouve à l'écran ce que l'on éprouve chez vous. Nos films sont la preuve que votre enseigne est mémorable.</p>
      <p><a href="/films">Découvrir le film</a></p>`,
  },
  {
    path: '/films',
    title: 'Films · Bel Augure',
    desc: "Les Pieds dans l'eau : le premier film de Bel Augure, tourné sur le bassin d'Arcachon, au crépuscule d'une marée montante.",
    h1: "Films — Les Pieds dans l'eau, sur le bassin d'Arcachon",
    body: `
      <h2>Les Pieds dans l'eau — bassin d'Arcachon</h2>
      <p>Voici le premier film de Bel Augure. Quelques images tournées sur le bassin d'Arcachon, au crépuscule d'une marée montante.</p>
      <p><a href="https://vimeo.com/1211391558">Voir le film sur Vimeo</a></p>`,
  },
  {
    path: '/studio',
    title: 'Studio · Bel Augure',
    desc: "Nicolas et Corentin, deux réalisateurs à Bordeaux qui filment les maisons de bien-être d'exception.",
    h1: 'Le studio — Nicolas & Corentin, à Bordeaux',
    body: `
      <p>Bel Augure c'est nous deux, Nicolas et Corentin. Quinze ans qu'on se connaît. L'un vient de l'événementiel, l'autre du cinéma et de la mode. On a longtemps travaillé chacun de notre côté avant de se décider à monter quelque chose ensemble, à Bordeaux. Aujourd'hui on filme vos enseignes à deux pour continuer notre aventure.</p>
      <p>Chaque film avec vous est un bout de notre histoire.</p>`,
  },
  {
    path: '/offres',
    title: 'Offres · Bel Augure',
    desc: 'Trois façons de travailler ensemble : Film Signature, un film central à partir de 5 500 € HT ; Histoires de marque, des récits ciblés à partir de 3 500 € HT ; Campagne Sensorielle, un dispositif complet à partir de 15 000 € HT. Diffusion deux ans France incluse. Proposition détaillée après un échange de trente minutes.',
    h1: 'Offres — films pour hôtel, spa et maison de bien-être',
    body: `
      <h2>Film Signature — un film central</h2>
      <p>À partir de 5 500 € HT. Un projet ponctuel pour installer, révéler ou renouveler l'univers d'une marque. Ce que comprend le projet : un film de marque sur mesure de 60 à 90 secondes et, selon le périmètre, une ou deux versions horizontales de 30 et 15 secondes ; la conception, l'écriture, la direction artistique et les repérages ; un à deux jours de tournage ; le montage, la création sonore et l'étalonnage réalisés au studio ; une musique licenciée. Première version présentée sous deux semaines après le tournage, deux séries de retours incluses, droits d'utilisation inclus deux ans en France. Extensions possibles définies et chiffrées dans la proposition : déclinaisons verticales, voix off, musique originale, prises de vues aériennes, journée de tournage supplémentaire, télévision, affichage, cinéma, diffusion internationale ou durée étendue.</p>
      <h2>Histoires de marque — des récits ciblés</h2>
      <p>À partir de 3 500 € HT. Un ou plusieurs films courts pour révéler un soin, un produit, un geste, une personne ou un lieu. Trois façons de travailler : une histoire, un film autonome consacré à un sujet précis, à partir de 3 500 € HT ; une collection, format conseillé, trois histoires imaginées et tournées ensemble, à partir de 8 500 € HT ; un partenariat saisonnier, une nouvelle collection planifiée sur trois mois avec des livraisons progressives, à partir de 3 000 € HT par mois pour un engagement de trois mois. Chaque histoire comprend un format principal et une adaptation verticale ou horizontale, un à deux extraits courts, le montage, la création sonore et l'étalonnage au studio, les musiques licenciées. Droits d'utilisation inclus deux ans à compter de chaque livraison.</p>
      <h2>Campagne Sensorielle — un dispositif complet</h2>
      <p>À partir de 15 000 € HT. Une campagne audiovisuelle conçue autour d'une ouverture, d'un lancement ou d'une nouvelle identité. Elle comprend une idée directrice et une direction créative commune, un film principal de 60 à 90 secondes, une série de trois films courts minimum de 15 à 30 secondes, les adaptations horizontales et verticales, la conception, la production et la postproduction de l'ensemble, les musiques licenciées. Une série photographique peut être réalisée dans la même direction artistique avec un photographe partenaire. Environ huit à dix semaines entre la validation et la livraison finale, campagne suivie directement par les deux fondateurs. Chaque campagne fait l'objet d'une proposition dédiée.</p>
      <h2>Comment nous travaillons</h2>
      <p>Un échange de trente minutes pour cadrer votre projet, votre échéance et votre budget. Une proposition détaillée où livrables, calendrier et prix sont écrits avant de commencer. Un tournage mené par une équipe légère, deux à trois personnes, dans le respect de votre lieu et de vos clients. Une postproduction entièrement réalisée au studio, avec deux allers-retours de validation inclus.</p>
      <h2>La diffusion, en clair</h2>
      <p>Tous nos prix incluent deux ans d'utilisation en France, sur le digital et les réseaux sociaux. Télévision, affichage, cinéma, international ou durée étendue : ces usages sont définis et chiffrés dès la proposition.</p>`,
  },
  {
    path: '/contact',
    title: 'Contact · Bel Augure',
    desc: 'Parler de votre prochain film avec Bel Augure, studio à Bordeaux. Un email, une idée, et le projet commence.',
    h1: 'Contact — on discute de votre prochain film ?',
    body: `
      <p>Un café, des idées, quelques notes et le projet commence. Dites-nous où vous êtes et ce que vous aimeriez montrer.</p>
      <p><a href="mailto:nicolas@belaugure.studio">nicolas@belaugure.studio</a> · Bordeaux · Nouvelle-Aquitaine</p>`,
  },
  {
    path: '/mentions-legales',
    title: 'Mentions légales · Bel Augure',
    desc: 'Mentions légales et politique de confidentialité de Bel Augure.',
    h1: 'Mentions légales',
    body: `
      <p>Éditeur : Bel Augure, Bordeaux. Directeur de la publication : Nicolas (nicolas@belaugure.studio).</p>
      <p>Le formulaire de contact transmet votre message par email au studio via notre prestataire d'envoi ; aucune donnée n'est conservée dans une base de données du site. Ce site ne dépose aucun cookie de suivi.</p>`,
  },
]

const FOOTER = `<p>Studio de production basé à Bordeaux</p>`

for (const route of ROUTES) {
  const url = SITE + (route.path === '/' ? '/' : route.path)
  let html = template
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(route.title)}</title>`)
  html = html.replace(
    /(<meta\s+name="description"\s+content=")[^"]*(")/,
    `$1${esc(route.desc)}$2`,
  )
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
  html = html.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
  html = html.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(route.title)}$2`)
  html = html.replace(
    /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
    `$1${esc(route.desc)}$2`,
  )
  html = html.replace(
    '<!--seo-content-->',
    `<div class="seo-fallback"><h1>${route.h1}</h1>${route.body}${FOOTER}</div>`,
  )

  const out =
    route.path === '/'
      ? resolve(dist, 'index.html')
      : resolve(dist, route.path.slice(1), 'index.html')
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, html)
  console.log('prerendu', route.path)
}

// 404 brandée, en noindex
let notFound = template
notFound = notFound.replace(/<title>[^<]*<\/title>/, '<title>Page introuvable · Bel Augure</title>')
notFound = notFound.replace(
  /<link rel="canonical"[^>]*>/,
  '<meta name="robots" content="noindex">',
)
notFound = notFound.replace(
  '<!--seo-content-->',
  `<div class="seo-fallback"><h1>Cette page n'existe pas.</h1><p><a href="/">Revenir à l'accueil</a></p></div>`,
)
writeFileSync(resolve(dist, '404.html'), notFound)
console.log('prerendu /404')
