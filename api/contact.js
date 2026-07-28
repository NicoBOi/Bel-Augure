// Fonction serverless (Vercel) : reçoit le formulaire de contact et envoie
// un email au studio via l'API Resend. Aucun mailto, aucune base de données —
// le message part côté serveur, proprement.
//
// Configuration requise (une seule fois, côté Vercel) :
//   1. Créer un compte sur https://resend.com et y vérifier le domaine
//      belaugure.studio (enregistrements DNS fournis par Resend).
//   2. Dans Vercel → Settings → Environment Variables, ajouter
//      RESEND_API_KEY = la clé fournie par Resend.
//   3. (Facultatif) CONTACT_TO pour changer le destinataire
//      (par défaut nicolas@belaugure.studio) et CONTACT_FROM pour l'expéditeur
//      (par défaut « Site Bel Augure <site@belaugure.studio> »).
// Tant que la clé n'est pas posée, la fonction répond par une erreur claire.

const TO = process.env.CONTACT_TO || 'nicolas@belaugure.studio'
const FROM = process.env.CONTACT_FROM || 'Site Bel Augure <site@belaugure.studio>'

const isEmail = (v) => typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
const clean = (v) => (typeof v === 'string' ? v.trim() : '')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Méthode non autorisée.' })
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {}
  const nom = clean(body.nom)
  const maison = clean(body.maison)
  const email = clean(body.email)
  const message = clean(body.message)

  // Pot de miel anti-spam : un champ invisible que seuls les robots remplissent.
  // Rempli → on répond « ok » sans rien envoyer (le robot croit avoir réussi).
  if (clean(body.website)) return res.status(200).json({ ok: true })

  if (!nom || !message || !isEmail(email)) {
    return res.status(400).json({ error: 'Merci de renseigner votre nom, un email valide et votre message.' })
  }

  if (!process.env.RESEND_API_KEY) {
    return res
      .status(500)
      .json({ error: "Le service d'envoi n'est pas encore configuré. Écrivez-nous directement à " + TO + '.' })
  }

  const subject = maison ? `Nouveau projet · ${maison}` : `Nouveau message · ${nom}`
  const text = [
    `Nom : ${nom}`,
    maison ? `Établissement : ${maison}` : null,
    `Email : ${email}`,
    '',
    message,
  ]
    .filter(Boolean)
    .join('\n')

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject,
        text,
      }),
    })
    if (!r.ok) {
      const detail = await r.text().catch(() => '')
      console.error('Resend error', r.status, detail)
      return res.status(502).json({ error: "L'envoi a échoué. Réessayez ou écrivez-nous directement à " + TO + '.' })
    }
    return res.status(200).json({ ok: true })
  } catch (e) {
    console.error('Contact handler error', e)
    return res.status(502).json({ error: "L'envoi a échoué. Réessayez ou écrivez-nous directement à " + TO + '.' })
  }
}

function safeParse(s) {
  try {
    return JSON.parse(s)
  } catch {
    return {}
  }
}
