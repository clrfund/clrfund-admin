<script setup lang="ts">

const router = useRouter()
const app = useAppStore()

const title = 'Start a New Round'
const open = ref(false)

const txHash = ref('')
const txError = ref('')
const explorerUrl = computed(() => app.getExplorerUrlByHash(txHash.value))

const txDialog = useConfirmDialog(open)
txDialog.onConfirm(() => {
  open.value = false
})

txDialog.onReveal(async () => {
  // clear previous error and tx hash
  txError.value = ''
  txHash.value = ''

  try {
    const tx = await app.deployNewRound()
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
      Are you sure you want to deploy a new funding round?
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
