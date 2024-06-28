import { ZeroAddress, parseEther, encodeBytes32String } from 'ethers'
import { EContracts } from './types'

export const userRegistries: Record<string, EContracts> = {
  simple: EContracts.SimpleUserRegistry,
  brightid: EContracts.BrightIdUserRegistry,
  semaphore: EContracts.SemaphoreUserRegistry,
}

export const recipientRegistries: Record<string, EContracts> = {
  simple: EContracts.SimpleRecipientRegistry,
  optimistic: EContracts.OptimisticRecipientRegistry,
}

export const userRegistryTypes = Object.keys(userRegistries)
export const recipientRegistryTypes = Object.keys(recipientRegistries)

/**
 * Get arguments to deploy a user registry contract
 */
export function getUserRegistryArgs(state: {
  userRegistryType: string
  brightIdContext: string
  brightIdVerifier: string
}): any[] {
  const userRegistry = userRegistries[state.userRegistryType]
  if (userRegistry === EContracts.BrightIdUserRegistry) {
    const context = state.brightIdContext
    const verifier = state.brightIdVerifier
    // sponsor is not used in BrightId but need a valid address
    const sponsor = DUMMY_BRIGHTID_SPONSOR_ADDRESS
    return [encodeBytes32String(context), verifier, sponsor]
  }

  return []
}

/**
 * Get arguments to deploy a recipient registry contract
 */
export function getRecipientRegistryArgs(state: {
  recipientRegistryType: string
  clrfundAddress: string
  deposit: string
  challengePeriod: number
}): any[] {
  const registry = recipientRegistries[state.recipientRegistryType]

  const controller = state.clrfundAddress
  if (registry === EContracts.OptimisticRecipientRegistry) {
    const baseDeposit = parseEther(state.deposit)
    const challengePeriod = state.challengePeriod
    return [baseDeposit, challengePeriod, controller]
  } else {
    return [controller]
  }
}
