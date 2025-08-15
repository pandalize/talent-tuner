<!--
  職業詳細カードコンポーネント
  各職業の詳細情報を表示
-->
<template>
  <div class="profession-card" :class="`rank-${rank}`">
    <!-- カードヘッダー -->
    <div class="card-header">
      <div class="rank-section">
        <div class="rank-badge">{{ rank }}</div>
        <div class="rank-label">
          <span v-if="rank === 1" class="rank-title">最適職業</span>
          <span v-else-if="rank === 2" class="rank-title">次点候補</span>
          <span v-else class="rank-title">候補職業</span>
        </div>
      </div>
      <div class="total-score">
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
    <h3 class="profession-name">{{ profession.name }}</h3>
    
    <!-- カテゴリー別スコア -->
    <div class="category-analysis">
      <h4 class="analysis-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
        </svg>
        適性分析
      </h4>
      <div class="category-grid">
        <div
          v-for="(score, category) in profession.categories"
          :key="category"
          class="category-item"
        >
          <div class="category-header">
            <span class="category-name">{{ getCategoryName(category) }}</span>
            <span class="category-score">{{ score.toFixed(1) }}pt</span>
          </div>
          <div class="category-bar">
            <div 
              class="category-fill" 
              :style="{ width: `${(score / maxCategoryScore) * 100}%` }"
              :data-category="category"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 職業詳細情報 -->
    <div class="profession-details">
      <!-- コメント -->
      <div class="detail-section">
        <h4 class="detail-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
          適性コメント
        </h4>
        <p class="detail-content">
          {{ profession.comment || 'あなたの回答から分析した結果、この職業があなたの特性や価値観に適している可能性が高いことがわかりました。ぜひチャレンジを検討してみてください。' }}
        </p>
      </div>
      
      <!-- 年収情報 -->
      <div v-if="profession.annualIncome" class="detail-section">
        <h4 class="detail-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="1" x2="12" y2="23"/>
            <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
          </svg>
          年収目安
        </h4>
        <p class="income-value">{{ profession.annualIncome }}</p>
      </div>
      
      <!-- 仕事内容 -->
      <div v-if="profession.jobDetails" class="detail-section">
        <h4 class="detail-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
          業務内容
        </h4>
        <p class="detail-content">{{ profession.jobDetails }}</p>
      </div>
    </div>
    
    <!-- 詳細リンクボタン -->
    <router-link 
      :to="`/profession/${profession.id || profession.name.toLowerCase().replace(/\s+/g, '-')}`" 
      class="detail-link-button"
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

.profession-card {
  @include mixins.card-base;
  @include mixins.card-shadow(md);
  @include mixins.card-padding(xl);
  transition: all var(--transition-normal);
  position: relative;

  &.rank-1 {
    border-left: 4px solid var(--accent-gold);
    @include mixins.card-shadow(lg);
  }

  &.rank-2 {
    border-left: 4px solid #c0c0c0;
  }

  &.rank-3 {
    border-left: 4px solid #cd7f32;
  }
}

// カードヘッダー
.card-header {
  @include mixins.flex-between;
  margin-bottom: var(--space-lg);
}

.rank-section {
  @include mixins.flex-row(var(--space-md));
  align-items: center;
}

.rank-badge {
  @include mixins.flex-center;
  width: 40px;
  height: 40px;
  background: var(--accent-blue);
  color: white;
  border-radius: 50%;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 1.25rem;
}

.profession-card.rank-1 .rank-badge {
  background: var(--accent-gold);
}

.rank-label {
  @include mixins.flex-column;
}

.rank-title {
  font-size: var(--fs-small);
  color: var(--text-secondary);
  font-weight: 500;
}

// スコア円グラフ
.score-circle {
  position: relative;
  @include mixins.flex-center;
}

.score-text {
  position: absolute;
  @include mixins.flex-center;
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

/* 職業名 */
.profession-name {
  font-family: var(--font-heading);
  font-size: var(--fs-h2);
  color: var(--primary-navy);
  margin-bottom: var(--space-lg);
  font-weight: 600;
}

// カテゴリー分析
.category-analysis {
  margin-bottom: var(--space-lg);
}

.analysis-title {
  @include mixins.flex-row(var(--space-xs));
  font-size: 1.125rem;
  color: var(--primary-navy);
  margin-bottom: var(--space-md);
  font-weight: 600;
}

.category-grid {
  @include mixins.grid-columns(1);
  gap: var(--space-md);
}

.category-item {
  background: var(--bg-secondary);
  padding: var(--space-md);
  border-radius: 8px;
}

.category-header {
  @include mixins.flex-between;
  margin-bottom: var(--space-xs);
}

.category-name {
  font-size: var(--fs-small);
  color: var(--text-primary);
  font-weight: 500;
}

.category-score {
  font-family: var(--font-mono);
  font-size: var(--fs-small);
  color: var(--accent-blue);
  font-weight: 600;
}

.category-bar {
  height: 6px;
  background: var(--bg-tertiary);
  border-radius: 3px;
  overflow: hidden;
}

.category-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-blue), var(--accent-gold));
  border-radius: 3px;
  transition: width var(--transition-normal);
}

/* 職業詳細 */
.profession-details {
  margin-bottom: var(--space-lg);
}

.detail-section {
  margin-bottom: var(--space-md);
}

.detail-title {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: 1rem;
  color: var(--primary-navy);
  margin-bottom: var(--space-sm);
  font-weight: 600;
}

.detail-content {
  color: var(--text-primary);
  line-height: 1.7;
  margin: 0;
}

.income-value {
  font-family: var(--font-mono);
  font-size: 1.125rem;
  color: var(--accent-gold);
  font-weight: 600;
  margin: 0;
}

/* 詳細リンクボタン */
.detail-link-button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  color: var(--accent-blue);
  text-decoration: none;
  font-weight: 500;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--accent-blue);
  border-radius: 6px;
  transition: all var(--transition-fast);
}

.detail-link-button:hover {
  background: var(--accent-blue);
  color: white;
  transform: translateY(-1px);
}

// レスポンシブデザイン
@include mixins.respond-to('tablet') {
  .card-header {
    @include mixins.flex-column(var(--space-md));
    text-align: center;
  }

  .profession-card {
    @include mixins.card-padding(lg);
  }
}

@include mixins.respond-to('mobile') {
  .profession-card {
    @include mixins.card-padding(lg);
  }
}
</style>