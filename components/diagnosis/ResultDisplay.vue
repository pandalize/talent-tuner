<template>
  <div class="result-container">
    <h1>あなたの適職診断結果</h1>
    <p>{{ totalQuestions }}問の質問から分析した、あなたに最適な職業をランキング形式でご紹介します</p>

    <DiagnosisProfessionCard
      v-for="(profession, index) in professions"
      :key="profession.name"
      :profession="profession"
      :rank="index + 1"
      :maxCategoryScore="maxCategoryScore"
    />

    <DiagnosisShareSection :professions="professions" />

    <DiagnosisPremiumSection :professions="professions" />

    <BaseButton
      class="base-button"
      variant="blue"
      size="md"
      @click=handleInstantReset
    >
      もう一度診断する
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import type { ProfessionScore } from '~/utils/diagnosisLoader'

// Props
interface Props {
  professions: ProfessionScore[]
  maxCategoryScore: number
  totalQuestions: number
}

defineProps<Props>()

// Emits
interface Emits {
  'reset-diagnosis': []
  'go-home': []
}

const emit = defineEmits<Emits>()

// 即座にリセット処理（確認なし）
function handleInstantReset() {
  try {
    // localStorage完全削除
    const keys = ['diagnosis_answers', 'diagnosis_show_result', 'diagnosis_top_professions', 'diagnosis_current_question_index']
    keys.forEach(key => {
      localStorage.removeItem(key)
    })
    
    // ページリロード
    window.location.reload()
  } catch (error) {
    console.error('リセット失敗:', error)
    // エラーが発生してもページをリロード
    window.location.reload()
  }
}
</script>

<style lang="scss" scoped>
.result-container {
  display: grid;
  justify-items: center;
  gap: 2rem;
  width: 100%;
  position: relative;
  box-sizing: border-box;
  padding: 0 var(--space-xl);
}

h1 {
  font-family: var(--font-heading);
  font-size: var(--fs-h1);
  color: var(--primary-navy);
  margin-top: var(--space-lg);
  font-weight: 700;
}

p {
  color: var(--text-secondary);
  font-size: var(--fs-body);
  line-height: 1.6;
  margin: 0;
}

.base-button {
  margin-bottom: var(--space-xl, 2rem);
}

// モバイル版のタイトルサイズ調整
@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
    line-height: 1.1;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 1.75rem;
    line-height: 1.1;
  }
}
</style>