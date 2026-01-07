<template>
  <div class="diagnosis-container">
    <!-- ローディング状態 -->
    <div v-if="loading" class="loading-section">
      <p>読み込み中</p>
    </div>

    <!-- エラー状態 -->
    <div v-else-if="error" class="error-section">
      <h3>データの読み込みに失敗しました</h3>
      <p>{{ error }}</p>
      <button @click="loadConfig" class="btn reload-button">
        再読み込み
      </button>
    </div>

    <!-- 質問表示コンポーネント -->
    <DiagnosisQuestionDisplay
      v-if="!loading && !error && !showResult && currentQuestion"
      :key="currentQuestion.id"
      :question="currentQuestion"
      :questionIndex="currentQuestionIndex"
      :totalQuestions="questions.length"
      :answers="answers"
      :tutorial-completed="tutorialCompleted"
      @select-rating="handleSelectRating"
      @next-question="goToNextQuestion"
      @calculate-result="calculateResult"
      @swipe-answer-completed="handleSwipeAnswerCompleted"
      @tutorial-completed="handleTutorialCompleted"
    />


    <!-- 結果表示コンポーネント -->
    <DiagnosisResultDisplay
      v-if="!loading && !error && showResult"
      :professions="displayedProfessions"
      :maxCategoryScore="maxCategoryScore"
      :totalQuestions="questions.length"
      @reset-diagnosis="handleResetDiagnosis"
      @go-home="goHome"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { navigateTo } from '#app'
import { useDiagnosis } from '~/composables/useDiagnosis'

const tutorialCompleted = ref(false)

const {
  loading,
  error,
  showResult,
  questions,
  currentQuestion,
  currentQuestionIndex,
  answers,
  displayedProfessions,
  maxCategoryScore,

  loadConfig,
  selectQuestionRating,
  goToNextQuestion,
  calculateResult,
  resetDiagnosis,

  isAllQuestionsAnswered
} = useDiagnosis()

function handleSelectRating(questionId: string, rating: number) {
  selectQuestionRating(questionId, rating)
}

function handleSwipeAnswerCompleted() {
  if (isAllQuestionsAnswered()) calculateResult()
  else goToNextQuestion()
}

function handleTutorialCompleted() {
  tutorialCompleted.value = true
}

function handleResetDiagnosis() {
  resetDiagnosis()
  tutorialCompleted.value = false
}

function goHome() {
  navigateTo('/')
}

onMounted(() => {
  loadConfig()
})
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixins.scss' as mixins;

.diagnosis-container {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0;
  flex-direction: column;
  overflow-x: hidden;
  position: relative;
  border: none;
  box-sizing: border-box;
  min-height: 150vh;
}

.loading-section {
  @include mixins.section-padding;
  text-align: center;
}

p {
  color: var(--text-secondary);
  font-size: var(--fs-body);
}


.error-section {
  @include mixins.section-padding;
  text-align: center;
  color: #dc3545;
}

h3 {
  font-family: var(--font-heading);
  font-size: var(--fs-h3);
  margin-bottom: var(--space-sm);
  font-weight: 600;
}

.reload-button {
  @include mixins.button-primary;
}

@media (max-width: 480px) {
  .diagnosis-container {
    padding: var(--space-sm);
  }
}
</style>
