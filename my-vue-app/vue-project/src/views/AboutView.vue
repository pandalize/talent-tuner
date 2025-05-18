<template>
  <div class="about">
    <h1>職業情報</h1>
    <div class="about-content">
      <p>このページでは、診断で表示される職業の詳細な説明を確認できます。</p>
      <p>以下の職業から選択してください：</p>
      
      <div class="profession-selector">
        <button
          v-for="profession in professions"
          :key="profession.id"
          @click="selectedProfession = profession.value"
          :class="{ active: selectedProfession === profession.value }"
        >
          {{ profession.label }}
        </button>
      </div>
      
      <div v-if="loading" class="loading-container">
        <p>職業データを読み込んでいます...</p>
      </div>
      
      <div v-else-if="error" class="error-container">
        <p>{{ error }}</p>
        <button @click="loadProfessionData" class="reload-button">再読み込み</button>
      </div>
      
      <div v-else class="profession-description">
        <h2>{{ selectedProfession }}</h2>
        <div class="description-content">
          <p>{{ getProfessionComment(selectedProfession) }}</p>
        </div>
        
        <div class="characteristics">
          <h3>この職業に向いている人の特徴:</h3>
          <ul>
            <li v-for="(trait, index) in getProfessionTraits(selectedProfession)" :key="index">{{ trait }}</li>
          </ul>
        </div>
        
        <div class="requirements">
          <h3>必要なスキルと適性:</h3>
          <div class="category-scores">
            <div 
              v-for="(weight, category) in categoryWeights" 
              :key="category"
              class="category-bar"
            >
              <div class="category-label">{{ getCategoryLabel(category) }}</div>
              <div class="bar-container">
                <div class="bar-fill" :style="{ width: `${(weight / getMaxWeight()) * 100}%` }"></div>
              </div>
              <div class="category-score">{{ weight }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="config-info">
        <h3>データの管理について</h3>
        <p>職業の情報は <code>/diagnostic_config.json</code> ファイルで管理されています。</p>
        <p>このJSONファイルを編集することで、職業の説明、質問、選択肢、カテゴリーウェイトなどを変更したり、新しい職業を追加したりすることができます。</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { loadDiagnosticConfig, type DiagnosticConfig } from '../utils/diagnosisLoader';

const professions = [
  { id: 1, label: 'プログラマー', value: 'プログラマー' },
  { id: 2, label: '公認会計士', value: '公認会計士' },
  { id: 3, label: '建設業', value: '建設業' },
  { id: 4, label: 'デイトレーダー', value: 'デイトレーダー' },
  { id: 5, label: '起業家', value: '起業家' },
  { id: 6, label: 'ワーホリ', value: 'ワーホリ' },
  { id: 7, label: 'ホスト', value: 'ホスト' },
  { id: 8, label: 'キャバ嬢', value: 'キャバ嬢' },
  { id: 9, label: 'インフルエンサー', value: 'インフルエンサー' },
  { id: 10, label: '難関大進学', value: '難関大進学' }
];

const selectedProfession = ref('プログラマー');
const config = ref<DiagnosticConfig | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const categoryWeights = ref<Record<string, number>>({
  'skill': 1.0,
  'motivation': 1.0,
  'environment': 1.0,
  'personality': 1.0
});

// 設定を読み込む
async function loadProfessionData() {
  try {
    loading.value = true;
    error.value = null;
    config.value = await loadDiagnosticConfig();
    categoryWeights.value = config.value.category_weights;
    loading.value = false;
  } catch (err) {
    console.error('設定の読み込みに失敗しました:', err);
    error.value = '職業データの読み込みに失敗しました。もう一度お試しください。';
    loading.value = false;
  }
}

// カテゴリーラベルを取得
function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    'skill': 'スキル',
    'motivation': 'モチベーション',
    'environment': '環境適応',
    'personality': '性格'
  };
  return labels[category] || category;
}

// 最大ウェイトを取得
function getMaxWeight(): number {
  return Math.max(...Object.values(categoryWeights.value), 1);
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
  };
  return comments[professionName] || 'この職業に関する詳細情報はまだ登録されていません。';
}

// 職業の特徴を取得
function getProfessionTraits(professionName: string): string[] {
  const traits: Record<string, string[]> = {
    'プログラマー': [
      '論理的思考が得意',
      '長時間座って作業できる集中力がある',
      '一人で黙々と作業するのが苦にならない',
      '新しい技術に興味がある'
    ],
    '公認会計士': [
      '細かい数字を正確に扱える',
      '計画的に物事を進められる',
      '安定志向で堅実',
      'コンプライアンスを重視する'
    ],
    '建設業': [
      '体力がある',
      '指示に従って作業できる',
      '高所作業に抵抗がない',
      '手に職をつけたい'
    ],
    'デイトレーダー': [
      'リスクを恐れない',
      '即断即決できる',
      'ストレス耐性が高い',
      '数字やチャートを分析するのが得意'
    ],
    '起業家': [
      '自分の考えを形にしたい',
      'リスクを取ることを恐れない',
      'リーダーシップがある',
      '新しいことに挑戦するのが好き'
    ],
    'ワーホリ': [
      '海外や異文化に興味がある',
      '計画よりも行動が先',
      '適応力がある',
      '今を楽しみたい'
    ],
    'ホスト': [
      '人と話すのが好き',
      '自分を演出するのが得意',
      '夜型の生活リズムに適応できる',
      '感情労働が苦にならない'
    ],
    'キャバ嬢': [
      '人の機嫌を取るのが上手',
      '自分を魅力的に見せられる',
      '夜型の生活リズムに適応できる',
      '感情労働が苦にならない'
    ],
    'インフルエンサー': [
      '自己アピールが得意',
      '流行に敏感',
      'SNSでの発信力がある',
      '自分をブランド化できる'
    ],
    '難関大進学': [
      '地道な努力ができる',
      '計画的に物事を進められる',
      '学術的な内容に興味がある',
      '長期的な目標に向かって頑張れる'
    ]
  };
  return traits[professionName] || ['情報がありません'];
}

// コンポーネントがマウントされたときに設定を読み込む
onMounted(() => {
  loadProfessionData();
});
</script>

<style>
.about {
  width: 100%;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
}

.about-content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.about-content p {
  text-align: center;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: #666;
}

.profession-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1.5rem 0;
  justify-content: center;
}

.profession-selector button {
  padding: 0.5rem 1rem;
  background-color: #e0e0e0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.9rem;
}

.profession-selector button:hover {
  background-color: #d0d0d0;
}

.profession-selector button.active {
  background-color: #4CAF50;
  color: white;
}

.loading-container, .error-container {
  text-align: center;
  padding: 3rem 1rem;
  margin: 2rem 0;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.error-container {
  background-color: #fff0f0;
}

.error-container p {
  color: #d32f2f;
}

.reload-button {
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 0.9rem;
}

.profession-description {
  margin: 2rem 0;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.profession-description h2 {
  color: #4CAF50;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.5rem;
  border-bottom: 2px solid #4CAF50;
  padding-bottom: 0.5rem;
}

.description-content {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.description-content p {
  text-align: justify;
  color: #555;
}

.characteristics, .requirements {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 6px;
}

.characteristics h3, .requirements h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  border-left: 3px solid #4CAF50;
  padding-left: 0.5rem;
}

.characteristics ul {
  padding-left: 1.5rem;
}

.characteristics li {
  margin-bottom: 0.5rem;
  line-height: 1.4;
  color: #555;
}

.category-scores {
  margin-top: 1rem;
}

.category-bar {
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
}

.category-label {
  width: 120px;
  text-align: right;
  padding-right: 1rem;
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
  background-color: #4CAF50;
  transition: width 0.5s ease;
}

.category-score {
  width: 30px;
  text-align: right;
  padding-left: 0.5rem;
  font-size: 0.9rem;
  color: #666;
  font-weight: bold;
}

.config-info {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #e8f5e9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.config-info h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.2rem;
}

.config-info p {
  text-align: center;
  margin-bottom: 0.8rem;
  line-height: 1.6;
  color: #555;
}

.config-info code {
  background-color: #f1f1f1;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: monospace;
  color: #d32f2f;
}

/* スマートフォン向け */
@media (max-width: 768px) {
  .about {
    padding: 1rem;
  }
  
  .about-content {
    padding: 1rem;
  }
  
  .profession-selector {
    flex-direction: column;
    align-items: center;
  }
  
  .profession-selector button {
    width: 100%;
    max-width: 300px;
    margin-bottom: 0.5rem;
  }
  
  .category-bar {
    flex-wrap: wrap;
  }
  
  .category-label {
    width: 100%;
    text-align: left;
    padding-right: 0;
    margin-bottom: 0.2rem;
  }
  
  .config-info {
    padding: 1rem;
  }
  
  .config-info h3 {
    font-size: 1.1rem;
  }
}

/* タブレット向け */
@media (min-width: 769px) and (max-width: 1024px) {
  .about-content {
    max-width: 90%;
  }
}

/* 大画面向け */
@media (min-width: 1025px) {
  .about-content {
    max-width: 1200px;
  }
}
</style>
