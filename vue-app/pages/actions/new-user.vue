<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const app = useAppStore()

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
