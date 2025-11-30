import Stripe from 'stripe'
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS ヘッダ（開発用：Vite の origin を許可）
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') return res.status(204).end()
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

    // PDFファイルパス
    const pdfPath = path.join(process.cwd(), 'public/pdfs', `${professionName}-report.pdf`)
    if (!fs.existsSync(pdfPath)) {
      return res.status(404).json({ error: 'PDFファイルが存在しません' })
    }
    const pdfBuffer = fs.readFileSync(pdfPath)

    // 例：UTF-8 名を安全に渡す
    const origName = `${professionName}-report.pdf`
    const safeAscii = /^[\x20-\x7E]+$/.test(origName) ? origName : 'report.pdf'
    const encoded = encodeURIComponent(origName)
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="${safeAscii}"; filename*=UTF-8''${encoded}`)
    res.send(pdfBuffer)
  } catch (error: any) {
    console.error('PDFダウンロードAPIエラー:', error.message)
    res.status(500).json({ error: 'PDFダウンロードに失敗しました' })
  }
}