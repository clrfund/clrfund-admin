import {
  BrowserProvider,
  Contract,
  toNumber,
} from 'ethers'
import type { ContractTransactionResponse, Eip1193Provider } from 'ethers'

export const useAppStore = defineStore('app', () => {
  const account = useWeb3ModalAccount()
  const web3Provider = useWeb3ModalProvider()

  const signUpDuration = ref(0)
  const votingDuration = ref(0)
  const factoryOwner = ref('')
  const userRegistryOwner = ref('')

  const factory = computed(() =>
    account.chainId.value ? factories[account.chainId.value] : null,
  )

  async function loadAppData() {
    if (account.isConnected) {
      factoryOwner.value = await getFactoryOwner()
      const durations = await getRoundDurations()
      signUpDuration.value = durations.signUpDuration
      votingDuration.value = durations.votingDuration
      userRegistryOwner.value = await getUserRegistryOwner()
    }
    else {
      factoryOwner.value = ''
      signUpDuration.value = 0
      votingDuration.value = 0
      userRegistryOwner.value = ''
    }
  }

  const isUserRegistryOwner = computed(() => {
    return isAddressEqual(userRegistryOwner.value, account.address.value)
  })

  /**
   * Return the explorer url for the transaction hash
   * @param hash transaction hash
   * @returns explorer url
   */
  function getExplorerUrlByHash(hash: string): string {
    if (!account.chainId.value || !hash)
      return ''

    const chain = chains[account.chainId.value]
    if (!chain)
      return ''

    return new URL(`${chain.explorerUrl}/tx/${hash}`).href
  }

  /**
   * Cancel the current funding round
   * @returns contract transaction
   */
  const cancelRound = async (): Promise<ContractTransactionResponse> => {
    if (!factory.value)
      throw new UnsupportChainError()

    const provider = new BrowserProvider(
      web3Provider.walletProvider.value as Eip1193Provider,
    )
    const signer = await provider.getSigner()
    const contract = new Contract(
      factory.value,
      FundingRoundFactoryAbi,
      signer,
    )
    return contract.cancelCurrentRound()
  }

  /**
   * Deploy a new funding round
   * @returns contract transaction
   */
  const deployNewRound = async (): Promise<ContractTransactionResponse> => {
    if (!account.isConnected)
      throw new NotConnected()

    if (!factory.value)
      throw new UnsupportChainError()

    const provider = new BrowserProvider(
      web3Provider.walletProvider.value as Eip1193Provider,
    )
    const signer = await provider.getSigner()
    const contract = new Contract(
      factory.value,
      FundingRoundFactoryAbi,
      signer,
    )
    return contract.deployNewRound()
  }

  /**
   * Finalize the current funding round
   * @param totalSpent total spent voice credits from the tally.json file
   * @param totalSpentSalt total spent voice credits salt from the tally.json file
   * @returns contract transaction
   */
  async function finalizeRound(
    totalSpent: string,
    totalSpentSalt: string,
  ): Promise<ContractTransactionResponse> {
    if (!account.isConnected)
      throw new NotConnected()

    if (!factory.value)
      throw new UnsupportChainError()

    const provider = new BrowserProvider(
      web3Provider.walletProvider.value as Eip1193Provider,
    )
    const signer = await provider.getSigner()
    const contract = new Contract(
      factory.value,
      FundingRoundFactoryAbi,
      signer,
    )
    return await contract.transferMatchingFunds(totalSpent, totalSpentSalt)
  }

  /**
   * Get the owner address of funding round factory
   * @returns the owner address of the funding round factory
   */
  async function getFactoryOwner(): Promise<string> {
    if (!factory.value)
      return ''

    const provider = new BrowserProvider(
      web3Provider.walletProvider.value as Eip1193Provider,
    )
    const signer = await provider.getSigner()
    const contract = new Contract(
      factory.value,
      FundingRoundFactoryAbi,
      signer,
    )
    return contract.owner()
  }

  /**
   * Get the owner address of funding round factory
   * @returns the owner address of the funding round factory
   */
  async function getUserRegistryOwner(): Promise<string> {
    if (!factory.value)
      return ''

    const provider = new BrowserProvider(
      web3Provider.walletProvider.value as Eip1193Provider,
    )
    const signer = await provider.getSigner()
    const factoryContract = new Contract(
      factory.value,
      FundingRoundFactoryAbi,
      signer,
    )
    const userRegistryAddress = await factoryContract.userRegistry()
    const userRegistryContract = new Contract(
      userRegistryAddress,
      SimpleUserRegistryAbi,
      signer,
    )
    return userRegistryContract.owner()
  }

  /**
   * Get the parameters configured in the MACI factory
   * @returns MACI parameters
   */
  async function readMaciParameters(): Promise<any> {
    if (!factory.value)
      throw new UnsupportChainError()

    const provider = new BrowserProvider(
      web3Provider.walletProvider.value as Eip1193Provider,
    )
    const signer = await provider.getSigner()
    const factoryContract = new Contract(
      factory.value,
      FundingRoundFactoryAbi,
      signer,
    )
    const maciFactoryAddress = await factoryContract.maciFactory()

    const maciFactory = new Contract(
      maciFactoryAddress,
      MaciFactoryAbi,
      signer,
    )
    const { stateTreeDepth, messageTreeDepth, voteOptionTreeDepth }
            = await maciFactory.treeDepths()
    const { tallyBatchSize, messageBatchSize }
            = await maciFactory.batchSizes()
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
   * Get the currently configured signup and voting durations in the MACI factory
   * @returns The signup and voting durations
   */
  async function getRoundDurations() {
    if (!factory.value)
      return { signUpDuration: 0, votingDuration: 0 }

    const provider = new BrowserProvider(
      web3Provider.walletProvider.value as Eip1193Provider,
    )
    const signer = await provider.getSigner()
    const factoryContract = new Contract(
      factory.value,
      FundingRoundFactoryAbi,
      signer,
    )
    const maciFactoryAddress = await factoryContract.maciFactory()
    const maciFactory = new Contract(
      maciFactoryAddress,
      MaciFactoryAbi,
      signer,
    )

    const [signUpDuration, votingDuration] = await Promise.all([
      maciFactory.signUpDuration(),
      maciFactory.votingDuration(),
    ])
    return { signUpDuration, votingDuration }
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
    votingDuration: number,
  ): Promise<ContractTransactionResponse> {
    if (!account.isConnected)
      throw new NotConnected()

    if (!factory.value)
      throw new UnsupportChainError()

    const provider = new BrowserProvider(
      web3Provider.walletProvider.value as Eip1193Provider,
    )
    const signer = await provider.getSigner()
    const contract = new Contract(
      factory.value,
      FundingRoundFactoryAbi,
      signer,
    )

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
      votingDuration,
    )
  }

  /**
   * Add a user to the simple recipient registry
   * @param user user's wallet address
   * @returns transaction
   */
  async function addUser(user: string): Promise<ContractTransactionResponse> {
    if (!account.isConnected)
      throw new NotConnected()

    if (!factory.value)
      throw new UnsupportChainError()

    const provider = new BrowserProvider(
      web3Provider.walletProvider.value as Eip1193Provider,
    )
    const signer = await provider.getSigner()
    const factoryContract = new Contract(
      factory.value,
      FundingRoundFactoryAbi,
      signer,
    )
    const userRegistryAddress = await factoryContract.userRegistry()

    const registry = new Contract(
      userRegistryAddress,
      SimpleUserRegistryAbi,
      signer,
    )

    const owner = await registry.owner()
    if (!isAddressEqual(owner, account.address.value))
      throw new NotOwnerError()

    return registry.addUser(user)
  }

  const isFactoryOwner = computed(() => {
    try {
      return isAddressEqual(factoryOwner.value, account.address.value)
    }
    catch {
      return false
    }
  })

  return {
    factory,
    factoryOwner,
    isFactoryOwner,
    isUserRegistryOwner,
    signUpDuration,
    votingDuration,
    loadAppData,
    addUser,
    cancelRound,
    deployNewRound,
    finalizeRound,
    getRoundDurations,
    changeRoundDuration,
    getExplorerUrlByHash,
  }
})
