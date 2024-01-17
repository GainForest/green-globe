export const schema = gql`
  type Mutation {
    saveToRedis(key: String!, value: String!): String! @requireAuth
  }

  type Query {
    getFromRedis(key: String!): [String]! @requireAuth
  }
`
