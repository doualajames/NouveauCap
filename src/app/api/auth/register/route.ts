import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { hash } from 'bcryptjs'
import { createSessionToken } from '@/lib/auth-jwt'
import { sendEmail, welcomeEmailHtml } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hash(password, 12)

    // Create user
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
      },
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

    // Send welcome email (fire-and-forget — never blocks registration)
    sendEmail({
      to: user.email,
      subject: 'Bienvenue sur NouveauCap / Welcome to NouveauCap',
      html: welcomeEmailHtml(user.name || '', 'fr'),
    }).catch((err) => console.error('[email] Welcome email failed:', err))

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
      },
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
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
