import { getAddress } from 'ethers'

export function isAddressEqual(address1?: string, address2?: string): boolean {
    if (!address1 || !address2) {
        return false
    }

    try {
        return getAddress(address1) === getAddress(address2)
    } catch {
        return false
    }
}
