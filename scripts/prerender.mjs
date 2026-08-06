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
      <h2>Faites de votre image une raison de vous choisir.</h2>
      <p>Avant de réserver un séjour, un soin ou de commander un produit, vos clients cherchent à se projeter. Ils veulent comprendre ce qui vous distingue et sentir que votre marque est faite pour eux.</p>
      <p>Bel Augure transforme vos lieux, vos gestes, vos produits et votre savoir-faire en films qui créent ce désir. Des films pensés pour attirer les bons clients, renforcer votre image de marque et donner envie de venir (puis de revenir).</p>
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
      <p>À partir de 5 500 € HT. Faites ressentir ce qui vous distingue : nous partons de votre vision, de vos gestes, de vos produits ou de votre lieu pour créer le film central de votre communication, une pièce forte conçue pour porter durablement votre image. Ce que vous recevez : un film de marque sur mesure de 60 à 90 secondes ; ses versions courtes de 30 et 15 secondes ; les formats prévus pour votre site et vos réseaux ; une musique choisie pour votre film ; l'écriture, la réalisation et toute la postproduction ; deux séries de retours.</p>
      <h2>Histoires de marque — des récits ciblés</h2>
      <p>À partir de 3 500 € HT. Faites vivre, une à une, les facettes de votre univers avec des films courts pensés pour les réseaux. Deux manières de les faire vivre : la collection, une même idée déclinée en plusieurs récits conçus et tournés ensemble, à partir de 3 500 € HT ; le partenariat annuel, une nouvelle histoire chaque mois avec une ligne éditoriale filmée sur l'année, à partir de 3 000 € HT par mois pour un engagement de douze mois. Chaque projet comprend une direction narrative, des films courts pensés nativement pour les réseaux, les adaptations pour vos principaux formats, la musique, l'étalonnage et le travail sonore, et deux séries de retours.</p>
      <h2>Campagne Sensorielle — un dispositif complet</h2>
      <p>À partir de 15 000 € HT. Donnez à votre prochain temps fort toute son ampleur : pour une ouverture, un lancement, une nouvelle expérience ou une nouvelle identité, nous imaginons l'idée qui donnera sa cohérence à toute votre prise de parole. Elle comprend une idée directrice et une direction créative commune, un film principal de 60 à 90 secondes, trois films courts minimum de 15 à 30 secondes pensés comme de véritables pièces, les formats définis pour vos différents supports, la musique et toute la postproduction, la prise en charge du projet de l'idée à la livraison, et deux séries de retours par étape.</p>
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
