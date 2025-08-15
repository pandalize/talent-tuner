<!--
  進捗表示コンポーネント
  固定プログレスバー（画面下部）
-->
<template>
  <div class="progress-indicator-fixed">
    <div class="progress-content">
      <p>回答済み： {{ answeredCount }} / {{ totalCount }}</p>
      <div class="progress-bar">
        <div
          class="progress-fill"
          :style="{ width: `${progressPercentage}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Props
interface Props {
  answeredCount: number
  totalCount: number
}

const props = defineProps<Props>()

// 計算プロパティ
const progressPercentage = computed(() => {
  if (props.totalCount === 0) return 0
  return Math.round((props.answeredCount / props.totalCount) * 100)
})
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixins.scss' as mixins;

.progress-indicator-fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--border-light);
  padding: var(--space-sm) var(--space-md);
  z-index: 100;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.08);
}

.progress-content {
  @include mixins.container(900px);
  @include mixins.flex-row(var(--space-md));
  align-items: center;

  p {
    font-family: var(--font-mono);
    font-size: var(--fs-small);
    color: var(--text-secondary);
    margin: 0;
    white-space: nowrap;
    font-weight: 500;
  }
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: var(--bg-tertiary);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-blue), var(--accent-gold));
  border-radius: 3px;
  transition: width var(--transition-normal);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: shimmer 2s ease-in-out infinite;
  }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

// レスポンシブデザイン
@include mixins.respond-to('mobile') {
  .progress-content {
    @include mixins.flex-column(var(--space-xs));
    text-align: center;

    p {
      white-space: normal;
    }
  }

  .progress-indicator-fixed {
    padding: var(--space-sm);
  }
}
</style>