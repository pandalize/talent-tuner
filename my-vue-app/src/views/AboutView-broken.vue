<template>
  <div class="about">
    <div class="about-content">
      <h1>{{ about.title() }}</h1>
      <h2 class="subtitle">{{ about.subtitle() }}</h2>
      <p class="description">{{ about.description() }}</p>
      
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
        <p>{{ common.loading() }}</p>
      </div>
      
      <div v-else-if="error" class="error-container">
        <p>{{ error }}</p>
        <button @click="loadProfessionData" class="reload-button">{{ common.retry() }}</button>
      </div>
      
      <div v-else class="profession-description">
        <h2>{{ selectedProfessionName }}</h2>
        
        <div class="salary-info" v-if="professionSalary">
          <h3>{{ about.salaryRange() }}</h3>
          <p>{{ professionSalary }}</p>
        </div>
        
        <div class="description-content">
          <h3>{{ about.jobDetails() }}</h3>
          <p>{{ professionJobDetails }}</p>
        </div>
        
        <div class="characteristics">
          <h3>{{ about.suitableFor() }}</h3>
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
            {{ about.viewDetail() }}
          </router-link>
          <router-link to="/diagnosis" class="diagnosis-button">
            {{ about.takeDiagnosis() }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { loadProfessionDatabase, type ProfessionData } from '../utils/diagnosisLoader'
import { useTranslation } from '../composables/useTranslation'

// 翻訳ヘルパー
const { about, common } = useTranslation()

// データ管理
const professions = ref<ProfessionData[]>([])
const selectedProfessionName = ref<string>('')
const loading = ref(true)
const error = ref<string | null>(null)

// 選択された職業の詳細情報を計算
const selectedProfession = computed(() => {
  return professions.value.find(p => p.name === selectedProfessionName.value)
})

const selectedProfessionId = computed(() => {
  return selectedProfession.value?.id || null
})

const professionSalary = computed(() => {
  return selectedProfession.value?.salary || ''
})

const professionJobDetails = computed(() => {
  if (!selectedProfession.value) return ''
  return selectedProfession.value.description || selectedProfession.value.comment || ''
})

const professionTraits = computed(() => {
  if (!selectedProfession.value) return []
  
  const traits: string[] = []
  
  // 必要スキル
  if (selectedProfession.value.requiredSkills?.length > 0) {
    traits.push(...selectedProfession.value.requiredSkills)
  }
  
  // その他の特性（もしあれば）
  if (selectedProfession.value.workEnvironment) {
    traits.push(selectedProfession.value.workEnvironment)
  }
  
  // デフォルトの特性（もし何もなければ）
  if (traits.length === 0) {
    traits.push('詳細な特性情報は職業詳細ページでご確認ください')
  }
  
  return traits
})

// 職業データの読み込み
const loadProfessionData = async () => {
  loading.value = true
  error.value = null
  
  try {
    const database = await loadProfessionDatabase()
    const data = database.professions
    professions.value = data
    
    // 初期選択を設定
    if (data.length > 0 && !selectedProfessionName.value) {
      selectedProfessionName.value = data[0].name
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : '職業データの読み込みに失敗しました'
    console.error('Failed to load professions:', err)
  } finally {
    loading.value = false
  }
}

// 初期化
onMounted(() => {
  loadProfessionData()
})
</script>

<style scoped>
.about {
  width: 100%;
  min-height: 100vh;
  padding: var(--space-xl) var(--space-lg);
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
}

.about-content {
  max-width: 900px;
  margin: 0 auto;
}

.about h1 {
  font-family: var(--font-heading);
  font-size: var(--fs-h1);
  color: var(--primary-navy);
  text-align: center;
  margin-bottom: var(--space-sm);
}

.subtitle {
  font-size: var(--fs-h3);
  color: var(--accent-blue);
  text-align: center;
  margin-bottom: var(--space-md);
  font-weight: 400;
}

.description {
  font-size: var(--fs-body);
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: var(--space-xl);
  line-height: 1.6;
}

/* セレクター */
.profession-selector {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  justify-content: center;
  margin-bottom: var(--space-xl);
}

.profession-selector button {
  padding: var(--space-sm) var(--space-md);
  border: 2px solid var(--primary-navy);
  background: white;
  color: var(--primary-navy);
  border-radius: 6px;
  font-size: var(--fs-body);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.profession-selector button:hover {
  background: var(--bg-secondary);
}

.profession-selector button.active {
  background: var(--primary-navy);
  color: white;
}

/* ローディング・エラー */
.loading-container,
.error-container {
  text-align: center;
  padding: var(--space-xl);
}

.reload-button {
  margin-top: var(--space-md);
  padding: var(--space-sm) var(--space-lg);
  background: var(--primary-navy);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: var(--fs-body);
  transition: all var(--transition-fast);
}

.reload-button:hover {
  background: var(--primary-blue);
}

/* 職業説明 */
.profession-description {
  background: white;
  padding: var(--space-xl);
  border-radius: 12px;
  box-shadow: var(--shadow-md);
}

.profession-description h2 {
  font-family: var(--font-heading);
  font-size: var(--fs-h2);
  color: var(--primary-navy);
  margin-bottom: var(--space-lg);
  text-align: center;
}

.salary-info {
  margin-bottom: var(--space-lg);
  padding: var(--space-md);
  background: var(--bg-secondary);
  border-radius: 8px;
}

.salary-info h3,
.description-content h3,
.characteristics h3 {
  font-size: var(--fs-h3);
  color: var(--primary-navy);
  margin-bottom: var(--space-sm);
  font-weight: 600;
}

.salary-info p {
  font-size: var(--fs-body);
  color: var(--accent-gold);
  font-weight: 600;
}

.description-content {
  margin-bottom: var(--space-lg);
}

.description-content p {
  font-size: var(--fs-body);
  color: var(--text-primary);
  line-height: 1.8;
}

.characteristics {
  margin-bottom: var(--space-xl);
}

.characteristics ul {
  list-style: none;
  padding: 0;
}

.characteristics li {
  padding: var(--space-sm) 0;
  padding-left: var(--space-lg);
  position: relative;
  font-size: var(--fs-body);
  color: var(--text-secondary);
  line-height: 1.6;
}

.characteristics li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--accent-green);
  font-weight: bold;
}

/* アクションボタン */
.profession-actions {
  display: flex;
  gap: var(--space-md);
  justify-content: center;
  flex-wrap: wrap;
}

.detail-button,
.diagnosis-button {
  padding: var(--space-sm) var(--space-lg);
  border-radius: 6px;
  text-decoration: none;
  font-size: var(--fs-body);
  font-weight: 500;
  transition: all var(--transition-fast);
  display: inline-flex;
  align-items: center;
}

.detail-button {
  background: transparent;
  color: var(--primary-navy);
  border: 2px solid var(--primary-navy);
}

.detail-button:hover {
  background: var(--primary-navy);
  color: white;
}

.diagnosis-button {
  background: var(--primary-navy);
  color: white;
  border: 2px solid var(--primary-navy);
}

.diagnosis-button:hover {
  background: var(--primary-blue);
  border-color: var(--primary-blue);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* レスポンシブ */
@media (max-width: 768px) {
  .about {
    padding: var(--space-lg) var(--space-md);
  }
  
  .about h1 {
    font-size: clamp(1.75rem, 5vw, 2.5rem);
  }
  
  .profession-selector {
    gap: var(--space-xs);
  }
  
  .profession-selector button {
    padding: var(--space-xs) var(--space-sm);
    font-size: var(--fs-small);
  }
  
  .profession-description {
    padding: var(--space-lg);
  }
  
  .profession-actions {
    flex-direction: column;
  }
  
  .detail-button,
  .diagnosis-button {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .about {
    padding: var(--space-md);
  }
  
  .profession-description {
    padding: var(--space-md);
  }
}
</style>