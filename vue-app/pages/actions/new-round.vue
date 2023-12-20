<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const router = useRouter()
const app = useAppStore()

const isOpen = ref(false)
const title = 'Start a New Round'

const txHash = ref('')
const txError = ref('')
const explorerUrl = computed(() => app.getExplorerUrlByHash(txHash.value))

async function onSubmit (event: FormSubmitEvent<any>) {
  isOpen.value = true
  txError.value = ''
  txHash.value = ''

  try {
    const tx = await app.deployNewRound()
    txHash.value = tx.hash
  } catch (e) {
    txError.value = (e as Error).message
  }
}

</script>

<template>
  <UContainer>
    <UCard>
      <template #header>
        <div class="h-6 text-center">{{ title }}</div>
      </template>
      <div>
        <div class="mb-10 text-center">Are you sure you want to start a new funding round?</div>
        <div class="flex justify-center gap-3">
          <UButton type="submit" @click="onSubmit">
            Submit
          </UButton>
          <UButton color="gray">
            <NuxtLink to="/">
              Cancel
            </NuxtLink>
          </UButton>
        </div>
      </div>
    </UCard>

    <UModal v-model="isOpen" prevent-close>
      <transaction-modal :title="title" :tx-error="txError" :tx-hash="txHash" :explorer-url="explorerUrl" @close="isOpen = false"/>
    </UModal>
  </UContainer>
</template>
