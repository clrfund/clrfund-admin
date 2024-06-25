<script setup lang="ts">
const router = useRouter()

const wallet = useWalletStore()
const { isConnected, account, chainId } = storeToRefs(wallet)

const app = useAppStore()
const { clrfund, clrfunds } = storeToRefs(app)

const loading = ref(true)

function onCreateClrFund() {
  router.push('/new-clrfund')
}

onMounted(async () => {
  clrfunds.value = await app.getClrFunds()
  loading.value = false
})

const links = computed(() => {
  if (!clrfunds.value) {
    return []
  }
  return clrfunds.value.map((clrfund) => {
    return {
      label: clrfund,
      icon: 'i-heroicons-cog-6-tooth',
      to: `/clrfunds/${clrfund}`,
    }
  })
})
</script>

<template>
  <AppPage>
    <div class="flex justify-between w-full">
      <PageHeader class="text-left"> ClrFund Instances </PageHeader>
      <UButton @click.prevent="onCreateClrFund"> Create ClrFund </UButton>
    </div>
    <div class="w-full">
      <div v-if="!isConnected">
        Connect to a wallet to see your ClrFund instances
      </div>
      <div v-else-if="loading">Loading...</div>
      <div v-else-if="clrfunds.length === 0" class="text-left">
        <div v-if="isConnected">
          You do not own any ClrFund instance. Create a ClrFund to continue.
        </div>
      </div>

      <div v-else>
        <UVerticalNavigation :links="links" />
      </div>
    </div>
  </AppPage>
</template>

<style scoped>
.logo {
  filter: invert(0.8);
}
</style>
