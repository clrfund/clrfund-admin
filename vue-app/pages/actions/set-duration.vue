<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const app = useAppStore()

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
            <UButton type="submit">
              Submit
            </UButton>
            <UButton color="gray">
              <NuxtLink to="/">
                Cancel
              </NuxtLink>
            </UButton>
          </div>
        </UForm>
      </div>
    </UCard>

    <UModal v-model="isOpen" prevent-close>
      <transaction-modal :title="title" :tx-error="txError" :tx-hash="txHash" @close="isOpen = false" />
    </UModal>
  </UContainer>
</template>
