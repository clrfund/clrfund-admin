<script setup lang="ts" generic="T extends any, O extends any">
import { useWeb3ModalAccount } from '@web3modal/ethers/vue'
const account = useWeb3ModalAccount()
const router = useRouter()

defineOptions({
  name: 'IndexPage',
})

const appStore = useAppStore()
const { factory, isFactoryOwner, factoryOwner, signUpDuration, votingDuration } = storeToRefs(appStore)

onMounted(() => {
  appStore.loadAppData()
})

watch([account.isConnected, account.chainId], () => {
  appStore.loadAppData()
})

</script>

<template>
  <div class="min-w-max">
    <div v-if="!account.isConnected">
    <em color-red-400>** Please connect your wallet **</em>
    </div>
    <div v-else>
      <div v-if="factory">
        <div><em text-lg op75>Funding Round Factory:</em></div>
        <div>{{ factory }}</div>
        <div>Current signup duration (s): {{ signUpDuration }}</div>
        <div>Current voting duration (s): {{ votingDuration }}</div>
      </div>
      <div v-if="!isFactoryOwner">
        <div>Factory owner: {{ factoryOwner }}</div>
        <em color-red-400>** Pleaes connect with the account that owns the funding round factory **</em>
      </div>
      <div py-4 />
      <div>
        <button
          class="m-3 p-5 text-lg btn"
          @click="router.push(`/actions/set-duration`)"
          :disabled="!isFactoryOwner"
        >
          Change Round Duration
      </button>
      </div>
      <div>
        <button
          class="m-3 p-5 text-lg btn"
          @click="router.push(`/actions/new-user`)"
          :disabled="!isFactoryOwner"
          >
          Add Contributor
      </button>
      </div>
      <div>
        <button
          class="m-3 p-5 text-lg btn"
          @click="router.push(`/actions/new-round`)"
          :disabled="!isFactoryOwner"
        >
          Deploy New Round
        </button>
      </div>
      <div>
        <button
          class="m-3 p-5 text-lg btn"
          @click="router.push(`/actions/cancel-round`)"
          :disabled="!isFactoryOwner"
        >
          Cancel Current Round
      </button>
      </div>
      <div>
        <button
          class="m-3 p-5 text-lg btn"
          @click="router.push(`/actions/finalize`)"
          :disabled="!isFactoryOwner"
        >
          Finalize Current Round 
        </button>
      </div>
    </div>
  </div>
  </template>

