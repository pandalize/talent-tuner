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
        
        <div v-if="!showResult">
          <h5>正直に答えてください。最適な職業を診断します。</h5>
          <div v-for="question in questions" :key="question.id" class="question-section">
            <h2>{{ question.id }}：{{ question.text }}</h2>
            <!-- <p>{{ question.text }}</p> -->
            <div class="options">
              <button
                v-for="option in question.options"
                :key="option.label"
                @click="selectOption(question.id, option.label)"
                :class="{ selected: answers[question.id] === option.label }"
              >
                {{ option.text }}
              </button>
            </div>
          </div>
          
          <div class="progress-section">
            <p>回答済み: {{ Object.keys(answers).length }} / {{ questions.length }}</p>
            <div class="progress-bar">
              <div
                class="progress-fill"
                :style="{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }"
              ></div>
            </div>
          </div>
          
          <button
            v-if="Object.keys(answers).length === questions.length"
            @click="calculateResult"
            class="calculate-button"
          >
            診断結果を見る
          </button>
        </div>
        
        <div v-if="showResult" class="result-section">
          <h5>診断結果</h5>
          <p>あなたに合う職業は・・・</p>
          
          <div v-for="(profession, index) in topProfessions" :key="profession.name" class="result-box">
            <h3>{{ profession.name }}</h3>
            
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
                    <div class="bar-fill" :style="{ width: `${(score / getMaxCategoryScore(profession)) * 100}%` }"></div>
                  </div>
                  <div class="category-score">{{ score }}</div>
                </div>
              </div>
            </div>
            
            <div class="profession-comment">
              <p>{{ getProfessionComment(profession.name) }}</p>
            </div>
          </div>
          
          <div class="action-buttons">
            <button @click="resetDiagnosis" class="reset-button">もう一度診断する</button>
            <button @click="goHome" class="home-button">ホームに戻る</button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  loadDiagnosticConfig,
  calculateProfessionScores,
  getTopProfessions,
  type DiagnosticConfig,
  type Question,
  type ProfessionScore
} from '../utils/diagnosisLoader'

const router = useRouter()
const config = ref<DiagnosticConfig | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const answers = ref<Record<string, string>>({})
const showResult = ref(false)
const topProfessions = ref<ProfessionScore[]>([])

// 質問のリスト
const questions = computed<Question[]>(() => {
  return config.value?.questions || []
})

// 設定を読み込む
async function loadConfig() {
  try {
    loading.value = true
    error.value = null
    config.value = await loadDiagnosticConfig()
    loading.value = false
  } catch (err) {
    console.error('設定の読み込みに失敗しました:', err)
    error.value = '診断データの読み込みに失敗しました。もう一度お試しください。'
    loading.value = false
  }
}

// 選択肢を選択
function selectOption(questionId: string, label: string) {
  answers.value[questionId] = label
}

// 診断結果を計算
function calculateResult() {
  if (!config.value) return
  
  // 職業スコアを計算
  const scores = calculateProfessionScores(config.value, answers.value)
  
  // 上位の職業を取得
  const topN = config.value.threshold.recommend_top_n || 3
  topProfessions.value = getTopProfessions(scores, topN)
  
  // 結果を表示
  showResult.value = true
}

// カテゴリーの最大スコアを取得
function getMaxCategoryScore(profession: ProfessionScore): number {
  return Math.max(...Object.values(profession.categories), 1)
}

// カテゴリーラベルを取得
function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    'skill': 'スキル',
    'motivation': 'モチベーション',
    'environment': '環境適応',
    'personality': '性格'
  }
  return labels[category] || category
}

// 職業に対するコメントを取得
function getProfessionComment(professionName: string): string {
  const comments: Record<string, string> = {
    'プログラマー': 'コードを書くのが好きなあなたは、社会性が低くても稼げる職業に向いています。人間関係のストレスが少ない環境で、論理的思考を活かせるでしょう。',
    '公認会計士': '細かい数字を扱うのが得意なあなたは、堅実で地味な仕事に向いています。安定志向で、リスクを取るのが苦手な性格が表れています。',
    '建設業': '指示に従って黙々と作業するのが得意なあなたは、体力仕事に向いています。知的な仕事より、手に職をつけるタイプでしょう。',
    'デイトレーダー': 'リスクを恐れず即断即決できるあなたは、ギャンブル的な要素のある仕事に向いています。ただし、失敗したときのメンタルの強さも必要です。',
    '起業家': '自分の考えを形にしたいあなたは、リスクを取って挑戦する起業家タイプです。ただし、成功率は低いので覚悟が必要です。',
    'ワーホリ': '計画性がなく、その場の勢いで行動するあなたは、将来のキャリアよりも今を楽しむタイプです。長期的な視点が欠けていますが、人生経験は豊かになるでしょう。',
    'ホスト': '人と話すのが好きで、自分を演出するのが得意なあなたは、見た目と話術で稼ぐ仕事に向いています。深い専門知識は必要ありません。',
    'キャバ嬢': '人の機嫌を取るのが上手で、自分を魅力的に見せられるあなたは、感情労働で高収入を得られる仕事に向いています。',
    'インフルエンサー': '自己アピールが得意で、流行に敏感なあなたは、SNSでの発信力を活かせる仕事に向いています。ただし、安定性には欠けるでしょう。',
    '難関大進学': '地道な努力ができ、計画的に物事を進められるあなたは、学術的な道に向いています。ただし、社会に出てからのギャップに注意が必要です。'
  }
  return comments[professionName] || 'あなたの特性に合った職業です。自分の強みを活かして頑張りましょう。'
}

// 診断をリセット
function resetDiagnosis() {
  answers.value = {}
  showResult.value = false
  topProfessions.value = []
}

// ホームに戻る
function goHome() {
  router.push('/')
}

// コンポーネントがマウントされたときに設定を読み込む
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
  padding: 3rem;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  overflow-x: hidden;
  border: none;
  position: relative;
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
  box-shadow: 0 5px 15px rgba(95, 144, 178, 0.3);
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
  border-radius: 25px;
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
  background-image: linear-gradient(to right, var(--main-color), var(--bright-blue));
  border-radius: 5px;
}

.calculate-button {
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

.calculate-button:hover {
  background-color: var(--accent-coral);
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(255, 107, 107, 0.4);
}

.result-section {
  border-radius: 8px;
}

.result-section h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.5rem;
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

.result-box:hover {
  transform: translateY(-5px);
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
  background-image: linear-gradient(to right, var(--main-color), var(--bright-blue));
}

.category-score {
  width: 30px;
  text-align: right;
  font-size: 0.9rem;
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

.reset-button, .home-button:hover {
  background-color: var(--accent-coral);
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(255, 107, 107, 0.4);
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
  }
  
  .category-bar {
    flex-wrap: wrap;
  }
  
  .category-label {
    width: 100%;
    text-align: left;
    margin-bottom: 0.2rem;
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
  
  .diagnosis-content {
    max-width: 1200px;
  }
  
  .options button {
    width: calc(25% - 1rem);
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