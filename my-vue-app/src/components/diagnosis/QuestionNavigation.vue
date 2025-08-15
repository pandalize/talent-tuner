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
  margin-top: var(--space-xl);
  padding: var(--space-lg) 0;
  position: relative;
  z-index: 10;
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

// デスクトップでの適切な間隔確保
@include mixins.respond-to('desktop') {
  .question-navigation {
    margin-top: var(--space-xxl);
    padding: var(--space-xl) 0;
    
    // オプションとの重なりを防止
    &::before {
      content: '';
      display: block;
      height: var(--space-lg);
      width: 100%;
      position: absolute;
      top: calc(-1 * var(--space-lg));
      left: 0;
      background: transparent;
      pointer-events: none;
    }
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
  
  .question-navigation {
    margin-top: var(--space-lg);
    padding: var(--space-md) 0;
  }

  .progress-dots {
    max-width: 400px;
  }
}

@include mixins.respond-to('mobile') {
  .question-navigation {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.98) 100%);
    backdrop-filter: blur(20px);
    border-top: 1px solid var(--border-light);
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
    padding: var(--space-lg) var(--space-lg) calc(var(--space-lg) + env(safe-area-inset-bottom));
    z-index: 100;
    gap: var(--space-md);
  }
  
  .nav-button {
    min-height: 56px;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 12px;
    flex: 1;
    
    &.prev-button {
      max-width: 120px;
    }
    
    &.next-button {
      flex: 2;
      
      &.results-ready {
        background: linear-gradient(135deg, var(--accent-gold) 0%, #d4aa00 100%);
        box-shadow: 0 4px 16px rgba(184, 134, 11, 0.3);
        font-weight: 700;
      }
    }
  }
  
  .progress-indicator {
    flex: 1;
    min-width: 120px;
  }

  .progress-dots {
    gap: var(--space-sm);
    max-width: none;
    justify-content: center;
  }
  
  .progress-dot {
    width: 12px;
    height: 12px;
    
    &.completed {
      transform: scale(1);
      box-shadow: 0 0 4px rgba(52, 152, 219, 0.4);
    }
    
    &.current {
      transform: scale(1.2);
      box-shadow: 0 0 8px rgba(184, 134, 11, 0.5);
      animation: pulse 2s ease-in-out infinite;
    }
  }
}

@keyframes pulse {
  0%, 100% { 
    transform: scale(1.2); 
    opacity: 1;
  }
  50% { 
    transform: scale(1.4); 
    opacity: 0.8;
  }
}
</style>