import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-jwt'
import { db } from '@/lib/db'
import { SUBSCRIPTION_PLANS } from '@/lib/stripe'

// GET - Get current subscription
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    
    if (authResult instanceof Response) {
      return authResult
    }
    
    const user = authResult
    
    const subscription = await db.subscription.findFirst({
      where: { 
        userId: user.id,
        status: 'ACTIVE' 
      },
      orderBy: { createdAt: 'desc' },
    })
    
    return NextResponse.json({
      subscription: subscription || null,
      planDetails: subscription ? SUBSCRIPTION_PLANS[subscription.plan as keyof typeof SUBSCRIPTION_PLANS] : SUBSCRIPTION_PLANS.FREE,
    })
  } catch (error) {
    console.error('Get subscription error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
