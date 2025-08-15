<!--
  診断機能のメインコンテナ
  QuestionNavigatorから分離された軽量版
-->
<template>
  <div class="diagnosis-container" :class="{ 
    'has-progress': !showResult && questions.length > 0,
    'has-question': !showResult && currentQuestion 
  }">
    <div class="diagnosis-content">
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
      
      <!-- メインコンテンツ -->
      <div v-if="!loading && !error">
        
        <!-- 質問表示コンポーネント -->
        <QuestionDisplay 
          v-if="!showResult && currentQuestion" 
          :question="currentQuestion"
          :questionIndex="currentQuestionIndex"
          :totalQuestions="questions.length"
          :answers="answers"
          @select-rating="handleSelectRating"
          @next-question="goToNextQuestion"
          @previous-question="goToPreviousQuestion"
          @calculate-result="calculateResult"
        />
        
        <!-- 結果表示コンポーネント -->
        <ResultDisplay 
          v-if="showResult"
          :professions="displayedProfessions"
          :maxCategoryScore="maxCategoryScore"
          :totalQuestions="questions.length"
          @reset-diagnosis="handleResetDiagnosis"
          @go-home="goHome"
        />
      </div>
    </div>
    
    <!-- プログレス表示（質問中のみ） -->
    <ProgressIndicator 
      v-if="!showResult && questions.length > 0"
      :answeredCount="getAnsweredQuestionsCount()"
      :totalCount="questions.length"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDiagnosis } from '../../composables/useDiagnosis'
import QuestionDisplay from './QuestionDisplay.vue'
import ResultDisplay from './ResultDisplay.vue'  
import ProgressIndicator from './ProgressIndicator.vue'

const router = useRouter()

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
  getAnsweredQuestionsCount,
  goToNextQuestion,
  goToPreviousQuestion,
  calculateResult,
  resetDiagnosis
} = useDiagnosis()

// === イベントハンドラー ===
function handleSelectRating(questionId: string, optionLabel: string, rating: number) {
  selectOptionRating(questionId, optionLabel, rating)
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
  width: 100%;
  min-height: calc(100vh - 80px);
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  flex-direction: column;
  padding: var(--space-md);
  overflow-x: hidden;
}

.diagnosis-content {
  @include mixins.container(900px);
  @include mixins.card-base;
  @include mixins.card-shadow(lg);
  @include mixins.card-padding(lg);
  margin-bottom: var(--space-lg);
  position: relative;
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


// プログレスバーが表示される時のみ下部パディングを追加
.diagnosis-container.has-progress {
  padding-bottom: 120px;
  
  // モバイルでは固定ナビゲーション分のスペースを追加確保
  @media (max-width: 768px) {
    padding-bottom: 180px;
  }
}

// レスポンシブデザイン
@include mixins.respond-to('tablet') {
  .diagnosis-container {
    padding: var(--space-md) var(--space-sm);
  }

  .diagnosis-content {
    @include mixins.card-padding(lg);
  }
}

@include mixins.respond-to('mobile') {
  .diagnosis-container {
    padding: var(--space-md) var(--space-md) 140px var(--space-md);
    min-height: 100vh;
    
    // QuestionDisplayが表示される時は、固定ナビゲーション分のスペースを確保
    &.has-question {
      padding-bottom: 180px;
    }
  }
  
  .diagnosis-content {
    width: 100%;
    padding: var(--space-lg);
    border-radius: 16px;
    background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    margin-bottom: var(--space-xl);
  }
}
</style>