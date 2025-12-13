<template>
  <div class="payment-page">
    <h1>決済ページ</h1>
    
    <!-- エラー表示 -->
    <div v-if="error" class="error-message">
      <h2>エラー</h2>
      <p>{{ error }}</p>
      <NuxtLink to="/" class="back-link">診断ページに戻る</NuxtLink>
    </div>
    
    <!-- 購入内容の表示 -->
    <div v-else-if="purchaseData" class="purchase-info">
      <h2>購入内容</h2>
      <div class="product-details">
        <h3>{{ purchaseData.professionName }} 詳細診断レポート</h3>
        <p class="price">{{ purchaseData.price }} ({{ purchaseData.currency }})</p>
      </div>
    </div>
    
    <!-- 決済ボタン（エラーがない場合のみ表示） -->
    <div v-if="!error">
      <button @click="handlePayment" :disabled="isLoading">
        {{ isLoading ? '処理中...' : `決済する（${purchaseData?.price}）` }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PurchaseData } from '~/types/PurchaseData'
import type { ApiResponse } from '~/types/ApiResponse'

const isLoading = ref(false)

// 購入データの受け取り
const purchaseData = ref<PurchaseData>({
  professionName: '',
  priceId: '',
  price: 0,
  currency: 'JPY',
  timestamp: ''
})
const error = ref<string>('')

onMounted(async () => {
  try {
    // SessionStorageから購入データを読み取り
    const storedData = sessionStorage.getItem('purchaseData')
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      
      // 必要なデータがすべて含まれているかチェック
      if (parsedData.professionName && parsedData.price && parsedData.currency) {
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
  } catch (error) {
    console.error('初期化エラー:', error)
  }
})

const handlePayment = async () => {
  isLoading.value = true
  try {
    console.log('決済処理開始:', purchaseData.value?.professionName)
    const apiBase = import.meta.env.VITE_API_BASE ?? ''
    const url = `${apiBase}/api/create-payment-intent` // NewCareerChatView と同じパターン
    console.log('fetch url:', url)
    console.log('送信データ:', {
      priceId: purchaseData.value?.priceId,
      professionName: purchaseData.value?.professionName,
      price: purchaseData.value?.price,
      currency: purchaseData.value?.currency,
      timestamp: new Date().toISOString(),
    })
 
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        priceId: purchaseData.value?.priceId,
        professionName: purchaseData.value?.professionName,
        price: purchaseData.value?.price,
        currency: purchaseData.value?.currency,
        timestamp: new Date().toISOString(),
      })
    })

    const data = await res.json()
    if (res.ok && data.url) {
      window.location.href = data.url
      return
    } else {
      console.error('Checkout Session作成エラー:', data)
      error.value = '決済処理でエラーが発生しました。もう一度お試しください。'
    }
  } catch (err) {
    console.error('決済処理エラー:', err)
    error.value = 'ネットワークエラーが発生しました。もう一度お試しください。'
  } finally {
    isLoading.value = false
  }
}
</script>

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
</style>