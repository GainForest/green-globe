export const schema = gql`
  type Asset {
    id: String!
    name: String
    projectId: String
    classification: String!
    ipfsCID: String!
    description: String
    type: String!
    extension: String
    geoInformation: [JSON]!
    awsCID: String
    dateMeasured: DateTime
    dateUploaded: DateTime!
    dateEdited: DateTime
    project: Project
    shapefile: Shapefile
  }

  type Query {
    assets: [Asset!]! @requireAuth
    asset(id: String!): Asset @requireAuth
  }

  input CreateAssetInput {
    name: String
    projectId: String
    classification: String!
    ipfsCID: String!
    description: String
    type: String!
    extension: String
    geoInformation: [JSON]!
    awsCID: String
    dateMeasured: DateTime
    dateUploaded: DateTime!
    dateEdited: DateTime
  }

  input UpdateAssetInput {
    name: String
    projectId: String
    classification: String
    ipfsCID: String
    description: String
    type: String
    extension: String
    geoInformation: [JSON]!
    awsCID: String
    dateMeasured: DateTime
    dateUploaded: DateTime
    dateEdited: DateTime
  }

  type Mutation {
    createAsset(input: CreateAssetInput!): Asset! @requireAuth
    updateAsset(id: String!, input: UpdateAssetInput!): Asset! @requireAuth
    deleteAsset(id: String!): Asset! @requireAuth
  }
`
