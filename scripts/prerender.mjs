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
    desc: 'Trois offres sur mesure : Film Signature, le film narratif central ; Histoires de marque, une collection de récits courts ; Campagne Sensorielle, un concept décliné sur tous vos supports. Chaque projet est chiffré sur mesure.',
    h1: 'Offres — films pour hôtel, spa et maison de bien-être',
    body: `
      <h2>Film Signature</h2>
      <p>Le film qui installe durablement votre univers. Une pièce centrale imaginée pour révéler ce que votre marque fait ressentir : conception, écriture, mise en scène et production pensées autour de votre identité. La création peut réunir conception créative et écriture, direction artistique, repérage et préparation, mise en scène de l'expérience, tournage et direction de la photographie, montage, création sonore et étalonnage, adaptations aux supports de diffusion. Pour un lancement, votre site, une présentation, un salon, YouTube ou une diffusion cinéma. Une création entièrement conçue sur mesure.</p>
      <h2>Histoires de marque</h2>
      <p>Des récits courts pour faire vivre votre univers dans le temps. Une collection de films conçus autour de vos gestes, de vos lieux, de vos savoir-faire et de celles et ceux qui les incarnent. Chaque collection peut explorer un rituel ou un soin signature, le portrait d'un fondateur ou d'un artisan, l'atmosphère d'un lieu, l'origine d'un produit ou d'un ingrédient, les gestes d'un savoir-faire, les convictions et les histoires de la maison. Pensés principalement pour les réseaux sociaux, sans reprendre leurs codes ordinaires.</p>
      <h2>Campagne Sensorielle</h2>
      <p>Un même concept pour donner de la force à chaque prise de parole. Une campagne complète imaginée autour d'un lancement, d'une ouverture ou d'un temps fort : film principal, récits courts et déclinaisons visuelles réunis au sein d'une même direction créative. La campagne peut associer conception du concept créatif, Film Signature, collection d'Histoires de marque, déclinaisons horizontales et verticales, formats courts, photographies ou photogrammes de campagne, adaptations aux différents supports. Pour lancer un lieu, une gamme, un soin, une saison ou une nouvelle identité.</p>
      <h2>Extensions possibles</h2>
      <p>Chaque création peut être complétée selon ses besoins de production et de diffusion : déclinaisons verticales et formats courts, version cinéma, photographies de campagne, banque d'images, voix off et création sonore originale, casting, stylisme et maquillage, journée de tournage supplémentaire, adaptations multilingues. Ces éléments sont étudiés et chiffrés selon les besoins réels du projet.</p>
      <h2>Les questions qui reviennent</h2>
      <p>Combien ça coûte ? Chaque projet est chiffré sur mesure, selon votre lieu, l'ampleur du tournage et la diffusion visée. Parlons-en : on vous envoie un devis clair et détaillé.</p>
      <p>Qui apparaît à l'écran ? Nous travaillons avec des acteurs pour rendre votre lieu vivant. Nous nous occupons du casting.</p>
      <p>Partout en France ? Oui, partout en France.</p>
      <p>À qui appartient le film ? Les droits de diffusion sont inclus et définis avec vous, selon les supports et la durée d'exploitation visés.</p>`,
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
