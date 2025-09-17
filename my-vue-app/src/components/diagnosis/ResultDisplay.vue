
<style scoped>
.action-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: var(--space-xl, 2rem);
}
</style>

<!--
  診断結果表示コンポーネント
  職業カード、シェア機能、プレミアム機能を統合
-->
<template>
  <div class="tw-result-container">
    <!-- 結果ヘッダー -->
    <div class="result-header">
      <h1 class="result-title">あなたの適職診断結果</h1>
      <p class="result-subtitle">
        {{ totalQuestions }}問の質問から分析した、あなたに最適な職業をランキング形式でご紹介します
      </p>
    </div>

    <!-- 職業カードリスト -->
    <div 
      class="results-grid" 
      style="width: 100%; max-width: 100vw; overflow-x: hidden; box-sizing: border-box; padding: 0; margin: 0;"
    >
      <ProfessionCard
        v-for="(profession, index) in professions"
        :key="profession.name"
        :profession="profession"
        :rank="index + 1"
        :maxCategoryScore="maxCategoryScore"
      />
    </div>

    <!-- シェア機能 -->
    <ShareSection :professions="professions" />

    <!-- プレミアム機能（詳細レポート購入） -->
    <PremiumSection :professions="professions" />

    <!-- アクションボタン -->
      <div class="action-buttons">
        <HomeButton variant="primary" @click="handleInstantReset">
          もう一度診断する
        </HomeButton>
      </div>
  </div>
</template>

<script setup lang="ts">
import HomeButton from '../HomeButton.vue'
import type { ProfessionScore } from '../../utils/diagnosisLoader'
import ProfessionCard from './ProfessionCard.vue'
import ShareSection from './ShareSection.vue'
import PremiumSection from './PremiumSection.vue'

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

.result-display {
  @include mixins.container(1000px);
  @include mixins.flex-column(var(--space-xxl));
}

// 結果ヘッダー
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

// 結果カードグリッド
.results-grid {
  @include mixins.flex-column(var(--space-xxl));
}

// アクション機能
.action-section {
  margin-top: var(--space-xl);
}

.action-grid {
  @include mixins.grid-auto-fit(200px);
  gap: var(--space-md);
}



// レスポンシブデザイン
@include mixins.respond-to('tablet') {
  .result-header {
    @include mixins.card-padding(lg);
  }
}

@include mixins.respond-to('mobile') {
  .action-grid {
    @include mixins.grid-columns(1);
  }
}

// モバイル版のタイトルサイズ調整
@media (max-width: 768px) {
  .result-title {
    font-size: 2rem;
    line-height: 1.1;
  }

  .result-header {
    padding-top: 16px;
    padding-bottom: 16px;
  }
}

@media (max-width: 480px) {
  .tw-result-container {
    min-height: 100vh;
    overflow-y: auto;
  }
  .result-title {
    font-size: 1.75rem;
    line-height: 1.1;
  }
}

</style>