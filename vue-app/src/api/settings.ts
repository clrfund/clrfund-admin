/**
 * Wallet connect API id
 */
export const walletConnectProjectId = import.meta.env
  .VITE_WALLET_CONNECT_PROJECT_ID

if (!walletConnectProjectId)
  throw new Error('VITE_WALLET_CONNECT_PROJECT_ID is not set')
