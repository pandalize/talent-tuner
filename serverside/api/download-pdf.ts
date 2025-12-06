import Stripe from 'stripe'
import type { IncomingMessage, ServerResponse } from 'http'
import fs from 'fs'
import path from 'path'

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

  // CORS ヘッダ（開発用：Vite の origin を許可）
  const allowedOrigin = process.env.CORS_ALLOW_ORIGIN || 'http://localhost:5173'
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin)
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) return res.status(500).json({ error: 'Stripe秘密キーが設定されていません' })

    const sessionIdRaw = req.query?.session_id

    // session_id の基本バリデーション
    if (!sessionIdRaw) {
      return res.status(400).json({ error: 'session_id が必要です' })
    }
    const sessionId = Array.isArray(sessionIdRaw) ? sessionIdRaw[0] : String(sessionIdRaw)
    if (!sessionId || sessionId.trim() === '') {
      return res.status(400).json({ error: 'session_id が空です' })
    }
    if (!/^cs_/.test(sessionId)) {
      return res.status(400).json({ error: '無効な session_id 形式です' })
    }

    const stripe = new Stripe(secretKey)
    const session = await stripe.checkout.sessions.retrieve(sessionId)

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
    const safeAscii = origName.replace(/[^a-zA-Z0-9-_\.]/g, '-')
    const encoded = encodeURIComponent(origName)
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="${safeAscii}"; filename*=UTF-8''${encoded}`)
    res.send(pdfBuffer)
  } catch (error: any) {
    console.error('PDFダウンロードAPIエラー:', error.message)
    res.status(500).json({ error: 'PDFダウンロードに失敗しました' })
  }
}