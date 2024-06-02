export const schema = gql`
  type Project {
    id: String!
    name: String!
    country: String!
    organizationId: Int
    objective: String
    catalogueReason: String
    category: String
    description: String!
    longDescription: String!
    dataDownloadUrl: String
    dataDownloadInfo: String
    kyc: Boolean
    monitorStrategy: String
    restorationType: String
    communitySize: Int
    lat: Float
    lon: Float
    startDate: String
    endDate: String
    verraId: Int
    area: Float
    score: String
    analysis: String
    potentialIssues: [String]!
    customEnterBtnText: String
    isEnabled: Boolean!
    isExternalProject: Boolean!
    isProjectOfTheMonth: Boolean!
    claimedCarbonOffset: Int
    soilCarbon: Int
    avoidedCarbon: Int
    bufferCarbon: Int
    hasReferenceArea: Boolean!
    projectUrl: String
    discordId: String
    stripeUrl: String
    proponents: [String]!
    walletId: Int
    lastCreditPrice: Float
    onChainRetirementCarbon: Int
    onChainSupplyCarbon: Int
    retirementCarbon: Int
    sdgGoals: [Int]!
    supplyCarbon: Int
    Wallet: Wallet
    assets: [Asset]!
    communityMembers: [CommunityMember]!
    SocialMedia: SocialMedia
    Transactions: [Transaction]!
  }

  type Query {
    projects: [Project!]! @requireAuth
    project(id: String!): Project @requireAuth
  }

  input CreateProjectInput {
    name: String!
    country: String!
    organizationId: Int
    objective: String
    catalogueReason: String
    category: String
    description: String!
    longDescription: String!
    dataDownloadUrl: String
    dataDownloadInfo: String
    kyc: Boolean
    monitorStrategy: String
    restorationType: String
    communitySize: Int
    lat: Float
    lon: Float
    startDate: String
    endDate: String
    verraId: Int
    area: Float
    score: String
    analysis: String
    potentialIssues: [String]!
    customEnterBtnText: String
    isEnabled: Boolean!
    isExternalProject: Boolean!
    isProjectOfTheMonth: Boolean!
    claimedCarbonOffset: Int
    soilCarbon: Int
    avoidedCarbon: Int
    bufferCarbon: Int
    hasReferenceArea: Boolean!
    projectUrl: String
    discordId: String
    stripeUrl: String
    proponents: [String]!
    walletId: Int
    lastCreditPrice: Float
    onChainRetirementCarbon: Int
    onChainSupplyCarbon: Int
    retirementCarbon: Int
    sdgGoals: [Int]!
    supplyCarbon: Int
  }

  input UpdateProjectInput {
    name: String
    country: String
    organizationId: Int
    objective: String
    catalogueReason: String
    category: String
    description: String
    longDescription: String
    dataDownloadUrl: String
    dataDownloadInfo: String
    kyc: Boolean
    monitorStrategy: String
    restorationType: String
    communitySize: Int
    lat: Float
    lon: Float
    startDate: String
    endDate: String
    verraId: Int
    area: Float
    score: String
    analysis: String
    potentialIssues: [String]!
    customEnterBtnText: String
    isEnabled: Boolean
    isExternalProject: Boolean
    isProjectOfTheMonth: Boolean
    claimedCarbonOffset: Int
    soilCarbon: Int
    avoidedCarbon: Int
    bufferCarbon: Int
    hasReferenceArea: Boolean
    projectUrl: String
    discordId: String
    stripeUrl: String
    proponents: [String]!
    walletId: Int
    lastCreditPrice: Float
    onChainRetirementCarbon: Int
    onChainSupplyCarbon: Int
    retirementCarbon: Int
    sdgGoals: [Int]!
    supplyCarbon: Int
  }

  type Mutation {
    createProject(input: CreateProjectInput!): Project! @requireAuth
    updateProject(id: String!, input: UpdateProjectInput!): Project!
      @requireAuth
    deleteProject(id: String!): Project! @requireAuth
  }
`
