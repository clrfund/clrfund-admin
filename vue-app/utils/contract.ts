import { BaseContract } from 'ethers'
import type {
  Addressable,
  ContractRunner,
  ContractTransactionResponse,
  Interface,
  InterfaceAbi,
} from 'ethers'
import Safe from '@safe-global/protocol-kit'

export class ExtendedContract extends BaseContract {
  private safe: Safe | null
  constructor(
    target: string | Addressable,
    abi: Interface | InterfaceAbi,
    runner: ContractRunner | Safe | null | undefined
  ) {
    if (runner instanceof Safe) {
      super(target, abi)
      this.safe = runner
    } else {
      super(target, abi, runner)
      this.safe = null
    }
  }

  /**
   * Write to a contract function
   * @param functionName The contract function to write to
   * @param args The arguments to the function
   * @returns The contract response
   */
  async write(
    functionName: string,
    ...args: any[]
  ): Promise<ContractTransactionResponse> {
    if (this.safe) {
      const to = await this.getAddress()
      const data = this.interface.encodeFunctionData(functionName, args)
      const value = '0x00'
      const safeTransaction = await this.safe.createTransaction({
        transactions: [{ to, data, value }],
      })

      const txResponse = await this.safe.executeTransaction(safeTransaction)
      if (txResponse.transactionResponse) return txResponse.transactionResponse
      else
        throw new Error(`${functionName}() error, missing transaction response`)
    } else {
      const contractFunction = this.getFunction(functionName)
      return contractFunction(args)
    }
  }
}
