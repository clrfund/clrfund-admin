import type { BigNumberish, ContractTransactionResponse, Signer } from 'ethers'
import {
  BrowserProvider,
  Contract,
  ContractFactory,
  FetchRequest,
  Interface,
  ZeroAddress,
  ethers,
  isAddress,
  toNumber,
} from 'ethers'
import Safe, {
  EthersAdapter,
  type SafeAccountConfig,
  SafeFactory,
} from '@safe-global/protocol-kit'
import type { MetaTransactionData } from '@safe-global/safe-core-sdk-types'
import { PubKey } from 'maci-domainobjs'
import { getCreateContractMetaTransaction, getEthAdapter } from '~/utils/safe'
import { ZERO_VALUE } from '~/utils/constants'
import type { ClrFundInfo, EContracts, FinalizeParams } from '~/utils/types'
import ClrFundArtifacts from '~/contracts/ClrFund.json'
import ClrFundDeployerArtifacts from '~/contracts/ClrFundDeployer.json'
import FundingRoundArtifacts from '~/contracts/FundingRound.json'
import IERC20Artifacts from '~/contracts/IERC20.json'
import { ExtendedContract } from '~/utils/contract'

export const useAppStore = defineStore('app', () => {
  const userRegistryOwner = ref('')
  const clrfunds = ref<string[]>([])
  const clrfund = ref('')
  const clrfundOwner = ref('')
  const userRegistry = ref('')
  const recipientRegistry = ref('')
  const nativeToken = ref('')
  const matchingPool = ref('')
  const coordinator = ref('')
  const coordinatorPubKey = ref('')
  const showMobileMenu = ref(false)

  const runtimeConfig = useRuntimeConfig()

  const walletStore = useWalletStore()
  const { isConnected, account, provider, chainId } = storeToRefs(walletStore)

  const chain = computed(() => {
    if (!chainId.value) return undefined

    return chains[chainId.value]
  })

  async function loadAppData() {
    if (provider.value) {
      if (!clrfund.value) return

      const browserProvider = new BrowserProvider(provider.value)

      const contract = new Contract(
        clrfund.value,
        ClrFundArtifacts.abi,
        browserProvider
      )

      clrfundOwner.value = await contract.owner().catch(() => '')

      if (!clrfundOwner.value) {
        // not a valid clrfund address
        resetApp()
        return
      }

      userRegistry.value = await contract.userRegistry().catch(() => '')
      userRegistryOwner.value = await getUserRegistryOwner().catch(() => '')
      recipientRegistry.value = await contract
        .recipientRegistry()
        .catch(() => '')
      nativeToken.value = await contract.nativeToken().catch(() => '')
      coordinator.value = await contract.coordinator().catch(() => '')
      const rawPubKey = await contract.coordinatorPubKey().catch(() => '')
      const pubKey = new PubKey([BigInt(rawPubKey.x), BigInt(rawPubKey.y)])
      coordinatorPubKey.value = pubKey.serialize()
    }
  }

  /**
   * Reset the app on wallet connection changes
   */
  function resetApp() {
    clrfund.value = ''
    clrfundOwner.value = ''
    matchingPool.value = ''
    userRegistry.value = ''
    userRegistryOwner.value = ''
    recipientRegistry.value = ''
    nativeToken.value = ''
    coordinator.value = ''
    coordinatorPubKey.value = ''
  }

  /**
   * Return the signer from the wallet
   * @returns The wallet signer
   */
  async function getSigner(): Promise<Signer> {
    if (!isConnected.value) throw new NotConnected()
    if (!provider.value) throw new Error('Missing provider')

    const browserProvider = new BrowserProvider(provider.value)
    const signer = await browserProvider.getSigner()
    return signer
  }

  const isUserRegistryOwner = computed(() => {
    return isAddressEqual(userRegistryOwner.value, account.value)
  })

  /**
   * Get the ClrFund contract handle
   * @returns The ClrFund contract handle
   */
  async function getClrFundContract(): Promise<ExtendedContract> {
    if (!chainId.value) throw new NotConnected()

    const runnerIsSafe = await isSafe(clrfundOwner.value, chainId.value)

    const runner = runnerIsSafe
      ? await getSafe(clrfundOwner.value)
      : await getSigner()

    const contract = new ExtendedContract(
      clrfund.value,
      ClrFundArtifacts.abi,
      runner
    )
    return contract
  }

  /**
   * Return the explorer url for the transaction hash
   * @param hash transaction hash
   * @returns explorer url
   */
  function getExplorerUrlByHash(hash: string): string {
    if (!hash) return ''
    if (!chain.value) return ''

    return new URL(`${chain.value.explorerUrl}/tx/${hash}`).href
  }

  /**
   * Cancel the current funding round
   * @returns contract transaction
   */
  const cancelRound = async (): Promise<ContractTransactionResponse> => {
    if (!isConnected.value) throw new NotConnected()
    if (!clrfund.value) throw new UnsupportChainError()

    const contract = await getClrFundContract()
    const response = await contract.write('cancelCurrentRound')
    return response
  }

  /**
   * Deploy a new funding round
   * @param duration The new funding round duration in seconds
   * @returns contract transaction
   */
  const deployNewRound = async (
    duration: number
  ): Promise<ContractTransactionResponse> => {
    if (!isConnected.value) throw new NotConnected()
    if (!clrfund.value) throw new UnsupportChainError()

    const contract = await getClrFundContract()
    const response = await contract.write('deployNewRound', duration)
    return response
  }

  /**
   * Get the tally results as params to finalize round
   * @returns The finalize round params
   */
  async function getTallyResults(): Promise<FinalizeParams> {
    if (!isConnected.value) throw new NotConnected()
    if (!clrfund.value) throw new UnsupportChainError()
    if (!provider.value) throw new Error('Missing provider')

    const browserProvider = new BrowserProvider(provider.value)

    const clrfundContract = new Contract(
      clrfund.value,
      ClrFundArtifacts.abi,
      browserProvider
    )
    const fundingRoundAddress = await clrfundContract.getCurrentRound()
    const fundingRoundContract = new Contract(
      fundingRoundAddress,
      FundingRoundArtifacts.abi,
      browserProvider
    )
    const tallyHash = await fundingRoundContract.tallyHash()
    const url = `${runtimeConfig.public.ipfsGatewayUrl}/ipfs/${tallyHash}`

    const req = new FetchRequest(url)
    const res = await req.send()

    return {
      totalSpent: res.bodyJson.totalSpentVoiceCredits.spent,
      totalSpentSalt: res.bodyJson.totalSpentVoiceCredits.salt,
      resultCommitment: res.bodyJson.results.commitment,
      perVOSpentVoiceCreditsHash:
        res.bodyJson.perVOSpentVoiceCredits.commitment,
    }
  }

  /**
   * Finalize the current funding round
   * @param totalSpent total spent voice credits from the tally.json file
   * @param totalSpentSalt total spent voice credits salt from the tally.json file
   * @returns contract transaction
   */
  async function finalizeRound(
    params: FinalizeParams
  ): Promise<ContractTransactionResponse> {
    if (!isConnected.value) throw new NotConnected()
    if (!clrfund.value) throw new UnsupportChainError()

    const clrfundContract = await getClrFundContract()
    const response = await clrfundContract.write(
      'transferMatchingFunds',
      params.totalSpent,
      params.totalSpentSalt,
      params.resultCommitment,
      params.perVOSpentVoiceCreditsHash
    )
    return response
  }

  /**
   * Set the user registry in the ClrFund contract
   * @param userRegistryAddress The user registry contract address to set
   * @returns The transaction response
   */
  async function setUserRegistry(
    userRegistryAddress: string
  ): Promise<ContractTransactionResponse> {
    if (!isConnected.value) throw new NotConnected()
    if (!clrfund.value) throw new UnsupportChainError()

    const clrfundContract = await getClrFundContract()
    const response = await clrfundContract.write(
      'setUserRegistry',
      userRegistryAddress
    )
    return response
  }

  /**
   * Set the recipient registry in the ClrFund contract
   * @param recipientRegistryAddress The recipient registry contract address to set
   * @returns The transaction response
   */
  async function setRecipientRegistry(
    userRegistryAddress: string
  ): Promise<ContractTransactionResponse> {
    if (!isConnected.value) throw new NotConnected()
    if (!clrfund.value) throw new UnsupportChainError()

    const clrfundContract = await getClrFundContract()
    const response = await clrfundContract.write(
      'setRecipientRegistry',
      userRegistryAddress
    )
    return response
  }

  /**
   * Get the owner address of user registry factory
   * @returns the owner address of the funding round factory
   */
  async function getUserRegistryOwner(): Promise<string> {
    if (!clrfund.value) return ''

    const signer = await getSigner()
    const clrfundContract = new Contract(
      clrfund.value,
      ClrFundArtifacts.abi,
      signer
    )
    const userRegistryAddress = await clrfundContract.userRegistry()
    const userRegistryContract = new Contract(
      userRegistryAddress,
      SimpleUserRegistryAbi,
      signer
    )
    return userRegistryContract.owner()
  }

  /**
   * Get the parameters configured in the MACI factory
   * @returns MACI parameters
   */
  async function readMaciParameters(): Promise<any> {
    if (!clrfund.value) throw new UnsupportChainError()

    const signer = await getSigner()
    const clrfundContract = new Contract(
      clrfund.value,
      ClrFundArtifacts.abi,
      signer
    )
    const maciFactoryAddress = await clrfundContract.maciFactory()

    const maciFactory = new Contract(maciFactoryAddress, MaciFactoryAbi, signer)
    const { stateTreeDepth, messageTreeDepth, voteOptionTreeDepth } =
      await maciFactory.treeDepths()
    const { tallyBatchSize, messageBatchSize } = await maciFactory.batchSizes()
    const batchUstVerifier = await maciFactory.batchUstVerifier()
    const qvtVerifier = await maciFactory.qvtVerifier()
    const signUpDuration = await maciFactory.signUpDuration()
    const votingDuration = await maciFactory.votingDuration()

    return {
      stateTreeDepth,
      messageTreeDepth,
      voteOptionTreeDepth,
      tallyBatchSize,
      messageBatchSize,
      batchUstVerifier,
      qvtVerifier,
      signUpDuration: toNumber(signUpDuration),
      votingDuration: toNumber(votingDuration),
    }
  }

  /**
   * Get ClrFunds owned by the signer
   * @param owner The owner of ClrFunds
   * @returns List of ClrFund addresses
   */
  async function getClrFunds(): Promise<string[]> {
    if (!chain.value) return []

    // get a list of safes owned by the connected account
    console.log('getting clrfunds....')
    const safes = await getSafesByOwner(account.value, chain.value.id)
    const owners = [account.value, ...safes]

    const clrfunds = await getClrfundsByOwners(owners, chain.value.subgraphUrl)
    console.log('clrfunds', clrfunds)
    return clrfunds
  }

  /**
   * Change the durations in MACI factory so that the next round will start
   * with these durations. The other parameters remain the same
   * @param signUpDuration MACI signup duration
   * @param votingDuration MACI voting duration
   * @returns contract transaction
   */
  async function changeRoundDuration(
    signUpDuration: number,
    votingDuration: number
  ): Promise<ContractTransactionResponse> {
    if (!isConnected.value) throw new NotConnected()

    if (!clrfund.value) throw new UnsupportChainError()

    const signer = await getSigner()
    const contract = new Contract(clrfund.value, ClrFundArtifacts.abi, signer)

    const {
      stateTreeDepth,
      messageTreeDepth,
      voteOptionTreeDepth,
      tallyBatchSize,
      messageBatchSize,
      batchUstVerifier,
      qvtVerifier,
    } = await readMaciParameters()

    return contract.setMaciParameters(
      stateTreeDepth,
      messageTreeDepth,
      voteOptionTreeDepth,
      tallyBatchSize,
      messageBatchSize,
      batchUstVerifier,
      qvtVerifier,
      signUpDuration,
      votingDuration
    )
  }

  /**
   * Add a user to the simple recipient registry
   * @param user user's wallet address
   * @returns transaction
   */
  async function addUser(user: string): Promise<ContractTransactionResponse> {
    if (!isConnected.value) throw new NotConnected()

    if (!clrfund.value) throw new UnsupportChainError()

    const signer = await getSigner()
    const factoryContract = new Contract(
      clrfund.value,
      ClrFundArtifacts.abi,
      signer
    )
    const userRegistryAddress = await factoryContract.userRegistry()

    const registry = new Contract(
      userRegistryAddress,
      SimpleUserRegistryAbi,
      signer
    )

    const owner = await registry.owner()
    if (!isAddressEqual(owner, account.value)) throw new NotOwnerError()

    return registry.addUser(user)
  }

  /**
   * The safe account config
   * @param signerAddress The safe signer address
   * @returns The safe account config
   */
  function getSafeAccountConfig(signerAddress: string): SafeAccountConfig {
    return {
      owners: [signerAddress],
      threshold: 1,
    }
  }

  async function getSafe(safeAddress: string): Promise<Safe> {
    const signerOrProvider = await getSigner()
    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider,
    })

    return Safe.create({ ethAdapter, safeAddress })
  }

  /**
   * Deploy a new instance of Gnosis safe
   * @returns The safe address
   */
  async function deploySafe(): Promise<Safe> {
    const signer = await getSigner()

    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: signer,
    })

    const signerAddress = await signer.getAddress()
    const safeAccountConfig = getSafeAccountConfig(signerAddress)

    const saltNonce = (await signer.getNonce()).toString()
    const safeFactory = await SafeFactory.create({ ethAdapter })

    const safe = await safeFactory.deploySafe({ safeAccountConfig, saltNonce })
    return safe
  }

  /**
   * Get the ClrFundDeployer contract
   * @returns The ClrFundDeployer contract
   */
  function getClrFundDeployerContract(): Contract {
    if (!isConnected.value) throw new NotConnected()
    if (!chain.value) throw new UnsupportChainError()

    return new Contract(
      chain.value.clrfundDeployer,
      ClrFundDeployerArtifacts.abi
    )
  }

  /**
   * Deploy a new instance of ClrFund
   * @param safe The safe that will own the ClrFund instance
   * @returns The deployment transaction response
   */
  async function deployClrFund(
    safeAddress: string
  ): Promise<ContractTransactionResponse | undefined> {
    if (!isConnected.value) throw new NotConnected()
    if (!chain.value) throw new UnsupportChainError()

    const safe = await getSafe(safeAddress)
    const deployerContract = new ExtendedContract(
      chain.value.clrfundDeployer,
      ClrFundDeployerArtifacts.abi,
      safe
    )
    const response = await deployerContract.write('deployClrFund')
    return response
  }

  /**
   * Get the meta transaction to deploy a contract
   * @param contractName The name of the contract to deploy
   * @returns The contract deployment meta transaction
   */
  async function getDeployContractMetaTransaction(
    contract: EContracts,
    args: any[]
  ): Promise<MetaTransactionData> {
    const artifacts = await import(`../contracts/${contract}.json`)
    const signer = await getSigner()
    const factory = new ContractFactory(artifacts.abi, artifacts.bytecode)
    const transaction = await factory.getDeployTransaction(...args)
    const value = ZERO_VALUE
    const metaTransaction = await getCreateContractMetaTransaction(
      signer,
      value,
      transaction.data
    )
    return metaTransaction
  }

  /**
   * Setup ClrFund with user registry, recipient registry, token, coordinator and funding source
   * @param clrfund
   * @returns
   */
  async function setupClrFund(
    clrfund: ClrFundInfo
  ): Promise<ContractTransactionResponse | undefined> {
    const clrfundInterface = new Interface(ClrFundArtifacts.abi)
    const value = ZERO_VALUE
    const to = clrfund.clrfundAddress
    const coordinatorPubKey = PubKey.deserialize(clrfund.coordinatorPubKey)
    const transactions: MetaTransactionData[] = [
      {
        to,
        data: clrfundInterface.encodeFunctionData('setUserRegistry', [
          clrfund.userRegistryAddress,
        ]),
        value,
      },
      {
        to,
        data: clrfundInterface.encodeFunctionData('setRecipientRegistry', [
          clrfund.recipientRegistryAddress,
        ]),
        value,
      },
      {
        to,
        data: clrfundInterface.encodeFunctionData('setToken', [clrfund.token]),
        value,
      },
      {
        to,
        data: clrfundInterface.encodeFunctionData('setCoordinator', [
          clrfund.coordinator,
          coordinatorPubKey.asContractParam(),
        ]),
        value,
      },
    ]

    if (clrfund.matchingPool) {
      transactions.push({
        to,
        data: clrfundInterface.encodeFunctionData('addFundingSource', [
          clrfund.matchingPool,
        ]),
        value: ZERO_VALUE,
      })
    }

    const signer = await getSigner()
    const ethAdapter = getEthAdapter(signer)
    const safeAddress = clrfund.clrfundOwner
    const safe = await Safe.create({
      ethAdapter,
      safeAddress,
    })
    const safeTransaction = await safe.createTransaction({
      transactions,
    })
    const txResponse = await safe.executeTransaction(safeTransaction)
    return txResponse.transactionResponse
  }

  function toggleMobileMenu() {
    showMobileMenu.value = !showMobileMenu.value
  }

  /**
   * Approve ClrFund access to the funding source amount
   * @param owner
   * @param amount
   * @returns
   */
  async function approveFundingSource(
    owner: string,
    amount: BigNumberish
  ): Promise<ContractTransactionResponse> {
    if (!clrfund.value) throw new Error('ClrFund is not set')

    const tokenInterface = new Interface(IERC20Artifacts.abi)

    const transactions: MetaTransactionData[] = [
      {
        to: nativeToken.value,
        data: tokenInterface.encodeFunctionData('approve', [
          clrfund.value,
          amount,
        ]),
        value: ZERO_VALUE,
      },
    ]

    const signer = await getSigner()
    const ethAdapter = getEthAdapter(signer)
    const safe = await Safe.create({
      ethAdapter,
      safeAddress: owner,
    })

    const safeTransaction = await safe.createTransaction({
      transactions,
    })

    const txResponse = await safe.executeTransaction(safeTransaction)
    if (!txResponse.transactionResponse) {
      throw new Error(
        'Failed to set funding source, missing transaction response'
      )
    }
    return txResponse.transactionResponse
  }

  /**
   * Set matching pool funding source
   * @param address The funding source address
   * @returns The contract transaction response
   */
  async function addFundingSource(
    address: string
  ): Promise<ContractTransactionResponse> {
    const clrfundInterface = new Interface(ClrFundArtifacts.abi)
    const transactions: MetaTransactionData[] = [
      {
        to: clrfund.value,
        data: clrfundInterface.encodeFunctionData('addFundingSource', [
          address,
        ]),
        value: ZERO_VALUE,
      },
    ]

    const signer = await getSigner()
    const ethAdapter = getEthAdapter(signer)
    const safeAddress = clrfundOwner.value
    const safe = await Safe.create({
      ethAdapter,
      safeAddress,
    })

    const safeTransaction = await safe.createTransaction({
      transactions,
    })

    const txResponse = await safe.executeTransaction(safeTransaction)
    if (!txResponse.transactionResponse) {
      throw new Error(
        'Failed to set funding source, missing transaction response'
      )
    }

    return txResponse.transactionResponse
  }

  /**
   * Set coordinator
   * @param coordinator The coordinator wallet address
   * @param serializedPubKey The coordinator serialized MACI pub key, e.g. macipk.*
   * @returns contract transaction
   */
  const setCoordinator = async (
    coordinator: string,
    serializedPubKey: string
  ): Promise<ContractTransactionResponse> => {
    if (!isConnected.value) throw new NotConnected()
    if (!clrfund.value) throw new UnsupportChainError()

    if (isAddressEqual(coordinator, ZeroAddress) || !isAddress(coordinator))
      throw new InvalidAddress()

    if (!PubKey.isValidSerializedPubKey(serializedPubKey))
      throw new InvalidMACIPubKey()

    const coordinatorPubKey = PubKey.deserialize(serializedPubKey)

    const contract = await getClrFundContract()
    const response = await contract.write(
      'setCoordinator',
      coordinator,
      coordinatorPubKey.asContractParam()
    )

    return response
  }

  return {
    clrfunds,
    clrfund,
    clrfundOwner,
    chain,
    isUserRegistryOwner,
    showMobileMenu,
    userRegistryOwner,
    userRegistry,
    recipientRegistry,
    nativeToken,
    matchingPool,
    coordinator,
    coordinatorPubKey,
    getSigner,
    getClrFundDeployerContract,
    getDeployContractMetaTransaction,
    toggleMobileMenu,
    loadAppData,
    addUser,
    cancelRound,
    getSafe,
    deploySafe,
    deployClrFund,
    deployNewRound,
    finalizeRound,
    getClrFunds,
    getTallyResults,
    changeRoundDuration,
    getExplorerUrlByHash,
    setupClrFund,
    setUserRegistry,
    setRecipientRegistry,
    addFundingSource,
    approveFundingSource,
    resetApp,
    setCoordinator,
  }
})
