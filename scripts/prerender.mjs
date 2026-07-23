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
    desc: "Nicolas et Corentin, deux réalisateurs à Bordeaux. Peu de films par an, faits main, pour le bien-être d'exception.",
    h1: 'Le studio — Nicolas & Corentin, à Bordeaux',
    body: `
      <p>Bel Augure c'est nous deux, Nicolas et Corentin. Quinze ans qu'on se connaît. L'un vient de l'événementiel, l'autre du cinéma et de la mode. On a longtemps travaillé chacun de son côté avant de se décider à monter quelque chose ensemble, à Bordeaux. Aujourd'hui on filme vos enseignes à deux pour continuer notre aventure.</p>
      <p>Peu de films par an. C'est ce qui nous permet de les faire bien.</p>
      <p>Nicolas — direction, image, étalonnage. Corentin — montage, motion design.</p>`,
  },
  {
    path: '/offres',
    title: 'Offres · Bel Augure',
    desc: 'Formats et délais : tout est écrit. Films signature livrés de quatre à huit semaines.',
    h1: 'Offres — film signature pour hôtel, spa et maison de bien-être',
    body: `
      <h2>Signature — le film central</h2>
      <p>Un film court écrit, tourné et monté par nos soins. Il est la vitrine de l'émotion que l'on éprouve chez vous. Inclus : un film de 45 à 90 s, deux jours de tournage, un acteur, du matériel cinéma professionnel, les teasers pour deux réseaux sociaux au choix.</p>
      <h2>Saisons — toute l'année</h2>
      <p>Un film court à chaque saison, pour que vos clients vous suivent au fil du temps. Inclus : quatre films de 15 à 30 s, un jour de tournage par saison, un acteur par film, du matériel cinéma professionnel, les déclinaisons pour deux réseaux sociaux au choix.</p>
      <h2>Sur Mesure — l'exception</h2>
      <p>La pièce maîtresse de votre enseigne est maintenant taillée sur mesure, plus de limite de temps, d'acteurs ou de décors. C'est vous qui donnez les limites et nous réalisons avec.</p>
      <h2>Comment ça se passe</h2>
      <p>L'écriture : après un premier rendez-vous et quelques prises de notes, nous écrivons un script qui fera ressentir l'essence de votre enseigne.</p>
      <p>Le tournage : une petite équipe de tournage, du matériel léger et fiable ; nous savons nous faire discrets.</p>
      <p>La livraison : vous recevez le film, ses déclinaisons et les droits qui vont avec. S'il reste un détail qui vous chiffonne, deux séries de retouches sont comprises.</p>
      <h2>Les questions qui reviennent</h2>
      <p>Combien ça coûte ? Nous avons trois formules, Signature, Saisons et Sur Mesure. Chacune a sa gamme de prix.</p>
      <p>Qui apparaît à l'écran ? Nous travaillons avec des acteurs pour rendre votre lieu vivant. Nous nous occupons du casting.</p>
      <p>Partout en France ? Oui, partout en France.</p>
      <p>À qui appartient le film ? Les droits de diffusion sont inclus dans l'offre pour deux ans.</p>`,
  },
  {
    path: '/contact',
    title: 'Contact · Bel Augure',
    desc: 'Écrire à Bel Augure : un email suffit. Réponse sous deux jours, depuis Bordeaux.',
    h1: 'Contact — on discute de votre prochain film ?',
    body: `
      <p>Un café, des idées, quelques notes et le projet commence. Dites-nous où vous êtes et ce que vous aimeriez montrer. C'est Nicolas qui lit, et il répond sous deux jours.</p>
      <p><a href="mailto:nicolas@belaugure.studio">nicolas@belaugure.studio</a> · Bordeaux · Nouvelle-Aquitaine</p>`,
  },
  {
    path: '/mentions-legales',
    title: 'Mentions légales · Bel Augure',
    desc: 'Mentions légales et politique de confidentialité de Bel Augure.',
    h1: 'Mentions légales',
    body: `
      <p>Éditeur : Bel Augure, Bordeaux. Directeur de la publication : Nicolas (nicolas@belaugure.studio).</p>
      <p>Le formulaire de contact compose un email dans votre messagerie : aucune donnée n'est enregistrée sur un serveur du site. Ce site ne dépose aucun cookie de suivi.</p>`,
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
