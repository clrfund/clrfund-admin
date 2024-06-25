import { init, useOnboard } from '@web3-onboard/vue'
import injectedModule from '@web3-onboard/injected-wallets'
import metamaskSDK from '@web3-onboard/metamask'
import { getNumber, toQuantity } from 'ethers'
import { chains } from '~/utils/chains'

const supportedChains = Object.values(chains).map((chain) => ({
  id: chain.id,
}))

export const useWalletStore = defineStore('wallet', () => {
  const injected = injectedModule()
  const metamaskSDKWallet = metamaskSDK({
    options: {
      extensionOnly: false,
      dappMetadata: {},
    },
  })

  init({
    wallets: [metamaskSDKWallet, injected],
    chains: supportedChains,
  })

  const {
    connectedChain,
    connectedWallet,
    connectWallet: connect,
    disconnectWallet,
    setChain,
  } = useOnboard()

  const selectedChainId = ref(supportedChains[0].id)
  const isConnected = computed(() => Boolean(connectedWallet.value))
  const chainId = computed(() =>
    connectedChain.value?.id ? getNumber(connectedChain.value?.id) : undefined
  )

  const account = computed<string>(
    () => connectedWallet.value?.accounts[0].address || ''
  )
  const provider = computed(() => connectedWallet.value?.provider)

  async function connectWallet() {
    await connect()
  }

  watch([chainId, selectedChainId], async () => {
    if (!isConnected.value) {
      return
    }

    if (chainId.value !== selectedChainId.value) {
      const walletLabel = connectedWallet.value?.label || ''
      await setChain({
        wallet: walletLabel,
        chainId: toQuantity(selectedChainId.value),
      })
    }
  })

  return {
    selectedChainId,
    isConnected,
    chainId,
    account,
    provider,
    connectedWallet,
    connectWallet,
    disconnectWallet,
  }
})
