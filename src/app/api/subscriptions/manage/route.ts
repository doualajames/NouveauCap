import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-jwt'
import { db } from '@/lib/db'
import { createBillingPortalSession, cancelSubscription } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    
    if (authResult instanceof Response) {
      return authResult
    }
    
    const user = authResult
    const body = await request.json()
    const { action } = body
    
    // Get user's subscription
    const subscription = await db.subscription.findFirst({
      where: { 
        userId: user.id,
        status: 'ACTIVE' 
      },
      orderBy: { createdAt: 'desc' },
    })
    
    if (!subscription) {
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 404 }
      )
    }
    
    const origin = request.headers.get('origin') || 'http://localhost:3000'
    
    if (action === 'manage') {
      // Open billing portal
      if (!subscription.stripeCustomerId || !subscription.stripeSubscriptionId) {
        return NextResponse.json(
          { error: 'No Stripe subscription found' },
          { status: 400 }
        )
      }
      
      const portalUrl = await createBillingPortalSession(
        subscription.stripeCustomerId,
        `${origin}/`
      )
      
      if (!portalUrl) {
        return NextResponse.json(
          { error: 'Failed to create billing portal session' },
          { status: 500 }
        )
      }
      
      return NextResponse.json({ portalUrl })
    }
    
    if (action === 'cancel') {
      // Cancel subscription
      if (!subscription.stripeSubscriptionId) {
        return NextResponse.json(
          { error: 'No Stripe subscription found' },
          { status: 400 }
        )
      }
      
      const success = await cancelSubscription(subscription.stripeSubscriptionId)
      
      if (!success) {
        return NextResponse.json(
          { error: 'Failed to cancel subscription' },
          { status: 500 }
        )
      }
      
      // Update subscription in database
      await db.subscription.update({
        where: { id: subscription.id },
        data: { 
          status: 'CANCELED',
          endDate: new Date(),
        },
      })
      
      // Create new FREE subscription
      await db.subscription.create({
        data: {
          userId: user.id,
          plan: 'FREE',
          status: 'ACTIVE',
          alertsLimit: 3,
          alertsUsed: 0,
        },
      })
      
      return NextResponse.json({ success: true, message: 'Subscription canceled' })
    }
    
    return NextResponse.json(
      { error: 'Invalid action. Use "manage" or "cancel"' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Subscription manage error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
