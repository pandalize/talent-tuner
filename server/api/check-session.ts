import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const secretKey = config.stripeSecretKey
  const { session_id } = getQuery(event) as { session_id: string }
  const stripe = new Stripe(secretKey)

try {
    const session = await stripe.checkout.sessions.retrieve(session_id)

    if (session.payment_status !== 'paid') {
      throw createError({
        statusCode: 403,
        statusMessage: '未決済です',
      })
    }

    // metadataから必要な情報を取得
    const professionName = session.metadata?.professionName

    return { professionName } 
  } catch (error) {

    throw createError({
      statusCode: 500,
      statusMessage: 'セッション情報取得に失敗しました',
    })
  }       
})
