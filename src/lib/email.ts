// Email utility — uses native fetch (no new dependency needed)
// Set EMAIL_API_KEY, EMAIL_FROM, EMAIL_PROVIDER in .env

const API_KEY = process.env.EMAIL_API_KEY || ''
const FROM = process.env.EMAIL_FROM || 'noreply@nouveaucap.com'

interface EmailPayload {
  to: string
  subject: string
  html: string
}

export async function sendEmail(payload: EmailPayload): Promise<boolean> {
  if (!API_KEY) {
    console.warn('[email] EMAIL_API_KEY not set — skipping send')
    return false
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: [payload.to],
        subject: payload.subject,
        html: payload.html,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('[email] Send failed:', err)
    }

    return res.ok
  } catch (error) {
    console.error('[email] Unexpected error:', error)
    return false
  }
}

export function welcomeEmailHtml(name: string, language: string): string {
  const isFr = language === 'fr'
  return `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1a1a1a;">
  <h1 style="color: #4f46e5;">${isFr ? 'Bienvenue sur NouveauCap' : 'Welcome to NouveauCap'}${name ? `, ${name}` : ''}!</h1>
  <p>${isFr
    ? 'Votre compte a été créé avec succès. Commencez dès maintenant à organiser votre installation au Canada.'
    : 'Your account has been successfully created. Start organizing your settlement in Canada right now.'
  }</p>
  <p>${isFr
    ? 'Complétez votre profil pour obtenir des tâches et ressources personnalisées selon votre statut et votre province.'
    : 'Complete your profile to get personalized tasks and resources based on your status and province.'
  }</p>
  <a href="${process.env.NEXTAUTH_URL || 'https://nouveaucap.com'}"
     style="display:inline-block; background:#4f46e5; color:#fff; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:600;">
    ${isFr ? 'Accéder à mon tableau de bord' : 'Go to my dashboard'}
  </a>
  <p style="margin-top:32px; font-size:12px; color:#6b7280;">${isFr ? 'Équipe NouveauCap' : 'The NouveauCap Team'}</p>
</body>
</html>`
}

export function permitExpiryEmailHtml(
  name: string,
  permitType: string,
  daysUntil: number,
  language: string,
): string {
  const isFr = language === 'fr'
  const urgency = daysUntil <= 30 ? '#dc2626' : daysUntil <= 60 ? '#d97706' : '#4f46e5'
  return `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1a1a1a;">
  <h2 style="color: ${urgency};">
    ${isFr
      ? `⏰ Rappel: votre ${permitType} expire dans ${daysUntil} jours`
      : `⏰ Reminder: your ${permitType} expires in ${daysUntil} days`
    }
  </h2>
  ${name ? `<p>${isFr ? `Bonjour ${name},` : `Hello ${name},`}</p>` : ''}
  <p>${isFr
    ? 'Pensez à renouveler votre document avant la date d\'expiration pour éviter toute interruption de votre statut.'
    : 'Please renew your document before the expiry date to avoid any interruption of your status.'
  }</p>
  <a href="${process.env.NEXTAUTH_URL || 'https://nouveaucap.com'}"
     style="display:inline-block; background:${urgency}; color:#fff; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:600;">
    ${isFr ? 'Voir mes tâches' : 'View my tasks'}
  </a>
</body>
</html>`
}

export function taskDeadlineEmailHtml(
  name: string,
  taskTitle: string,
  dueDate: string,
  language: string,
): string {
  const isFr = language === 'fr'
  return `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1a1a1a;">
  <h2 style="color: #d97706;">
    ${isFr ? `📋 Tâche à compléter: ${taskTitle}` : `📋 Task due: ${taskTitle}`}
  </h2>
  ${name ? `<p>${isFr ? `Bonjour ${name},` : `Hello ${name},`}</p>` : ''}
  <p>${isFr ? `Date limite: <strong>${dueDate}</strong>` : `Due date: <strong>${dueDate}</strong>`}</p>
  <a href="${process.env.NEXTAUTH_URL || 'https://nouveaucap.com'}"
     style="display:inline-block; background:#4f46e5; color:#fff; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:600;">
    ${isFr ? 'Voir ma liste de tâches' : 'View my task list'}
  </a>
</body>
</html>`
}
