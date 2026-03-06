import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { hash, compare } from 'bcryptjs'
import { createSessionToken } from '@/lib/auth-jwt'

// Sign Up or Sign In
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, email, password, name } = body

    if (action === 'signup') {
      // Check if user exists
      const existingUser = await db.user.findUnique({
        where: { email }
      })

      if (existingUser) {
        return NextResponse.json(
          { error: 'Un utilisateur avec ce courriel existe déjà' },
          { status: 400 }
        )
      }

      // Hash password
      const hashedPassword = await hash(password, 10)

      // Create user
      const user = await db.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          preferredLanguage: 'fr',
          subscriptionTier: 'FREE'
        }
      })

      // Create default profile
      await db.profile.create({
        data: {
          userId: user.id,
          preferredLanguage: 'fr',
          onboardingCompleted: false,
          profileCompletion: 0,
        },
      })

      // Create default onboarding
      await db.onboarding.create({
        data: {
          userId: user.id,
          preferredLanguage: 'fr',
          currentStep: 1,
          completed: false,
        },
      })

      // Create free subscription
      await db.subscription.create({
        data: {
          userId: user.id,
          plan: 'FREE',
          status: 'ACTIVE',
          alertsLimit: 3,
          alertsUsed: 0,
        },
      })

      // Create JWT session token
      const token = await createSessionToken({
        id: user.id,
        email: user.email,
        name: user.name
      })

      // Create response with user data
      const response = NextResponse.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          preferredLanguage: user.preferredLanguage,
          subscriptionTier: user.subscriptionTier,
          onboardingCompleted: user.onboardingCompleted
        }
      })

      // Set session cookie
      response.cookies.set('session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/'
      })

      return response
    }

    if (action === 'signin') {
      // Find user
      const user = await db.user.findUnique({
        where: { email }
      })

      if (!user || !user.password) {
        return NextResponse.json(
          { error: 'Courriel ou mot de passe incorrect' },
          { status: 401 }
        )
      }

      // Compare password
      const isValid = await compare(password, user.password)

      if (!isValid) {
        return NextResponse.json(
          { error: 'Courriel ou mot de passe incorrect' },
          { status: 401 }
        )
      }

      // Create JWT session token
      const token = await createSessionToken({
        id: user.id,
        email: user.email,
        name: user.name
      })

      // Create response with user data
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
          onboardingCompleted: user.onboardingCompleted
        }
      })

      // Set session cookie
      response.cookies.set('session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/'
      })

      return response
    }

    return NextResponse.json({ error: 'Action invalide' }, { status: 400 })
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

// Get current user
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')

    if (!userId) {
      return NextResponse.json({ user: null })
    }

    const user = await db.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json({ user: null })
    }

    return NextResponse.json({
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
        onboardingCompleted: user.onboardingCompleted
      }
    })
  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json({ user: null })
  }
}
