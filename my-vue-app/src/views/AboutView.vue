<template>
  <div class="about">
    <div class="about-content">
      <h1>あなたもどれかには就ける高収入職業</h1>
      
      <div class="profession-selector">
        <button
          v-for="profession in professions"
          :key="profession.id"
          @click="selectedProfessionValue = profession.value"
          :class="{ active: selectedProfessionValue === profession.value }"
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
        <h2>{{ selectedProfessionValue }}</h2>
        <div class="description-content">
          <p>{{ getProfessionComment(selectedProfessionValue) }}</p>
        </div>
        
        <div class="characteristics">
          <h3>この職業に向いている人の特徴：</h3>
          <ul>
            <li v-for="(trait, index) in getProfessionTraits(selectedProfessionValue)" :key="index">
              {{ trait }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { loadProfessionDatabase, type ProfessionDatabase } from '../utils/diagnosisLoader';

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

const selectedProfessionValue = ref('プログラマー');
const loading = ref(true);
const error = ref<string | null>(null);
const professionDatabase = ref<ProfessionDatabase | null>(null);

// 設定を読み込む
async function loadProfessionData() {
  try {
    loading.value = true;
    error.value = null;
    
    // 職業データベースを読み込み
    const data = await loadProfessionDatabase();
    professionDatabase.value = data;
    
    loading.value = false;
  } catch (err) {
    console.error('設定の読み込みに失敗しました:', err);
    error.value = '職業データの読み込みに失敗しました。もう一度お試しください。';
    loading.value = false;
  }
}

// 職業に対するコメントを取得
function getProfessionComment(professionName: string): string {
  if (!professionDatabase.value) {
    return 'この職業に関する詳細情報はまだ登録されていません。';
  }
  
  const professionData = professionDatabase.value.professions[professionName];
  return professionData?.comment || 'この職業に関する詳細情報はまだ登録されていません。';
}

// 職業の特徴を取得
function getProfessionTraits(professionName: string): string[] {
  if (!professionDatabase.value) {
    return ['情報がありません'];
  }
  
  const professionData = professionDatabase.value.professions[professionName];
  return professionData?.traits || ['情報がありません'];
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


.about-content {
  width: 95%;
  max-width: 1000px;
  background-color: var(--background-white);
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  overflow-x: hidden;
  border: none;
  position: relative;
}

.about-content h1 {
  color: var(--text-dark);
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: clamp(15px, 3vw, 30px);
  font-weight: 600;
  font-family: 'Hiragino Sans', sans-serif;
}

.profession-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1.5rem 0;
  justify-content: center;
}

.profession-selector button {
  padding: 0.8rem 1.5rem;
  background-color: var(--light-pink);
  border: 2px solid transparent;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-family: 'Hiragino Sans', sans-serif;
  color: var(--text-dark);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  margin: 0.4rem;
  font-weight: 500;
}

.profession-selector button:hover {
  background-color: var(--orange-beige);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(230, 188, 153, 0.3);
  border-color: var(--orange-beige);
}

.profession-selector button.active {
  background-color: var(--main-color);
  color: var(--background-white);
  box-shadow: 0 8px 20px rgba(95, 144, 178, 0.4);
  border-color: var(--main-color);
  transform: translateY(-2px);
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
  margin-top: 2rem 0;
  padding: 2rem;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
}

.profession-description::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  background: var(--light-blue);
  opacity: 0.1;
  border-radius: 0 0 0 100%;
}

h2 {
  color: var(--main-color);
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.5rem;
  border-bottom: 2px solid var(--main-color);
  padding-bottom: 0.5rem;
}

h3 {
  color: var(--text-dark);
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.description-content {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.description-content p {
  text-align: justify;
  color: var(--text-dark);
  font-size: clamp(15px, 2vw, 20px);
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.characteristics ul {
  padding-left: 1.5rem;
  list-style-type: none;
}

.characteristics li {
  margin-bottom: 0.8rem;
  line-height: 1.4;
  color: var(--text-dark);
  font-size: 1.1rem;
  position: relative;
  padding-left: 1.5rem;
}

.characteristics li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--main-color);
  font-weight: bold;
}

.category-scores {
  margin-top: 1rem;
}

.category-bar {
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
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
}

.category-score {
  width: 30px;
  text-align: right;
  padding-left: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-dark);
  font-weight: bold;
}

/* スマートフォン向け */
@media (max-width: 456px) {
  .about {
    padding: 1rem;
  }
  
  .about-content {
    padding: 1rem;
  }
  
  .profession-selector {
    align-items: center;
  }
  
  .profession-selector button {
    width: 40%;
    max-width: 300px;
    margin-bottom: 0.5rem;
  }
  
  .category-bar {
    flex-wrap: wrap;
  }
}

/* タブレット向け */
@media (min-width: 769px) and (max-width: 1024px) {
  .about {
    padding: 1rem;
  }

  .about-content {
    max-width: 90%;
  }
}

/* 大画面向け */
@media (min-width: 1025px) {
  .about {
    padding: 1rem;
  }

  .about-content {
    max-width: 1200px;
  }
}
</style>
