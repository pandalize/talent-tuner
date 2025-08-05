<template>
  <div class="diagnosis-container" :class="{ 'has-progress': !showResult && questions.length > 0 }">
    <div class="diagnosis-content">
      <div v-if="loading" class="loading-section">
        <div class="loading-spinner"></div>
        <h3>{{ common.loading() }}</h3>
        <p>最適な質問をご用意しています...</p>
      </div>
      
      <!-- 診断リセットボタン（開発・テスト用） -->
      <div v-if="!loading && !error" class="reset-section">
        <button @click.prevent="handleResetDiagnosis" class="btn reset-button" type="button">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12a9 9 0 019-9 9.75 9.75 0 016.74 2.74L21 8"/>
            <path d="M21 3v5h-5"/>
            <path d="M21 12a9 9 0 01-9 9 9.75 9.75 0 01-6.74-2.74L3 16"/>
            <path d="M3 21v-5h5"/>
          </svg>
          診断をリセット
        </button>
      </div>
      
      <div v-else-if="error" class="error-section">
        <div class="error-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <h3>{{ common.error() }}</h3>
        <p>{{ error }}</p>
        <button @click="loadConfig" class="btn reload-button">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12a9 9 0 019-9 9.75 9.75 0 016.74 2.74L21 8"/>
            <path d="M21 3v5h-5"/>
            <path d="M21 12a9 9 0 01-9 9 9.75 9.75 0 01-6.74-2.74L3 16"/>
            <path d="M3 21v-5h5"/>
          </svg>
          {{ common.retry() }}
        </button>
      </div>
      
      <!-- メインコンテンツ（loading と error が false の時に表示） -->
      <div v-if="!loading && !error">
        <!-- 質問表示セクション -->
        <div v-if="!showResult && currentQuestion" class="current-question-section">
          <!-- ヘッダー情報 -->
          <div class="question-header">
            <div class="question-meta">
              <span class="question-number">{{ diagnosis.progress(currentQuestionIndex + 1, questions.length) }}</span>
              <span class="category-badge">{{ getCategoryName(currentQuestion.category) }}</span>
            </div>
            <h2 class="question-title">{{ currentQuestion.text }}</h2>
            <p class="question-subtitle">各項目について、あなたにどの程度当てはまるかを5段階で評価してください</p>
          </div>
          
          <div class="question-card">
            <div class="options-list">
              <div
                v-for="(option, index) in currentQuestion.options"
                :key="option.label"
                class="option-item"
              >
                <div class="option-content">
                  <div class="option-header">
                    <div class="option-label">{{ String.fromCharCode(65 + index) }}</div>
                    <div class="option-text">{{ option.text }}</div>
                  </div>
                  
                  <div class="rating-scale">
                    <div class="scale-labels">
                      <span class="scale-label-left">全く当てはまらない</span>
                      <span class="scale-label-right">よく当てはまる</span>
                    </div>
                    <div class="scale-buttons">
                      <button
                        v-for="rating in [1, 2, 3, 4, 5]"
                        :key="`${option.label}-${rating}`"
                        @click="selectOptionRating(currentQuestion.id, option.label, rating)"
                        :class="{ 
                          selected: getOptionRating(currentQuestion.id, option.label) === rating,
                          [`rating-${rating}`]: true
                        }"
                        class="rating-button"
                        :title="getRatingLabel(rating)"
                      >
                        {{ rating }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="navigation-buttons">
              <button
                @click="previousQuestion"
                :disabled="currentQuestionIndex === 0"
                class="btn btn-secondary"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
                {{ diagnosis.previous() }}
              </button>
              
              <button
                @click="nextQuestion"
                :disabled="!canProceed"
                class="btn btn-primary"
              >
                {{ isLastQuestion ? diagnosis.submit() : diagnosis.next() }}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <!-- 結果表示セクション -->
        <div v-else-if="showResult && results.length > 0" class="result-section">
          <div class="result-header">
            <h2 class="result-title">{{ diagnosis.result.title() }}</h2>
            <p class="result-subtitle">{{ diagnosis.result.subtitle() }}</p>
          </div>
          
          <div class="result-cards">
            <div 
              v-for="(result, index) in results" 
              :key="result.profession"
              class="result-card"
              :class="{ 'top-result': index === 0 }"
            >
              <div class="result-rank">{{ index + 1 }}</div>
              <div class="result-content">
                <h3 class="profession-name">{{ result.profession }}</h3>
                <div class="score-bar-container">
                  <div class="score-bar">
                    <div 
                      class="score-fill" 
                      :style="{ width: `${result.scorePercentage}%` }"
                    ></div>
                  </div>
                  <span class="score-text">{{ diagnosis.result.score() }}: {{ result.scorePercentage }}%</span>
                </div>
                
                <div class="profession-details">
                  <div v-if="result.professionData?.salary" class="detail-item">
                    <span class="detail-label">{{ diagnosis.result.salary() }}:</span>
                    <span class="detail-value">{{ result.professionData.salary }}</span>
                  </div>
                  <div v-if="result.professionData?.description" class="detail-item full-width">
                    <span class="detail-label">{{ diagnosis.result.description() }}:</span>
                    <p class="detail-value">{{ result.professionData.description }}</p>
                  </div>
                </div>
                
                <div class="result-actions">
                  <router-link 
                    :to="`/profession/${result.professionData?.id}`" 
                    class="btn btn-outline"
                    v-if="result.professionData?.id"
                  >
                    {{ diagnosis.result.actions.viewDetail() }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          
          <div class="result-footer">
            <button @click="resetDiagnosis" class="btn btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 12a9 9 0 019-9 9.75 9.75 0 016.74 2.74L21 8"/>
                <path d="M21 3v5h-5"/>
                <path d="M21 12a9 9 0 01-9 9 9.75 9.75 0 01-6.74-2.74L3 16"/>
                <path d="M3 21v-5h5"/>
              </svg>
              {{ diagnosis.result.actions.retry() }}
            </button>
            
            <router-link to="/chat" class="btn btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7A1,1 0 0,0 14,8H18A4,4 0 0,1 22,12V16A4,4 0 0,1 18,20H6A4,4 0 0,1 2,16V12A4,4 0 0,1 6,8H10A1,1 0 0,0 11,7V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A1.5,1.5 0 0,0 6,14.5A1.5,1.5 0 0,0 7.5,16A1.5,1.5 0 0,0 9,14.5A1.5,1.5 0 0,0 7.5,13M16.5,13A1.5,1.5 0 0,0 15,14.5A1.5,1.5 0 0,0 16.5,16A1.5,1.5 0 0,0 18,14.5A1.5,1.5 0 0,0 16.5,13Z" />
              </svg>
              {{ diagnosis.result.actions.aiConsultation() }}
            </router-link>
          </div>
        </div>
        
        <!-- 結果なしの場合 -->
        <div v-else-if="showResult && results.length === 0" class="no-result-section">
          <div class="no-result-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M8 15s1.5-2 4-2 4 2 4 2"/>
              <line x1="9" y1="9" x2="9.01" y2="9"/>
              <line x1="15" y1="9" x2="15.01" y2="9"/>
            </svg>
          </div>
          <h3>{{ diagnosis.noResults() }}</h3>
          <button @click="resetDiagnosis" class="btn btn-primary">
            {{ diagnosis.result.actions.retry() }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- 進捗バー -->
    <div v-if="!showResult && questions.length > 0 && !loading && !error" class="progress-container">
      <div class="progress-bar">
        <div 
          class="progress-fill" 
          :style="{ width: `${progressPercentage}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { loadDiagnosticConfig, loadProfessions, calculateDiagnosisResult, resetDiagnosisState } from '../utils/diagnosisLoader'
import type { DiagnosticConfig, DiagnosticQuestion, DiagnosisResult, ProfessionData } from '../utils/diagnosisLoader'
import { useTranslation } from '../composables/useTranslation'

// 翻訳ヘルパー
const { diagnosis, common } = useTranslation()

const router = useRouter()

// 型定義
interface OptionRating {
  label: string
  rating: number
}

interface QuestionAnswer {
  questionId: string
  selectedOptions: OptionRating[]
}

// データ管理
const config = ref<DiagnosticConfig | null>(null)
const questions = ref<DiagnosticQuestion[]>([])
const professions = ref<ProfessionData[]>([])
const currentQuestionIndex = ref(0)
const answers = ref<QuestionAnswer[]>([])
const results = ref<DiagnosisResult[]>([])
const showResult = ref(false)
const loading = ref(true)
const error = ref<string | null>(null)

// 計算プロパティ
const currentQuestion = computed(() => {
  return questions.value[currentQuestionIndex.value] || null
})

const progressPercentage = computed(() => {
  if (questions.value.length === 0) return 0
  return Math.round(((currentQuestionIndex.value + 1) / questions.value.length) * 100)
})

const isLastQuestion = computed(() => {
  return currentQuestionIndex.value === questions.value.length - 1
})

const canProceed = computed(() => {
  if (!currentQuestion.value) return false
  const currentAnswer = answers.value.find(a => a.questionId === currentQuestion.value.id)
  return currentAnswer && currentAnswer.selectedOptions.length === currentQuestion.value.options.length
})

// カテゴリ名を取得
const getCategoryName = (category: string): string => {
  switch (category) {
    case 'skill': return diagnosis.category.skill()
    case 'interest': return diagnosis.category.interest()
    case 'priority': return diagnosis.category.priority()
    case 'balance': return diagnosis.category.balance()
    default: return category
  }
}

// ヘルパー関数
const getQuestionCategoryName = (question: DiagnosticQuestion): string => {
  return getCategoryName(question.category)
}

const getRatingLabel = (rating: number): string => {
  const labels = ['全く当てはまらない', 'あまり当てはまらない', 'どちらとも言えない', 'やや当てはまる', 'よく当てはまる']
  return labels[rating - 1]
}

const getOptionRating = (questionId: string, optionLabel: string): number | null => {
  const answer = answers.value.find(a => a.questionId === questionId)
  if (!answer) return null
  const option = answer.selectedOptions.find(o => o.label === optionLabel)
  return option ? option.rating : null
}

// イベントハンドラ
const selectOptionRating = (questionId: string, optionLabel: string, rating: number) => {
  let answer = answers.value.find(a => a.questionId === questionId)
  
  if (!answer) {
    answer = {
      questionId,
      selectedOptions: []
    }
    answers.value.push(answer)
  }
  
  const existingOptionIndex = answer.selectedOptions.findIndex(o => o.label === optionLabel)
  
  if (existingOptionIndex >= 0) {
    answer.selectedOptions[existingOptionIndex].rating = rating
  } else {
    answer.selectedOptions.push({ label: optionLabel, rating })
  }
}

const nextQuestion = () => {
  if (!canProceed.value) return
  
  if (isLastQuestion.value) {
    calculateResults()
  } else {
    currentQuestionIndex.value++
  }
}

const previousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
  }
}

const calculateResults = async () => {
  if (!config.value) return
  
  const formattedAnswers = answers.value.map(answer => ({
    questionId: answer.questionId,
    selectedOptions: answer.selectedOptions.map(opt => ({
      label: opt.label,
      weight: opt.rating / 5 // 1-5のレーティングを0-1の重みに変換
    }))
  }))
  
  try {
    const diagnosisResults = await calculateDiagnosisResult(
      config.value,
      formattedAnswers,
      professions.value
    )
    results.value = diagnosisResults
    showResult.value = true
  } catch (err) {
    console.error('Failed to calculate results:', err)
    error.value = '結果の計算中にエラーが発生しました'
  }
}

const resetDiagnosis = () => {
  // 状態をリセット
  currentQuestionIndex.value = 0
  answers.value = []
  results.value = []
  showResult.value = false
  
  // ローカルストレージもクリア
  resetDiagnosisState()
}

const handleResetDiagnosis = () => {
  if (confirm('診断をリセットしますか？すべての回答がクリアされます。')) {
    resetDiagnosis()
  }
}

const loadConfig = async () => {
  loading.value = true
  error.value = null
  
  try {
    const [diagConfig, profData] = await Promise.all([
      loadDiagnosticConfig(),
      loadProfessions()
    ])
    
    config.value = diagConfig
    questions.value = diagConfig.questions
    professions.value = profData
    
    // エラーをクリア
    error.value = null
  } catch (err) {
    error.value = err instanceof Error ? err.message : '診断データの読み込みに失敗しました'
    console.error('Failed to load diagnostic config:', err)
  } finally {
    loading.value = false
  }
}

// 初期化
onMounted(() => {
  loadConfig()
})
</script>

<style scoped>
/* 既存のスタイルはそのまま維持（省略） */
/* QuestionNavigator.vueの全スタイルをここにコピー */
</style>