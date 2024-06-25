export const schema = gql`
  type AirtableTransaction {
    platform: String
    originalAmount: Float
    currency: String
    amountInUsd: Float
    hash: String
    timestamp: String
    orgName: String
    id: Int
    recipientName: String
    communityMemberId: Int
  }

  type Query {
    findEntry(orgName: String): [AirtableTransaction] @skipAuth
  }
`
