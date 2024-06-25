<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const props = defineProps<{
  txHash: string
}>()

const app = useAppStore()

const explorerUrl = computed(() => app.getExplorerUrlByHash(props.txHash))
const { copy, copied, isSupported } = useClipboard({ source: props.txHash })

</script>

<template>
  <ClientOnly>
    <div>Transaction Hash:</div>
    <UButtonGroup orientation="horizontal"  class="dark:border-gray-600 dark:bg-gray-800 p-2">
      <UButton class="p-2 w-11/12" :to="explorerUrl" target="_blank" variant="link" color="gray" :label="txHash" truncate/>
      <UButton v-if="isSupported" :icon="copied? 'i-heroicons-check': 'i-heroicons-document-duplicate'" variant="ghost" @click="copy(props.txHash)"/>
    </UButtonGroup>
  </ClientOnly>
</template>
