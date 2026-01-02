<template>
  <div class="premium-card">
    <div class="premium-header">
      <h3>詳細診断レポート</h3>
      <p class="premium-text">より深い自己理解とキャリア設計のために</p>
    </div>
    <div class="purchase-buttons">
      <div v-for="(profession, index) in professions.slice(0, 3)" :key="profession.name" class="profession-card">
        <p class="profession-rank">{{ index + 1 }}位</p>
        <p class="profession-name">{{ profession.name }}</p>
        <p class="profession-price">¥{{ getProfessionPrice(profession.name) }}</p>
        <BaseButton
          variant="blue"
          size="md"
          :disabled="isProcessing[index]"
          @click="() => purchasePdfReport(index)"
        >
          <div v-if="isProcessing[index]">
            <div class="loading-spinner"></div>
            処理中...
          </div>
          <div v-else>
            レポートを購入
          </div>
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { navigateTo } from '#app'
import type { ProfessionScore } from '~/utils/diagnosisLoader'
import type { PurchaseData } from '~/types/PurchaseData'
import type { ProfessionReports } from '~/types/ProfessionReport'

// Props
interface Props {
  professions: ProfessionScore[] // 職業スコアの配列
}

const props = defineProps<Props>() // Propsの定義

// 状態管理
const isProcessing = ref<Record<number, boolean>>({}) // 各職業の購入処理中状態
const professionReports = ref<ProfessionReports | null>(null) // 職業レポート設定

// 職業レポート設定を読み込む関数
async function loadProfessionReports() {
  try {
    professionReports.value = await $fetch<ProfessionReports>('/data/profession-reports.json')
  } catch (error) {
    console.error('職業レポート設定の読み込みエラー:', error)
  }
}

// 指定された職業の価格を取得する関数
// profession-reports.json に基づいて
function getProfessionPrice(professionName: string): number {
  const reportConfig = professionReports.value?.[professionName]
  return reportConfig?.price || 300
}

// 決済完了データをチェック
onMounted(async () => {
  // 職業レポート設定を読み込み
  await loadProfessionReports()
})


// 決済画面への遷移
async function purchasePdfReport(professionIndex: number = 0) {
  if (isProcessing.value[professionIndex]) return
  try {
    isProcessing.value[professionIndex] = true
    
    // 指定されたインデックスの職業データを準備
    const selectedProfession = props.professions[professionIndex]
    const professionName = selectedProfession?.name
    if (!professionName) {
      return
    }
    // 職業レポート設定から価格とレポートIDを取得
    const reportConfig = professionReports.value?.[professionName]
    
    const purchaseData: PurchaseData = {
      professionName: professionName, // 日本語名のみ
      priceId: reportConfig?.priceId || 'default-price-id',
      price: reportConfig?.price || 300,
      currency: 'JPY',
      timestamp: new Date().toISOString(),
    }
    
    // SessionStorageに購入データを保存
    sessionStorage.setItem('purchaseData', JSON.stringify(purchaseData))
    
    // 決済画面に遷移
    await navigateTo('/payment')
    
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
  margin-bottom: var(--space-xl);

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

h3 {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  margin-bottom: var(--space-xs);
  font-weight: 600;
  margin-top: 0;
  text-align: left;
}

.premium-text {
  opacity: 0.8;
  font-size: var(--fs-body);
  margin-bottom: var(--space-md);
}

.purchase-buttons {
  gap: var(--space-md);
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.profession-card {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: var(--space-md);
  @include mixins.flex-column(var(--space-sm));
  align-items: center;
  flex: 0 1 calc(33% - 2rem);
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

.profession-name,
.profession-price {
  flex: 1;
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
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
@media (max-width: 768px) {
  .premium-header {
    @include mixins.flex-column(var(--space-md));
    text-align: center;
  }
}

@media (max-width: 480px) {
  .premium-card {
    @include mixins.card-padding(lg);
  }
  
  .premium-header {
    gap: var(--space-sm);
  }
  
  h3 {
    font-size: 1.25rem;
    text-align: left;
  }

  .profession-name {
    font-size: 1rem;
  }

  .profession-price {
    font-size: 1.125rem;
  }
}
</style>