// Pré-rendu statique : après `vite build`, écrit une page HTML par route
// avec titre, description, canonical et le contenu réel en HTML — visible
// par les moteurs, les aperçus de lien et les navigateurs sans JavaScript.
// React remplace ce contenu au montage (même texte, mise en scène complète).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
// Source de vérité unique des offres (textes + prix), partagée avec la page
// React : le corps SEO de /offres est généré depuis ces données.
import { OFFERS, PROCESS, DIFFUSION } from '../src/content/offres.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const SITE = 'https://www.belaugure.studio'

const template = readFileSync(resolve(dist, 'index.html'), 'utf8')

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')


// Corps SEO de /offres, généré depuis src/content/offres.js : impossible de
// publier un prix ici différent de celui affiché à l'écran.
function offresBody() {
  const offers = OFFERS.map((o) => {
    const parts = [`<h2>${o.name} — ${o.label.toLowerCase()}</h2>`]
    // Offre sans tarif global (Histoires) : on annonce le plancher de sa
    // première formule.
    const price = o.price || (o.formats && o.formats[0].price)
    const desc = o.description.join(' ')
    let formats = ''
    if (o.formats) {
      formats =
        ' ' +
        o.formats
          .map((f) => {
            const note = f.priceNote ? `, ${f.priceNote.toLowerCase()}` : ''
            return `${f.title} (${f.sub.toLowerCase().replace(/\.$/, '')}) : ${f.price}${note}.`
          })
          .join(' ')
    }
    const receive = ` ${o.receiveTitle} : ${o.receive.map((r) => r.toLowerCase()).join(', ')}.`
    const note = o.receiveNote ? ` ${o.receiveNote.join(' ')}` : ''
    parts.push(`<p>${price}. ${desc}${formats}${receive}${note}</p>`)
    return parts.join('\n      ')
  })
  const process = `<h2>Comment nous travaillons</h2>\n      <p>${PROCESS.map((st) => `${st.t} : ${st.d}`).join(' ')}</p>`
  const diffusion = `<h2>${DIFFUSION.title}</h2>\n      <p>${DIFFUSION.body}</p>`
  return `\n      ${offers.join('\n      ')}\n      ${process}\n      ${diffusion}`
}

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
    desc: 'Trois façons de travailler ensemble : Film Signature (dès 5 500 € HT), Histoires de marque (dès 3 500 € HT, ou 3 000 € HT par mois sur douze mois) et Campagne (dès 15 000 € HT). Diffusion deux ans France incluse. Proposition détaillée après un échange de trente minutes.',
    h1: 'Offres — films pour hôtel, spa et maison de bien-être',
    body: offresBody(),
  },
  {
    path: '/contact',
    title: 'Contact · Bel Augure',
    desc: 'Parler de votre prochain film avec Bel Augure, studio à Bordeaux. Un email, une idée, et le projet commence.',
    h1: 'Contact — on discute de votre prochain film ?',
    body: `
      <p>Un café, des idées, quelques notes et le projet commence. Dites-nous où vous êtes et ce que vous aimeriez montrer.</p>
      <p><a href="mailto:nicolas@belaugure.studio">nicolas@belaugure.studio</a> · <a href="tel:+33668499504">06 68 49 95 04</a> · Bordeaux · Nouvelle-Aquitaine</p>`,
  },
  {
    path: '/mentions-legales',
    title: 'Mentions légales · Bel Augure',
    desc: 'Mentions légales et politique de confidentialité de Bel Augure.',
    h1: 'Mentions légales',
    body: `
      <p>Éditeur : Bel Augure, SARL au capital de 1 000 € — RCS Bordeaux 108 264 524 — Siège social : 83 rue Marcelin Jourdan, 33200 Bordeaux. TVA intracommunautaire : FR45 108 264 524. Directeur de la publication : Nicolas Sempere, gérant (nicolas@belaugure.studio · 06 68 49 95 04). Hébergeur : Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.</p>
      <p>Les informations du formulaire de contact sont traitées aux seules fins de répondre à votre message (art. 6-1-b du RGPD) et conservées au plus trois ans après notre dernier échange. Vous disposez de droits d'accès, de rectification, d'effacement, d'opposition, de limitation et de portabilité auprès de nicolas@belaugure.studio, et pouvez adresser une réclamation à la CNIL. Ce site ne dépose aucun cookie de suivi ; la lecture des films fait appel au lecteur Vimeo en mode « Do Not Track ».</p>`,
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
      logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` },
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

// Sitemap daté du build : écrit dans dist/ par-dessus la copie de public/,
// pour que <lastmod> suive réellement les mises en production.
const lastmod = new Date().toISOString().slice(0, 10)
const SITEMAP_ROUTES = [
  ['/', 'monthly', '1.0'],
  ['/films', 'monthly', '0.9'],
  ['/offres', 'monthly', '0.9'],
  ['/studio', 'yearly', '0.7'],
  ['/contact', 'yearly', '0.8'],
  ['/mentions-legales', 'yearly', '0.2'],
]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SITEMAP_ROUTES.map(([p2, freq, prio]) => `  <url><loc>${SITE}${p2 === '/' ? '/' : p2}</loc><lastmod>${lastmod}</lastmod><changefreq>${freq}</changefreq><priority>${prio}</priority></url>`).join('\n')}
</urlset>
`
writeFileSync(resolve(dist, 'sitemap.xml'), sitemap)
console.log('sitemap daté', lastmod)
