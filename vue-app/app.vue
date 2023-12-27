<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()

const ethersConfig = defaultConfig({
  metadata: {
    name: 'clrfund',
    description: 'A privacy focused quadratic funding protocol',
    url: 'https://clr.fund',
    icons: [
      '/assets/logo.svg',
    ],
  },
})

const projectId = runtimeConfig.public.walletConnectProjectId
createWeb3Modal({
  ethersConfig,
  chains,
  projectId,
})

const { isConnected, chainId, address } = useWeb3ModalAccount()
const appStore = useAppStore()

// call loadAppData() in the app level instead of the view or component level
// to avoid component unmounted causing WalletConnect composables to lose reactivity
onMounted(() => {
  appStore.loadAppData()
})

watch([isConnected, chainId, address], () => {
  appStore.loadAppData()
})

</script>

<template>
  <div>
    <AppHeader />
    <div>
      <NuxtPage />
    </div>
  </div>
</template>
