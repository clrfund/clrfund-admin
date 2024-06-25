<script setup>
const app = useAppStore()
const { clrfund } = storeToRefs(app)

const links = computed(() => {
  const lists = [
    {
      label: 'Home',
      icon: 'i-heroicons-home',
      to: '/',
    },
    {
      label: 'MACI key',
      icon: 'i-heroicons-key',
      to: '/maci-key',
    },
  ]

  if (clrfund.value) {
    return lists.concat([
      {
        label: 'ClrFund',
        icon: 'i-heroicons-cog-6-tooth',
        to: `/clrfunds/${clrfund.value}`,
      },
      {
        label: 'Set user registry',
        icon: 'i-heroicons-users',
        to: `/clrfunds/${clrfund.value}/actions/set-user-registry`,
      },
      {
        label: 'Deploy recipient registry',
        icon: 'i-heroicons-document-plus',
        to: `/clrfunds/${clrfund.value}/actions/deploy-recipient-registry`,
      },
      {
        label: 'Set recipient registry',
        icon: 'i-heroicons-rocket-launch',
        to: `/clrfunds/${clrfund.value}/actions/set-recipient-registry`,
      },
      {
        label: 'Deploy funding round',
        icon: 'i-heroicons-globe-alt',
        to: `/clrfunds/${clrfund.value}/actions/new-round`,
      },
      {
        label: 'Finalize current round',
        icon: 'i-heroicons-flag',
        to: `/clrfunds/${clrfund.value}/actions/finalize`,
      },
      {
        label: 'Cancel current round',
        icon: 'i-heroicons-x-circle',
        to: `/clrfunds/${clrfund.value}/actions/cancel-round`,
      },
      {
        label: 'Add funding source',
        icon: 'i-heroicons-currency-dollar',
        to: `/clrfunds/${clrfund.value}/actions/add-funding-source`,
      },
      {
        label: 'Set coordinator',
        icon: 'i-heroicons-book-open',
        to: `/clrfunds/${clrfund.value}/actions/set-coordinator`,
      },
    ])
  } else {
    return lists
  }
})
</script>

<template>
  <UVerticalNavigation :links="links" />
</template>
