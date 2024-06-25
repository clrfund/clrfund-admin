import type { Contract } from 'ethers'
import { ContractTransactionResponse } from 'ethers'

export async function getEventLogArg(
  tx: ContractTransactionResponse,
  contract: Contract,
  eventName: string,
  argumentName: string,
  occurance?: number
): Promise<any> {
  const reciept = await tx.wait()
  const contractAddress = await contract.getAddress()
  let instance = 0
  for (const log of reciept?.logs || []) {
    if (log.address !== contractAddress) {
      continue
    }
    const event = contract.interface.parseLog({
      data: log.data,
      topics: [...log.topics],
    })
    // eslint-disable-next-line
    if (event && event.name === eventName) {
      instance++
      if (occurance === undefined || instance === occurance) {
        return event.args[argumentName]
      }
    }
  }
  throw new Error(
    `Event ${eventName} from contract ${contractAddress} not found in transaction ${tx.hash}`
  )
}
