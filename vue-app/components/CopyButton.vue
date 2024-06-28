<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

defineProps<{
  label: string
  value: string
}>()

const { copy, copied, isSupported } = useClipboard()
</script>

<template>
  <UTooltip v-if="isSupported" :text="label" :popper="{ placement: 'top' }">
    <UButton
      :icon="copied ? 'i-heroicons-check' : 'i-heroicons-document-duplicate'"
      variant="ghost"
      @click="copy(value)"
    />
  </UTooltip>
</template>
