<!--
  職業詳細カードコンポーネント
  各職業の詳細情報を表示
-->
<template>
  <div 
    class="tw-profession-card" 
    :class="`rank-${rank}`"
    style="width: 100%; max-width: 100vw; overflow-x: hidden; box-sizing: border-box; margin-left: 0; margin-right: 0; padding: 1rem 1.5rem;"
  >
    <!-- カードヘッダー -->
    <div class="tw-card-header">
      <div class="tw-rank-section">
        <div class="tw-rank-badge" :class="rank === 1 ? 'bg-yellow-500' : 'bg-blue-600'">{{ rank }}位</div>
        <!-- 職業名 -->
        <h3 class="tw-profession-name">
          {{ profession.name }}
        </h3>
      </div>
      <div class="tw-total-score">
        <div class="score-circle">
          <svg class="score-ring" width="120" height="120">
            <circle cx="60" cy="60" r="48" fill="none" stroke="var(--bg-tertiary)" stroke-width="7"/>
            <circle
              cx="60" cy="60" r="48" fill="none"
              stroke="var(--accent-blue)"
              stroke-width="7"
              stroke-linecap="round"
              :stroke-dasharray="`${2 * Math.PI * 48}`"
              :stroke-dashoffset="`${2 * Math.PI * 48 * (1 - profession.score / 100)}`"
              transform="rotate(-90 60 60)"
            />
          </svg>
          <div class="score-text">
            <span class="score-value">{{ profession.score.toFixed(0) }}</span>
            <span class="score-unit">点</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- カテゴリー別スコア -->
    <div 
      class="tw-category-analysis" 
      style="width: 100%; overflow-x: hidden; box-sizing: border-box;"
    >
      <h4 class="tw-analysis-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
        </svg>
        適性分析
      </h4>
      <div 
        class="tw-category-grid" 
        style="width: 100%; box-sizing: border-box;"
      >
        <div
          v-for="(score, category) in profession.categories"
          :key="category"
          class="tw-category-item"
          style="width: 95%; max-width: 95%; min-width: 0; box-sizing: border-box; overflow-x: hidden; margin: 0 auto 1.5rem auto;"
        >
          <div 
            class="tw-category-header" 
            style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 8px;"
          >
            <span 
              class="tw-category-name" 
              style="font-size: 14px; font-weight: 500; color: #374151; min-width: 0; flex: 1; word-wrap: break-word;"
            >
              {{ getCategoryName(category) }}
            </span>
            <span
              class="tw-category-score"
              style="font-size: 14px; color: #000000; font-family: Noto Sans JP; flex-shrink: 0;"
            >
              {{ score.toFixed(1) }}pt
            </span>
          </div>
          <div 
            class="tw-category-bar" 
            style="height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden; width: 95%; max-width: 95%;"
          >
            <div 
              class="tw-category-fill" 
              :style="{ 
                width: `${(score / maxCategoryScore) * 100}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #3b82f6, #eab308)',
                borderRadius: '4px',
                transition: 'width 0.3s ease'
              }"
              :data-category="category"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 職業詳細情報 -->
    <div 
      class="tw-profession-details" 
      style="width: 100%; overflow-x: hidden; box-sizing: border-box;"
    >
      <!-- コメント -->
      <div class="tw-detail-section" style="margin-bottom: 16px;">
        <h4 class="tw-detail-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
          適性コメント
        </h4>
        <p 
          class="tw-detail-content" 
          style="word-wrap: break-word; overflow-wrap: break-word; line-height: 1.6; color: #374151;"
        >
          {{ profession.comment || 'あなたの回答から分析した結果、この職業があなたの特性や価値観に適している可能性が高いことがわかりました。ぜひチャレンジを検討してみてください。' }}
        </p>
      </div>
      
      <!-- 年収情報 -->
      <div v-if="profession.annualIncome" class="tw-detail-section" style="margin-bottom: 16px;">
        <h4 class="tw-detail-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="1" x2="12" y2="23"/>
            <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
          </svg>
          年収目安
        </h4>
        <p class="tw-income-value" style="font-weight: 600; color: #eab308; font-family: monospace;">
          {{ profession.annualIncome }}
        </p>
      </div>
      
      <!-- 仕事内容 -->
      <div v-if="profession.jobDetails" class="tw-detail-section" style="margin-bottom: 16px;">
        <h4 class="tw-detail-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
          業務内容
        </h4>
        <p 
          class="tw-detail-content" 
          style="word-wrap: break-word; overflow-wrap: break-word; line-height: 1.6; color: #374151;"
        >
          {{ profession.jobDetails }}
        </p>
      </div>
    </div>
    
    <!-- 詳細リンクボタン -->
    <router-link 
      :to="`/profession/${profession.id || profession.name.toLowerCase().replace(/\s+/g, '-')}`" 
      class="tw-detail-link"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 18l6-6-6-6"/>
      </svg>
      この職業の詳細を見る
    </router-link>
  </div>
</template>

<script setup lang="ts">
import type { ProfessionScore } from '../../utils/diagnosisLoader'
import { useDiagnosis } from '../../composables/useDiagnosis'

// Props
interface Props {
  profession: ProfessionScore
  rank: number
  maxCategoryScore: number
}

defineProps<Props>()

// Composable
const { getCategoryName } = useDiagnosis()
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixins.scss' as mixins;

// ランクバッジの背景色のみSCSSで管理
.rank-1 .tw-rank-badge {
  background: linear-gradient(135deg, #ffd700, #ffed4e) !important; /* 金色 */
}

.rank-2 .tw-rank-badge {
  background: linear-gradient(135deg, #c0c0c0, #e5e5e5) !important; /* 銀色 */
}

.rank-3 .tw-rank-badge {
  background: linear-gradient(135deg, #e9a660, #f4bc7a) !important; /* 明るい銅色 */
}

// 各要素の上下マージン設定
.tw-rank-badge {
  margin: var(--space-sm) 0;
  border-radius: 15px !important;
  width: 50px !important;
  height: 30px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 0.875rem !important;
}

.rank-title {
  margin: var(--space-sm) 0;
}

.tw-rank-section {
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
}

.tw-profession-name {
  margin: 0 !important;
  display: inline-block !important;
  font-weight: 700 !important;
}

.tw-analyze-title {
  margin: var(--space-md) 0;
}

.tw-analysis-title {
  margin: var(--space-md) 0 var(--space-sm) 0;
  font-weight: 700 !important;
}

.tw-category-item {
  margin: var(--space-md) 0;
}

.tw-detail-title {
  margin: var(--space-md) 0 var(--space-sm) 0;
  font-weight: 700 !important;
}

.tw-detail-content {
  margin: 0 0 var(--space-sm) 0;
}

.tw-income-value {
  margin: 0;
}

// スコア円グラフ（Tailwindで管理困難な部分のみ）
.score-circle {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}

.score-text {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}

.score-value {
  font-family: var(--font-mono);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-navy);
  line-height: 1;
}

.score-unit {
  font-size: 0.75rem;
  color: var(--text-secondary);
  line-height: 1;
}

.rank-label {
  display: flex;
  flex-direction: column;
}

</style>