<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const route = useRoute()
const app = useAppStore()
const wallet = useWalletStore()

const { clrfund, clrfunds } = storeToRefs(app)
const { isConnected, account, chainId } = storeToRefs(wallet)

watch([isConnected, account, chainId], async () => {
  if (!isConnected.value) {
    clrfunds.value = []
    app.resetApp()
    return
  }

  clrfunds.value = await app.getClrFunds()

  if (!clrfunds.value.includes(clrfund.value)) app.resetApp()
})
</script>
