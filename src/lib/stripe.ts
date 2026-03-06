import Stripe from 'stripe'

// Initialize Stripe only if key is available
export const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-02-24.acacia',
    })
  : null

// Subscription plans configuration
export const SUBSCRIPTION_PLANS = {
  FREE: {
    name: 'Gratuit',
    nameEn: 'Free',
    price: 0,
    priceId: null,
    features: [
      'Quiz citoyenneté',
      'Simulateur CRS basique',
      '3 alertes par mois',
      'Support par email',
    ],
    alertsLimit: 3,
  },
  PREMIUM: {
    name: 'Premium',
    nameEn: 'Premium',
    price: 19.99,
    priceId: process.env.STRIPE_PREMIUM_PRICE_ID || null,
    features: [
      'Toutes les fonctionnalités gratuites',
      'Optimisation CV illimitée avec IA',
      'Alertes illimitées',
      'Rappels d\'expiration permis',
      'Support prioritaire',
      'Accès événements exclusifs',
    ],
    alertsLimit: -1, // Unlimited
  },
  FAMILLE: {
    name: 'Famille',
    nameEn: 'Family',
    price: 39.99,
    priceId: process.env.STRIPE_FAMILY_PRICE_ID || null,
    features: [
      'Toutes les fonctionnalités Premium',
      'Jusqu\'à 4 membres famille',
      'Tableau de bord familial',
      'Rappels partagés',
      'Support dédié',
    ],
    alertsLimit: -1, // Unlimited
  },
} as const

export type PlanType = keyof typeof SUBSCRIPTION_PLANS

// Create or get Stripe customer
export async function getOrCreateCustomer(email: string, name: string | null, stripeCustomerId?: string | null): Promise<string | null> {
  if (!stripe) return null
  
  // If customer exists, return ID
  if (stripeCustomerId) {
    return stripeCustomerId
  }
  
  // Create new customer
  const customer = await stripe.customers.create({
    email,
    name: name || undefined,
  })
  
  return customer.id
}

// Create checkout session
export async function createCheckoutSession(
  customerId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
): Promise<string | null> {
  if (!stripe) return null
  
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      plan: priceId.includes('premium') ? 'PREMIUM' : 'FAMILLE',
    },
  })
  
  return session.url
}

// Create billing portal session
export async function createBillingPortalSession(
  customerId: string,
  returnUrl: string
): Promise<string | null> {
  if (!stripe) return null
  
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })
  
  return session.url
}

// Cancel subscription
export async function cancelSubscription(subscriptionId: string): Promise<boolean> {
  if (!stripe) return false
  
  try {
    await stripe.subscriptions.cancel(subscriptionId)
    return true
  } catch (error) {
    console.error('Error canceling subscription:', error)
    return false
  }
}
