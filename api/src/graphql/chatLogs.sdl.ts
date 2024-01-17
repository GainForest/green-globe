export const schema = gql`
  type Mutation {
    saveToRedis(key: String!, value: String!): String! @requireAuth
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
