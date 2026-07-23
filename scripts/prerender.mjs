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
      <p>Les films signatures du bien-être d'exception.</p>
      <h2>Un studio. Deux savoir-faire.</h2>
      <p>Vous avez mis des années à faire de votre lieu ce qu'il est. Nous venons le filmer comme il le mérite. Pas une vidéo de plus mais un film gravé dans le temps.</p>
      <p><a href="/films">Découvrir le film</a></p>`,
  },
  {
    path: '/films',
    title: 'Films · Bel Augure',
    desc: "Les Pieds Dans L'eau : le premier film de Bel Augure, tourné sur le bassin d'Arcachon. Un showcase de notre regard, avant les premières signatures clients.",
    h1: "Films — Les Pieds Dans L'eau, sur le bassin d'Arcachon",
    body: `
      <h2>Les Pieds Dans L'eau — bassin d'Arcachon</h2>
      <p>Voici le premier film de Bel Augure. Quelques images tournées sur le bassin d'Arcachon, au crépuscule d'une marée montante.</p>
      <p><a href="https://vimeo.com/1211391558">Voir le film sur Vimeo</a></p>`,
  },
  {
    path: '/studio',
    title: 'Studio · Bel Augure',
    desc: 'Deux artisans, peu de films, bien faits. Bel Augure fait du cinéma pour le bien-être d’exception, depuis Bordeaux.',
    h1: 'Le studio — nous sommes deux, nous restons deux',
    body: `
      <p>Nicolas tient la caméra, Corentin monte et mixe. Il n'y a personne d'autre, et c'est voulu : du premier appel à la livraison, vous parlez à ceux qui font le film.</p>
      <p>Bel Augure est né à Bordeaux d'un constat simple : les hôtels, les thermes et les marques du bien-être méritaient mieux que des vidéos pressées. Alors on repère avant de tourner, on attend la bonne lumière, et le son est travaillé comme l'image.</p>
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
      <p>Le grand film de votre adresse, celui qu'on met partout. Entre 90 secondes et 2 minutes, fait pour rester en ligne des années. Deux journées de tournage, livré en six semaines.</p>
      <h2>Saisons — le rendez-vous annuel</h2>
      <p>Un film court à chaque saison, quatre par an, toujours la même écriture. Une demi-journée de tournage à chaque saison.</p>
      <h2>Sur Mesure — l'exception</h2>
      <p>Plusieurs films, des formats longs, du casting, des décors. Ce qui ne rentre pas dans les cases. On écrit le projet ensemble, sur devis.</p>
      <h2>Comment ça se passe</h2>
      <p>L'écriture : on se parle, on vient voir le lieu, on écrit une note d'intention. Avant de tourner, vous savez déjà ce que vous verrez à l'écran.</p>
      <p>Le tournage : du matériel de cinéma, une petite équipe. Vous nous oublierez vite.</p>
      <p>La livraison : vous recevez le film, ses déclinaisons et les droits qui vont avec. Deux séries de retouches sont comprises.</p>
      <h2>Les questions qui reviennent</h2>
      <p>Combien ça coûte ? Ça dépend du lieu et du format, alors on préfère en parler d'abord. Le devis qui suit est ferme.</p>
      <p>Vous déplacez-vous où ? Nous sommes à Bordeaux. La Nouvelle-Aquitaine sans hésiter, plus loin si le projet vaut le voyage.</p>
      <p>À qui appartient le film ? À vous. Site, réseaux, accueil : vous en faites ce que vous voulez. Seule la publicité payante se chiffre à part.</p>`,
  },
  {
    path: '/contact',
    title: 'Contact · Bel Augure',
    desc: 'Écrire à Bel Augure : un email suffit. Réponse sous deux jours, depuis Bordeaux.',
    h1: 'Contact — un email suffit',
    body: `
      <p>Dites-nous où vous êtes et ce que vous aimeriez montrer. C'est Nicolas qui lit, et il répond sous deux jours.</p>
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
