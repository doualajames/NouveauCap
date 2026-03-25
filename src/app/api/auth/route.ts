import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { hash, compare } from 'bcryptjs'
import { createSessionToken } from '@/lib/auth-jwt'

function setSessionCookie(response: NextResponse, token: string) {
  response.cookies.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, email, password, name } = body

    // ── SIGN UP ───────────────────────────────────────────────
    if (action === 'signup') {
      if (!email || !password) {
        return NextResponse.json({ error: 'Email et mot de passe requis' }, { status: 400 })
      }
      if (password.length < 8) {
        return NextResponse.json({ error: 'Le mot de passe doit contenir au moins 8 caractères' }, { status: 400 })
      }

      const existing = await db.user.findUnique({ where: { email } })
      if (existing) {
        return NextResponse.json({ error: 'Un utilisateur avec ce courriel existe déjà' }, { status: 400 })
      }

      const hashedPassword = await hash(password, 10)
      const user = await db.user.create({
        data: { email, password: hashedPassword, name: name || null, preferredLanguage: 'fr', subscriptionTier: 'FREE' },
      })

      // Create companion records (ignore errors if they already exist)
      await Promise.allSettled([
        db.profile.create({ data: { userId: user.id, preferredLanguage: 'fr', onboardingCompleted: false, profileCompletion: 0 } }),
        db.onboarding.create({ data: { userId: user.id, preferredLanguage: 'fr', currentStep: 1, completed: false } }),
        db.subscription.create({ data: { userId: user.id, plan: 'FREE', status: 'ACTIVE', alertsLimit: 3, alertsUsed: 0 } }),
      ])

      const token = await createSessionToken({ id: user.id, email: user.email, name: user.name })
      const response = NextResponse.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          preferredLanguage: user.preferredLanguage,
          subscriptionTier: user.subscriptionTier,
          onboardingCompleted: user.onboardingCompleted,
        },
      })
      setSessionCookie(response, token)
      return response
    }

    // ── SIGN IN ───────────────────────────────────────────────
    if (action === 'signin') {
      if (!email || !password) {
        return NextResponse.json({ error: 'Email et mot de passe requis' }, { status: 400 })
      }

      const user = await db.user.findUnique({ where: { email } })
      if (!user || !user.password) {
        return NextResponse.json({ error: 'Courriel ou mot de passe incorrect' }, { status: 401 })
      }

      const isValid = await compare(password, user.password)
      if (!isValid) {
        return NextResponse.json({ error: 'Courriel ou mot de passe incorrect' }, { status: 401 })
      }

      const token = await createSessionToken({ id: user.id, email: user.email, name: user.name })
      const response = NextResponse.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          dateOfBirth: user.dateOfBirth?.toISOString(),
          immigrationStatus: user.immigrationStatus,
          province: user.province,
          arrivalDate: user.arrivalDate?.toISOString(),
          professionalSector: user.professionalSector,
          preferredLanguage: user.preferredLanguage,
          familyStatus: user.familyStatus,
          countryOfOrigin: user.countryOfOrigin,
          studyPermitExpiry: user.studyPermitExpiry?.toISOString(),
          workPermitExpiry: user.workPermitExpiry?.toISOString(),
          passportExpiry: user.passportExpiry?.toISOString(),
          subscriptionTier: user.subscriptionTier,
          onboardingCompleted: user.onboardingCompleted,
        },
      })
      setSessionCookie(response, token)
      return response
    }

    return NextResponse.json({ error: 'Action invalide' }, { status: 400 })

  } catch (error) {
    console.error('[/api/auth] error:', error)
    return NextResponse.json(
      { error: 'Erreur serveur. Vérifiez que la base de données est accessible.' },
      { status: 500 }
    )
  }
}

// Used by checkSession on mount — not called anymore (replaced by /api/auth/me)
export async function GET() {
  return NextResponse.json({ user: null })
}
