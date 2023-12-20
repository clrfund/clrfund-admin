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
</script>

<template>
  <div>
    <AppHeader />
    <div>
      <NuxtPage />
    </div>
  </div>
</template>
