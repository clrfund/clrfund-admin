<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const router = useRouter()
const app = useAppStore()

const isOpen = ref(false)
const title = 'Finalize Current Round'

const txHash = ref('')
const txError = ref('')
const explorerUrl = computed(() => app.getExplorerUrlByHash(txHash.value))

const state = reactive({
  credits: undefined,
  salt: undefined
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (state.credits === undefined) {
    errors.push({ path: 'credits', message: 'Required' })
  }
  if (!state.salt) errors.push({ path: 'salt', message: 'Required' })
  return errors
}

async function onSubmit (event: FormSubmitEvent<any>) {
  isOpen.value = true
  txError.value = ''
  txHash.value = ''

  try {
    const tx = await app.finalizeRound(event.data.credits, event.data.salt)
    txHash.value = tx.hash
  } catch (e) {
    txError.value = (e as Error).message
  }
}

</script>

<template>
  <UContainer>
    <UCard>
      <template #header>
        <div class="h-6 text-center">{{ title }}</div>
      </template>
        <div>
        <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormGroup label="Voice Credits" name="credits" required>
            <UInput v-model="state.credits" placeholder="totalVoiceCredits.spent from tally.json"/>
          </UFormGroup>

          <UFormGroup label="Salt" name="salt" required>
            <UInput v-model="state.salt" placeholder="totalVoiceCredits.salt from tally.json"/>
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
      <transaction-modal :title="title" :tx-error="txError" :tx-hash="txHash" :explorer-url="explorerUrl" @close="isOpen = false"/>
    </UModal>
  </UContainer>
</template>
