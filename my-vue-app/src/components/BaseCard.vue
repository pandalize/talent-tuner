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
.tw-base-card {
  background-color: white;
  transition: all 0.3s;
}

.tw-card-border {
  border: 1px solid #e5e7eb;
}

.tw-card-hover {
  cursor: pointer;
}

.tw-card-hover:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transform: translateY(-0.25rem);
}

.tw-card-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.tw-card-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  background-color: #f9fafb;
}

/* Shadow variations */
.tw-shadow-none {
  box-shadow: none;
}

.tw-shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.tw-shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.tw-shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.tw-shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Padding variations */
.tw-padding-none {
  padding: 0;
}

.tw-padding-sm {
  padding: 1rem;
}

.tw-padding-md {
  padding: 1.5rem;
}

.tw-padding-lg {
  padding: 2rem;
}

.tw-padding-xl {
  padding: 2.5rem;
}
</style>