<template>
  <div class="relative">
    <Icon 
      v-if="icon" 
      :name="icon" 
      class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" 
    />
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :class="[
        'flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400',
        { 'pl-10': icon }
      ]"
      v-bind="$attrs"
    />
  </div>
</template>

<script setup lang="ts">
import Icon from './Icon.vue'

defineProps<{
  modelValue?: string | number
  icon?: string
}>()

defineEmits(['update:modelValue'])
</script>
