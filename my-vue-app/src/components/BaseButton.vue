<template>
  <button 
    :class="buttonClasses"
    :disabled="disabled"
    v-bind="$attrs"
    @click="handleClick"
  >
    <slot name="icon-left" />
    <span v-if="$slots.default">
      <slot />
    </span>
    <slot name="icon-right" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'gold' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  block?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  block: false,
})

interface Emits {
  click: [event: MouseEvent]
}

const emit = defineEmits<Emits>()

const buttonClasses = computed(() => [
  'tw-base-btn',
  {
    // Variants
    'tw-btn-primary': props.variant === 'primary',
    'tw-btn-secondary': props.variant === 'secondary',
    'tw-btn-gold': props.variant === 'gold',
    'tw-btn-danger': props.variant === 'danger',
    
    // Sizes
    'tw-btn-sm': props.size === 'sm',
    'tw-btn-md': props.size === 'md',
    'tw-btn-lg': props.size === 'lg',
    
    // States
    'tw-btn-loading': props.loading,
    'tw-btn-block': props.block,
  }
])

function handleClick(event: MouseEvent) {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
/* Base button style */
.tw-base-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs, 0.5rem);
  font-weight: 600;
  font-family: Noto Sans JP, Helvetica Neue, Helvetica, Arial, sans-serif;
  transition: all 0.3s ease;
  border-radius: 6px;
  border: 2px solid transparent;
  cursor: pointer;
  text-decoration: none;
  min-width: 130px;
  min-height: 48px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  padding: var(--space-md, 0.75rem) var(--space-lg, 1.5rem);
  font-size: 0.9rem;
  background: #f3f4f6;
  color: #222;
  outline: none;
  /* HomeViewの.btnの見た目を反映 */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

/* Variants */
.tw-btn-primary {
  background: linear-gradient(135deg, var(--primary-navy) 0%, var(--accent-blue) 100%);
  color: #fff;
  border: 2px solid transparent;
  background-clip: padding-box;
  position: relative;
  overflow: hidden;
  min-width: 130px;
  min-height: 48px;
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
  font-size: 0.9rem;
  font-weight: 600;
  /* HomeViewの.btn-primaryの見た目を反映 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.6s;
  }
  &:hover {
    background: linear-gradient(135deg, var(--accent-blue) 0%, var(--primary-blue) 100%);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
    &::before {
      left: 100%;
    }
  }
  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  }
}

.tw-btn-gold {
  background: linear-gradient(135deg, #fbbf24 0%, var(--accent-gold) 100%);
  border: 2px solid var(--accent-gold);
  color: var(--primary-navy);
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(245, 158, 11, 0.4);
  }
  &:active {
    transform: translateY(0);
    box-shadow: 0 3px 10px rgba(245, 158, 11, 0.3);
  }
}

.tw-btn-secondary {
  background: #f3f4f6;
  color: var(--primary-navy);
  border: 2px solid var(--primary-navy);
  &:hover {
    background: var(--primary-navy);
    color: #fff;
  }
}

/* Sizes */
.tw-btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}
.tw-btn-md {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}
.tw-btn-lg {
  padding: 1rem 2rem;
  font-size: 1.15rem;
}

/* States */
.tw-btn-loading {
  cursor: wait;
}
.tw-btn-block {
  width: 100%;
}
</style>