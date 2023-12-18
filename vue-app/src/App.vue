<template>
  <header>
    <div m-5 mb-10 gap-2 text-xl flex justify-between>
      <div :class="{ 'logo': !isDark }" @click="router.push('/')">
        <img  alt="clrfund" src="./assets/logo.svg" />
      </div>
      <div flex-inline gap-3>
        <button icon-btn @click="toggleDark()">
          <div i-carbon-sun dark:i-carbon-moon />
        </button>
        <w3m-account-button balance="hide" v-if="isConnected"/>
        <w3m-connect-button v-else/>
      </div>
    </div>
  </header>
  <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    <div class="content">
      <router-view />
    </div>
  </main>
</template>

<script lang="ts" setup>
  import { useWeb3ModalAccount } from '@web3modal/ethers/vue'
  const { isConnected } = useWeb3ModalAccount()
  const router = useRouter()
</script>


<style scoped>
  .logo img {
    filter: invert(0.8);
  }
</style>