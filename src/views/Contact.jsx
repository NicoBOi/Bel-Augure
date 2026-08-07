import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'

// Le message est envoyé côté serveur par la fonction /api/contact (voir
// api/contact.js) : le studio reçoit un vrai email, sans ouvrir la messagerie
// du visiteur. Aucun stockage. La configuration (clé Resend) se fait côté
// Vercel — cf. commentaire de api/contact.js.
const ENDPOINT = '/api/contact'

// Champs qualifiants du rendez-vous : orientent le projet et filtrent les
// leads sous-budgétés (champ budget). La diffusion se précise de vive voix
// lors du premier échange, pas dans le formulaire.
const PROJETS = ['Film Signature', 'Histoires de marque', 'Campagne', 'Je ne sais pas encore']
const ECHEANCES = ['Une date précise', 'Dans les 3 mois', 'Dans l’année', 'Pas d’échéance']
const BUDGETS = [
  '3 500 – 6 000 €',
  '6 000 – 10 000 €',
  '10 000 – 15 000 €',
  '15 000 € et plus',
  'À définir ensemble',
]

export default function Contact({ onNavigate, prefill }) {
  const ref = useReveal(0.35)
  // Le message part vide, ou pré-rempli avec le récapitulatif du devis composé
  // sur la page Offres (repris via la prop prefill au montage de la vue).
  const [form, setForm] = useState(() => ({
    nom: '',
    maison: '',
    email: '',
    projet: prefill?.offer && PROJETS.includes(prefill.offer) ? prefill.offer : '',
    echeance: '',
    budget: '',
    diffusion: '',
    message: prefill?.message || '',
    website: '',
  }))
  // status : 'idle' | 'sending' | 'sent' | 'error'
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  // Le champ « projet » se déroule pour montrer tout son contenu (utile quand
  // le récapitulatif du devis le pré-remplit) et grandit à mesure qu'on écrit.
  const messageRef = useRef(null)
  useEffect(() => {
    const el = messageRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [form.message, status])

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    setErrorMsg('')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Envoi impossible pour le moment.')
      setStatus('sent')
      setForm({
        nom: '',
        maison: '',
        email: '',
        projet: '',
        echeance: '',
        budget: '',
        diffusion: '',
        message: '',
        website: '',
      })
    } catch (err) {
      setErrorMsg(err.message || 'Envoi impossible pour le moment.')
      setStatus('error')
    }
  }

  const sending = status === 'sending'
  const sent = status === 'sent'

  return (
    <section
      ref={ref}
      aria-label="Contact"
      className="flex h-full flex-col justify-start px-6 pb-14 pt-28 overflow-y-auto md:pb-[9vh] md:px-16"
    >
      <div className="grid gap-12 lg:flex-1 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-5 lg:flex lg:flex-col lg:justify-center">
          <div>
          <h1 className="font-display text-[clamp(2rem,3.6vw,3.4rem)] leading-[1.25] text-encre">
            <span className="mask" style={{ '--d': '0.12s' }}>
              <span>Parlons de votre</span>
            </span>
            <span className="mask md:ml-[3vw]" style={{ '--d': '0.2s' }}>
              <span>
                prochain film<span className="text-or">.</span>
              </span>
            </span>
          </h1>

          <p
            className="reveal-up mt-8 max-w-[42ch] text-[14px] font-light leading-[1.9] text-encre/80"
            style={{ '--d': '0.12s' }}
          >
            Écrivez-nous en quelques lignes : votre maison, votre projet, votre échéance. Nous
            revenons vers vous avec un premier avis et une proposition de rendez-vous.
          </p>

          <p
            className="reveal-up mt-8 text-[13px] font-light tracking-[0.04em] text-grege"
            style={{ '--d': '0.08s' }}
          >
            <a
              href="mailto:nicolas@belaugure.studio"
              className="nav-link text-encre/80 transition-colors duration-500 hover:text-encre"
            >
              <span className="nav-label">nicolas@belaugure.studio</span>
            </a>
          </p>
          <p
            className="reveal-up mt-2 text-[13px] font-light tracking-[0.04em] text-grege"
            style={{ '--d': '0.1s' }}
          >
            <a
              href="tel:+33668499504"
              className="nav-link text-encre/80 transition-colors duration-500 hover:text-encre"
            >
              <span className="nav-label">06 68 49 95 04</span>
            </a>
          </p>
          <p className="reveal-up mt-2 text-[12px] font-light tracking-[0.1em] text-grege" style={{ '--d': '0.32s' }}>
            Bordeaux · Nouvelle-Aquitaine
          </p>
          <p className="reveal-up mt-6" style={{ '--d': '0.36s' }}>
            <button
              type="button"
              onClick={() => onNavigate?.('mentions')}
              className="cursor-pointer py-2 -my-2 text-[10px] font-light uppercase tracking-[0.2em] text-grege/80 transition-colors duration-500 hover:text-encre"
            >
              Mentions légales
            </button>
          </p>
          </div>
        </div>

        {sent ? (
          // Annonce de confirmation : le formulaire cède la place à un message
          // clair « c'est bon, on s'occupe de tout ».
          <div
            role="status"
            aria-live="polite"
            className="reveal-right lg:col-span-6 lg:col-start-7 lg:flex lg:flex-col lg:justify-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-or text-encre">
              <IconCheck />
            </span>
            <h2 className="mt-6 font-display text-[clamp(1.7rem,2.6vw,2.4rem)] leading-[1.15] text-encre">
              C'est envoyé<span className="text-or">.</span>
            </h2>
            <p className="mt-4 max-w-[42ch] text-[14px] font-light leading-[1.85] text-encre/80">
              Votre message est bien arrivé. Nous revenons vers vous, généralement sous deux
              jours ouvrés, pour convenir d'un premier échange de trente minutes.
            </p>
            <button
              type="button"
              onClick={() => onNavigate?.('accueil')}
              className="cta mt-8 w-max cursor-pointer px-8 py-3 text-[13px] font-normal tracking-[0.06em]"
            >
              Revenir à l'accueil
            </button>
          </div>
        ) : (
        <form
          className="reveal-right lg:col-span-6 lg:col-start-7 lg:flex lg:flex-col lg:justify-center"
          style={{ '--d': '0.08s' }}
          onSubmit={submit}
        >
          {prefill?.message && (
            <p className="mb-7 text-[12.5px] font-light leading-[1.65] text-encre/70">
              Votre sélection{prefill.offer ? ` — ${prefill.offer}` : ''} est reprise ci-dessous.
              Ajoutez vos coordonnées, et on s'occupe du reste.
            </p>
          )}
          <div className="grid gap-x-8 gap-y-7 md:grid-cols-2">
            <div>
              <label
                htmlFor="contact-nom"
                className="text-[10px] font-normal uppercase tracking-[0.25em] text-grege"
              >
                Votre nom
              </label>
              <input
                id="contact-nom"
                type="text"
                required
                autoComplete="name"
                className="field mt-1"
                value={form.nom}
                onChange={update('nom')}
              />
            </div>

            <div>
              <label
                htmlFor="contact-maison"
                className="text-[10px] font-normal uppercase tracking-[0.25em] text-grege"
              >
                Votre marque ou établissement
              </label>
              <input
                id="contact-maison"
                type="text"
                autoComplete="organization"
                className="field mt-1"
                value={form.maison}
                onChange={update('maison')}
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="contact-email"
                className="text-[10px] font-normal uppercase tracking-[0.25em] text-grege"
              >
                Votre email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                autoComplete="email"
                className="field mt-1"
                value={form.email}
                onChange={update('email')}
              />
            </div>

            <div>
              <label
                htmlFor="contact-projet"
                className="text-[10px] font-normal uppercase tracking-[0.25em] text-grege"
              >
                Votre projet
              </label>
              <select
                id="contact-projet"
                className="field mt-1 cursor-pointer"
                value={form.projet}
                onChange={update('projet')}
              >
                <option value="">À préciser</option>
                {PROJETS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="contact-echeance"
                className="text-[10px] font-normal uppercase tracking-[0.25em] text-grege"
              >
                Votre échéance
              </label>
              <select
                id="contact-echeance"
                className="field mt-1 cursor-pointer"
                value={form.echeance}
                onChange={update('echeance')}
              >
                <option value="">À préciser</option>
                {ECHEANCES.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="contact-budget"
                className="text-[10px] font-normal uppercase tracking-[0.25em] text-grege"
              >
                Budget envisagé
              </label>
              <select
                id="contact-budget"
                className="field mt-1 cursor-pointer"
                value={form.budget}
                onChange={update('budget')}
              >
                <option value="">À définir</option>
                {BUDGETS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="contact-message"
                className="text-[10px] font-normal uppercase tracking-[0.25em] text-grege"
              >
                Votre message
              </label>
              <textarea
                id="contact-message"
                ref={messageRef}
                rows={4}
                required
                className="field mt-1 min-h-[7rem] resize-none overflow-hidden"
                value={form.message}
                onChange={update('message')}
              />
            </div>
          </div>

          {/* Pot de miel anti-spam : hors écran, hors tabulation, ignoré des
              humains. Rempli = message écarté côté serveur. */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
            value={form.website}
            onChange={update('website')}
          />

          <button
            type="submit"
            disabled={sending}
            className="cta mt-9 w-max cursor-pointer px-9 py-3.5 text-[13px] font-normal tracking-[0.06em] disabled:cursor-default disabled:opacity-60"
          >
            {sending ? 'Envoi en cours…' : 'Envoyer votre demande'}
          </button>

          {/* Retour d'état, annoncé aux lecteurs d'écran (envoi / erreur ;
              le succès bascule sur l'annonce de confirmation). */}
          <p
            aria-live="polite"
            role="status"
            className="mt-4 min-h-[1.3em] text-[12.5px] font-light leading-[1.6]"
          >
            {sending && <span className="text-grege">Envoi en cours…</span>}
            {status === 'error' && <span className="text-encre/80">{errorMsg}</span>}
          </p>

          <p className="mt-2 max-w-[46ch] text-[12.5px] font-light leading-[1.7] text-encre/60">
            Nous vous répondons généralement sous deux jours ouvrés pour convenir d’un premier
            échange de trente minutes.
          </p>

          <p className="mt-3 max-w-[46ch] text-[11px] font-light leading-[1.7] text-encre/45">
            Vos informations servent uniquement à vous répondre — jamais de prospection.{' '}
            <button
              type="button"
              onClick={() => onNavigate?.('mentions')}
              className="cursor-pointer underline decoration-encre/30 underline-offset-2 transition-colors duration-300 hover:text-encre"
            >
              En savoir plus
            </button>
          </p>
        </form>
        )}
      </div>

      <p className="mt-auto pt-16 text-center text-[11px] font-light tracking-[0.04em] text-grege">
        Studio de production basé à Bordeaux
      </p>
    </section>
  )
}

function IconCheck() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}
