// Séquence « 90 premiers jours » : rend vraie la promesse de la landing.
// Chaque étape a un délai (jours depuis l'inscription) + un sujet + un HTML.
// Le contenu renvoie vers les guides SEO existants (une seule source de vérité).

const BASE = process.env.NEXT_PUBLIC_APP_URL || 'https://nouveau-cap.vercel.app'

function layout(title: string, body: string): string {
  return `<!doctype html><html><body style="font-family:Georgia,serif;background:#f7f5f0;margin:0;padding:24px;color:#141414">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #141414;padding:28px">
    <p style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#7a2018;font-weight:700;margin:0">NouveauCap</p>
    <h1 style="font-size:24px;line-height:1.2;margin:8px 0 16px">${title}</h1>
    <div style="font-size:15px;line-height:1.6;color:#222">${body}</div>
    <hr style="border:none;border-top:1px solid #ddd;margin:24px 0">
    <p style="font-size:12px;color:#888;margin:0">Vous recevez cet email car vous avez rejoint NouveauCap.
    Information générale, pas un conseil en immigration.</p>
  </div></body></html>`
}

function btn(label: string, href: string): string {
  return `<a href="${href}" style="display:inline-block;background:#141414;color:#f7f5f0;text-decoration:none;padding:12px 20px;font-family:system-ui,sans-serif;font-size:14px;font-weight:600;margin-top:8px">${label} →</a>`
}

export type SequenceStep = {
  afterDays: number
  subject: string
  html: () => string
}

export const SEQUENCE: SequenceStep[] = [
  {
    afterDays: 0,
    subject: 'Bienvenue — votre guide des 90 premiers jours au Canada',
    html: () =>
      layout(
        'Vos premières démarches, dans le bon ordre',
        `<p>Bienvenue. Vous venez de faire le plus dur : décider de vous préparer.</p>
         <p>On va vous accompagner, étape par étape, sur les démarches qui comptent le plus à l'arrivée :
         NAS, assurance maladie, compte bancaire, logement.</p>
         <p>Commencez par la première, la plus urgente :</p>
         ${btn('Obtenir votre NAS', `${BASE}/guides/numero-assurance-sociale-nas`)}
         <p style="margin-top:20px">Tous les guides sont ici : ${BASE}/guides</p>`
      ),
  },
  {
    afterDays: 3,
    subject: 'Assurance maladie : le piège du délai de carence',
    html: () =>
      layout(
        "Ne restez pas sans couverture santé",
        `<p>Beaucoup de provinces imposent jusqu'à 3 mois de carence avant que votre assurance maladie publique ne débute.</p>
         <p>Inscrivez-vous dès maintenant et prévoyez une couverture temporaire pour ce trou.</p>
         ${btn('Lire le guide santé par province', `${BASE}/guides/assurance-maladie-par-province`)}`
      ),
  },
  {
    afterDays: 7,
    subject: 'Ouvrir un compte bancaire (sans historique de crédit)',
    html: () =>
      layout(
        'Votre argent, dès la première semaine',
        `<p>Vous pouvez ouvrir un compte sans emploi ni historique de crédit. Les banques ont des forfaits « nouvel arrivant » gratuits la première année.</p>
         ${btn('Guide compte bancaire', `${BASE}/guides/ouvrir-compte-bancaire-nouvel-arrivant`)}`
      ),
  },
  {
    afterDays: 14,
    subject: 'Louer un logement sans dossier canadien',
    html: () =>
      layout(
        'Convaincre un propriétaire, autrement',
        `<p>Sans historique de crédit, un bon dossier (preuve de fonds, garant, références) fait la différence. Et attention aux arnaques.</p>
         ${btn('Guide logement', `${BASE}/guides/louer-logement-sans-historique-credit`)}`
      ),
  },
  {
    afterDays: 30,
    subject: 'Le mois est passé — et l\'argent ?',
    html: () =>
      layout(
        'Garder le contrôle du budget',
        `<p>Le premier mois concentre beaucoup de dépenses. Voici comment anticiper et garder une réserve.</p>
         ${btn('Guide budget', `${BASE}/guides/budget-premieres-semaines`)}
         <p style="margin-top:20px">Créez votre parcours personnalisé (gratuit) : ${btn('Mon espace', `${BASE}/app`)}</p>`
      ),
  },
]
