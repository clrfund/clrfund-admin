<script setup lang="ts">
const { isConnected } = useWeb3ModalAccount()
const app = useAppStore()
const { factory, isFactoryOwner, factoryOwner } = storeToRefs(app)
// disable the submit button
const disableSubmit = computed(() => !(factory.value && isFactoryOwner.value))

const isOpen = ref(false)
const title = 'Start a New Round'

const txHash = ref('')
const txError = ref('')

async function onSubmit() {
  isOpen.value = true
  txError.value = ''
  txHash.value = ''

  try {
    const tx = await app.deployNewRound()
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
          Are you sure you want to start a new funding round?
        </div>
        <div class="flex justify-center gap-3">
          <UButton v-if="isConnected" type="submit" @click="onSubmit" :disabled="disableSubmit">
              Submit
          </UButton>
          <w3m-connect-button v-else />
          <UButton color="gray">
            <NuxtLink to="/">
              Cancel
            </NuxtLink>
          </UButton>
        </div>
      </div>
      <div v-if="isConnected">
        <UAlert v-if="!factory" :ui="{ padding: 'pt-4'}" color="red" variant="soft" :title="new UnsupportChainError().message"/>
        <UAlert v-else-if="!isFactoryOwner" :ui="{ padding: 'pt-4'}" color="red" variant="soft" title="Please connect to account" :description="factoryOwner"/>
      </div>
    </UCard>

    <UModal v-model="isOpen" prevent-close>
      <transaction-modal :title="title" :tx-error="txError" :tx-hash="txHash" @close="isOpen = false" />
    </UModal>
  </UContainer>
</template>
