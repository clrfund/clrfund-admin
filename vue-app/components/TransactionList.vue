<template>

  <div class="flex w-full border rounded-lg p-2">
    <div class="p-2 grow">{{ action }}</div>
    <UButton v-if="editable" icon="i-heroicons-pencil" color="gray" variant="ghost" />
    <UButton icon="i-heroicons-trash" color="gray" variant="ghost"/>
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: { type: String },
  slot: { type: String },
  success: { type: Boolean, default: false },
  error: { type: Boolean, default: false },
})
</script>