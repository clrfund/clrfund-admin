<script setup lang="ts">
import type { FormError } from '#ui/types'
import type { MetaTransactionData } from '@safe-global/safe-core-sdk-types'
import { Contract, parseEther } from 'ethers'
import { getEventLogArg } from '@/utils/events'
import { executeSafeTransactions } from '~/utils/safe'
import { PubKey } from 'maci-domainobjs'
import { EDEPLOY_OPTIONS } from '~/utils/types'

const router = useRouter()
const appStore = useAppStore()
const wallet = useWalletStore()

const { isConnected } = storeToRefs(wallet)
const { chain } = storeToRefs(appStore)

const DEFAULT_MATCHING_POOL_AMOUNT = parseEther(
  DEFAULT_FUNDING_SOURCE_APPROVAL_AMOUNT
).toString()

const currentStep = ref(0)

const depositLabel = computed(() => {
  return chain.value?.token ? `Deposit in ${chain.value?.token}` : `Deposit`
})

const state = reactive({
  step: '',
  clrfundOwnerOption: EDEPLOY_OPTIONS.DEPLOY,
  clrfundAddress: '',
  clrfundOwner: '',
  matchingPool: '',
  matchingPoolOption: EDEPLOY_OPTIONS.DEPLOY,
  clrfundOwnerDeployed: false,
  matchingPoolDeployed: false,
  matchingPoolAmount: DEFAULT_MATCHING_POOL_AMOUNT,
  userRegistryAddress: '',
  recipientRegistryAddress: '',
  userRegistryOption: EDEPLOY_OPTIONS.DEPLOY,
  recipientRegistryOption: EDEPLOY_OPTIONS.DEPLOY,
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

function useExisting(option: EDEPLOY_OPTIONS): Boolean {
  return option === EDEPLOY_OPTIONS.USE_EXISTING
}

function deployNew(option: EDEPLOY_OPTIONS): Boolean {
  return option === EDEPLOY_OPTIONS.DEPLOY
}

/**
 * Validate the state before deploying ClrFund
 * @param state The form state
 * @returns The form error
 */
function validate(state: any): FormError[] {
  const errors: FormError[] = []

  if (useExisting(state.clrfundOwnerOption) && !state.clrfundOwner)
    errors.push({ path: 'clrfund-safe', message: 'Required' })

  if (useExisting(state.matchingPoolOption) && !state.matchingPool)
    errors.push({ path: 'pool-safe', message: 'Required' })

  if (
    useExisting(state.recipientRegistryOption) &&
    !state.recipientRegistryAddress
  ) {
    errors.push({ path: 'recipient-registry-address', message: 'Required' })
  }

  if (useExisting(state.userRegistryOption) && !state.userRegistryAddress) {
    errors.push({ path: 'user-registry-address', message: 'Required' })
  }

  if (deployNew(state.userRegistryOption)) {
    if (state.userRegistryType === 'brightid') {
      if (!state.brightIdContext) {
        errors.push({ path: 'context', message: 'Required' })
      }
      if (!state.brightIdVerifier) {
        errors.push({ path: 'verifier', message: 'Required' })
      } else if (!isValidAddress(state.brightIdVerifier)) {
        errors.push({ path: 'verifier', message: 'Invalid address' })
      }
    }
  }

  if (deployNew(state.recipientRegistryOption)) {
    if (state.recipientRegistryType === 'optimistic') {
      if (!state.challengePeriod) {
        errors.push({ path: 'challenge-period', message: 'Required' })
      }
      if (!state.deposit) {
        errors.push({ path: 'deposit', message: 'Required' })
      }
    }
  }

  if (!isValidAddress(state.coordinator)) {
    errors.push({ path: 'coordinator', message: 'Invalid format' })
  }

  if (!PubKey.isValidSerializedPubKey(state.coordinatorPubKey)) {
    errors.push({ path: 'maci-key', message: 'Invalid format' })
  }

  if (!isValidAddress(state.token)) {
    errors.push({ path: 'token', message: 'Invalid format' })
  }

  return errors
}
</script>

<template>
  <AppPage>
    <PageHeader>Create a New ClrFund</PageHeader>
    <UForm :validate="validate" :state="state" class="form" @submit="deploy">
      <div>
        <FormGroup>
          <UInputMenu
            v-model="state.clrfundOwnerOption"
            :options="clrfundOwnerOptions"
            value-attribute="id"
            option-attribute="name"
          />
        </FormGroup>
        <FormGroup
          v-if="useExisting(state.clrfundOwnerOption)"
          name="clrfund-safe"
        >
          <UInput v-model="state.clrfundOwner" placeholder="Safe address" />
        </FormGroup>
      </div>

      <div>
        <FormGroup name="pool-safe-options">
          <UInputMenu
            v-model="state.matchingPoolOption"
            :options="matchingPoolOptions"
            value-attribute="id"
            option-attribute="name"
          />
        </FormGroup>

        <FormGroup
          v-if="useExisting(state.matchingPoolOption)"
          name="pool-safe"
        >
          <UInput v-model="state.matchingPool" placeholder="Safe address" />
        </FormGroup>
      </div>
      <div id="user-registry">
        <FormGroup name="deploy-or-set-user-registry">
          <USelectMenu
            v-model="state.userRegistryOption"
            :options="userRegistryOptions"
            value-attribute="id"
            option-attribute="name"
          />
        </FormGroup>

        <UCard v-if="deployNew(state.userRegistryOption)">
          <FormGroup label="User registry type" name="user-registry-type">
            <UInputMenu
              v-model="state.userRegistryType"
              :options="userRegistryTypes"
            />
          </FormGroup>
          <FormGroup
            v-if="state.userRegistryType === 'brightid'"
            label="BrightId context"
            name="context"
          >
            <UInput v-model="state.brightIdContext" placeholder="clr.fund" />
          </FormGroup>
          <FormGroup
            v-if="state.userRegistryType === 'brightid'"
            label="BrightId verifier"
            name="verifier"
          >
            <UInput v-model="state.brightIdVerifier" />
          </FormGroup>
        </UCard>

        <FormGroup
          v-if="useExisting(state.userRegistryOption)"
          name="user-registry-address"
        >
          <UInput
            v-model="state.userRegistryAddress"
            placeholder="User registry address"
          />
        </FormGroup>
      </div>

      <div>
        <FormGroup name="deploy-or-set-recipient-registry">
          <UInputMenu
            v-model="state.recipientRegistryOption"
            :options="recipientRegistryOptions"
            value-attribute="id"
            option-attribute="name"
          />
        </FormGroup>
        <FormGroup
          v-if="useExisting(state.recipientRegistryOption)"
          name="recipient-registry-address"
        >
          <UInput
            v-model="state.recipientRegistryAddress"
            placeholder="0x123..."
          />
        </FormGroup>
        <UCard v-if="deployNew(state.recipientRegistryOption)">
          <FormGroup
            label="Recipient registry type"
            name="recipient-registry-type"
          >
            <UInputMenu
              v-model="state.recipientRegistryType"
              :options="recipientRegistryTypes"
            />
          </FormGroup>
          <template v-if="state.recipientRegistryType === 'optimistic'">
            <FormGroup
              label="Challenge period in seconds"
              name="challenge-period"
            >
              <UInput v-model="state.challengePeriod" placeholder="9999" />
            </FormGroup>
            <FormGroup :label="depositLabel" name="deposit">
              <UInput v-model="state.deposit" placeholder="0.001" />
            </FormGroup>
          </template>
        </UCard>
      </div>

      <UCard>
        <FormGroup label="Token address" name="token" required>
          <UInput v-model="state.token" placeholder="0x1234" />
        </FormGroup>
        <FormGroup label="Coordinator address" name="coordinator" required>
          <UInput v-model="state.coordinator" placeholder="0x1234" />
        </FormGroup>
        <UFormGroup
          label="Coordinator MACI public key"
          name="maci-key"
          required
        >
          <template #hint>
            <UTooltip text="Generate the key from the 'MACI key' page">
              <UIcon name="i-heroicons-information-circle" />
            </UTooltip>
          </template>
          <template #default>
            <UInput
              v-model="state.coordinatorPubKey"
              placeholder="macipk.12344..."
            />
          </template>
        </UFormGroup>
        <FormGroup
          label="Matching pool approval amount"
          name="pool-amount"
          required
        >
          <UInput v-model="state.matchingPoolAmount" />
        </FormGroup>
      </UCard>

      <UButton v-if="isConnected" type="submit">Deploy</UButton>
      <wallet-widget v-else />
    </UForm>

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

<style scoped lang="scss">
.form {
  width: 100%;
}
</style>
