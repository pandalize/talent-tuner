<!--
  職業詳細カードコンポーネント
  各職業の詳細情報を表示
-->
<template>
  <div class="tw-profession-card" :class="`rank-${rank}`">
    <!-- カードヘッダー -->
    <div class="tw-card-header">
      <div class="tw-rank-section">
        <div class="tw-rank-badge" :class="rank === 1 ? 'bg-yellow-500' : 'bg-blue-600'">{{ rank }}</div>
        <div class="rank-label">
          <span v-if="rank === 1" class="rank-title">最適職業</span>
          <span v-else-if="rank === 2" class="rank-title">次点候補</span>
          <span v-else class="rank-title">候補職業</span>
        </div>
      </div>
      <div class="tw-total-score">
        <div class="score-circle">
          <svg class="score-ring" width="60" height="60">
            <circle cx="30" cy="30" r="25" fill="none" stroke="var(--bg-tertiary)" stroke-width="4"/>
            <circle 
              cx="30" cy="30" r="25" fill="none" 
              stroke="var(--accent-blue)" 
              stroke-width="4"
              stroke-linecap="round"
              :stroke-dasharray="`${2 * Math.PI * 25}`"
              :stroke-dashoffset="`${2 * Math.PI * 25 * (1 - profession.score / 100)}`"
              transform="rotate(-90 30 30)"
            />
          </svg>
          <div class="score-text">
            <span class="score-value">{{ profession.score.toFixed(0) }}</span>
            <span class="score-unit">点</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 職業名 -->
    <h3 class="tw-profession-name">{{ profession.name }}</h3>
    
    <!-- カテゴリー別スコア -->
    <div class="tw-category-analysis">
      <h4 class="tw-analysis-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
        </svg>
        適性分析
      </h4>
      <div class="tw-category-grid">
        <div
          v-for="(score, category) in profession.categories"
          :key="category"
          class="tw-category-item"
        >
          <div class="tw-category-header">
            <span class="tw-category-name">{{ getCategoryName(category) }}</span>
            <span class="tw-category-score">{{ score.toFixed(1) }}pt</span>
          </div>
          <div class="tw-category-bar">
            <div 
              class="tw-category-fill" 
              :style="{ width: `${(score / maxCategoryScore) * 100}%` }"
              :data-category="category"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 職業詳細情報 -->
    <div class="tw-profession-details">
      <!-- コメント -->
      <div class="tw-detail-section">
        <h4 class="tw-detail-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
          適性コメント
        </h4>
        <p class="tw-detail-content">
          {{ profession.comment || 'あなたの回答から分析した結果、この職業があなたの特性や価値観に適している可能性が高いことがわかりました。ぜひチャレンジを検討してみてください。' }}
        </p>
      </div>
      
      <!-- 年収情報 -->
      <div v-if="profession.annualIncome" class="tw-detail-section">
        <h4 class="tw-detail-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="1" x2="12" y2="23"/>
            <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
          </svg>
          年収目安
        </h4>
        <p class="tw-income-value">{{ profession.annualIncome }}</p>
      </div>
      
      <!-- 仕事内容 -->
      <div v-if="profession.jobDetails" class="tw-detail-section">
        <h4 class="tw-detail-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
          業務内容
        </h4>
        <p class="tw-detail-content">{{ profession.jobDetails }}</p>
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
  background: var(--accent-gold) !important;
}

.rank-2 .tw-rank-badge {
  background: #c0c0c0 !important;
}

.rank-3 .tw-rank-badge {
  background: #cd7f32 !important;
}

// スコア円グラフ（Tailwindで管理困難な部分のみ）
.score-circle {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
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

.rank-title {
  font-size: var(--fs-small);
  color: var(--text-secondary);
  font-weight: 500;
}
</style>