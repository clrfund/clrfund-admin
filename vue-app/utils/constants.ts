export const ZERO_VALUE = '0x00'
export const DEFAULT_BASE_DEPOSIT = '0.001'
export const DEFAULT_CHALLENGE_PERIOD = 9007199254740990
export const DEFAULT_FUNDING_SOURCE_APPROVAL_AMOUNT = '99999'

/** Deployment options */
export const recipientRegistryOptions = [
  {
    id: 1,
    name: 'Deploy a new recipient registry',
  },
  {
    id: 2,
    name: 'Use the following recipient registry',
  },
]

export const userRegistryOptions = [
  {
    id: 1,
    name: 'Deploy a new user registry',
  },
  {
    id: 2,
    name: 'Use the following user registry',
  },
]

export const clrfundOwnerOptions = [
  {
    id: EDEPLOY_OPTIONS.DEPLOY,
    name: 'Deploy a new Safe to own ClrFund',
  },
  {
    id: EDEPLOY_OPTIONS.USE_EXISTING,
    name: 'Use the following Safe to own ClrFund',
  },
]

export const matchingPoolOptions = [
  {
    id: EDEPLOY_OPTIONS.DEPLOY,
    name: 'Deploy a new Safe to own the matching pool',
  },
  {
    id: EDEPLOY_OPTIONS.USE_EXISTING,
    name: 'Use the following Safe to own the matching pool',
  },
  {
    id: EDEPLOY_OPTIONS.SKIP,
    name: 'Skip deployment of matching pool Safe',
  },
]
