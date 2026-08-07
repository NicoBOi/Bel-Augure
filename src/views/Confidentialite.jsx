import LegalPage from '../components/LegalPage.jsx'

// Politique de confidentialité — page à part entière, joignable depuis le
// pied de page de toutes les vues (recommandation CNIL : une information
// aisément accessible, distincte des mentions légales).
const BLOCS = [
  {
    titre: 'Ce que nous collectons, et pourquoi',
    lignes: [
      'Le formulaire de contact recueille votre nom, votre établissement, votre email, la nature de votre projet, votre échéance, votre budget et votre message.',
      'Ces informations sont traitées par Bel Augure sur la base de mesures précontractuelles prises à votre demande (art. 6-1-b du RGPD), aux seules fins de répondre à votre message. Elles ne sont jamais cédées ni utilisées à des fins de prospection.',
      'Seuls le nom, l’email et le message sont nécessaires pour envoyer une demande.',
    ],
  },
  {
    titre: 'Destinataires et conservation',
    lignes: [
      'Votre message est transmis par email et conservé dans notre messagerie ainsi que chez notre prestataire d’envoi Resend Inc. (États-Unis). Le site est hébergé par Vercel Inc. (États-Unis).',
      'Ces transferts hors Union européenne sont encadrés par les garanties contractuelles de ces prestataires.',
      'Les messages sont conservés au plus trois ans après notre dernier échange.',
    ],
  },
  {
    titre: 'Vos droits',
    lignes: [
      'Vous disposez de droits d’accès, de rectification, d’effacement, d’opposition, de limitation et de portabilité.',
      'Ces droits s’exercent auprès de nicolas@belaugure.studio. Vous pouvez également adresser une réclamation à la CNIL (cnil.fr).',
    ],
  },
  {
    titre: 'Cookies et lecteur vidéo',
    lignes: [
      'Ce site ne dépose aucun cookie de suivi et ne mesure pas votre audience.',
      'La lecture des films fait appel au lecteur Vimeo (Vimeo.com Inc., États-Unis), configuré en mode « Do Not Track ».',
    ],
  },
]

export default function Confidentialite({ onNavigate }) {
  return (
    <LegalPage
      titre="Confidentialité"
      blocs={BLOCS}
      onNavigate={onNavigate}
      lienVue="mentions"
      lienLabel="Mentions légales"
    />
  )
}
