import Stripe from 'stripe'

export default async function handler(req: any, res: any) {
  // CORS ヘッダ（開発用：Vite の origin を許可）
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') return res.status(204).end()
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) return res.status(500).json({ error: 'Stripe秘密キーが設定されていません' })

    const { session_id } = req.query
    if (!session_id) return res.status(400).json({ error: 'session_idがありません' })

    const stripe = new Stripe(secretKey)
    const session = await stripe.checkout.sessions.retrieve(session_id as string)

    if (session.payment_status !== 'paid') {
      return res.status(403).json({ error: '未決済です' })
    }

    // metadataから必要な情報を取得
    const professionName = session.metadata?.professionName || ''
    const customerName = session.metadata?.customerName || ''

    res.status(200).json({
      professionName,
      customerName
    })
  } catch (error: any) {
    console.error('check-session APIエラー:', error.message)
    res.status(500).json({ error: 'セッション情報取得に失敗しました' })
  }
}
