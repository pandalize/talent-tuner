<template>
  <div :class="cardClasses">
    <div v-if="$slots.header" class="tw-card-header">
      <slot name="header" />
    </div>
    
    <div class="tw-card-body" :class="bodyClasses">
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="tw-card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  border?: boolean
  hover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  shadow: 'md',
  padding: 'md',
  rounded: 'lg',
  border: true,
  hover: false,
})

const cardClasses = computed(() => [
  'tw-base-card',
  {
    // Shadow
    'tw-shadow-none': props.shadow === 'none',
    'tw-shadow-sm': props.shadow === 'sm',
    'tw-shadow-md': props.shadow === 'md',
    'tw-shadow-lg': props.shadow === 'lg',
    'tw-shadow-xl': props.shadow === 'xl',
    
    // Rounded
    'tw-rounded-none': props.rounded === 'none',
    'tw-rounded-sm': props.rounded === 'sm',
    'tw-rounded-md': props.rounded === 'md',
    'tw-rounded-lg': props.rounded === 'lg',
    'tw-rounded-xl': props.rounded === 'xl',
    
    // Border
    'tw-card-border': props.border,
    
    // Hover
    'tw-card-hover': props.hover,
  }
])

const bodyClasses = computed(() => [
  {
    'tw-padding-none': props.padding === 'none',
    'tw-padding-sm': props.padding === 'sm',
    'tw-padding-md': props.padding === 'md',
    'tw-padding-lg': props.padding === 'lg',
    'tw-padding-xl': props.padding === 'xl',
  }
])
</script>

<style scoped>
@layer components {
  .tw-base-card {
    @apply bg-white transition-all duration-300;
  }

  .tw-card-border {
    @apply border border-gray-200;
  }

  .tw-card-hover {
    @apply hover:shadow-lg hover:-translate-y-1 cursor-pointer;
  }

  .tw-card-header {
    @apply px-6 py-4 border-b border-gray-200;
  }

  .tw-card-footer {
    @apply px-6 py-4 border-t border-gray-200 bg-gray-50;
  }

  /* Shadow variations */
  .tw-shadow-none {
    @apply shadow-none;
  }

  .tw-shadow-sm {
    @apply shadow-sm;
  }

  .tw-shadow-md {
    @apply shadow-md;
  }

  .tw-shadow-lg {
    @apply shadow-lg;
  }

  .tw-shadow-xl {
    @apply shadow-xl;
  }

  /* Padding variations */
  .tw-padding-none {
    @apply p-0;
  }

  .tw-padding-sm {
    @apply p-4;
  }

  .tw-padding-md {
    @apply p-6;
  }

  .tw-padding-lg {
    @apply p-8;
  }

  .tw-padding-xl {
    @apply p-10;
  }
}
</style>