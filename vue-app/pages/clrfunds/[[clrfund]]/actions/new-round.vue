<script setup lang="ts">
import type { FormError } from '#ui/types'

const router = useRouter()

const app = useAppStore()
const { clrfund } = storeToRefs(app)

const walletStore = useWalletStore()
const { isConnected } = storeToRefs(walletStore)

const isLoading = ref(true)

const isOpen = ref(false)
const title = 'Start a New Round'

const txHash = ref('')
const txError = ref('')

const state = reactive({
  duration: '',
})

onMounted(() => {
  if (!clrfund.value) router.push('/')

  isLoading.value = false
})

function validate(state: any): FormError[] {
  const errors = []
  if (!state.duration) errors.push({ path: 'duration', message: 'Required' })

  try {
    Number.parseInt(state.duration)
  } catch {
    errors.push({ path: 'duration', message: 'Invalid duration' })
  }

  return errors
}

async function deployNewRound() {
  isOpen.value = true
  txError.value = ''
  txHash.value = ''

  try {
    const tx = await app.deployNewRound(Number.parseInt(state.duration))
    txHash.value = tx.hash
  } catch (e) {
    txError.value = (e as Error).message
  }
}
</script>

<template>
  <AppPage>
    <PageHeader>{{ title }}</PageHeader>

    <div v-if="isLoading">Loading...</div>
    <template v-else>
      <UForm
        class="space-y-4 w-full"
        :state="state"
        :validate="validate"
        @submit="deployNewRound"
      >
        <UFormGroup label="Duration" name="duration" required>
          <UInput
            v-model="state.duration"
            placeholder="Funding round duration in seconds"
          />
        </UFormGroup>
      </UForm>
      <div class="flex gap-4">
        <UButton
          v-if="isConnected"
          type="submit"
          :disabled="!clrfund"
          @click="deployNewRound"
        >
          Submit
        </UButton>
        <WalletWidget v-else />
        <UButton color="gray">
          <NuxtLink to="/"> Cancel </NuxtLink>
        </UButton>
      </div>
    </template>

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
