export const schema = gql`
  type Wallet {
    id: Int!
    SOLAccounts: [String]!
    CeloAccounts: [String]!
    EthereumAccounts: [String]!
    PolygonAccounts: [String]!
    communityMembers: [CommunityMember]!
    Project: [Project]!
  }

  type Query {
    wallets: [Wallet!]! @requireAuth
    wallet(id: Int!): Wallet @requireAuth
  }

  input CreateWalletInput {
    SOLAccounts: [String]!
    CeloAccounts: [String]!
    EthereumAccounts: [String]!
    PolygonAccounts: [String]!
  }

  input UpdateWalletInput {
    SOLAccounts: [String]!
    CeloAccounts: [String]!
    EthereumAccounts: [String]!
    PolygonAccounts: [String]!
  }

  type Mutation {
    createWallet(input: CreateWalletInput!): Wallet! @requireAuth
    updateWallet(id: Int!, input: UpdateWalletInput!): Wallet! @requireAuth
    deleteWallet(id: Int!): Wallet! @requireAuth
  }
`
