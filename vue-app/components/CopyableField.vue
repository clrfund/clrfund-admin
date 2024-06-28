<script setup lang="ts">
defineProps<{
  value: string
  externalLink?: string
}>()
</script>

<template>
  <UButtonGroup
    v-if="value"
    orientation="horizontal"
    class="dark:border-gray-600 dark:bg-gray-800"
  >
    <UButton
      v-if="externalLink"
      truncate
      class="max-w-[calc(100% - w-5)]"
      color="gray"
      variant="link"
      :label="value"
      :to="externalLink"
      target="_blank"
    />

    <UButton
      v-else
      truncate
      class="max-w-[calc(100% - w-5)]"
      disabled
      variant="ghost"
      color="gray"
      :label="value"
      :ui="{
        base: 'disabled:cursor',
      }"
    />

    <CopyButton label="Copy" :value="value" />
  </UButtonGroup>
</template>
