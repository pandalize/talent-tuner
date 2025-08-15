<!--
  質問ナビゲーションコンポーネント
  前へ・次へボタンとプログレス表示
-->
<template>
  <div class="question-navigation">
    <button
      @click="$emit('go-previous')"
      class="btn nav-button prev-button"
      :disabled="!canGoBack"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      前へ
    </button>

    <div class="progress-indicator">
      <div class="progress-dots">
        <div
          v-for="index in totalQuestions"
          :key="index"
          class="progress-dot"
          :class="{
            completed: index <= questionIndex,
            current: index === questionIndex + 1
          }"
        ></div>
      </div>
    </div>

    <button
      @click="isLastQuestion && allQuestionsAnswered ? $emit('calculate-result') : $emit('go-next')"
      :disabled="!canProceed"
      class="btn nav-button next-button"
      :class="{ 'results-ready': isLastQuestion && allQuestionsAnswered }"
    >
      <span v-if="isLastQuestion && allQuestionsAnswered">
        結果を見る
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </span>
      <span v-else>
        次へ
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Props
interface Props {
  questionIndex: number
  totalQuestions: number
  canGoBack: boolean
  canProceed: boolean
  allQuestionsAnswered: boolean
}

const props = defineProps<Props>()

// Emits
interface Emits {
  'go-previous': []
  'go-next': []
  'calculate-result': []
}

defineEmits<Emits>()

// Computed
const isLastQuestion = computed(() => {
  return props.questionIndex === props.totalQuestions - 1
})
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixins.scss' as mixins;

.question-navigation {
  @include mixins.flex-between;
  gap: var(--space-md);
  align-items: center;
}

.nav-button {
  @include mixins.button-secondary;
  @include mixins.flex-row(var(--space-xs));
  align-items: center;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.results-ready {
    @include mixins.button-primary;
    background: linear-gradient(135deg, var(--accent-gold) 0%, #d4aa00 100%);
    
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #d4aa00 0%, var(--accent-gold) 100%);
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(184, 134, 11, 0.4);
    }
  }
}

// プログレス表示
.progress-indicator {
  flex: 1;
  @include mixins.flex-center;
}

.progress-dots {
  @include mixins.flex-row(var(--space-xs));
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 300px;
}

.progress-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--bg-tertiary);
  transition: all var(--transition-fast);

  &.completed {
    background: var(--accent-blue);
    transform: scale(1.2);
  }

  &.current {
    background: var(--accent-gold);
    transform: scale(1.4);
    box-shadow: 0 0 8px rgba(184, 134, 11, 0.3);
  }
}

// レスポンシブデザイン
@include mixins.respond-to('tablet') {
  .question-navigation {
    @include mixins.flex-column(var(--space-sm));
    width: 100%;
  }

  .nav-button {
    width: 100%;
    justify-content: center;
  }

  .progress-indicator {
    order: -1;
    margin-bottom: var(--space-sm);
  }

  .progress-dots {
    max-width: 400px;
  }
}

@include mixins.respond-to('mobile') {
  .progress-dots {
    gap: var(--space-xs);
    max-width: 280px;
  }
  
  .progress-dot {
    width: 6px;
    height: 6px;
  }
}
</style>