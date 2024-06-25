<script setup lang="ts">
import { ZeroAddress, isAddress } from 'ethers'
import type { FormError, FormSubmitEvent } from '#ui/types'
import { isAddressEqual } from '~/utils/address'

const router = useRouter()
const app = useAppStore()
const { clrfund } = storeToRefs(app)
// disable the submit button
const disableSubmit = computed(() => !clrfund.value)

const walletStore = useWalletStore()
const { isConnected } = storeToRefs(walletStore)

const isOpen = ref(false)
const title = 'Set Coordinator'

const txHash = ref('')
const txError = ref('')

const state = reactive({
  coordinator: '',
  coordinatorPubKey: '',
})

onMounted(async () => {
  if (!clrfund.value) router.push('/')
})

function validate(state: any): FormError[] {
  const errors: FormError[] = []
  if (!state.coordinator)
    errors.push({ path: 'coordinator', message: 'Required' })

  if (
    isAddressEqual(state.coordinator, ZeroAddress) ||
    !isAddress(state.coordinator)
  )
    errors.push({ path: 'coordinator', message: 'Invalid address' })

  if (!state.coordinatorPubKey)
    errors.push({ path: 'pubkey', message: 'Required' })
  return errors
}

async function setCoordinator(event: FormSubmitEvent<any>) {
  isOpen.value = true
  txError.value = ''
  txHash.value = ''

  try {
    const tx = await app.setCoordinator(
      state.coordinator,
      state.coordinatorPubKey
    )
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
    <div class="w-full">
      <UForm
        :validate="validate"
        :state="state"
        class="space-y-4"
        @submit="setCoordinator"
      >
        <UFormGroup label="Coordinator Address" name="coordinator" required>
          <UInput v-model="state.coordinator" placeholder="0x123..." />
        </UFormGroup>
        <UFormGroup label="Coordinator MACI PubKey" name="pubkey" required>
          <UInput v-model="state.coordinatorPubKey" placeholder="0x123..." />
        </UFormGroup>
        <div class="flex gap-3">
          <UButton v-if="isConnected" type="submit" :disabled="disableSubmit">
            Submit
          </UButton>
          <WalletWidget v-else />
          <UButton color="gray">
            <NuxtLink to="/"> Cancel </NuxtLink>
          </UButton>
        </div>
      </UForm>
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
