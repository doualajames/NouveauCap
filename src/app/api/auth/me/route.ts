import { NextRequest, NextResponse } from 'next/server'
import { verifySessionToken } from '@/lib/auth-jwt'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Get token from cookie (cookie name is 'session')
    const token = request.cookies.get('session')?.value
    
    if (!token) {
      return NextResponse.json(
        { error: 'No authentication token' },
        { status: 401 }
      )
    }
    
    // Verify JWT token
    const payload = await verifySessionToken(token)
    if (!payload || !payload.userId) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }
    
    // Fetch user from database
    const user = await db.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        name: true,
        immigrationStatus: true,
        province: true,
        postalCode: true,
        arrivalDate: true,
        dateOfBirth: true,
        professionalSector: true,
        preferredLanguage: true,
        familyStatus: true,
        countryOfOrigin: true,
        subscriptionTier: true,
        onboardingCompleted: true,
        studyPermitExpiry: true,
        workPermitExpiry: true,
        passportExpiry: true,
        visaExpiry: true,
        createdAt: true,
        updatedAt: true,
      }
    })
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ user })
  } catch (error) {
    console.error('Auth verification error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    )
  }
}
