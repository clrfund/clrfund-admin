<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const app = useAppStore()
const wallet = useWalletStore()
const { isConnected } = storeToRefs(wallet)

const loading = ref(true)

const {
  clrfund,
  clrfundOwner,
  coordinator,
  coordinatorPubKey,
  userRegistry,
  recipientRegistry,
  nativeToken,
  chain,
} = storeToRefs(app)

function getExternalLink(address?: string): string | undefined {
  if (!chain.value) return
  if (!address) return

  return getExplorerUrlByAddress(chain.value.explorerUrl, address)
}

const links = computed(() => {
  if (!isConnected.value) {
    return []
  }

  return [
    {
      label: 'Address',
      badge: clrfund.value,
      to: clrfund.value,
    },
    {
      label: 'Owner',
      badge: clrfundOwner.value,
      to: clrfundOwner.value,
    },
    {
      label: 'User Registry',
      badge: userRegistry.value,
      to: userRegistry.value,
    },
    {
      label: 'Recipient Registry',
      badge: recipientRegistry.value,
      to: recipientRegistry.value,
    },
    {
      label: 'Native Token',
      badge: nativeToken.value,
      to: nativeToken.value,
    },
    {
      label: 'Coordinator',
      badge: coordinator.value,
      to: coordinator.value,
    },
    {
      label: 'MACI Public Key',
      badge: coordinatorPubKey.value,
    },
  ]
})

onMounted(async () => {
  if (!isConnected.value) {
    router.push('/')
  }

  clrfund.value = Array.isArray(route.params.clrfund)
    ? route.params.clrfund[0]
    : route.params.clrfund

  try {
    await app.loadAppData()
    loading.value = false
  } catch {
    router.push('/')
  }
})
</script>

<template>
  <AppPage>
    <PageHeader>ClrFund</PageHeader>
    <div class="w-full">
      <div v-if="loading">loading...</div>
      <div v-else v-for="item in links" :key="item.label" class="pt-2">
        <div>{{ item.label }}:</div>
        <CopyableField
          :value="item.badge"
          :external-link="getExternalLink(item.to)"
        />
      </div>
    </div>
  </AppPage>
</template>
