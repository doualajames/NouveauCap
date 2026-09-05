import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { emailEnabled, sendEmail } from '@/lib/email'
import { SEQUENCE } from '@/lib/email/sequence'

export const dynamic = 'force-dynamic'

// Cron quotidien (Vercel) : envoie l'étape due de la séquence 90 jours à chaque abonné.
export async function GET(request: NextRequest) {
  // Protection : Vercel Cron envoie Authorization: Bearer $CRON_SECRET quand la var est définie.
  const secret = process.env.CRON_SECRET
  if (secret) {
    const auth = request.headers.get('authorization')
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }
  if (!emailEnabled) {
    return NextResponse.json({ skipped: 'email désactivé (pas de BREVO_API_KEY)' })
  }

  const now = new Date()
  const due = await db.emailSubscription.findMany({
    where: { active: true, nextSendAt: { lte: now } },
    take: 50,
    orderBy: { nextSendAt: 'asc' },
  })

  let sent = 0
  for (const sub of due) {
    const step = sub.step
    if (step >= SEQUENCE.length) {
      await db.emailSubscription.update({ where: { id: sub.id }, data: { active: false, nextSendAt: null } })
      continue
    }
    const ok = await sendEmail({ to: sub.email, subject: SEQUENCE[step].subject, html: SEQUENCE[step].html() })
    if (!ok) continue // on réessaiera au prochain passage
    sent++

    const nextStep = step + 1
    if (nextStep >= SEQUENCE.length) {
      await db.emailSubscription.update({ where: { id: sub.id }, data: { active: false, nextSendAt: null } })
    } else {
      const next = new Date(sub.createdAt)
      next.setDate(next.getDate() + SEQUENCE[nextStep].afterDays)
      await db.emailSubscription.update({ where: { id: sub.id }, data: { step: nextStep, nextSendAt: next } })
    }
  }

  return NextResponse.json({ processed: due.length, sent })
}
