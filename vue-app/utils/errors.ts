const chainNames = Object.values(chains).map((chain) => chain.name)

export class UnsupportChainError extends Error {
  constructor() {
    super(`Please connect with one of these supported chains:${chainNames}`)
  }
}

export class NotOwnerError extends Error {
  constructor() {
    super('Please connect with the clrfund owner account')
  }
}

export class NotConnected extends Error {
  constructor() {
    super('Please connect your wallet')
  }
}

export class InvalidAddress extends Error {
  constructor() {
    super('Please use a valid address')
  }
}

export class InvalidMACIPubKey extends Error {
  constructor() {
    super('Invalid MACI public key')
  }
}

export class NoClrFundOwner extends Error {
  constructor() {
    super('Missing ClrFund owner')
  }
}

export class NoClrFund extends Error {
  constructor() {
    super('Missing ClrFund')
  }
}
