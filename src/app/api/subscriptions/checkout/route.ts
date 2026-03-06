import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-jwt'
import { db } from '@/lib/db'
import { getOrCreateCustomer, createCheckoutSession, SUBSCRIPTION_PLANS } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    
    if (authResult instanceof Response) {
      return authResult
    }
    
    const user = authResult
    const body = await request.json()
    const { plan } = body
    
    // Validate plan
    if (!plan || !['PREMIUM', 'FAMILLE'].includes(plan)) {
      return NextResponse.json(
        { error: 'Invalid plan. Choose PREMIUM or FAMILLE' },
        { status: 400 }
      )
    }
    
    const planConfig = SUBSCRIPTION_PLANS[plan]
    
    // Check if Stripe is configured
    if (!planConfig.priceId) {
      return NextResponse.json(
        { error: 'Payment not configured. Please contact support.' },
        { status: 400 }
      )
    }
    
    // Get user with subscription data
    const fullUser = await db.user.findUnique({
      where: { id: user.id },
      include: {
        subscription: true,
      },
    })
    
    if (!fullUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    
    const currentSubscription = fullUser.subscription
    
    // Get or create Stripe customer
    const customerId = await getOrCreateCustomer(
      fullUser.email,
      fullUser.name,
      currentSubscription?.stripeCustomerId
    )
    
    if (!customerId) {
      return NextResponse.json(
        { error: 'Failed to create payment customer' },
        { status: 500 }
      )
    }
    
    // Update subscription with customer ID if new
    if (currentSubscription && !currentSubscription.stripeCustomerId) {
      await db.subscription.update({
        where: { id: currentSubscription.id },
        data: { stripeCustomerId: customerId },
      })
    }
    
    // Create checkout session
    const origin = request.headers.get('origin') || 'http://localhost:3000'
    const checkoutUrl = await createCheckoutSession(
      customerId,
      planConfig.priceId,
      `${origin}/?subscription=success`,
      `${origin}/?subscription=canceled`
    )
    
    if (!checkoutUrl) {
      return NextResponse.json(
        { error: 'Failed to create checkout session' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ checkoutUrl })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
