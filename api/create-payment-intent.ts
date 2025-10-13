import Stripe from 'stripe'

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'POSTメソッドのみ対応' })

  try {
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) return res.status(500).json({ error: 'Stripe秘密キーが設定されていません' })

    const stripe = new Stripe(secretKey)
    const {
      professionName,
      priceId,
      price,
      currency,
      timestamp
    } = req.body

    console.log('metadata:', {
      professionName,
      priceId,
      price: price?.toString(),
      currency,
      timestamp,
    })

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
      success_url: 'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5173/cancel',
    })

    res.status(200).json({
      sessionId: session.id,
      url: session.url
    })
  } catch (error: any) {
    console.error('Checkout Session作成エラー:', error.message)
    res.status(500).json({ error: 'Checkout Session作成に失敗しました' })
  }
}
