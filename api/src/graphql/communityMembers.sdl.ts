export const schema = gql`
  type CommunityMember {
    id: Int!
    firstName: String!
    lastName: String!
    fundsReceived: Float!
    profileUrl: String
    projectId: String
    bio: String!
    role: String!
    priority: Int
    walletId: Int
    Project: Project
    Wallet: Wallet
    transactions: [Transaction]!
  }

  type Query {
    communityMembers: [CommunityMember!]! @requireAuth
    communityMember(id: Int!): CommunityMember @requireAuth
  }

  input CreateCommunityMemberInput {
    firstName: String!
    lastName: String!
    fundsReceived: Float!
    profileUrl: String
    projectId: String
    bio: String!
    role: String!
    priority: Int
    walletId: Int
  }

  input UpdateCommunityMemberInput {
    firstName: String
    lastName: String
    fundsReceived: Float
    profileUrl: String
    projectId: String
    bio: String
    role: String
    priority: Int
    walletId: Int
  }

  type Mutation {
    createCommunityMember(input: CreateCommunityMemberInput!): CommunityMember!
      @requireAuth
    updateCommunityMember(
      id: Int!
      input: UpdateCommunityMemberInput!
    ): CommunityMember! @requireAuth
    deleteCommunityMember(id: Int!): CommunityMember! @requireAuth
  }
`
