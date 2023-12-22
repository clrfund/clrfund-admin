<script setup lang="ts">
defineProps<{
  title: string
  txHash: string
  txError: string
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
    <div class="h-full">
      <div v-if="!txHash && !txError">Please approve the transaction in your wallet...</div>
      <TransactionHash v-if="txHash" :tx-hash="txHash"></TransactionHash>
      <UAlert v-if="txError" title="Error" icon="i-carbon-error" color="red" variant="subtle">
        <template #description>
          <div class="break-word text-ellipsis overflow-hidden">
            {{ txError }}
          </div>
        </template>
      </UAlert>
    </div>
  </UCard>
</template>
