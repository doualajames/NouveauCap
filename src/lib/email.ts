// Envoi email via Resend (REST, aucune dépendance). S'active dès que RESEND_API_KEY est posée.
// FROM doit être un domaine vérifié dans Resend (sinon envoi refusé — piège classique).

const RESEND_KEY = process.env.RESEND_API_KEY
const FROM = process.env.EMAIL_FROM || 'NouveauCap <onboarding@resend.dev>'

export const emailEnabled = !!RESEND_KEY

export async function sendEmail(args: { to: string; subject: string; html: string }): Promise<boolean> {
  if (!RESEND_KEY) {
    console.log('[email] désactivé (pas de RESEND_API_KEY) — non envoyé:', args.subject)
    return false
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from: FROM, to: args.to, subject: args.subject, html: args.html }),
    })
    if (!res.ok) {
      console.error('[email] échec Resend', res.status, await res.text())
      return false
    }
    return true
  } catch (e) {
    console.error('[email] erreur envoi', e)
    return false
  }
}
