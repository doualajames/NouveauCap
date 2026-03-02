import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { db } from '@/lib/db'

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-02-24.acacia',
    })
  : null

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(request: NextRequest) {
  if (!stripe || !webhookSecret) {
    return NextResponse.json(
      { error: 'Webhook not configured' },
      { status: 400 }
    )
  }
  
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')
  
  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe signature' },
      { status: 400 }
    )
  }
  
  let event: Stripe.Event
  
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }
  
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const customerId = session.customer as string
        const subscriptionId = session.subscription as string
        const plan = session.metadata?.plan || 'PREMIUM'
        
        // Find user by Stripe customer ID
        const subscription = await db.subscription.findFirst({
          where: { stripeCustomerId: customerId },
        })
        
        if (subscription) {
          // Update subscription
          await db.subscription.update({
            where: { id: subscription.id },
            data: {
              plan: plan,
              status: 'ACTIVE',
              stripeSubscriptionId: subscriptionId,
              startDate: new Date(),
              alertsLimit: -1, // Unlimited
            },
          })
          
          console.log(`Subscription activated for user: ${subscription.userId}`)
        }
        break
      }
      
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string
        
        const dbSubscription = await db.subscription.findFirst({
          where: { stripeCustomerId: customerId },
        })
        
        if (dbSubscription) {
          const status = subscription.status === 'active' ? 'ACTIVE' : 
                        subscription.status === 'canceled' ? 'CANCELED' : 
                        subscription.status === 'past_due' ? 'PAST_DUE' : 'INACTIVE'
          
          await db.subscription.update({
            where: { id: dbSubscription.id },
            data: { status },
          })
        }
        break
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string
        
        const dbSubscription = await db.subscription.findFirst({
          where: { stripeCustomerId: customerId },
        })
        
        if (dbSubscription) {
          // Mark subscription as canceled
          await db.subscription.update({
            where: { id: dbSubscription.id },
            data: { 
              status: 'CANCELED',
              endDate: new Date(),
            },
          })
          
          // Create new FREE subscription
          await db.subscription.create({
            data: {
              userId: dbSubscription.userId,
              plan: 'FREE',
              status: 'ACTIVE',
              alertsLimit: 3,
              alertsUsed: 0,
            },
          })
          
          console.log(`Subscription canceled for user: ${dbSubscription.userId}`)
        }
        break
      }
      
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string
        
        console.log(`Payment failed for customer: ${customerId}`)
        
        // You could send an email notification here
        break
      }
      
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }
    
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
