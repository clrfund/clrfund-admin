import { GraphQLClient } from 'graphql-request'
import { getSdk } from '~/graphql/API'

export async function getClrfundsByOwners(
  owners: string[],
  subgraphUrl: string
): Promise<string[]> {
  const client = new GraphQLClient(subgraphUrl)
  const sdk = getSdk(client)

  const data = await sdk.GetClrFundsByOwners({
    owners,
  })

  if (!data.clrFunds.length) {
    return []
  }

  return data.clrFunds.map((clrfund) => clrfund.id)
}
