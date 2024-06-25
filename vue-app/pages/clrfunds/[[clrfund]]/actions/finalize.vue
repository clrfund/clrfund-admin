<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const router = useRouter()
const app = useAppStore()
const { clrfund } = storeToRefs(app)

const walletStore = useWalletStore()
const { isConnected } = storeToRefs(walletStore)

// disable the submit button
const disableSubmit = computed(() => !clrfund.value)

const isOpen = ref(false)
const title = 'Finalize Current Round'

const txHash = ref('')
const txError = ref('')

const state = reactive({
  totalSpent: '',
  totalSpentSalt: '',
  resultCommitment: '',
  perVOSpentVoiceCreditsHash: '',
})

onMounted(async () => {
  try {
    console.log('testing onMounted finalize 2')
    const tallyResults = await app.getTallyResults()
    console.log('after onmonted', tallyResults)
    state.totalSpent = tallyResults.totalSpent
    state.totalSpentSalt = tallyResults.totalSpentSalt
    state.resultCommitment = tallyResults.resultCommitment
    state.perVOSpentVoiceCreditsHash = tallyResults.perVOSpentVoiceCreditsHash
  } catch (e) {
    // try to prefetch the result
    txError.value =
      e instanceof Error ? (e as Error).message : 'Error getting tally results'
  }
})

function validate(state: any): FormError[] {
  const errors = []
  if (state.totalSpent === undefined)
    errors.push({ path: 'spent', message: 'Required' })

  if (!state.totalSpentSalt) errors.push({ path: 'salt', message: 'Required' })
  if (!state.resultCommitment)
    errors.push({ path: 'result', message: 'Required' })
  if (!state.perVOSpentVoiceCreditsHash)
    errors.push({ path: 'per-vote-option-commitment', message: 'Required' })

  return errors
}

async function finalizeRound(event: FormSubmitEvent<any>) {
  isOpen.value = true
  txError.value = ''
  txHash.value = ''

  try {
    const tx = await app.finalizeRound(state)
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
        @submit="finalizeRound"
      >
        <UFormGroup label="Total Spent" name="spent" required>
          <UInput
            v-model="state.totalSpent"
            placeholder="totalSpentVoiceCredits.spent from tally.json"
          />
        </UFormGroup>
        <UFormGroup label="Total Spent Salt" name="salt" required>
          <UInput
            v-model="state.totalSpentSalt"
            placeholder="totalSpentVoiceCredits.salt from tally.json"
          />
        </UFormGroup>
        <UFormGroup label="Results commitment" name="result" required>
          <UInput
            v-model="state.resultCommitment"
            placeholder="results.commitment from tally.json"
          />
        </UFormGroup>
        <UFormGroup
          label="PerVOSpentVoiceCredits Commitment"
          name="per-vote-option-commitment"
          required
        >
          <UInput
            v-model="state.perVOSpentVoiceCreditsHash"
            placeholder="perVOSpentVoiceCredits.Commitment from tally.json"
          />
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
