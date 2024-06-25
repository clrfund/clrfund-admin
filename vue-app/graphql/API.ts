import { GraphQLClient, RequestOptions } from 'graphql-request'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  BigDecimal: { input: any; output: any }
  BigInt: { input: any; output: any }
  Bytes: { input: any; output: any }
  Int8: { input: any; output: any }
  Timestamp: { input: any; output: any }
}

export enum Aggregation_Interval {
  Day = 'day',
  Hour = 'hour',
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input']
}

export type Block_Height = {
  hash: InputMaybe<Scalars['Bytes']['input']>
  number: InputMaybe<Scalars['Int']['input']>
  number_gte: InputMaybe<Scalars['Int']['input']>
}

export type ClrFund = {
  __typename?: 'ClrFund'
  clrFundDeployer: ClrFundDeployer
  contributorRegistry: Maybe<ContributorRegistry>
  contributorRegistryAddress: Maybe<Scalars['Bytes']['output']>
  coordinator: Maybe<Scalars['Bytes']['output']>
  coordinatorPubKey: Maybe<Scalars['String']['output']>
  createdAt: Maybe<Scalars['String']['output']>
  currentRound: Maybe<FundingRound>
  fundingRounds: Maybe<Array<FundingRound>>
  id: Scalars['ID']['output']
  lastUpdatedAt: Maybe<Scalars['String']['output']>
  maciFactory: Maybe<Scalars['Bytes']['output']>
  messageTreeDepth: Maybe<Scalars['BigInt']['output']>
  nativeToken: Maybe<Scalars['Bytes']['output']>
  nativeTokenInfo: Maybe<Token>
  owner: Maybe<Scalars['Bytes']['output']>
  recipientRegistry: Maybe<RecipientRegistry>
  recipientRegistryAddress: Maybe<Scalars['Bytes']['output']>
  stateTreeDepth: Maybe<Scalars['BigInt']['output']>
  voteOptionTreeDepth: Maybe<Scalars['BigInt']['output']>
}

export type ClrFundFundingRoundsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<FundingRound_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where: InputMaybe<FundingRound_Filter>
}

export type ClrFundDeployer = {
  __typename?: 'ClrFundDeployer'
  clrFunds: Maybe<Array<ClrFund>>
  createdAt: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  lastUpdatedAt: Maybe<Scalars['String']['output']>
}

export type ClrFundDeployerClrFundsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<ClrFund_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where: InputMaybe<ClrFund_Filter>
}

export type ClrFundDeployer_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>
  and: InputMaybe<Array<InputMaybe<ClrFundDeployer_Filter>>>
  clrFunds_: InputMaybe<ClrFund_Filter>
  createdAt: InputMaybe<Scalars['String']['input']>
  createdAt_contains: InputMaybe<Scalars['String']['input']>
  createdAt_contains_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_ends_with: InputMaybe<Scalars['String']['input']>
  createdAt_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_gt: InputMaybe<Scalars['String']['input']>
  createdAt_gte: InputMaybe<Scalars['String']['input']>
  createdAt_in: InputMaybe<Array<Scalars['String']['input']>>
  createdAt_lt: InputMaybe<Scalars['String']['input']>
  createdAt_lte: InputMaybe<Scalars['String']['input']>
  createdAt_not: InputMaybe<Scalars['String']['input']>
  createdAt_not_contains: InputMaybe<Scalars['String']['input']>
  createdAt_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_not_ends_with: InputMaybe<Scalars['String']['input']>
  createdAt_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_not_in: InputMaybe<Array<Scalars['String']['input']>>
  createdAt_not_starts_with: InputMaybe<Scalars['String']['input']>
  createdAt_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_starts_with: InputMaybe<Scalars['String']['input']>
  createdAt_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  id: InputMaybe<Scalars['ID']['input']>
  id_gt: InputMaybe<Scalars['ID']['input']>
  id_gte: InputMaybe<Scalars['ID']['input']>
  id_in: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt: InputMaybe<Scalars['ID']['input']>
  id_lte: InputMaybe<Scalars['ID']['input']>
  id_not: InputMaybe<Scalars['ID']['input']>
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>
  lastUpdatedAt: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_contains: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_contains_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_ends_with: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_gt: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_gte: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_in: InputMaybe<Array<Scalars['String']['input']>>
  lastUpdatedAt_lt: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_lte: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_contains: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_ends_with: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_in: InputMaybe<Array<Scalars['String']['input']>>
  lastUpdatedAt_not_starts_with: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_starts_with: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  or: InputMaybe<Array<InputMaybe<ClrFundDeployer_Filter>>>
}

export enum ClrFundDeployer_OrderBy {
  ClrFunds = 'clrFunds',
  CreatedAt = 'createdAt',
  Id = 'id',
  LastUpdatedAt = 'lastUpdatedAt',
}

export type ClrFund_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>
  and: InputMaybe<Array<InputMaybe<ClrFund_Filter>>>
  clrFundDeployer: InputMaybe<Scalars['String']['input']>
  clrFundDeployer_: InputMaybe<ClrFundDeployer_Filter>
  clrFundDeployer_contains: InputMaybe<Scalars['String']['input']>
  clrFundDeployer_contains_nocase: InputMaybe<Scalars['String']['input']>
  clrFundDeployer_ends_with: InputMaybe<Scalars['String']['input']>
  clrFundDeployer_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  clrFundDeployer_gt: InputMaybe<Scalars['String']['input']>
  clrFundDeployer_gte: InputMaybe<Scalars['String']['input']>
  clrFundDeployer_in: InputMaybe<Array<Scalars['String']['input']>>
  clrFundDeployer_lt: InputMaybe<Scalars['String']['input']>
  clrFundDeployer_lte: InputMaybe<Scalars['String']['input']>
  clrFundDeployer_not: InputMaybe<Scalars['String']['input']>
  clrFundDeployer_not_contains: InputMaybe<Scalars['String']['input']>
  clrFundDeployer_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  clrFundDeployer_not_ends_with: InputMaybe<Scalars['String']['input']>
  clrFundDeployer_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  clrFundDeployer_not_in: InputMaybe<Array<Scalars['String']['input']>>
  clrFundDeployer_not_starts_with: InputMaybe<Scalars['String']['input']>
  clrFundDeployer_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  clrFundDeployer_starts_with: InputMaybe<Scalars['String']['input']>
  clrFundDeployer_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  contributorRegistry: InputMaybe<Scalars['String']['input']>
  contributorRegistryAddress: InputMaybe<Scalars['Bytes']['input']>
  contributorRegistryAddress_contains: InputMaybe<Scalars['Bytes']['input']>
  contributorRegistryAddress_gt: InputMaybe<Scalars['Bytes']['input']>
  contributorRegistryAddress_gte: InputMaybe<Scalars['Bytes']['input']>
  contributorRegistryAddress_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  contributorRegistryAddress_lt: InputMaybe<Scalars['Bytes']['input']>
  contributorRegistryAddress_lte: InputMaybe<Scalars['Bytes']['input']>
  contributorRegistryAddress_not: InputMaybe<Scalars['Bytes']['input']>
  contributorRegistryAddress_not_contains: InputMaybe<Scalars['Bytes']['input']>
  contributorRegistryAddress_not_in: InputMaybe<
    Array<Scalars['Bytes']['input']>
  >
  contributorRegistry_: InputMaybe<ContributorRegistry_Filter>
  contributorRegistry_contains: InputMaybe<Scalars['String']['input']>
  contributorRegistry_contains_nocase: InputMaybe<Scalars['String']['input']>
  contributorRegistry_ends_with: InputMaybe<Scalars['String']['input']>
  contributorRegistry_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  contributorRegistry_gt: InputMaybe<Scalars['String']['input']>
  contributorRegistry_gte: InputMaybe<Scalars['String']['input']>
  contributorRegistry_in: InputMaybe<Array<Scalars['String']['input']>>
  contributorRegistry_lt: InputMaybe<Scalars['String']['input']>
  contributorRegistry_lte: InputMaybe<Scalars['String']['input']>
  contributorRegistry_not: InputMaybe<Scalars['String']['input']>
  contributorRegistry_not_contains: InputMaybe<Scalars['String']['input']>
  contributorRegistry_not_contains_nocase: InputMaybe<
    Scalars['String']['input']
  >
  contributorRegistry_not_ends_with: InputMaybe<Scalars['String']['input']>
  contributorRegistry_not_ends_with_nocase: InputMaybe<
    Scalars['String']['input']
  >
  contributorRegistry_not_in: InputMaybe<Array<Scalars['String']['input']>>
  contributorRegistry_not_starts_with: InputMaybe<Scalars['String']['input']>
  contributorRegistry_not_starts_with_nocase: InputMaybe<
    Scalars['String']['input']
  >
  contributorRegistry_starts_with: InputMaybe<Scalars['String']['input']>
  contributorRegistry_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  coordinator: InputMaybe<Scalars['Bytes']['input']>
  coordinatorPubKey: InputMaybe<Scalars['String']['input']>
  coordinatorPubKey_contains: InputMaybe<Scalars['String']['input']>
  coordinatorPubKey_contains_nocase: InputMaybe<Scalars['String']['input']>
  coordinatorPubKey_ends_with: InputMaybe<Scalars['String']['input']>
  coordinatorPubKey_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  coordinatorPubKey_gt: InputMaybe<Scalars['String']['input']>
  coordinatorPubKey_gte: InputMaybe<Scalars['String']['input']>
  coordinatorPubKey_in: InputMaybe<Array<Scalars['String']['input']>>
  coordinatorPubKey_lt: InputMaybe<Scalars['String']['input']>
  coordinatorPubKey_lte: InputMaybe<Scalars['String']['input']>
  coordinatorPubKey_not: InputMaybe<Scalars['String']['input']>
  coordinatorPubKey_not_contains: InputMaybe<Scalars['String']['input']>
  coordinatorPubKey_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  coordinatorPubKey_not_ends_with: InputMaybe<Scalars['String']['input']>
  coordinatorPubKey_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  coordinatorPubKey_not_in: InputMaybe<Array<Scalars['String']['input']>>
  coordinatorPubKey_not_starts_with: InputMaybe<Scalars['String']['input']>
  coordinatorPubKey_not_starts_with_nocase: InputMaybe<
    Scalars['String']['input']
  >
  coordinatorPubKey_starts_with: InputMaybe<Scalars['String']['input']>
  coordinatorPubKey_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  coordinator_contains: InputMaybe<Scalars['Bytes']['input']>
  coordinator_gt: InputMaybe<Scalars['Bytes']['input']>
  coordinator_gte: InputMaybe<Scalars['Bytes']['input']>
  coordinator_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  coordinator_lt: InputMaybe<Scalars['Bytes']['input']>
  coordinator_lte: InputMaybe<Scalars['Bytes']['input']>
  coordinator_not: InputMaybe<Scalars['Bytes']['input']>
  coordinator_not_contains: InputMaybe<Scalars['Bytes']['input']>
  coordinator_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  createdAt: InputMaybe<Scalars['String']['input']>
  createdAt_contains: InputMaybe<Scalars['String']['input']>
  createdAt_contains_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_ends_with: InputMaybe<Scalars['String']['input']>
  createdAt_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_gt: InputMaybe<Scalars['String']['input']>
  createdAt_gte: InputMaybe<Scalars['String']['input']>
  createdAt_in: InputMaybe<Array<Scalars['String']['input']>>
  createdAt_lt: InputMaybe<Scalars['String']['input']>
  createdAt_lte: InputMaybe<Scalars['String']['input']>
  createdAt_not: InputMaybe<Scalars['String']['input']>
  createdAt_not_contains: InputMaybe<Scalars['String']['input']>
  createdAt_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_not_ends_with: InputMaybe<Scalars['String']['input']>
  createdAt_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_not_in: InputMaybe<Array<Scalars['String']['input']>>
  createdAt_not_starts_with: InputMaybe<Scalars['String']['input']>
  createdAt_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_starts_with: InputMaybe<Scalars['String']['input']>
  createdAt_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  currentRound: InputMaybe<Scalars['String']['input']>
  currentRound_: InputMaybe<FundingRound_Filter>
  currentRound_contains: InputMaybe<Scalars['String']['input']>
  currentRound_contains_nocase: InputMaybe<Scalars['String']['input']>
  currentRound_ends_with: InputMaybe<Scalars['String']['input']>
  currentRound_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  currentRound_gt: InputMaybe<Scalars['String']['input']>
  currentRound_gte: InputMaybe<Scalars['String']['input']>
  currentRound_in: InputMaybe<Array<Scalars['String']['input']>>
  currentRound_lt: InputMaybe<Scalars['String']['input']>
  currentRound_lte: InputMaybe<Scalars['String']['input']>
  currentRound_not: InputMaybe<Scalars['String']['input']>
  currentRound_not_contains: InputMaybe<Scalars['String']['input']>
  currentRound_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  currentRound_not_ends_with: InputMaybe<Scalars['String']['input']>
  currentRound_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  currentRound_not_in: InputMaybe<Array<Scalars['String']['input']>>
  currentRound_not_starts_with: InputMaybe<Scalars['String']['input']>
  currentRound_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  currentRound_starts_with: InputMaybe<Scalars['String']['input']>
  currentRound_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  fundingRounds_: InputMaybe<FundingRound_Filter>
  id: InputMaybe<Scalars['ID']['input']>
  id_gt: InputMaybe<Scalars['ID']['input']>
  id_gte: InputMaybe<Scalars['ID']['input']>
  id_in: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt: InputMaybe<Scalars['ID']['input']>
  id_lte: InputMaybe<Scalars['ID']['input']>
  id_not: InputMaybe<Scalars['ID']['input']>
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>
  lastUpdatedAt: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_contains: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_contains_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_ends_with: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_gt: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_gte: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_in: InputMaybe<Array<Scalars['String']['input']>>
  lastUpdatedAt_lt: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_lte: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_contains: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_ends_with: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_in: InputMaybe<Array<Scalars['String']['input']>>
  lastUpdatedAt_not_starts_with: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_starts_with: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  maciFactory: InputMaybe<Scalars['Bytes']['input']>
  maciFactory_contains: InputMaybe<Scalars['Bytes']['input']>
  maciFactory_gt: InputMaybe<Scalars['Bytes']['input']>
  maciFactory_gte: InputMaybe<Scalars['Bytes']['input']>
  maciFactory_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  maciFactory_lt: InputMaybe<Scalars['Bytes']['input']>
  maciFactory_lte: InputMaybe<Scalars['Bytes']['input']>
  maciFactory_not: InputMaybe<Scalars['Bytes']['input']>
  maciFactory_not_contains: InputMaybe<Scalars['Bytes']['input']>
  maciFactory_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  messageTreeDepth: InputMaybe<Scalars['BigInt']['input']>
  messageTreeDepth_gt: InputMaybe<Scalars['BigInt']['input']>
  messageTreeDepth_gte: InputMaybe<Scalars['BigInt']['input']>
  messageTreeDepth_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  messageTreeDepth_lt: InputMaybe<Scalars['BigInt']['input']>
  messageTreeDepth_lte: InputMaybe<Scalars['BigInt']['input']>
  messageTreeDepth_not: InputMaybe<Scalars['BigInt']['input']>
  messageTreeDepth_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  nativeToken: InputMaybe<Scalars['Bytes']['input']>
  nativeTokenInfo: InputMaybe<Scalars['String']['input']>
  nativeTokenInfo_: InputMaybe<Token_Filter>
  nativeTokenInfo_contains: InputMaybe<Scalars['String']['input']>
  nativeTokenInfo_contains_nocase: InputMaybe<Scalars['String']['input']>
  nativeTokenInfo_ends_with: InputMaybe<Scalars['String']['input']>
  nativeTokenInfo_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  nativeTokenInfo_gt: InputMaybe<Scalars['String']['input']>
  nativeTokenInfo_gte: InputMaybe<Scalars['String']['input']>
  nativeTokenInfo_in: InputMaybe<Array<Scalars['String']['input']>>
  nativeTokenInfo_lt: InputMaybe<Scalars['String']['input']>
  nativeTokenInfo_lte: InputMaybe<Scalars['String']['input']>
  nativeTokenInfo_not: InputMaybe<Scalars['String']['input']>
  nativeTokenInfo_not_contains: InputMaybe<Scalars['String']['input']>
  nativeTokenInfo_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  nativeTokenInfo_not_ends_with: InputMaybe<Scalars['String']['input']>
  nativeTokenInfo_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  nativeTokenInfo_not_in: InputMaybe<Array<Scalars['String']['input']>>
  nativeTokenInfo_not_starts_with: InputMaybe<Scalars['String']['input']>
  nativeTokenInfo_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  nativeTokenInfo_starts_with: InputMaybe<Scalars['String']['input']>
  nativeTokenInfo_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  nativeToken_contains: InputMaybe<Scalars['Bytes']['input']>
  nativeToken_gt: InputMaybe<Scalars['Bytes']['input']>
  nativeToken_gte: InputMaybe<Scalars['Bytes']['input']>
  nativeToken_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  nativeToken_lt: InputMaybe<Scalars['Bytes']['input']>
  nativeToken_lte: InputMaybe<Scalars['Bytes']['input']>
  nativeToken_not: InputMaybe<Scalars['Bytes']['input']>
  nativeToken_not_contains: InputMaybe<Scalars['Bytes']['input']>
  nativeToken_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  or: InputMaybe<Array<InputMaybe<ClrFund_Filter>>>
  owner: InputMaybe<Scalars['Bytes']['input']>
  owner_contains: InputMaybe<Scalars['Bytes']['input']>
  owner_gt: InputMaybe<Scalars['Bytes']['input']>
  owner_gte: InputMaybe<Scalars['Bytes']['input']>
  owner_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  owner_lt: InputMaybe<Scalars['Bytes']['input']>
  owner_lte: InputMaybe<Scalars['Bytes']['input']>
  owner_not: InputMaybe<Scalars['Bytes']['input']>
  owner_not_contains: InputMaybe<Scalars['Bytes']['input']>
  owner_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  recipientRegistry: InputMaybe<Scalars['String']['input']>
  recipientRegistryAddress: InputMaybe<Scalars['Bytes']['input']>
  recipientRegistryAddress_contains: InputMaybe<Scalars['Bytes']['input']>
  recipientRegistryAddress_gt: InputMaybe<Scalars['Bytes']['input']>
  recipientRegistryAddress_gte: InputMaybe<Scalars['Bytes']['input']>
  recipientRegistryAddress_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  recipientRegistryAddress_lt: InputMaybe<Scalars['Bytes']['input']>
  recipientRegistryAddress_lte: InputMaybe<Scalars['Bytes']['input']>
  recipientRegistryAddress_not: InputMaybe<Scalars['Bytes']['input']>
  recipientRegistryAddress_not_contains: InputMaybe<Scalars['Bytes']['input']>
  recipientRegistryAddress_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  recipientRegistry_: InputMaybe<RecipientRegistry_Filter>
  recipientRegistry_contains: InputMaybe<Scalars['String']['input']>
  recipientRegistry_contains_nocase: InputMaybe<Scalars['String']['input']>
  recipientRegistry_ends_with: InputMaybe<Scalars['String']['input']>
  recipientRegistry_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  recipientRegistry_gt: InputMaybe<Scalars['String']['input']>
  recipientRegistry_gte: InputMaybe<Scalars['String']['input']>
  recipientRegistry_in: InputMaybe<Array<Scalars['String']['input']>>
  recipientRegistry_lt: InputMaybe<Scalars['String']['input']>
  recipientRegistry_lte: InputMaybe<Scalars['String']['input']>
  recipientRegistry_not: InputMaybe<Scalars['String']['input']>
  recipientRegistry_not_contains: InputMaybe<Scalars['String']['input']>
  recipientRegistry_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  recipientRegistry_not_ends_with: InputMaybe<Scalars['String']['input']>
  recipientRegistry_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  recipientRegistry_not_in: InputMaybe<Array<Scalars['String']['input']>>
  recipientRegistry_not_starts_with: InputMaybe<Scalars['String']['input']>
  recipientRegistry_not_starts_with_nocase: InputMaybe<
    Scalars['String']['input']
  >
  recipientRegistry_starts_with: InputMaybe<Scalars['String']['input']>
  recipientRegistry_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  stateTreeDepth: InputMaybe<Scalars['BigInt']['input']>
  stateTreeDepth_gt: InputMaybe<Scalars['BigInt']['input']>
  stateTreeDepth_gte: InputMaybe<Scalars['BigInt']['input']>
  stateTreeDepth_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  stateTreeDepth_lt: InputMaybe<Scalars['BigInt']['input']>
  stateTreeDepth_lte: InputMaybe<Scalars['BigInt']['input']>
  stateTreeDepth_not: InputMaybe<Scalars['BigInt']['input']>
  stateTreeDepth_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  voteOptionTreeDepth: InputMaybe<Scalars['BigInt']['input']>
  voteOptionTreeDepth_gt: InputMaybe<Scalars['BigInt']['input']>
  voteOptionTreeDepth_gte: InputMaybe<Scalars['BigInt']['input']>
  voteOptionTreeDepth_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  voteOptionTreeDepth_lt: InputMaybe<Scalars['BigInt']['input']>
  voteOptionTreeDepth_lte: InputMaybe<Scalars['BigInt']['input']>
  voteOptionTreeDepth_not: InputMaybe<Scalars['BigInt']['input']>
  voteOptionTreeDepth_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>
}

export enum ClrFund_OrderBy {
  ClrFundDeployer = 'clrFundDeployer',
  ClrFundDeployerCreatedAt = 'clrFundDeployer__createdAt',
  ClrFundDeployerId = 'clrFundDeployer__id',
  ClrFundDeployerLastUpdatedAt = 'clrFundDeployer__lastUpdatedAt',
  ContributorRegistry = 'contributorRegistry',
  ContributorRegistryAddress = 'contributorRegistryAddress',
  ContributorRegistryContext = 'contributorRegistry__context',
  ContributorRegistryCreatedAt = 'contributorRegistry__createdAt',
  ContributorRegistryId = 'contributorRegistry__id',
  ContributorRegistryLastUpdatedAt = 'contributorRegistry__lastUpdatedAt',
  ContributorRegistryOwner = 'contributorRegistry__owner',
  Coordinator = 'coordinator',
  CoordinatorPubKey = 'coordinatorPubKey',
  CreatedAt = 'createdAt',
  CurrentRound = 'currentRound',
  CurrentRoundContributorCount = 'currentRound__contributorCount',
  CurrentRoundContributorRegistryAddress = 'currentRound__contributorRegistryAddress',
  CurrentRoundCoordinator = 'currentRound__coordinator',
  CurrentRoundCoordinatorPubKeyX = 'currentRound__coordinatorPubKeyX',
  CurrentRoundCoordinatorPubKeyY = 'currentRound__coordinatorPubKeyY',
  CurrentRoundCreatedAt = 'currentRound__createdAt',
  CurrentRoundId = 'currentRound__id',
  CurrentRoundIsCancelled = 'currentRound__isCancelled',
  CurrentRoundIsFinalized = 'currentRound__isFinalized',
  CurrentRoundLastUpdatedAt = 'currentRound__lastUpdatedAt',
  CurrentRoundMaci = 'currentRound__maci',
  CurrentRoundMaciTxHash = 'currentRound__maciTxHash',
  CurrentRoundMatchingPoolSize = 'currentRound__matchingPoolSize',
  CurrentRoundMaxMessages = 'currentRound__maxMessages',
  CurrentRoundMaxVoteOptions = 'currentRound__maxVoteOptions',
  CurrentRoundMessageTreeDepth = 'currentRound__messageTreeDepth',
  CurrentRoundNativeToken = 'currentRound__nativeToken',
  CurrentRoundPollAddress = 'currentRound__pollAddress',
  CurrentRoundPollId = 'currentRound__pollId',
  CurrentRoundRecipientCount = 'currentRound__recipientCount',
  CurrentRoundRecipientRegistryAddress = 'currentRound__recipientRegistryAddress',
  CurrentRoundSignUpDeadline = 'currentRound__signUpDeadline',
  CurrentRoundStartTime = 'currentRound__startTime',
  CurrentRoundStateTreeDepth = 'currentRound__stateTreeDepth',
  CurrentRoundTallyHash = 'currentRound__tallyHash',
  CurrentRoundTotalSpent = 'currentRound__totalSpent',
  CurrentRoundTotalVotes = 'currentRound__totalVotes',
  CurrentRoundVoiceCreditFactor = 'currentRound__voiceCreditFactor',
  CurrentRoundVoteOptionTreeDepth = 'currentRound__voteOptionTreeDepth',
  CurrentRoundVotingDeadline = 'currentRound__votingDeadline',
  FundingRounds = 'fundingRounds',
  Id = 'id',
  LastUpdatedAt = 'lastUpdatedAt',
  MaciFactory = 'maciFactory',
  MessageTreeDepth = 'messageTreeDepth',
  NativeToken = 'nativeToken',
  NativeTokenInfo = 'nativeTokenInfo',
  NativeTokenInfoCreatedAt = 'nativeTokenInfo__createdAt',
  NativeTokenInfoDecimals = 'nativeTokenInfo__decimals',
  NativeTokenInfoId = 'nativeTokenInfo__id',
  NativeTokenInfoLastUpdatedAt = 'nativeTokenInfo__lastUpdatedAt',
  NativeTokenInfoSymbol = 'nativeTokenInfo__symbol',
  NativeTokenInfoTokenAddress = 'nativeTokenInfo__tokenAddress',
  Owner = 'owner',
  RecipientRegistry = 'recipientRegistry',
  RecipientRegistryAddress = 'recipientRegistryAddress',
  RecipientRegistryBaseDeposit = 'recipientRegistry__baseDeposit',
  RecipientRegistryChallengePeriodDuration = 'recipientRegistry__challengePeriodDuration',
  RecipientRegistryController = 'recipientRegistry__controller',
  RecipientRegistryCreatedAt = 'recipientRegistry__createdAt',
  RecipientRegistryId = 'recipientRegistry__id',
  RecipientRegistryLastUpdatedAt = 'recipientRegistry__lastUpdatedAt',
  RecipientRegistryMaxRecipients = 'recipientRegistry__maxRecipients',
  RecipientRegistryOwner = 'recipientRegistry__owner',
  StateTreeDepth = 'stateTreeDepth',
  VoteOptionTreeDepth = 'voteOptionTreeDepth',
}

export type Contribution = {
  __typename?: 'Contribution'
  amount: Maybe<Scalars['BigInt']['output']>
  contributor: Maybe<Contributor>
  createdAt: Maybe<Scalars['String']['output']>
  fundingRound: Maybe<FundingRound>
  id: Scalars['ID']['output']
  voiceCredits: Maybe<Scalars['BigInt']['output']>
}

export type Contribution_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>
  amount: InputMaybe<Scalars['BigInt']['input']>
  amount_gt: InputMaybe<Scalars['BigInt']['input']>
  amount_gte: InputMaybe<Scalars['BigInt']['input']>
  amount_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  amount_lt: InputMaybe<Scalars['BigInt']['input']>
  amount_lte: InputMaybe<Scalars['BigInt']['input']>
  amount_not: InputMaybe<Scalars['BigInt']['input']>
  amount_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  and: InputMaybe<Array<InputMaybe<Contribution_Filter>>>
  contributor: InputMaybe<Scalars['String']['input']>
  contributor_: InputMaybe<Contributor_Filter>
  contributor_contains: InputMaybe<Scalars['String']['input']>
  contributor_contains_nocase: InputMaybe<Scalars['String']['input']>
  contributor_ends_with: InputMaybe<Scalars['String']['input']>
  contributor_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  contributor_gt: InputMaybe<Scalars['String']['input']>
  contributor_gte: InputMaybe<Scalars['String']['input']>
  contributor_in: InputMaybe<Array<Scalars['String']['input']>>
  contributor_lt: InputMaybe<Scalars['String']['input']>
  contributor_lte: InputMaybe<Scalars['String']['input']>
  contributor_not: InputMaybe<Scalars['String']['input']>
  contributor_not_contains: InputMaybe<Scalars['String']['input']>
  contributor_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  contributor_not_ends_with: InputMaybe<Scalars['String']['input']>
  contributor_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  contributor_not_in: InputMaybe<Array<Scalars['String']['input']>>
  contributor_not_starts_with: InputMaybe<Scalars['String']['input']>
  contributor_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  contributor_starts_with: InputMaybe<Scalars['String']['input']>
  contributor_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  createdAt: InputMaybe<Scalars['String']['input']>
  createdAt_contains: InputMaybe<Scalars['String']['input']>
  createdAt_contains_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_ends_with: InputMaybe<Scalars['String']['input']>
  createdAt_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_gt: InputMaybe<Scalars['String']['input']>
  createdAt_gte: InputMaybe<Scalars['String']['input']>
  createdAt_in: InputMaybe<Array<Scalars['String']['input']>>
  createdAt_lt: InputMaybe<Scalars['String']['input']>
  createdAt_lte: InputMaybe<Scalars['String']['input']>
  createdAt_not: InputMaybe<Scalars['String']['input']>
  createdAt_not_contains: InputMaybe<Scalars['String']['input']>
  createdAt_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_not_ends_with: InputMaybe<Scalars['String']['input']>
  createdAt_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_not_in: InputMaybe<Array<Scalars['String']['input']>>
  createdAt_not_starts_with: InputMaybe<Scalars['String']['input']>
  createdAt_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_starts_with: InputMaybe<Scalars['String']['input']>
  createdAt_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  fundingRound: InputMaybe<Scalars['String']['input']>
  fundingRound_: InputMaybe<FundingRound_Filter>
  fundingRound_contains: InputMaybe<Scalars['String']['input']>
  fundingRound_contains_nocase: InputMaybe<Scalars['String']['input']>
  fundingRound_ends_with: InputMaybe<Scalars['String']['input']>
  fundingRound_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  fundingRound_gt: InputMaybe<Scalars['String']['input']>
  fundingRound_gte: InputMaybe<Scalars['String']['input']>
  fundingRound_in: InputMaybe<Array<Scalars['String']['input']>>
  fundingRound_lt: InputMaybe<Scalars['String']['input']>
  fundingRound_lte: InputMaybe<Scalars['String']['input']>
  fundingRound_not: InputMaybe<Scalars['String']['input']>
  fundingRound_not_contains: InputMaybe<Scalars['String']['input']>
  fundingRound_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  fundingRound_not_ends_with: InputMaybe<Scalars['String']['input']>
  fundingRound_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  fundingRound_not_in: InputMaybe<Array<Scalars['String']['input']>>
  fundingRound_not_starts_with: InputMaybe<Scalars['String']['input']>
  fundingRound_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  fundingRound_starts_with: InputMaybe<Scalars['String']['input']>
  fundingRound_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  id: InputMaybe<Scalars['ID']['input']>
  id_gt: InputMaybe<Scalars['ID']['input']>
  id_gte: InputMaybe<Scalars['ID']['input']>
  id_in: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt: InputMaybe<Scalars['ID']['input']>
  id_lte: InputMaybe<Scalars['ID']['input']>
  id_not: InputMaybe<Scalars['ID']['input']>
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>
  or: InputMaybe<Array<InputMaybe<Contribution_Filter>>>
  voiceCredits: InputMaybe<Scalars['BigInt']['input']>
  voiceCredits_gt: InputMaybe<Scalars['BigInt']['input']>
  voiceCredits_gte: InputMaybe<Scalars['BigInt']['input']>
  voiceCredits_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  voiceCredits_lt: InputMaybe<Scalars['BigInt']['input']>
  voiceCredits_lte: InputMaybe<Scalars['BigInt']['input']>
  voiceCredits_not: InputMaybe<Scalars['BigInt']['input']>
  voiceCredits_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>
}

export enum Contribution_OrderBy {
  Amount = 'amount',
  Contributor = 'contributor',
  ContributorContributorAddress = 'contributor__contributorAddress',
  ContributorCreatedAt = 'contributor__createdAt',
  ContributorId = 'contributor__id',
  ContributorLastUpdatedAt = 'contributor__lastUpdatedAt',
  ContributorVerifiedTimeStamp = 'contributor__verifiedTimeStamp',
  CreatedAt = 'createdAt',
  FundingRound = 'fundingRound',
  FundingRoundContributorCount = 'fundingRound__contributorCount',
  FundingRoundContributorRegistryAddress = 'fundingRound__contributorRegistryAddress',
  FundingRoundCoordinator = 'fundingRound__coordinator',
  FundingRoundCoordinatorPubKeyX = 'fundingRound__coordinatorPubKeyX',
  FundingRoundCoordinatorPubKeyY = 'fundingRound__coordinatorPubKeyY',
  FundingRoundCreatedAt = 'fundingRound__createdAt',
  FundingRoundId = 'fundingRound__id',
  FundingRoundIsCancelled = 'fundingRound__isCancelled',
  FundingRoundIsFinalized = 'fundingRound__isFinalized',
  FundingRoundLastUpdatedAt = 'fundingRound__lastUpdatedAt',
  FundingRoundMaci = 'fundingRound__maci',
  FundingRoundMaciTxHash = 'fundingRound__maciTxHash',
  FundingRoundMatchingPoolSize = 'fundingRound__matchingPoolSize',
  FundingRoundMaxMessages = 'fundingRound__maxMessages',
  FundingRoundMaxVoteOptions = 'fundingRound__maxVoteOptions',
  FundingRoundMessageTreeDepth = 'fundingRound__messageTreeDepth',
  FundingRoundNativeToken = 'fundingRound__nativeToken',
  FundingRoundPollAddress = 'fundingRound__pollAddress',
  FundingRoundPollId = 'fundingRound__pollId',
  FundingRoundRecipientCount = 'fundingRound__recipientCount',
  FundingRoundRecipientRegistryAddress = 'fundingRound__recipientRegistryAddress',
  FundingRoundSignUpDeadline = 'fundingRound__signUpDeadline',
  FundingRoundStartTime = 'fundingRound__startTime',
  FundingRoundStateTreeDepth = 'fundingRound__stateTreeDepth',
  FundingRoundTallyHash = 'fundingRound__tallyHash',
  FundingRoundTotalSpent = 'fundingRound__totalSpent',
  FundingRoundTotalVotes = 'fundingRound__totalVotes',
  FundingRoundVoiceCreditFactor = 'fundingRound__voiceCreditFactor',
  FundingRoundVoteOptionTreeDepth = 'fundingRound__voteOptionTreeDepth',
  FundingRoundVotingDeadline = 'fundingRound__votingDeadline',
  Id = 'id',
  VoiceCredits = 'voiceCredits',
}

export type Contributor = {
  __typename?: 'Contributor'
  contributions: Maybe<Array<Contribution>>
  contributorAddress: Maybe<Scalars['Bytes']['output']>
  contributorRegistry: ContributorRegistry
  createdAt: Maybe<Scalars['String']['output']>
  fundingRounds: Maybe<Array<FundingRound>>
  id: Scalars['ID']['output']
  lastUpdatedAt: Maybe<Scalars['String']['output']>
  verifiedTimeStamp: Maybe<Scalars['String']['output']>
}

export type ContributorContributionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<Contribution_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where: InputMaybe<Contribution_Filter>
}

export type ContributorFundingRoundsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<FundingRound_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where: InputMaybe<FundingRound_Filter>
}

export type ContributorRegistry = {
  __typename?: 'ContributorRegistry'
  clrFund: ClrFund
  context: Maybe<Scalars['String']['output']>
  contributors: Maybe<Array<Contributor>>
  createdAt: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  lastUpdatedAt: Maybe<Scalars['String']['output']>
  owner: Maybe<Scalars['Bytes']['output']>
}

export type ContributorRegistryContributorsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<Contributor_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where: InputMaybe<Contributor_Filter>
}

export type ContributorRegistry_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>
  and: InputMaybe<Array<InputMaybe<ContributorRegistry_Filter>>>
  clrFund: InputMaybe<Scalars['String']['input']>
  clrFund_: InputMaybe<ClrFund_Filter>
  clrFund_contains: InputMaybe<Scalars['String']['input']>
  clrFund_contains_nocase: InputMaybe<Scalars['String']['input']>
  clrFund_ends_with: InputMaybe<Scalars['String']['input']>
  clrFund_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  clrFund_gt: InputMaybe<Scalars['String']['input']>
  clrFund_gte: InputMaybe<Scalars['String']['input']>
  clrFund_in: InputMaybe<Array<Scalars['String']['input']>>
  clrFund_lt: InputMaybe<Scalars['String']['input']>
  clrFund_lte: InputMaybe<Scalars['String']['input']>
  clrFund_not: InputMaybe<Scalars['String']['input']>
  clrFund_not_contains: InputMaybe<Scalars['String']['input']>
  clrFund_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  clrFund_not_ends_with: InputMaybe<Scalars['String']['input']>
  clrFund_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  clrFund_not_in: InputMaybe<Array<Scalars['String']['input']>>
  clrFund_not_starts_with: InputMaybe<Scalars['String']['input']>
  clrFund_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  clrFund_starts_with: InputMaybe<Scalars['String']['input']>
  clrFund_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  context: InputMaybe<Scalars['String']['input']>
  context_contains: InputMaybe<Scalars['String']['input']>
  context_contains_nocase: InputMaybe<Scalars['String']['input']>
  context_ends_with: InputMaybe<Scalars['String']['input']>
  context_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  context_gt: InputMaybe<Scalars['String']['input']>
  context_gte: InputMaybe<Scalars['String']['input']>
  context_in: InputMaybe<Array<Scalars['String']['input']>>
  context_lt: InputMaybe<Scalars['String']['input']>
  context_lte: InputMaybe<Scalars['String']['input']>
  context_not: InputMaybe<Scalars['String']['input']>
  context_not_contains: InputMaybe<Scalars['String']['input']>
  context_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  context_not_ends_with: InputMaybe<Scalars['String']['input']>
  context_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  context_not_in: InputMaybe<Array<Scalars['String']['input']>>
  context_not_starts_with: InputMaybe<Scalars['String']['input']>
  context_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  context_starts_with: InputMaybe<Scalars['String']['input']>
  context_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  contributors_: InputMaybe<Contributor_Filter>
  createdAt: InputMaybe<Scalars['String']['input']>
  createdAt_contains: InputMaybe<Scalars['String']['input']>
  createdAt_contains_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_ends_with: InputMaybe<Scalars['String']['input']>
  createdAt_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_gt: InputMaybe<Scalars['String']['input']>
  createdAt_gte: InputMaybe<Scalars['String']['input']>
  createdAt_in: InputMaybe<Array<Scalars['String']['input']>>
  createdAt_lt: InputMaybe<Scalars['String']['input']>
  createdAt_lte: InputMaybe<Scalars['String']['input']>
  createdAt_not: InputMaybe<Scalars['String']['input']>
  createdAt_not_contains: InputMaybe<Scalars['String']['input']>
  createdAt_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_not_ends_with: InputMaybe<Scalars['String']['input']>
  createdAt_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_not_in: InputMaybe<Array<Scalars['String']['input']>>
  createdAt_not_starts_with: InputMaybe<Scalars['String']['input']>
  createdAt_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_starts_with: InputMaybe<Scalars['String']['input']>
  createdAt_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  id: InputMaybe<Scalars['ID']['input']>
  id_gt: InputMaybe<Scalars['ID']['input']>
  id_gte: InputMaybe<Scalars['ID']['input']>
  id_in: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt: InputMaybe<Scalars['ID']['input']>
  id_lte: InputMaybe<Scalars['ID']['input']>
  id_not: InputMaybe<Scalars['ID']['input']>
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>
  lastUpdatedAt: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_contains: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_contains_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_ends_with: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_gt: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_gte: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_in: InputMaybe<Array<Scalars['String']['input']>>
  lastUpdatedAt_lt: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_lte: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_contains: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_ends_with: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_in: InputMaybe<Array<Scalars['String']['input']>>
  lastUpdatedAt_not_starts_with: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_starts_with: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  or: InputMaybe<Array<InputMaybe<ContributorRegistry_Filter>>>
  owner: InputMaybe<Scalars['Bytes']['input']>
  owner_contains: InputMaybe<Scalars['Bytes']['input']>
  owner_gt: InputMaybe<Scalars['Bytes']['input']>
  owner_gte: InputMaybe<Scalars['Bytes']['input']>
  owner_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  owner_lt: InputMaybe<Scalars['Bytes']['input']>
  owner_lte: InputMaybe<Scalars['Bytes']['input']>
  owner_not: InputMaybe<Scalars['Bytes']['input']>
  owner_not_contains: InputMaybe<Scalars['Bytes']['input']>
  owner_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>
}

export enum ContributorRegistry_OrderBy {
  ClrFund = 'clrFund',
  ClrFundContributorRegistryAddress = 'clrFund__contributorRegistryAddress',
  ClrFundCoordinator = 'clrFund__coordinator',
  ClrFundCoordinatorPubKey = 'clrFund__coordinatorPubKey',
  ClrFundCreatedAt = 'clrFund__createdAt',
  ClrFundId = 'clrFund__id',
  ClrFundLastUpdatedAt = 'clrFund__lastUpdatedAt',
  ClrFundMaciFactory = 'clrFund__maciFactory',
  ClrFundMessageTreeDepth = 'clrFund__messageTreeDepth',
  ClrFundNativeToken = 'clrFund__nativeToken',
  ClrFundOwner = 'clrFund__owner',
  ClrFundRecipientRegistryAddress = 'clrFund__recipientRegistryAddress',
  ClrFundStateTreeDepth = 'clrFund__stateTreeDepth',
  ClrFundVoteOptionTreeDepth = 'clrFund__voteOptionTreeDepth',
  Context = 'context',
  Contributors = 'contributors',
  CreatedAt = 'createdAt',
  Id = 'id',
  LastUpdatedAt = 'lastUpdatedAt',
  Owner = 'owner',
}

export type Contributor_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>
  and: InputMaybe<Array<InputMaybe<Contributor_Filter>>>
  contributions_: InputMaybe<Contribution_Filter>
  contributorAddress: InputMaybe<Scalars['Bytes']['input']>
  contributorAddress_contains: InputMaybe<Scalars['Bytes']['input']>
  contributorAddress_gt: InputMaybe<Scalars['Bytes']['input']>
  contributorAddress_gte: InputMaybe<Scalars['Bytes']['input']>
  contributorAddress_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  contributorAddress_lt: InputMaybe<Scalars['Bytes']['input']>
  contributorAddress_lte: InputMaybe<Scalars['Bytes']['input']>
  contributorAddress_not: InputMaybe<Scalars['Bytes']['input']>
  contributorAddress_not_contains: InputMaybe<Scalars['Bytes']['input']>
  contributorAddress_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  contributorRegistry: InputMaybe<Scalars['String']['input']>
  contributorRegistry_: InputMaybe<ContributorRegistry_Filter>
  contributorRegistry_contains: InputMaybe<Scalars['String']['input']>
  contributorRegistry_contains_nocase: InputMaybe<Scalars['String']['input']>
  contributorRegistry_ends_with: InputMaybe<Scalars['String']['input']>
  contributorRegistry_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  contributorRegistry_gt: InputMaybe<Scalars['String']['input']>
  contributorRegistry_gte: InputMaybe<Scalars['String']['input']>
  contributorRegistry_in: InputMaybe<Array<Scalars['String']['input']>>
  contributorRegistry_lt: InputMaybe<Scalars['String']['input']>
  contributorRegistry_lte: InputMaybe<Scalars['String']['input']>
  contributorRegistry_not: InputMaybe<Scalars['String']['input']>
  contributorRegistry_not_contains: InputMaybe<Scalars['String']['input']>
  contributorRegistry_not_contains_nocase: InputMaybe<
    Scalars['String']['input']
  >
  contributorRegistry_not_ends_with: InputMaybe<Scalars['String']['input']>
  contributorRegistry_not_ends_with_nocase: InputMaybe<
    Scalars['String']['input']
  >
  contributorRegistry_not_in: InputMaybe<Array<Scalars['String']['input']>>
  contributorRegistry_not_starts_with: InputMaybe<Scalars['String']['input']>
  contributorRegistry_not_starts_with_nocase: InputMaybe<
    Scalars['String']['input']
  >
  contributorRegistry_starts_with: InputMaybe<Scalars['String']['input']>
  contributorRegistry_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  createdAt: InputMaybe<Scalars['String']['input']>
  createdAt_contains: InputMaybe<Scalars['String']['input']>
  createdAt_contains_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_ends_with: InputMaybe<Scalars['String']['input']>
  createdAt_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_gt: InputMaybe<Scalars['String']['input']>
  createdAt_gte: InputMaybe<Scalars['String']['input']>
  createdAt_in: InputMaybe<Array<Scalars['String']['input']>>
  createdAt_lt: InputMaybe<Scalars['String']['input']>
  createdAt_lte: InputMaybe<Scalars['String']['input']>
  createdAt_not: InputMaybe<Scalars['String']['input']>
  createdAt_not_contains: InputMaybe<Scalars['String']['input']>
  createdAt_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_not_ends_with: InputMaybe<Scalars['String']['input']>
  createdAt_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_not_in: InputMaybe<Array<Scalars['String']['input']>>
  createdAt_not_starts_with: InputMaybe<Scalars['String']['input']>
  createdAt_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_starts_with: InputMaybe<Scalars['String']['input']>
  createdAt_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  fundingRounds: InputMaybe<Array<Scalars['String']['input']>>
  fundingRounds_: InputMaybe<FundingRound_Filter>
  fundingRounds_contains: InputMaybe<Array<Scalars['String']['input']>>
  fundingRounds_contains_nocase: InputMaybe<Array<Scalars['String']['input']>>
  fundingRounds_not: InputMaybe<Array<Scalars['String']['input']>>
  fundingRounds_not_contains: InputMaybe<Array<Scalars['String']['input']>>
  fundingRounds_not_contains_nocase: InputMaybe<
    Array<Scalars['String']['input']>
  >
  id: InputMaybe<Scalars['ID']['input']>
  id_gt: InputMaybe<Scalars['ID']['input']>
  id_gte: InputMaybe<Scalars['ID']['input']>
  id_in: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt: InputMaybe<Scalars['ID']['input']>
  id_lte: InputMaybe<Scalars['ID']['input']>
  id_not: InputMaybe<Scalars['ID']['input']>
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>
  lastUpdatedAt: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_contains: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_contains_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_ends_with: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_gt: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_gte: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_in: InputMaybe<Array<Scalars['String']['input']>>
  lastUpdatedAt_lt: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_lte: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_contains: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_ends_with: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_in: InputMaybe<Array<Scalars['String']['input']>>
  lastUpdatedAt_not_starts_with: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_starts_with: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  or: InputMaybe<Array<InputMaybe<Contributor_Filter>>>
  verifiedTimeStamp: InputMaybe<Scalars['String']['input']>
  verifiedTimeStamp_contains: InputMaybe<Scalars['String']['input']>
  verifiedTimeStamp_contains_nocase: InputMaybe<Scalars['String']['input']>
  verifiedTimeStamp_ends_with: InputMaybe<Scalars['String']['input']>
  verifiedTimeStamp_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  verifiedTimeStamp_gt: InputMaybe<Scalars['String']['input']>
  verifiedTimeStamp_gte: InputMaybe<Scalars['String']['input']>
  verifiedTimeStamp_in: InputMaybe<Array<Scalars['String']['input']>>
  verifiedTimeStamp_lt: InputMaybe<Scalars['String']['input']>
  verifiedTimeStamp_lte: InputMaybe<Scalars['String']['input']>
  verifiedTimeStamp_not: InputMaybe<Scalars['String']['input']>
  verifiedTimeStamp_not_contains: InputMaybe<Scalars['String']['input']>
  verifiedTimeStamp_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  verifiedTimeStamp_not_ends_with: InputMaybe<Scalars['String']['input']>
  verifiedTimeStamp_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  verifiedTimeStamp_not_in: InputMaybe<Array<Scalars['String']['input']>>
  verifiedTimeStamp_not_starts_with: InputMaybe<Scalars['String']['input']>
  verifiedTimeStamp_not_starts_with_nocase: InputMaybe<
    Scalars['String']['input']
  >
  verifiedTimeStamp_starts_with: InputMaybe<Scalars['String']['input']>
  verifiedTimeStamp_starts_with_nocase: InputMaybe<Scalars['String']['input']>
}

export enum Contributor_OrderBy {
  Contributions = 'contributions',
  ContributorAddress = 'contributorAddress',
  ContributorRegistry = 'contributorRegistry',
  ContributorRegistryContext = 'contributorRegistry__context',
  ContributorRegistryCreatedAt = 'contributorRegistry__createdAt',
  ContributorRegistryId = 'contributorRegistry__id',
  ContributorRegistryLastUpdatedAt = 'contributorRegistry__lastUpdatedAt',
  ContributorRegistryOwner = 'contributorRegistry__owner',
  CreatedAt = 'createdAt',
  FundingRounds = 'fundingRounds',
  Id = 'id',
  LastUpdatedAt = 'lastUpdatedAt',
  VerifiedTimeStamp = 'verifiedTimeStamp',
}

export type Coordinator = {
  __typename?: 'Coordinator'
  contact: Maybe<Scalars['String']['output']>
  createdAt: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  lastUpdatedAt: Maybe<Scalars['String']['output']>
}

export type Coordinator_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>
  and: InputMaybe<Array<InputMaybe<Coordinator_Filter>>>
  contact: InputMaybe<Scalars['String']['input']>
  contact_contains: InputMaybe<Scalars['String']['input']>
  contact_contains_nocase: InputMaybe<Scalars['String']['input']>
  contact_ends_with: InputMaybe<Scalars['String']['input']>
  contact_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  contact_gt: InputMaybe<Scalars['String']['input']>
  contact_gte: InputMaybe<Scalars['String']['input']>
  contact_in: InputMaybe<Array<Scalars['String']['input']>>
  contact_lt: InputMaybe<Scalars['String']['input']>
  contact_lte: InputMaybe<Scalars['String']['input']>
  contact_not: InputMaybe<Scalars['String']['input']>
  contact_not_contains: InputMaybe<Scalars['String']['input']>
  contact_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  contact_not_ends_with: InputMaybe<Scalars['String']['input']>
  contact_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  contact_not_in: InputMaybe<Array<Scalars['String']['input']>>
  contact_not_starts_with: InputMaybe<Scalars['String']['input']>
  contact_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  contact_starts_with: InputMaybe<Scalars['String']['input']>
  contact_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  createdAt: InputMaybe<Scalars['String']['input']>
  createdAt_contains: InputMaybe<Scalars['String']['input']>
  createdAt_contains_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_ends_with: InputMaybe<Scalars['String']['input']>
  createdAt_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_gt: InputMaybe<Scalars['String']['input']>
  createdAt_gte: InputMaybe<Scalars['String']['input']>
  createdAt_in: InputMaybe<Array<Scalars['String']['input']>>
  createdAt_lt: InputMaybe<Scalars['String']['input']>
  createdAt_lte: InputMaybe<Scalars['String']['input']>
  createdAt_not: InputMaybe<Scalars['String']['input']>
  createdAt_not_contains: InputMaybe<Scalars['String']['input']>
  createdAt_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_not_ends_with: InputMaybe<Scalars['String']['input']>
  createdAt_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_not_in: InputMaybe<Array<Scalars['String']['input']>>
  createdAt_not_starts_with: InputMaybe<Scalars['String']['input']>
  createdAt_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_starts_with: InputMaybe<Scalars['String']['input']>
  createdAt_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  id: InputMaybe<Scalars['ID']['input']>
  id_gt: InputMaybe<Scalars['ID']['input']>
  id_gte: InputMaybe<Scalars['ID']['input']>
  id_in: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt: InputMaybe<Scalars['ID']['input']>
  id_lte: InputMaybe<Scalars['ID']['input']>
  id_not: InputMaybe<Scalars['ID']['input']>
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>
  lastUpdatedAt: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_contains: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_contains_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_ends_with: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_gt: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_gte: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_in: InputMaybe<Array<Scalars['String']['input']>>
  lastUpdatedAt_lt: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_lte: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_contains: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_ends_with: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_in: InputMaybe<Array<Scalars['String']['input']>>
  lastUpdatedAt_not_starts_with: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_starts_with: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  or: InputMaybe<Array<InputMaybe<Coordinator_Filter>>>
}

export enum Coordinator_OrderBy {
  Contact = 'contact',
  CreatedAt = 'createdAt',
  Id = 'id',
  LastUpdatedAt = 'lastUpdatedAt',
}

export type Donation = {
  __typename?: 'Donation'
  amount: Maybe<Scalars['BigInt']['output']>
  createdAt: Maybe<Scalars['String']['output']>
  fundingRound: Maybe<FundingRound>
  id: Scalars['ID']['output']
  recipient: Maybe<Scalars['Bytes']['output']>
  voteOptionIndex: Maybe<Scalars['BigInt']['output']>
}

export type Donation_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>
  amount: InputMaybe<Scalars['BigInt']['input']>
  amount_gt: InputMaybe<Scalars['BigInt']['input']>
  amount_gte: InputMaybe<Scalars['BigInt']['input']>
  amount_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  amount_lt: InputMaybe<Scalars['BigInt']['input']>
  amount_lte: InputMaybe<Scalars['BigInt']['input']>
  amount_not: InputMaybe<Scalars['BigInt']['input']>
  amount_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  and: InputMaybe<Array<InputMaybe<Donation_Filter>>>
  createdAt: InputMaybe<Scalars['String']['input']>
  createdAt_contains: InputMaybe<Scalars['String']['input']>
  createdAt_contains_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_ends_with: InputMaybe<Scalars['String']['input']>
  createdAt_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_gt: InputMaybe<Scalars['String']['input']>
  createdAt_gte: InputMaybe<Scalars['String']['input']>
  createdAt_in: InputMaybe<Array<Scalars['String']['input']>>
  createdAt_lt: InputMaybe<Scalars['String']['input']>
  createdAt_lte: InputMaybe<Scalars['String']['input']>
  createdAt_not: InputMaybe<Scalars['String']['input']>
  createdAt_not_contains: InputMaybe<Scalars['String']['input']>
  createdAt_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_not_ends_with: InputMaybe<Scalars['String']['input']>
  createdAt_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_not_in: InputMaybe<Array<Scalars['String']['input']>>
  createdAt_not_starts_with: InputMaybe<Scalars['String']['input']>
  createdAt_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_starts_with: InputMaybe<Scalars['String']['input']>
  createdAt_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  fundingRound: InputMaybe<Scalars['String']['input']>
  fundingRound_: InputMaybe<FundingRound_Filter>
  fundingRound_contains: InputMaybe<Scalars['String']['input']>
  fundingRound_contains_nocase: InputMaybe<Scalars['String']['input']>
  fundingRound_ends_with: InputMaybe<Scalars['String']['input']>
  fundingRound_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  fundingRound_gt: InputMaybe<Scalars['String']['input']>
  fundingRound_gte: InputMaybe<Scalars['String']['input']>
  fundingRound_in: InputMaybe<Array<Scalars['String']['input']>>
  fundingRound_lt: InputMaybe<Scalars['String']['input']>
  fundingRound_lte: InputMaybe<Scalars['String']['input']>
  fundingRound_not: InputMaybe<Scalars['String']['input']>
  fundingRound_not_contains: InputMaybe<Scalars['String']['input']>
  fundingRound_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  fundingRound_not_ends_with: InputMaybe<Scalars['String']['input']>
  fundingRound_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  fundingRound_not_in: InputMaybe<Array<Scalars['String']['input']>>
  fundingRound_not_starts_with: InputMaybe<Scalars['String']['input']>
  fundingRound_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  fundingRound_starts_with: InputMaybe<Scalars['String']['input']>
  fundingRound_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  id: InputMaybe<Scalars['ID']['input']>
  id_gt: InputMaybe<Scalars['ID']['input']>
  id_gte: InputMaybe<Scalars['ID']['input']>
  id_in: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt: InputMaybe<Scalars['ID']['input']>
  id_lte: InputMaybe<Scalars['ID']['input']>
  id_not: InputMaybe<Scalars['ID']['input']>
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>
  or: InputMaybe<Array<InputMaybe<Donation_Filter>>>
  recipient: InputMaybe<Scalars['Bytes']['input']>
  recipient_contains: InputMaybe<Scalars['Bytes']['input']>
  recipient_gt: InputMaybe<Scalars['Bytes']['input']>
  recipient_gte: InputMaybe<Scalars['Bytes']['input']>
  recipient_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  recipient_lt: InputMaybe<Scalars['Bytes']['input']>
  recipient_lte: InputMaybe<Scalars['Bytes']['input']>
  recipient_not: InputMaybe<Scalars['Bytes']['input']>
  recipient_not_contains: InputMaybe<Scalars['Bytes']['input']>
  recipient_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  voteOptionIndex: InputMaybe<Scalars['BigInt']['input']>
  voteOptionIndex_gt: InputMaybe<Scalars['BigInt']['input']>
  voteOptionIndex_gte: InputMaybe<Scalars['BigInt']['input']>
  voteOptionIndex_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  voteOptionIndex_lt: InputMaybe<Scalars['BigInt']['input']>
  voteOptionIndex_lte: InputMaybe<Scalars['BigInt']['input']>
  voteOptionIndex_not: InputMaybe<Scalars['BigInt']['input']>
  voteOptionIndex_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>
}

export enum Donation_OrderBy {
  Amount = 'amount',
  CreatedAt = 'createdAt',
  FundingRound = 'fundingRound',
  FundingRoundContributorCount = 'fundingRound__contributorCount',
  FundingRoundContributorRegistryAddress = 'fundingRound__contributorRegistryAddress',
  FundingRoundCoordinator = 'fundingRound__coordinator',
  FundingRoundCoordinatorPubKeyX = 'fundingRound__coordinatorPubKeyX',
  FundingRoundCoordinatorPubKeyY = 'fundingRound__coordinatorPubKeyY',
  FundingRoundCreatedAt = 'fundingRound__createdAt',
  FundingRoundId = 'fundingRound__id',
  FundingRoundIsCancelled = 'fundingRound__isCancelled',
  FundingRoundIsFinalized = 'fundingRound__isFinalized',
  FundingRoundLastUpdatedAt = 'fundingRound__lastUpdatedAt',
  FundingRoundMaci = 'fundingRound__maci',
  FundingRoundMaciTxHash = 'fundingRound__maciTxHash',
  FundingRoundMatchingPoolSize = 'fundingRound__matchingPoolSize',
  FundingRoundMaxMessages = 'fundingRound__maxMessages',
  FundingRoundMaxVoteOptions = 'fundingRound__maxVoteOptions',
  FundingRoundMessageTreeDepth = 'fundingRound__messageTreeDepth',
  FundingRoundNativeToken = 'fundingRound__nativeToken',
  FundingRoundPollAddress = 'fundingRound__pollAddress',
  FundingRoundPollId = 'fundingRound__pollId',
  FundingRoundRecipientCount = 'fundingRound__recipientCount',
  FundingRoundRecipientRegistryAddress = 'fundingRound__recipientRegistryAddress',
  FundingRoundSignUpDeadline = 'fundingRound__signUpDeadline',
  FundingRoundStartTime = 'fundingRound__startTime',
  FundingRoundStateTreeDepth = 'fundingRound__stateTreeDepth',
  FundingRoundTallyHash = 'fundingRound__tallyHash',
  FundingRoundTotalSpent = 'fundingRound__totalSpent',
  FundingRoundTotalVotes = 'fundingRound__totalVotes',
  FundingRoundVoiceCreditFactor = 'fundingRound__voiceCreditFactor',
  FundingRoundVoteOptionTreeDepth = 'fundingRound__voteOptionTreeDepth',
  FundingRoundVotingDeadline = 'fundingRound__votingDeadline',
  Id = 'id',
  Recipient = 'recipient',
  VoteOptionIndex = 'voteOptionIndex',
}

export type FundingRound = {
  __typename?: 'FundingRound'
  clrFund: Maybe<ClrFund>
  contributions: Maybe<Array<Contribution>>
  contributorCount: Scalars['BigInt']['output']
  contributorRegistry: Maybe<ContributorRegistry>
  contributorRegistryAddress: Maybe<Scalars['Bytes']['output']>
  contributors: Maybe<Array<Contributor>>
  coordinator: Maybe<Scalars['Bytes']['output']>
  coordinatorPubKeyX: Maybe<Scalars['BigInt']['output']>
  coordinatorPubKeyY: Maybe<Scalars['BigInt']['output']>
  createdAt: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  isCancelled: Maybe<Scalars['Boolean']['output']>
  isFinalized: Maybe<Scalars['Boolean']['output']>
  lastUpdatedAt: Maybe<Scalars['String']['output']>
  maci: Maybe<Scalars['Bytes']['output']>
  maciTxHash: Maybe<Scalars['Bytes']['output']>
  matchingPoolSize: Maybe<Scalars['BigInt']['output']>
  maxMessages: Maybe<Scalars['BigInt']['output']>
  maxVoteOptions: Maybe<Scalars['BigInt']['output']>
  messageTreeDepth: Maybe<Scalars['Int']['output']>
  messages: Maybe<Array<Message>>
  nativeToken: Maybe<Scalars['Bytes']['output']>
  nativeTokenInfo: Maybe<Token>
  pollAddress: Maybe<Scalars['Bytes']['output']>
  pollId: Maybe<Scalars['BigInt']['output']>
  recipientCount: Scalars['BigInt']['output']
  recipientRegistry: Maybe<RecipientRegistry>
  recipientRegistryAddress: Maybe<Scalars['Bytes']['output']>
  recipients: Maybe<Array<Recipient>>
  signUpDeadline: Maybe<Scalars['BigInt']['output']>
  startTime: Maybe<Scalars['BigInt']['output']>
  stateTreeDepth: Maybe<Scalars['Int']['output']>
  tallyHash: Maybe<Scalars['String']['output']>
  totalSpent: Maybe<Scalars['BigInt']['output']>
  totalVotes: Maybe<Scalars['BigInt']['output']>
  voiceCreditFactor: Maybe<Scalars['BigInt']['output']>
  voteOptionTreeDepth: Maybe<Scalars['Int']['output']>
  votingDeadline: Maybe<Scalars['BigInt']['output']>
}

export type FundingRoundContributionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<Contribution_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where: InputMaybe<Contribution_Filter>
}

export type FundingRoundContributorsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<Contributor_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where: InputMaybe<Contributor_Filter>
}

export type FundingRoundMessagesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<Message_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where: InputMaybe<Message_Filter>
}

export type FundingRoundRecipientsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<Recipient_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where: InputMaybe<Recipient_Filter>
}

export type FundingRound_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>
  and: InputMaybe<Array<InputMaybe<FundingRound_Filter>>>
  clrFund: InputMaybe<Scalars['String']['input']>
  clrFund_: InputMaybe<ClrFund_Filter>
  clrFund_contains: InputMaybe<Scalars['String']['input']>
  clrFund_contains_nocase: InputMaybe<Scalars['String']['input']>
  clrFund_ends_with: InputMaybe<Scalars['String']['input']>
  clrFund_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  clrFund_gt: InputMaybe<Scalars['String']['input']>
  clrFund_gte: InputMaybe<Scalars['String']['input']>
  clrFund_in: InputMaybe<Array<Scalars['String']['input']>>
  clrFund_lt: InputMaybe<Scalars['String']['input']>
  clrFund_lte: InputMaybe<Scalars['String']['input']>
  clrFund_not: InputMaybe<Scalars['String']['input']>
  clrFund_not_contains: InputMaybe<Scalars['String']['input']>
  clrFund_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  clrFund_not_ends_with: InputMaybe<Scalars['String']['input']>
  clrFund_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  clrFund_not_in: InputMaybe<Array<Scalars['String']['input']>>
  clrFund_not_starts_with: InputMaybe<Scalars['String']['input']>
  clrFund_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  clrFund_starts_with: InputMaybe<Scalars['String']['input']>
  clrFund_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  contributions_: InputMaybe<Contribution_Filter>
  contributorCount: InputMaybe<Scalars['BigInt']['input']>
  contributorCount_gt: InputMaybe<Scalars['BigInt']['input']>
  contributorCount_gte: InputMaybe<Scalars['BigInt']['input']>
  contributorCount_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  contributorCount_lt: InputMaybe<Scalars['BigInt']['input']>
  contributorCount_lte: InputMaybe<Scalars['BigInt']['input']>
  contributorCount_not: InputMaybe<Scalars['BigInt']['input']>
  contributorCount_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  contributorRegistry: InputMaybe<Scalars['String']['input']>
  contributorRegistryAddress: InputMaybe<Scalars['Bytes']['input']>
  contributorRegistryAddress_contains: InputMaybe<Scalars['Bytes']['input']>
  contributorRegistryAddress_gt: InputMaybe<Scalars['Bytes']['input']>
  contributorRegistryAddress_gte: InputMaybe<Scalars['Bytes']['input']>
  contributorRegistryAddress_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  contributorRegistryAddress_lt: InputMaybe<Scalars['Bytes']['input']>
  contributorRegistryAddress_lte: InputMaybe<Scalars['Bytes']['input']>
  contributorRegistryAddress_not: InputMaybe<Scalars['Bytes']['input']>
  contributorRegistryAddress_not_contains: InputMaybe<Scalars['Bytes']['input']>
  contributorRegistryAddress_not_in: InputMaybe<
    Array<Scalars['Bytes']['input']>
  >
  contributorRegistry_: InputMaybe<ContributorRegistry_Filter>
  contributorRegistry_contains: InputMaybe<Scalars['String']['input']>
  contributorRegistry_contains_nocase: InputMaybe<Scalars['String']['input']>
  contributorRegistry_ends_with: InputMaybe<Scalars['String']['input']>
  contributorRegistry_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  contributorRegistry_gt: InputMaybe<Scalars['String']['input']>
  contributorRegistry_gte: InputMaybe<Scalars['String']['input']>
  contributorRegistry_in: InputMaybe<Array<Scalars['String']['input']>>
  contributorRegistry_lt: InputMaybe<Scalars['String']['input']>
  contributorRegistry_lte: InputMaybe<Scalars['String']['input']>
  contributorRegistry_not: InputMaybe<Scalars['String']['input']>
  contributorRegistry_not_contains: InputMaybe<Scalars['String']['input']>
  contributorRegistry_not_contains_nocase: InputMaybe<
    Scalars['String']['input']
  >
  contributorRegistry_not_ends_with: InputMaybe<Scalars['String']['input']>
  contributorRegistry_not_ends_with_nocase: InputMaybe<
    Scalars['String']['input']
  >
  contributorRegistry_not_in: InputMaybe<Array<Scalars['String']['input']>>
  contributorRegistry_not_starts_with: InputMaybe<Scalars['String']['input']>
  contributorRegistry_not_starts_with_nocase: InputMaybe<
    Scalars['String']['input']
  >
  contributorRegistry_starts_with: InputMaybe<Scalars['String']['input']>
  contributorRegistry_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  contributors_: InputMaybe<Contributor_Filter>
  coordinator: InputMaybe<Scalars['Bytes']['input']>
  coordinatorPubKeyX: InputMaybe<Scalars['BigInt']['input']>
  coordinatorPubKeyX_gt: InputMaybe<Scalars['BigInt']['input']>
  coordinatorPubKeyX_gte: InputMaybe<Scalars['BigInt']['input']>
  coordinatorPubKeyX_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  coordinatorPubKeyX_lt: InputMaybe<Scalars['BigInt']['input']>
  coordinatorPubKeyX_lte: InputMaybe<Scalars['BigInt']['input']>
  coordinatorPubKeyX_not: InputMaybe<Scalars['BigInt']['input']>
  coordinatorPubKeyX_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  coordinatorPubKeyY: InputMaybe<Scalars['BigInt']['input']>
  coordinatorPubKeyY_gt: InputMaybe<Scalars['BigInt']['input']>
  coordinatorPubKeyY_gte: InputMaybe<Scalars['BigInt']['input']>
  coordinatorPubKeyY_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  coordinatorPubKeyY_lt: InputMaybe<Scalars['BigInt']['input']>
  coordinatorPubKeyY_lte: InputMaybe<Scalars['BigInt']['input']>
  coordinatorPubKeyY_not: InputMaybe<Scalars['BigInt']['input']>
  coordinatorPubKeyY_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  coordinator_contains: InputMaybe<Scalars['Bytes']['input']>
  coordinator_gt: InputMaybe<Scalars['Bytes']['input']>
  coordinator_gte: InputMaybe<Scalars['Bytes']['input']>
  coordinator_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  coordinator_lt: InputMaybe<Scalars['Bytes']['input']>
  coordinator_lte: InputMaybe<Scalars['Bytes']['input']>
  coordinator_not: InputMaybe<Scalars['Bytes']['input']>
  coordinator_not_contains: InputMaybe<Scalars['Bytes']['input']>
  coordinator_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  createdAt: InputMaybe<Scalars['String']['input']>
  createdAt_contains: InputMaybe<Scalars['String']['input']>
  createdAt_contains_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_ends_with: InputMaybe<Scalars['String']['input']>
  createdAt_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_gt: InputMaybe<Scalars['String']['input']>
  createdAt_gte: InputMaybe<Scalars['String']['input']>
  createdAt_in: InputMaybe<Array<Scalars['String']['input']>>
  createdAt_lt: InputMaybe<Scalars['String']['input']>
  createdAt_lte: InputMaybe<Scalars['String']['input']>
  createdAt_not: InputMaybe<Scalars['String']['input']>
  createdAt_not_contains: InputMaybe<Scalars['String']['input']>
  createdAt_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_not_ends_with: InputMaybe<Scalars['String']['input']>
  createdAt_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_not_in: InputMaybe<Array<Scalars['String']['input']>>
  createdAt_not_starts_with: InputMaybe<Scalars['String']['input']>
  createdAt_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_starts_with: InputMaybe<Scalars['String']['input']>
  createdAt_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  id: InputMaybe<Scalars['ID']['input']>
  id_gt: InputMaybe<Scalars['ID']['input']>
  id_gte: InputMaybe<Scalars['ID']['input']>
  id_in: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt: InputMaybe<Scalars['ID']['input']>
  id_lte: InputMaybe<Scalars['ID']['input']>
  id_not: InputMaybe<Scalars['ID']['input']>
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>
  isCancelled: InputMaybe<Scalars['Boolean']['input']>
  isCancelled_in: InputMaybe<Array<Scalars['Boolean']['input']>>
  isCancelled_not: InputMaybe<Scalars['Boolean']['input']>
  isCancelled_not_in: InputMaybe<Array<Scalars['Boolean']['input']>>
  isFinalized: InputMaybe<Scalars['Boolean']['input']>
  isFinalized_in: InputMaybe<Array<Scalars['Boolean']['input']>>
  isFinalized_not: InputMaybe<Scalars['Boolean']['input']>
  isFinalized_not_in: InputMaybe<Array<Scalars['Boolean']['input']>>
  lastUpdatedAt: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_contains: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_contains_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_ends_with: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_gt: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_gte: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_in: InputMaybe<Array<Scalars['String']['input']>>
  lastUpdatedAt_lt: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_lte: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_contains: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_ends_with: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_in: InputMaybe<Array<Scalars['String']['input']>>
  lastUpdatedAt_not_starts_with: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_starts_with: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  maci: InputMaybe<Scalars['Bytes']['input']>
  maciTxHash: InputMaybe<Scalars['Bytes']['input']>
  maciTxHash_contains: InputMaybe<Scalars['Bytes']['input']>
  maciTxHash_gt: InputMaybe<Scalars['Bytes']['input']>
  maciTxHash_gte: InputMaybe<Scalars['Bytes']['input']>
  maciTxHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  maciTxHash_lt: InputMaybe<Scalars['Bytes']['input']>
  maciTxHash_lte: InputMaybe<Scalars['Bytes']['input']>
  maciTxHash_not: InputMaybe<Scalars['Bytes']['input']>
  maciTxHash_not_contains: InputMaybe<Scalars['Bytes']['input']>
  maciTxHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  maci_contains: InputMaybe<Scalars['Bytes']['input']>
  maci_gt: InputMaybe<Scalars['Bytes']['input']>
  maci_gte: InputMaybe<Scalars['Bytes']['input']>
  maci_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  maci_lt: InputMaybe<Scalars['Bytes']['input']>
  maci_lte: InputMaybe<Scalars['Bytes']['input']>
  maci_not: InputMaybe<Scalars['Bytes']['input']>
  maci_not_contains: InputMaybe<Scalars['Bytes']['input']>
  maci_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  matchingPoolSize: InputMaybe<Scalars['BigInt']['input']>
  matchingPoolSize_gt: InputMaybe<Scalars['BigInt']['input']>
  matchingPoolSize_gte: InputMaybe<Scalars['BigInt']['input']>
  matchingPoolSize_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  matchingPoolSize_lt: InputMaybe<Scalars['BigInt']['input']>
  matchingPoolSize_lte: InputMaybe<Scalars['BigInt']['input']>
  matchingPoolSize_not: InputMaybe<Scalars['BigInt']['input']>
  matchingPoolSize_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  maxMessages: InputMaybe<Scalars['BigInt']['input']>
  maxMessages_gt: InputMaybe<Scalars['BigInt']['input']>
  maxMessages_gte: InputMaybe<Scalars['BigInt']['input']>
  maxMessages_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  maxMessages_lt: InputMaybe<Scalars['BigInt']['input']>
  maxMessages_lte: InputMaybe<Scalars['BigInt']['input']>
  maxMessages_not: InputMaybe<Scalars['BigInt']['input']>
  maxMessages_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  maxVoteOptions: InputMaybe<Scalars['BigInt']['input']>
  maxVoteOptions_gt: InputMaybe<Scalars['BigInt']['input']>
  maxVoteOptions_gte: InputMaybe<Scalars['BigInt']['input']>
  maxVoteOptions_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  maxVoteOptions_lt: InputMaybe<Scalars['BigInt']['input']>
  maxVoteOptions_lte: InputMaybe<Scalars['BigInt']['input']>
  maxVoteOptions_not: InputMaybe<Scalars['BigInt']['input']>
  maxVoteOptions_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  messageTreeDepth: InputMaybe<Scalars['Int']['input']>
  messageTreeDepth_gt: InputMaybe<Scalars['Int']['input']>
  messageTreeDepth_gte: InputMaybe<Scalars['Int']['input']>
  messageTreeDepth_in: InputMaybe<Array<Scalars['Int']['input']>>
  messageTreeDepth_lt: InputMaybe<Scalars['Int']['input']>
  messageTreeDepth_lte: InputMaybe<Scalars['Int']['input']>
  messageTreeDepth_not: InputMaybe<Scalars['Int']['input']>
  messageTreeDepth_not_in: InputMaybe<Array<Scalars['Int']['input']>>
  messages_: InputMaybe<Message_Filter>
  nativeToken: InputMaybe<Scalars['Bytes']['input']>
  nativeTokenInfo: InputMaybe<Scalars['String']['input']>
  nativeTokenInfo_: InputMaybe<Token_Filter>
  nativeTokenInfo_contains: InputMaybe<Scalars['String']['input']>
  nativeTokenInfo_contains_nocase: InputMaybe<Scalars['String']['input']>
  nativeTokenInfo_ends_with: InputMaybe<Scalars['String']['input']>
  nativeTokenInfo_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  nativeTokenInfo_gt: InputMaybe<Scalars['String']['input']>
  nativeTokenInfo_gte: InputMaybe<Scalars['String']['input']>
  nativeTokenInfo_in: InputMaybe<Array<Scalars['String']['input']>>
  nativeTokenInfo_lt: InputMaybe<Scalars['String']['input']>
  nativeTokenInfo_lte: InputMaybe<Scalars['String']['input']>
  nativeTokenInfo_not: InputMaybe<Scalars['String']['input']>
  nativeTokenInfo_not_contains: InputMaybe<Scalars['String']['input']>
  nativeTokenInfo_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  nativeTokenInfo_not_ends_with: InputMaybe<Scalars['String']['input']>
  nativeTokenInfo_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  nativeTokenInfo_not_in: InputMaybe<Array<Scalars['String']['input']>>
  nativeTokenInfo_not_starts_with: InputMaybe<Scalars['String']['input']>
  nativeTokenInfo_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  nativeTokenInfo_starts_with: InputMaybe<Scalars['String']['input']>
  nativeTokenInfo_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  nativeToken_contains: InputMaybe<Scalars['Bytes']['input']>
  nativeToken_gt: InputMaybe<Scalars['Bytes']['input']>
  nativeToken_gte: InputMaybe<Scalars['Bytes']['input']>
  nativeToken_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  nativeToken_lt: InputMaybe<Scalars['Bytes']['input']>
  nativeToken_lte: InputMaybe<Scalars['Bytes']['input']>
  nativeToken_not: InputMaybe<Scalars['Bytes']['input']>
  nativeToken_not_contains: InputMaybe<Scalars['Bytes']['input']>
  nativeToken_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  or: InputMaybe<Array<InputMaybe<FundingRound_Filter>>>
  pollAddress: InputMaybe<Scalars['Bytes']['input']>
  pollAddress_contains: InputMaybe<Scalars['Bytes']['input']>
  pollAddress_gt: InputMaybe<Scalars['Bytes']['input']>
  pollAddress_gte: InputMaybe<Scalars['Bytes']['input']>
  pollAddress_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  pollAddress_lt: InputMaybe<Scalars['Bytes']['input']>
  pollAddress_lte: InputMaybe<Scalars['Bytes']['input']>
  pollAddress_not: InputMaybe<Scalars['Bytes']['input']>
  pollAddress_not_contains: InputMaybe<Scalars['Bytes']['input']>
  pollAddress_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  pollId: InputMaybe<Scalars['BigInt']['input']>
  pollId_gt: InputMaybe<Scalars['BigInt']['input']>
  pollId_gte: InputMaybe<Scalars['BigInt']['input']>
  pollId_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  pollId_lt: InputMaybe<Scalars['BigInt']['input']>
  pollId_lte: InputMaybe<Scalars['BigInt']['input']>
  pollId_not: InputMaybe<Scalars['BigInt']['input']>
  pollId_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  recipientCount: InputMaybe<Scalars['BigInt']['input']>
  recipientCount_gt: InputMaybe<Scalars['BigInt']['input']>
  recipientCount_gte: InputMaybe<Scalars['BigInt']['input']>
  recipientCount_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  recipientCount_lt: InputMaybe<Scalars['BigInt']['input']>
  recipientCount_lte: InputMaybe<Scalars['BigInt']['input']>
  recipientCount_not: InputMaybe<Scalars['BigInt']['input']>
  recipientCount_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  recipientRegistry: InputMaybe<Scalars['String']['input']>
  recipientRegistryAddress: InputMaybe<Scalars['Bytes']['input']>
  recipientRegistryAddress_contains: InputMaybe<Scalars['Bytes']['input']>
  recipientRegistryAddress_gt: InputMaybe<Scalars['Bytes']['input']>
  recipientRegistryAddress_gte: InputMaybe<Scalars['Bytes']['input']>
  recipientRegistryAddress_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  recipientRegistryAddress_lt: InputMaybe<Scalars['Bytes']['input']>
  recipientRegistryAddress_lte: InputMaybe<Scalars['Bytes']['input']>
  recipientRegistryAddress_not: InputMaybe<Scalars['Bytes']['input']>
  recipientRegistryAddress_not_contains: InputMaybe<Scalars['Bytes']['input']>
  recipientRegistryAddress_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  recipientRegistry_: InputMaybe<RecipientRegistry_Filter>
  recipientRegistry_contains: InputMaybe<Scalars['String']['input']>
  recipientRegistry_contains_nocase: InputMaybe<Scalars['String']['input']>
  recipientRegistry_ends_with: InputMaybe<Scalars['String']['input']>
  recipientRegistry_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  recipientRegistry_gt: InputMaybe<Scalars['String']['input']>
  recipientRegistry_gte: InputMaybe<Scalars['String']['input']>
  recipientRegistry_in: InputMaybe<Array<Scalars['String']['input']>>
  recipientRegistry_lt: InputMaybe<Scalars['String']['input']>
  recipientRegistry_lte: InputMaybe<Scalars['String']['input']>
  recipientRegistry_not: InputMaybe<Scalars['String']['input']>
  recipientRegistry_not_contains: InputMaybe<Scalars['String']['input']>
  recipientRegistry_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  recipientRegistry_not_ends_with: InputMaybe<Scalars['String']['input']>
  recipientRegistry_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  recipientRegistry_not_in: InputMaybe<Array<Scalars['String']['input']>>
  recipientRegistry_not_starts_with: InputMaybe<Scalars['String']['input']>
  recipientRegistry_not_starts_with_nocase: InputMaybe<
    Scalars['String']['input']
  >
  recipientRegistry_starts_with: InputMaybe<Scalars['String']['input']>
  recipientRegistry_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  recipients_: InputMaybe<Recipient_Filter>
  signUpDeadline: InputMaybe<Scalars['BigInt']['input']>
  signUpDeadline_gt: InputMaybe<Scalars['BigInt']['input']>
  signUpDeadline_gte: InputMaybe<Scalars['BigInt']['input']>
  signUpDeadline_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  signUpDeadline_lt: InputMaybe<Scalars['BigInt']['input']>
  signUpDeadline_lte: InputMaybe<Scalars['BigInt']['input']>
  signUpDeadline_not: InputMaybe<Scalars['BigInt']['input']>
  signUpDeadline_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  startTime: InputMaybe<Scalars['BigInt']['input']>
  startTime_gt: InputMaybe<Scalars['BigInt']['input']>
  startTime_gte: InputMaybe<Scalars['BigInt']['input']>
  startTime_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  startTime_lt: InputMaybe<Scalars['BigInt']['input']>
  startTime_lte: InputMaybe<Scalars['BigInt']['input']>
  startTime_not: InputMaybe<Scalars['BigInt']['input']>
  startTime_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  stateTreeDepth: InputMaybe<Scalars['Int']['input']>
  stateTreeDepth_gt: InputMaybe<Scalars['Int']['input']>
  stateTreeDepth_gte: InputMaybe<Scalars['Int']['input']>
  stateTreeDepth_in: InputMaybe<Array<Scalars['Int']['input']>>
  stateTreeDepth_lt: InputMaybe<Scalars['Int']['input']>
  stateTreeDepth_lte: InputMaybe<Scalars['Int']['input']>
  stateTreeDepth_not: InputMaybe<Scalars['Int']['input']>
  stateTreeDepth_not_in: InputMaybe<Array<Scalars['Int']['input']>>
  tallyHash: InputMaybe<Scalars['String']['input']>
  tallyHash_contains: InputMaybe<Scalars['String']['input']>
  tallyHash_contains_nocase: InputMaybe<Scalars['String']['input']>
  tallyHash_ends_with: InputMaybe<Scalars['String']['input']>
  tallyHash_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  tallyHash_gt: InputMaybe<Scalars['String']['input']>
  tallyHash_gte: InputMaybe<Scalars['String']['input']>
  tallyHash_in: InputMaybe<Array<Scalars['String']['input']>>
  tallyHash_lt: InputMaybe<Scalars['String']['input']>
  tallyHash_lte: InputMaybe<Scalars['String']['input']>
  tallyHash_not: InputMaybe<Scalars['String']['input']>
  tallyHash_not_contains: InputMaybe<Scalars['String']['input']>
  tallyHash_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  tallyHash_not_ends_with: InputMaybe<Scalars['String']['input']>
  tallyHash_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  tallyHash_not_in: InputMaybe<Array<Scalars['String']['input']>>
  tallyHash_not_starts_with: InputMaybe<Scalars['String']['input']>
  tallyHash_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  tallyHash_starts_with: InputMaybe<Scalars['String']['input']>
  tallyHash_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  totalSpent: InputMaybe<Scalars['BigInt']['input']>
  totalSpent_gt: InputMaybe<Scalars['BigInt']['input']>
  totalSpent_gte: InputMaybe<Scalars['BigInt']['input']>
  totalSpent_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  totalSpent_lt: InputMaybe<Scalars['BigInt']['input']>
  totalSpent_lte: InputMaybe<Scalars['BigInt']['input']>
  totalSpent_not: InputMaybe<Scalars['BigInt']['input']>
  totalSpent_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  totalVotes: InputMaybe<Scalars['BigInt']['input']>
  totalVotes_gt: InputMaybe<Scalars['BigInt']['input']>
  totalVotes_gte: InputMaybe<Scalars['BigInt']['input']>
  totalVotes_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  totalVotes_lt: InputMaybe<Scalars['BigInt']['input']>
  totalVotes_lte: InputMaybe<Scalars['BigInt']['input']>
  totalVotes_not: InputMaybe<Scalars['BigInt']['input']>
  totalVotes_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  voiceCreditFactor: InputMaybe<Scalars['BigInt']['input']>
  voiceCreditFactor_gt: InputMaybe<Scalars['BigInt']['input']>
  voiceCreditFactor_gte: InputMaybe<Scalars['BigInt']['input']>
  voiceCreditFactor_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  voiceCreditFactor_lt: InputMaybe<Scalars['BigInt']['input']>
  voiceCreditFactor_lte: InputMaybe<Scalars['BigInt']['input']>
  voiceCreditFactor_not: InputMaybe<Scalars['BigInt']['input']>
  voiceCreditFactor_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  voteOptionTreeDepth: InputMaybe<Scalars['Int']['input']>
  voteOptionTreeDepth_gt: InputMaybe<Scalars['Int']['input']>
  voteOptionTreeDepth_gte: InputMaybe<Scalars['Int']['input']>
  voteOptionTreeDepth_in: InputMaybe<Array<Scalars['Int']['input']>>
  voteOptionTreeDepth_lt: InputMaybe<Scalars['Int']['input']>
  voteOptionTreeDepth_lte: InputMaybe<Scalars['Int']['input']>
  voteOptionTreeDepth_not: InputMaybe<Scalars['Int']['input']>
  voteOptionTreeDepth_not_in: InputMaybe<Array<Scalars['Int']['input']>>
  votingDeadline: InputMaybe<Scalars['BigInt']['input']>
  votingDeadline_gt: InputMaybe<Scalars['BigInt']['input']>
  votingDeadline_gte: InputMaybe<Scalars['BigInt']['input']>
  votingDeadline_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  votingDeadline_lt: InputMaybe<Scalars['BigInt']['input']>
  votingDeadline_lte: InputMaybe<Scalars['BigInt']['input']>
  votingDeadline_not: InputMaybe<Scalars['BigInt']['input']>
  votingDeadline_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>
}

export enum FundingRound_OrderBy {
  ClrFund = 'clrFund',
  ClrFundContributorRegistryAddress = 'clrFund__contributorRegistryAddress',
  ClrFundCoordinator = 'clrFund__coordinator',
  ClrFundCoordinatorPubKey = 'clrFund__coordinatorPubKey',
  ClrFundCreatedAt = 'clrFund__createdAt',
  ClrFundId = 'clrFund__id',
  ClrFundLastUpdatedAt = 'clrFund__lastUpdatedAt',
  ClrFundMaciFactory = 'clrFund__maciFactory',
  ClrFundMessageTreeDepth = 'clrFund__messageTreeDepth',
  ClrFundNativeToken = 'clrFund__nativeToken',
  ClrFundOwner = 'clrFund__owner',
  ClrFundRecipientRegistryAddress = 'clrFund__recipientRegistryAddress',
  ClrFundStateTreeDepth = 'clrFund__stateTreeDepth',
  ClrFundVoteOptionTreeDepth = 'clrFund__voteOptionTreeDepth',
  Contributions = 'contributions',
  ContributorCount = 'contributorCount',
  ContributorRegistry = 'contributorRegistry',
  ContributorRegistryAddress = 'contributorRegistryAddress',
  ContributorRegistryContext = 'contributorRegistry__context',
  ContributorRegistryCreatedAt = 'contributorRegistry__createdAt',
  ContributorRegistryId = 'contributorRegistry__id',
  ContributorRegistryLastUpdatedAt = 'contributorRegistry__lastUpdatedAt',
  ContributorRegistryOwner = 'contributorRegistry__owner',
  Contributors = 'contributors',
  Coordinator = 'coordinator',
  CoordinatorPubKeyX = 'coordinatorPubKeyX',
  CoordinatorPubKeyY = 'coordinatorPubKeyY',
  CreatedAt = 'createdAt',
  Id = 'id',
  IsCancelled = 'isCancelled',
  IsFinalized = 'isFinalized',
  LastUpdatedAt = 'lastUpdatedAt',
  Maci = 'maci',
  MaciTxHash = 'maciTxHash',
  MatchingPoolSize = 'matchingPoolSize',
  MaxMessages = 'maxMessages',
  MaxVoteOptions = 'maxVoteOptions',
  MessageTreeDepth = 'messageTreeDepth',
  Messages = 'messages',
  NativeToken = 'nativeToken',
  NativeTokenInfo = 'nativeTokenInfo',
  NativeTokenInfoCreatedAt = 'nativeTokenInfo__createdAt',
  NativeTokenInfoDecimals = 'nativeTokenInfo__decimals',
  NativeTokenInfoId = 'nativeTokenInfo__id',
  NativeTokenInfoLastUpdatedAt = 'nativeTokenInfo__lastUpdatedAt',
  NativeTokenInfoSymbol = 'nativeTokenInfo__symbol',
  NativeTokenInfoTokenAddress = 'nativeTokenInfo__tokenAddress',
  PollAddress = 'pollAddress',
  PollId = 'pollId',
  RecipientCount = 'recipientCount',
  RecipientRegistry = 'recipientRegistry',
  RecipientRegistryAddress = 'recipientRegistryAddress',
  RecipientRegistryBaseDeposit = 'recipientRegistry__baseDeposit',
  RecipientRegistryChallengePeriodDuration = 'recipientRegistry__challengePeriodDuration',
  RecipientRegistryController = 'recipientRegistry__controller',
  RecipientRegistryCreatedAt = 'recipientRegistry__createdAt',
  RecipientRegistryId = 'recipientRegistry__id',
  RecipientRegistryLastUpdatedAt = 'recipientRegistry__lastUpdatedAt',
  RecipientRegistryMaxRecipients = 'recipientRegistry__maxRecipients',
  RecipientRegistryOwner = 'recipientRegistry__owner',
  Recipients = 'recipients',
  SignUpDeadline = 'signUpDeadline',
  StartTime = 'startTime',
  StateTreeDepth = 'stateTreeDepth',
  TallyHash = 'tallyHash',
  TotalSpent = 'totalSpent',
  TotalVotes = 'totalVotes',
  VoiceCreditFactor = 'voiceCreditFactor',
  VoteOptionTreeDepth = 'voteOptionTreeDepth',
  VotingDeadline = 'votingDeadline',
}

export type Message = {
  __typename?: 'Message'
  blockNumber: Scalars['BigInt']['output']
  data: Maybe<Array<Scalars['BigInt']['output']>>
  fundingRound: Maybe<FundingRound>
  id: Scalars['ID']['output']
  msgType: Scalars['BigInt']['output']
  poll: Maybe<Poll>
  publicKey: Maybe<PublicKey>
  submittedBy: Maybe<Scalars['Bytes']['output']>
  timestamp: Maybe<Scalars['String']['output']>
  transactionIndex: Scalars['BigInt']['output']
}

export type Message_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>
  and: InputMaybe<Array<InputMaybe<Message_Filter>>>
  blockNumber: InputMaybe<Scalars['BigInt']['input']>
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  data: InputMaybe<Array<Scalars['BigInt']['input']>>
  data_contains: InputMaybe<Array<Scalars['BigInt']['input']>>
  data_contains_nocase: InputMaybe<Array<Scalars['BigInt']['input']>>
  data_not: InputMaybe<Array<Scalars['BigInt']['input']>>
  data_not_contains: InputMaybe<Array<Scalars['BigInt']['input']>>
  data_not_contains_nocase: InputMaybe<Array<Scalars['BigInt']['input']>>
  fundingRound: InputMaybe<Scalars['String']['input']>
  fundingRound_: InputMaybe<FundingRound_Filter>
  fundingRound_contains: InputMaybe<Scalars['String']['input']>
  fundingRound_contains_nocase: InputMaybe<Scalars['String']['input']>
  fundingRound_ends_with: InputMaybe<Scalars['String']['input']>
  fundingRound_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  fundingRound_gt: InputMaybe<Scalars['String']['input']>
  fundingRound_gte: InputMaybe<Scalars['String']['input']>
  fundingRound_in: InputMaybe<Array<Scalars['String']['input']>>
  fundingRound_lt: InputMaybe<Scalars['String']['input']>
  fundingRound_lte: InputMaybe<Scalars['String']['input']>
  fundingRound_not: InputMaybe<Scalars['String']['input']>
  fundingRound_not_contains: InputMaybe<Scalars['String']['input']>
  fundingRound_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  fundingRound_not_ends_with: InputMaybe<Scalars['String']['input']>
  fundingRound_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  fundingRound_not_in: InputMaybe<Array<Scalars['String']['input']>>
  fundingRound_not_starts_with: InputMaybe<Scalars['String']['input']>
  fundingRound_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  fundingRound_starts_with: InputMaybe<Scalars['String']['input']>
  fundingRound_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  id: InputMaybe<Scalars['ID']['input']>
  id_gt: InputMaybe<Scalars['ID']['input']>
  id_gte: InputMaybe<Scalars['ID']['input']>
  id_in: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt: InputMaybe<Scalars['ID']['input']>
  id_lte: InputMaybe<Scalars['ID']['input']>
  id_not: InputMaybe<Scalars['ID']['input']>
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>
  msgType: InputMaybe<Scalars['BigInt']['input']>
  msgType_gt: InputMaybe<Scalars['BigInt']['input']>
  msgType_gte: InputMaybe<Scalars['BigInt']['input']>
  msgType_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  msgType_lt: InputMaybe<Scalars['BigInt']['input']>
  msgType_lte: InputMaybe<Scalars['BigInt']['input']>
  msgType_not: InputMaybe<Scalars['BigInt']['input']>
  msgType_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  or: InputMaybe<Array<InputMaybe<Message_Filter>>>
  poll: InputMaybe<Scalars['String']['input']>
  poll_: InputMaybe<Poll_Filter>
  poll_contains: InputMaybe<Scalars['String']['input']>
  poll_contains_nocase: InputMaybe<Scalars['String']['input']>
  poll_ends_with: InputMaybe<Scalars['String']['input']>
  poll_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  poll_gt: InputMaybe<Scalars['String']['input']>
  poll_gte: InputMaybe<Scalars['String']['input']>
  poll_in: InputMaybe<Array<Scalars['String']['input']>>
  poll_lt: InputMaybe<Scalars['String']['input']>
  poll_lte: InputMaybe<Scalars['String']['input']>
  poll_not: InputMaybe<Scalars['String']['input']>
  poll_not_contains: InputMaybe<Scalars['String']['input']>
  poll_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  poll_not_ends_with: InputMaybe<Scalars['String']['input']>
  poll_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  poll_not_in: InputMaybe<Array<Scalars['String']['input']>>
  poll_not_starts_with: InputMaybe<Scalars['String']['input']>
  poll_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  poll_starts_with: InputMaybe<Scalars['String']['input']>
  poll_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  publicKey: InputMaybe<Scalars['String']['input']>
  publicKey_: InputMaybe<PublicKey_Filter>
  publicKey_contains: InputMaybe<Scalars['String']['input']>
  publicKey_contains_nocase: InputMaybe<Scalars['String']['input']>
  publicKey_ends_with: InputMaybe<Scalars['String']['input']>
  publicKey_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  publicKey_gt: InputMaybe<Scalars['String']['input']>
  publicKey_gte: InputMaybe<Scalars['String']['input']>
  publicKey_in: InputMaybe<Array<Scalars['String']['input']>>
  publicKey_lt: InputMaybe<Scalars['String']['input']>
  publicKey_lte: InputMaybe<Scalars['String']['input']>
  publicKey_not: InputMaybe<Scalars['String']['input']>
  publicKey_not_contains: InputMaybe<Scalars['String']['input']>
  publicKey_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  publicKey_not_ends_with: InputMaybe<Scalars['String']['input']>
  publicKey_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  publicKey_not_in: InputMaybe<Array<Scalars['String']['input']>>
  publicKey_not_starts_with: InputMaybe<Scalars['String']['input']>
  publicKey_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  publicKey_starts_with: InputMaybe<Scalars['String']['input']>
  publicKey_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  submittedBy: InputMaybe<Scalars['Bytes']['input']>
  submittedBy_contains: InputMaybe<Scalars['Bytes']['input']>
  submittedBy_gt: InputMaybe<Scalars['Bytes']['input']>
  submittedBy_gte: InputMaybe<Scalars['Bytes']['input']>
  submittedBy_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  submittedBy_lt: InputMaybe<Scalars['Bytes']['input']>
  submittedBy_lte: InputMaybe<Scalars['Bytes']['input']>
  submittedBy_not: InputMaybe<Scalars['Bytes']['input']>
  submittedBy_not_contains: InputMaybe<Scalars['Bytes']['input']>
  submittedBy_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  timestamp: InputMaybe<Scalars['String']['input']>
  timestamp_contains: InputMaybe<Scalars['String']['input']>
  timestamp_contains_nocase: InputMaybe<Scalars['String']['input']>
  timestamp_ends_with: InputMaybe<Scalars['String']['input']>
  timestamp_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  timestamp_gt: InputMaybe<Scalars['String']['input']>
  timestamp_gte: InputMaybe<Scalars['String']['input']>
  timestamp_in: InputMaybe<Array<Scalars['String']['input']>>
  timestamp_lt: InputMaybe<Scalars['String']['input']>
  timestamp_lte: InputMaybe<Scalars['String']['input']>
  timestamp_not: InputMaybe<Scalars['String']['input']>
  timestamp_not_contains: InputMaybe<Scalars['String']['input']>
  timestamp_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  timestamp_not_ends_with: InputMaybe<Scalars['String']['input']>
  timestamp_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  timestamp_not_in: InputMaybe<Array<Scalars['String']['input']>>
  timestamp_not_starts_with: InputMaybe<Scalars['String']['input']>
  timestamp_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  timestamp_starts_with: InputMaybe<Scalars['String']['input']>
  timestamp_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  transactionIndex: InputMaybe<Scalars['BigInt']['input']>
  transactionIndex_gt: InputMaybe<Scalars['BigInt']['input']>
  transactionIndex_gte: InputMaybe<Scalars['BigInt']['input']>
  transactionIndex_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  transactionIndex_lt: InputMaybe<Scalars['BigInt']['input']>
  transactionIndex_lte: InputMaybe<Scalars['BigInt']['input']>
  transactionIndex_not: InputMaybe<Scalars['BigInt']['input']>
  transactionIndex_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>
}

export enum Message_OrderBy {
  BlockNumber = 'blockNumber',
  Data = 'data',
  FundingRound = 'fundingRound',
  FundingRoundContributorCount = 'fundingRound__contributorCount',
  FundingRoundContributorRegistryAddress = 'fundingRound__contributorRegistryAddress',
  FundingRoundCoordinator = 'fundingRound__coordinator',
  FundingRoundCoordinatorPubKeyX = 'fundingRound__coordinatorPubKeyX',
  FundingRoundCoordinatorPubKeyY = 'fundingRound__coordinatorPubKeyY',
  FundingRoundCreatedAt = 'fundingRound__createdAt',
  FundingRoundId = 'fundingRound__id',
  FundingRoundIsCancelled = 'fundingRound__isCancelled',
  FundingRoundIsFinalized = 'fundingRound__isFinalized',
  FundingRoundLastUpdatedAt = 'fundingRound__lastUpdatedAt',
  FundingRoundMaci = 'fundingRound__maci',
  FundingRoundMaciTxHash = 'fundingRound__maciTxHash',
  FundingRoundMatchingPoolSize = 'fundingRound__matchingPoolSize',
  FundingRoundMaxMessages = 'fundingRound__maxMessages',
  FundingRoundMaxVoteOptions = 'fundingRound__maxVoteOptions',
  FundingRoundMessageTreeDepth = 'fundingRound__messageTreeDepth',
  FundingRoundNativeToken = 'fundingRound__nativeToken',
  FundingRoundPollAddress = 'fundingRound__pollAddress',
  FundingRoundPollId = 'fundingRound__pollId',
  FundingRoundRecipientCount = 'fundingRound__recipientCount',
  FundingRoundRecipientRegistryAddress = 'fundingRound__recipientRegistryAddress',
  FundingRoundSignUpDeadline = 'fundingRound__signUpDeadline',
  FundingRoundStartTime = 'fundingRound__startTime',
  FundingRoundStateTreeDepth = 'fundingRound__stateTreeDepth',
  FundingRoundTallyHash = 'fundingRound__tallyHash',
  FundingRoundTotalSpent = 'fundingRound__totalSpent',
  FundingRoundTotalVotes = 'fundingRound__totalVotes',
  FundingRoundVoiceCreditFactor = 'fundingRound__voiceCreditFactor',
  FundingRoundVoteOptionTreeDepth = 'fundingRound__voteOptionTreeDepth',
  FundingRoundVotingDeadline = 'fundingRound__votingDeadline',
  Id = 'id',
  MsgType = 'msgType',
  Poll = 'poll',
  PollId = 'poll__id',
  PublicKey = 'publicKey',
  PublicKeyId = 'publicKey__id',
  PublicKeyMaci = 'publicKey__maci',
  PublicKeyStateIndex = 'publicKey__stateIndex',
  PublicKeyVoiceCreditBalance = 'publicKey__voiceCreditBalance',
  PublicKeyX = 'publicKey__x',
  PublicKeyY = 'publicKey__y',
  SubmittedBy = 'submittedBy',
  Timestamp = 'timestamp',
  TransactionIndex = 'transactionIndex',
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export type Poll = {
  __typename?: 'Poll'
  fundingRound: FundingRound
  id: Scalars['ID']['output']
  messages: Maybe<Array<Message>>
}

export type PollMessagesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<Message_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where: InputMaybe<Message_Filter>
}

export type Poll_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>
  and: InputMaybe<Array<InputMaybe<Poll_Filter>>>
  fundingRound: InputMaybe<Scalars['String']['input']>
  fundingRound_: InputMaybe<FundingRound_Filter>
  fundingRound_contains: InputMaybe<Scalars['String']['input']>
  fundingRound_contains_nocase: InputMaybe<Scalars['String']['input']>
  fundingRound_ends_with: InputMaybe<Scalars['String']['input']>
  fundingRound_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  fundingRound_gt: InputMaybe<Scalars['String']['input']>
  fundingRound_gte: InputMaybe<Scalars['String']['input']>
  fundingRound_in: InputMaybe<Array<Scalars['String']['input']>>
  fundingRound_lt: InputMaybe<Scalars['String']['input']>
  fundingRound_lte: InputMaybe<Scalars['String']['input']>
  fundingRound_not: InputMaybe<Scalars['String']['input']>
  fundingRound_not_contains: InputMaybe<Scalars['String']['input']>
  fundingRound_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  fundingRound_not_ends_with: InputMaybe<Scalars['String']['input']>
  fundingRound_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  fundingRound_not_in: InputMaybe<Array<Scalars['String']['input']>>
  fundingRound_not_starts_with: InputMaybe<Scalars['String']['input']>
  fundingRound_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  fundingRound_starts_with: InputMaybe<Scalars['String']['input']>
  fundingRound_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  id: InputMaybe<Scalars['ID']['input']>
  id_gt: InputMaybe<Scalars['ID']['input']>
  id_gte: InputMaybe<Scalars['ID']['input']>
  id_in: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt: InputMaybe<Scalars['ID']['input']>
  id_lte: InputMaybe<Scalars['ID']['input']>
  id_not: InputMaybe<Scalars['ID']['input']>
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>
  messages_: InputMaybe<Message_Filter>
  or: InputMaybe<Array<InputMaybe<Poll_Filter>>>
}

export enum Poll_OrderBy {
  FundingRound = 'fundingRound',
  FundingRoundContributorCount = 'fundingRound__contributorCount',
  FundingRoundContributorRegistryAddress = 'fundingRound__contributorRegistryAddress',
  FundingRoundCoordinator = 'fundingRound__coordinator',
  FundingRoundCoordinatorPubKeyX = 'fundingRound__coordinatorPubKeyX',
  FundingRoundCoordinatorPubKeyY = 'fundingRound__coordinatorPubKeyY',
  FundingRoundCreatedAt = 'fundingRound__createdAt',
  FundingRoundId = 'fundingRound__id',
  FundingRoundIsCancelled = 'fundingRound__isCancelled',
  FundingRoundIsFinalized = 'fundingRound__isFinalized',
  FundingRoundLastUpdatedAt = 'fundingRound__lastUpdatedAt',
  FundingRoundMaci = 'fundingRound__maci',
  FundingRoundMaciTxHash = 'fundingRound__maciTxHash',
  FundingRoundMatchingPoolSize = 'fundingRound__matchingPoolSize',
  FundingRoundMaxMessages = 'fundingRound__maxMessages',
  FundingRoundMaxVoteOptions = 'fundingRound__maxVoteOptions',
  FundingRoundMessageTreeDepth = 'fundingRound__messageTreeDepth',
  FundingRoundNativeToken = 'fundingRound__nativeToken',
  FundingRoundPollAddress = 'fundingRound__pollAddress',
  FundingRoundPollId = 'fundingRound__pollId',
  FundingRoundRecipientCount = 'fundingRound__recipientCount',
  FundingRoundRecipientRegistryAddress = 'fundingRound__recipientRegistryAddress',
  FundingRoundSignUpDeadline = 'fundingRound__signUpDeadline',
  FundingRoundStartTime = 'fundingRound__startTime',
  FundingRoundStateTreeDepth = 'fundingRound__stateTreeDepth',
  FundingRoundTallyHash = 'fundingRound__tallyHash',
  FundingRoundTotalSpent = 'fundingRound__totalSpent',
  FundingRoundTotalVotes = 'fundingRound__totalVotes',
  FundingRoundVoiceCreditFactor = 'fundingRound__voiceCreditFactor',
  FundingRoundVoteOptionTreeDepth = 'fundingRound__voteOptionTreeDepth',
  FundingRoundVotingDeadline = 'fundingRound__votingDeadline',
  Id = 'id',
  Messages = 'messages',
}

export type PublicKey = {
  __typename?: 'PublicKey'
  id: Scalars['ID']['output']
  maci: Scalars['String']['output']
  messages: Maybe<Array<Message>>
  stateIndex: Maybe<Scalars['BigInt']['output']>
  voiceCreditBalance: Maybe<Scalars['BigInt']['output']>
  x: Scalars['BigInt']['output']
  y: Scalars['BigInt']['output']
}

export type PublicKeyMessagesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<Message_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where: InputMaybe<Message_Filter>
}

export type PublicKey_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>
  and: InputMaybe<Array<InputMaybe<PublicKey_Filter>>>
  id: InputMaybe<Scalars['ID']['input']>
  id_gt: InputMaybe<Scalars['ID']['input']>
  id_gte: InputMaybe<Scalars['ID']['input']>
  id_in: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt: InputMaybe<Scalars['ID']['input']>
  id_lte: InputMaybe<Scalars['ID']['input']>
  id_not: InputMaybe<Scalars['ID']['input']>
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>
  maci: InputMaybe<Scalars['String']['input']>
  maci_contains: InputMaybe<Scalars['String']['input']>
  maci_contains_nocase: InputMaybe<Scalars['String']['input']>
  maci_ends_with: InputMaybe<Scalars['String']['input']>
  maci_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  maci_gt: InputMaybe<Scalars['String']['input']>
  maci_gte: InputMaybe<Scalars['String']['input']>
  maci_in: InputMaybe<Array<Scalars['String']['input']>>
  maci_lt: InputMaybe<Scalars['String']['input']>
  maci_lte: InputMaybe<Scalars['String']['input']>
  maci_not: InputMaybe<Scalars['String']['input']>
  maci_not_contains: InputMaybe<Scalars['String']['input']>
  maci_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  maci_not_ends_with: InputMaybe<Scalars['String']['input']>
  maci_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  maci_not_in: InputMaybe<Array<Scalars['String']['input']>>
  maci_not_starts_with: InputMaybe<Scalars['String']['input']>
  maci_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  maci_starts_with: InputMaybe<Scalars['String']['input']>
  maci_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  messages_: InputMaybe<Message_Filter>
  or: InputMaybe<Array<InputMaybe<PublicKey_Filter>>>
  stateIndex: InputMaybe<Scalars['BigInt']['input']>
  stateIndex_gt: InputMaybe<Scalars['BigInt']['input']>
  stateIndex_gte: InputMaybe<Scalars['BigInt']['input']>
  stateIndex_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  stateIndex_lt: InputMaybe<Scalars['BigInt']['input']>
  stateIndex_lte: InputMaybe<Scalars['BigInt']['input']>
  stateIndex_not: InputMaybe<Scalars['BigInt']['input']>
  stateIndex_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  voiceCreditBalance: InputMaybe<Scalars['BigInt']['input']>
  voiceCreditBalance_gt: InputMaybe<Scalars['BigInt']['input']>
  voiceCreditBalance_gte: InputMaybe<Scalars['BigInt']['input']>
  voiceCreditBalance_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  voiceCreditBalance_lt: InputMaybe<Scalars['BigInt']['input']>
  voiceCreditBalance_lte: InputMaybe<Scalars['BigInt']['input']>
  voiceCreditBalance_not: InputMaybe<Scalars['BigInt']['input']>
  voiceCreditBalance_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  x: InputMaybe<Scalars['BigInt']['input']>
  x_gt: InputMaybe<Scalars['BigInt']['input']>
  x_gte: InputMaybe<Scalars['BigInt']['input']>
  x_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  x_lt: InputMaybe<Scalars['BigInt']['input']>
  x_lte: InputMaybe<Scalars['BigInt']['input']>
  x_not: InputMaybe<Scalars['BigInt']['input']>
  x_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  y: InputMaybe<Scalars['BigInt']['input']>
  y_gt: InputMaybe<Scalars['BigInt']['input']>
  y_gte: InputMaybe<Scalars['BigInt']['input']>
  y_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  y_lt: InputMaybe<Scalars['BigInt']['input']>
  y_lte: InputMaybe<Scalars['BigInt']['input']>
  y_not: InputMaybe<Scalars['BigInt']['input']>
  y_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>
}

export enum PublicKey_OrderBy {
  Id = 'id',
  Maci = 'maci',
  Messages = 'messages',
  StateIndex = 'stateIndex',
  VoiceCreditBalance = 'voiceCreditBalance',
  X = 'x',
  Y = 'y',
}

export type Query = {
  __typename?: 'Query'
  /** Access to subgraph metadata */
  _meta: Maybe<_Meta_>
  clrFund: Maybe<ClrFund>
  clrFundDeployer: Maybe<ClrFundDeployer>
  clrFundDeployers: Array<ClrFundDeployer>
  clrFunds: Array<ClrFund>
  contribution: Maybe<Contribution>
  contributions: Array<Contribution>
  contributor: Maybe<Contributor>
  contributorRegistries: Array<ContributorRegistry>
  contributorRegistry: Maybe<ContributorRegistry>
  contributors: Array<Contributor>
  coordinator: Maybe<Coordinator>
  coordinators: Array<Coordinator>
  donation: Maybe<Donation>
  donations: Array<Donation>
  fundingRound: Maybe<FundingRound>
  fundingRounds: Array<FundingRound>
  message: Maybe<Message>
  messages: Array<Message>
  poll: Maybe<Poll>
  polls: Array<Poll>
  publicKey: Maybe<PublicKey>
  publicKeys: Array<PublicKey>
  recipient: Maybe<Recipient>
  recipientRegistries: Array<RecipientRegistry>
  recipientRegistry: Maybe<RecipientRegistry>
  recipients: Array<Recipient>
  token: Maybe<Token>
  tokens: Array<Token>
}

export type Query_MetaArgs = {
  block: InputMaybe<Block_Height>
}

export type QueryClrFundArgs = {
  block: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryClrFundDeployerArgs = {
  block: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryClrFundDeployersArgs = {
  block: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<ClrFundDeployer_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where: InputMaybe<ClrFundDeployer_Filter>
}

export type QueryClrFundsArgs = {
  block: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<ClrFund_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where: InputMaybe<ClrFund_Filter>
}

export type QueryContributionArgs = {
  block: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryContributionsArgs = {
  block: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<Contribution_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where: InputMaybe<Contribution_Filter>
}

export type QueryContributorArgs = {
  block: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryContributorRegistriesArgs = {
  block: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<ContributorRegistry_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where: InputMaybe<ContributorRegistry_Filter>
}

export type QueryContributorRegistryArgs = {
  block: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryContributorsArgs = {
  block: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<Contributor_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where: InputMaybe<Contributor_Filter>
}

export type QueryCoordinatorArgs = {
  block: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryCoordinatorsArgs = {
  block: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<Coordinator_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where: InputMaybe<Coordinator_Filter>
}

export type QueryDonationArgs = {
  block: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryDonationsArgs = {
  block: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<Donation_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where: InputMaybe<Donation_Filter>
}

export type QueryFundingRoundArgs = {
  block: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryFundingRoundsArgs = {
  block: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<FundingRound_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where: InputMaybe<FundingRound_Filter>
}

export type QueryMessageArgs = {
  block: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryMessagesArgs = {
  block: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<Message_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where: InputMaybe<Message_Filter>
}

export type QueryPollArgs = {
  block: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryPollsArgs = {
  block: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<Poll_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where: InputMaybe<Poll_Filter>
}

export type QueryPublicKeyArgs = {
  block: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryPublicKeysArgs = {
  block: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<PublicKey_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where: InputMaybe<PublicKey_Filter>
}

export type QueryRecipientArgs = {
  block: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryRecipientRegistriesArgs = {
  block: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<RecipientRegistry_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where: InputMaybe<RecipientRegistry_Filter>
}

export type QueryRecipientRegistryArgs = {
  block: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryRecipientsArgs = {
  block: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<Recipient_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where: InputMaybe<Recipient_Filter>
}

export type QueryTokenArgs = {
  block: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryTokensArgs = {
  block: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<Token_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where: InputMaybe<Token_Filter>
}

export type Recipient = {
  __typename?: 'Recipient'
  createdAt: Maybe<Scalars['String']['output']>
  deposit: Maybe<Scalars['BigInt']['output']>
  fundingRounds: Maybe<Array<FundingRound>>
  id: Scalars['ID']['output']
  lastUpdatedAt: Maybe<Scalars['String']['output']>
  recipientAddress: Maybe<Scalars['Bytes']['output']>
  recipientIndex: Maybe<Scalars['BigInt']['output']>
  recipientMetadata: Maybe<Scalars['String']['output']>
  recipientRegistry: Maybe<RecipientRegistry>
  rejected: Maybe<Scalars['Boolean']['output']>
  requestResolvedHash: Maybe<Scalars['Bytes']['output']>
  requestSubmittedHash: Maybe<Scalars['Bytes']['output']>
  requestType: Maybe<Scalars['String']['output']>
  requester: Maybe<Scalars['String']['output']>
  submissionTime: Maybe<Scalars['String']['output']>
  verified: Maybe<Scalars['Boolean']['output']>
  voteOptionIndex: Maybe<Scalars['BigInt']['output']>
}

export type RecipientFundingRoundsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<FundingRound_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where: InputMaybe<FundingRound_Filter>
}

export type RecipientRegistry = {
  __typename?: 'RecipientRegistry'
  baseDeposit: Maybe<Scalars['BigInt']['output']>
  challengePeriodDuration: Maybe<Scalars['BigInt']['output']>
  clrFund: Maybe<ClrFund>
  controller: Maybe<Scalars['Bytes']['output']>
  createdAt: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  lastUpdatedAt: Maybe<Scalars['String']['output']>
  maxRecipients: Maybe<Scalars['BigInt']['output']>
  owner: Maybe<Scalars['Bytes']['output']>
  recipients: Maybe<Array<Recipient>>
}

export type RecipientRegistryRecipientsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<Recipient_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where: InputMaybe<Recipient_Filter>
}

export type RecipientRegistry_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>
  and: InputMaybe<Array<InputMaybe<RecipientRegistry_Filter>>>
  baseDeposit: InputMaybe<Scalars['BigInt']['input']>
  baseDeposit_gt: InputMaybe<Scalars['BigInt']['input']>
  baseDeposit_gte: InputMaybe<Scalars['BigInt']['input']>
  baseDeposit_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  baseDeposit_lt: InputMaybe<Scalars['BigInt']['input']>
  baseDeposit_lte: InputMaybe<Scalars['BigInt']['input']>
  baseDeposit_not: InputMaybe<Scalars['BigInt']['input']>
  baseDeposit_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  challengePeriodDuration: InputMaybe<Scalars['BigInt']['input']>
  challengePeriodDuration_gt: InputMaybe<Scalars['BigInt']['input']>
  challengePeriodDuration_gte: InputMaybe<Scalars['BigInt']['input']>
  challengePeriodDuration_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  challengePeriodDuration_lt: InputMaybe<Scalars['BigInt']['input']>
  challengePeriodDuration_lte: InputMaybe<Scalars['BigInt']['input']>
  challengePeriodDuration_not: InputMaybe<Scalars['BigInt']['input']>
  challengePeriodDuration_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  clrFund: InputMaybe<Scalars['String']['input']>
  clrFund_: InputMaybe<ClrFund_Filter>
  clrFund_contains: InputMaybe<Scalars['String']['input']>
  clrFund_contains_nocase: InputMaybe<Scalars['String']['input']>
  clrFund_ends_with: InputMaybe<Scalars['String']['input']>
  clrFund_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  clrFund_gt: InputMaybe<Scalars['String']['input']>
  clrFund_gte: InputMaybe<Scalars['String']['input']>
  clrFund_in: InputMaybe<Array<Scalars['String']['input']>>
  clrFund_lt: InputMaybe<Scalars['String']['input']>
  clrFund_lte: InputMaybe<Scalars['String']['input']>
  clrFund_not: InputMaybe<Scalars['String']['input']>
  clrFund_not_contains: InputMaybe<Scalars['String']['input']>
  clrFund_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  clrFund_not_ends_with: InputMaybe<Scalars['String']['input']>
  clrFund_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  clrFund_not_in: InputMaybe<Array<Scalars['String']['input']>>
  clrFund_not_starts_with: InputMaybe<Scalars['String']['input']>
  clrFund_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  clrFund_starts_with: InputMaybe<Scalars['String']['input']>
  clrFund_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  controller: InputMaybe<Scalars['Bytes']['input']>
  controller_contains: InputMaybe<Scalars['Bytes']['input']>
  controller_gt: InputMaybe<Scalars['Bytes']['input']>
  controller_gte: InputMaybe<Scalars['Bytes']['input']>
  controller_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  controller_lt: InputMaybe<Scalars['Bytes']['input']>
  controller_lte: InputMaybe<Scalars['Bytes']['input']>
  controller_not: InputMaybe<Scalars['Bytes']['input']>
  controller_not_contains: InputMaybe<Scalars['Bytes']['input']>
  controller_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  createdAt: InputMaybe<Scalars['String']['input']>
  createdAt_contains: InputMaybe<Scalars['String']['input']>
  createdAt_contains_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_ends_with: InputMaybe<Scalars['String']['input']>
  createdAt_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_gt: InputMaybe<Scalars['String']['input']>
  createdAt_gte: InputMaybe<Scalars['String']['input']>
  createdAt_in: InputMaybe<Array<Scalars['String']['input']>>
  createdAt_lt: InputMaybe<Scalars['String']['input']>
  createdAt_lte: InputMaybe<Scalars['String']['input']>
  createdAt_not: InputMaybe<Scalars['String']['input']>
  createdAt_not_contains: InputMaybe<Scalars['String']['input']>
  createdAt_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_not_ends_with: InputMaybe<Scalars['String']['input']>
  createdAt_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_not_in: InputMaybe<Array<Scalars['String']['input']>>
  createdAt_not_starts_with: InputMaybe<Scalars['String']['input']>
  createdAt_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_starts_with: InputMaybe<Scalars['String']['input']>
  createdAt_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  id: InputMaybe<Scalars['ID']['input']>
  id_gt: InputMaybe<Scalars['ID']['input']>
  id_gte: InputMaybe<Scalars['ID']['input']>
  id_in: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt: InputMaybe<Scalars['ID']['input']>
  id_lte: InputMaybe<Scalars['ID']['input']>
  id_not: InputMaybe<Scalars['ID']['input']>
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>
  lastUpdatedAt: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_contains: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_contains_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_ends_with: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_gt: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_gte: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_in: InputMaybe<Array<Scalars['String']['input']>>
  lastUpdatedAt_lt: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_lte: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_contains: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_ends_with: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_in: InputMaybe<Array<Scalars['String']['input']>>
  lastUpdatedAt_not_starts_with: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_starts_with: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  maxRecipients: InputMaybe<Scalars['BigInt']['input']>
  maxRecipients_gt: InputMaybe<Scalars['BigInt']['input']>
  maxRecipients_gte: InputMaybe<Scalars['BigInt']['input']>
  maxRecipients_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  maxRecipients_lt: InputMaybe<Scalars['BigInt']['input']>
  maxRecipients_lte: InputMaybe<Scalars['BigInt']['input']>
  maxRecipients_not: InputMaybe<Scalars['BigInt']['input']>
  maxRecipients_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  or: InputMaybe<Array<InputMaybe<RecipientRegistry_Filter>>>
  owner: InputMaybe<Scalars['Bytes']['input']>
  owner_contains: InputMaybe<Scalars['Bytes']['input']>
  owner_gt: InputMaybe<Scalars['Bytes']['input']>
  owner_gte: InputMaybe<Scalars['Bytes']['input']>
  owner_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  owner_lt: InputMaybe<Scalars['Bytes']['input']>
  owner_lte: InputMaybe<Scalars['Bytes']['input']>
  owner_not: InputMaybe<Scalars['Bytes']['input']>
  owner_not_contains: InputMaybe<Scalars['Bytes']['input']>
  owner_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  recipients_: InputMaybe<Recipient_Filter>
}

export enum RecipientRegistry_OrderBy {
  BaseDeposit = 'baseDeposit',
  ChallengePeriodDuration = 'challengePeriodDuration',
  ClrFund = 'clrFund',
  ClrFundContributorRegistryAddress = 'clrFund__contributorRegistryAddress',
  ClrFundCoordinator = 'clrFund__coordinator',
  ClrFundCoordinatorPubKey = 'clrFund__coordinatorPubKey',
  ClrFundCreatedAt = 'clrFund__createdAt',
  ClrFundId = 'clrFund__id',
  ClrFundLastUpdatedAt = 'clrFund__lastUpdatedAt',
  ClrFundMaciFactory = 'clrFund__maciFactory',
  ClrFundMessageTreeDepth = 'clrFund__messageTreeDepth',
  ClrFundNativeToken = 'clrFund__nativeToken',
  ClrFundOwner = 'clrFund__owner',
  ClrFundRecipientRegistryAddress = 'clrFund__recipientRegistryAddress',
  ClrFundStateTreeDepth = 'clrFund__stateTreeDepth',
  ClrFundVoteOptionTreeDepth = 'clrFund__voteOptionTreeDepth',
  Controller = 'controller',
  CreatedAt = 'createdAt',
  Id = 'id',
  LastUpdatedAt = 'lastUpdatedAt',
  MaxRecipients = 'maxRecipients',
  Owner = 'owner',
  Recipients = 'recipients',
}

export type Recipient_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>
  and: InputMaybe<Array<InputMaybe<Recipient_Filter>>>
  createdAt: InputMaybe<Scalars['String']['input']>
  createdAt_contains: InputMaybe<Scalars['String']['input']>
  createdAt_contains_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_ends_with: InputMaybe<Scalars['String']['input']>
  createdAt_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_gt: InputMaybe<Scalars['String']['input']>
  createdAt_gte: InputMaybe<Scalars['String']['input']>
  createdAt_in: InputMaybe<Array<Scalars['String']['input']>>
  createdAt_lt: InputMaybe<Scalars['String']['input']>
  createdAt_lte: InputMaybe<Scalars['String']['input']>
  createdAt_not: InputMaybe<Scalars['String']['input']>
  createdAt_not_contains: InputMaybe<Scalars['String']['input']>
  createdAt_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_not_ends_with: InputMaybe<Scalars['String']['input']>
  createdAt_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_not_in: InputMaybe<Array<Scalars['String']['input']>>
  createdAt_not_starts_with: InputMaybe<Scalars['String']['input']>
  createdAt_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_starts_with: InputMaybe<Scalars['String']['input']>
  createdAt_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  deposit: InputMaybe<Scalars['BigInt']['input']>
  deposit_gt: InputMaybe<Scalars['BigInt']['input']>
  deposit_gte: InputMaybe<Scalars['BigInt']['input']>
  deposit_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  deposit_lt: InputMaybe<Scalars['BigInt']['input']>
  deposit_lte: InputMaybe<Scalars['BigInt']['input']>
  deposit_not: InputMaybe<Scalars['BigInt']['input']>
  deposit_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  fundingRounds: InputMaybe<Array<Scalars['String']['input']>>
  fundingRounds_: InputMaybe<FundingRound_Filter>
  fundingRounds_contains: InputMaybe<Array<Scalars['String']['input']>>
  fundingRounds_contains_nocase: InputMaybe<Array<Scalars['String']['input']>>
  fundingRounds_not: InputMaybe<Array<Scalars['String']['input']>>
  fundingRounds_not_contains: InputMaybe<Array<Scalars['String']['input']>>
  fundingRounds_not_contains_nocase: InputMaybe<
    Array<Scalars['String']['input']>
  >
  id: InputMaybe<Scalars['ID']['input']>
  id_gt: InputMaybe<Scalars['ID']['input']>
  id_gte: InputMaybe<Scalars['ID']['input']>
  id_in: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt: InputMaybe<Scalars['ID']['input']>
  id_lte: InputMaybe<Scalars['ID']['input']>
  id_not: InputMaybe<Scalars['ID']['input']>
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>
  lastUpdatedAt: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_contains: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_contains_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_ends_with: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_gt: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_gte: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_in: InputMaybe<Array<Scalars['String']['input']>>
  lastUpdatedAt_lt: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_lte: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_contains: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_ends_with: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_in: InputMaybe<Array<Scalars['String']['input']>>
  lastUpdatedAt_not_starts_with: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_starts_with: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  or: InputMaybe<Array<InputMaybe<Recipient_Filter>>>
  recipientAddress: InputMaybe<Scalars['Bytes']['input']>
  recipientAddress_contains: InputMaybe<Scalars['Bytes']['input']>
  recipientAddress_gt: InputMaybe<Scalars['Bytes']['input']>
  recipientAddress_gte: InputMaybe<Scalars['Bytes']['input']>
  recipientAddress_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  recipientAddress_lt: InputMaybe<Scalars['Bytes']['input']>
  recipientAddress_lte: InputMaybe<Scalars['Bytes']['input']>
  recipientAddress_not: InputMaybe<Scalars['Bytes']['input']>
  recipientAddress_not_contains: InputMaybe<Scalars['Bytes']['input']>
  recipientAddress_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  recipientIndex: InputMaybe<Scalars['BigInt']['input']>
  recipientIndex_gt: InputMaybe<Scalars['BigInt']['input']>
  recipientIndex_gte: InputMaybe<Scalars['BigInt']['input']>
  recipientIndex_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  recipientIndex_lt: InputMaybe<Scalars['BigInt']['input']>
  recipientIndex_lte: InputMaybe<Scalars['BigInt']['input']>
  recipientIndex_not: InputMaybe<Scalars['BigInt']['input']>
  recipientIndex_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  recipientMetadata: InputMaybe<Scalars['String']['input']>
  recipientMetadata_contains: InputMaybe<Scalars['String']['input']>
  recipientMetadata_contains_nocase: InputMaybe<Scalars['String']['input']>
  recipientMetadata_ends_with: InputMaybe<Scalars['String']['input']>
  recipientMetadata_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  recipientMetadata_gt: InputMaybe<Scalars['String']['input']>
  recipientMetadata_gte: InputMaybe<Scalars['String']['input']>
  recipientMetadata_in: InputMaybe<Array<Scalars['String']['input']>>
  recipientMetadata_lt: InputMaybe<Scalars['String']['input']>
  recipientMetadata_lte: InputMaybe<Scalars['String']['input']>
  recipientMetadata_not: InputMaybe<Scalars['String']['input']>
  recipientMetadata_not_contains: InputMaybe<Scalars['String']['input']>
  recipientMetadata_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  recipientMetadata_not_ends_with: InputMaybe<Scalars['String']['input']>
  recipientMetadata_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  recipientMetadata_not_in: InputMaybe<Array<Scalars['String']['input']>>
  recipientMetadata_not_starts_with: InputMaybe<Scalars['String']['input']>
  recipientMetadata_not_starts_with_nocase: InputMaybe<
    Scalars['String']['input']
  >
  recipientMetadata_starts_with: InputMaybe<Scalars['String']['input']>
  recipientMetadata_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  recipientRegistry: InputMaybe<Scalars['String']['input']>
  recipientRegistry_: InputMaybe<RecipientRegistry_Filter>
  recipientRegistry_contains: InputMaybe<Scalars['String']['input']>
  recipientRegistry_contains_nocase: InputMaybe<Scalars['String']['input']>
  recipientRegistry_ends_with: InputMaybe<Scalars['String']['input']>
  recipientRegistry_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  recipientRegistry_gt: InputMaybe<Scalars['String']['input']>
  recipientRegistry_gte: InputMaybe<Scalars['String']['input']>
  recipientRegistry_in: InputMaybe<Array<Scalars['String']['input']>>
  recipientRegistry_lt: InputMaybe<Scalars['String']['input']>
  recipientRegistry_lte: InputMaybe<Scalars['String']['input']>
  recipientRegistry_not: InputMaybe<Scalars['String']['input']>
  recipientRegistry_not_contains: InputMaybe<Scalars['String']['input']>
  recipientRegistry_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  recipientRegistry_not_ends_with: InputMaybe<Scalars['String']['input']>
  recipientRegistry_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  recipientRegistry_not_in: InputMaybe<Array<Scalars['String']['input']>>
  recipientRegistry_not_starts_with: InputMaybe<Scalars['String']['input']>
  recipientRegistry_not_starts_with_nocase: InputMaybe<
    Scalars['String']['input']
  >
  recipientRegistry_starts_with: InputMaybe<Scalars['String']['input']>
  recipientRegistry_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  rejected: InputMaybe<Scalars['Boolean']['input']>
  rejected_in: InputMaybe<Array<Scalars['Boolean']['input']>>
  rejected_not: InputMaybe<Scalars['Boolean']['input']>
  rejected_not_in: InputMaybe<Array<Scalars['Boolean']['input']>>
  requestResolvedHash: InputMaybe<Scalars['Bytes']['input']>
  requestResolvedHash_contains: InputMaybe<Scalars['Bytes']['input']>
  requestResolvedHash_gt: InputMaybe<Scalars['Bytes']['input']>
  requestResolvedHash_gte: InputMaybe<Scalars['Bytes']['input']>
  requestResolvedHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  requestResolvedHash_lt: InputMaybe<Scalars['Bytes']['input']>
  requestResolvedHash_lte: InputMaybe<Scalars['Bytes']['input']>
  requestResolvedHash_not: InputMaybe<Scalars['Bytes']['input']>
  requestResolvedHash_not_contains: InputMaybe<Scalars['Bytes']['input']>
  requestResolvedHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  requestSubmittedHash: InputMaybe<Scalars['Bytes']['input']>
  requestSubmittedHash_contains: InputMaybe<Scalars['Bytes']['input']>
  requestSubmittedHash_gt: InputMaybe<Scalars['Bytes']['input']>
  requestSubmittedHash_gte: InputMaybe<Scalars['Bytes']['input']>
  requestSubmittedHash_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  requestSubmittedHash_lt: InputMaybe<Scalars['Bytes']['input']>
  requestSubmittedHash_lte: InputMaybe<Scalars['Bytes']['input']>
  requestSubmittedHash_not: InputMaybe<Scalars['Bytes']['input']>
  requestSubmittedHash_not_contains: InputMaybe<Scalars['Bytes']['input']>
  requestSubmittedHash_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  requestType: InputMaybe<Scalars['String']['input']>
  requestType_contains: InputMaybe<Scalars['String']['input']>
  requestType_contains_nocase: InputMaybe<Scalars['String']['input']>
  requestType_ends_with: InputMaybe<Scalars['String']['input']>
  requestType_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  requestType_gt: InputMaybe<Scalars['String']['input']>
  requestType_gte: InputMaybe<Scalars['String']['input']>
  requestType_in: InputMaybe<Array<Scalars['String']['input']>>
  requestType_lt: InputMaybe<Scalars['String']['input']>
  requestType_lte: InputMaybe<Scalars['String']['input']>
  requestType_not: InputMaybe<Scalars['String']['input']>
  requestType_not_contains: InputMaybe<Scalars['String']['input']>
  requestType_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  requestType_not_ends_with: InputMaybe<Scalars['String']['input']>
  requestType_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  requestType_not_in: InputMaybe<Array<Scalars['String']['input']>>
  requestType_not_starts_with: InputMaybe<Scalars['String']['input']>
  requestType_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  requestType_starts_with: InputMaybe<Scalars['String']['input']>
  requestType_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  requester: InputMaybe<Scalars['String']['input']>
  requester_contains: InputMaybe<Scalars['String']['input']>
  requester_contains_nocase: InputMaybe<Scalars['String']['input']>
  requester_ends_with: InputMaybe<Scalars['String']['input']>
  requester_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  requester_gt: InputMaybe<Scalars['String']['input']>
  requester_gte: InputMaybe<Scalars['String']['input']>
  requester_in: InputMaybe<Array<Scalars['String']['input']>>
  requester_lt: InputMaybe<Scalars['String']['input']>
  requester_lte: InputMaybe<Scalars['String']['input']>
  requester_not: InputMaybe<Scalars['String']['input']>
  requester_not_contains: InputMaybe<Scalars['String']['input']>
  requester_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  requester_not_ends_with: InputMaybe<Scalars['String']['input']>
  requester_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  requester_not_in: InputMaybe<Array<Scalars['String']['input']>>
  requester_not_starts_with: InputMaybe<Scalars['String']['input']>
  requester_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  requester_starts_with: InputMaybe<Scalars['String']['input']>
  requester_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  submissionTime: InputMaybe<Scalars['String']['input']>
  submissionTime_contains: InputMaybe<Scalars['String']['input']>
  submissionTime_contains_nocase: InputMaybe<Scalars['String']['input']>
  submissionTime_ends_with: InputMaybe<Scalars['String']['input']>
  submissionTime_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  submissionTime_gt: InputMaybe<Scalars['String']['input']>
  submissionTime_gte: InputMaybe<Scalars['String']['input']>
  submissionTime_in: InputMaybe<Array<Scalars['String']['input']>>
  submissionTime_lt: InputMaybe<Scalars['String']['input']>
  submissionTime_lte: InputMaybe<Scalars['String']['input']>
  submissionTime_not: InputMaybe<Scalars['String']['input']>
  submissionTime_not_contains: InputMaybe<Scalars['String']['input']>
  submissionTime_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  submissionTime_not_ends_with: InputMaybe<Scalars['String']['input']>
  submissionTime_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  submissionTime_not_in: InputMaybe<Array<Scalars['String']['input']>>
  submissionTime_not_starts_with: InputMaybe<Scalars['String']['input']>
  submissionTime_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  submissionTime_starts_with: InputMaybe<Scalars['String']['input']>
  submissionTime_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  verified: InputMaybe<Scalars['Boolean']['input']>
  verified_in: InputMaybe<Array<Scalars['Boolean']['input']>>
  verified_not: InputMaybe<Scalars['Boolean']['input']>
  verified_not_in: InputMaybe<Array<Scalars['Boolean']['input']>>
  voteOptionIndex: InputMaybe<Scalars['BigInt']['input']>
  voteOptionIndex_gt: InputMaybe<Scalars['BigInt']['input']>
  voteOptionIndex_gte: InputMaybe<Scalars['BigInt']['input']>
  voteOptionIndex_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  voteOptionIndex_lt: InputMaybe<Scalars['BigInt']['input']>
  voteOptionIndex_lte: InputMaybe<Scalars['BigInt']['input']>
  voteOptionIndex_not: InputMaybe<Scalars['BigInt']['input']>
  voteOptionIndex_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>
}

export enum Recipient_OrderBy {
  CreatedAt = 'createdAt',
  Deposit = 'deposit',
  FundingRounds = 'fundingRounds',
  Id = 'id',
  LastUpdatedAt = 'lastUpdatedAt',
  RecipientAddress = 'recipientAddress',
  RecipientIndex = 'recipientIndex',
  RecipientMetadata = 'recipientMetadata',
  RecipientRegistry = 'recipientRegistry',
  RecipientRegistryBaseDeposit = 'recipientRegistry__baseDeposit',
  RecipientRegistryChallengePeriodDuration = 'recipientRegistry__challengePeriodDuration',
  RecipientRegistryController = 'recipientRegistry__controller',
  RecipientRegistryCreatedAt = 'recipientRegistry__createdAt',
  RecipientRegistryId = 'recipientRegistry__id',
  RecipientRegistryLastUpdatedAt = 'recipientRegistry__lastUpdatedAt',
  RecipientRegistryMaxRecipients = 'recipientRegistry__maxRecipients',
  RecipientRegistryOwner = 'recipientRegistry__owner',
  Rejected = 'rejected',
  RequestResolvedHash = 'requestResolvedHash',
  RequestSubmittedHash = 'requestSubmittedHash',
  RequestType = 'requestType',
  Requester = 'requester',
  SubmissionTime = 'submissionTime',
  Verified = 'verified',
  VoteOptionIndex = 'voteOptionIndex',
}

export type Subscription = {
  __typename?: 'Subscription'
  /** Access to subgraph metadata */
  _meta: Maybe<_Meta_>
  clrFund: Maybe<ClrFund>
  clrFundDeployer: Maybe<ClrFundDeployer>
  clrFundDeployers: Array<ClrFundDeployer>
  clrFunds: Array<ClrFund>
  contribution: Maybe<Contribution>
  contributions: Array<Contribution>
  contributor: Maybe<Contributor>
  contributorRegistries: Array<ContributorRegistry>
  contributorRegistry: Maybe<ContributorRegistry>
  contributors: Array<Contributor>
  coordinator: Maybe<Coordinator>
  coordinators: Array<Coordinator>
  donation: Maybe<Donation>
  donations: Array<Donation>
  fundingRound: Maybe<FundingRound>
  fundingRounds: Array<FundingRound>
  message: Maybe<Message>
  messages: Array<Message>
  poll: Maybe<Poll>
  polls: Array<Poll>
  publicKey: Maybe<PublicKey>
  publicKeys: Array<PublicKey>
  recipient: Maybe<Recipient>
  recipientRegistries: Array<RecipientRegistry>
  recipientRegistry: Maybe<RecipientRegistry>
  recipients: Array<Recipient>
  token: Maybe<Token>
  tokens: Array<Token>
}

export type Subscription_MetaArgs = {
  block: InputMaybe<Block_Height>
}

export type SubscriptionClrFundArgs = {
  block: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionClrFundDeployerArgs = {
  block: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionClrFundDeployersArgs = {
  block: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<ClrFundDeployer_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where: InputMaybe<ClrFundDeployer_Filter>
}

export type SubscriptionClrFundsArgs = {
  block: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<ClrFund_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where: InputMaybe<ClrFund_Filter>
}

export type SubscriptionContributionArgs = {
  block: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionContributionsArgs = {
  block: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<Contribution_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where: InputMaybe<Contribution_Filter>
}

export type SubscriptionContributorArgs = {
  block: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionContributorRegistriesArgs = {
  block: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<ContributorRegistry_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where: InputMaybe<ContributorRegistry_Filter>
}

export type SubscriptionContributorRegistryArgs = {
  block: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionContributorsArgs = {
  block: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<Contributor_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where: InputMaybe<Contributor_Filter>
}

export type SubscriptionCoordinatorArgs = {
  block: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionCoordinatorsArgs = {
  block: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<Coordinator_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where: InputMaybe<Coordinator_Filter>
}

export type SubscriptionDonationArgs = {
  block: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionDonationsArgs = {
  block: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<Donation_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where: InputMaybe<Donation_Filter>
}

export type SubscriptionFundingRoundArgs = {
  block: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionFundingRoundsArgs = {
  block: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<FundingRound_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where: InputMaybe<FundingRound_Filter>
}

export type SubscriptionMessageArgs = {
  block: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionMessagesArgs = {
  block: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<Message_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where: InputMaybe<Message_Filter>
}

export type SubscriptionPollArgs = {
  block: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionPollsArgs = {
  block: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<Poll_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where: InputMaybe<Poll_Filter>
}

export type SubscriptionPublicKeyArgs = {
  block: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionPublicKeysArgs = {
  block: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<PublicKey_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where: InputMaybe<PublicKey_Filter>
}

export type SubscriptionRecipientArgs = {
  block: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionRecipientRegistriesArgs = {
  block: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<RecipientRegistry_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where: InputMaybe<RecipientRegistry_Filter>
}

export type SubscriptionRecipientRegistryArgs = {
  block: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionRecipientsArgs = {
  block: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<Recipient_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where: InputMaybe<Recipient_Filter>
}

export type SubscriptionTokenArgs = {
  block: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionTokensArgs = {
  block: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy: InputMaybe<Token_OrderBy>
  orderDirection: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where: InputMaybe<Token_Filter>
}

export type Token = {
  __typename?: 'Token'
  createdAt: Maybe<Scalars['String']['output']>
  decimals: Maybe<Scalars['BigInt']['output']>
  id: Scalars['ID']['output']
  lastUpdatedAt: Maybe<Scalars['String']['output']>
  symbol: Maybe<Scalars['String']['output']>
  tokenAddress: Maybe<Scalars['Bytes']['output']>
}

export type Token_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>
  and: InputMaybe<Array<InputMaybe<Token_Filter>>>
  createdAt: InputMaybe<Scalars['String']['input']>
  createdAt_contains: InputMaybe<Scalars['String']['input']>
  createdAt_contains_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_ends_with: InputMaybe<Scalars['String']['input']>
  createdAt_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_gt: InputMaybe<Scalars['String']['input']>
  createdAt_gte: InputMaybe<Scalars['String']['input']>
  createdAt_in: InputMaybe<Array<Scalars['String']['input']>>
  createdAt_lt: InputMaybe<Scalars['String']['input']>
  createdAt_lte: InputMaybe<Scalars['String']['input']>
  createdAt_not: InputMaybe<Scalars['String']['input']>
  createdAt_not_contains: InputMaybe<Scalars['String']['input']>
  createdAt_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_not_ends_with: InputMaybe<Scalars['String']['input']>
  createdAt_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_not_in: InputMaybe<Array<Scalars['String']['input']>>
  createdAt_not_starts_with: InputMaybe<Scalars['String']['input']>
  createdAt_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  createdAt_starts_with: InputMaybe<Scalars['String']['input']>
  createdAt_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  decimals: InputMaybe<Scalars['BigInt']['input']>
  decimals_gt: InputMaybe<Scalars['BigInt']['input']>
  decimals_gte: InputMaybe<Scalars['BigInt']['input']>
  decimals_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  decimals_lt: InputMaybe<Scalars['BigInt']['input']>
  decimals_lte: InputMaybe<Scalars['BigInt']['input']>
  decimals_not: InputMaybe<Scalars['BigInt']['input']>
  decimals_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>
  id: InputMaybe<Scalars['ID']['input']>
  id_gt: InputMaybe<Scalars['ID']['input']>
  id_gte: InputMaybe<Scalars['ID']['input']>
  id_in: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt: InputMaybe<Scalars['ID']['input']>
  id_lte: InputMaybe<Scalars['ID']['input']>
  id_not: InputMaybe<Scalars['ID']['input']>
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>
  lastUpdatedAt: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_contains: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_contains_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_ends_with: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_gt: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_gte: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_in: InputMaybe<Array<Scalars['String']['input']>>
  lastUpdatedAt_lt: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_lte: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_contains: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_ends_with: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_in: InputMaybe<Array<Scalars['String']['input']>>
  lastUpdatedAt_not_starts_with: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_starts_with: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  or: InputMaybe<Array<InputMaybe<Token_Filter>>>
  symbol: InputMaybe<Scalars['String']['input']>
  symbol_contains: InputMaybe<Scalars['String']['input']>
  symbol_contains_nocase: InputMaybe<Scalars['String']['input']>
  symbol_ends_with: InputMaybe<Scalars['String']['input']>
  symbol_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  symbol_gt: InputMaybe<Scalars['String']['input']>
  symbol_gte: InputMaybe<Scalars['String']['input']>
  symbol_in: InputMaybe<Array<Scalars['String']['input']>>
  symbol_lt: InputMaybe<Scalars['String']['input']>
  symbol_lte: InputMaybe<Scalars['String']['input']>
  symbol_not: InputMaybe<Scalars['String']['input']>
  symbol_not_contains: InputMaybe<Scalars['String']['input']>
  symbol_not_contains_nocase: InputMaybe<Scalars['String']['input']>
  symbol_not_ends_with: InputMaybe<Scalars['String']['input']>
  symbol_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>
  symbol_not_in: InputMaybe<Array<Scalars['String']['input']>>
  symbol_not_starts_with: InputMaybe<Scalars['String']['input']>
  symbol_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  symbol_starts_with: InputMaybe<Scalars['String']['input']>
  symbol_starts_with_nocase: InputMaybe<Scalars['String']['input']>
  tokenAddress: InputMaybe<Scalars['Bytes']['input']>
  tokenAddress_contains: InputMaybe<Scalars['Bytes']['input']>
  tokenAddress_gt: InputMaybe<Scalars['Bytes']['input']>
  tokenAddress_gte: InputMaybe<Scalars['Bytes']['input']>
  tokenAddress_in: InputMaybe<Array<Scalars['Bytes']['input']>>
  tokenAddress_lt: InputMaybe<Scalars['Bytes']['input']>
  tokenAddress_lte: InputMaybe<Scalars['Bytes']['input']>
  tokenAddress_not: InputMaybe<Scalars['Bytes']['input']>
  tokenAddress_not_contains: InputMaybe<Scalars['Bytes']['input']>
  tokenAddress_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>
}

export enum Token_OrderBy {
  CreatedAt = 'createdAt',
  Decimals = 'decimals',
  Id = 'id',
  LastUpdatedAt = 'lastUpdatedAt',
  Symbol = 'symbol',
  TokenAddress = 'tokenAddress',
}

export type _Block_ = {
  __typename?: '_Block_'
  /** The hash of the block */
  hash: Maybe<Scalars['Bytes']['output']>
  /** The block number */
  number: Scalars['Int']['output']
  /** The hash of the parent block */
  parentHash: Maybe<Scalars['Bytes']['output']>
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp: Maybe<Scalars['Int']['output']>
}

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_'
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_
  /** The deployment ID */
  deployment: Scalars['String']['output']
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output']
}

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny',
}

export type GetClrFundsByOwnersQueryVariables = Exact<{
  owners: InputMaybe<
    Array<Scalars['Bytes']['input']> | Scalars['Bytes']['input']
  >
}>

export type GetClrFundsByOwnersQuery = {
  __typename?: 'Query'
  clrFunds: Array<{ __typename?: 'ClrFund'; id: string; owner: any | null }>
}

export const GetClrFundsByOwnersDocument = gql`
  query GetClrFundsByOwners($owners: [Bytes!]) {
    clrFunds(where: { owner_in: $owners }) {
      id
      owner
    }
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
  _variables
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    GetClrFundsByOwners(
      variables?: GetClrFundsByOwnersQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<GetClrFundsByOwnersQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetClrFundsByOwnersQuery>(
            GetClrFundsByOwnersDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'GetClrFundsByOwners',
        'query',
        variables
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
