<script setup lang="ts">
const router = useRouter()
const app = useAppStore()

const title = ref('Add New Contributor')
const open = ref(false)
const user = ref('')
const txError = ref('')
const txHash = ref('')
const explorerUrl = computed(() => app.getExplorerUrlByHash(txHash.value))

const txDialog = useConfirmDialog(open)

txDialog.onConfirm(() => {
  open.value = false
})

txDialog.onReveal(async () => {
  // clear previous data
  txHash.value = ''
  txError.value = ''

  try {
    const tx = await app.addUser(user.value)
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
      <TheInput
        v-model="user"
        placeholder="User wallet address, 0x233..."
        autocomplete="false"
      />
    </div>

    <div>
      <button m-3 mt-8 text-sm action-btn :disabled="!user" @click="txDialog.reveal()">
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
