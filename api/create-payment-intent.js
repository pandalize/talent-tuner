import Stripe from 'stripe'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173') //本番環境では適切なオリジンを指定
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POSTメソッドのみ対応' })
  }

  try {
    const secretKey = process.env.STRIPE_SECRET_KEY
    
    if (!secretKey) {
      return res.status(500).json({ error: 'Stripe秘密キーが設定されていません' })
    }

    const stripe = new Stripe(secretKey)
    const { amount, currency, professionName, reportId } = req.body || {}

    // 金額の妥当性チェック
    const validAmount = Math.max(100, Math.min(amount || 1000, 10000)) // 100円〜10,000円の範囲
    
    console.log(`PaymentIntent作成: 金額=${validAmount}円, 職業=${professionName}, レポート=${reportId}`)

    const paymentIntent = await stripe.paymentIntents.create({
      amount: validAmount,
      currency: currency || 'jpy',
      metadata: { 
        test_mode: 'true',
        profession_name: professionName || 'Unknown',
        report_id: reportId || 'default-report',
        service_name: 'talent-tuner-diagnosis-report'
      }
    })
    
    res.status(200).json({ 
      paymentIntent: {
        id: paymentIntent.id,
        client_secret: paymentIntent.client_secret,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status
      }
    })
    
  } catch (error) {
    console.error('PaymentIntent作成エラー:', error.message)
    
    res.status(500).json({ 
      error: 'PaymentIntent作成に失敗しました'
    })
  }
}
