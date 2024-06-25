<script setup lang="ts">
const colorMode = useColorMode()

const app = useAppStore()
const wallet = useWalletStore()
const { selectedChainId } = storeToRefs(wallet)

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})

const supportedChains = Object.values(chains).map((chain) => ({
  id: chain.id,
  label: chain.label,
}))
</script>

<template>
  <div
    class="py-2 px-5 gap-2 text-xl flex justify-between border-b-2 dark:border-cool-700"
  >
    <div class="flex gap-3">
      <NuxtLink to="/" class="flex items-center">
        <img :class="{ logo: !isDark }" alt="clrfund" src="/assets/logo.svg" />
      </NuxtLink>
      <UButton
        icon="i-heroicons-bars-3"
        size="sm"
        square
        :color="isDark ? 'black' : 'gray'"
        variant="ghost"
        aria-label="Theme"
        class="flex items-center sm:hidden"
        @click.prevent="app.toggleMobileMenu()"
      />
    </div>
    <div class="flex gap-3">
      <UButton
        :icon="isDark ? 'i-heroicons-moon' : 'i-heroicons-sun'"
        :color="isDark ? 'black' : 'gray'"
        variant="ghost"
        aria-label="Theme"
        @click.prevent="isDark = !isDark"
      />
      <wallet-widget />
      <USelectMenu
        v-model="selectedChainId"
        :options="supportedChains"
        value-attribute="id"
        option-attribute="label"
      />
    </div>
  </div>
</template>

<style scoped>
.logo {
  filter: invert(0.8);
}
.network-button {
  min-width: 200px;
  align-content: end;
}
</style>
