<template>
  <button
    :class="[
      'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50',
      variants[variant || 'solid'],
      sizes[size || 'md'],
      { 'w-full': block }
    ]"
    v-bind="$attrs"
  >
    <Icon v-if="icon" :name="icon" class="mr-2 h-5 w-5" />
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
import Icon from './Icon.vue'

interface Props {
  variant?: 'solid' | 'outline' | 'ghost'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  icon?: string
  label?: string
  color?: string
  block?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'solid',
  size: 'md',
  color: 'primary'
})

const variants = {
  solid: 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm',
  outline: 'border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50',
  ghost: 'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50'
}

const sizes = {
  xs: 'h-7 px-2 text-xs',
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 py-2',
  lg: 'h-11 px-8 text-lg'
}
</script>
