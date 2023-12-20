// The ABI's of the funding round factory that are in use
export const FundingRoundFactoryAbi = [
  'function userRegistry() public view returns (address)',
  'function maciFactory() public view returns (address)',
  'function cancelCurrentRound()',
  'function deployNewRound()',
    `function transferMatchingFunds(
      uint256 _totalSpent,
      uint256 _totalSpentSalt
    )`,
    `function setMaciParameters(
    uint8 _stateTreeDepth,
    uint8 _messageTreeDepth,
    uint8 _voteOptionTreeDepth,
    uint8 _tallyBatchSize,
    uint8 _messageBatchSize,
    address _batchUstVerifier,
    address _qvtVerifier,
    uint256 _signUpDuration,
    uint256 _votingDuration
  )`,
    'function owner() public view returns(address)',
]

// MACI factory ABI
export const MaciFactoryAbi = [
  'function treeDepths() public view returns (tuple(uint8 stateTreeDepth, uint8 messageTreeDepth, uint8 voteOptionTreeDepth))',
  'function batchSizes() public view returns (tuple(uint8 tallyBatchSize, uint8 messageBatchSize))',
  'function batchUstVerifier() public view returns (address)',
  'function qvtVerifier() public view returns (address)',
  'function signUpDuration() public view returns (uint256)',
  'function votingDuration() public view returns (uint256)',
]

// Simple User Registry ABI
export const SimpleUserRegistryAbi = [
  'function addUser(address _user)',
  'function owner() public view returns (address)',
]
