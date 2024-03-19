export const schema = gql`
  type Mutation {
    saveToRedis(key: String!, value: String!): String! @requireAuth
    deleteFromRedis(key: String!): Boolean @requireAuth
  }

  type RedisQueryResult {
    timestamp: String!
    email: String!
    message: String!
  }
  type Query {
    getFromRedis(key: String!): [RedisQueryResult] @requireAuth
  }
`
