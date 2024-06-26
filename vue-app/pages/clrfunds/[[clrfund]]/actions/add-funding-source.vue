<script setup lang="ts">
import { formatUnits, parseUnits } from 'ethers'
import type { FormError } from '#ui/types'
import { DEFAULT_FUNDING_SOURCE_APPROVAL_AMOUNT } from '~/utils/constants'

const router = useRouter()
const app = useAppStore()
const { clrfund } = storeToRefs(app)

const wallet = useWalletStore()
const { isConnected } = storeToRefs(wallet)

// disable the submit button
const disableSubmit = computed(() => !clrfund.value)

const title = ref('')
const isOpen = ref(false)
const txHash = ref('')
const txError = ref('')

const state = reactive({
  fundingSource: '',
  fundingAmount: parseUnits(DEFAULT_FUNDING_SOURCE_APPROVAL_AMOUNT).toString(),
})

onMounted(async () => {
  if (!clrfund.value) router.push('/')
})

function validate(state: any): FormError[] {
  const errors: FormError[] = []
  if (!state.fundingSource)
    errors.push({ path: 'funder-address', message: 'Required' })

  return errors
}

async function addFundingSource() {
  isOpen.value = true
  txError.value = ''
  txHash.value = ''

  try {
    title.value = 'Add Funding Source'
    const tx = await app.addFundingSource(state.fundingSource)
    txHash.value = tx.hash
  } catch (e) {
    txError.value = (e as Error).message
  }
}
</script>

<template>
  <AppPage>
    <PageHeader>Add Funding Source</PageHeader>
    <div class="w-full">
      <UForm
        :validate="validate"
        :state="state"
        class="space-y-4"
        @submit="addFundingSource"
      >
        <UFormGroup label="Funder Address" name="funder-address" required>
          <UInput v-model="state.fundingSource" placeholder="0x123..." />
        </UFormGroup>
        <div class="flex gap-3">
          <UButton v-if="isConnected" type="submit" :disabled="disableSubmit">
            Submit
          </UButton>
          <wallet-widget v-else />
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
