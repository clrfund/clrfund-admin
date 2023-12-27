<script setup lang="ts">
const { isConnected } = useWeb3ModalAccount()
const appStore = useAppStore()
const { factory, isFactoryOwner, isUserRegistryOwner, signUpDuration, votingDuration } = storeToRefs(appStore)
const unsupportedChainError = new UnsupportChainError()

const actions = ref([
  { url: '/actions/set-duration', label: 'Change Round Duration', icon: 'i-carbon-time', isEnabled: isFactoryOwner },
  { url: '/actions/new-user', label: 'Add User', icon: 'i-carbon-bot', isEnabled: isUserRegistryOwner },
  { url: '/actions/new-round', label: 'New Funding Round', icon: 'i-carbon-rocket', isEnabled: isFactoryOwner },
  { url: '/actions/finalize', label: 'Finalize Round', icon: 'i-carbon-flag', isEnabled: isFactoryOwner },
  { url: '/actions/cancel-round', label: 'Cancel Round', icon: 'i-carbon-error', isEnabled: isFactoryOwner },
])

</script>

<template>
  <UContainer as="div">
    <UAlert
      v-if="!isConnected"
      icon="i-carbon-warning"
      color="red"
      variant="subtle"
      title="Please connect your wallet."
    />
    <div v-else>
      <div v-if="!factory">
        <UAlert icon="i-carbon-error" color="red" variant="soft" :title="unsupportedChainError.message"></UAlert>
      </div>
      <div v-else-if="!isFactoryOwner">
        <UAlert icon="i-carbon-error" color="red" variant="soft" title="Please connect with the account that owns the funding round factory"></UAlert>
      </div>
      <div v-if="factory">
        <div class="text-center">
          <div><em text-lg op75>Funding Round Factory:</em></div>
          <div>{{ factory }}</div>
          <div>Current signup duration (s): {{ signUpDuration }}</div>
          <div>Current voting duration (s): {{ votingDuration }}</div>
        </div>
        <div class="flex flex-col gap-5 items-center mt-5">
          <div v-for="action in actions" :key="action.label" class="w-full">
            <NuxtLink :to="action.isEnabled? action.url : ''" :class="{ 'hover:cursor-not-allowed': !action.isEnabled }">
              <div class="border-solid border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-lg" :class="{ 'hover:border-green-500': action.isEnabled }">
                <div class="p-8 flex gap-4">
                  <div class="w-6 h-6" :class="action.icon" />
                  <div>{{ action.label }}</div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>
