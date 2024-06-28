<script setup lang="ts">
interface Props {
  // Boolean to only show Connect button, styled like an action button,
  // which hides the widget that would otherwise display after connecting
  showEth?: boolean
  isActionButton?: boolean
  // Boolean to allow connect button to be full width
  fullWidthMobile?: boolean
}

withDefaults(defineProps<Props>(), {
  showEth: false,
  isActionButton: false,
  fullWidthMobile: false,
})

const wallet = useWalletStore()
const { isConnected, connectedWallet } = storeToRefs(wallet)

async function connectWallet() {
  await wallet.connectWallet()
}

async function disconnectWallet() {
  const label = connectedWallet.value?.label || ''
  try {
    await wallet.disconnectWallet({
      label,
    })
  } catch (e) {
    console.error('Error disconnecting wallet', e)
  }
}
</script>

<template>
  <div :class="{ container: !isActionButton }">
    <UButton v-if="!isConnected" label="Connect" @click="connectWallet" />
    <UButton v-else label="Disconnect" @click="disconnectWallet" />
  </div>
</template>

<style scoped>
.container {
  margin-left: 0.5rem;
  width: fit-content;
}
</style>
