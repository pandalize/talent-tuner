import Stripe from 'stripe'
import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const secretKey = config.stripeSecretKey
  const sessionIdRaw = getQuery(event).session_id
  const sessionId = Array.isArray(sessionIdRaw) ? sessionIdRaw[0] : String(sessionIdRaw)
  const stripe = new Stripe(secretKey)
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid') {
      throw createError({
        statusCode: 403,
        statusMessage: '未決済です',
      })
    }

    const professionName = session.metadata?.professionName

    // PDFファイルパス
    const pdfPath = path.join(process.cwd(), 'public/pdfs', `${professionName}-report.pdf`)
    if (!fs.existsSync(pdfPath)) {
      throw createError({
        statusCode: 404,
        statusMessage: 'PDFファイルが存在しません',
      })
    }
    const pdfBuffer = fs.readFileSync(pdfPath)

    // 例：UTF-8 名を安全に渡す
    const origName = `${professionName}-report.pdf`
    const safeAscii = origName.replace(/[^a-zA-Z0-9-_\.]/g, '-')
    const encoded = encodeURIComponent(origName)
    setHeader(event, 'Content-Type', 'application/pdf')
    setHeader(event, 'Content-Disposition', `attachment; filename="${safeAscii}"; filename*=UTF-8''${encoded}`)
    return pdfBuffer
  } catch (error: any) {
    console.error('download-pdf actual error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'PDFダウンロードに失敗しました',
    })
  }
})