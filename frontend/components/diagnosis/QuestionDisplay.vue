<template>
  <div class="question-display">
    <TutorialSwipeCard
      v-if="shouldShowTutorial"
      :main-question="question.text"
      :question-index="questionIndex"
      :total-questions="totalQuestions"
      :category-info="shouldShowCategoryTutorialDisplay ? currentCategoryInfo : null"
      @tutorial-completed="handleTutorialCompleted"
    />
  
    <SwipeAnswer
      v-else-if="shouldShowSwipeOption"
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

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Question } from '~/utils/diagnosisLoader'

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


const currentOptionIndex = ref(0)

// 初回説明カード表示用
const showExplainSwipeCard = ref(false)

// 初回チュートリアル表示の判定（最初の質問でスワイプモードの場合）
const shouldShowInitialTutorial = computed(() => {
  return /** effectiveSwipeMode.value && */ props.questionIndex === 0 && currentOptionIndex.value === 0 && !props.tutorialCompleted
})

// 初回のみ説明カードを表示
if (typeof window !== 'undefined') {
  const w = window as Window & { __explain_swipe_card_shown?: boolean };
  if (shouldShowInitialTutorial.value && !w.__explain_swipe_card_shown) {
    showExplainSwipeCard.value = true
    w.__explain_swipe_card_shown = true
  }
}

// カテゴリーチュートリアル表示の判定（4問ごとのカテゴリー紹介）
const shouldShowCategoryTutorialDisplay = computed(() => {
  return /** effectiveSwipeMode.value && */props.shouldShowCategoryTutorial && currentOptionIndex.value === 0
})

// いずれかのチュートリアルを表示するか
const shouldShowTutorial = computed(() => {
  return shouldShowInitialTutorial.value || shouldShowCategoryTutorialDisplay.value
})

// スワイプモードでオプション表示すべきか判定
const shouldShowSwipeOption = computed(() => {
  // モバイル版でない場合はfalse
  // if (!effectiveSwipeMode.value) return false
  
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
.question-display {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  margin: 0;
  padding: 0;
}
</style>
