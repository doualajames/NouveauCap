import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

const FORMATS = ['one-shot', 'monthly', 'freemium']
const WHO = ['self', 'relative', 'employer']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// POST /api/survey — sondage prix public (valide le modèle de monétisation, T3)
export async function POST(request: NextRequest) {
  try {
    const { email, format, maxPrice, whoPays, comment } = await request.json()

    if (!FORMATS.includes(format)) {
      return NextResponse.json({ error: 'Format invalide' }, { status: 400 })
    }
    if (email && (typeof email !== 'string' || !EMAIL_RE.test(email) || email.length > 254)) {
      return NextResponse.json({ error: 'Adresse courriel invalide' }, { status: 400 })
    }
    if (whoPays && !WHO.includes(whoPays)) {
      return NextResponse.json({ error: 'Réponse invalide' }, { status: 400 })
    }

    // maxPrice reçu en dollars → stocké en cents ; borne raisonnable
    let maxPriceCents: number | null = null
    if (maxPrice != null && maxPrice !== '') {
      const n = Number(maxPrice)
      if (Number.isFinite(n) && n >= 0 && n <= 10000) maxPriceCents = Math.round(n * 100)
    }

    await db.priceSurvey.create({
      data: {
        email: email ? String(email).toLowerCase().trim() : null,
        format,
        maxPriceCents,
        whoPays: whoPays || null,
        comment: comment ? String(comment).slice(0, 1000) : null,
      },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Survey error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
