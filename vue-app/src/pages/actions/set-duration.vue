<script setup lang="ts">

const router = useRouter()
const app = useAppStore()

const open = ref(false)
const title = 'Change Next Round Duration'
const txDialog = useConfirmDialog(open)

const signUpDuration = ref<number|undefined>()
const votingDuration = ref<number|undefined>()
const txHash = ref('')
const txError = ref('')
const explorerUrl = computed(() => app.getExplorerUrlByHash(txHash.value))

txDialog.onConfirm(() => {
  open.value = false
})

txDialog.onReveal(async () => {
  txError.value = ''
  txHash.value = ''

  try {
    if (!signUpDuration.value) {
      throw new Error('Missing signup duration input value')
    }

    if (!votingDuration.value) {
      throw new Error('Missing voting durating input value')
    }

    const tx = await app.changeRoundDuration(signUpDuration.value, votingDuration.value)
    txHash.value = tx.hash
  } catch (e) {
    txError.value = (e as Error).message
  }
})

</script>

<template>
  <div>
    <p>
     {{ title }}
    </p>
    <div>
      <label>Signup duration &#40;seconds&#41;</label>
      <NumberInput
        v-model="signUpDuration"
        autocomplete="false"
      />
    </div>
    <div>
      <label>Voting duration &#40;seconds&#41;</label>
      <NumberInput
        v-model="votingDuration"
        autocomplete="false"
      />      
    </div>
    <div>
      <button m-3 mt-8 text-sm action-btn :disabled="!votingDuration || !signUpDuration" @click="txDialog.reveal()">
        Go
      </button>
      <button m-3 mt-8 text-sm secondary-btn @click="router.push('/')">
        Home
      </button>
    </div>

    <teleport to="body" v-if="open" >
      <transaction-modal :title="title" :tx-error="txError" :tx-hash="txHash" :explorer-url="explorerUrl" @close="txDialog.confirm()"/>
    </teleport>
  </div>
</template>
