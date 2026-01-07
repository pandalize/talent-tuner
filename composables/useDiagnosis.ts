import { ref, computed, nextTick } from 'vue'
import {
  loadDiagnosticConfig,
  loadProfessionDatabase,
  calculateProfessionScores,
  getTopProfessions,
  type DiagnosticConfig,
  type Question,
  type ProfessionScore,
  type ProfessionDatabase
} from '~/utils/diagnosisLoader'

// localStorage キー
const STORAGE_KEYS = {
  ANSWERS: 'diagnosis_answers',
  SHOW_RESULT: 'diagnosis_show_result',
  TOP_PROFESSIONS: 'diagnosis_top_professions',
  CURRENT_QUESTION_INDEX: 'diagnosis_current_question_index'
} as const

// localStorage ヘルパー関数
function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : defaultValue
  } catch {
    return defaultValue
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.warn('localStorage への保存に失敗:', error)
  }
}

// 診断状態の型定義
export interface DiagnosisState {
  config: DiagnosticConfig | null
  professionDatabase: ProfessionDatabase | null
  answers: Record<string, number>
  showResult: boolean
  topProfessions: ProfessionScore[]
  currentQuestionIndex: number
  loading: boolean
  error: string | null
}

// 診断機能のComposable
export function useDiagnosis() {
  // === 基本状態 ===
  const config = ref<DiagnosticConfig | null>(null)
  const professionDatabase = ref<ProfessionDatabase | null>(null)
  const hasSavedState = loadFromStorage(STORAGE_KEYS.ANSWERS, null) !== null || loadFromStorage(STORAGE_KEYS.SHOW_RESULT, false)
  const loading = ref(!hasSavedState)
  const error = ref<string | null>(null)

  // === 診断状態 ===
  const answers = ref<Record<string, number>>(loadFromStorage(STORAGE_KEYS.ANSWERS, {}))
  const showResult = ref(loadFromStorage(STORAGE_KEYS.SHOW_RESULT, false))
  const topProfessions = ref<ProfessionScore[]>(loadFromStorage(STORAGE_KEYS.TOP_PROFESSIONS, []))
  const currentQuestionIndex = ref(loadFromStorage(STORAGE_KEYS.CURRENT_QUESTION_INDEX, 0))

  // === 計算プロパティ ===
  const questions = computed<Question[]>(() => {
    return config.value?.questions || []
  })

  const currentQuestion = computed<Question | null>(() => {
    if (questions.value.length === 0) return null
    return questions.value[currentQuestionIndex.value] || null
  })

  const DISPLAY_TOP_N = 3
  const displayedProfessions = computed(() => {
    return getTopProfessions(topProfessions.value, DISPLAY_TOP_N)
  })

  const maxCategoryScore = computed(() => {
    if (displayedProfessions.value.length === 0) return 1

    let maxScore = 0
    displayedProfessions.value.forEach(profession => {
      Object.values(profession.categories).forEach(score => {
        if (score > maxScore) maxScore = score
      })
    })
    return maxScore || 1
  })

  // === データ読み込み ===
  let isLoadingConfig = false

  async function loadConfig() {
    if (isLoadingConfig) return

    try {
      isLoadingConfig = true
      loading.value = true
      error.value = null

      const [configData, professionData] = await Promise.all([
        loadDiagnosticConfig(),
        loadProfessionDatabase()
      ])

      config.value = configData
      professionDatabase.value = professionData

      loading.value = false
    } catch (err) {
      console.error('設定の読み込みに失敗しました:', err)

      if (hasSavedState) {
        error.value = 'データの読み込みに失敗しましたが、保存された診断データは利用できます。'
        loading.value = false

        if (!config.value) {
          config.value = {
            category_weights: { skill: 1.0, interest: 1.0, priority: 1.0, balance: 1.0 },
            threshold: { recommend_top_n: 3 },
            questions: []
          }
        }
      } else {
        error.value = '診断データの読み込みに失敗しました。インターネット接続を確認してください。'
        loading.value = false
      }
    } finally {
      isLoadingConfig = false
    }
  }

  // === 回答管理 ===
  function selectQuestionRating(questionId: string, rating: number) {
    answers.value[questionId] = rating
    saveToStorage(STORAGE_KEYS.ANSWERS, answers.value)
  }

  function getQuestionRating(questionId: string): number | null {
    const rating = answers.value[questionId]
    return (typeof rating === 'number' && rating >= 1 && rating <= 5) ? rating : null
  }

  // === 進捗管理 ===
  function getAnsweredQuestionsCount(): number {
    return questions.value.filter(q => {
      const r = answers.value[q.id]
      return typeof r === 'number' && r >= 1 && r <= 5
    }).length
  }

  function isCurrentQuestionCompleted(): boolean {
    if (!currentQuestion.value) return false
    const r = answers.value[currentQuestion.value.id]
    return typeof r === 'number' && r >= 1 && r <= 5
  }

  function isAllQuestionsAnswered(): boolean {
    return questions.value.every(q => {
      const r = answers.value[q.id]
      return typeof r === 'number' && r >= 1 && r <= 5
    })
  }

  // === ナビゲーション ===
  async function scrollToContentTop() {
    await nextTick()
    const content = document.querySelector('.diagnosis-content')
    if (content) {
      content.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  async function goToNextQuestion() {
    if (currentQuestionIndex.value < questions.value.length - 1) {
      currentQuestionIndex.value++
      saveToStorage(STORAGE_KEYS.CURRENT_QUESTION_INDEX, currentQuestionIndex.value)
      scrollToContentTop()
    } else {
      calculateResult()
    }
  }

  async function goToPreviousQuestion() {
    if (currentQuestionIndex.value > 0) {
      currentQuestionIndex.value--
      saveToStorage(STORAGE_KEYS.CURRENT_QUESTION_INDEX, currentQuestionIndex.value)
      if (currentQuestionIndex.value >= 1) {
        scrollToContentTop()
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  // === 結果計算 ===
  function calculateResult() {
    if (!config.value) return

    const scores = calculateProfessionScores(
      config.value,
      answers.value,
      professionDatabase.value || undefined
    )

    topProfessions.value = scores
    saveToStorage(STORAGE_KEYS.TOP_PROFESSIONS, topProfessions.value)

    showResult.value = true
    saveToStorage(STORAGE_KEYS.SHOW_RESULT, showResult.value)

    window.scrollTo(0, 0)
  }

  // === リセット機能 ===
  function resetDiagnosis() {
    console.log('診断リセット開始')

    answers.value = {}
    showResult.value = false
    topProfessions.value = []
    currentQuestionIndex.value = 0
    error.value = null

    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key)
        console.log(`Removed localStorage key: ${key}`)
      })

      // 初期値を明示的にlocalStorageに保存
      saveToStorage(STORAGE_KEYS.ANSWERS, {})
      saveToStorage(STORAGE_KEYS.SHOW_RESULT, false)
      saveToStorage(STORAGE_KEYS.TOP_PROFESSIONS, [])
      saveToStorage(STORAGE_KEYS.CURRENT_QUESTION_INDEX, 0)

      console.log('診断データが完全にリセットされました')
    } catch (storageError) {
      console.error('Failed to clear localStorage:', storageError)
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })

    nextTick(() => {
      loading.value = false
    })
  }

  // === カテゴリーラベル ===
  const CATEGORY_LABELS: Record<string, string> = {
    skill: 'スキル・能力',
    interest: '興味・関心',
    priority: '価値観・優先事項',
    balance: 'ワークライフバランス'
  }

  const getCategoryName = (category: string): string => {
    return CATEGORY_LABELS[category] || category
  }

  const getQuestionCategoryName = (question: Question): string => {
    const cat = question.category
    return cat ? getCategoryName(cat) : '診断'
  }

  // === 評価ラベル ===
  const getRatingLabel = (rating: number): string => {
    const labels: Record<number, string> = {
      1: '全く当てはまらない',
      2: 'あまり当てはまらない',
      3: 'どちらとも言えない',
      4: 'やや当てはまる',
      5: 'よく当てはまる'
    }
    return labels[rating] || ''
  }

  return {
    // 状態
    config,
    professionDatabase,
    loading,
    error,
    answers,
    showResult,
    topProfessions,
    currentQuestionIndex,

    // 計算プロパティ
    questions,
    currentQuestion,
    displayedProfessions,
    maxCategoryScore,

    // 関数
    loadConfig,

    selectQuestionRating,
    getQuestionRating,

    getAnsweredQuestionsCount,
    isCurrentQuestionCompleted,
    isAllQuestionsAnswered,
    goToNextQuestion,
    goToPreviousQuestion,
    calculateResult,
    resetDiagnosis,
    getCategoryName,
    getQuestionCategoryName,
    getRatingLabel,
    scrollToContentTop
  }
}
