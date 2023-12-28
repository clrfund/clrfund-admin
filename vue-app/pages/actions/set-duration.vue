<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const { isConnected } = useWeb3ModalAccount()
const app = useAppStore()
const { factory, isFactoryOwner, factoryOwner } = storeToRefs(app)
// disable the submit button
const disableSubmit = computed(() => !(factory.value && isFactoryOwner.value))

const isOpen = ref(false)
const title = 'Change Next Round Duration'

const txHash = ref('')
const txError = ref('')

const state = reactive({
  signUpDuration: undefined,
  votingDuration: undefined,
})

function validate(state: any): FormError[] {
  const errors = []
  if (state.signUpDuration === undefined)
    errors.push({ path: 'signup-duration', message: 'Required' })
  if (state.votingDuration === undefined)
    errors.push({ path: 'voting-duration', message: 'Required' })
  return errors
}

async function onSubmit(event: FormSubmitEvent<any>) {
  isOpen.value = true
  txError.value = ''
  txHash.value = ''

  try {
    const tx = await app.changeRoundDuration(event.data.signUpDuration, event.data.votingDuration)
    txHash.value = tx.hash
    await tx.wait()
    // load the new durations
    await app.loadAppData()
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
        <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormGroup label="Signup duration (seconds)" name="signup-duration" required>
            <UInput v-model="state.signUpDuration" type="number" min="1" />
          </UFormGroup>

          <UFormGroup label="Voting duration (seconds)" name="voting-duration" required>
            <UInput v-model="state.votingDuration" type="number" min="1" />
          </UFormGroup>

          <div class="flex gap-3">
            <UButton v-if="isConnected" type="submit" :disabled="disableSubmit">
              Submit
            </UButton>
            <w3m-connect-button v-else />
            <UButton color="gray">
              <NuxtLink to="/">
                Cancel
              </NuxtLink>
            </UButton>
          </div>
        </UForm>
        <UAlert v-if="!factory" :ui="{ padding: 'pt-4'}" color="red" variant="soft" :title="new UnsupportChainError().message"/>
        <UAlert v-else-if="!isFactoryOwner" :ui="{ padding: 'pt-4'}" color="red" variant="soft" title="Please connect to account" :description="factoryOwner"/>
      </div>
    </UCard>

    <UModal v-model="isOpen" prevent-close>
      <transaction-modal :title="title" :tx-error="txError" :tx-hash="txHash" @close="isOpen = false" />
    </UModal>
  </UContainer>
</template>
