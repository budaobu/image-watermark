<template>
  <Icon :icon="formatIconName(name)" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps<{
  name: string
}>()

// Convert 'i-heroicons-home' to 'heroicons:home' format for Iconify
const formatIconName = (name: string) => {
  if (name.startsWith('i-')) {
    const parts = name.replace('i-', '').split('-')
    if (parts.length > 1) {
      // Assuming first part is collection, rest is name
      // e.g. i-heroicons-home -> heroicons:home
      // e.g. i-heroicons-adjustments-horizontal -> heroicons:adjustments-horizontal
      const collection = parts[0]
      const icon = parts.slice(1).join('-')
      return `${collection}:${icon}`
    }
  }
  return name
}
</script>
