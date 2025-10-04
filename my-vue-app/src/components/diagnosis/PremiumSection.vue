<template>
  <div class="premium-section">
    <div class="premium-card">
      <div class="premium-header">
        <div class="premium-content">
          <h3 class="premium-title">詳細診断レポート</h3>
          <p class="premium-subtitle">より深い自己理解とキャリア設計のために</p>
        </div>
      </div>
      
      <div class="purchase-buttons">
        <div v-for="(profession, index) in professions.slice(0, 3)" :key="profession.name" class="profession-card">
          <div class="profession-info">
            <div class="profession-rank">{{ index + 1 }}位</div>
            <div class="profession-name">{{ profession.name }}</div>
            <div class="profession-price">¥{{ getProfessionPrice(profession.name) }}</div>
          </div>
          <!-- 購入済みの場合 -->
          <div v-if="isProfessionPurchased(profession.name)" class="purchased-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22,4 12,14.01 9,11.01"/>
            </svg>
            購入済み
          </div>
          
          <!-- 未購入の場合 -->
          <button v-else @click="purchasePdfReport(index)" class="premium-button" :disabled="isProcessing[index]">
            <svg v-if="!isProcessing[index]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
            </svg>
            <div v-if="isProcessing[index]" class="loading-spinner"></div>
            {{ isProcessing[index] ? '処理中...' : 'レポートを購入' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import type { ProfessionScore } from '../../utils/diagnosisLoader'

// Props
interface Props {
  professions: ProfessionScore[]
}

const props = defineProps<Props>()

const router = useRouter()

// 状態管理
const isProcessing = ref<Record<number, boolean>>({})
const professionReports = ref<any>(null)
const purchasedReports = ref<any[]>([])

// 職業レポート設定を読み込む関数
async function loadProfessionReports() {
  try {
    const response = await fetch('/data/profession-reports.json')
    if (response.ok) {
      professionReports.value = await response.json()
    } else {
      console.error('職業レポート設定の読み込みに失敗しました')
    }
  } catch (error) {
    console.error('職業レポート設定の読み込みエラー:', error)
  }
}

// 指定された職業の価格を取得する関数
function getProfessionPrice(professionName: string): number {
  const reportConfig = professionReports.value?.[professionName]
  return reportConfig?.price || 300
}

// 購入履歴を読み込む関数
function loadPurchasedReports() {
  const storedReports = sessionStorage.getItem('purchasedReports')
  if (storedReports) {
    try {
      purchasedReports.value = JSON.parse(storedReports)
      console.log('購入履歴を読み込みました:', purchasedReports.value.map(r => r.professionName))
    } catch (error) {
      console.error('購入履歴の読み込みエラー:', error)
      purchasedReports.value = []
    }
  } else {
    purchasedReports.value = []
    console.log('購入履歴なし')
  }
}

// 指定された職業が購入済みかチェックする関数
function isProfessionPurchased(professionName: string): boolean {
  return purchasedReports.value.some(report => report.professionName === professionName)
}

// ページがアクティブになったときに購入履歴を更新
const handleVisibilityChange = () => {
  if (!document.hidden) {
    // 決済から戻ってきた可能性があるかチェック
    const hasNewPurchaseData = sessionStorage.getItem('purchaseData')
    const hasPaymentCompleted = sessionStorage.getItem('paymentCompleted')
    
    if (hasPaymentCompleted || !hasNewPurchaseData) {
      console.log('決済完了の可能性があるため購入履歴を再読み込み')
      loadPurchasedReports()
    }
  }
}

// 決済完了データをチェック
onMounted(async () => {
  // 職業レポート設定を読み込み
  await loadProfessionReports()
  
  // 購入履歴を読み込み
  loadPurchasedReports()
  
  // ページの可視性変更を監視
  document.addEventListener('visibilitychange', handleVisibilityChange)
  
  // 古い決済完了データをクリア（不要になったため）
  sessionStorage.removeItem('paymentCompleted')
})

onUnmounted(() => {
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})

// 決済画面への遷移
async function purchasePdfReport(professionIndex: number = 0) {
  if (isProcessing.value[professionIndex]) return
  
  try {
    isProcessing.value[professionIndex] = true
    
    // 指定されたインデックスの職業データを準備
    const selectedProfession = props.professions[professionIndex]
    const professionName = selectedProfession?.name
    
    // 職業レポート設定から価格とレポートIDを取得
    const reportConfig = professionReports.value?.[professionName]
    const price = reportConfig?.price || 300
    const reportId = reportConfig?.reportId || 'default-report'
    
    const purchaseData = {
      professionName: professionName,
      price: price,
      currency: 'JPY',
      reportId: reportId,
      timestamp: new Date().toISOString(),
    }
    
    // SessionStorageに購入データを保存
    sessionStorage.setItem('purchaseData', JSON.stringify(purchaseData))
    
    // 決済画面に遷移
    await router.push('/payment')
    
  } catch (error) {
    console.error('Purchase error:', error)
    alert('決済画面への遷移でエラーが発生しました。もう一度お試しください。')
  } finally {
    isProcessing.value[professionIndex] = false
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixins.scss' as mixins;

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

.premium-content {
  flex: 1;
}

.premium-title {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  margin-bottom: var(--space-xs);
  font-weight: 600;
  margin-top: 0;
  text-align: left;
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

// 3つの購入ボタンのスタイル
.purchase-buttons {
  @include mixins.grid-columns(1);
  gap: var(--space-md);
}

.profession-card {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: var(--space-md);
  @include mixins.flex-column(var(--space-sm));
}

.profession-info {
  @include mixins.flex-row(var(--space-md));
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-sm);
}

.profession-rank {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: var(--space-xs) var(--space-sm);
  border-radius: 16px;
  font-size: var(--fs-small);
  font-weight: 600;
  min-width: 40px;
  text-align: center;
}

.profession-name {
  flex: 1;
  font-weight: 600;
  font-size: 1.125rem;
  color: white;
}

.profession-price {
  font-family: var(--font-mono);
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
}

// 購入済みボタンのスタイル
.purchased-button {
  @include mixins.button-base;
  @include mixins.flex-center;
  gap: var(--space-sm);
  width: 100%;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  font-size: 1.125rem;
  font-weight: 600;
  padding: var(--space-md) var(--space-lg);
  border: 2px solid rgba(34, 197, 94, 0.3);
  cursor: default;
  
  svg {
    color: #22c55e;
  }
}

@include mixins.respond-to('mobile') {
  .premium-card {
    @include mixins.card-padding(lg);
  }
  
  .premium-header {
    gap: var(--space-sm);
  }
  
  .premium-title {
    font-size: 1.25rem;
    text-align: left;
  }
  
  .price-amount {
    font-size: 1.5rem;
  }

  .profession-info {
    @include mixins.flex-column(var(--space-xs));
    text-align: center;
  }

  .profession-name {
    font-size: 1rem;
  }

  .profession-price {
    font-size: 1.125rem;
  }
}
</style>