import { ZeroAddress, getAddress, isAddress } from 'ethers'

/**
 * check if the addresses are the same
 * returns false if either address is an empty string
 */
export function isAddressEqual(address1?: string, address2?: string): boolean {
  if (!address1 || !address2) return false

  try {
    return getAddress(address1) === getAddress(address2)
  } catch {
    return false
  }
}

/**
 * Check if the address is a valid address
 * @param address the address to be checked
 * @returns true if the address is a valid address format
 */
export function isValidAddress(address: string): boolean {
  return isAddress(address) && address !== ZeroAddress
}
