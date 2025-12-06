import Stripe from 'stripe'
import type { IncomingMessage, ServerResponse } from 'http'

// 軽量な Req/Res 型（Next/Vercel に依存しない）
type Req = IncomingMessage & {
  body?: any;
  query?: any;
  headers?: IncomingMessage['headers'];
  method?: string;
  url?: string;
};
type Res = ServerResponse & {
  status: (code: number) => Res;
  json: (body: any) => void;
  setHeader: ServerResponse['setHeader'];
  end: ServerResponse['end'];
};
export default async function handler(req: Req, res: Res) {
  const allowedOrigin = process.env.CORS_ALLOW_ORIGIN || 'http://localhost:5173'
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin)
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // OPTIONS (プリフライト) には 204 で応答
  if (req.method === 'OPTIONS') {
      res.status(204).end();
      return;
  }

  if (req.method !== 'POST') {
      res.status(405).json({ error: 'POSTメソッドのみ許可' });
      return;
  }

  console.log('[body]', req.body);

  try {
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) {
      return res.status(500).json({ error: 'Stripe秘密キーが設定されていません' })
    }

    const stripe = new Stripe(secretKey)
    const {
      professionName,
      priceId,
      price,
      currency,
      timestamp
    } = req.body

    if (!professionName || !priceId || !price || !currency) {
      return res.status(400).json({ error: '必須パラメータが不足しています' })
    }
    if (typeof price !== 'number' || price <= 0) {
      return res.status(400).json({ error: '価格が無効です' })
    }

    console.log('metadata:', {
      professionName,
      priceId,
      price,
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
      success_url: `${process.env.SUCCESS_URL || (process.env.FRONTEND_URL ? process.env.FRONTEND_URL + '/success?session_id={CHECKOUT_SESSION_ID}' : 'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}')}`,
      cancel_url: `${process.env.CANCEL_URL || (process.env.FRONTEND_URL ? process.env.FRONTEND_URL + '/cancel' : 'http://localhost:5173/cancel')}`,
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
