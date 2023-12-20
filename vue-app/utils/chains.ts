import type { Chain } from '@web3modal/scaffold-utils/ethers'

export const chains: Chain[] = [
  {
    chainId: 42161,
    name: 'Arbitrum',
    currency: 'EETH',
    explorerUrl: 'https://arbiscan.io',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
  },
  {
    chainId: 5000,
    name: 'Mantle',
    currency: 'MNT',
    explorerUrl: 'https://explorer.mantle.xyz',
    rpcUrl: 'https://rpc.mantle.xyz',
  },
  {
    chainId: 5001,
    name: 'Mantle Testnet',
    currency: 'MNT',
    explorerUrl: 'https://explorer.testnet.mantle.xyz',
    rpcUrl: 'https://rpc.testnet.mantle.xyz',
  },
  {
    chainId: 421613,
    name: 'Arbitrum Goerli',
    currency: 'AETH',
    explorerUrl: 'https://goerli.arbiscan.io/',
    rpcUrl: 'https://goerli-rollup.arbitrum.io/rpc',
  },
  {
    chainId: 11155111,
    name: 'Sepolia Testnet',
    currency: 'ETH',
    explorerUrl: 'https://sepolia.etherscan.io',
    rpcUrl: 'https://ethereum-sepolia.publicnode.com',
  },
]
