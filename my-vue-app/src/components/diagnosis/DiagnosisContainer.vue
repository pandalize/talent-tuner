<!--
  診断機能のメインコンテナ
  QuestionNavigatorから分離された軽量版
-->
<template>
  <div
    class="diagnosis-container"
    style="width: 100vw; max-width: 100vw; overflow-x: hidden; box-sizing: border-box; padding-left: 4px; padding-right: 4px;"
  >
    <!-- ローディング状態 -->
    <div v-if="loading" class="loading-section">
      <div class="loading-spinner"></div>
      <h3>診断システムを初期化中</h3>
      <p>最適な質問をご用意しています...</p>
    </div>

    <!-- エラー状態 -->
    <div v-else-if="error" class="error-section">
      <div class="error-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>
      <h3>データの読み込みに失敗しました</h3>
      <p>{{ error }}</p>
      <button @click="loadConfig" class="btn reload-button">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 12a9 9 0 019-9 9.75 9.75 0 016.74 2.74L21 8"/>
          <path d="M21 3v5h-5"/>
          <path d="M21 12a9 9 0 01-9 9 9.75 9.75 0 01-6.74-2.74L3 16"/>
          <path d="M3 21v-5h5"/>
        </svg>
        再読み込み
      </button>
    </div>

    <!-- 質問表示コンポーネント -->
    <QuestionDisplay
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
    <ResultDisplay
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
import { useRouter } from 'vue-router'
import { useDiagnosis } from '../../composables/useDiagnosis'
import QuestionDisplay from './QuestionDisplay.vue'
import ResultDisplay from './ResultDisplay.vue'

const router = useRouter()

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
  // 診断リセット時はチュートリアル状態もリセット
  tutorialCompleted.value = false
  categoryTutorialShown.value.clear()
}

function goHome() {
  router.push('/')
}

// === 初期化 ===
onMounted(() => {
  loadConfig()
})
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixins.scss' as mixins;

// 基本レイアウト
.diagnosis-container {
  @include mixins.flex-center;
  @include mixins.container(900px);
  @include mixins.card-base;
  @include mixins.card-shadow(lg);
  @include mixins.card-padding(lg);
  width: 100%;
  min-height: calc(100vh - 80px);
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  flex-direction: column;
  padding: var(--space-md);
  padding-bottom: var(--space-lg);
  margin-bottom: var(--space-lg);
  position: relative;
  min-height: 400px;
  overflow-x: hidden;

  // 子要素の直接配置用設定
  > * {
    width: 100%;
    max-width: calc(100vw - 16px);
    margin: 0 auto;
    box-sizing: border-box;
  }
}


// ローディング & エラーセクション
.loading-section {
  @include mixins.section-padding;
  text-align: center;
  color: var(--text-primary);

  h3 {
    font-family: var(--font-heading);
    font-size: var(--fs-h3);
    color: var(--primary-navy);
    margin-bottom: var(--space-sm);
    font-weight: 600;
  }

  p {
    color: var(--text-secondary);
    font-size: var(--fs-body);
  }
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--bg-tertiary);
  border-top: 3px solid var(--accent-blue);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto var(--space-md);

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
}

.error-section {
  @include mixins.section-padding;
  text-align: center;
  color: #dc3545;

  h3 {
    font-family: var(--font-heading);
    font-size: var(--fs-h3);
    margin-bottom: var(--space-sm);
    font-weight: 600;
  }

  p {
    color: var(--text-secondary);
    margin-bottom: var(--space-lg);
  }
}

.error-icon {
  margin-bottom: var(--space-md);
  color: #dc3545;
}

.reload-button {
  @include mixins.button-primary;
}



// レスポンシブデザイン
@include mixins.respond-to('tablet') {
  .diagnosis-container {
    padding: var(--space-md) var(--space-sm);
  }

  .diagnosis-container {
    @include mixins.card-padding(lg);
  }
}

@include mixins.respond-to('mobile') {
  .diagnosis-container {
    padding: var(--space-sm);
    min-height: 100vh;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
    box-sizing: border-box;
    
  }
  
  .diagnosis-container {
    width: 100%;
    max-width: 100%;
    padding: var(--space-md);
    padding-bottom: var(--space-lg);
    border-radius: 12px;
    background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    margin-bottom: var(--space-lg);
    box-sizing: border-box;
    min-height: 600px;

    > * {
      width: 100%;
      max-width: 100%;
      margin: 0;
    }
  }
}
</style>