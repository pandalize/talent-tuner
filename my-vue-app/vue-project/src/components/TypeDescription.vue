<template>
  <div class="type-description">
    <h2>タイプの説明</h2>
    
    <!-- 読み込み中の表示 -->
    <div v-if="loading" class="loading-container">
      <p>データを読み込んでいます...</p>
    </div>
    
    <!-- エラー時の表示 -->
    <div v-else-if="errorMessage" class="error-container">
      <p>{{ errorMessage }}</p>
      <button @click="reloadData" class="reload-button">再読み込み</button>
    </div>
    
    <!-- データ表示 -->
    <div v-else class="description-card">
      <h3>{{ title }}</h3>
      <div class="description-content">
        <p>{{ description }}</p>
      </div>
      <div class="characteristics">
        <h4>特徴:</h4>
        <ul>
          <li v-for="(trait, index) in traits" :key="index">{{ trait }}</li>
        </ul>
      </div>
      <div class="recommendations">
        <h4>おすすめ:</h4>
        <ul>
          <li v-for="(recommendation, index) in recommendations" :key="index">{{ recommendation }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { loadTypesFromCSV, type TypeData, getTypeByName } from '../utils/csvLoader';

// プロパティの定義
interface Props {
  type: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: '未定義'
});

// 全タイプデータを保持する
const allTypes = ref<TypeData[]>([]);
// 読み込み中フラグ
const loading = ref(true);
// エラーメッセージ
const errorMessage = ref<string | null>(null);

// 現在選択されているタイプのデータ
const currentTypeData = computed(() => {
  if (allTypes.value.length === 0) {
    return null;
  }
  
  return getTypeByName(allTypes.value, props.type) || allTypes.value[0];
});

// タイトル
const title = computed(() => {
  return currentTypeData.value?.title || '情報が読み込まれていません';
});

// 説明
const description = computed(() => {
  return currentTypeData.value?.description || '情報が読み込まれていません';
});

// 特徴
const traits = computed(() => {
  return currentTypeData.value?.traits || [];
});

// おすすめ
const recommendations = computed(() => {
  return currentTypeData.value?.recommendations || [];
});

// データを再読み込みする関数
const reloadData = async () => {
  try {
    loading.value = true;
    errorMessage.value = null;
    
    // CSVファイルを読み込む
    allTypes.value = await loadTypesFromCSV('/data/types.csv');
    
    if (allTypes.value.length === 0) {
      errorMessage.value = 'タイプデータが見つかりませんでした。';
    }
  } catch (error) {
    console.error('タイプデータの読み込み中にエラーが発生しました:', error);
    errorMessage.value = 'データの読み込み中にエラーが発生しました。';
  } finally {
    loading.value = false;
  }
};

// コンポーネントがマウントされたときにCSVを読み込む
onMounted(() => {
  reloadData();
});
</script>

<style scoped>
.type-description {
  width: 100%;
  margin: 2rem 0;
  padding: 1rem;
  box-sizing: border-box;
}

.description-card, .loading-container, .error-container {
  width: 100%;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.loading-container p {
  color: #666;
  font-size: 1.1rem;
}

.error-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  background-color: #fff0f0;
}

.error-container p {
  color: #d32f2f;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.reload-button {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.reload-button:hover {
  background-color: #388e3c;
}

h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.5rem;
}

h3 {
  color: #4CAF50;
  margin-bottom: 1rem;
  border-bottom: 2px solid #4CAF50;
  padding-bottom: 0.5rem;
  text-align: center;
  font-size: 1.3rem;
}

.description-content {
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: #666;
}

.description-content p {
  text-align: justify;
}

.characteristics, .recommendations {
  margin-bottom: 1.5rem;
  background-color: #fff;
  border-radius: 6px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

h4 {
  color: #2c3e50;
  margin-bottom: 0.8rem;
  font-size: 1.1rem;
  border-left: 3px solid #4CAF50;
  padding-left: 0.5rem;
}

ul {
  padding-left: 1.5rem;
}

li {
  margin-bottom: 0.5rem;
  line-height: 1.4;
  color: #555;
}

/* スマートフォン向け */
@media (max-width: 768px) {
  .description-card, .loading-container, .error-container {
    padding: 1rem;
  }
  
  h2 {
    font-size: 1.3rem;
  }
  
  h3 {
    font-size: 1.1rem;
  }
  
  h4 {
    font-size: 1rem;
  }
}

/* タブレット向け */
@media (min-width: 769px) and (max-width: 1024px) {
  .type-description {
    max-width: 100%;
  }
}

/* 大画面向け */
@media (min-width: 1025px) {
  .type-description {
    max-width: 100%;
  }
}
</style>