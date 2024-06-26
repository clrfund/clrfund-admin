export enum EContracts {
  SemaphoreUserRegistry = 'SemaphoreUserRegistry',
  SimpleUserRegistry = 'SimpleUserRegistry',
  BrightIdUserRegistry = 'BrightIdUserRegistry',
  OptimisticRecipientRegistry = 'OptimisticRecipientRegistry',
  SimpleRecipientRegistry = 'SimpleRecipientRegistry',
}

export interface ClrFundInfo {
  clrfundAddress: string
  clrfundOwner: string
  coordinator: string
  coordinatorPubKey: string
  matchingPool: string
  matchingPoolAmount: string
  token: string
  userRegistryAddress: string
  recipientRegistryAddress: string
}

/**
 * Parameters for finalizing a round
 */
export interface FinalizeParams {
  totalSpent: string
  totalSpentSalt: string
  resultCommitment: string
  perVOSpentVoiceCreditsHash: string
}

/**
 * ClrFund deployment options
 */
export enum EDEPLOY_OPTIONS {
  DEPLOY = 1,
  USE_EXISTING = 2,
  SKIP = 3,
}
