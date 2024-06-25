export enum ChainId {
  SEPOLIA = 11155111,
  ARBITRUM_ONE = 42161,
}

interface Chain {
  id: number
  label: string
  token: string
  clrfundDeployer: string
  explorerUrl: string
  rpcUrl: string
  subgraphUrl: string
}

export const chains: Record<number, Chain> = {
  [ChainId.SEPOLIA]: {
    id: ChainId.SEPOLIA,
    label: 'Sepolia',
    token: 'ETH',
    clrfundDeployer: '0x5F4669177e3a750dd415c6F0BaeE2A7aa46A5006',
    explorerUrl: 'https://sepolia.etherscan.io',
    rpcUrl: 'https://ethereum-sepolia.publicnode.com',
    subgraphUrl:
      'https://api.studio.thegraph.com/query/71849/clrfund-testnet/version/latest',
  },
  [ChainId.ARBITRUM_ONE]: {
    id: ChainId.ARBITRUM_ONE,
    label: 'Arbitrum',
    token: 'AETH',
    clrfundDeployer: '0xD4D30226a3A23ce217cb7BcD854489C5c4D54C60',
    explorerUrl: 'https://arbiscan.io',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    subgraphUrl:
      'https://api.goldsky.com/api/public/project_clx20k9lq5gtx01vw0dp967m7/subgraphs/clrfunds-arbitrum/1.0.0/gn',
  },
}

/* ,
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
  }
  */
