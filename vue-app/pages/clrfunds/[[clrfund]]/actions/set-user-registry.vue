<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const router = useRouter()
const walletStore = useWalletStore()
const { isConnected } = storeToRefs(walletStore)

const app = useAppStore()
const { clrfund } = storeToRefs(app)
// disable the submit button
const disableSubmit = computed(() => !clrfund.value)

const isOpen = ref(false)
const title = 'Set User Registry'

const txHash = ref('')
const txError = ref('')

const state = reactive({
  userRegistryAddress: '',
})

onMounted(async () => {
  if (!clrfund.value) router.push('/actions')
})

function validate(state: any): FormError[] {
  const errors: FormError[] = []
  if (state.userRegistryAddress === undefined)
    errors.push({ path: 'user-registry-address', message: 'Required' })

  return errors
}

async function setUserRegistry() {
  isOpen.value = true
  txError.value = ''
  txHash.value = ''

  try {
    const tx = await app.setUserRegistry(state.userRegistryAddress)
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
        @submit="setUserRegistry"
      >
        <UFormGroup
          label="User Registry Address"
          name="user-registry-address"
          required
        >
          <UInput v-model="state.userRegistryAddress" placeholder="0x123..." />
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
