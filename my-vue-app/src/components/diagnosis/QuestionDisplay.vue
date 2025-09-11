<!--
  質問表示コンポーネント
  5段階評価システムによる質問表示とナビゲーション
  スワイプ式2値回答モードをサポート
-->
<template>
  <div class="question-display tw-question-layout">
    <!-- 質問ヘッダー -->
    <div class="question-header tw-header">
      <div class="question-meta tw-meta">
        <span class="question-number tw-number">質問 {{ questionIndex + 1 }} / {{ totalQuestions }}</span>
        <span class="category-badge tw-category">{{ getQuestionCategoryName(question) }}</span>
      </div>
      <h2 class="question-title tw-title">{{ question.text }}</h2>
      <p class="question-subtitle tw-subtitle">
        <template v-if="isSwipeMode">
          各項目について、左右にスワイプして回答してください
        </template>
        <template v-else>
          各項目について、あなたにどの程度当てはまるかを5段階で評価してください
        </template>
      </p>
    </div>
    
    <!-- モード切り替えボタン -->
    <div class="mode-toggle">
      <button @click="toggleMode" class="mode-toggle-btn">
        <svg v-if="isSwipeMode" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 5h18v2H3V5zm0 4h18v2H3V9zm0 4h18v2H3v-2zm0 4h18v2H3v-2z"/>
        </svg>
        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 8l4 4 4-4M5 16l4-4 4 4M13 8l4 4 4-4M13 16l4-4 4 4"/>
        </svg>
        <span>{{ isSwipeMode ? '通常モードに切り替え' : 'スワイプモードに切り替え' }}</span>
      </button>
    </div>
    
    <!-- 質問カード -->
    <div class="question-card tw-card">
      <div class="options-list tw-options">
        <!-- スワイプモード -->
        <template v-if="isSwipeMode">
          <SwipeAnswer
            v-for="option in question.options"
            :key="option.label"
            :question-id="question.id"
            :option="option"
            :current-rating="getLocalOptionRating(question.id, option.label)"
            @select-rating="handleSelectRating"
          />
        </template>
        
        <!-- 通常モード（5段階評価） -->
        <template v-else>
          <div
            v-for="option in question.options"
            :key="option.label"
            class="option-item tw-option"
          >
            <div class="option-content">
              <div class="option-header tw-option-header">
                <div class="option-text tw-text">{{ option.text }}</div>
              </div>
              
              <!-- 5段階評価スケール -->
              <div class="rating-scale tw-rating">
                <div class="scale-labels tw-labels">
                  <span class="scale-label-left tw-label-left">全く当てはまらない</span>
                  <span class="scale-label-right tw-label-right">よく当てはまる</span>
                </div>
                <div class="scale-buttons tw-buttons">
                  <button
                    v-for="rating in [1, 2, 3, 4, 5]"
                    :key="`${option.label}-${rating}`"
                    @click.stop="handleSelectRating(question.id, option.label, rating)"
                    :class="{ 
                      'selected tw-selected': getLocalOptionRating(question.id, option.label) === rating,
                      [`rating-${rating} tw-rating-${rating}`]: true
                    }"
                    class="rating-button tw-rating-btn"
                    :title="getRatingLabel(rating)"
                    style="pointer-events: auto; position: relative; z-index: 10;"
                    type="button"
                  >
                    {{ rating }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDiagnosis } from '../../composables/useDiagnosis'
import type { Question } from '../../utils/diagnosisLoader'
import SwipeAnswer from './SwipeAnswer.vue'

// Props
interface Props {
  question: Question
  questionIndex: number
  totalQuestions: number
  answers: Record<string, Record<string, number>>
}

const props = defineProps<Props>()

// Emits
interface Emits {
  'select-rating': [questionId: string, optionLabel: string, rating: number]
  'next-question': []
  'previous-question': []
  'calculate-result': []
}

const emit = defineEmits<Emits>()

// Composable
const {
  getQuestionCategoryName,
  getRatingLabel
} = useDiagnosis()

// リアクティブデータ
const isSwipeMode = ref(false)

// モード切り替え
function toggleMode() {
  isSwipeMode.value = !isSwipeMode.value
  // モードを localStorage に保存
  localStorage.setItem('diagnosisMode', isSwipeMode.value ? 'swipe' : 'normal')
}

// 初期化時にモードを復元
if (typeof window !== 'undefined') {
  const savedMode = localStorage.getItem('diagnosisMode')
  isSwipeMode.value = savedMode === 'swipe'
}

// ローカル関数
function getLocalOptionRating(questionId: string, optionLabel: string): number | null {
  const questionAnswers = props.answers[questionId]
  if (!questionAnswers || typeof questionAnswers === 'string') return null
  
  const rating = questionAnswers[optionLabel]
  return (typeof rating === 'number' && rating >= 1 && rating <= 5) ? rating : null
}

// イベントハンドラー
function handleSelectRating(questionId: string, optionLabel: string, rating: number) {
  emit('select-rating', questionId, optionLabel, rating)
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixins.scss' as mixins;

.question-display {
  @include mixins.flex-column(var(--space-xl));
  margin-bottom: var(--space-md);
  position: relative;
}

// 質問ヘッダー部分
.question-header {
  text-align: center;
}

.question-meta {
  @include mixins.flex-center;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
}

.question-number {
  font-family: var(--font-mono);
  font-size: var(--fs-small);
  color: var(--text-secondary);
  background: var(--bg-tertiary);
  padding: var(--space-xs) var(--space-sm);
  border-radius: 20px;
}

.category-badge {
  font-size: var(--fs-small);
  color: var(--accent-blue);
  background: rgba(52, 152, 219, 0.1);
  padding: var(--space-xs) var(--space-sm);
  border-radius: 20px;
  font-weight: 500;
}

.question-title {
  font-family: var(--font-heading);
  font-size: var(--fs-h2);
  color: var(--primary-navy);
  margin-bottom: var(--space-sm);
  font-weight: 600;
  line-height: 1.4;
}

.question-subtitle {
  color: var(--text-secondary);
  font-size: var(--fs-body);
  margin-bottom: 0;
}

// モード切り替えボタン
.mode-toggle {
  display: flex;
  justify-content: center;
  margin: var(--space-lg) 0;
}

.mode-toggle-btn {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-lg);
  background: white;
  border: 2px solid var(--border-light);
  border-radius: 12px;
  font-size: var(--fs-small);
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
  
  &:hover {
    background: var(--bg-secondary);
    border-color: var(--accent-blue);
    color: var(--accent-blue);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
}

// 質問カード - 5段階評価形式
.question-card {
  @include mixins.container(900px);
  
  // スワイプモードの場合は幅を100%に
  .options-list:has(.swipe-answer-container) & {
    max-width: 100%;
  }
}

.options-list {
  @include mixins.flex-column(var(--space-lg));
  width: 100%;
}

.option-item {
  @include mixins.card-base;
  @include mixins.card-padding(lg);
  transition: all var(--transition-fast);

  &:hover {
    border-color: var(--accent-blue);
    @include mixins.card-shadow(sm);
  }
}

.option-content {
  @include mixins.flex-column(var(--space-md));
}

.option-header {
  @include mixins.flex-row(var(--space-md));
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: var(--space-sm) 0;
}

.option-text {
  flex: 1;
  min-width: 0;
  font-size: 1.125rem;
  color: var(--text-primary);
  line-height: 1.6;
  font-weight: 500;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

// 評価スケール
.rating-scale {
  @include mixins.flex-column(var(--space-sm));
}

.scale-labels {
  @include mixins.flex-between;
  font-size: var(--fs-small);
  color: var(--text-secondary);
  margin-bottom: var(--space-xs);
}

.scale-buttons {
  display: flex;
  justify-content: space-between;
  gap: 2%;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.rating-button {
  @include mixins.flex-center;
  flex: 1;
  aspect-ratio: 1;
  min-width: 0;
  max-width: 60px;
  border-radius: 50%;
  border: 2px solid var(--border-light);
  background: var(--bg-primary);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-weight: 600;
  font-size: clamp(0.75rem, 3vw, 1rem);
  pointer-events: auto;
  position: relative;
  z-index: 10;

  &:hover {
    border-color: var(--accent-blue);
    background: rgba(52, 152, 219, 0.1);
    transform: scale(1.1);
  }

  &.selected {
    border-color: var(--accent-blue);
    background: var(--accent-blue);
    color: white;
    transform: scale(1.15);
    @include mixins.card-shadow(md);
  }
}

// 評価値別の色分け
.rating-button {
  &.rating-1.selected {
    background: #e74c3c;
    border-color: #e74c3c;
  }

  &.rating-2.selected {
    background: #f39c12;
    border-color: #f39c12;
  }

  &.rating-3.selected {
    background: #95a5a6;
    border-color: #95a5a6;
  }

  &.rating-4.selected {
    background: #3498db;
    border-color: #3498db;
  }

  &.rating-5.selected {
    background: #27ae60;
    border-color: #27ae60;
  }
}

// レスポンシブデザイン
// デスクトップ（1024px以上）は元のレイアウト維持
@include mixins.respond-to('desktop') {
  .question-display {
    margin-bottom: 240px;
    padding-bottom: 0;
  }
  
  .option-header {
    @include mixins.flex-row(var(--space-md));
    align-items: flex-start;
    text-align: left;
    
    .option-label {
      margin-right: var(--space-md);
    }
  }
  
  .option-item {
    margin-bottom: var(--space-md);
  }
}

// タブレット（768px-1023px）
@media (min-width: 768px) and (max-width: 1023px) {
  .question-title {
    font-size: 1.5rem;
  }

  .options-list {
    gap: var(--space-md);
  }
  
  .option-item {
    @include mixins.card-padding(md);
  }
  
  .option-header {
    @include mixins.flex-column(var(--space-sm));
    text-align: center;
    
    .option-label {
      margin-right: 0;
      align-self: center;
    }
  }
  
  .scale-buttons {
    gap: 1.5%;
  }
  
  .rating-button {
    max-width: 55px;
    font-size: clamp(0.75rem, 2.8vw, 0.875rem);
  }
}

@include mixins.respond-to('mobile') {
  .question-display {
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
  }

  .question-meta {
    @include mixins.flex-column(var(--space-xs));
    margin-bottom: var(--space-md);
  }

  .question-header {
    text-align: center;
    padding: var(--space-md) var(--space-sm);
    width: 100%;
    box-sizing: border-box;
  }
  
  .question-title {
    font-size: 1.25rem;
    line-height: 1.3;
    margin-bottom: var(--space-sm);
    word-wrap: break-word;
    hyphens: auto;
  }
  
  .question-subtitle {
    font-size: 0.875rem;
    line-height: 1.5;
  }
  
  .question-card {
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  .options-list {
    gap: var(--space-md);
    width: 100%;
  }
  
  .option-item {
    @include mixins.card-padding(sm);
    border-radius: 12px;
    background: linear-gradient(135deg, var(--bg-primary), var(--bg-secondary));
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    margin: 0;
  }
  
  .option-header {
    margin-bottom: var(--space-sm);
    @include mixins.flex-row(var(--space-sm));
    align-items: flex-start;
    width: 100%;
  }
  
  .option-text {
    font-size: 0.9375rem;
    line-height: 1.5;
    margin-bottom: var(--space-md);
    word-wrap: break-word;
    hyphens: auto;
    flex: 1;
  }

  .scale-buttons {
    display: flex;
    justify-content: space-between;
    gap: 2%;
    width: 100%;
    padding: 0;
    flex-wrap: nowrap;
  }
  
  .rating-button {
    flex: 1 1 0;
    aspect-ratio: 1;
    min-width: 0;
    max-width: 50px;
    font-size: clamp(0.7rem, 2.5vw, 0.875rem);
    font-weight: 700;
    border-width: 2px;
    
    &:active {
      transform: scale(0.9);
    }
    
    &.selected {
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
    }
  }
  
  .option-label {
    width: 28px;
    height: 28px;
    font-size: 0.75rem;
    font-weight: 700;
    flex-shrink: 0;
  }
  
  .scale-labels {
    font-size: 0.75rem;
    font-weight: 500;
    margin-bottom: var(--space-sm);
    padding: 0;
    
    .scale-label-left,
    .scale-label-right {
      padding: 2px 4px;
      background: rgba(59, 130, 246, 0.05);
      border-radius: 4px;
      border: 1px solid rgba(59, 130, 246, 0.1);
      font-size: 0.625rem;
      text-align: center;
      max-width: 40%;
      word-wrap: break-word;
      line-height: 1.2;
    }
  }
}

// タッチデバイス最適化
@media (hover: none) and (pointer: coarse) {
  .rating-button {
    &:hover {
      transform: none;
      border-color: var(--border-light);
      background: var(--bg-primary);
    }

    &:active {
      transform: scale(0.95);
    }
    
    &.selected:active {
      transform: scale(1.1);
    }
  }
}
</style>