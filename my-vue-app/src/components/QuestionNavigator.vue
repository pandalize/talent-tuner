<template>
  <div class="diagnosis-container">
    <div class="diagnosis-content">
      <div v-if="loading" class="loading-section">
        <p>診断データを読み込んでいます...</p>
      </div>
      
      <div v-else-if="error" class="error-section">
        <p>{{ error }}</p>
        <button @click="loadConfig" class="btn reload-button">再読み込み</button>
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
              class="btn prev-button"
              :class="{ 'invisible-button': currentQuestionIndex === 0 }"
              :disabled="currentQuestionIndex === 0"
            >
              前の質問に戻る
            </button>

            <button
              @click="calculateResult"
              :disabled="Object.keys(answers).length !== questions.length"
              class="btn calculate-button"
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
              <span class="score-label">総合スコア：</span>
              <span class="score-value">{{ profession.score.toFixed(1) }}</span>
            </div>
            
            <div class="category-scores">
              <h4>カテゴリー別スコア：</h4>
              <div class="category-bar-container">
                <div
                  v-for="(score, category) in profession.categories"
                  :key="category"
                  class="category-bar"
                >
                  <div class="category-label">{{ CATEGORY_LABELS[category] || category }}</div>
                  <div class="bar-container">
                    <div class="bar-fill" :style="{ width: `${(score / maxCategoryScore) * 100}%` }"></div>
                  </div>
                  <div class="category-score">{{ score.toFixed(1) }}</div>
                </div>
              </div>
            </div>

            <div class="profession-comment">
              <p>{{ profession.comment || 'あなたの特性に合った職業です。自分の強みを活かして頑張りましょう。' }}</p>
            </div>
            
            <div v-if="profession.annualIncome" class="annual-income">
              <h4>年収範囲：</h4>
              <p class="income-value">{{ profession.annualIncome }}</p>
            </div>
            
            <div v-if="profession.jobDetails" class="job-details">
              <h4>仕事内容：</h4>
              <p class="job-description">{{ profession.jobDetails }}</p>
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
                <img src="/image/Instagram.png" alt="Instagram Stories" class="share-icon instagram-icon-img">
                Instagramでシェア
              </button>
            </div>
          </div>
          
          <div class="action-buttons">
            <button @click="resetDiagnosis" class="btn action-button">もう一度診断する</button>
            <button @click="goHome" class="btn action-button">ホームに戻る</button>
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
import { ref, onMounted, computed, nextTick } from 'vue'
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
const DISPLAY_TOP_N = 3; // リアクティブである必要がないため定数に変更
const displayedProfessions = ref<ProfessionScore[]>([])
const currentQuestionIndex = ref(0)

const questions = computed<Question[]>(() => {
  return config.value?.questions || []
})

const currentQuestion = computed<Question | null>(() => {
  if (questions.value.length === 0) return null
  return questions.value[currentQuestionIndex.value] || null
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

let navigationTimer: ReturnType<typeof setTimeout> | null = null;

function selectOption(questionId: string, label: string) {
  answers.value[questionId] = label;
  
  if (navigationTimer) {
    clearTimeout(navigationTimer);
  }
  
  navigationTimer = setTimeout(() => {
    if (currentQuestionIndex.value < questions.value.length - 1) {
      goToNextQuestion();
    }
  }, 500);
}

async function scrollToContentTop() {
  await nextTick();
  const content = document.querySelector('.diagnosis-content');
  if (content) {
    content.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

async function goToNextQuestion() {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++;
    scrollToContentTop();
  }
}

async function goToPreviousQuestion() {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
    if (currentQuestionIndex.value >= 1) {
      scrollToContentTop();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}

function calculateResult() {
  if (!config.value) return
  
  const scores = calculateProfessionScores(config.value, answers.value, professionDatabase.value || undefined)
  topProfessions.value = scores
  updateDisplayedProfessions()
  showResult.value = true
  window.scrollTo(0, 0)
}

function updateDisplayedProfessions() {
  displayedProfessions.value = getTopProfessions(topProfessions.value, DISPLAY_TOP_N)
}

const CATEGORY_LABELS: Record<string, string> = {
  'skill': 'スキル',
  'interest': '興味',
  'priority': '性格',
  'balance': '考え方'
};

function resetDiagnosis() {
  answers.value = {}
  showResult.value = false
  topProfessions.value = []
  displayedProfessions.value = []
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

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Clipboard API failed, falling back to execCommand:', err);
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      const successful = document.execCommand('copy');
      return successful;
    } catch (execErr) {
      console.error('execCommand failed:', execErr);
      return false;
    } finally {
      document.body.removeChild(textArea);
    }
  }
}

async function shareToInstagram() {
  const text = generateShareText();
  const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
  
  try {
    // Instagram Stories用のURLスキームを試行
    if (isMobile) {
      // モバイルデバイスでのInstagram Stories共有
      await shareToInstagramStories(text);
    } else {
      // デスクトップでの代替手段
      await shareToInstagramDesktop(text);
    }
  } catch (error) {
    console.error('Instagram共有エラー:', error);
    // フォールバック: 従来の方法
    await fallbackInstagramShare(text);
  }
}

async function shareToInstagramStories(text: string) {
  // Instagram Stories用のURLスキーム
  const instagramStoriesUrl = 'instagram-stories://share';
  
  // テキストをクリップボードにコピー
  const copied = await copyToClipboard(text);
  
  if (copied) {
    // Instagram Storiesアプリを開く
    try {
      window.location.href = instagramStoriesUrl;
      
      // ユーザーに操作方法を案内
      setTimeout(() => {
        alert('📱 Instagram Storiesが開きました！\n\n' +
              '1. ストーリー作成画面で背景を選択\n' +
              '2. テキストツールを選択\n' +
              '3. クリップボードからテキストを貼り付け\n' +
              '4. 投稿してください！\n\n' +
              '💡 診断結果のテキストはクリップボードにコピー済みです');
      }, 1000);
    } catch (error) {
      // Instagram Storiesが開けない場合は通常のInstagramアプリを開く
      window.location.href = 'instagram://camera';
      alert('📱 Instagramカメラが開きました！\n\n' +
            'ストーリーを作成して診断結果をシェアしてください。\n' +
            'テキストはクリップボードにコピー済みです。');
    }
  } else {
    throw new Error('クリップボードへのコピーに失敗');
  }
}

async function shareToInstagramDesktop(text: string) {
  // デスクトップでの Instagram Stories 共有
  const copied = await copyToClipboard(text);
  
  if (copied) {
    // Instagram Webを新しいタブで開く
    const instagramWeb = window.open('https://www.instagram.com/', '_blank');
    
    // ユーザーに操作方法を案内
    setTimeout(() => {
      alert('💻 Instagram Webが開きました！\n\n' +
            '1. 左上の「+」ボタンをクリック\n' +
            '2. 「ストーリーズ」を選択\n' +
            '3. 画像をアップロードまたは背景を選択\n' +
            '4. テキストツールでクリップボードの内容を貼り付け\n' +
            '5. ストーリーを投稿してください！\n\n' +
            '💡 診断結果のテキストはクリップボードにコピー済みです');
    }, 1500);
  } else {
    throw new Error('クリップボードへのコピーに失敗');
  }
}

async function fallbackInstagramShare(text: string) {
  // 従来の方法（フォールバック）
  const copied = await copyToClipboard(text);
  const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (copied) {
    alert('📋 共有テキストをクリップボードにコピーしました！\n' +
          'Instagramを開いてストーリーに貼り付けてください。');
  } else {
    alert('❌ クリップボードへのコピーに失敗しました。\n' +
          '手動でテキストをコピーしてInstagramでシェアしてください。');
  }

  // InstagramアプリまたはWebサイトを開く
  if (isMobile) {
    try {
      window.location.href = 'instagram://';
    } catch (error) {
      window.open('https://www.instagram.com/', '_blank');
    }
  } else {
    window.open('https://www.instagram.com/', '_blank');
  }
}

onMounted(() => {
  loadConfig()
})
</script>

<style scoped>
/* ==========================================================================
   汎用スタイル & ヘルパークラス
   ========================================================================== */
.btn {
  display: inline-block;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-family: 'Hiragino Sans', sans-serif;
  font-weight: 600;
  text-align: center;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(230, 188, 153, 0.3);
}
.btn:hover:not(:disabled) {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(255, 107, 107, 0.4);
}
.btn:disabled {
  background-color: #e0e0e0 !important; /* disabled時は色を強制上書き */
  color: #999 !important;
  cursor: not-allowed;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: none;
}
.invisible-button {
  visibility: hidden;
}


/* ==========================================================================
   基本レイアウト
   ========================================================================== */
.diagnosis-container {
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
  font-size: clamp(12px, 2vw, 16px);
}
.diagnosis-content {
  width: 70%;
  max-width: 1000px;
  background-color: var(--background-white);
  border-radius: 10px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  border: none;
  position: relative;
  margin-bottom: 120px;
  padding: 2rem;
}
.diagnosis-content > p {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-dark);
  line-height: 1.6;
}


/* ==========================================================================
   ローディング & エラー表示
   ========================================================================== */
.loading-section, .error-section {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--text-dark);
}
.error-section {
  color: #d32f2f;
}
.reload-button {
  background-color: var(--main-color);
  color: var(--background-white);
  padding: 0.8rem 2rem;
  font-weight: 500;
}
.reload-button:hover:not(:disabled) {
  background-color: var(--orange-beige);
}


/* ==========================================================================
   質問セクション
   ========================================================================== */
.current-question-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: auto;
}
.question-card {
  width: 90%;
  max-width: 800px;
  border-radius: 20px;
  text-align: center;
}
.question-card h2{
  color: var(--text-dark);
  font-size: clamp(15px, 4vw, 24px);
  margin-bottom: 1rem;
  font-weight: 600;
  font-family: 'Hiragino Sans', sans-serif;
}
.question-card h3 {
  color: var(--text-dark);
  margin-bottom: 1.5rem;
  font-size: clamp(12px, 2vw, 20px);
  line-height: 1.6;
  text-align: center;
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
  text-align: left;
  width: calc(50% - 1rem);
  max-width: 400px;
  word-wrap: break-word;
  white-space: normal;
  height: auto;
  min-height: 110px;
  font-family: 'Hiragino Sans', sans-serif;
  color: var(--text-dark);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  position: relative;
  font-size: clamp(10px, 1.5vw, 16px);
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
.navigation-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  width: 100%;
  min-height: 130px; 
}
.prev-button {
  background-color: var(--orange-beige);
  color: var(--text-dark);
  font-size: clamp(12px, 3vw, 25px);
  padding: 1rem 2rem;
}
.prev-button:hover:not(:disabled) {
  background-color: var(--accent-coral);
}
.calculate-button {
  background-color: var(--orange-beige);
  color: var(--text-dark);
  font-size: clamp(20px, 3vw, 40px);
  padding: 1rem 5rem;
}
.calculate-button:hover:not(:disabled) {
  background-color: var(--accent-coral);
}

/* ==========================================================================
   結果セクション
   ========================================================================== */
.result-section {
  border-radius: 8px;
}
.result-section h1 {
  color: var(--text-dark);
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: clamp(15px, 3vw, 30px);
  font-weight: 600;
  font-family: 'Hiragino Sans', sans-serif;
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
.rank-badge {
  position: absolute;
  top: 15px;
  left: 15px;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
  font-size: clamp(12px, 2vw, 16px);
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
  font-family: 'ToppanBunkyuMidashiGothicStdN-ExtraBold', sans-serif;
  font-size: clamp(18px, 3vw, 36px);
  letter-spacing: 0.3rem;
  margin-bottom: 0.5rem;
  border-bottom: 2px solid var(--main-color);
  padding-bottom: 0.5rem;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
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
.total-score {
  text-align: center;
  margin: 1rem 0;
  padding: 0.8rem;
  background-color: var(--light-blue);
  border-radius: 10px;
}
.score-label {
  font-size: clamp(12px, 2vw, 16px);
  color: #666;
  margin-right: 0.5rem;
}
.score-value {
  font-size: clamp(16px, 2.5vw, 24px);
  font-weight: bold;
  color: var(--main-color);
}
.category-scores {
  margin: 1.5rem 0;
}
.category-scores h4 {
  color: var(--text-dark);
  margin-bottom: 1rem;
  font-size: clamp(14px, 2.2vw, 20px);
  font-weight: 600;
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
  font-size: clamp(12px, 2vw, 16px);
  color: var(--text-dark);
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
  font-size: clamp(12px, 2vw, 16px);
  color: #666;
  font-weight: bold;
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
  font-size: clamp(10px, 2vw, 18px);
}
.annual-income {
  margin: 1.5rem 0;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 10px;
  border-left: 4px solid var(--main-color);
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}
.annual-income h4 {
  color: var(--text-dark);
  font-size: clamp(10px, 2vw, 20px);
  font-weight: 600;
  margin: 0;
}
.annual-income p {
  margin: 0;
  color: var(--text-dark);
  font-size: var(--fontsize-text);
  font-weight: 700;
}
.job-details {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #f0f8ff;
  border-radius: 10px;
  border-left: 4px solid var(--bright-blue);
}
.job-details h4 {
  margin: 0 0 0.5rem 0;
  color: var(--text-dark);
  font-size: clamp(10px, 2vw, 20px);
  font-weight: 600;
}
.job-details p {
  margin: 0;
  color: var(--text-dark);
  font-size: var(--fontsize-text);
  font-weight: 400;
}
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
  font-size: clamp(16px, 2.5vw, 28px);
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  font-size: clamp(14px, 2vw, 20px);
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
  width: 20px;
  height: 20px;
}
.line-icon-img, .x-icon-img, .instagram-icon-img {
  width: 20px;
  height: 20px;
  border-radius: 30%;
  object-fit: cover;
  background-color: white;
  box-sizing: border-box;
}
.line-button {
  background: linear-gradient(135deg, #00B900, #35f735);
}
.x-button {
  background: linear-gradient(135deg, #000000, #9f9e9e);
}
.instagram-button {
  background: linear-gradient(135deg, #E4405F, #f29884);
}
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 3rem;
  flex-wrap: wrap;
}
.action-button {
  background-color: var(--orange-beige);
  color: var(--text-dark);
  font-size: clamp(16px, 2.5vw, 24px);
  padding: 1.2rem 3rem;
  min-width: 250px;
}
.action-button:hover:not(:disabled) {
  background-color: var(--accent-coral);
}


/* ==========================================================================
   固定プログレスバー
   ========================================================================== */
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
  font-size: clamp(12px, 2vw, 16px);
  font-weight: 500;
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

/* ==========================================================================
   メディアクエリ (レスポンシブ対応)
   ========================================================================== */
/* スマートフォン向け */
@media (max-width: 455px) {
  .diagnosis-container {
    padding: 1rem;
  }
  .diagnosis-content {
    width: 100%;
    padding: 1rem;
  }
  .current-question-section{
    width: 100%;
    padding: 0;
  }
  .question-card {
    margin-bottom: 0;
  }
  .navigation-buttons {
    margin-top: 1rem;
    margin-bottom: 1rem;
    min-height: 120px;
  }
  .options {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
  .options button {
    width: 100%;
    max-width: 300px;
    min-height: 65px;
    padding: 0.5rem 1rem;
    margin-bottom: 0.5rem;
  }
  .calculate-button {
    padding-left: 1rem;
    padding-right: 1rem;
    width: 90%;
  }
  .action-buttons {
    flex-direction: column;
    gap: 0.8rem;
    align-items: center;
    min-width: 100px;
  }
  .reset-button, .home-button {
    width: 90%;
    max-width: 350px;
    margin: 0.7rem auto;
  }
  .category-bar {
    flex-wrap: wrap;
    gap: 0.2rem;
  }
  .category-label {
    width: 100%;
    text-align: left;
    margin-bottom: 0;
  }
  .result-box{
    padding: 1rem;
  }
  .result-box h3{
    font-size: clamp(20px, 5vw, 24px);
    padding: 0;
    padding-top: 2rem;
  }
  .profession-comment {
    padding: 1.5rem;
  }
  .rank-badge {
    top: 10px;
    left: 10px;
  }
  .progress-section-fixed p {
    font-size: clamp(12px, 3vw, 14px);
  }
  .annual-income {
    gap: 0.5rem;
  }
  .progress-bar {
    height: 7px;
  }
  .category-bar-container {
    gap: 0.5rem;
  }
  .bar-container {
    height: 9px;
  }
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
  .progress-section-fixed {
    padding: 0.8rem 1rem;
  }
}

/* タブレット向け */
@media (min-width: 456px) and (max-width: 1024px) {
  .options button {
    width: calc(50% - 1rem);
    max-width: 350px;
  }
  .navigation-buttons {
    min-height: 130px;
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
}
</style>