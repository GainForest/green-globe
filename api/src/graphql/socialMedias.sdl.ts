export const schema = gql`
  type SocialMedia {
    id: Int!
    projectId: String!
    facebook: String
    linkedIn: String
    instagram: String
    twitter: String
    Project: Project!
  }

  type Query {
    socialMedias: [SocialMedia!]! @requireAuth
    socialMedia(id: Int!): SocialMedia @requireAuth
  }

  input CreateSocialMediaInput {
    projectId: String!
    facebook: String
    linkedIn: String
    instagram: String
    twitter: String
  }

  input UpdateSocialMediaInput {
    projectId: String
    facebook: String
    linkedIn: String
    instagram: String
    twitter: String
  }

  type Mutation {
    createSocialMedia(input: CreateSocialMediaInput!): SocialMedia! @requireAuth
    updateSocialMedia(id: Int!, input: UpdateSocialMediaInput!): SocialMedia!
      @requireAuth
    deleteSocialMedia(id: Int!): SocialMedia! @requireAuth
  }
`
