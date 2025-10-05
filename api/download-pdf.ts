import Stripe from 'stripe'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) return res.status(500).json({ error: 'Stripe秘密キーが設定されていません' })

    const { session_id } = req.query
    const stripe = new Stripe(secretKey)
    const session = await stripe.checkout.sessions.retrieve(session_id as string)

    if (session.payment_status !== 'paid') {
      return res.status(403).json({ error: '未決済です' })
    }

    // 職業名をmetadataから取得
    const professionName = session.metadata?.professionName || 'report'

    // ダミーPDFデータ（本番はPDF生成処理に置き換え）
    const pdfBuffer = Buffer.from(`%PDF-1.4\n%Dummy PDF for ${professionName}\n`, 'utf-8')
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="${professionName}-report.pdf"`)
    res.send(pdfBuffer)
  } catch (error: any) {
    console.error('PDFダウンロードAPIエラー:', error.message)
    res.status(500).json({ error: 'PDFダウンロードに失敗しました' })
  }
}