<template>
  <div class="profession-detail">
    <div v-if="loading" class="loading-container">
      <p>職業情報を読み込んでいます...</p>
    </div>
    
    <div v-else-if="error" class="error-container">
      <h1>エラーが発生しました</h1>
      <p>{{ error }}</p>
      <div class="error-actions">
        <router-link to="/about" class="btn btn-primary">職業一覧に戻る</router-link>
        <button @click="loadProfessionData" class="btn btn-secondary">再読み込み</button>
      </div>
    </div>
    
    <div v-else-if="professionData" class="profession-content">
      <!-- ヘッダーセクション -->
      <header class="profession-header">
        <div class="breadcrumb">
          <router-link to="/">ホーム</router-link>
          <span class="separator">></span>
          <router-link to="/about">職業一覧</router-link>
          <span class="separator">></span>
          <span class="current">{{ professionName }}</span>
        </div>
        <h1 class="profession-title">{{ professionName }}</h1>
        <div class="profession-overview">
          <div class="annual-income">
            <span class="label">年収目安</span>
            <span class="value">{{ professionData.annualIncome }}</span>
          </div>
        </div>
      </header>

      <!-- 職業概要 -->
      <section class="job-summary">
        <h2>職業概要</h2>
        <p class="job-details">{{ professionData.jobDetails }}</p>
        <div class="diagnostic-comment">
          <h3>適性診断コメント</h3>
          <p>{{ professionData.comment }}</p>
        </div>
      </section>

      <!-- 特徴・適性 -->
      <section class="traits-section">
        <h2>この職業に向いている人の特徴</h2>
        <ul class="traits-list">
          <li v-for="(trait, index) in professionData.traits" :key="index">
            {{ trait }}
          </li>
        </ul>
      </section>

      <!-- 必要スキル -->
      <section class="skills-section">
        <h2>必要なスキル・能力</h2>
        <ul class="skills-list">
          <li v-for="(skill, index) in professionData.requiredSkills" :key="index">
            {{ skill }}
          </li>
        </ul>
      </section>

      <!-- キャリアパス -->
      <section class="career-path-section">
        <h2>キャリアパス・昇進ルート</h2>
        <div class="career-path">
          <div v-for="(step, index) in professionData.careerPath" :key="index" class="career-step">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">{{ step }}</div>
          </div>
        </div>
      </section>

      <!-- 勤務環境 -->
      <section class="work-environment-section">
        <h2>勤務環境・働き方</h2>
        <p class="work-environment">{{ professionData.workEnvironment }}</p>
      </section>

      <!-- 需要見通し -->
      <section class="demand-outlook-section">
        <h2>将来性・需要見通し</h2>
        <p class="demand-outlook">{{ professionData.demandOutlook }}</p>
      </section>

      <!-- 学歴・資格要件 -->
      <section class="education-requirements-section">
        <h2>必要な学歴・資格</h2>
        <p class="education-requirements">{{ professionData.educationRequirements }}</p>
      </section>

      <!-- 関連職業 -->
      <section class="related-professions-section">
        <h2>関連職業・転職先候補</h2>
        <div class="related-professions">
          <router-link 
            v-for="relatedProf in relatedProfessionsWithIds" 
            :key="relatedProf.id"
            :to="`/profession/${relatedProf.id}`"
            class="related-profession-card"
          >
            {{ relatedProf.name }}
          </router-link>
        </div>
      </section>

      <!-- アクションセクション -->

      <div class="action-section">
        <BaseButton
          variant="blue"
          size="md"
          @click="$router.push('/diagnosis')"
          >
          適性診断を受ける
        </BaseButton>
        <BaseButton
          variant="gold"
          size="md"
          @click="$router.push('/about')"
        >
          他の職業も見る
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { loadProfessionDatabase, type ProfessionDatabase, type ProfessionData } from '../utils/diagnosisLoader';
import BaseButton from '@/components/BaseButton.vue';

const route = useRoute();
const router = useRouter();

const loading = ref(true);
const error = ref<string | null>(null);
const professionDatabase = ref<ProfessionDatabase | null>(null);

const professionId = computed(() => route.params.id as string);
const professionName = computed(() => {
  if (!professionDatabase.value) return '';
  for (const [name, data] of Object.entries(professionDatabase.value.professions)) {
    if (data.id === professionId.value) {
      return name;
    }
  }
  return '';
});

const professionData = computed((): ProfessionData | null => {
  if (!professionDatabase.value || !professionName.value) return null;
  return professionDatabase.value.professions[professionName.value];
});

const relatedProfessionsWithIds = computed(() => {
  if (!professionData.value || !professionDatabase.value || !professionData.value.relatedProfessions) return [];
  
  return professionData.value.relatedProfessions.map(profName => {
    const data = professionDatabase.value!.professions[profName];
    return {
      name: profName,
      id: data?.id || profName.toLowerCase().replace(/\s+/g, '-')
    };
  }).filter(item => item.id !== professionId.value); // 自分自身は除外
});

async function loadProfessionData() {
  loading.value = true;
  error.value = null;
  
  try {
    professionDatabase.value = await loadProfessionDatabase();
    
    // 職業が存在しない場合は404にリダイレクト
    if (!professionName.value || !professionData.value) {
      router.push('/404');
      return;
    }
    
    // メタタグを動的に更新
    updateMetaTags();
    
  } catch (err) {
    console.error('職業データの読み込みに失敗しました:', err);
    error.value = '職業データの読み込みに失敗しました。もう一度お試しください。';
  } finally {
    loading.value = false;
  }
}

function updateMetaTags() {
  if (!professionName.value || !professionData.value) return;
  
  const title = `${professionName.value}の詳細情報 | ため職`;
  const description = `${professionName.value}の仕事内容、年収（${professionData.value.annualIncome}）、必要スキル、キャリアパス、将来性を詳しく解説。転職・就職の参考にどうぞ。`;
  
  document.title = title;
  
  // description meta tag
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description);
  }
  
  // OGP tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', title);
  }
  
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute('content', description);
  }
}

// ルートパラメータが変更された時にデータを再読み込み
watch(() => route.params.id, () => {
  if (route.name === 'profession-detail') {
    loadProfessionData();
  }
});

onMounted(loadProfessionData);
</script>

<style scoped>
.profession-detail {
  width: 100%;
  min-height: calc(100vh - 200px);
  padding: 2rem 1rem;
  box-sizing: border-box;
}

/* ローディング・エラー状態 */
.loading-container, .error-container {
  text-align: center;
  padding: 4rem 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.error-container h1 {
  color: #d32f2f;
  margin-bottom: 1rem;
}

.error-actions {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* メインコンテンツ */
.profession-content {
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* パンくずナビ */
.breadcrumb {
  padding: 1rem 2rem;
  background: #f8f9fa;
  font-size: 0.9rem;
  border-bottom: 1px solid #e9ecef;
}

.breadcrumb a {
  color: var(--main-color);
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.separator {
  margin: 0 0.5rem;
  color: #6c757d;
}

.current {
  color: #6c757d;
}

/* ヘッダー */
.profession-header {
  background: linear-gradient(135deg, var(--main-color), var(--light-blue));
  color: white;
  padding: 2rem;
}

.profession-title {
  font-size: 2.5rem;
  margin: 1rem 0;
  font-weight: 700;
}

.profession-overview {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.annual-income {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
}

.annual-income .label {
  font-size: 0.9rem;
  opacity: 0.9;
}

.annual-income .value {
  font-weight: 600;
  font-size: 1.1rem;
}

/* セクション共通スタイル */
section {
  padding: 2rem;
  border-bottom: 1px solid #f0f0f0;
}

section:last-child {
  border-bottom: none;
}

section h2 {
  color: var(--main-color);
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  border-left: 4px solid var(--main-color);
  padding-left: 1rem;
}

section h3 {
  color: var(--text-dark);
  font-size: 1.2rem;
  margin: 1.5rem 0 1rem 0;
  font-weight: 600;
}

/* 職業概要 */
.job-details {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-dark);
  margin-bottom: 2rem;
}

.diagnostic-comment {
  background: #f8f9ff;
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 4px solid var(--main-color);
}

.diagnostic-comment p {
  line-height: 1.7;
  color: var(--text-dark);
}

/* リスト */
.traits-list, .skills-list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 1rem;
}

.traits-list li, .skills-list li {
  background: #f8f9fa;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  border-left: 4px solid var(--main-color);
  line-height: 1.6;
}

/* キャリアパス */
.career-path {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.career-step {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8f9ff, #fff);
  border: 2px solid #e3f2fd;
  border-radius: 10px;
  transition: transform 0.2s ease;
}

.career-step:hover {
  transform: translateX(10px);
}

.step-number {
  background: var(--main-color);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-dark);
}

/* テキストセクション */
.work-environment, .demand-outlook, .education-requirements {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-dark);
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid #e9ecef;
}

/* 関連職業 */
.related-professions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.related-profession-card {
  background: var(--light-pink);
  color: var(--text-dark);
  padding: 1rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.related-profession-card:hover {
  background: var(--main-color);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(95, 144, 178, 0.3);
}

.action-section {
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding: 2rem;
}

.action-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.action-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  text-decoration: none;
  color: var(--text-dark);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.action-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  border-color: var(--main-color);
}

.action-card h3 {
  color: var(--main-color);
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.action-card p {
  line-height: 1.6;
  color: #666;
}

/* ボタン */
.btn {
  display: inline-block;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.btn-primary {
  background: var(--main-color);
  color: white;
}

.btn-primary:hover {
  background: #4a7ba7;
  transform: translateY(-2px);
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #545b62;
  transform: translateY(-2px);
}

/* レスポンシブ */
@media (max-width: 768px) {
  .profession-detail {
    padding: 1rem 0.5rem;
  }
  
  .profession-content {
    margin: 0;
    border-radius: 0;
  }
  
  .profession-header {
    padding: 1.5rem 1rem;
  }
  
  .profession-title {
    font-size: 2rem;
  }
  
  .profession-overview {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  section {
    padding: 1.5rem 1rem;
  }
  
  section h2 {
    font-size: 1.3rem;
  }
  
  .career-step {
    flex-direction: column;
    text-align: center;
  }
  
  .related-professions {
    justify-content: center;
  }
  
  .action-cards {
    grid-template-columns: 1fr;
  }
  
  .error-actions {
    flex-direction: column;
    align-items: center;
  }
}
</style>