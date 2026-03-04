import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { db } from '@/lib/db'

const secretKey = process.env.JWT_SECRET || 'nouveaucap-secret-key-change-in-production'
const key = new TextEncoder().encode(secretKey)

export interface SessionUser {
  id: string
  email: string
  name: string | null
  subscriptionPlan: string
  subscriptionTier?: string
  immigrationStatus?: string
  province?: string
  arrivalDate?: string
  dateOfBirth?: string
  professionalSector?: string
  preferredLanguage?: string
  familyStatus?: string
  countryOfOrigin?: string
  onboardingCompleted?: boolean
  studyPermitExpiry?: string
  workPermitExpiry?: string
  passportExpiry?: string
  visaExpiry?: string
}

// Create JWT token
export async function createSessionToken(user: { id: string; email: string; name: string | null }): Promise<string> {
  const token = await new SignJWT({ 
    userId: user.id,
    email: user.email,
    name: user.name 
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d') // 7 days
    .sign(key)
  
  return token
}

// Verify JWT token
export async function verifySessionToken(token: string): Promise<{ userId: string; email: string; name: string | null } | null> {
  try {
    const { payload } = await jwtVerify(token, key)
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      name: payload.name as string | null
    }
  } catch (error) {
    console.error('JWT verification failed:', error)
    return null
  }
}

// Get current user from session
export async function getCurrentUser(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) {
      return null
    }
    
    const payload = await verifySessionToken(token)
    if (!payload) {
      return null
    }
    
    // Get fresh user data from database
    const user = await db.user.findUnique({
      where: { id: payload.userId },
      include: {
        subscription: true,
      }
    })
    
    if (!user) {
      return null
    }
    
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      subscriptionPlan: user.subscription?.plan || 'FREE'
    }
  } catch (error) {
    console.error('Get current user error:', error)
    return null
  }
}

// Set session cookie
export async function setSessionCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/'
  })
}

// Clear session cookie
export async function clearSessionCookie() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}

// Middleware helper to verify auth
export async function requireAuth(request: Request): Promise<SessionUser | Response> {
  const authHeader = request.headers.get('authorization')
  const cookieHeader = request.headers.get('cookie')
  
  let token: string | undefined
  
  // Check Authorization header first (Bearer token)
  if (authHeader?.startsWith('Bearer ')) {
    token = authHeader.substring(7)
  }
  
  // Then check cookies
  if (!token && cookieHeader) {
    const cookies = cookieHeader.split(';').map(c => c.trim())
    const sessionCookie = cookies.find(c => c.startsWith('session='))
    if (sessionCookie) {
      token = sessionCookie.substring(8)
    }
  }
  
  if (!token) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }
  
  const payload = await verifySessionToken(token)
  if (!payload) {
    return new Response(JSON.stringify({ error: 'Invalid session' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }
  
  // Get fresh user data
  const user = await db.user.findUnique({
    where: { id: payload.userId },
    include: {
      subscription: true,
    }
  })
  
  if (!user) {
    return new Response(JSON.stringify({ error: 'User not found' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }
  
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    subscriptionPlan: user.subscription?.plan || 'FREE',
    immigrationStatus: user.immigrationStatus ?? undefined,
    province: user.province ?? undefined,
    arrivalDate: user.arrivalDate?.toISOString() ?? undefined,
    dateOfBirth: user.dateOfBirth?.toISOString() ?? undefined,
    professionalSector: user.professionalSector ?? undefined,
    preferredLanguage: user.preferredLanguage ?? undefined,
    familyStatus: user.familyStatus ?? undefined,
    countryOfOrigin: user.countryOfOrigin ?? undefined,
    onboardingCompleted: user.onboardingCompleted,
    studyPermitExpiry: user.studyPermitExpiry?.toISOString() ?? undefined,
    workPermitExpiry: user.workPermitExpiry?.toISOString() ?? undefined,
    passportExpiry: user.passportExpiry?.toISOString() ?? undefined,
    visaExpiry: user.visaExpiry?.toISOString() ?? undefined,
  }
}

// Check if user has premium access
export function hasPremiumAccess(user: SessionUser): boolean {
  return user.subscriptionPlan === 'PREMIUM' || user.subscriptionPlan === 'FAMILLE'
}
