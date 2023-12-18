<script setup lang="ts">

const router = useRouter()
const app = useAppStore()

const title = ref('Finalize the current funding round')
const open = ref(false)

const totalVoiceCredits = ref('')
const totalSpentVoiceCreditsSalt = ref('')
const txHash = ref('')
const txError = ref('')
const explorerUrl = computed(() => app.getExplorerUrlByHash(txHash.value) )

const txDialog = useConfirmDialog(open)

txDialog.onConfirm(() => {
  open.value = false
})

txDialog.onReveal(async () => {
  // clear previous invocation data
  txHash.value = ''
  txError.value = ''

  try {
    const tx = await app.finalizeRound(totalVoiceCredits.value, totalSpentVoiceCreditsSalt.value)
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
      <div>
        <TheInput
          v-model="totalVoiceCredits"
          placeholder="total spent voice credit"
          autocomplete="false"
        />
      </div>
      <div>
        <TheInput
        v-model="totalSpentVoiceCreditsSalt"
        placeholder="total spent voice credit salt"
        autocomplete="false"
      />
      </div>
    </div>

    <div>
      <button m-3 mt-8 text-sm action-btn @click="txDialog.reveal()">
        Go
      </button>
      <button m-3 mt-8 text-sm action-btn @click="router.push('/')">
        Home
      </button>
    </div>

    <teleport to="body" v-if="open" >
      <transaction-modal :title="title" :tx-error="txError" :tx-hash="txHash" :explorer-url="explorerUrl" @close="txDialog.confirm()"/>
    </teleport>
  </div>
</template>
