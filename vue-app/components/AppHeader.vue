<script setup lang="ts">
const { isConnected } = useWeb3ModalAccount()
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})
</script>

<template>
  <header>
    <div class="m-5 mb-10 gap-2 text-xl flex justify-between">
      <NuxtLink to="/">
        <img :class="{ logo: !isDark }" alt="clrfund" src="/assets/logo.svg">
      </NuxtLink>
      <div class="flex gap-3">
        <UButton
          :icon="isDark ? 'i-carbon-moon' : 'i-carbon-sun'"
          :color="isDark ? 'black' : 'gray'"
          variant="ghost"
          aria-label="Theme"
          @click="isDark = !isDark"
        />
        <w3m-account-button v-if="isConnected" balance="hide" />
        <w3m-connect-button v-else />
      </div>
    </div>
  </header>
</template>

<style scoped>
  .logo {
    filter: invert(0.8);
  }
</style>
