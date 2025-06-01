<template>
  <div class="diagnosis-container">
    <div class="diagnosis-content">
      <div v-if="loading" class="loading-section">
        <p>診断データを読み込んでいます...</p>
      </div>
      
      <div v-else-if="error" class="error-section">
        <p>{{ error }}</p>
        <button @click="loadConfig" class="reload-button">再読み込み</button>
      </div>
      
      <template v-else>
        <div v-if="!showResult && currentQuestion" class="current-question-section">
          
          <div class="question-card">
            <h2>質問 {{ currentQuestionIndex + 1 }}</h2>
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
              @click="goToPreviousQuestion"
              class="nav-button prev-button"
              :class="{ 'invisible-button': currentQuestionIndex === 0 }"
              :disabled="currentQuestionIndex === 0"
            >
              前の質問に戻る
            </button>

            <button
              @click="calculateResult"
              :disabled="Object.keys(answers).length !== questions.length"
              class="calculate-button"
              :class="{ 'invisible-button': Object.keys(answers).length !== questions.length }"
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
            
            <!-- 年収範囲の表示 -->
            <div v-if="profession.annualIncome" class="annual-income">
              <h4>年収範囲:</h4>
              <p class="income-value">{{ profession.annualIncome }}</p>
            </div>
            
            <!-- 仕事内容の表示 -->
            <div v-if="profession.jobDetails" class="job-details">
              <h4>仕事内容:</h4>
              <p class="job-description">{{ profession.jobDetails }}</p>
            </div>
            
            <div class="profession-comment">
              <p>{{ profession.comment || 'あなたの特性に合った職業です。自分の強みを活かして頑張りましょう。' }}</p>
            </div>
          </div>
          
          <!-- 共有機能セクション -->
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
        const questionContent = document.querySelector('.diagnosis-content')
        if (questionContent) {
          questionContent.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
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
        const questionContent = document.querySelector('.diagnosis-content')
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
    'skill': 'スキル',
    'motivation': 'モチベーション',
    'environment': '環境適応',
    'personality': '性格'
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
  
  // モバイルデバイスでInstagramアプリが利用可能かチェック
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  
  if (isMobile) {
    // モバイルの場合、Instagramアプリのカスタムスキームを試行
    try {
      // Instagramストーリー用のカスタムスキーム
      const instagramUrl = `instagram://story-camera`
      window.location.href = instagramUrl
      
      // フォールバック: テキストをクリップボードにコピー
      setTimeout(async () => {
        try {
          await navigator.clipboard.writeText(text)
          alert('📋 共有テキストをクリップボードにコピーしました！\nInstagramアプリでストーリーを作成し、テキストを貼り付けてください。')
        } catch (err) {
          console.error('クリップボードへのコピーに失敗しました:', err)
          const textArea = document.createElement('textarea')
          textArea.value = text
          document.body.appendChild(textArea)
          textArea.select()
          document.execCommand('copy')
          document.body.removeChild(textArea)
          alert('📋 共有テキストをクリップボードにコピーしました！\nInstagramアプリでストーリーを作成し、テキストを貼り付けてください。')
        }
      }, 1000)
    } catch (err) {
      // Instagramアプリが開けない場合のフォールバック
      try {
        await navigator.clipboard.writeText(text)
        alert('📋 共有テキストをクリップボードにコピーしました！\nInstagramアプリを開いて、ストーリーまたは投稿に貼り付けてください。')
      } catch (clipboardErr) {
        console.error('クリップボードへのコピーに失敗しました:', clipboardErr)
        const textArea = document.createElement('textarea')
        textArea.value = text
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        alert('📋 共有テキストをクリップボードにコピーしました！\nInstagramアプリを開いて、ストーリーまたは投稿に貼り付けてください。')
      }
    }
  } else {
    // デスクトップの場合、Instagram Webを開く
    try {
      await navigator.clipboard.writeText(text)
      window.open('https://www.instagram.com/', '_blank')
      alert('📋 共有テキストをクリップボードにコピーしました！\nInstagram Webでストーリーまたは投稿を作成し、テキストを貼り付けてください。')
    } catch (err) {
      console.error('クリップボードへのコピーに失敗しました:', err)
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      window.open('https://www.instagram.com/', '_blank')
      alert('📋 共有テキストをクリップボードにコピーしました！\nInstagram Webでストーリーまたは投稿を作成し、テキストを貼り付けてください。')
    }
  }
}

onMounted(() => {
  loadConfig()
})
</script>

<style scoped>
.diagnosis-container {
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.diagnosis-container p{
  color: var(--text-dark);
  margin-bottom: 2rem;
  line-height: 1.6;
  text-align: center;
  font-size: 1.3rem;
}

.diagnosis-content {
  width: 95%;
  max-width: 1000px;
  background-color: var(--background-white);
  border-radius: 30px;
  padding: 2rem;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  border: none;
  position: relative;
  margin-bottom: 120px; /* 固定プログレスバーの分の余白を追加 */
}

.diagnosis-content > p {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-dark);
  line-height: 1.6;
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

.question-section {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.question-section h2 {
  color: var(--text-dark);
  margin-bottom: 0.5rem;
}

.question-section p {
  color: var(--text-dark);
  margin-bottom: 1rem;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
}

.options {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: center;
  width: 100%;
}

.options button {
  padding: 1.2rem 1.8rem;
  background-color: var(--orange-beige);
  border: 2px solid transparent;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  text-align: left;
  width: calc(50% - 1rem);
  max-width: 400px;
  min-width: 200px;
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

.options button:hover {
  transform: translateY(-3px);
}

.options button.selected {
  background-color: #4393dd;
  color: var(--background-white);
  transform: translateY(-3px);
}

.options button.selected::after {
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

.progress-section {
  margin: 2rem 0;
  text-align: center;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 0.5rem;
}

.progress-fill {
  height: 100%;
  background-color: var(--main-color);
  transition: width 0.3s ease;
  background-image: linear-gradient(to right, var(--bright-blue), var(--main-color));
  border-radius: 5px;
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
  min-width: 500px;
  min-height: 100px;
  font-family: 'Hiragino Sans', sans-serif;
  font-size: 2rem;
  font-weight: 600;
  box-shadow: 0 8px 25px rgba(230, 188, 153, 0.3);
  letter-spacing: 0.05em;
}

.calculate-button:hover:not(:disabled) {
  background-color: var(--accent-coral);
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(255, 107, 107, 0.4);
}

.calculate-button.disabled,
.calculate-button:disabled {
  background-color: #e0e0e0;
  color: #999;
  cursor: not-allowed;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: none;
}

.calculate-button.disabled:hover,
.calculate-button:disabled:hover {
  background-color: #e0e0e0;
  transform: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.result-section {
  border-radius: 8px;
}

.result-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 1.5rem 0;
  padding: 1rem;
  background-color: var(--light-blue);
  border-radius: 15px;
}

.result-controls label {
  font-weight: 600;
  color: var(--text-dark);
  font-size: 1rem;
}

.result-controls select {
  padding: 0.5rem 1rem;
  border: 2px solid var(--main-color);
  border-radius: 10px;
  background-color: white;
  color: var(--text-dark);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.result-controls select:hover {
  border-color: var(--bright-blue);
  box-shadow: 0 2px 8px rgba(95, 144, 178, 0.2);
}

.result-controls select:focus {
  outline: none;
  border-color: var(--bright-blue);
  box-shadow: 0 0 0 3px rgba(95, 144, 178, 0.1);
}

.result-box {
  padding: 2rem;
  background-color: white;
  border-radius: 20px;
  margin: 2rem 0;
  line-height: 1.6;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  transform: translateZ(0);
  transition: transform 0.3s ease;
}

.result-box::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 50px 50px 0;
  border-color: transparent var(--light-blue) transparent transparent;
}

.rank-badge {
  position: absolute;
  top: 15px;
  left: 15px;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
  font-size: 1rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  z-index: 2;
}


.result-box:nth-child(2) .rank-badge {
  background: linear-gradient(135deg, #FFD700, #FFA500);
}

.result-box:nth-child(3) .rank-badge {
  background: linear-gradient(135deg, #C0C0C0, #A9A9A9);
}

.result-box:nth-child(4) .rank-badge {
  background: linear-gradient(135deg, #CD7F32, #B8860B);
}

.result-box h3 {
  color: var(--main-color);
  font-family: ToppanBunkyuMidashiGothicStdN-ExtraBold;
  font-size: 2.0rem;
  letter-spacing: 0.3rem;
  margin-bottom: 0.5rem;
  border-bottom: 2px solid var(--main-color);
  padding-bottom: 0.5rem;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.total-score {
  text-align: center;
  margin: 1rem 0;
  padding: 0.8rem;
  background-color: var(--light-blue);
  border-radius: 10px;
}

.score-label {
  font-size: 1rem;
  color: #666;
  margin-right: 0.5rem;
}

.score-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--main-color);
}

.category-scores {
  margin: 1.5rem 0;
}

.category-scores h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.category-bar-container {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.category-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.category-label {
  width: 120px;
  text-align: right;
  font-size: 0.9rem;
  color: #666;
}

.bar-container {
  flex-grow: 1;
  height: 12px;
  background-color: #e0e0e0;
  border-radius: 6px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background-color: var(--main-color);
  transition: width 0.5s ease;
  background-image: linear-gradient(to right, var(--bright-blue), var(--main-color));
}

.category-score {
  width: 40px;
  text-align: right;
  font-size: 0.9rem;
  color: #666;
  font-weight: bold;
}

.category-weight {
  width: 100px;
  text-align: left;
  font-size: 0.8rem;
  color: #999;
  margin-left: 0.5rem;
}

.profession-comment {
  margin-top: 2rem;
  padding: 2rem;
  background-color: var(--light-pink);
  border-radius: 20px;
  border: none;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);
  position: relative;
}

.profession-comment p {
  color: var(--text-dark);
  margin: 0;
  line-height: 1.7;
  font-weight: 400;
  font-size: 1.1rem;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 3rem;
}

.reset-button, .home-button {
  display: block;
  margin: 3rem auto;
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

.reset-button:hover, .home-button:hover {
  background-color: var(--accent-coral);
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(255, 107, 107, 0.4);
}

/* 共有機能のスタイル */
.share-section {
  margin: 3rem 0;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.share-title {
  color: var(--text-dark);
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  font-family: 'Hiragino Sans', sans-serif;
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
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  /* transition: all 0.3s ease; */
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Hiragino Sans', sans-serif;
  color: white;
  min-width: 160px;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.share-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
}

.share-icon {
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.line-icon-img, .x-icon-img, .instagram-icon-img {
  width: 20px;
  height: 20px;
  border-radius: 30%;
  object-fit: cover;
  background-color: white;
  box-sizing: border-box;
}

.line-icon {
  color: #00B900;
  font-family: Arial, sans-serif;
  font-weight: 900;
}

.x-icon {
  color: #000000;
  font-family: Arial, sans-serif;
  font-weight: 900;
}

.instagram-icon {
  color: #E4405F;
  font-size: 1rem;
}

/* LINE共有ボタン */
.line-button {
  background: linear-gradient(135deg, #00B900, #35f735);
}

.line-button:hover {
  background: #00A000;
}

/* X（旧Twitter）共有ボタン */
.x-button {
  background: linear-gradient(135deg, #000000, #9f9e9e);
}

.x-button:hover {
  background: #1a1a1a;
}

/* Instagram共有ボタン */
.instagram-button {
  background: linear-gradient(135deg, #E4405F, #f29884);
}

.instagram-button:hover {
  background: #D73650;
}

.diagnosis-welcome {
  color: #333;
  width: 90%;
  max-width: 1000px;
  margin: 0 auto 2rem;
  text-align: center;
  font-size: 1.2rem;
  line-height: 1.5;
}

.welcome-section {
  padding: 2rem;
}

.current-question-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: auto; /* 最小高さを自動に設定 */
  padding-bottom: 2rem; /* ナビゲーションボタンのための余白 */
}

.question-caed h2 {
  color: var(--text-dark);
  font-size: 1.5rem;
  margin: 0;
}

.question-card {
  width: 100%;
  max-width: 800px;
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.question-card h3 {
  color: var(--text-dark);
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
  line-height: 1.6;
  text-align: center;
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
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  width: 100%;
  min-height: 60px; /* レイアウト安定性のための最小高さ */
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

.prev-button:hover:not(:disabled) {
  background-color: var(--accent-coral);
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(255, 107, 107, 0.4);
}

.prev-button.disabled,
.prev-button:disabled {
  background-color: #e0e0e0;
  color: #999;
  cursor: not-allowed;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: none;
}

.prev-button.disabled:hover,
.prev-button:disabled:hover {
  background-color: #e0e0e0;
  transform: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 見えないボタンのスタイル（白背景、白文字、影なし） */
.invisible-button {
  background-color: white !important;
  color: white !important;
  box-shadow: none !important;
  cursor: not-allowed !important;
}

.invisible-button:hover {
  background-color: white !important;
  color: white !important;
  box-shadow: none !important;
  transform: none !important;
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

.annual-income {
  margin: 1.5rem 0;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 10px;
  border-left: 4px solid var(--main-color);
}

.annual-income h4 {
  margin: 0 0 0.5rem 0;
  color: var(--text-dark);
  font-size: 1rem;
  font-weight: 600;
}

.income-value {
  margin: 0;
  color: var(--main-color);
  font-size: 1.1rem;
  font-weight: 700;
}

.job-details {
  margin: 1.5rem 0;
  padding: 1rem;
  background-color: #f0f8ff;
  border-radius: 10px;
  border-left: 4px solid var(--bright-blue);
}

.job-details h4 {
  margin: 0 0 0.5rem 0;
  color: var(--text-dark);
  font-size: 1rem;
  font-weight: 600;
}

.job-description {
  margin: 0;
  color: var(--text-dark);
  line-height: 1.6;
  font-size: 0.95rem;
}

/* スマートフォン向け */
@media (max-width: 455px) {
  .diagnosis-container {
    padding: 1rem;
  }
  
  .diagnosis-content {
    padding: 1rem;
  }
  
  .options {
    flex-direction: column;
    align-items: center;
  }
  
  .options button {
    width: 100%;
    max-width: 350px;
    margin-bottom: 0.5rem;
  }
  
  .question-section h2 {
    font-size: 1.2rem;
  }
  
  .question-section p {
    font-size: 1rem;
    line-height: 1.4;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 0.8rem;
  }
  
  .reset-button, .home-button {
    width: 100%;
    max-width: 350px;
    margin: 0.7rem auto;
  }
  
  .category-bar {
    flex-wrap: wrap;
  }
  
  .category-label {
    width: 100%;
    text-align: left;
    margin-bottom: 0.2rem;
  }

  .result-box{
    padding-top: 2.5rem;
  }

  .result-box h3{
    font-size: 1.5rem;
  }

  .rank-badge {
    top: 10px;
  }

  /* 共有ボタンのモバイル対応 */
  .share-buttons {
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
  }

  .share-button {
    width: 100%;
    max-width: 280px;
    min-width: auto;
  }

  .navigation-buttons {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    justify-content: center;
  }

  .calculate-button {
    min-width: 250px;
    font-size: 1.1rem;
  }
}

/* タブレット向け */
@media (min-width: 456px) and (max-width: 1024px) {
  .options button {
    width: calc(50% - 1rem);
    max-width: 350px;
  }
}

/* 大画面向け */
@media (min-width: 1025px) {
  .diagnosis-container {
    padding: 1rem;
  }
  
  .options button {
    width: calc(50% - 1rem);
    max-width: 300px;
  }
  
  .question-section h2 {
    font-size: 1.2rem;
    margin-bottom: 0.3rem;
  }
  
  .question-section p {
    margin-bottom: 0.5rem;
  }
}
</style>