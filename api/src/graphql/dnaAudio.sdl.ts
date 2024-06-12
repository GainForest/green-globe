export const schema = gql`
  type AudioFile {
    url: String!
    mimeType: String!
  }

  type Query {
    fetchDNAudio(taxon: String!): AudioFile @skipAuth
  }
`
