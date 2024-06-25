<script setup lang="ts">
const walletStore = useWalletStore()
const { isConnected } = storeToRefs(walletStore)

const app = useAppStore()
const { clrfund } = storeToRefs(app)
// disable the submit button
const disableSubmit = computed(() => !clrfund.value)

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
  } catch (e) {
    txError.value = (e as Error).message
  }
}
</script>

<template>
  <AppPage>
    <PageHeader>
      {{ title }}
    </PageHeader>
    <div class="text-center">
      Are you sure you want to cancel the current funding round? This operation
      cannot be undone.
    </div>
    <div class="flex justify-center gap-4">
      <UButton
        v-if="isConnected"
        type="submit"
        :disabled="disableSubmit"
        @click="onSubmit"
      >
        Submit
      </UButton>
      <wallet-widget v-else />
      <UButton color="gray">
        <NuxtLink to="/"> Cancel </NuxtLink>
      </UButton>
    </div>
    <UModal v-model="isOpen" prevent-close>
      <transaction-modal
        :title="title"
        :tx-error="txError"
        :tx-hash="txHash"
        @close="isOpen = false"
      />
    </UModal>
  </AppPage>
</template>
