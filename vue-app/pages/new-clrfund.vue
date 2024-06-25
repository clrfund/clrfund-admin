<script setup lang="ts">
import type { MetaTransactionData } from '@safe-global/safe-core-sdk-types'
import { Contract, parseEther } from 'ethers'
import { getEventLogArg } from '@/utils/events'
import { executeSafeTransactions } from '~/utils/safe'

const router = useRouter()
const appStore = useAppStore()
const wallet = useWalletStore()

const { isConnected } = storeToRefs(wallet)

const DEFAULT_MATCHING_POOL_AMOUNT = parseEther(
  DEFAULT_FUNDING_SOURCE_APPROVAL_AMOUNT
).toString()

const items = [
  {
    label: 'Deploy a Gnosis Safe to own the ClrFund instance',
    slot: 'deploy-clrfund-safe',
  },
  {
    label: 'Deploy a Gnosis Safe for the matching pool',
    slot: 'deploy-pool-safe',
  },
  {
    label: 'Deploy ClrFund',
    slot: 'deploy-clrfund',
  },
  {
    label: 'Deploy/Set recipient registry',
    slot: 'deploy-recipient-registry',
  },
  {
    label: 'Deploy/Set user registry',
    slot: 'deploy-user-registry',
  },
  {
    label: 'Initialize ClrFund',
    slot: 'init-clrfund',
  },
]

const enum EDEPLOY_OPTIONS {
  DEPLOY = 1,
  USE_EXISTING = 2,
  SKIP = 3,
}

/** Option to deploy or use existing user or recipient registry */
const registryOptions = [
  {
    id: 1,
    name: 'Deploy new registry',
  },
  {
    id: 2,
    name: 'Use existing registry',
  },
]

const matchingPoolOptions = [
  {
    id: EDEPLOY_OPTIONS.DEPLOY,
    name: 'Deploy',
  },
  {
    id: EDEPLOY_OPTIONS.USE_EXISTING,
    name: 'Use existing',
  },
  {
    id: EDEPLOY_OPTIONS.SKIP,
    name: 'Skip',
  },
]

const currentStep = ref(0)

const state = reactive({
  step: '',
  clrfundAddress: '',
  clrfundOwner: '',
  matchingPool: '',
  matchingPoolOption: EDEPLOY_OPTIONS.DEPLOY,
  clrfundOwnerDeployed: false,
  matchingPoolDeployed: false,
  matchingPoolAmount: DEFAULT_MATCHING_POOL_AMOUNT,
  userRegistryAddress: '',
  recipientRegistryAddress: '',
  deployUserRegistry: EDEPLOY_OPTIONS.DEPLOY,
  deployRecipientRegistry: EDEPLOY_OPTIONS.DEPLOY,
  userRegistryType: 'simple',
  brightIdContext: '',
  brightIdVerifier: '0xdbf0b2ee9887fe11934789644096028ed3febe9c',
  recipientRegistryType: 'optimistic',
  challengePeriod: DEFAULT_CHALLENGE_PERIOD,
  deposit: DEFAULT_BASE_DEPOSIT,
  token: '',
  coordinator: '',
  coordinatorPubKey: '',
  clrFundInitTx: undefined,
})

const isModalOpen = ref(false)
const statuses = ref([])
const txHash = ref('')
const txError = ref('')
const title = ref('')

async function deployClrFundSafe() {
  if (state.clrfundOwnerDeployed) return

  if (state.clrfundOwner) {
    state.step = 'Accessing ClrFund Safe'
    await appStore.getSafe(state.clrfundOwner)
    state.clrfundOwnerDeployed = true
    appStore.clrfundOwner = state.clrfundOwner
  } else {
    state.step = 'Deploying ClrFund Safe'
    const safe = await appStore.deploySafe()
    state.clrfundOwner = await safe.getAddress()
    state.clrfundOwnerDeployed = true
    appStore.clrfundOwner = state.clrfundOwner
  }
}

async function deployMatchingPoolSafe() {
  if (state.matchingPoolDeployed) return

  if (state.matchingPool) {
    state.step = 'Accessing matching pool Safe'
    await appStore.getSafe(state.matchingPool)
    state.matchingPoolDeployed = true
  } else if (state.matchingPoolOption === EDEPLOY_OPTIONS.DEPLOY) {
    state.step = 'Deploying matching pool Safe'
    const safe = await appStore.deploySafe()
    state.matchingPool = await safe.getAddress()
    state.matchingPoolDeployed = true
  }
}

async function deployClrFund() {
  if (!state.clrfundOwnerDeployed) {
    // do not have a safe to deploy ClrFund yet
    return
  }

  if (state.clrfundAddress) {
    // already created ClrFund
    return
  }

  state.step = 'Deploying ClrFund'
  const tx = await appStore.deployClrFund(state.clrfundOwner)
  if (tx) {
    const deployerContract = appStore.getClrFundDeployerContract()
    state.clrfundAddress = await getEventLogArg(
      tx,
      deployerContract,
      'NewInstance',
      'clrfund'
    )
    appStore.clrfund = state.clrfundAddress
  }
}

async function deployOrSetUserAndRecipientRegistries() {
  let newUserRegistry = false
  if (!state.clrfundOwnerDeployed) {
    // Not ready to create registries
    return
  }

  if (!state.clrfundAddress) throw new Error('ClrFund address missing')

  const transactions: MetaTransactionData[] = []
  if (!state.userRegistryAddress) {
    state.step = 'Preparing user registry deployment'
    const userRegistryName = userRegistries[state.userRegistryType]
    const args = getUserRegistryArgs(state)
    const userRegistryMetaTransaction =
      await appStore.getDeployContractMetaTransaction(userRegistryName, args)
    transactions.push(userRegistryMetaTransaction)
    newUserRegistry = true
  }

  if (!state.recipientRegistryAddress) {
    state.step = 'Preparing recipient registry deployment'
    const recipientRegistryName =
      recipientRegistries[state.recipientRegistryType]
    const args = getRecipientRegistryArgs(state)
    const metaTransaction = await appStore.getDeployContractMetaTransaction(
      recipientRegistryName,
      args
    )
    transactions.push(metaTransaction)
  }

  if (transactions.length === 0) {
    // no need to deploy registries
    return
  }

  state.step = 'Deploying registries'
  const signer = await appStore.getSigner()
  const response = await executeSafeTransactions(
    state.clrfundOwner,
    signer,
    transactions
  )
  const tx = response?.transactionResponse
  if (!tx) {
    throw new Error(
      'Failed to deploy user and recipient registries, transaction response is not available'
    )
  }
  const receipt = await tx?.wait()
  if (receipt?.status !== 1)
    throw new Error('Failed to deploy user and recipient registries')

  const createContract = new Contract(state.clrfundOwner, [
    'event ContractCreation(address indexed newContract)',
  ])

  if (!state.userRegistryAddress) {
    state.userRegistryAddress = await getEventLogArg(
      tx,
      createContract,
      'ContractCreation',
      'newContract'
    )
  }

  if (!state.recipientRegistryAddress) {
    state.recipientRegistryAddress = await getEventLogArg(
      tx,
      createContract,
      'ContractCreation',
      'newContract',
      newUserRegistry ? 2 : 1
    )
  }
}

/**
 * Setup ClrFund
 */
async function setupClrFund() {
  state.step = 'Setting up ClrFund'

  const tx = await appStore.setupClrFund(state)
  const receipt = await tx?.wait()
  if (receipt?.status !== 1) throw new Error('Failed to setup ClrFund')

  appStore.clrfund = state.clrfundAddress
  appStore.clrfundOwner = state.clrfundOwner
  appStore.userRegistry = state.userRegistryAddress
  appStore.recipientRegistry = state.recipientRegistryAddress
  appStore.nativeToken = state.token
  appStore.matchingPool = state.matchingPool
  appStore.coordinator = state.coordinator
  appStore.coordinatorPubKey = state.coordinatorPubKey

  router.push(`/clrfunds/${state.clrfundAddress}`)
}

const deploymentSteps = [
  deployClrFundSafe,
  deployClrFund,
  deployMatchingPoolSafe,
  deployOrSetUserAndRecipientRegistries,
  setupClrFund,
]

/**
 * Deploy ClrFund contracts
 */
async function deploy() {
  isModalOpen.value = true
  txHash.value = ''
  txError.value = ''

  for (
    let i = currentStep.value;
    i < deploymentSteps.length && i <= currentStep.value;
    i++
  ) {
    if (currentStep.value === i) {
      try {
        await deploymentSteps[i]()
        currentStep.value++
      } catch (e) {
        txError.value = (e as Error).message
        break
      }
    }
  }
  title.value = ''
}
</script>

<template>
  <AppPage>
    <PageHeader>Create New ClrFund</PageHeader>
    <UAccordion multiple color="gray" :items="items" variant="ghost" size="xl">
      <template #deploy-clrfund-safe>
        <UFormGroup
          label="Use this Safe instead of deploying a new one"
          name="clrfund-safe"
        >
          <UInput v-model="state.clrfundOwner" placeholder="0x12344..." />
        </UFormGroup>
      </template>

      <template #deploy-pool-safe>
        <UFormGroup label="Deployment options" name="pool-safe-options">
          <UInputMenu
            v-model="state.matchingPoolOption"
            :options="matchingPoolOptions"
            value-attribute="id"
            option-attribute="name"
          />
        </UFormGroup>

        <UFormGroup
          v-if="state.matchingPoolOption === EDEPLOY_OPTIONS.USE_EXISTING"
          label="Gnosis Safe Address"
          name="pool-safe"
        >
          <UInput v-model="state.matchingPool" placeholder="0x12344..." />
        </UFormGroup>
      </template>

      <template #deploy-user-registry>
        <UFormGroup
          label="Deploy or use existing user registry"
          name="deploy-or-set-user-registry"
        >
          <USelectMenu
            v-model="state.deployUserRegistry"
            :options="registryOptions"
            value-attribute="id"
            option-attribute="name"
          />
        </UFormGroup>

        <UFormGroup
          v-if="state.deployUserRegistry === 1"
          label="Select a user registry type"
          name="user-registry-type"
        >
          <UInputMenu
            v-model="state.userRegistryType"
            :options="userRegistryTypes"
          />
        </UFormGroup>
        <UFormGroup
          v-if="state.deployUserRegistry === 2"
          label="User registry address"
          name="user-registry-address"
        >
          <UInput v-model="state.userRegistryAddress" placeholder="0x123..." />
        </UFormGroup>

        <UFormGroup
          v-if="state.userRegistryType === 'brightid'"
          label="BrightId context"
          name="context"
        >
          <UInput v-model="state.brightIdContext" placeholder="clr.fund" />
        </UFormGroup>
        <UFormGroup
          v-if="state.userRegistryType === 'brightid'"
          label="BrightId verifier"
          name="verifier"
        >
          <UInput v-model="state.brightIdVerifier" />
        </UFormGroup>
      </template>

      <template #deploy-recipient-registry>
        <UFormGroup
          label="Deploy or use existing recipient registry"
          name="deploy-or-set-recipient-registry"
        >
          <UInputMenu
            v-model="state.deployRecipientRegistry"
            :options="registryOptions"
            value-attribute="id"
            option-attribute="name"
          />
        </UFormGroup>

        <template v-if="state.deployRecipientRegistry === 1">
          <UFormGroup
            label="Select a recipient registry type"
            name="recipient-registry-type"
          >
            <UInputMenu
              v-model="state.recipientRegistryType"
              :options="recipientRegistryTypes"
            />
          </UFormGroup>
          <template v-if="state.recipientRegistryType === 'optimistic'">
            <UFormGroup label="Challenge period" name="challenge-period">
              <UInput v-model="state.challengePeriod" placeholder="9999" />
            </UFormGroup>
            <UFormGroup label="Deposit" name="deposit">
              <UInput v-model="state.deposit" placeholder="0.001" />
            </UFormGroup>
          </template>
        </template>
        <UFormGroup
          v-if="state.deployRecipientRegistry === 2"
          label="Recipient registry address"
          name="recipient-registry-address"
        >
          <UInput
            v-model="state.recipientRegistryAddress"
            placeholder="0x123..."
          />
        </UFormGroup>
      </template>

      <template #init-clrfund>
        <UFormGroup label="Token address" name="token">
          <UInput v-model="state.token" placeholder="0x1234" />
        </UFormGroup>
        <UFormGroup label="Coordinator address" name="coordinator">
          <UInput v-model="state.coordinator" placeholder="0x1234" />
        </UFormGroup>
        <UFormGroup label="Coordinator MACI public key" name="maci-key">
          <UInput
            v-model="state.coordinatorPubKey"
            placeholder="macipk.12344..."
          />
        </UFormGroup>
        <UFormGroup label="Matching pool approval amount" name="pool-amount">
          <UInput v-model="state.matchingPoolAmount" />
        </UFormGroup>
      </template>
    </UAccordion>

    <WalletWidget v-if="!isConnected" />
    <UButton v-else @click.prevent="deploy">deploy</UButton>

    <UModal v-model="isModalOpen" prevent-close>
      <transaction-modal
        :title="state.step"
        :tx-error="txError"
        :tx-hash="txHash"
        @close="isModalOpen = false"
      />
    </UModal>
  </AppPage>
</template>
