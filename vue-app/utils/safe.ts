import Safe, {
  EthersAdapter,
  getCreateCallContract,
} from '@safe-global/protocol-kit'
import {
  type MetaTransactionData,
  OperationType,
  type TransactionResult,
} from '@safe-global/safe-core-sdk-types'
import type { AbstractSigner, Provider, Signer } from 'ethers'
import { ethers, getAddress } from 'ethers'
import SafeApiKit from '@safe-global/api-kit'

const safeVersion = '1.4.1'

/**
 * Returns the ethers adapter for the Safe
 * @param signer The Safe signer
 * @returns
 */
export function getEthAdapter(signer: Provider | AbstractSigner) {
  const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: signer,
  })

  return ethAdapter
}

/**
 * Get the Gnosis 'create call' contract addresss
 * @param signerOrProvider The transaction signer
 * @returns the Create Call contract address
 */
export async function getCreateCallContractAddress(
  signerOrProvider: Provider | AbstractSigner
): Promise<string> {
  const ethAdapter = getEthAdapter(signerOrProvider)
  const createCallContract = await getCreateCallContract({
    ethAdapter,
    safeVersion,
  })
  const address = await createCallContract.getAddress()
  return address
}

/**
 * Returns the Safe meta transaction data for contract deployment
 * @param signer The signer of the transaction
 * @param value The value to send to the contract during deployment
 * @param deploymentData The contract deployment data
 * @returns The Safe meta transaction data
 */
export async function getCreateContractMetaTransaction(
  signer: Signer,
  value: string,
  deploymentData: string
): Promise<MetaTransactionData> {
  const ethAdapter = getEthAdapter(signer)
  const createCallContract = await getCreateCallContract({
    ethAdapter,
    safeVersion,
  })

  const createCallContractAddress = await createCallContract.getAddress()
  const createContractData = createCallContract.encode('performCreate', [
    value,
    deploymentData,
  ])

  return {
    to: createCallContractAddress,
    data: createContractData,
    operation: OperationType.DelegateCall,
    value,
  }
}

/**
 * Execute the Safe transactions
 * @param safe The safe to deploy the transaction
 * @param transactions The transactions to deploy
 * @returns The transaction deployment result
 */
export async function executeSafeTransactions(
  safeAddress: string,
  signer: Signer,
  transactions: MetaTransactionData[]
): Promise<TransactionResult | undefined> {
  if (transactions.length > 0) {
    const ethAdapter = getEthAdapter(signer)
    const safe = await Safe.create({ ethAdapter, safeAddress })
    const safeTransaction = await safe.createTransaction({ transactions })
    const txResponse = await safe.executeTransaction(safeTransaction)
    return txResponse
  }
}

/**
 * Get Gnosis Safe API kit by chain id
 * @param chainId The chain id
 * @returns The Gnosis Safe Api Kit
 */
export async function getSafeApiKit(chainId: bigint): Promise<SafeApiKit> {
  const apiKit = new SafeApiKit({
    chainId,
  })
  return apiKit
}

/**
 * Check if the address is a Gnosis Safe address
 * @param address The address to check
 * @param chainId The chain id
 * @returns true if the address is a Gnosis safe
 */
export async function isSafe(
  address: string,
  chainId: number
): Promise<boolean> {
  const safeApiKit = await getSafeApiKit(BigInt(chainId))
  try {
    const safe = await safeApiKit.getSafeInfo(address)
    return !!safe.address
  } catch {
    return false
  }
}

/**
 * Get a list of Gnosis Safes owned by the owner
 * @param owner The owner address
 * @param chainId The chain id
 * @returns The owner addresses
 */
export async function getSafesByOwner(
  owner: string,
  chainId: number
): Promise<string[]> {
  const safeApiKit = await getSafeApiKit(BigInt(chainId))
  try {
    const checksumAddress = getAddress(owner)
    const result = await safeApiKit.getSafesByOwner(checksumAddress)
    return result.safes
  } catch {
    return []
  }
}
