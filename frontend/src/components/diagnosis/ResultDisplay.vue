<template>
  <div class="result-container">
    <div class="result-header">
      <h1 class="result-title">あなたの適職診断結果</h1>
      <p class="result-subtitle">
        {{ totalQuestions }}問の質問から分析した、あなたに最適な職業をランキング形式でご紹介します
      </p>
    </div>

    <div class="results-grid">
      <ProfessionCard
        v-for="(profession, index) in professions"
        :key="profession.name"
        :profession="profession"
        :rank="index + 1"
        :maxCategoryScore="maxCategoryScore"
      />
    </div>

    <ShareSection :professions="professions" />

    <PremiumSection :professions="professions" />

      <div class="action-buttons">
        <BaseButton
            variant="blue"
            size="md"
            @click=handleInstantReset
          >
            もう一度診断する
          </BaseButton>
      </div>
  </div>
</template>

<script setup lang="ts">
import type { ProfessionScore } from '../../utils/diagnosisLoader'
import ProfessionCard from './ProfessionCard.vue'
import ShareSection from './ShareSection.vue'
import PremiumSection from './PremiumSection.vue'
import BaseButton from '@/components/BaseButton.vue';

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
@use '@/assets/scss/mixins.scss' as mixins;

.result-header {
  padding: calc(var(--space-xxl) / 2) var(--space-lg);
  text-align: center;
  background: transparent;
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

.results-grid {
  @include mixins.flex-column(var(--space-xxl));
  width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  padding-bottom: 2rem;
}

.action-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: var(--space-xl, 2rem);
}

/* 追加: 画面内に収めて縦スクロールを許可 */
.result-container {
  max-height: calc(100vh - 120px); /* ヘッダ等の高さに合わせて調整 */
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
}

/* グリッドの下部に余白を確保（スクロールで最後のカードが切れないように） */
.results-grid {
  padding-bottom: 2rem;
}

// レスポンシブデザイン
@include mixins.respond-to('tablet') {
  .result-header {
    @include mixins.card-padding(lg);
  }
}

// モバイル版のタイトルサイズ調整
@media (max-width: 768px) {
  .result-header {
    padding-top: 16px;
    padding-bottom: 16px;
  }

  .result-title {
    font-size: 2rem;
    line-height: 1.1;
  }
}

@media (max-width: 480px) {
  .result-container {
    max-height: none;
    overflow-y: auto;
  }
  .result-title {
    font-size: 1.75rem;
    line-height: 1.1;
  }
}
</style>