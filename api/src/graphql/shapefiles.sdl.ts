export const schema = gql`
  type Shapefile {
    id: Int!
    assetId: String
    area: Float
    isReference: Boolean!
    default: Boolean!
    shortName: String
    iNaturalist: String
    asset: Asset
  }

  type Query {
    shapefiles: [Shapefile!]! @requireAuth
    shapefile(id: Int!): Shapefile @requireAuth
  }

  input CreateShapefileInput {
    assetId: String
    area: Float
    isReference: Boolean!
    default: Boolean!
    shortName: String
    iNaturalist: String
  }

  input UpdateShapefileInput {
    assetId: String
    area: Float
    isReference: Boolean
    default: Boolean
    shortName: String
    iNaturalist: String
  }

  type Mutation {
    createShapefile(input: CreateShapefileInput!): Shapefile! @requireAuth
    updateShapefile(id: Int!, input: UpdateShapefileInput!): Shapefile!
      @requireAuth
    deleteShapefile(id: Int!): Shapefile! @requireAuth
  }
`
