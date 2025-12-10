
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
  variant?: 'primary' | 'secondary' | 'blue' | 'gold' | 'danger' | 'success' | 'warning' | 'info'
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
  'base-btn',
  `btn-${props.variant}`,
  `btn-${props.size}`,
  {
    'btn-loading': props.loading,
    'btn-block': props.block,
    'btn-disabled': props.disabled,
  }
])

function handleClick(event: MouseEvent) {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
/* 基本ボタンスタイル */
.base-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  font-family: 'Noto Sans JP', Helvetica, Arial, sans-serif;
  transition: all 0.3s ease;
  border-radius: 50px;
  border: 2px solid transparent;
  cursor: pointer;
  text-decoration: none;
  outline: none;
  position: relative;
  overflow: hidden;
  
  /* デフォルトサイズ */
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  min-width: 160px;
  min-height: 48px;
  
  /* ホバーエフェクト */
  &:hover:not(.btn-disabled) {
    transform: translateY(-2px);
  }
  
  &:active:not(.btn-disabled) {
    transform: translateY(0);
  }
}

/* カラーバリエーション - 色だけ変更 */
.btn-primary {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
  
  &:hover:not(.btn-disabled) {
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.5);
  }
}

.btn-secondary {
  background: #f3f4f6;
  color: #1a2332;
  border: 2px solid #d1d5db;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  &:hover:not(.btn-disabled) {
    background: #e5e7eb;
    border-color: #9ca3af;
  }
}

.btn-blue {
  background: rgb(55, 129, 213);
  color: #ffffff;
  /* border-color: #3b82f6; */
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
  
  &:hover:not(.btn-disabled) {
    background: #3fe26d;
    color: white;
  }
}

.btn-gold {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: #1a2332;
  box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4);
  
  &:hover:not(.btn-disabled) {
    box-shadow: 0 8px 25px rgba(245, 158, 11, 0.5);
  }
}

.btn-white {
  background: #ffffff;
  color: #1a2332;
  border: 2px solid #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  &:hover:not(.btn-disabled) {
    background: #f3f4f6;
    border-color: #d1d5db;
  }
}

.btn-danger {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
  
  &:hover:not(.btn-disabled) {
    box-shadow: 0 8px 25px rgba(239, 68, 68, 0.5);
  }
}

.btn-success {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
  
  &:hover:not(.btn-disabled) {
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.5);
  }
}

.btn-warning {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4);
  
  &:hover:not(.btn-disabled) {
    box-shadow: 0 8px 25px rgba(245, 158, 11, 0.5);
  }
}

.btn-info {
  background: linear-gradient(135deg, #06b6d4, #0891b2);
  color: white;
  box-shadow: 0 6px 20px rgba(6, 182, 212, 0.4);
  
  &:hover:not(.btn-disabled) {
    box-shadow: 0 8px 25px rgba(6, 182, 212, 0.5);
  }
}

/* サイズバリエーション */
.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  min-width: 120px;
  min-height: 40px;
}

.btn-md {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  min-width: 160px;
  min-height: 48px;
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: 1.125rem;
  min-width: 180px;
  min-height: 56px;
}

/* 状態 */
.btn-loading {
  cursor: wait;
  opacity: 0.7;
}

.btn-block {
  width: 100%;
}

.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

/* レスポンシブ */
@media (max-width: 768px) {
  .base-btn {
    min-width: 140px;
  }
  
  .btn-sm {
    min-width: 100px;
  }
  
  .btn-lg {
    min-width: 160px;
  }
}
</style>
