<script setup lang="ts">
import type { FormError } from '#ui/types'
import type { MetaTransactionData } from '@safe-global/safe-core-sdk-types'
import { Contract, parseEther } from 'ethers'
import { getEventLogArg } from '@/utils/events'
import { executeSafeTransactions } from '~/utils/safe'
import { PubKey } from 'maci-domainobjs'
import { EDEPLOY_OPTIONS } from '~/utils/types'

const enum STEP {
  DEPLOY_CLRFUND_OWNER = 0,
  DEPLOY_CLRFUND,
  DEPLOY_MATCHING_POOL,
  DEPLOY_USER_REGISTRY,
  DEPLOY_RECIPIENT_REGISTRY,
  SETUP_CLRFUND,
}

const router = useRouter()
const appStore = useAppStore()
const wallet = useWalletStore()

const { isConnected } = storeToRefs(wallet)
const { chain } = storeToRefs(appStore)

const isModalOpen = ref(false)
const txHash = ref('')
const txError = ref('')
const title = ref('')

const currentStep = ref(STEP.DEPLOY_CLRFUND_OWNER)

function isStepDone(step: STEP): boolean {
  return currentStep.value > step
}

const depositLabel = computed(() =>
  chain.value?.token ? `Deposit in ${chain.value?.token}` : `Deposit`
)

const DEFAULT_MATCHING_POOL_AMOUNT = parseEther(
  DEFAULT_FUNDING_SOURCE_APPROVAL_AMOUNT
).toString()

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

/**
 * Get the contract object used to retrieve events logged by Safe API when deploying contract
 * @param address The contract address
 * @returns THe contract object
 */
function getCreateContract(address: string): Contract {
  return new Contract(address, [
    'event ContractCreation(address indexed newContract)',
  ])
}

async function deployClrFundOwner() {
  if (state.clrfundOwner) {
    state.step = 'Accessing ClrFund Safe'
    await appStore.getSafe(state.clrfundOwner)
    appStore.clrfundOwner = state.clrfundOwner
  } else {
    state.step = 'Deploying ClrFund Safe'
    const safe = await appStore.deploySafe()
    state.clrfundOwner = await safe.getAddress()
    appStore.clrfundOwner = state.clrfundOwner
  }
}

async function deployMatchingPool() {
  if (state.matchingPool) {
    state.step = 'Accessing matching pool Safe'
    await appStore.getSafe(state.matchingPool)
  } else if (state.matchingPoolOption === EDEPLOY_OPTIONS.DEPLOY) {
    state.step = 'Deploying matching pool Safe'
    const safe = await appStore.deploySafe()
    state.matchingPool = await safe.getAddress()
  }
}

async function deployClrFund() {
  if (!state.clrfundOwner) throw new NoClrFundOwner()

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

async function deployUserRegistry() {
  if (!state.clrfundOwner) throw new NoClrFundOwner()
  if (!state.clrfundAddress) throw new NoClrFund()

  const transactions: MetaTransactionData[] = []
  if (!state.userRegistryAddress) {
    state.step = 'Preparing user registry deployment'
    const userRegistryName = userRegistries[state.userRegistryType]
    const args = getUserRegistryArgs(state)
    const userRegistryMetaTransaction =
      await appStore.getDeployContractMetaTransaction(userRegistryName, args)
    transactions.push(userRegistryMetaTransaction)
  }

  if (transactions.length === 0) {
    // no need to deploy
    return
  }

  state.step = 'Deploying user registry'
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

  state.step = 'Getting user registry address'
  const createContract = getCreateContract(state.clrfundOwner)
  state.userRegistryAddress = await getEventLogArg(
    tx,
    createContract,
    'ContractCreation',
    'newContract'
  )
}

async function deployRecipientRegistry() {
  if (!state.clrfundOwner) throw new NoClrFundOwner()
  if (!state.clrfundAddress) throw new NoClrFund()

  const transactions: MetaTransactionData[] = []
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
    // no need to deploy
    return
  }

  state.step = 'Deploying recipient registry'
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

  state.step = 'Getting recipient registry address'
  const createContract = getCreateContract(state.clrfundOwner)
  state.recipientRegistryAddress = await getEventLogArg(
    tx,
    createContract,
    'ContractCreation',
    'newContract'
  )
}

/**
 * Setup ClrFund
 */
async function setupClrFund() {
  if (!state.clrfundOwner) throw new NoClrFundOwner()
  if (!state.clrfundAddress) throw new NoClrFund()

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

/**
 * Run the next deployment step
 */
async function runNextStep() {
  switch (currentStep.value) {
    case STEP.DEPLOY_CLRFUND_OWNER:
      await deployClrFundOwner()
      break
    case STEP.DEPLOY_CLRFUND:
      await deployClrFund()
      break
    case STEP.DEPLOY_MATCHING_POOL:
      await deployMatchingPool()
      break
    case STEP.DEPLOY_USER_REGISTRY:
      await deployUserRegistry()
      break
    case STEP.DEPLOY_RECIPIENT_REGISTRY:
      await deployRecipientRegistry()
      break
    case STEP.SETUP_CLRFUND:
      await setupClrFund()
      break
  }
}

/**
 * Deploy ClrFund contracts
 */
async function deploy() {
  isModalOpen.value = true
  txHash.value = ''
  txError.value = ''

  while (currentStep.value <= STEP.SETUP_CLRFUND) {
    try {
      await runNextStep()
      currentStep.value++
    } catch (e) {
      txError.value =
        e instanceof Error ? (e as Error).message : 'Unknown Error'
      break
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

  if (state.coordinator) {
    if (!isValidAddress(state.coordinator))
      errors.push({ path: 'coordinator', message: 'Invalid format' })
  } else {
    errors.push({ path: 'coordinator', message: 'Required' })
  }

  if (state.coordinatorPubKey) {
    if (!PubKey.isValidSerializedPubKey(state.coordinatorPubKey)) {
      errors.push({ path: 'maci-key', message: 'Invalid format' })
    }
  } else {
    errors.push({ path: 'maci-key', message: 'Required' })
  }

  if (state.token) {
    if (!isValidAddress(state.token)) {
      errors.push({ path: 'token', message: 'Invalid format' })
    }
  } else {
    errors.push({ path: 'token', message: 'Required' })
  }

  return errors
}
</script>

<template>
  <AppPage>
    <PageHeader>Create a New ClrFund</PageHeader>
    <div class="w-full">
      <UForm
        :validate="validate"
        :state="state"
        class="space-y-4"
        @submit="deploy"
      >
        <UCard>
          <div class="flex flex-row gap-4">
            <UCheckbox
              class="flex-none"
              :model-value="isStepDone(STEP.DEPLOY_CLRFUND_OWNER)"
              disabled
            />
            <div class="flex flex-grow flex-col gap-4">
              <UFormGroup>
                <UInputMenu
                  v-model="state.clrfundOwnerOption"
                  :options="clrfundOwnerOptions"
                  value-attribute="id"
                  option-attribute="name"
                  :disabled="isStepDone(STEP.DEPLOY_CLRFUND_OWNER)"
                />
              </UFormGroup>
              <template v-if="isStepDone(STEP.DEPLOY_CLRFUND_OWNER)">
                <CopyableField
                  v-if="state.clrfundOwner"
                  :value="state.clrfundOwner"
                />
              </template>
              <template v-else>
                <div>
                  <UFormGroup
                    v-if="useExisting(state.clrfundOwnerOption)"
                    name="clrfund-safe"
                  >
                    <UInput
                      v-model="state.clrfundOwner"
                      placeholder="Safe address"
                    />
                  </UFormGroup>
                </div>
              </template>
            </div>
          </div>
        </UCard>
        <UCard>
          <div class="flex flex-row gap-4">
            <UCheckbox
              class="flex-none"
              :model-value="isStepDone(STEP.DEPLOY_CLRFUND)"
              disabled
            />
            <div class="flex flex-grow flex-col gap-4">
              <UFormGroup label="Deploy ClrFund">
                <CopyableField
                  v-if="state.clrfundAddress"
                  :value="state.clrfundAddress"
                />
              </UFormGroup>
            </div>
          </div>
        </UCard>

        <UCard>
          <div class="flex flex-row gap-4">
            <UCheckbox
              class="flex-none"
              :model-value="isStepDone(STEP.DEPLOY_MATCHING_POOL)"
              disabled
            />
            <div class="flex flex-grow flex-col gap-4">
              <UFormGroup name="pool-safe-options">
                <UInputMenu
                  v-model="state.matchingPoolOption"
                  :options="matchingPoolOptions"
                  value-attribute="id"
                  option-attribute="name"
                  :disabled="isStepDone(STEP.DEPLOY_MATCHING_POOL)"
                />
              </UFormGroup>

              <template v-if="isStepDone(STEP.DEPLOY_MATCHING_POOL)">
                <CopyableField
                  v-if="state.matchingPool"
                  :value="state.matchingPool"
                />
              </template>
              <template v-else>
                <UFormGroup
                  v-if="useExisting(state.matchingPoolOption)"
                  name="pool-safe"
                >
                  <UInput
                    v-model="state.matchingPool"
                    placeholder="Safe address"
                  />
                </UFormGroup>
              </template>
            </div>
          </div>
        </UCard>
        <UCard>
          <div class="flex flex-row gap-4">
            <UCheckbox
              class="flex-none"
              :model-value="isStepDone(STEP.DEPLOY_USER_REGISTRY)"
              disabled
            />
            <div class="flex flex-grow flex-col gap-4">
              <UFormGroup name="user-registry-option">
                <USelectMenu
                  v-model="state.userRegistryOption"
                  :options="userRegistryOptions"
                  value-attribute="id"
                  option-attribute="name"
                  :disabled="isStepDone(STEP.DEPLOY_USER_REGISTRY)"
                />
              </UFormGroup>

              <template v-if="isStepDone(STEP.DEPLOY_USER_REGISTRY)">
                <CopyableField :value="state.userRegistryAddress" />
              </template>

              <template v-else>
                <template v-if="deployNew(state.userRegistryOption)">
                  <UFormGroup
                    label="User registry type"
                    name="user-registry-type"
                  >
                    <UInputMenu
                      v-model="state.userRegistryType"
                      :options="userRegistryTypes"
                    />
                  </UFormGroup>
                  <UFormGroup
                    v-if="state.userRegistryType === 'brightid'"
                    label="BrightId context"
                    name="context"
                  >
                    <UInput
                      v-model="state.brightIdContext"
                      placeholder="clr.fund"
                    />
                  </UFormGroup>
                  <UFormGroup
                    v-if="state.userRegistryType === 'brightid'"
                    label="BrightId verifier"
                    name="verifier"
                  >
                    <UInput v-model="state.brightIdVerifier" />
                  </UFormGroup>
                </template>

                <UFormGroup
                  v-if="useExisting(state.userRegistryOption)"
                  name="user-registry-address"
                >
                  <UInput
                    v-model="state.userRegistryAddress"
                    placeholder="User registry address"
                  />
                </UFormGroup>
              </template>
            </div>
          </div>
        </UCard>

        <UCard>
          <div class="flex flex-row gap-4">
            <UCheckbox
              class="flex-none"
              :model-value="isStepDone(STEP.DEPLOY_RECIPIENT_REGISTRY)"
              disabled
            />
            <div class="flex flex-grow flex-col gap-4">
              <UFormGroup name="recipient-registry-option">
                <UInputMenu
                  v-model="state.recipientRegistryOption"
                  :options="recipientRegistryOptions"
                  value-attribute="id"
                  option-attribute="name"
                  :disabled="isStepDone(STEP.DEPLOY_RECIPIENT_REGISTRY)"
                />
              </UFormGroup>

              <template v-if="isStepDone(STEP.DEPLOY_RECIPIENT_REGISTRY)">
                <CopyableField :value="state.recipientRegistryAddress" />
              </template>

              <template v-else>
                <UFormGroup
                  v-if="useExisting(state.recipientRegistryOption)"
                  name="recipient-registry-address"
                >
                  <UInput
                    v-model="state.recipientRegistryAddress"
                    placeholder="0x123..."
                  />
                </UFormGroup>
                <template v-if="deployNew(state.recipientRegistryOption)">
                  <UFormGroup
                    label="Recipient registry type"
                    name="recipient-registry-type"
                  >
                    <UInputMenu
                      v-model="state.recipientRegistryType"
                      :options="recipientRegistryTypes"
                    />
                  </UFormGroup>
                  <template v-if="state.recipientRegistryType === 'optimistic'">
                    <UFormGroup
                      label="Challenge period in seconds"
                      name="challenge-period"
                    >
                      <UInput
                        v-model="state.challengePeriod"
                        placeholder="9999"
                      />
                    </UFormGroup>
                    <UFormGroup :label="depositLabel" name="deposit">
                      <UInput v-model="state.deposit" placeholder="0.001" />
                    </UFormGroup>
                  </template>
                </template>
              </template>
            </div>
          </div>
        </UCard>

        <UCard>
          <div class="flex flex-row gap-4">
            <UCheckbox
              class="flex-none"
              :model-value="isStepDone(STEP.SETUP_CLRFUND)"
              disabled
            />
            <div
              v-if="!isStepDone(STEP.SETUP_CLRFUND)"
              class="flex flex-grow flex-col gap-4"
            >
              <UFormGroup label="Setup ClrFund"> </UFormGroup>
              <UFormGroup label="Token address" name="token" required>
                <UInput v-model="state.token" placeholder="0x1234" />
              </UFormGroup>
              <UFormGroup
                label="Coordinator address"
                name="coordinator"
                required
              >
                <UInput v-model="state.coordinator" placeholder="0x1234" />
              </UFormGroup>
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
              <UFormGroup
                label="Matching pool approval amount"
                name="pool-amount"
                required
              >
                <UInput v-model="state.matchingPoolAmount" />
              </UFormGroup>
            </div>
          </div>
        </UCard>

        <div class="flex justify-center">
          <UButton v-if="isConnected" type="submit">Deploy</UButton>
          <wallet-widget v-else />
        </div>
      </UForm>
    </div>
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
