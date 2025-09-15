<style scoped>
@media (max-width: 768px) {
  .premium-card {
    display: none !important;
  }
}
</style>
<!--
  プレミアム機能コンポーネント
  詳細診断レポート購入（Stripe決済統合）
-->
<template>
  <div class="premium-section">
    <div class="premium-card">
      <div class="premium-header">
        <div class="premium-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10,9 9,9 8,9"/>
          </svg>
        </div>
        <div class="premium-content">
          <h3 class="premium-title">詳細診断レポート</h3>
          <p class="premium-subtitle">より深い自己理解とキャリア設計のために</p>
        </div>
        <div class="premium-price">
          <span class="price-amount">¥500</span>
          <span class="price-tax">税込</span>
        </div>
      </div>
      
      <div class="premium-features">
        <div class="feature-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20,6 9,17 4,12"/>
          </svg>
          <span>16の詳細な適性分析レポート</span>
        </div>
        <div class="feature-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20,6 9,17 4,12"/>
          </svg>
          <span>パーソナライズされたキャリアアドバイス</span>
        </div>
        <div class="feature-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20,6 9,17 4,12"/>
          </svg>
          <span>スキル開発ロードマップの提案</span>
        </div>
        <div class="feature-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20,6 9,17 4,12"/>
          </svg>
          <span>面接対策・転職活動のヒント</span>
        </div>
      </div>
      
      <button @click="purchasePdfReport" class="premium-button" :disabled="isProcessing">
        <svg v-if="!isProcessing" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="9" cy="21" r="1"/>
          <circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
        </svg>
        <div v-if="isProcessing" class="loading-spinner"></div>
        {{ isProcessing ? '処理中...' : '詳細レポートを購入する' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ProfessionScore } from '../../utils/diagnosisLoader'

// Props
interface Props {
  professions: ProfessionScore[]
}

const props = defineProps<Props>()

// 状態管理
const isProcessing = ref(false)

// Stripe決済処理
async function purchasePdfReport() {
  if (isProcessing.value) return
  
  try {
    isProcessing.value = true
    
    // 診断結果データを準備
    const resultData = {
      professions: props.professions,
      timestamp: new Date().toISOString()
    }
    
    // Stripe Checkoutセッションを作成
    const response = await fetch('/api/create-checkout-session.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceAmount: 500, // 500円
        resultData: resultData
      })
    })
    
    if (!response.ok) {
      throw new Error('決済セッションの作成に失敗しました')
    }
    
    const { sessionId } = await response.json()
    
    // Stripe Checkoutにリダイレクト
    const stripe = (window as Window & { 
      Stripe?: (key: string) => { 
        redirectToCheckout: (options: { sessionId: string }) => Promise<{ error?: Error }> 
      } 
    }).Stripe?.(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
    
    if (!stripe) {
      alert('決済システムの初期化に失敗しました。ページを再読み込みしてください。')
      return
    }
    
    const { error } = await stripe.redirectToCheckout({ sessionId })
    
    if (error) {
      console.error('Stripe Error:', error)
      alert('決済処理でエラーが発生しました。もう一度お試しください。')
    }
  } catch (error) {
    console.error('Purchase error:', error)
    alert('購入処理中にエラーが発生しました。もう一度お試しください。')
  } finally {
    isProcessing.value = false
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixins.scss' as mixins;

.premium-section {
  // セクション全体は親コンポーネント（ResultDisplay）でスペーシング管理
}

.premium-card {
  background: linear-gradient(135deg, var(--primary-navy) 0%, var(--primary-blue) 100%);
  color: white;
  border-radius: 12px;
  @include mixins.card-padding(xl);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 100px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    transform: translate(50%, -50%);
  }
}

.premium-header {
  @include mixins.flex-row(var(--space-lg));
  margin-bottom: var(--space-lg);
  align-items: flex-start;
}

.premium-icon {
  @include mixins.flex-center;
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  flex-shrink: 0;
}

.premium-content {
  flex: 1;
}

.premium-title {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  margin-bottom: var(--space-xs);
  font-weight: 600;
  margin-top: 0;
}

.premium-subtitle {
  opacity: 0.8;
  font-size: var(--fs-body);
  margin: 0;
}

.premium-price {
  text-align: right;
  flex-shrink: 0;
}

.price-amount {
  font-family: var(--font-mono);
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
  display: block;
}

.price-tax {
  font-size: var(--fs-small);
  opacity: 0.8;
}

.premium-features {
  @include mixins.grid-columns(1);
  gap: var(--space-sm);
  margin-bottom: var(--space-xl);
}

.feature-item {
  @include mixins.flex-row(var(--space-sm));
  font-size: var(--fs-body);
  align-items: flex-start;
  
  svg {
    flex-shrink: 0;
    margin-top: 2px;
  }
  
  span {
    flex: 1;
  }
}

.premium-button {
  @include mixins.button-base;
  width: 100%;
  @include mixins.flex-center;
  gap: var(--space-sm);
  background: white;
  color: var(--primary-navy);
  font-size: 1.125rem;
  font-weight: 600;
  padding: var(--space-md) var(--space-lg);
  border: none;
  position: relative;
  overflow: hidden;

  &:hover:not(:disabled) {
    background: var(--bg-secondary);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transition: left 0.6s;
  }
  
  &:hover:not(:disabled)::before {
    left: 100%;
  }
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid var(--primary-navy);
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
}

// レスポンシブデザイン
@include mixins.respond-to('tablet') {
  .premium-header {
    @include mixins.flex-column(var(--space-md));
    text-align: center;
  }

  .premium-price {
    text-align: center;
  }
}

@include mixins.respond-to('mobile') {
  .premium-card {
    @include mixins.card-padding(lg);
  }
  
  .premium-header {
    gap: var(--space-sm);
  }
  
  .premium-icon {
    width: 50px;
    height: 50px;
  }
  
  .premium-title {
    font-size: 1.25rem;
  }
  
  .price-amount {
    font-size: 1.5rem;
  }
}
</style>