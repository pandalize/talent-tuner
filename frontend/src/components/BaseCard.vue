<template>
  <!-- ホームの説明 -->
  <div v-if="variant === 'home'">
    <div class="home-card">
      <div v-if="$slots.number" class="home-number">
        <slot name="number" />
      </div>
      <div v-if="$slots.header" class="home-header">
        <slot name="header" />
      </div>
      <div class="home-body">
        <slot />
      </div>
    </div>
  </div>
  <!-- 結果の順位と説明 -->
  <div v-else-if="variant === 'result'">
    <div v-if="$slots.header" class="result-header">
      <slot name="header" />
    </div>
    <div class="result-body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="result-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'home' | 'result'
}

const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixins.scss' as mixins;

.home-card {
  @include mixins.card-base;
  @include mixins.card-padding(lg);
  @include mixins.card-shadow(sm);
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: all var(--transition-normal);
  border: 1px solid rgba(59, 130, 246, 0.1);
  
  // グラデーションボーダー効果
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 2px;
    background: linear-gradient(135deg, var(--accent-blue), var(--accent-gold), var(--primary-blue));
    border-radius: inherit;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    opacity: 0;
    transition: opacity var(--transition-normal);
  }

  &:hover {
    @include mixins.card-shadow(lg);
    transform: translateY(-8px) scale(1.02);
    border-color: transparent;
    
    &::before {
      opacity: 1;
    }
  }
}

.home-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  font-family: var(--font-mono);
  font-size: var(--fs-lg);
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, var(--accent-blue) 0%, var(--primary-blue) 100%);
  border-radius: var(--radius-round);
  margin-bottom: var(--space-md);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(135deg, var(--accent-blue), var(--accent-gold));
    border-radius: inherit;
    z-index: -1;
    opacity: 0;
    transition: opacity var(--transition-fast);
  }
  
  .home-card:hover & {
    transform: scale(1.1) rotate(5deg);
    
    &::after {
      opacity: 0.3;
    }
  }
}

.home-header {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  color: var(--primary-navy);
  margin-bottom: var(--space-xs);
  font-weight: 600;
}

.home-body {
  font-size: var(--fs-small);
  color: var(--text-secondary);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .home-card {
    background: transparent;
    border: none;
    box-shadow: none;
    padding: var(--space-sm);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-md);
  }

  .home-card:hover,
  .home-card:active {
    transform: none !important;
    box-shadow: none !important;
    border: none !important;
  }
  .home-card:hover::before,
  .home-card:active::before {
    opacity: 0 !important;
  }

  .home-number {
    display: none;
  }

  .home-header {
    margin-bottom: var(--space-xs);
    font-size: 1.125rem;
  }

  .home-body {
    display: none;
  }
}
</style>