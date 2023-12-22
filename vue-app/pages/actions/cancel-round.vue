<script setup lang="ts">
const app = useAppStore()

const isOpen = ref(false)
const title = 'Cancel Current Round'

const txHash = ref('')
const txError = ref('')

async function onSubmit() {
  isOpen.value = true
  txError.value = ''
  txHash.value = ''

  try {
    const tx = await app.cancelRound()
    txHash.value = tx.hash
  }
  catch (e) {
    txError.value = (e as Error).message
  }
}
</script>

<template>
  <UContainer>
    <UCard>
      <template #header>
        <div class="h-6 text-center">
          {{ title }}
        </div>
      </template>
      <div>
        <div class="mb-10 text-center">
          Are you sure you want to cancel the current funding round? This operation cannot be undone.
        </div>
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
      <transaction-modal :title="title" :tx-error="txError" :tx-hash="txHash" @close="isOpen = false" />
    </UModal>
  </UContainer>
</template>
