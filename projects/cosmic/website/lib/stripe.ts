import Stripe from 'stripe'

// Initialize Stripe with API Key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  appInfo: {
    name: 'Cosmic Puppies Shop',
    version: '1.0.0',
  },
})