<template>
  <div class="diagnosis-container" :class="{ 'has-progress': !showResult && questions.length > 0 }">
    <div class="diagnosis-content">
      <div v-if="loading" class="loading-section">
        <div class="loading-spinner"></div>
        <h3>診断システムを初期化中</h3>
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
      
      <!-- メインコンテンツ（loading と error が false の時に表示） -->
      <div v-if="!loading && !error">
        <!-- デバッグ情報表示 -->
        <div v-if="false" class="debug-info" style="background: #f0f0f0; padding: 1rem; margin: 1rem 0; border-radius: 8px;">
          <h4>Debug Info:</h4>
          <p>Loading: {{ loading }}</p>
          <p>Error: {{ error }}</p>
          <p>Show Result: {{ showResult }}</p>
          <p>Current Question: {{ !!currentQuestion }}</p>
          <p>Questions Length: {{ questions.length }}</p>
          <p>Current Index: {{ currentQuestionIndex }}</p>
          <p>Condition (!showResult && currentQuestion): {{ !showResult && !!currentQuestion }}</p>
          <p>Question Text: {{ currentQuestion?.text?.substring(0, 50) }}...</p>
        </div>
        
        <!-- 質問表示セクション -->
        <div v-if="!showResult && currentQuestion" class="current-question-section">
          <!-- ヘッダー情報 -->
          <div class="question-header">
            <div class="question-meta">
              <span class="question-number">質問 {{ currentQuestionIndex + 1 }} / {{ questions.length }}</span>
              <span class="category-badge">{{ getQuestionCategoryName(currentQuestion) }}</span>
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
          </div>
          
          <div class="navigation-section">
            <button
              @click="goToPreviousQuestion"
              class="btn nav-button prev-button"
              :disabled="currentQuestionIndex === 0"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              前へ
            </button>

            <div class="progress-indicator">
              <div class="progress-dots">
                <div
                  v-for="(question, index) in questions"
                  :key="question.id"
                  class="progress-dot"
                  :class="{
                    completed: answers[question.id] && Object.keys(answers[question.id]).length > 0,
                    current: index === currentQuestionIndex
                  }"
                ></div>
              </div>
            </div>

            <button
              @click="isAllQuestionsAnswered() ? calculateResult() : goToNextQuestion()"
              :disabled="!isCurrentQuestionCompleted()"
              class="btn nav-button next-button"
              :class="{ 'results-ready': isAllQuestionsAnswered() }"
            >
              <span v-if="isAllQuestionsAnswered()">
                結果を見る
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </span>
              <span v-else>
                次へ
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </button>
          </div>
          
        </div>
        
        <div v-if="showResult" class="result-section">
          <!-- 結果ヘッダー -->
          <div class="result-header">
            <div class="completion-badge">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 11l3 3l8-8"/>
                <path d="M21 12c-.3 1.5-1.1 2.9-2.3 4"/>
                <path d="M3 12c0-4.2 3.4-7.6 7.6-7.6"/>
              </svg>
              診断完了
            </div>
            <h1 class="result-title">あなたの適職診断結果</h1>
            <p class="result-subtitle">
              {{ Object.keys(answers).length }}問の質問から分析した、あなたに最適な職業をランキング形式でご紹介します
            </p>
          </div>

          <!-- 結果カードリスト -->
          <div class="results-grid">
            <div 
              v-for="(profession, index) in displayedProfessions" 
              :key="profession.name" 
              class="profession-card"
              :class="`rank-${index + 1}`"
            >
              <!-- カードヘッダー -->
              <div class="card-header">
                <div class="rank-section">
                  <div class="rank-badge">{{ index + 1 }}</div>
                  <div class="rank-label">
                    <span v-if="index === 0" class="rank-title">最適職業</span>
                    <span v-else-if="index === 1" class="rank-title">次点候補</span>
                    <span v-else class="rank-title">候補職業</span>
                  </div>
                </div>
                <div class="total-score">
                  <div class="score-circle">
                    <svg class="score-ring" width="60" height="60">
                      <circle cx="30" cy="30" r="25" fill="none" stroke="var(--bg-tertiary)" stroke-width="4"/>
                      <circle 
                        cx="30" cy="30" r="25" fill="none" 
                        stroke="var(--accent-blue)" 
                        stroke-width="4"
                        stroke-linecap="round"
                        :stroke-dasharray="`${2 * Math.PI * 25}`"
                        :stroke-dashoffset="`${2 * Math.PI * 25 * (1 - profession.score / 100)}`"
                        transform="rotate(-90 30 30)"
                      />
                    </svg>
                    <div class="score-text">
                      <span class="score-value">{{ profession.score.toFixed(0) }}</span>
                      <span class="score-unit">点</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 職業名 -->
              <h3 class="profession-name">{{ profession.name }}</h3>
              
              <!-- カテゴリー別スコア -->
              <div class="category-analysis">
                <h4 class="analysis-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                  適性分析
                </h4>
                <div class="category-grid">
                  <div
                    v-for="(score, category) in profession.categories"
                    :key="category"
                    class="category-item"
                  >
                    <div class="category-header">
                      <span class="category-name">{{ CATEGORY_LABELS[category] || category }}</span>
                      <span class="category-score">{{ score.toFixed(1) }}pt</span>
                    </div>
                    <div class="category-bar">
                      <div 
                        class="category-fill" 
                        :style="{ width: `${(score / maxCategoryScore) * 100}%` }"
                        :data-category="category"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 職業詳細情報 -->
              <div class="profession-details">
                <!-- コメント -->
                <div class="detail-section">
                  <h4 class="detail-title">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                    </svg>
                    適性コメント
                  </h4>
                  <p class="detail-content">
                    {{ profession.comment || 'あなたの回答から分析した結果、この職業があなたの特性や価値観に適している可能性が高いことがわかりました。ぜひチャレンジを検討してみてください。' }}
                  </p>
                </div>
                
                <!-- 年収情報 -->
                <div v-if="profession.annualIncome" class="detail-section">
                  <h4 class="detail-title">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="12" y1="1" x2="12" y2="23"/>
                      <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                    </svg>
                    年収目安
                  </h4>
                  <p class="income-value">{{ profession.annualIncome }}</p>
                </div>
                
                <!-- 仕事内容 -->
                <div v-if="profession.jobDetails" class="detail-section">
                  <h4 class="detail-title">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                      <line x1="8" y1="21" x2="16" y2="21"/>
                      <line x1="12" y1="17" x2="12" y2="21"/>
                    </svg>
                    業務内容
                  </h4>
                  <p class="detail-content">{{ profession.jobDetails }}</p>
                </div>
              </div>
              
              <!-- 詳細リンクボタン -->
              <router-link 
                :to="`/profession/${profession.id || profession.name.toLowerCase().replace(/\s+/g, '-')}`" 
                class="detail-link-button"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
                この職業の詳細を見る
              </router-link>
            </div>
          </div>
          
          <!-- シェア機能 -->
          <div class="share-section">
            <div class="section-header">
              <h3 class="section-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/>
                  <polyline points="16,6 12,2 8,6"/>
                  <line x1="12" y1="2" x2="12" y2="15"/>
                </svg>
                診断結果をシェア
              </h3>
              <p class="section-subtitle">友人や家族と結果を共有して、キャリアについて話し合ってみましょう</p>
            </div>
            <div class="share-grid">
              <button @click="shareToLine" class="share-card line-card">
                <div class="share-icon">
                  <img src="/image/LINE.png" alt="LINE" class="platform-icon">
                </div>
                <div class="share-content">
                  <h4>LINEでシェア</h4>
                  <p>友達やグループに結果を送信</p>
                </div>
              </button>
              <button @click="shareToX" class="share-card x-card">
                <div class="share-icon">
                  <img src="/image/X.png" alt="X (Twitter)" class="platform-icon">
                </div>
                <div class="share-content">
                  <h4>Xでシェア</h4>
                  <p>フォロワーと診断結果を共有</p>
                </div>
              </button>
              <button @click="shareToInstagram" class="share-card instagram-card">
                <div class="share-icon">
                  <img src="/image/Instagram.png" alt="Instagram" class="platform-icon">
                </div>
                <div class="share-content">
                  <h4>Instagramでシェア</h4>
                  <p>ストーリーズで結果を投稿</p>
                </div>
              </button>
            </div>
          </div>
          
          <!-- 詳細レポート購入 -->
          <div class="premium-section">
            <div class="premium-card">
              <div class="premium-header">
                <div class="premium-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10,9 9,9 8,9"/>
                  </svg>
                </div>
                <div class="premium-content">
                  <h3 class="premium-title">詳細診断レポート</h3>
                  <p class="premium-subtitle">より深い自己理解とキャリア設計のために</p>
                </div>
                <div class="premium-price">
                  <span class="price-amount">¥500</span>
                  <span class="price-tax">税込</span>
                </div>
              </div>
              
              <div class="premium-features">
                <div class="feature-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20,6 9,17 4,12"/>
                  </svg>
                  <span>16の詳細な適性分析レポート</span>
                </div>
                <div class="feature-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20,6 9,17 4,12"/>
                  </svg>
                  <span>パーソナライズされたキャリアアドバイス</span>
                </div>
                <div class="feature-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20,6 9,17 4,12"/>
                  </svg>
                  <span>スキル開発ロードマップの提案</span>
                </div>
                <div class="feature-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20,6 9,17 4,12"/>
                  </svg>
                  <span>面接対策・転職活動のヒント</span>
                </div>
              </div>
              
              <button @click="purchasePdfReport" class="premium-button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
                </svg>
                詳細レポートを購入する
              </button>
            </div>
          </div>
          
          <!-- アクションボタン -->
          <div class="action-section">
            <div class="action-grid">
              <button @click.prevent="handleResetDiagnosis" class="action-button secondary-action" type="button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 12a9 9 0 009-9 9.75 9.75 0 016.74 2.74L21 8"/>
                  <path d="M21 3v5h-5"/>
                  <path d="M21 12a9 9 0 01-9 9 9.75 9.75 0 01-6.74-2.74L3 16"/>
                  <path d="M3 21v-5h5"/>
                </svg>
                もう一度診断する
              </button>
              <button @click="goHome" class="action-button primary-action">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                </svg>
                ホームに戻る
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="!showResult && questions.length > 0" class="progress-section-fixed">
      <div class="progress-content">
        <p>回答済み： {{ getAnsweredQuestionsCount() }} / {{ questions.length }}</p>
        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: `${(getAnsweredQuestionsCount() / questions.length) * 100}%` }"
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

// localStorage キー
const STORAGE_KEYS = {
  ANSWERS: 'diagnosis_answers',
  SHOW_RESULT: 'diagnosis_show_result',
  TOP_PROFESSIONS: 'diagnosis_top_professions',
  CURRENT_QUESTION_INDEX: 'diagnosis_current_question_index'
}

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

const config = ref<DiagnosticConfig | null>(null)
const professionDatabase = ref<ProfessionDatabase | null>(null)
// 保存された状態がある場合はローディング時間を短縮
const hasSavedState = loadFromStorage(STORAGE_KEYS.ANSWERS, null) !== null || loadFromStorage(STORAGE_KEYS.SHOW_RESULT, false)
const loading = ref(!hasSavedState)
const error = ref<string | null>(null)

// 状態を localStorage から復元
const answers = ref<Record<string, string | Record<string, number>>>(loadFromStorage(STORAGE_KEYS.ANSWERS, {}))
const showResult = ref(loadFromStorage(STORAGE_KEYS.SHOW_RESULT, false))
const topProfessions = ref<ProfessionScore[]>(loadFromStorage(STORAGE_KEYS.TOP_PROFESSIONS, []))
const DISPLAY_TOP_N = 3; // リアクティブである必要がないため定数に変更
const displayedProfessions = ref<ProfessionScore[]>([])
const currentQuestionIndex = ref(loadFromStorage(STORAGE_KEYS.CURRENT_QUESTION_INDEX, 0))

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

let isLoadingConfig = false

async function loadConfig() {
  if (isLoadingConfig) {
    return
  }
  
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
    
    // 結果画面の状態を復元
    if (showResult.value && topProfessions.value.length > 0) {
      updateDisplayedProfessions()
    }
    
    loading.value = false
  } catch (err) {
    console.error('設定の読み込みに失敗しました:', err)
    
    // 保存されたデータがある場合は、エラー状態でも一部機能を利用可能にする
    if (hasSavedState) {
      error.value = 'データの読み込みに失敗しましたが、保存された診断データは利用できます。ネットワーク接続を確認してください。'
      loading.value = false
      
      // 最低限の設定で動作させる
      if (!config.value) {
        config.value = {
          category_weights: { skill: 1.0, interest: 1.0, priority: 1.0, balance: 1.0 },
          threshold: { recommend_top_n: 3 },
          questions: []
        }
      }
    } else {
      error.value = '診断データの読み込みに失敗しました。インターネット接続を確認してもう一度お試しください。'
      loading.value = false
    }
  } finally {
    isLoadingConfig = false
  }
}

// 新しい評価形式の回答を管理
function selectOptionRating(questionId: string, optionLabel: string, rating: number) {
  if (!answers.value[questionId] || typeof answers.value[questionId] === 'string') {
    answers.value[questionId] = {};
  }
  
  const questionAnswers = answers.value[questionId] as Record<string, number>;
  questionAnswers[optionLabel] = rating;
  
  saveToStorage(STORAGE_KEYS.ANSWERS, answers.value);
}

// 特定の選択肢の評価値を取得
function getOptionRating(questionId: string, optionLabel: string): number | null {
  const questionAnswers = answers.value[questionId];
  if (!questionAnswers || typeof questionAnswers === 'string') return null;
  
  const rating = questionAnswers[optionLabel];
  return (typeof rating === 'number' && rating >= 1 && rating <= 5) ? rating : null;
}

// 評価値のラベルを取得
function getRatingLabel(rating: number): string {
  const labels: Record<number, string> = {
    1: '全く当てはまらない',
    2: 'あまり当てはまらない', 
    3: 'どちらとも言えない',
    4: 'やや当てはまる',
    5: 'よく当てはまる'
  };
  return labels[rating] || '';
}

// すべての質問に回答済みかチェック
function isAllQuestionsAnswered(): boolean {
  return questions.value.every(question => {
    const questionAnswers = answers.value[question.id];
    
    // 新しい評価形式でない場合はfalse
    if (!questionAnswers || typeof questionAnswers === 'string') {
      return false;
    }
    
    // すべての選択肢に評価が付いているかチェック
    return question.options.every(option => {
      const rating = questionAnswers[option.label];
      return rating && rating >= 1 && rating <= 5;
    });
  });
}

// 回答済み質問数を計算
function getAnsweredQuestionsCount(): number {
  return questions.value.filter(question => {
    const questionAnswers = answers.value[question.id];
    if (!questionAnswers || typeof questionAnswers !== 'object') return false;
    
    // 少なくとも1つの選択肢に回答があるかチェック
    return question.options.some(option => {
      const rating = questionAnswers[option.label];
      return rating && rating >= 1 && rating <= 5;
    });
  }).length;
}

// レガシー関数を削除（5段階評価に移行したため不要）

async function scrollToContentTop() {
  await nextTick();
  const content = document.querySelector('.diagnosis-content');
  if (content) {
    content.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function isCurrentQuestionCompleted(): boolean {
  if (!currentQuestion.value) return false
  
  const questionId = currentQuestion.value.id
  const answer = answers.value[questionId]
  
  if (!answer || typeof answer !== 'object') {
    return false
  }
  
  const answerObj = answer as Record<string, number>
  return currentQuestion.value.options.every(option => {
    const rating = answerObj[option.label]
    return rating >= 1 && rating <= 5
  })
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
    currentQuestionIndex.value--;
    saveToStorage(STORAGE_KEYS.CURRENT_QUESTION_INDEX, currentQuestionIndex.value);
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
  saveToStorage(STORAGE_KEYS.TOP_PROFESSIONS, topProfessions.value)
  updateDisplayedProfessions()
  showResult.value = true
  saveToStorage(STORAGE_KEYS.SHOW_RESULT, showResult.value)
  window.scrollTo(0, 0)
}

function updateDisplayedProfessions() {
  displayedProfessions.value = getTopProfessions(topProfessions.value, DISPLAY_TOP_N)
}

const CATEGORY_LABELS: Record<string, string> = {
  'skill': 'スキル・能力',
  'interest': '興味・関心',
  'priority': '価値観・優先事項',
  'balance': 'ワークライフバランス'
};

// カテゴリー名を取得する関数
const getCategoryName = (category: string): string => {
  return CATEGORY_LABELS[category] || category
}

// 質問の主要カテゴリーを取得（最初の選択肢のカテゴリーを使用）
const getQuestionCategoryName = (question: Question): string => {
  if (question.options && question.options.length > 0) {
    return getCategoryName(question.options[0].category)
  }
  return '診断'
}

function handleResetDiagnosis() {
  const userConfirmed = confirm('診断データをすべてリセットしますか？\n※この操作は元に戻せません。')
  
  if (userConfirmed) {
    try {
      resetDiagnosis()
      alert('診断データがリセットされました。')
    } catch (error) {
      console.error('Reset failed:', error);
      alert('リセット中にエラーが発生しました。')
    }
  }
}

function resetDiagnosis() {
  // すべての状態をリセット
  answers.value = {}
  showResult.value = false
  topProfessions.value = []
  displayedProfessions.value = []
  currentQuestionIndex.value = 0
  error.value = null
  
  // localStorage をクリア
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key)
    })
  } catch (storageError) {
    console.error('Failed to clear localStorage:', storageError);
  }
  
  // ページの最上部にスクロール
  window.scrollTo({ top: 0, behavior: 'smooth' })
  
  // 確実にloadingをfalseに設定
  nextTick(() => {
    loading.value = false
  })
}

function goHome() {
  router.push('/')
}

async function purchasePdfReport() {
  try {
    // 診断結果データを準備
    const resultData = {
      answers: answers.value,
      topProfessions: topProfessions.value,
      timestamp: new Date().toISOString()
    }
    
    // Stripe Checkoutセッションを作成
    const response = await fetch('/api/create-checkout-session.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceAmount: 500, // 500円
        resultData: resultData
      })
    })
    
    if (!response.ok) {
      throw new Error('決済セッションの作成に失敗しました')
    }
    
    const { sessionId } = await response.json()
    
    // Stripe Checkoutにリダイレクト
    const stripe = (window as Window & { Stripe?: (key: string) => { redirectToCheckout: (options: { sessionId: string }) => Promise<{ error?: Error }> } }).Stripe?.(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
    if (!stripe) {
      alert('決済システムの初期化に失敗しました。ページを再読み込みしてください。')
      return
    }
    const { error } = await stripe.redirectToCheckout({ sessionId })
    
    if (error) {
      console.error('Stripe Error:', error)
      alert('決済処理でエラーが発生しました。もう一度お試しください。')
    }
  } catch (error) {
    console.error('Purchase error:', error)
    alert('購入処理中にエラーが発生しました。もう一度お試しください。')
  }
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
      const successful = document.execCommand('copy'); // 古いブラウザ互換性のためのフォールバック
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
    } catch {
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
    window.open('https://www.instagram.com/', '_blank');
    
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
    } catch {
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

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';
// =====================================================
// 診断コンポーネント - SCSS最適化版
// =====================================================

// 基本レイアウト
.diagnosis-container {
  @include flex-center;
  width: 100%;
  min-height: calc(100vh - 80px); // ヘッダー分を差し引き
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  flex-direction: column;
  padding: var(--space-md);
  overflow-x: hidden;
}

.diagnosis-content {
  @include container(900px);
  @include card-base;
  @include card-shadow(lg);
  @include card-padding(lg);
  margin-bottom: var(--space-lg);
  position: relative;
}

// ローディング & エラーセクション
.loading-section {
  @include section-padding;
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
  @include section-padding;
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
  @include button-primary;
}

.reset-section {
  text-align: center;
  padding: var(--space-md);
  border-bottom: 1px solid var(--border-light);
  margin-bottom: var(--space-lg);
}

.reset-button {
  @include button-base;
  background: #f39c12;
  color: white;
  font-size: var(--fs-small);
  padding: var(--space-xs) var(--space-md);

  &:hover {
    background: #e67e22;
    transform: translateY(-1px);
  }
}

// 質問ヘッダー部分
.question-header {
  text-align: center;
  margin-bottom: var(--space-xl);
}

.question-meta {
  @include flex-center;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
}

.question-number {
  font-family: var(--font-mono);
  font-size: var(--fs-small);
  color: var(--text-secondary);
  background: var(--bg-tertiary);
  padding: var(--space-xs) var(--space-sm);
  border-radius: 20px;
}

.category-badge {
  font-size: var(--fs-small);
  color: var(--accent-blue);
  background: rgba(52, 152, 219, 0.1);
  padding: var(--space-xs) var(--space-sm);
  border-radius: 20px;
  font-weight: 500;
}

.question-title {
  font-family: var(--font-heading);
  font-size: var(--fs-h2);
  color: var(--primary-navy);
  margin-bottom: var(--space-sm);
  font-weight: 600;
  line-height: 1.4;
}

.question-subtitle {
  color: var(--text-secondary);
  font-size: var(--fs-body);
  margin-bottom: 0;
}

// 質問カード - 5段階評価形式
.question-card {
  margin-bottom: var(--space-xl);
}

.options-list {
  @include flex-column(var(--space-lg));
  @include container(900px);
}

.option-item {
  @include card-base;
  @include card-padding(lg);
  transition: all var(--transition-fast);

  &:hover {
    border-color: var(--accent-blue);
    @include card-shadow(sm);
  }
}

.option-content {
  @include flex-column(var(--space-md));
}

.option-header {
  @include flex-row(var(--space-md));
  align-items: flex-start;
}

// 評価スケール
.rating-scale {
  @include flex-column(var(--space-sm));
}

.scale-labels {
  @include flex-between;
  font-size: var(--fs-small);
  color: var(--text-secondary);
  margin-bottom: var(--space-xs);
}

.scale-buttons {
  @include flex-between;
  gap: var(--space-xs);
  max-width: 300px;
  margin: 0 auto;
}

.rating-button {
  @include flex-center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid var(--border-light);
  background: var(--bg-primary);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-weight: 600;
  font-size: 1rem;

  &:hover {
    border-color: var(--accent-blue);
    background: rgba(52, 152, 219, 0.1);
    transform: scale(1.1);
  }

  &.selected {
    border-color: var(--accent-blue);
    background: var(--accent-blue);
    color: white;
    transform: scale(1.15);
    @include card-shadow(md);
  }
}

// 評価値別の色分け
.rating-button {
  &.rating-1.selected {
    background: #e74c3c;
    border-color: #e74c3c;
  }

  &.rating-2.selected {
    background: #f39c12;
    border-color: #f39c12;
  }

  &.rating-3.selected {
    background: #95a5a6;
    border-color: #95a5a6;
  }

  &.rating-4.selected {
    background: #3498db;
    border-color: #3498db;
  }

  &.rating-5.selected {
    background: #27ae60;
    border-color: #27ae60;
  }
}

.option-label {
  @include flex-center;
  width: 32px;
  height: 32px;
  background: var(--accent-blue);
  color: white;
  border-radius: 50%;
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.option-text {
  flex: 1;
  font-size: var(--fs-body);
  color: var(--text-primary);
  line-height: 1.6;
  font-weight: 500;
}

// ナビゲーション部分
.navigation-section {
  @include flex-between;
  gap: var(--space-md);
}

.nav-button {
  @include button-secondary;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.results-ready {
    @include button-primary;
  }
}

// プログレス表示
.progress-indicator {
  flex: 1;
  @include flex-center;
}

.progress-dots {
  @include flex-row(var(--space-xs));
  align-items: center;
}

.progress-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--bg-tertiary);
  transition: all var(--transition-fast);

  &.completed {
    background: var(--accent-blue);
    transform: scale(1.2);
  }

  &.current {
    background: var(--accent-gold);
    transform: scale(1.4);
    box-shadow: 0 0 8px rgba(184, 134, 11, 0.3);
  }
}

// 固定プログレスバー
.progress-section-fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--border-light);
  padding: var(--space-sm) var(--space-md);
  z-index: 100;
}

.progress-content {
  @include container(900px);
  @include flex-row(var(--space-md));
  align-items: center;

  p {
    font-family: var(--font-mono);
    font-size: var(--fs-small);
    color: var(--text-secondary);
    margin: 0;
    white-space: nowrap;
  }
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: var(--bg-tertiary);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-blue), var(--accent-gold));
  border-radius: 3px;
  transition: width var(--transition-normal);
}

// メインレスポンシブデザイン
@include respond-to('tablet') {
  .diagnosis-container {
    padding: var(--space-md) var(--space-sm);
  }

  .diagnosis-content {
    @include card-padding(lg);
  }

  .question-title {
    font-size: 1.5rem;
  }

  // 5段階評価のモバイル対応
  .options-list {
    gap: var(--space-md);
  }
  
  .option-item {
    @include card-padding(md);
  }
  
  .option-header {
    @include flex-column(var(--space-sm));
    text-align: center;
  }
  
  .scale-buttons {
    max-width: 280px;
  }
  
  .rating-button {
    width: 45px;
    height: 45px;
    font-size: 0.875rem;
  }

  .navigation-section {
    @include flex-column(var(--space-sm));
    width: 100%;
  }

  .nav-button {
    width: 100%;
    justify-content: center;
  }

  .progress-indicator {
    order: -1;
    margin-bottom: var(--space-sm);
  }
}

@include respond-to('mobile') {
  .question-meta {
    @include flex-column(var(--space-xs));
  }

  // 極小画面での5段階評価対応
  .scale-buttons {
    max-width: 250px;
    gap: 2px;
  }
  
  .rating-button {
    width: 40px;
    height: 40px;
    font-size: 0.8125rem;
  }
  
  .option-label {
    width: 28px;
    height: 28px;
    font-size: 0.75rem;
  }
  
  .scale-labels {
    font-size: 0.75rem;
  }

  .progress-content {
    @include flex-column(var(--space-xs));
    text-align: center;

    p {
      white-space: normal;
    }
  }
}

// タッチデバイス最適化
@media (hover: none) and (pointer: coarse) {
  .rating-button {
    &:hover {
      transform: none;
      border-color: var(--border-light);
      background: var(--bg-primary);
    }

    &:active {
      transform: scale(0.95);
    }
    
    &.selected:active {
      transform: scale(1.1);
    }
  }
}

// 結果表示画面
.result-section {
  @include container(1000px);
}

// 結果ヘッダー
.result-header {
  @include section-padding;
  text-align: center;
  margin-bottom: var(--space-xxl);
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  border-radius: 12px;
  border: 1px solid var(--border-light);
}

.completion-badge {
  @include flex-row(var(--space-xs));
  background: var(--accent-blue);
  color: white;
  padding: var(--space-xs) var(--space-md);
  border-radius: 20px;
  font-size: var(--fs-small);
  font-weight: 500;
  margin-bottom: var(--space-md);
}

.result-title {
  font-family: var(--font-heading);
  font-size: var(--fs-h1);
  color: var(--primary-navy);
  margin-bottom: var(--space-sm);
  font-weight: 700;
}

.result-subtitle {
  color: var(--text-secondary);
  font-size: var(--fs-body);
  line-height: 1.6;
  margin: 0;
}

// 結果カードグリッド
.results-grid {
  @include flex-column(var(--space-xl));
  margin-bottom: var(--space-xxl);
}

.profession-card {
  @include card-base;
  @include card-shadow(md);
  @include card-padding(xl);
  transition: all var(--transition-normal);
  position: relative;

  &.rank-1 {
    border-left: 4px solid var(--accent-gold);
    @include card-shadow(lg);
  }

  &.rank-2 {
    border-left: 4px solid #c0c0c0;
  }

  &.rank-3 {
    border-left: 4px solid #cd7f32;
  }
}

// カードヘッダー
.card-header {
  @include flex-between;
  margin-bottom: var(--space-lg);
}

.rank-section {
  @include flex-row(var(--space-md));
  align-items: center;
}

.rank-badge {
  @include flex-center;
  width: 40px;
  height: 40px;
  background: var(--accent-blue);
  color: white;
  border-radius: 50%;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 1.25rem;
}

.profession-card.rank-1 .rank-badge {
  background: var(--accent-gold);
}

.rank-label {
  @include flex-column;
}

.rank-title {
  font-size: var(--fs-small);
  color: var(--text-secondary);
  font-weight: 500;
}

// スコア円グラフ
.score-circle {
  position: relative;
  @include flex-center;
}

.score-text {
  position: absolute;
  @include flex-center;
  flex-direction: column;
  text-align: center;
}

.score-value {
  font-family: var(--font-mono);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-navy);
  line-height: 1;
}

.score-unit {
  font-size: 0.75rem;
  color: var(--text-secondary);
  line-height: 1;
}

/* 職業名 */
.profession-name {
  font-family: var(--font-heading);
  font-size: var(--fs-h2);
  color: var(--primary-navy);
  margin-bottom: var(--space-lg);
  font-weight: 600;
}

// カテゴリー分析
.category-analysis {
  margin-bottom: var(--space-lg);
}

.analysis-title {
  @include flex-row(var(--space-xs));
  font-size: 1.125rem;
  color: var(--primary-navy);
  margin-bottom: var(--space-md);
  font-weight: 600;
}

.category-grid {
  @include grid-columns(1);
  gap: var(--space-md);
}

.category-item {
  background: var(--bg-secondary);
  padding: var(--space-md);
  border-radius: 8px;
}

.category-header {
  @include flex-between;
  margin-bottom: var(--space-xs);
}

.category-name {
  font-size: var(--fs-small);
  color: var(--text-primary);
  font-weight: 500;
}

.category-score {
  font-family: var(--font-mono);
  font-size: var(--fs-small);
  color: var(--accent-blue);
  font-weight: 600;
}

.category-bar {
  height: 6px;
  background: var(--bg-tertiary);
  border-radius: 3px;
  overflow: hidden;
}

.category-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-blue), var(--accent-gold));
  border-radius: 3px;
  transition: width var(--transition-normal);
}

/* 職業詳細 */
.profession-details {
  margin-bottom: var(--space-lg);
}

.detail-section {
  margin-bottom: var(--space-md);
}

.detail-title {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: 1rem;
  color: var(--primary-navy);
  margin-bottom: var(--space-sm);
  font-weight: 600;
}

.detail-content {
  color: var(--text-primary);
  line-height: 1.7;
  margin: 0;
}

.income-value {
  font-family: var(--font-mono);
  font-size: 1.125rem;
  color: var(--accent-gold);
  font-weight: 600;
  margin: 0;
}

/* 詳細リンクボタン */
.detail-link-button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  color: var(--accent-blue);
  text-decoration: none;
  font-weight: 500;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--accent-blue);
  border-radius: 6px;
  transition: all var(--transition-fast);
}

.detail-link-button:hover {
  background: var(--accent-blue);
  color: white;
  transform: translateY(-1px);
}

/* セクション共通スタイル */
.section-header {
  text-align: center;
  margin-bottom: var(--space-xl);
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  font-family: var(--font-heading);
  font-size: var(--fs-h2);
  color: var(--primary-navy);
  margin-bottom: var(--space-sm);
  font-weight: 600;
}

.section-subtitle {
  color: var(--text-secondary);
  font-size: var(--fs-body);
  margin: 0;
}

// シェア機能
.share-section {
  margin-bottom: var(--space-xxl);
  @include card-padding(xl);
  background: var(--bg-secondary);
  border-radius: 12px;
}

.share-grid {
  @include grid-auto-fit(250px);
  gap: var(--space-md);
}

.share-card {
  @include card-base;
  @include flex-row(var(--space-md));
  @include card-padding(lg);
  text-align: left;
  cursor: pointer;
  
  &:hover {
    @include card-shadow(md);
    transform: translateY(-2px);
  }
}

.share-icon {
  @include flex-center;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: var(--bg-secondary);
}

.platform-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.share-content {
  h4 {
    font-size: 1rem;
    color: var(--primary-navy);
    margin-bottom: var(--space-xs);
    font-weight: 600;
  }

  p {
    font-size: var(--fs-small);
    color: var(--text-secondary);
    margin: 0;
  }
}

// プレミアム機能
.premium-section {
  margin-bottom: var(--space-xxl);
}

.premium-card {
  background: linear-gradient(135deg, var(--primary-navy) 0%, var(--primary-blue) 100%);
  color: white;
  border-radius: 12px;
  @include card-padding(xl);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 100px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    transform: translate(50%, -50%);
  }
}

.premium-header {
  @include flex-row(var(--space-lg));
  margin-bottom: var(--space-lg);
}

.premium-icon {
  @include flex-center;
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  flex-shrink: 0;
}

.premium-content {
  flex: 1;
}

.premium-title {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  margin-bottom: var(--space-xs);
  font-weight: 600;
}

.premium-subtitle {
  opacity: 0.8;
  font-size: var(--fs-body);
  margin: 0;
}

.premium-price {
  text-align: right;
}

.price-amount {
  font-family: var(--font-mono);
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
}

.price-tax {
  font-size: var(--fs-small);
  opacity: 0.8;
}

.premium-features {
  @include grid-columns(1);
  gap: var(--space-sm);
  margin-bottom: var(--space-xl);
}

.feature-item {
  @include flex-row(var(--space-sm));
  font-size: var(--fs-body);
}

.premium-button {
  @include button-base;
  width: 100%;
  @include flex-center;
  gap: var(--space-sm);
  background: white;
  color: var(--primary-navy);
  font-size: 1.125rem;
  font-weight: 600;
  padding: var(--space-md) var(--space-lg);

  &:hover {
    background: var(--bg-secondary);
    transform: translateY(-2px);
  }
}

// アクション機能
.action-section {
  margin-bottom: var(--space-xl);
}

.action-grid {
  @include grid-auto-fit(200px);
  gap: var(--space-md);
}

.action-button {
  @include button-secondary;
  @include flex-row(var(--space-sm));
  justify-content: center;
  
  &.primary-action {
    @include button-primary;
  }

  &:hover {
    transform: translateY(-2px);
    @include card-shadow(md);
  }
}

// 結果表示のレスポンシブデザイン
@include respond-to('tablet') {
  .result-header {
    @include card-padding(lg);
  }

  .card-header {
    @include flex-column(var(--space-md));
    text-align: center;
  }

  .share-grid {
    @include grid-columns(1);
  }

  .premium-header {
    @include flex-column(var(--space-md));
    text-align: center;
  }

  .premium-price {
    text-align: center;
  }
}

@include respond-to('mobile') {
  .profession-card {
    @include card-padding(lg);
  }

  .share-card {
    @include card-padding(md);
  }

  .premium-card {
    @include card-padding(lg);
  }

  .action-grid {
    @include grid-columns(1);
  }
}

// =====================================================
// レガシーコード - 段階的削除対象
// =====================================================
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
  width: 100%;
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
.purchase-section {
  margin: 3rem auto;
  padding: 2.5rem;
  background: linear-gradient(135deg, #f7f9fc 0%, #f1f5f9 100%);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 2px solid var(--main-color);
  max-width: 600px;
}

.purchase-title {
  color: var(--text-dark);
  font-size: clamp(18px, 3vw, 32px);
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
  font-family: 'Hiragino Sans', sans-serif;
}

.purchase-description {
  color: var(--text-dark);
  font-size: clamp(14px, 2vw, 18px);
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.8;
}

.purchase-features {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.purchase-features li {
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  font-size: clamp(13px, 1.8vw, 16px);
  font-weight: 500;
  color: var(--text-dark);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.purchase-button {
  background: linear-gradient(135deg, var(--main-color), #4a7ba7);
  color: white;
  font-size: clamp(16px, 2.5vw, 22px);
  font-weight: 700;
  padding: 1.5rem 3rem;
  border-radius: 50px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  display: block;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(95, 144, 178, 0.3);
}

.purchase-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(95, 144, 178, 0.4);
  background: linear-gradient(135deg, #4a7ba7, var(--main-color));
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

/* プログレスバーが表示される時のみ下部パディングを追加 */
.diagnosis-container.has-progress {
  padding-bottom: 100px;
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