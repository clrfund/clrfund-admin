/**
 * Return the explorer url for the given address
 * @param explorerUrl The explorer base url
 * @param address The address
 * @returns The explorer url for the address
 */
export function getExplorerUrlByAddress(explorerUrl: string, address: string): string {
  return `${explorerUrl}/address/${address}`
}