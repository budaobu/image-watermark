<template>
  <button
    type="button"
    role="switch"
    :aria-checked="modelValue"
    @click="$emit('update:modelValue', !modelValue)"
    :class="[
      modelValue ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700',
      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
    ]"
  >
    <span
      :class="[
        modelValue ? 'translate-x-5' : 'translate-x-0',
        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
      ]"
    />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
}>()

defineEmits(['update:modelValue'])
</script>
