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
    <div class="action-section">
      
      <div class="action-grid">
        <button @click="handleInstantReset" class="action-button secondary-action" type="button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12a9 9 0 019-9 9.75 9.75 0 016.74 2.74L21 8"/>
            <path d="M21 3v5h-5"/>
            <path d="M21 12a9 9 0 01-9 9 9.75 9.75 0 01-6.74-2.74L3 16"/>
            <path d="M3 21v-5h5"/>
          </svg>
          もう一度診断する
        </button>
        <button @click="$emit('go-home')" class="action-button primary-action">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          </svg>
          ホームに戻る
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  border-radius: 12px;
  border: 1px solid var(--border-light);
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

.action-button {
  @include mixins.button-secondary;
  @include mixins.flex-row(var(--space-sm));
  justify-content: center;
  
  &.primary-action {
    @include mixins.button-primary;
  }

  &:hover {
    transform: translateY(-2px);
    @include mixins.card-shadow(md);
  }
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
</style>