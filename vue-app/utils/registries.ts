import { ZeroAddress, parseEther } from 'ethers'
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
 * Get get arguments to deploy a user registry contract
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
    // sponsor is not used in BrightId now
    const sponsor = ZeroAddress
    return [context, verifier, sponsor]
  }

  return []
}

/**
 * Get get arguments to deploy a recipient registry contract
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
