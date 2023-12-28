<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const { isConnected } = useWeb3ModalAccount()
const app = useAppStore()
const { factory, isUserRegistryOwner, userRegistryOwner } = storeToRefs(app)
// disable the submit button
const disableSubmit = computed(() => !(factory.value && isUserRegistryOwner.value))

const isOpen = ref(false)
const title = 'Add User'

const txHash = ref('')
const txError = ref('')

const state = reactive({
  user: undefined,
})

function validate(state: any): FormError[] {
  const errors = []
  if (!state.user)
    errors.push({ path: 'user', message: 'Required' })
  return errors
}

async function onSubmit(event: FormSubmitEvent<any>) {
  isOpen.value = true
  txError.value = ''
  txHash.value = ''

  try {
    const tx = await app.addUser(event.data.user)
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
          <UFormGroup label="Address" name="user" required>
            <UInput v-model="state.user" size="lg" />
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
        <UAlert v-else-if="!isUserRegistryOwner" :ui="{ padding: 'pt-4'}" color="red" variant="soft" title="Please connect to account" :description="userRegistryOwner"/>
      </div>
    </UCard>

    <UModal v-model="isOpen" prevent-close>
      <transaction-modal :title="title" :tx-error="txError" :tx-hash="txHash" @close="isOpen = false" />
    </UModal>
  </UContainer>
</template>
