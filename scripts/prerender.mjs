// Pré-rendu statique : après `vite build`, écrit une page HTML par route
// avec titre, description, canonical et le contenu réel en HTML — visible
// par les moteurs, les aperçus de lien et les navigateurs sans JavaScript.
// React remplace ce contenu au montage (même texte, mise en scène complète).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
// Source de vérité unique des offres (textes + prix), partagée avec la page
// React : le corps SEO de /offres est généré depuis ces données.
import { OFFERS, PROCESS } from '../src/content/offres.js'

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
            const sous = f.sub ? ` (${f.sub.toLowerCase().replace(/\.$/, '')})` : ''
            return `${f.title}${sous} : ${f.price}${note}.`
          })
          .join(' ')
    }
    const receive = ` ${o.receiveTitle} : ${o.receive.map((r) => r.toLowerCase()).join(', ')}.`
    const note = o.receiveNote ? ` ${o.receiveNote.join(' ')}` : ''
    parts.push(`<p>${price}. ${desc}${formats}${receive}${note}</p>`)
    return parts.join('\n      ')
  })
  const process = `<h2>Comment nous travaillons</h2>\n      <p>${PROCESS.map((st) => `${st.t} : ${st.d}`).join(' ')}</p>`
  return `\n      ${offers.join('\n      ')}\n      ${process}`
}

// Le texte du site, tel qu'il existe dans les vues React.
const ROUTES = [
  {
    path: '/',
    title: 'Bel Augure — Films de marque pour le bien-être haut de gamme',
    desc: "Studio de production de films de marque pour l'hôtellerie, les spas, les thermes et les marques de bien-être haut de gamme, à Bordeaux et partout en France.",
    h1: 'Bel Augure — studio de production de films pour hôtels, spas et maisons de bien-être à Bordeaux',
    body: `
      <p>Studio de production pour le bien-être d'exception.</p>
      <h2>Des films à la hauteur de votre expérience.</h2>
      <p>Bel Augure crée des films qui révèlent vos lieux, vos produits et votre savoir-faire. Pour que votre image porte la même exigence que ce que vous offrez.</p>
      <p><a href="/films">Découvrir le film</a></p>`,
  },
  {
    path: '/films',
    title: 'Films — Bel Augure',
    desc: "Les Pieds dans l'eau, un film de Bel Augure, studio de production à Bordeaux, tourné sur le bassin d'Arcachon au crépuscule d'une marée montante.",
    h1: "Films — Les Pieds dans l'eau, sur le bassin d'Arcachon",
    body: `
      <h2>Les Pieds dans l'eau — bassin d'Arcachon</h2>
      <p>Un film tourné sur le bassin d'Arcachon, au crépuscule d'une marée montante.</p>
      <p><a href="https://vimeo.com/1211391558">Voir le film sur Vimeo</a></p>`,
  },
  {
    path: '/studio',
    title: 'Studio de production audiovisuelle à Bordeaux — Bel Augure',
    desc: "Bel Augure, studio de production fondé à Bordeaux par Nicolas Sempere et Corentin Crestia : des films de marque pour les lieux et marques de bien-être haut de gamme.",
    h1: 'Derrière chaque film, nous sommes deux',
    body: `
      <p>Bel Augure est un studio de production fondé à Bordeaux par Nicolas Sempere et Corentin Crestia. Nous créons des films de marque pour les lieux et marques de bien-être haut de gamme. Nous nous connaissons depuis quinze ans. Bel Augure réunit aujourd'hui nos savoir-faire en écriture, réalisation et postproduction.</p>
      <h2>Nicolas Sempere — réalisateur, directeur de la photographie, coloriste</h2>
      <p>Depuis plus de cinq ans, je travaille l'image pour des marques comme Betclic, Better Feeling, Sephora et Showroomprivé. Chez Bel Augure, je réalise les films et dirige leur image jusqu'à l'étalonnage, pour rester fidèle à l'identité de chaque marque.</p>
      <h2>Corentin Crestia — auteur, monteur, motion designer</h2>
      <p>Depuis trois ans, je travaille le montage et le motion design, notamment en interne à l'IRTS et à MJM Graphic Design. Chez Bel Augure, j'écris les films et j'en assure le montage, le travail sonore et le motion design jusqu'à leur livraison.</p>
      <h2>Pourquoi ce secteur</h2>
      <p>Dans le bien-être, l'image précède l'expérience. Elle doit en transmettre la qualité, l'attention et le caractère pour que vos clients la ressentent avant même de la vivre. C'est précisément le rôle de nos films.</p>
      <h2>Deux interlocuteurs, du début à la fin</h2>
      <p>Nous assurons l'écriture, le tournage et la postproduction en interne. Vous échangez avec nous à chaque étape du projet. Quand la production l'exige, nous réunissons autour de nous les profils nécessaires. Cette équipe resserrée nous permet de tourner avec discrétion, même dans un établissement en activité, tout en gardant une direction claire du premier échange à la livraison.</p>`,
  },
  {
    path: '/offres',
    title: 'Films de marque, réseaux & campagnes — Bel Augure',
    desc: 'Trois façons de travailler ensemble : Film Signature (dès 5 500 € HT), Histoires de marque (dès 3 500 € HT, ou 3 000 € HT par mois sur douze mois) et Campagne (dès 15 000 € HT). Proposition détaillée après un échange de trente minutes.',
    h1: 'Un format pour chaque ambition — films pour hôtel, spa et maison de bien-être',
    body: offresBody(),
  },
  {
    path: '/contact',
    title: 'Contact — Bel Augure',
    desc: 'Parler de votre prochain film avec Bel Augure, studio à Bordeaux. Un email, une idée, et le projet commence.',
    h1: 'Contact — on discute de votre prochain film ?',
    body: `
      <p>Un café, des idées, quelques notes et le projet commence. Dites-nous où vous êtes et ce que vous aimeriez montrer.</p>
      <p><a href="mailto:nicolas@belaugure.studio">nicolas@belaugure.studio</a> · <a href="tel:+33668499504">06 68 49 95 04</a> · Bordeaux · Nouvelle-Aquitaine</p>`,
  },
  {
    path: '/mentions-legales',
    title: 'Mentions légales — Bel Augure',
    desc: 'Mentions légales de Bel Augure : éditeur, hébergeur et propriété intellectuelle.',
    h1: 'Mentions légales',
    body: `
      <h2>Éditeur</h2>
      <p>Bel Augure, SARL au capital de 1 000 € — RCS Bordeaux 108 264 524 — TVA intracommunautaire FR45 108 264 524 — Siège social : 83 rue Marcelin Jourdan, 33200 Bordeaux. Directeur de la publication : Nicolas Sempere, gérant — nicolas@belaugure.studio · 06 68 49 95 04.</p>
      <h2>Hébergement</h2>
      <p>Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — +1 559 288 7060 — vercel.com.</p>
      <h2>Propriété intellectuelle</h2>
      <p>L'ensemble du site est la propriété de Bel Augure ou de ses clients pour les œuvres qui leur ont été cédées. Toute reproduction sans accord écrit est interdite. © Bel Augure 2026.</p>
      <p><a href="/confidentialite">Politique de confidentialité</a></p>`,
  },
  {
    path: '/confidentialite',
    title: 'Confidentialité — Bel Augure',
    desc: 'Politique de confidentialité de Bel Augure : données collectées, durée de conservation, destinataires et exercice de vos droits.',
    h1: 'Confidentialité',
    body: `
      <h2>Ce que nous collectons, et pourquoi</h2>
      <p>Le formulaire de contact recueille votre nom, votre établissement, votre email, la nature de votre projet, votre échéance, votre budget et votre message. Ces informations sont traitées par Bel Augure sur la base de mesures précontractuelles prises à votre demande (art. 6-1-b du RGPD), aux seules fins de répondre à votre message. Elles ne sont jamais cédées ni utilisées à des fins de prospection. Seuls le nom, l'email et le message sont nécessaires pour envoyer une demande.</p>
      <h2>Destinataires et conservation</h2>
      <p>Votre message est transmis par email et conservé dans notre messagerie ainsi que chez notre prestataire d'envoi Resend Inc. (États-Unis). Le site est hébergé par Vercel Inc. (États-Unis). Ces transferts hors Union européenne sont encadrés par les garanties contractuelles de ces prestataires. Les messages sont conservés au plus trois ans après notre dernier échange.</p>
      <h2>Vos droits</h2>
      <p>Vous disposez de droits d'accès, de rectification, d'effacement, d'opposition, de limitation et de portabilité. Ces droits s'exercent auprès de nicolas@belaugure.studio. Vous pouvez également adresser une réclamation à la CNIL (cnil.fr).</p>
      <h2>Cookies et lecteur vidéo</h2>
      <p>Ce site ne dépose aucun cookie de suivi et ne mesure pas votre audience. La lecture des films fait appel au lecteur Vimeo (Vimeo.com Inc., États-Unis), configuré en mode « Do Not Track ».</p>
      <p><a href="/mentions-legales">Mentions légales</a></p>`,
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
  ['/confidentialite', 'yearly', '0.2'],
]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SITEMAP_ROUTES.map(([p2, freq, prio]) => `  <url><loc>${SITE}${p2 === '/' ? '/' : p2}</loc><lastmod>${lastmod}</lastmod><changefreq>${freq}</changefreq><priority>${prio}</priority></url>`).join('\n')}
</urlset>
`
writeFileSync(resolve(dist, 'sitemap.xml'), sitemap)
console.log('sitemap daté', lastmod)
