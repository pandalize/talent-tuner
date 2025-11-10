import Stripe from 'stripe'
import type { IncomingMessage, ServerResponse } from 'http'
import fs from 'fs'
import path from 'path'

// Next.js の `NextApiRequest` / `NextApiResponse` に依存しないよう、
// Node の `http` 型をベースにした軽量な Req/Res を定義します。
type Req = IncomingMessage & {
  query?: any;
  body?: any;
  headers?: IncomingMessage['headers'];
  method?: string;
  url?: string;
};
type Res = ServerResponse & {
  status: (code: number) => Res;
  json: (body: any) => void;
  send: (body: any) => void;
};

export default async function handler(req: Req, res: Res) {
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
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename=\"${professionName}-report.pdf\"`)
    res.send(pdfBuffer)
  } catch (error: any) {
    console.error('PDFダウンロードAPIエラー:', error.message)
    res.status(500).json({ error: 'PDFダウンロードに失敗しました' })
  }
}