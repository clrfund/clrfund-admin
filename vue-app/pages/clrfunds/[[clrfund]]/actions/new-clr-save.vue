<script setup lang="ts">
const app = useAppStore()

// progress indicator
const step = ref(0)
const steps = [
  { label: 'Deploy ClrFund', slot: 'deploy-clrfund' },
  { label: 'Deploy matching pool', slot: 'deploy-pool' },
  { label: 'Approve matching pool' },
  { label: 'Deploy registries' },
  { label: 'Initialize ClrFund' }
]

const isOpen = ref(false)
const title = ref('')
const txHash = ref('')
const txError = ref('')

const safeAddress = ref('')

const state = reactive({
  clrfund: undefined,
  coordinator: undefined,
  maciPublicKey: undefined,
  tokenAddress: undefined,
  userRegistryType: undefined,
  recipientRegistryType: undefined
})

async function onCreateClrFund() {
  title.value = steps[0].label
  isOpen.value = true
  txError.value = ''
  txHash.value = ''
  try {
    const tx = await app.deployClrFund((message) => {
      title.value = message
    }, safeAddress.value)
    txHash.value = tx?.hash || ''
    isOpen.value = false

    if( step.value < steps.length ) {
      step.value = step.value + 1
    }
  }
  catch (e) {
    txError.value = (e as Error).message
  }
}

async function onDeployPool() {
  title.value = steps[1].label
  isOpen.value = true
  txError.value = ''
  txHash.value = ''
  try {
    const tx = await app.deployClrFund((message) => {
      title.value = message
    }, safeAddress.value)
    txHash.value = tx?.hash || ''
    isOpen.value = false

    if( step.value < steps.length ) {
      step.value = step.value + 1
    }
  }
  catch (e) {
    txError.value = (e as Error).message
  }
}
</script>

<template>
  <UTabs :items="steps" class="mx-5" :default-index="step" >
    <template #default="{ item, index }" class="flex">
      <div class="flex items-center gab-2 relative truncate text-center text-teal-500">
        <span class="truncate">{{ index + 1 }}<span class="invisible sm:visible">. {{ item.label }}</span></span>
      </div>
    </template>
    <template #deploy-clrfund>
      <UCard @submit.prevent="onCreateClrFund">
      <UFormGroup label="Safe Address" name="safe" class="mb-3">
        <UInput v-model="safeAddress" />
      </UFormGroup>
      <template #footer>
        <UButton type="submit" color="black">
            Deploy ClrFund
        </UButton>
      </template>
    </UCard>
    </template>
    <template #deploy-pool>
      <UCard @submit.prevent="onDeployPool">
      <UFormGroup label="Safe Address" name="safe" class="mb-3">
        <UInput v-model="safeAddress" />
      </UFormGroup>
      <template #footer>
        <UButton type="submit" color="black">
            Deploy matching pool
        </UButton>
      </template>
    </UCard>
    </template>

  </UTabs>
  <UModal v-model="isOpen" prevent-close>
    <transaction-modal :title="title" :tx-error="txError" :tx-hash="txHash" @close="isOpen = false" />
  </UModal>
</template>

