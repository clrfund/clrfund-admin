// A database of chain id and known funding round factories
export const factories: Record<number, string> = {
    // mantle simulation
    5000: '0xB7E86339ccd4b8D70fbD7289dFea05C10a351fBd',
    //5000: '0x1E98b9b8e45B14c254F02F81059392Bf40B0F3c6',
    5001: '0x006f39E6a6D15323334Be1db34C73088550BB20a',
    // arbitrum one
    42161: '0xc06349D95C30551Ea510bD5F35CfA2151499D60a',
    // arbitrum goerli
    421613: '0x8981f569C3aa1C0e7f2766761c38c8896769f2f4',
    // sepolia testnet
    11155111: '0x8981f569C3aa1C0e7f2766761c38c8896769f2f4',
}
