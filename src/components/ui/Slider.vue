<template>
  <input
    type="range"
    :value="modelValue"
    @input="$emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary-500"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
defineProps<{
  modelValue: number
}>()

defineEmits(['update:modelValue'])
</script>
