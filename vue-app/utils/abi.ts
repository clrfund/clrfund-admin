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
