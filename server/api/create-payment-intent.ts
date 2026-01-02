import Stripe from 'stripe'

type CreateCheckoutBody = {
  professionName: string
  priceId: string
  price: number
  currency: string
  timestamp: string
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const secretKey = config.stripeSecretKey
  const stripe = new Stripe(secretKey)
  const body = await readBody<CreateCheckoutBody>(event)
  const professionName = body.professionName
  const priceId = body.priceId
  const price = body.price
  const currency = body.currency
  const timestamp = body.timestamp
  console.log('metadata:', {
    professionName,
    priceId,
    price,
    currency,
    timestamp,
  })
  const siteUrl = (config.public.siteUrl as string)
  const successUrl = `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${siteUrl}/cancel`

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      metadata: {
        professionName: professionName,
        priceId: priceId,
        price: price.toString(),
        currency: currency,
        timestamp: timestamp,
      },

      success_url: successUrl,
      cancel_url: cancelUrl,
    })

    return {
      sessionId: session.id,
      url: session.url
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Checkout Session作成に失敗しました',
    })
  }
})
