import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { emailEnabled, sendEmail } from '@/lib/email'
import { SEQUENCE } from '@/lib/email/sequence'

// Inscrit un email à la séquence 90 jours + envoie l'étape 0. Non bloquant.
async function enqueueSequence(email: string, source: string) {
  if (!emailEnabled) return
  try {
    const existing = await db.emailSubscription.findUnique({ where: { email } })
    if (existing) return // déjà abonné, on ne renvoie pas la bienvenue
    const sub = await db.emailSubscription.create({ data: { email, source, step: 0 } })
    const ok = await sendEmail({ to: email, subject: SEQUENCE[0].subject, html: SEQUENCE[0].html() })
    if (ok) {
      const next = new Date(sub.createdAt)
      next.setDate(next.getDate() + SEQUENCE[1].afterDays)
      await db.emailSubscription.update({ where: { id: sub.id }, data: { step: 1, nextSendAt: next } })
    }
  } catch (e) {
    console.error('[email] enqueue échec', e)
  }
}

const VALID_SOURCES = ['landing', 'simulateur-crs', 'quiz-citoyennete', 'pack-atterrissage', 'guides']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// POST /api/leads — capture email publique (sans compte)
export async function POST(request: NextRequest) {
  try {
    const { email, source, locale } = await request.json()

    if (typeof email !== 'string' || !EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json({ error: 'Adresse courriel invalide' }, { status: 400 })
    }
    if (!VALID_SOURCES.includes(source)) {
      return NextResponse.json({ error: 'Source invalide' }, { status: 400 })
    }

    const cleanEmail = email.toLowerCase().trim()
    await db.lead.upsert({
      where: { email_source: { email: cleanEmail, source } },
      update: {},
      create: { email: cleanEmail, source, locale: locale === 'en' ? 'en' : 'fr' },
    })

    await enqueueSequence(cleanEmail, source)

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Lead capture error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
