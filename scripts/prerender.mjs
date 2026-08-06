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
    title: 'Bel Augure · Studio de production de films bien-être à Bordeaux',
    desc: 'Studio de production de films pour hôtels, spas, thermes et maisons de bien-être. Deux réalisateurs, toute la chaîne, à Bordeaux.',
    h1: 'Bel Augure — studio de production de films pour hôtels, spas et maisons de bien-être à Bordeaux',
    body: `
      <p>Les films signature du bien-être d'exception.</p>
      <h2>Faites de votre image une raison de vous choisir.</h2>
      <p>Avant de réserver un séjour, un soin ou de commander un produit, vos clients cherchent à se projeter. Ils veulent comprendre ce qui vous distingue et sentir que votre marque est faite pour eux.</p>
      <p>Bel Augure transforme vos lieux, vos gestes, vos produits et votre savoir-faire en films qui créent ce désir. Des films pensés pour attirer les bons clients, renforcer votre image de marque et donner envie de vous découvrir, de vous choisir et de revenir vers vous.</p>
      <p><a href="/films">Découvrir le film</a></p>`,
  },
  {
    path: '/films',
    title: 'Films de marque pour hôtels, spas & bien-être · Bel Augure',
    desc: "Les Pieds dans l'eau : le premier film de Bel Augure, studio de production à Bordeaux, tourné sur le bassin d'Arcachon au crépuscule d'une marée montante.",
    h1: "Films — Les Pieds dans l'eau, sur le bassin d'Arcachon",
    body: `
      <h2>Les Pieds dans l'eau — bassin d'Arcachon</h2>
      <p>Voici le premier film de Bel Augure. Quelques images tournées sur le bassin d'Arcachon, au crépuscule d'une marée montante.</p>
      <p><a href="https://vimeo.com/1211391558">Voir le film sur Vimeo</a></p>`,
  },
  {
    path: '/studio',
    title: 'Studio de production à Bordeaux · Bel Augure',
    desc: "Bel Augure, studio de production à Bordeaux : Nicolas et Corentin filment les hôtels, spas et maisons de bien-être d'exception.",
    h1: 'Studio de production à Bordeaux — Nicolas & Corentin',
    body: `
      <p>Bel Augure, c'est nous deux : Nicolas et Corentin. Quinze ans d'amitié et deux parcours qui se complètent — l'un vient de l'événementiel, l'autre du cinéma et de la mode. Ensemble, nous prenons en charge tout votre film, de la première idée à la dernière image : l'écriture et la direction, le tournage, puis toute la postproduction, réalisée à Bordeaux dans notre studio. Un seul interlocuteur, deux regards sur chaque plan.</p>
      <p>Filmer celles et ceux qui prennent soin des autres, c'est exactement ce que nous avons choisi de faire.</p>`,
  },
  {
    path: '/offres',
    title: 'Offres · Bel Augure',
    desc: 'Trois façons de travailler ensemble : Film Signature, un film central à partir de 5 500 € HT ; Histoires de marque, des récits ciblés à partir de 3 500 € HT ; Campagne Sensorielle, un dispositif complet à partir de 15 000 € HT. Diffusion deux ans France incluse. Proposition détaillée après un échange de trente minutes.',
    h1: 'Offres — films pour hôtel, spa et maison de bien-être',
    body: `
      <h2>Film Signature — pour présenter votre marque</h2>
      <p>À partir de 5 500 € HT. Faites ressentir ce qui vous distingue : une atmosphère, un geste, une manière de prendre soin, réunis dans le film de référence de votre marque — pour votre site, vos présentations et vos réseaux. Vous recevez un film de marque de 60 à 90 secondes, ses versions courtes de 30 et 15 secondes, les versions horizontales et verticales convenues, l'écriture, la réalisation et toute la postproduction, la musique et deux séries de retours.</p>
      <h2>Histoires de marque — pour faire vivre vos réseaux</h2>
      <p>À partir de 3 500 € HT. Chaque film donne une nouvelle raison de vous choisir : un soin, un lieu, un produit ou un savoir-faire devient une histoire à part entière, en films courts pensés pour les réseaux. Ponctuellement ou toute l'année, deux formules : Collection, un sujet raconté en plusieurs films imaginés et tournés ensemble, à partir de 3 500 € HT ; Quatre saisons, un nouveau film chaque mois préparé autour de vos saisons et de vos temps forts, à partir de 3 000 € HT par mois pour un engagement de douze mois. Dans les deux formules : des films courts écrits et réalisés pour votre marque, les versions horizontales et verticales convenues, la musique, le montage, l'étalonnage et le travail sonore, deux séries de retours.</p>
      <h2>Campagne Sensorielle — pour un lancement</h2>
      <p>À partir de 15 000 € HT. Faites de votre prochain temps fort un moment que l'on retient : pour une ouverture, un lancement ou une nouvelle identité, une idée forte déclinée dans un film principal et plusieurs films courts. Vous recevez une idée créative commune à toute la campagne, un film principal de 60 à 90 secondes, au moins trois films courts de 15 à 30 secondes, les versions horizontales et verticales convenues, l'écriture, la réalisation et toute la postproduction, la musique et deux séries de retours par étape.</p>
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

// VideoObject de la page /films : aide Google à afficher le film en résultat
// vidéo. Les métadonnées réelles (date de mise en ligne, durée, vignette)
// sont demandées à Vimeo au moment du build ; si le réseau est indisponible,
// on retombe sur un objet minimal, toujours valide.
const FILM_VIMEO_ID = '1211391558'
async function filmVideoJsonLd() {
  const base = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: "Les Pieds dans l'eau",
    description:
      "Le premier film de Bel Augure, tourné sur le bassin d'Arcachon au crépuscule d'une marée montante.",
    thumbnailUrl: `${SITE}/og.png`,
    embedUrl: `https://player.vimeo.com/video/${FILM_VIMEO_ID}`,
    contentUrl: `https://vimeo.com/${FILM_VIMEO_ID}`,
    publisher: {
      '@type': 'Organization',
      name: 'Bel Augure',
      logo: { '@type': 'ImageObject', url: `${SITE}/og.png` },
    },
  }
  try {
    const res = await fetch(
      `https://vimeo.com/api/oembed.json?url=https%3A%2F%2Fvimeo.com%2F${FILM_VIMEO_ID}&width=1280`,
    )
    if (res.ok) {
      const d = await res.json()
      if (d.thumbnail_url) base.thumbnailUrl = d.thumbnail_url
      // upload_date : « 2025-01-31 12:00:00 » → date ISO seule
      if (d.upload_date) base.uploadDate = String(d.upload_date).slice(0, 10)
      if (typeof d.duration === 'number') {
        base.duration = `PT${Math.floor(d.duration / 60)}M${d.duration % 60}S`
      }
      console.log('vimeo oembed ok — uploadDate', base.uploadDate || 'n/a')
    } else {
      console.log('vimeo oembed non-ok', res.status)
    }
  } catch (e) {
    console.log('vimeo oembed indisponible, VideoObject minimal :', e.message)
  }
  return base
}
const JSONLD = {
  '/films': `<script type="application/ld+json">${JSON.stringify(await filmVideoJsonLd())}</script>`,
}

for (const route of ROUTES) {
  const url = SITE + (route.path === '/' ? '/' : route.path)
  let html = template
  const extraHead = JSONLD[route.path]
  if (extraHead) html = html.replace('</head>', `    ${extraHead}\n  </head>`)
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
