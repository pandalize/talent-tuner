<!--
  質問表示コンポーネント
  5段階評価システムによる質問表示とナビゲーション
  スワイプ式2値回答モードをサポート
-->
<template>
  <div class="question-display tw-question-layout">
    <!-- 質問ヘッダー -->
    <div class="question-header tw-header">
      <!-- PC版のみヘッダー表示 -->
      <template v-if="!effectiveSwipeMode">
        <div class="question-meta tw-meta">
          <span class="question-number tw-number">
            質問 {{ questionIndex + 1 }} / {{ totalQuestions }}
          </span>
          <span class="category-badge tw-category">{{ getQuestionCategoryName(question) }}</span>
        </div>
        <h2 class="question-title tw-title">{{ question.text }}</h2>
        <p class="question-subtitle tw-subtitle">
          各項目について、あなたにどの程度当てはまるかを5段階で評価してください
        </p>
      </template>
      
    </div>
    
    <!-- PC版 & モバイル版共通: 質問カード -->
    <div class="question-card tw-card">
      <!-- モバイル版: チュートリアルスワイプカード（枠内最上部） 非表示化 -->
      
      <template v-if="shouldShowTutorial && effectiveSwipeMode">
        <div class="tutorial-card-container">
          <TutorialSwipeCard
            :main-question="question.text"
            :question-index="questionIndex"
            :total-questions="totalQuestions"
            :category-info="shouldShowCategoryTutorialDisplay ? currentCategoryInfo : null"
            @tutorial-completed="handleTutorialCompleted"
          />
        </div>
      </template>
      
      
      <!-- モバイル版: スワイプモードのカード（枠内最上部） -->
      <template v-if="shouldShowSwipeOption && effectiveSwipeMode">
        <div class="swipe-card-container">
          <SwipeAnswer
            :key="currentOption.label"
            :question-id="question.id"
            :option="currentOption"
            :current-rating="getLocalOptionRating(question.id, currentOption.label)"
            :current-index="currentOptionIndex"
            :total-count="question.options.length"
            @select-rating="handleSelectRating"
            @answer-completed="handleAnswerCompleted"
          />
        </div>
      </template>
      
      <div v-if="!effectiveSwipeMode" class="options-list tw-options">
        <!-- PC版: 5段階評価モード -->
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
              <div class="rating-scale tw-rating" style="display: flex; align-items: center; width: 100%; gap: 1.2rem;">
                <span class="scale-label-left tw-label-left">全く当てはまらない</span>
                <div class="scale-buttons tw-buttons" style="flex: 1; display: flex; justify-content: center; gap: 2%; max-width: 400px;">
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
                <span class="scale-label-right tw-label-right">よく当てはまる</span>
              </div>
            </div>
          </div>
      </div>
    </div>
    
    <!-- PC版: ナビゲーションボタン（質問カードの外に配置） -->
    <div v-if="!effectiveSwipeMode" class="question-navigation">
      <button
        v-if="questionIndex > 0"
        @click="emit('previous-question')"
        class="nav-button prev-button"
        type="button"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15,18 9,12 15,6"></polyline>
        </svg>
        前の質問
      </button>
      
      <div class="spacer"></div>
      
      <button
        @click="handleNextQuestion"
        class="nav-button next-button"
        :disabled="!isCurrentQuestionAnswered"
        type="button"
      >
        <template v-if="questionIndex < totalQuestions - 1">
          次の質問
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </template>
        <template v-else>
          結果を見る
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </template>
      </button>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBreakpoints } from '@vueuse/core'
import { useDiagnosis } from '../../composables/useDiagnosis'
import type { Question } from '../../utils/diagnosisLoader'
import SwipeAnswer from './SwipeAnswer.vue'
import TutorialSwipeCard from './TutorialSwipeCard.vue'

// Props
interface Props {
  question: Question
  questionIndex: number
  totalQuestions: number
  answers: Record<string, Record<string, number>>
  tutorialCompleted: boolean
  shouldShowCategoryTutorial: boolean
  currentCategoryInfo: {
    name: string
    description: string
    icon: string
  } | null
}

const props = defineProps<Props>()

// Emits
interface Emits {
  'select-rating': [questionId: string, optionLabel: string, rating: number]
  'next-question': []
  'previous-question': []
  'calculate-result': []
  'swipe-answer-completed': []
  'tutorial-completed': []
  'category-tutorial-completed': []
}

const emit = defineEmits<Emits>()

// Composable
const {
  getQuestionCategoryName,
  getRatingLabel,
  isCurrentQuestionCompleted
} = useDiagnosis()

// ブレークポイント設定
const breakpoints = useBreakpoints({
  mobile: 768,
})
const isMobile = breakpoints.smaller('mobile')

// リアクティブデータ
const currentOptionIndex = ref(0)

// 実際に使用するモード（自動切り替えのみ）
const effectiveSwipeMode = computed(() => {
  return isMobile.value
})

// 初回チュートリアル表示の判定（最初の質問でスワイプモードの場合）
const shouldShowInitialTutorial = computed(() => {
  return effectiveSwipeMode.value && props.questionIndex === 0 && currentOptionIndex.value === 0 && !props.tutorialCompleted
})

// カテゴリーチュートリアル表示の判定（4問ごとのカテゴリー紹介）
const shouldShowCategoryTutorialDisplay = computed(() => {
  return effectiveSwipeMode.value && props.shouldShowCategoryTutorial && currentOptionIndex.value === 0
})

// いずれかのチュートリアルを表示するか
const shouldShowTutorial = computed(() => {
  return shouldShowInitialTutorial.value || shouldShowCategoryTutorialDisplay.value
})

// チュートリアル完了後の質問表示判定（使用しない）
   const shouldShowQuestionAfterTutorial = computed(() => {
    return effectiveSwipeMode.value && props.questionIndex === 0 && currentOptionIndex.value === 0 && tutorialCompleted.value
  })

// スワイプモードでオプション表示すべきか判定
const shouldShowSwipeOption = computed(() => {
  // モバイル版でない場合はfalse
  if (!effectiveSwipeMode.value) return false
  
  // オプションが存在しない場合はfalse
  if (!currentOption.value) return false
  
  // チュートリアル表示中はfalse
   if (shouldShowTutorial.value) return false
  
  // 最初の質問の場合はチュートリアル完了後のみ
  if (props.questionIndex === 0) {
    return props.tutorialCompleted
  }
  
  // 2問目以降は常にスワイプモード
  return true
})

// 現在表示中のオプションを取得
const currentOption = computed(() => {
  return props.question.options[currentOptionIndex.value] || null
})

// PC版: 現在の質問がすべて回答済みかどうか
const isCurrentQuestionAnswered = computed(() => {
  if (!props.question) return false
  
  // すべてのオプションに回答があるかチェック
  return props.question.options.every(option => {
    const rating = getLocalOptionRating(props.question.id, option.label)
    return rating !== null && rating >= 1 && rating <= 5
  })
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

// PC版: 次の質問へ移動
function handleNextQuestion() {
  if (props.questionIndex < props.totalQuestions - 1) {
    emit('next-question')
  } else {
    // 最後の質問の場合は結果計算
    emit('calculate-result')
  }
}

// チュートリアル完了処理（即座回答開始）
function handleTutorialCompleted() {
  if (shouldShowInitialTutorial.value) {
    // 初回チュートリアル完了
    emit('tutorial-completed')
  } else if (shouldShowCategoryTutorialDisplay.value) {
    // カテゴリーチュートリアル完了
    emit('category-tutorial-completed')
  }
  // チュートリアル完了後、即座に最初のオプションで回答開始
  currentOptionIndex.value = 0
}

// スワイプ回答完了時の処理
function handleAnswerCompleted() {
  // 次のオプションに進む
  if (currentOptionIndex.value < props.question.options.length - 1) {
    // まだ回答していないオプションがある場合は次のオプションへ
    currentOptionIndex.value++
  } else {
    // すべてのオプションが完了したら次の質問へ
    emit('swipe-answer-completed')
    // 次の質問用にリセット
    currentOptionIndex.value = 0
    // tutorialCompletedは一度完了したら永続的に保持（リセットしない）
  }
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
// 横並び一列に
.rating-scale {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 1.2rem;
}

// ラベルは個別spanで横並び配置
.scale-labels {
  display: none;
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
    padding: var(--space-xs);
    box-sizing: border-box;
    position: relative;
  min-height: 70vh; // スワイプカードのための十分な高さを確保
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

// チュートリアルセクション
.tutorial-section {
  text-align: center;
  padding: var(--space-md) 0;
  
  .tutorial-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-lg);
  }
  
  .tutorial-title {
    font-family: var(--font-heading);
    font-size: var(--fs-h2);
    color: var(--primary-navy);
    font-weight: 600;
    margin: 0;
  }
  
  .tutorial-progress {
    font-size: var(--fs-small);
    color: var(--text-secondary);
    background: var(--bg-tertiary);
    padding: var(--space-xs) var(--space-sm);
    border-radius: 20px;
  }
}

.tutorial-content {
  .tutorial-main-text {
    font-size: var(--fs-h3);
    color: var(--text-primary);
    font-weight: 500;
    margin-bottom: var(--space-xl);
    line-height: 1.4;
  }
  
  .tutorial-instructions {
    background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);
    border-radius: 16px;
    padding: var(--space-lg);
    margin-bottom: var(--space-lg);
  }
  
  .tutorial-swipe-demo {
    margin-bottom: var(--space-md);
  }
  
  .swipe-demo-card {
    background: white;
    border-radius: 12px;
    padding: var(--space-lg) var(--space-md);
    margin: 0 auto;
    max-width: 280px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
  
  .swipe-arrows {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .swipe-left,
  .swipe-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-xs);
    
    span {
      font-size: 2rem;
      font-weight: bold;
    }
    
    small {
      font-size: var(--fs-small);
      color: var(--text-secondary);
    }
  }
  
  .swipe-left span {
    color: #ff6b6b;
  }
  
  .swipe-right span {
    color: #51cf66;
  }
  
  .tutorial-instruction-text {
    font-size: var(--fs-body);
    color: var(--text-primary);
    font-weight: 500;
    margin: 0;
  }
}

// チュートリアルカードコンテナ（枠内最上部に配置）
.tutorial-card-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  margin: 0;
  padding: var(--space-xs) 0;
}

// スワイプカードコンテナ（枠内最上部に配置）
.swipe-card-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  margin: 0;
  padding: var(--space-xs) 0;
}

// モバイル版チュートリアル最適化
@include mixins.respond-to('mobile') {
  .tutorial-section {
    padding: var(--space-sm) 0;
    
    .tutorial-header {
      margin-bottom: var(--space-md);
    }
    
    .tutorial-title {
      font-size: var(--fs-h3);
    }
  }
  
  .tutorial-content {
    .tutorial-main-text {
      font-size: var(--fs-h4);
      margin-bottom: var(--space-lg);
    }
    
    .tutorial-instructions {
      padding: var(--space-md);
      margin-bottom: var(--space-md);
    }
    
    .swipe-demo-card {
      max-width: 240px;
      padding: var(--space-md) var(--space-sm);
    }
    
    .swipe-arrows {
      span {
        font-size: 1.5rem;
      }
    }
    
    .tutorial-instruction-text {
      font-size: var(--fs-small);
    }
  }
}

// PC版ナビゲーションボタン
.question-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--space-xl);
  padding: var(--space-md) 0;
  width: 100%;
}

.nav-button {
  @include mixins.button-base;
  @include mixins.flex-center;
  gap: var(--space-xs);
  padding: var(--space-md) var(--space-lg);
  border-radius: 12px;
  font-weight: 600;
  font-size: var(--fs-body);
  transition: all var(--transition-fast);
  min-width: 140px;

  &.prev-button {
    background: var(--bg-secondary);
    color: var(--text-secondary);
    border: 2px solid var(--border-light);

    &:hover {
      background: var(--bg-tertiary);
      color: var(--text-primary);
      border-color: var(--accent-blue);
    }
  }

  &.next-button {
    @include mixins.button-primary;
    background: linear-gradient(135deg, var(--accent-blue), var(--primary-navy));
    
    &:hover:not(:disabled) {
      transform: translateY(-2px);
      @include mixins.card-shadow(md);
    }
    
    &:disabled {
      background: var(--bg-tertiary);
      color: var(--text-secondary);
      cursor: not-allowed;
      opacity: 0.6;
      transform: none;
      box-shadow: none;
      
      &:hover {
        transform: none;
        background: var(--bg-tertiary);
      }
    }
  }

  svg {
    flex-shrink: 0;
  }
}

.spacer {
  flex: 1;
}

// モバイル版ではナビゲーションを非表示（768px未満で非表示）
@media (max-width: 767px) {
  .question-navigation {
    display: none !important;
  }
}

// 中間画面のスタイルを削除（不要になったため）
</style>