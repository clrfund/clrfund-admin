<script setup lang="ts">
defineProps<{
  title: string
  txHash: string
  txError: string
  explorerUrl: string
}>()

const emit = defineEmits(['close'])
</script>

<template>
  <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
          {{ title }}
        </h3>
        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="emit('close')" />
      </div>
    </template>
    <div break-all>
      <a v-if="txHash && explorerUrl" rel="noreferrer" :href="explorerUrl" target="_blank">{{ explorerUrl }}</a>
      <div v-else-if="txHash" text-green-600>
        {{ txHash }}
      </div>
    </div>
    <UAlert v-if="txError" title="Error" icon="i-carbon-error" color="red" variant="soft">
      <template #description>
        <div class="break-word text-ellipsis overflow-hidden">
          {{ txError }}
        </div>
      </template>
    </UAlert>
  </UCard>
</template>
