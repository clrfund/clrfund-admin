import { chains } from '~/api/chains'
const chainNames = chains.map((chain) => chain.name)

export class UnsupportChainError extends Error {
    constructor() {
        super('Please connect with one of these supported chains:' + chainNames)
    }
}

export class NotOwnerError extends Error {
    constructor() {
        super('Please connect with the funding round factory owner account')
    }
}

export class NotConnected extends Error {
    constructor() {
        super('Please connect your wallet')
    }
}
