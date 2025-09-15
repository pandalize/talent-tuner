<template>
  <button
    :class="['home-btn', variantClass]"
    :disabled="disabled"
    v-bind="$attrs"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'chat' | 'secondary'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false,
})

const variantClass = computed(() => {
  if (props.variant === 'primary') return 'home-btn-primary'
  if (props.variant === 'chat') return 'home-btn-chat'
  if (props.variant === 'secondary') return 'home-btn-secondary'
  return ''
})
</script>

<style scoped>
.home-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-lg);
  font-size: var(--fs-body);
  font-weight: 500;
  text-decoration: none;
  border-radius: 999px;
  transition: all var(--transition-fast);
  cursor: pointer;
  border: 2px solid transparent;
  min-width: 130px;
  min-height: 48px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: #f3f4f6;
  color: #222;
  outline: none;
}
.home-btn-primary {
  background: linear-gradient(135deg, var(--accent-blue) 0%, var(--primary-blue) 100%);
  color: white;
  border: 2px solid var(--accent-blue);
  background-clip: padding-box;
  position: relative;
  overflow: hidden;
  font-size: 0.9rem;
  font-weight: 600;
}
.home-btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.6s;
}
.home-btn-primary:hover {
  background: linear-gradient(135deg, var(--accent-blue) 0%, var(--primary-blue) 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.5);
}
.home-btn-primary:hover::before {
  left: 100%;
}
.home-btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}
.home-btn-chat {
  background: linear-gradient(-45deg, var(--accent-gold) 0%, #d4aa00 100%);
  color: #222;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
  font-size: 0.9rem;
  font-weight: 600;
}
.home-btn-chat:after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  border-radius: 50%;
  transition: all 0.4s ease;
}
.home-btn-chat:hover {
  background: linear-gradient(-45deg, #d4aa00 0%, var(--accent-gold) 100%);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 25px rgba(184, 134, 11, 0.4);
}
.home-btn-chat:hover:after {
  width: 100px;
  height: 100px;
}
.home-btn-secondary {
  background: transparent;
  color: var(--primary-navy);
  border-color: var(--primary-navy);
}
.home-btn-secondary:hover {
  background: var(--primary-navy);
  color: white;
}
.home-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
