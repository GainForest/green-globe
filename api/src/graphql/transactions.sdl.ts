export const schema = gql`
  type Transaction {
    id: Int!
    from: String!
    to: String!
    amount: Float
    blockchain: String!
    token: String!
    hash: String
    motive: String
    timestamp: DateTime!
    communityMemberId: Int
    projectId: String
    CommunityMember: CommunityMember
    Project: Project
  }

  type Query {
    transactions: [Transaction!]! @requireAuth
    transaction(id: Int!): Transaction @requireAuth
  }

  input CreateTransactionInput {
    from: String!
    to: String!
    amount: Float
    blockchain: String!
    token: String!
    hash: String
    motive: String
    timestamp: DateTime!
    communityMemberId: Int
    projectId: String
  }

  input UpdateTransactionInput {
    from: String
    to: String
    amount: Float
    blockchain: String
    token: String
    hash: String
    motive: String
    timestamp: DateTime
    communityMemberId: Int
    projectId: String
  }

  type Mutation {
    createTransaction(input: CreateTransactionInput!): Transaction! @requireAuth
    updateTransaction(id: Int!, input: UpdateTransactionInput!): Transaction!
      @requireAuth
    deleteTransaction(id: Int!): Transaction! @requireAuth
  }
`
