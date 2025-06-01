<template>
  <div class="question-navigator">
    <div v-if="!showResult" class="welcome-section">
      <h1 class="diagnosis-welcome" style="white-space: normal; font-size: 1.1rem;">
        ため職へようこそ!<br>あなたの「思考スタイル」「行動特性」「対処力」「トレンド感度」などを、
        <br>以下の4つの尺度をもとに、短時間の質問で多角的に分析。<br>高収入職業から、あなたに最適なキャリアをランキング形式でおすすめします。
        <br>1. 興味 2. 能力 3. 価値観 4. バランス
      </h1>
    </div>

    <div class="question-content">
      <div v-if="loading" class="loading-section">
        <p>診断データを読み込んでいます...</p>
      </div>
      
      <div v-else-if="error" class="error-section">
        <p>{{ error }}</p>
        <button @click="loadConfig" class="reload-button">再読み込み</button>
      </div>
      
      <template v-else>
        <div v-if="!showResult && currentQuestion" class="current-question-section">
          <div class="question-header">
            <h2>質問 {{ currentQuestionIndex + 1 }} / {{ questions.length }}</h2>
          </div>
          
          <div class="question-card">
            <h3>{{ currentQuestion.text }}</h3>
            <div class="options">
              <button
                v-for="option in currentQuestion.options"
                :key="option.label"
                @click="selectOption(currentQuestion.id, option.label)"
                :class="{ selected: answers[currentQuestion.id] === option.label }"
                class="option-button"
              >
                {{ option.text }}
              </button>
            </div>
          </div>
          
          <div class="navigation-buttons">
            <button
              v-if="currentQuestionIndex > 0"
              @click="goToPreviousQuestion"
              class="nav-button prev-button"
            >
              ← 前の質問に戻る
            </button>
            
            
            <button
              v-if="answers[currentQuestion.id] && currentQuestionIndex === questions.length - 1"
              @click="calculateResult"
              class="calculate-button"
            >
              診断結果を見る
            </button>
          </div>
        </div>
        
        <div v-if="showResult" class="result-section">
          <h1>診断結果</h1>

          <div v-for="(profession, index) in displayedProfessions" :key="profession.name" class="result-box">
            <div class="rank-badge">{{ index + 1 }}位</div>
            <h3>{{ profession.name }}</h3>
            <div class="total-score">
              <span class="score-label">総合スコア:</span>
              <span class="score-value">{{ profession.score.toFixed(1) }}</span>
            </div>
            
            <div class="category-scores">
              <h4>カテゴリー別スコア:</h4>
              <div class="category-bar-container">
                <div
                  v-for="(score, category) in profession.categories"
                  :key="category"
                  class="category-bar"
                >
                  <div class="category-label">{{ getCategoryLabel(category) }}</div>
                  <div class="bar-container">
                    <div class="bar-fill" :style="{ width: `${(score / getMaxCategoryScore()) * 100}%` }"></div>
                  </div>
                  <div class="category-score">{{ score.toFixed(1) }}</div>
                </div>
              </div>
            </div>
            
            <div v-if="profession.annualIncome" class="annual-income">
              <h4>年収範囲:</h4>
              <p class="income-value">{{ profession.annualIncome }}</p>
            </div>
            
            <div v-if="profession.jobDetails" class="job-details">
              <h4>仕事内容:</h4>
              <p class="job-description">{{ profession.jobDetails }}</p>
            </div>
            
            <div class="profession-comment">
              <p>{{ profession.comment || 'あなたの特性に合った職業です。自分の強みを活かして頑張りましょう。' }}</p>
            </div>
          </div>
          
          <div class="share-section">
            <h3 class="share-title">診断結果をシェア</h3>
            <div class="share-buttons">
              <button @click="shareToLine" class="share-button line-button">
                <img src="/image/LINE.png" alt="LINE" class="share-icon line-icon-img">
                LINEでシェア
              </button>
              <button @click="shareToX" class="share-button x-button">
                <img src="/image/X.png" alt="X" class="share-icon x-icon-img">
                Xでシェア
              </button>
              <button @click="shareToInstagram" class="share-button instagram-button">
                <img src="/image/Instagram.png" alt="Instagram" class="share-icon instagram-icon-img">
                Instagramでシェア
              </button>
            </div>
          </div>
          
          <div class="action-buttons">
            <button @click="resetDiagnosis" class="reset-button">もう一度診断する</button>
            <button @click="goHome" class="home-button">ホームに戻る</button>
          </div>
        </div>
      </template>
    </div>
    
    <div v-if="!showResult && questions.length > 0" class="progress-section-fixed">
      <div class="progress-content">
        <p>回答済み： {{ Object.keys(answers).length }} / {{ questions.length }}</p>
        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  loadDiagnosticConfig,
  loadProfessionDatabase,
  calculateProfessionScores,
  getTopProfessions,
  type DiagnosticConfig,
  type Question,
  type ProfessionScore,
  type ProfessionDatabase
} from '../utils/diagnosisLoader'

const router = useRouter()
const config = ref<DiagnosticConfig | null>(null)
const professionDatabase = ref<ProfessionDatabase | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const answers = ref<Record<string, string>>({})
const showResult = ref(false)
const topProfessions = ref<ProfessionScore[]>([])
const displayTopN = ref(3)
const displayedProfessions = ref<ProfessionScore[]>([])
const currentQuestionIndex = ref(0)

const questions = computed<Question[]>(() => {
  return config.value?.questions || []
})

const currentQuestion = computed<Question | null>(() => {
  if (questions.value.length === 0) return null
  return questions.value[currentQuestionIndex.value] || null
})

async function loadConfig() {
  try {
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
    error.value = '診断データの読み込みに失敗しました。もう一度お試しください。'
    loading.value = false
  }
}

function selectOption(questionId: string, label: string) {
  answers.value[questionId] = label
  
  // 500ms後に自動的に次の質問に移動
  setTimeout(() => {
    if (currentQuestionIndex.value < questions.value.length - 1) {
      goToNextQuestion()
    }
  }, 500)
}

function goToNextQuestion() {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++
    
    // 質問2以降では、question-contentの一番上にスクロール
    if (currentQuestionIndex.value >= 1) {
      // 少し遅延を入れてDOMの更新を待つ
      setTimeout(() => {
        const questionContent = document.querySelector('.question-content')
        if (questionContent) {
          questionContent.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    } else {
      // 最初の質問では通常通りトップにスクロール
      window.scrollTo(0, 0)
    }
  }
}

function goToPreviousQuestion() {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
    
    // 質問2以降では、question-contentの一番上にスクロール
    if (currentQuestionIndex.value >= 1) {
      // 少し遅延を入れてDOMの更新を待つ
      setTimeout(() => {
        const questionContent = document.querySelector('.question-content')
        if (questionContent) {
          questionContent.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    } else {
      // 最初の質問では通常通りトップにスクロール
      window.scrollTo(0, 0)
    }
  }
}

function calculateResult() {
  if (!config.value) return
  
  const scores = calculateProfessionScores(config.value, answers.value, professionDatabase.value || undefined)
  topProfessions.value = scores
  displayTopN.value = 3
  updateDisplayedProfessions()
  showResult.value = true
  window.scrollTo(0, 0)
}

function updateDisplayedProfessions() {
  displayedProfessions.value = getTopProfessions(topProfessions.value, displayTopN.value)
}

function getMaxCategoryScore(): number {
  if (displayedProfessions.value.length === 0) return 1
  
  let maxScore = 0
  displayedProfessions.value.forEach(profession => {
    Object.values(profession.categories).forEach(score => {
      if (score > maxScore) maxScore = score
    })
  })
  return maxScore || 1
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    'interest': '興味',
    'skill': '能力',
    'priority': '価値観',
    'balance': '両立'
  }
  return labels[category] || category
}

function resetDiagnosis() {
  answers.value = {}
  showResult.value = false
  topProfessions.value = []
  displayedProfessions.value = []
  displayTopN.value = 3
  currentQuestionIndex.value = 0
  window.scrollTo(0, 0)
}

function goHome() {
  router.push('/')
}

function generateShareText(): string {
  if (displayedProfessions.value.length === 0) return ''
  
  const top3 = displayedProfessions.value.slice(0, 3)
  const professionNames = top3.map((p, index) => `${index + 1}位: ${p.name}`).join('\n')
  
  return `🎯 職業診断結果 🎯\n\n${professionNames}\n\n#職業診断 #適職診断 #キャリア診断\n\n診断はこちら: ${window.location.href}`
}

function shareToLine() {
  const text = generateShareText()
  const encodedText = encodeURIComponent(text)
  const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}&text=${encodedText}`
  window.open(lineUrl, '_blank')
}

function shareToX() {
  const text = generateShareText()
  const encodedText = encodeURIComponent(text)
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}`
  window.open(twitterUrl, '_blank')
}

async function shareToInstagram() {
  const text = generateShareText()
  
  try {
    await navigator.clipboard.writeText(text)
    alert('📋 共有テキストをクリップボードにコピーしました！\nInstagramアプリを開いて、ストーリーまたは投稿に貼り付けてください。')
  } catch (err) {
    console.error('クリップボードへのコピーに失敗しました:', err)
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    alert('📋 共有テキストをクリップボードにコピーしました！\nInstagramアプリを開いて、ストーリーまたは投稿に貼り付けてください。')
  }
}

onMounted(() => {
  loadConfig()
})
</script>

<style scoped>
.question-navigator {
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding-bottom: 120px;
}

.question-navigator p {
  color: var(--text-dark);
  margin-bottom: 2rem;
  line-height: 1.6;
  text-align: center;
  font-size: 1.3rem;
}

.question-content {
  width: 95%;
  max-width: 1000px;
  background-color: var(--background-white);
  border-radius: 30px;
  padding: 2rem;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  overflow-x: hidden;
  border: none;
  position: relative;
  flex: 1;
}

.loading-section, .error-section {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--text-dark);
}

.error-section {
  color: #d32f2f;
}

.reload-button {
  margin-top: 1rem;
  padding: 0.8rem 2rem;
  background-color: var(--main-color);
  color: var(--background-white);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-family: 'Hiragino Sans', sans-serif;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  font-weight: 500;
}

.reload-button:hover {
  background-color: var(--orange-beige);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(230, 188, 153, 0.4);
}

.current-question-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 500px;
}

.question-header {
  text-align: center;
  margin-bottom: 2rem;
}

.question-header h2 {
  color: var(--text-dark);
  font-size: 1.5rem;
  margin: 0;
}

.question-card {
  width: 100%;
  max-width: 800px;
  background-color: #f8f9fa;
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.question-card h3 {
  color: var(--text-dark);
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
  line-height: 1.6;
  text-align: center;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.option-button {
  padding: 1.5rem 2rem;
  background-color: var(--orange-beige);
  border: 2px solid transparent;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  text-align: left;
  width: 100%;
  word-wrap: break-word;
  white-space: normal;
  height: auto;
  font-family: 'Hiragino Sans', sans-serif;
  color: var(--text-dark);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  position: relative;
  font-weight: 400;
  line-height: 1.4;
}

.option-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.option-button.selected {
  background-color: #4393dd;
  color: var(--background-white);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(67, 147, 221, 0.4);
}

.option-button.selected::after {
  content: '✓';
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 14px;
  color: var(--main-color);
  background: var(--background-white);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.navigation-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.nav-button {
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-family: 'Hiragino Sans', sans-serif;
  font-weight: 500;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.prev-button {
  background-color: #6c757d;
  color: var(--background-white);
}

.prev-button:hover {
  background-color: #5a6268;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(108, 117, 125, 0.4);
}


.calculate-button {
  padding: 1.2rem 3rem;
  background-color: var(--orange-beige);
  color: var(--text-dark);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.3rem;
  min-width: 300px;
  font-family: 'Hiragino Sans', sans-serif;
  font-weight: 600;
  box-shadow: 0 8px 25px rgba(230, 188, 153, 0.3);
  letter-spacing: 0.05em;
}

.calculate-button:hover {
  background-color: var(--accent-coral);
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(255, 107, 107, 0.4);
}

.progress-section-fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--background-white);
  border-top: 1px solid #e0e0e0;
  padding: 1rem 2rem;
  box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.progress-content {
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.progress-content p {
  margin: 0 0 0.5rem 0;
  color: var(--text-dark);
  font-size: 1rem;
  font-weight: 500;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: var(--main-color);
  transition: width 0.3s ease;
  background-image: linear-gradient(to right, var(--bright-blue), var(--main-color));
  border-radius: 5px;
}

.result-section {
  border-radius: 8px;
}

.result-box {
  background-color: #f8f9fa;
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  position: relative;
}

.rank-badge {
  position: absolute;
  top: -10px;
  left: 20px;
  background-color: var(--main-color);
  color: var(--background-white);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
  font-size: 1rem;
}

.result-box h3 {
  color: var(--text-dark);
  margin: 1rem 0;
  font-size: 1.5rem;
}

.total-score {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: var(--background-white);
  border-radius: 10px;
}

.score-label {
  font-weight: 600;
  color: var(--text-dark);
}

.score-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--main-color);
}

.category-scores h4 {
  color: var(--text-dark);
  margin-bottom: 1rem;
}

.category-bar-container {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.category-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.category-label {
  min-width: 60px;
  font-weight: 500;
  color: var(--text-dark);
}

.bar-container {
  flex: 1;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background-color: var(--main-color);
  border-radius: 10px;
  transition: width 0.3s ease;
}

.category-score {
  min-width: 40px;
  text-align: right;
  font-weight: 500;
  color: var(--text-dark);
}

.annual-income, .job-details {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: var(--background-white);
  border-radius: 10px;
}

.annual-income h4, .job-details h4 {
  color: var(--text-dark);
  margin-bottom: 0.5rem;
}

.income-value {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--main-color);
  margin: 0;
}

.job-description {
  color: var(--text-dark);
  line-height: 1.6;
  margin: 0;
}

.profession-comment {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #e3f2fd;
  border-radius: 10px;
  border-left: 4px solid var(--main-color);
}

.profession-comment p {
  color: var(--text-dark);
  margin: 0;
  font-style: italic;
}

.share-section {
  margin: 3rem 0;
  text-align: center;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 15px;
}

.share-title {
  color: var(--text-dark);
  margin-bottom: 1.5rem;
}

.share-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.share-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-family: 'Hiragino Sans', sans-serif;
  font-weight: 500;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.line-button {
  background-color: #00c300;
  color: white;
}

.x-button {
  background-color: #1da1f2;
  color: white;
}

.instagram-button {
  background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  color: white;
}

.share-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.share-icon {
  width: 20px;
  height: 20px;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.reset-button, .home-button {
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-family: 'Hiragino Sans', sans-serif;
  font-weight: 500;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.reset-button {
  background-color: var(--orange-beige);
  color: var(--text-dark);
}

.reset-button:hover {
  background-color: var(--accent-coral);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(255, 107, 107, 0.4);
}

.home-button {
  background-color: var(--main-color);
  color: var(--background-white);
}

.home-button:hover {
  background-color: var(--bright-blue);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(67, 147, 221, 0.4);
}

@media (max-width: 768px) {
  .question-content {
    width: 98%;
    padding: 1.5rem;
  }
  
  .question-card {
    padding: 1.5rem;
  }
  
  .option-button {
    padding: 1.2rem 1.5rem;
  }
  
  .navigation-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .nav-button, .calculate-button {
    width: 100%;
    max-width: 300px;
  }
  
  .progress-section-fixed {
    padding: 0.8rem 1rem;
  }
  
  .share-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .share-button {
    width: 100%;
    max-width: 250px;
    justify-content: center;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .reset-button, .home-button {
    width: 100%;
    max-width: 300px;
  }
}
</style>