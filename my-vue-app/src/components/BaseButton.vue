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
@layer components {
  .tw-base-btn {
    @apply flex items-center justify-center gap-2 
           font-medium transition-all duration-300
           border rounded-lg cursor-pointer
           focus:outline-none focus:ring-2 focus:ring-offset-2
           disabled:opacity-50 disabled:cursor-not-allowed;
  }

  /* Variants */
  .tw-btn-primary {
    @apply bg-accent-blue text-white border-accent-blue
           hover:bg-blue-700 hover:border-blue-700
           focus:ring-blue-500/50;
  }

  .tw-btn-secondary {
    @apply bg-gray-100 text-gray-700 border-gray-300
           hover:bg-gray-200 hover:border-gray-400
           focus:ring-gray-500/20;
  }

  .tw-btn-gold {
    @apply bg-gradient-to-r from-accent-gold to-yellow-600 text-white
           border-accent-gold hover:from-yellow-600 hover:to-yellow-700
           hover:-translate-y-0.5 hover:shadow-xl
           focus:ring-yellow-500/50;
  }

  .tw-btn-danger {
    @apply bg-red-600 text-white border-red-600
           hover:bg-red-700 hover:border-red-700
           focus:ring-red-500/50;
  }

  /* Sizes */
  .tw-btn-sm {
    @apply px-3 py-1.5 text-sm;
  }

  .tw-btn-md {
    @apply px-4 py-2 text-base;
  }

  .tw-btn-lg {
    @apply px-6 py-3 text-lg;
  }

  /* States */
  .tw-btn-loading {
    @apply cursor-wait;
  }

  .tw-btn-block {
    @apply w-full;
  }
}
</style>