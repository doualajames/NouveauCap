// Envoi email via Brevo (API v3, REST, aucune dépendance). S'active dès que BREVO_API_KEY est posée.
// EMAIL_FROM = "Nom <email@domaine>" ; l'expéditeur doit être un domaine/sender vérifié dans Brevo.

const BREVO_KEY = process.env.BREVO_API_KEY
const EMAIL_FROM = process.env.EMAIL_FROM || 'NouveauCap <bonjour@nouveau-cap.vercel.app>'

export const emailEnabled = !!BREVO_KEY

// Parse "Nom <email>" → { name, email } ; tolère un email brut
function parseFrom(from: string): { name: string; email: string } {
  const m = from.match(/^\s*(.*?)\s*<([^>]+)>\s*$/)
  if (m) return { name: m[1] || 'NouveauCap', email: m[2].trim() }
  return { name: 'NouveauCap', email: from.trim() }
}

export async function sendEmail(args: { to: string; subject: string; html: string }): Promise<boolean> {
  if (!BREVO_KEY) {
    console.log('[email] désactivé (pas de BREVO_API_KEY) — non envoyé:', args.subject)
    return false
  }
  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': BREVO_KEY,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        sender: parseFrom(EMAIL_FROM),
        to: [{ email: args.to }],
        subject: args.subject,
        htmlContent: args.html,
      }),
    })
    if (!res.ok) {
      console.error('[email] échec Brevo', res.status, await res.text())
      return false
    }
    return true
  } catch (e) {
    console.error('[email] erreur envoi', e)
    return false
  }
}
