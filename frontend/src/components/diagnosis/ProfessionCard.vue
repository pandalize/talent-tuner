<template>
  <div 
    class="tw-profession-card" 
    :class="`rank-${rank}`"
  >
    <div class="tw-rank-section">
      <div class="tw-rank-badge" :class="rank === 1 ? 'bg-yellow-500' : 'bg-blue-600'">{{ rank }}位</div>
      <h3>{{ profession.name }}</h3>
    </div>
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
        <p class="score-value">{{ profession.score.toFixed(0) }}</p>
        <p class="score-unit">点</p>
      </div>
    </div>
    
    <div class="tw-category-analysis">
      <h4>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
        </svg>
        適性分析
      </h4>
      <div
        v-for="(score, category) in profession.categories"
        :key="category"
        class="tw-category-item"
      >
        <div class="tw-category-header">
          <p class="tw-category-name">{{ getCategoryName(category) }}</p>
          <p class="tw-category-score">{{ score.toFixed(1) }}pt</p>
        </div>
        <div class="tw-category-bar" >
          <div 
            class="tw-category-fill" 
            :data-category="category"
            :style="{ width: `${Math.round((score / maxCategoryScore) * 100)}%` }"
          ></div>
        </div>
      </div>
    </div>

    <div class="tw-profession-details">
      <div v-if="profession.comment" class="tw-detail-section">
        <h4>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
          適性コメント
        </h4>
        <p class="tw-detail-content">{{ profession.comment }}</p>
      </div>
      
      <div v-if="profession.annualIncome" class="tw-detail-section">
        <h4>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="1" x2="12" y2="23"/>
            <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
          </svg>
          年収目安
        </h4>
        <p class="tw-income-value">{{ profession.annualIncome }}</p>
      </div>
      
      <div v-if="profession.jobDetails" class="tw-detail-section">
        <h4>
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
    
    <BaseButton
      variant="blue"
      size="md"
      @click="$router.push(link)"
    >
      この職業の詳細を見る
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import type { ProfessionScore } from '../../utils/diagnosisLoader'
import { useDiagnosis } from '../../composables/useDiagnosis'
import { professionDataManager } from '@/utils/professionDataManager'
import BaseButton from '@/components/BaseButton.vue'


// Props
interface Props {
  profession: ProfessionScore
  rank: number
  maxCategoryScore: number
}

const props = defineProps<Props>()

const profession = toRef(props, 'profession')
const rank = toRef(props, 'rank')
const maxCategoryScore = toRef(props, 'maxCategoryScore')
const remoteProfession = professionDataManager.getProfessionByName(profession.value?.name ?? '')
function getProfessionLinkId(remoteProfession: any, profession: ProfessionScore | undefined): string {
  if (remoteProfession && remoteProfession.id) {
    return String(remoteProfession.id)
  } else if (profession?.id) {
    return String(profession.id)
  } else {
    const fallback = String((profession?.name ?? '')
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]/g, ''))
    return fallback || 'unknown-profession'
  }
}
const idOrSlug = getProfessionLinkId(remoteProfession, profession.value)
const link = `/profession/${encodeURIComponent(idOrSlug)}`

const { getCategoryName } = useDiagnosis()
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixins.scss' as mixins;

.tw-profession-card {
  width: 100%;
  max-width:100vw;
  overflow-x: hidden;
  box-sizing: border-box;
  margin-left: 0;
  margin-right: 0;
  padding: 1rem 1.5rem;
}

.tw-rank-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.tw-rank-badge {
  margin: var(--space-sm) 0;
  border-radius: 15px;
  width: 50px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
}

.rank-1 .tw-rank-badge {
  background: linear-gradient(135deg, #ffd700, #ffed4e)
}

.rank-2 .tw-rank-badge {
  background: linear-gradient(135deg, #c0c0c0, #e5e5e5)
}

.rank-3 .tw-rank-badge {
  background: linear-gradient(135deg, #e9a660, #f4bc7a)
}

h3 {
  margin: 0;
  display: inline-block;
  font-weight: 700;
}

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

.tw-category-analysis {
  width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
}

h4 {
  margin: var(--space-md) 0 var(--space-sm) 0;
  font-weight: 700;
}

.tw-category-item {
  width: 95%;
  max-width: 95%;
  min-width: 0;
  box-sizing: border-box;
  overflow-x: hidden;
  margin: 0 auto 1.5rem auto;
}

.tw-category-header{
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  flex-wrap: wrap; 
  gap: 8px; 
  margin-bottom: 8px;
}

.tw-category-name{
  font-size: 14px; 
  font-weight: 500; 
  color: #374151; 
  min-width: 0; 
  flex: 1; 
  word-wrap: break-word;
}

.tw-category-score{
  font-size: 14px; 
  color: #000000; 
  font-family: Noto Sans JP; 
  flex-shrink: 0;
}

.tw-category-bar {
  height: 8px; 
  background: #e5e7eb; 
  border-radius: 4px; 
  overflow: hidden; 
  width: 95%; 
  max-width: 95%;
}

.tw-category-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #eab308);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.tw-profession-details {
  width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
}

.tw-detail-section {
  margin-bottom: 16px;
}

.tw-detail-content {
  word-wrap: break-word;
  overflow-wrap: break-word;
  line-height: 1.6;
  color: #374151;
  margin: 0 0 var(--space-sm) 0;
}

.tw-income-value {
  font-weight: 600;
  color: #eab308;
  font-family: monospace;
  margin: 0;
}
</style>