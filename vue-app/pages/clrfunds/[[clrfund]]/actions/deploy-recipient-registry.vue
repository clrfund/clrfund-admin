<script setup lang="ts">
import type { MetaTransactionData } from '@safe-global/safe-core-sdk-types'
import { Contract } from 'ethers'
import type { FormError } from '#ui/types'
import { getEventLogArg } from '@/utils/events'
import { executeSafeTransactions } from '~/utils/safe'

const router = useRouter()
const walletStore = useWalletStore()
const { isConnected } = storeToRefs(walletStore)

const appStore = useAppStore()
const { clrfund, clrfundOwner } = storeToRefs(appStore)
// disable the submit button
const disableSubmit = computed(() => !clrfund.value)

const isOpen = ref(false)
const title = 'Deploy Recipient Registry'

const txHash = ref('')
const txError = ref('')

const recipientRegistryAddress = ref('')
const state = reactive({
  recipientRegistryType: '',
  challengePeriod: DEFAULT_CHALLENGE_PERIOD,
  deposit: DEFAULT_BASE_DEPOSIT,
})

onMounted(async () => {
  if (!clrfund.value) router.push('/actions')
})

function validate(state: any): FormError[] {
  const errors: FormError[] = []
  if (state.recipientRegistryType === undefined)
    errors.push({ path: 'recipient-registry-type', message: 'Required' })

  return errors
}

async function deployRecipientRegistry() {
  if (!clrfund.value) throw new Error('ClrFund address missing')

  isOpen.value = true
  const transactions: MetaTransactionData[] = []
  const recipientRegistryName = recipientRegistries[state.recipientRegistryType]
  const args = getRecipientRegistryArgs({
    ...state,
    clrfundAddress: clrfund.value,
  })
  const metaTransaction = await appStore.getDeployContractMetaTransaction(
    recipientRegistryName,
    args
  )
  transactions.push(metaTransaction)

  if (transactions.length === 0) {
    // no need to deploy registries
    return
  }

  const signer = await appStore.getSigner()
  const response = await executeSafeTransactions(
    clrfundOwner.value,
    signer,
    transactions
  )
  const tx = response?.transactionResponse
  if (!tx) {
    throw new Error(
      'Failed to deploy recipient registry, transaction response is not available'
    )
  }
  const receipt = await tx?.wait()
  if (receipt?.status !== 1)
    throw new Error('Failed to deploy recipient registry')

  const createContract = new Contract(clrfundOwner.value, [
    'event ContractCreation(address indexed newContract)',
  ])

  recipientRegistryAddress.value = await getEventLogArg(
    tx,
    createContract,
    'ContractCreation',
    'newContract'
  )
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
        @submit="deployRecipientRegistry"
      >
        <UFormGroup
          label="Select a recipient registry type"
          name="recipient-registry-type"
        >
          <USelectMenu
            v-model="state.recipientRegistryType"
            :options="recipientRegistryTypes"
          />
        </UFormGroup>
        <template v-if="state.recipientRegistryType === 'optimistic'">
          <UFormGroup label="Challenge period" name="challenge-period">
            <UInput v-model="state.challengePeriod" placeholder="9999" />
          </UFormGroup>
          <UFormGroup label="Deposit" name="deposit">
            <UInput v-model="state.deposit" placeholder="0.001" />
          </UFormGroup>
        </template>
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
    <div v-if="recipientRegistryAddress">
      Recipient registry: {{ recipientRegistryAddress }}
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
