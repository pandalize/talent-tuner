<template>
  <div class="about">
    <div class="about-content">
      <h1>あなたもどれかには就ける高収入職業</h1>
      
      <div class="profession-selector">
        <button
          v-for="profession in professions"
          :key="profession.id"
          @click="selectedProfessionName = profession.name"
          :class="{ active: selectedProfessionName === profession.name }"
        >
          {{ profession.name }}
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
        <h2>{{ selectedProfessionName }}</h2>
        <div class="description-content">
          <p>{{ professionJobDetails }}</p>
        </div>
        
        <div class="characteristics">
          <h3>この職業に向いている人の特徴：</h3>
          <ul>
            <li v-for="(trait, index) in professionTraits" :key="index">
              {{ trait }}
            </li>
          </ul>
        </div>
        
        <div class="profession-actions">
          <router-link 
            :to="`/profession/${selectedProfessionId}`" 
            class="detail-button"
            v-if="selectedProfessionId"
          >
            詳細情報を見る
          </router-link>
          <router-link to="/diagnosis" class="diagnosis-button">
            適性診断を受ける
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { professionDataManager } from '../utils/professionDataManager';
import type { ProfessionData } from '../utils/diagnosisLoader';

const professions = ref<ProfessionData[]>([]);
const selectedProfessionName = ref('');
const loading = ref(true);
const error = ref<string | null>(null);

async function loadProfessionData() {
  loading.value = true;
  error.value = null;
  try {
    await professionDataManager.initialize();
    professions.value = professionDataManager.getAllProfessions();
    
    // 最初の職業を選択状態にする
    if (professions.value.length > 0) {
      selectedProfessionName.value = professions.value[0].name;
    }
  } catch (err) {
    console.error('職業データの読み込みに失敗しました:', err);
    error.value = '職業データの読み込みに失敗しました。もう一度お試しください。';
  } finally {
    loading.value = false;
  }
}

const selectedProfessionData = computed(() => {
  if (!selectedProfessionName.value || professions.value.length === 0) return null;
  return professions.value.find((p: ProfessionData) => p.name === selectedProfessionName.value);
});

const professionJobDetails = computed<string>(() => {
  return selectedProfessionData.value?.jobDetails || 'この職業に関する詳細情報は現在準備中です。診断ページで適性をチェックしてみてください。';
});

const professionTraits = computed<string[]>(() => {
  return selectedProfessionData.value?.traits || [
    '詳細な特徴情報は準備中ですが、この職業はあなたの適性に合う可能性があります',
    '診断ページで詳しくチェックしてみることをおすすめします'
  ];
});

const selectedProfessionId = computed<string>(() => {
  return selectedProfessionData.value?.id || '';
});

onMounted(loadProfessionData);
</script>

<style scoped>
/* ==========================================================================
   基本レイアウト
   ========================================================================== */
.about {
  width: 100%;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.about-content {
  width: 70%;
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
  line-height: 1.6;
}

/* ==========================================================================
   職業セレクター
   ========================================================================== */
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
  font-size: clamp(10px, 1.3vw, 20px);
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

/* ==========================================================================
   状態別コンテナ (ローディング, エラー)
   ========================================================================== */
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

/* ==========================================================================
   職業詳細説明
   ========================================================================== */
.profession-description {
  margin-top: 2rem;
  padding: 1.5rem;
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

.profession-description h2 {
  color: var(--main-color);
  margin-bottom: 1rem;
  text-align: center;
  font-size: clamp(18px, 3.5vw, 30px);
  border-bottom: 2px solid var(--main-color);
  padding-bottom: 0.5rem;
}

.description-content {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.description-content p {
  text-align: justify;
  color: var(--text-dark);
  font-size: var(--fontsize-text);
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.characteristics h3 {
  color: var(--text-dark);
  margin-bottom: 1rem;
  font-size: clamp(12px, 1.7vw, 20px);
}

.characteristics ul {
  padding-left: 1.5rem;
  list-style-type: '✓ ';
  color: var(--main-color);
}

.characteristics li {
  margin-bottom: 0.8rem;
  color: var(--text-dark);
  font-size: var(--fontsize-text);
  position: relative;
  padding-left: 0.5rem;
}

/* ==========================================================================
   職業アクション
   ========================================================================== */
.profession-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: center;
  align-items: center;
}

.detail-button,
.diagnosis-button {
  display: inline-block;
  padding: 1rem 2rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  text-align: center;
  transition: all 0.3s ease;
  font-size: clamp(12px, 1.2vw, 16px);
  min-width: 160px;
}

.detail-button {
  background: var(--main-color);
  color: white;
  border: 2px solid var(--main-color);
}

.detail-button:hover {
  background: white;
  color: var(--main-color);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(95, 144, 178, 0.3);
}

.diagnosis-button {
  background: var(--orange-beige);
  color: var(--text-dark);
  border: 2px solid var(--orange-beige);
}

.diagnosis-button:hover {
  background: white;
  color: var(--orange-beige);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(230, 188, 153, 0.3);
}

/* ==========================================================================
   メディアクエリ (レスポンシブ対応)
   ========================================================================== */
/* スマートフォン向け */
@media (max-width: 456px) {
  .about {
    padding: 1rem;
  }
  
  .about-content {
    width: 100%;
    padding: 1rem;
  }
  
  .profession-selector {
    align-items: center;
  }
  
  .profession-selector button {
    width: 40%;
    max-width: 300px;
    margin: 0.3rem;
    padding: 0.5rem;
  }
  
  .characteristics h3 {
    margin-bottom: 0.5rem;
  }
  
  .characteristics ul {
    padding-left: 0.5rem;
  }

  .characteristics li {
    margin-bottom: 0.5rem;
  }
  
  .profession-actions {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .detail-button,
  .diagnosis-button {
    width: 100%;
    max-width: 300px;
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