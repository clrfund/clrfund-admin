<script setup lang="ts">
const { isConnected } = useWeb3ModalAccount()
const appStore = useAppStore()
const { factory, isFactoryOwner, isUserRegistryOwner, factoryOwner, userRegistryOwner, signUpDuration, votingDuration } = storeToRefs(appStore)
const unsupportedChainError = new UnsupportChainError()

const actions = ref([
  { url: '/actions/set-duration', label: 'Change Round Duration', icon: 'i-carbon-time', description: 'Change the duration of the next funding round', owner: factoryOwner, isEnabled: isFactoryOwner },
  { url: '/actions/new-user', label: 'Add User', icon: 'i-carbon-bot', description: 'Add a user to the simple user registry', owner: userRegistryOwner, isEnabled: isUserRegistryOwner },
  { url: '/actions/new-round', label: 'New Funding Round', icon: 'i-carbon-rocket', description: 'Start a new funding round', owner: factoryOwner, isEnabled: isFactoryOwner },
  { url: '/actions/finalize', label: 'Finalize Round', icon: 'i-carbon-flag', description: 'Finalize the current funding round', owner: factoryOwner, isEnabled: isFactoryOwner },
  { url: '/actions/cancel-round', label: 'Cancel Round', icon: 'i-carbon-error', description: 'Cancel the current funding round', owner: factoryOwner, isEnabled: isFactoryOwner },
])

</script>

<template>
  <div>
    <div v-if="!isConnected" class="mx-auto max-w-lg">
      <UAlert
        icon="i-carbon-warning"
        color="red"
        variant="subtle"
        title="Please connect your wallet."
      />
    </div>
    <div v-else>
      <div v-if="!factory" class="mx-auto max-w-md">
        <UAlert icon="i-carbon-error" color="red" variant="soft" :title="unsupportedChainError.message"></UAlert>
      </div>
      <div v-if="factory">
        <div class="text-center">
          <div><em text-lg op75>Funding Round Factory:</em></div>
          <div>{{ factory }}</div>
          <div>Current signup duration (s): {{ signUpDuration }}</div>
          <div>Current voting duration (s): {{ votingDuration }}</div>
        </div>
        <div class="flex flex-wrap justify-center gap-5 m-10">
          <div v-for="action in actions" :key="action.label"
            class="w-96 min-h-24 border-solid border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-lg"
            :class="{ 'hover:border-green-500': action.isEnabled }">
            <NuxtLink :to="action.isEnabled? action.url : ''" :class="{ 'hover:cursor-not-allowed': !action.isEnabled }">
              <div class="p-6">
                <div class="flex gap-4">
                  <div class="w-6 h-6" :class="action.icon" />
                  <div class="font-semibold">{{ action.label }}</div>
                </div>
                <div class="mt-2">
                  <div>{{ action.description }}</div>
                  <UAlert :ui="{ padding: 'py-4' }" variant="soft" color="red" v-if="!action.isEnabled" title="Please connect with account">
                    <template #description><div class="truncate">{{ action.owner }}</div></template>
                  </UAlert>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
