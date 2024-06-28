<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const app = useAppStore()
const wallet = useWalletStore()

const { clrfund, clrfunds } = storeToRefs(app)
const { isConnected, account, chainId } = storeToRefs(wallet)

watch([isConnected, account, chainId], async () => {
  clrfunds.value = []
  app.resetApp()
})
</script>
