<!--
  質問表示コンポーネント
  5段階評価システムによる質問表示とナビゲーション
-->
<template>
  <div class="question-display">
    <!-- 質問ヘッダー -->
    <div class="question-header">
      <div class="question-meta">
        <span class="question-number">質問 {{ questionIndex + 1 }} / {{ totalQuestions }}</span>
        <span class="category-badge">{{ getQuestionCategoryName(question) }}</span>
      </div>
      <h2 class="question-title">{{ question.text }}</h2>
      <p class="question-subtitle">各項目について、あなたにどの程度当てはまるかを5段階で評価してください</p>
    </div>
    
    <!-- 質問カード -->
    <div class="question-card">
      <div class="options-list">
        <div
          v-for="(option, index) in question.options"
          :key="option.label"
          class="option-item"
        >
          <div class="option-content">
            <div class="option-header">
              <div class="option-label">{{ String.fromCharCode(65 + index) }}</div>
              <div class="option-text">{{ option.text }}</div>
            </div>
            
            <!-- 5段階評価スケール -->
            <div class="rating-scale">
              <div class="scale-labels">
                <span class="scale-label-left">全く当てはまらない</span>
                <span class="scale-label-right">よく当てはまる</span>
              </div>
              <div class="scale-buttons">
                <button
                  v-for="rating in [1, 2, 3, 4, 5]"
                  :key="`${option.label}-${rating}`"
                  @click.stop="handleSelectRating(question.id, option.label, rating)"
                  :class="{ 
                    selected: getLocalOptionRating(question.id, option.label) === rating,
                    [`rating-${rating}`]: true
                  }"
                  class="rating-button"
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
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDiagnosis } from '../../composables/useDiagnosis'
import type { Question } from '../../utils/diagnosisLoader'
import QuestionNavigation from './QuestionNavigation.vue'

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

// 計算プロパティ
const isCurrentQuestionCompletedLocal = computed(() => {
  const questionId = props.question.id
  const answer = props.answers[questionId]
  
  if (!answer || typeof answer !== 'object') return false
  
  const answerObj = answer as Record<string, number>
  return props.question.options.every(option => {
    const rating = answerObj[option.label]
    return rating >= 1 && rating <= 5
  })
})

const isAllQuestionsAnsweredLocal = computed(() => {
  // この計算は親コンポーネントで行う方が適切だが、
  // 簡略化のためここで実装
  return Object.keys(props.answers).length >= props.totalQuestions
})

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

// 質問カード - 5段階評価形式
.question-card {
  @include mixins.container(900px);
}

.options-list {
  @include mixins.flex-column(var(--space-lg));
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
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
}

.option-label {
  @include mixins.flex-center;
  width: 32px;
  height: 32px;
  background: var(--accent-blue);
  color: white;
  border-radius: 50%;
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 0.875rem;
  flex-shrink: 0;
  margin-right: var(--space-md);
}

.option-text {
  flex: 1;
  min-width: 0;
  font-size: var(--fs-body);
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