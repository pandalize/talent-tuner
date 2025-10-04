<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js'

const router = useRouter()
const stripe = ref<Stripe | null>(null)
const elements = ref<StripeElements | null>(null)
const cardElement = ref<StripeCardElement | null>(null)
const isLoading = ref(false)
const stripePublicKey = ref(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
const postalCode = ref('')

// 購入データの受け取り
interface PurchaseData {
  professionName: string
  price: number
  currency: string
  reportId: string
  timestamp: string
}

const purchaseData = ref<PurchaseData | null>(null)
const error = ref<string>('')

onMounted(async () => {
  try {
    // SessionStorageから購入データを読み取り
    const storedData = sessionStorage.getItem('purchaseData')
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      
      // 必要なデータがすべて含まれているかチェック
      if (parsedData.professionName && parsedData.price && parsedData.currency && parsedData.reportId) {
        purchaseData.value = parsedData
        console.log('購入データを読み込みました:', parsedData.professionName, '¥' + parsedData.price)
      } else {
        error.value = '購入データが不完全です。診断結果ページからやり直してください。'
        return
      }
    } else {
      error.value = '購入データが見つかりません。診断結果ページからやり直してください。'
      return
    }
    
    const stripeInstance = await loadStripe(stripePublicKey.value)
    stripe.value = stripeInstance as Stripe | null
    
    if (stripe.value) {
      elements.value = stripe.value.elements({
        locale: 'ja'
      })
      cardElement.value = elements.value.create('card', {
        style: {
          base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': {
              color: '#aab7c4',
            },
          },
        },
        hidePostalCode: true
      })
      
      setTimeout(() => {
        if (cardElement.value) {
          cardElement.value.mount('#card-element')
        }
      }, 100)
    }
  } catch (error) {
    console.error('Stripe初期化エラー:', error)
  }
})

const handlePayment = async () => {
  if (!stripe.value || !cardElement.value) {
    console.error('Stripe または CardElement が利用できません')
    return
  }

  isLoading.value = true

  try {
    console.log('決済処理開始:', purchaseData.value?.professionName, purchaseData.value?.reportId)
    
    const response = await fetch('http://localhost:3000/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        amount: purchaseData.value?.price,
        currency: purchaseData.value?.currency,
        professionName: purchaseData.value?.professionName,
        reportId: purchaseData.value?.reportId
      })
    })

    const data = await response.json()

    if (response.ok && data.paymentIntent && data.paymentIntent.client_secret) {
      const result = await stripe.value.confirmCardPayment(data.paymentIntent.client_secret, {
        payment_method: {
          card: cardElement.value,
        }
      })
      
      if (result.error) {
        console.error('決済エラー:', result.error.message)
        error.value = `決済エラー: ${result.error.message}`
      } else {
        console.log('決済成功:', result.paymentIntent.id, 'レポートID:', purchaseData.value?.reportId)
        
        // 既存の購入履歴を取得
        const existingPurchases = sessionStorage.getItem('purchasedReports')
        let purchasedReports = existingPurchases ? JSON.parse(existingPurchases) : []
        
        // 新しい購入情報を追加
        const newPurchase = {
          paymentIntentId: result.paymentIntent.id,
          professionName: purchaseData.value?.professionName,
          reportId: purchaseData.value?.reportId,
          price: purchaseData.value?.price,
          completedAt: new Date().toISOString(),
          status: 'completed'
        }
        
        // 重複チェック（同じ職業を再購入しないように）
        const isDuplicate = purchasedReports.some((report: any) => 
          report.professionName === purchaseData.value?.professionName
        )
        
        if (!isDuplicate) {
          purchasedReports.push(newPurchase)
          sessionStorage.setItem('purchasedReports', JSON.stringify(purchasedReports))
        }
        
        // 最新の購入情報も保存（後方互換性のため）
        sessionStorage.setItem('paymentCompleted', JSON.stringify(newPurchase))
        
        // 購入データをクリア
        sessionStorage.removeItem('purchaseData')
        
        // 決済完了メッセージを表示するため、診断結果ページに戻る
        // 他の職業のレポート購入ボタンも表示されるように
        router.push('/diagnosis')
      }
    } else {
      console.error('PaymentIntent作成エラー:', data)
      error.value = '決済処理でエラーが発生しました。もう一度お試しください。'
    }
  } catch (err) {
    console.error('決済処理エラー:', err)
    error.value = 'ネットワークエラーが発生しました。もう一度お試しください。'
  } finally {
    isLoading.value = false
  }
}

const onlyNumbers = (event: KeyboardEvent) => {
  // 数字(0-9)、Backspace、Delete、Arrow keys、Tabのみ許可
  const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab']
  const isNumber = /^[0-9]$/.test(event.key)
  
  if (!isNumber && !allowedKeys.includes(event.key)) {
    event.preventDefault()
  }
}

const formatPostalCode = (event: Event) => {
  const input = event.target as HTMLInputElement
  let value = input.value
  
  // 7桁ちょうどのみ許可
  if (value.length > 7) {
    value = value.slice(0, 7)
  }
  
  // 7桁の場合のみハイフンを挿入
  if (value.length === 7) {
    value = value.slice(0, 3) + '-' + value.slice(3)
    postalCode.value = value
    input.value = value
  } else {
    // 7桁未満の場合は表示を更新するが、postalCodeは更新しない
    input.value = value
    if (value.length === 0) {
      postalCode.value = ''
    }
  }
}
</script>

<template>
  <div class="payment-page">
    <h1>決済ページ</h1>
    
    <!-- エラー表示 -->
    <div v-if="error" class="error-message">
      <h2>エラー</h2>
      <p>{{ error }}</p>
      <router-link to="/" class="back-link">診断ページに戻る</router-link>
    </div>
    
    <!-- 購入内容の表示 -->
    <div v-else-if="purchaseData" class="purchase-info">
      <h2>購入内容</h2>
      <div class="product-details">
        <h3>{{ purchaseData.professionName }} 詳細診断レポート</h3>
        <p class="price">¥{{ purchaseData.price }} ({{ purchaseData.currency }})</p>
      </div>
    </div>
    
    <!-- 決済フォーム（エラーがない場合のみ表示） -->
    <div v-if="!error">
      <p>Stripe状態: {{ stripe ? 'OK' : '初期化中...' }}</p>
      <p>公開キー: {{ stripePublicKey ? 'OK' : 'NG' }}</p>
      
      <div class="card-form">
      <h3>カード情報を入力してください</h3>
      <div id="card-element" class="card-input"></div>
      
      <div class="postal-code-form">
        <label for="postal-code">郵便番号（日本）</label>
        <input 
          id="postal-code"
          v-model="postalCode"
          type="text" 
          placeholder="123-4567" 
          maxlength="8"
          class="postal-code-input"
          @input="formatPostalCode"
          @keypress="onlyNumbers"
        />
      </div>
    </div>
    
      <button 
        @click="handlePayment" 
        :disabled="isLoading || !stripe || postalCode.replace('-', '').length !== 7"
      >
        {{ isLoading ? '処理中...' : `決済する（¥${purchaseData?.price}）` }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.payment-page {
  padding: 2rem;
  text-align: center;
}

.error-message {
  background: #fed7d7;
  border: 1px solid #f56565;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

.error-message h2 {
  color: #c53030;
  margin-bottom: 1rem;
}

.error-message p {
  color: #742a2a;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.back-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #007cba;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.back-link:hover {
  background: #005a87;
}

.purchase-info {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  text-align: left;
}

.purchase-info h2 {
  color: #2d3748;
  margin-bottom: 1rem;
  text-align: center;
}

.product-details h3 {
  color: #007cba;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.product-details .price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #e53e3e;
  margin-bottom: 1rem;
}

button {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background: #007cba;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: #ccc;
}

.card-form {
  margin: 2rem 0;
}

.card-input {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 4px;
  margin: 1rem 0;
  background: white;
}

.postal-code-form {
  margin: 1rem 0;
  text-align: left;
}

.postal-code-form label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.postal-code-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}
</style>