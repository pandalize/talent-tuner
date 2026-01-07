<template>
  <div class="question-display">
    <DiagnosisTutorialSwipeCard
      v-if="shouldShowTutorial"
      :main-question="question.text"
      :question-index="questionIndex"
      :total-count="totalQuestions"
      :category-info="null"
      @tutorial-completed="handleTutorialCompleted"
    />

    <DiagnosisSwipeAnswer
      v-else-if="shouldShowSwipeQuestion"
      :key="question.id"
      :question-id="question.id"
      :question-text="question.text"
      :current-rating="getLocalQuestionRating(question.id)"
      :current-index="questionIndex"
      :total-count="totalQuestions"
      @select-rating="handleSelectRating"
      @answer-completed="handleAnswerCompleted"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Question } from '~/utils/diagnosisLoader'

interface Props {
  question: Question
  questionIndex: number
  totalQuestions: number
  answers: Record<string, number>
  tutorialCompleted: boolean
}

const props = defineProps<Props>()
const { question, questionIndex, totalQuestions } = props

interface Emits {
  'select-rating': [questionId: string, rating: number]
  'swipe-answer-completed': []
  'tutorial-completed': []
}

const emit = defineEmits<Emits>()

const shouldShowTutorial = computed(() => {
  return props.questionIndex === 0 && !props.tutorialCompleted
})

const shouldShowSwipeQuestion = computed(() => {
  if (shouldShowTutorial.value) return false
  if (props.questionIndex === 0) return props.tutorialCompleted
  return true
})

function getLocalQuestionRating(questionId: string): number | null {
  const rating = props.answers[questionId]
  return (typeof rating === 'number' && rating >= 1 && rating <= 5) ? rating : null
}

function handleSelectRating(questionId: string, rating: number) {
  emit('select-rating', questionId, rating)
}

function handleTutorialCompleted() {
  emit('tutorial-completed')
}

function handleAnswerCompleted() {
  emit('swipe-answer-completed')
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
