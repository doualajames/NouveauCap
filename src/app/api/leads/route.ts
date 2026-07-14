import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

const VALID_SOURCES = ['landing', 'simulateur-crs', 'quiz-citoyennete', 'pack-atterrissage']
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

    await db.lead.upsert({
      where: { email_source: { email: email.toLowerCase().trim(), source } },
      update: {},
      create: {
        email: email.toLowerCase().trim(),
        source,
        locale: locale === 'en' ? 'en' : 'fr',
      },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Lead capture error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
