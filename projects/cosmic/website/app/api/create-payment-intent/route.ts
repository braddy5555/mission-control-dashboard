import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { items, email, name } = await req.json()

    // Calculate total
    const total = items.reduce((sum: number, item: any) => {
      return sum + (Number(item.price) * item.quantity)
    }, 0)

    // Create order in database
    const order = await prisma.order.create({
      data: {
        email,
        name,
        subtotal: total,
        tax: 0,
        total: total,
        status: 'PENDING',
        paymentStatus: 'PENDING',
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
          }))
        }
      }
    })

    // Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Convert to cents
      currency: 'eur',
      automatic_payment_methods: { enabled: true },
      metadata: {
        orderId: order.id,
        email
      }
    })

    // Update order with payment intent
    await prisma.order.update({
      where: { id: order.id },
      data: { stripePaymentIntentId: paymentIntent.id }
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Payment intent error:', error)
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}
