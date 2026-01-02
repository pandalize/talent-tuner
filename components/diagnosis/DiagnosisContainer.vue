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
      :question="currentQuestion"
      :questionIndex="currentQuestionIndex"
      :totalQuestions="questions.length"
      :answers="answers"
      :tutorial-completed="tutorialCompleted"
      :should-show-category-tutorial="shouldShowCategoryTutorial"
      :current-category-info="currentCategoryInfo"
      @select-rating="handleSelectRating"
      @next-question="goToNextQuestion"
      @previous-question="goToPreviousQuestion"
      @calculate-result="calculateResult"
      @swipe-answer-completed="handleSwipeAnswerCompleted"
      @tutorial-completed="handleTutorialCompleted"
      @category-tutorial-completed="handleCategoryTutorialCompleted"
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
import { onMounted, ref, computed } from 'vue'
import { navigateTo } from '#app'
import { useDiagnosis } from '~/composables/useDiagnosis'


// チュートリアル状態管理（DiagnosisContainerで管理）
const tutorialCompleted = ref(false)
// カテゴリーチュートリアル管理（4問ごとに表示）
const categoryTutorialShown = ref(new Set<number>())

// 診断状態管理
const {
  // 状態
  loading,
  error,
  showResult,
  questions,
  currentQuestion,
  currentQuestionIndex,
  answers,
  displayedProfessions,
  maxCategoryScore,
  
  // 関数
  loadConfig,
  selectOptionRating,
  goToNextQuestion,
  goToPreviousQuestion,
  calculateResult,
  resetDiagnosis,
  
  // 計算プロパティ
  isAllQuestionsAnswered
} = useDiagnosis()

// カテゴリー情報マッピング（質問1-4で各カテゴリーを紹介）
const categoryMap = {
  0: { name: "興味・関心", description: "あなたの興味や関心について質問します", icon: "💭" },
  1: { name: "スキル・得意分野", description: "あなたのスキルや得意分野について質問します", icon: "🛠️" },
  2: { name: "価値観・優先度", description: "あなたの価値観や優先度について質問します", icon: "⭐" },
  3: { name: "ワークライフバランス", description: "働き方やライフスタイルについて質問します", icon: "⚖️" },
  4: { name: "スキル・得意分野", description: "あなたのスキルや得意分野について質問します", icon: "🛠️" },
  8: { name: "価値観・優先度", description: "あなたの価値観や優先度について質問します", icon: "⭐" },
  12: { name: "ワークライフバランス", description: "働き方やライフスタイルについて質問します", icon: "⚖️" }
}

// 現在の質問でカテゴリーチュートリアルを表示すべきかの判定
const shouldShowCategoryTutorial = computed(() => {
  if (!currentQuestion.value) return false
  
  const questionIndex = currentQuestionIndex.value
  const isCategoryStart = questionIndex % 4 === 0
  const isNotInitialTutorial = questionIndex > 0
  const notShownYet = !categoryTutorialShown.value.has(questionIndex)
  
  // 質問2-4では各質問でチュートリアル、5問目以降は4問ごと
  const isFirstFourQuestions = questionIndex >= 1 && questionIndex <= 3
  
  return (isCategoryStart || isFirstFourQuestions) && isNotInitialTutorial && notShownYet
})

// 現在のカテゴリー情報
const currentCategoryInfo = computed(() => {
  const questionIndex = currentQuestionIndex.value
  return categoryMap[questionIndex as keyof typeof categoryMap] || null
})

// === イベントハンドラー ===
function handleSelectRating(questionId: string, optionLabel: string, rating: number) {
  selectOptionRating(questionId, optionLabel, rating)
}

function handleSwipeAnswerCompleted() {
  // すべての質問が完了したかチェック
  if (isAllQuestionsAnswered()) {
    // 結果計算へ
    calculateResult()
  } else {
    // 次の質問へ
    goToNextQuestion()
  }
}

function handleTutorialCompleted() {
  tutorialCompleted.value = true
}

function handleCategoryTutorialCompleted() {
  categoryTutorialShown.value.add(currentQuestionIndex.value)
}

function handleResetDiagnosis() {
  resetDiagnosis()
  tutorialCompleted.value = false
  categoryTutorialShown.value.clear()
}

function goHome() {
  navigateTo('/')
}

// === 初期化 ===
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
