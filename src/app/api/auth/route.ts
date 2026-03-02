import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { hash, compare } from 'bcryptjs'

const prisma = new PrismaClient()

// Sign Up
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, email, password, name } = body

    if (action === 'signup') {
      // Check if user exists
      const existingUser = await prisma.user.findUnique({
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
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          preferredLanguage: 'fr',
          subscriptionTier: 'FREE'
        }
      })

      return NextResponse.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          preferredLanguage: user.preferredLanguage,
          subscriptionTier: user.subscriptionTier,
          onboardingCompleted: user.onboardingCompleted
        }
      })
    }

    if (action === 'signin') {
      // Find user
      const user = await prisma.user.findUnique({
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

    const user = await prisma.user.findUnique({
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
