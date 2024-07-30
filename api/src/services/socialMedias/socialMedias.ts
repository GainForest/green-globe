import type {
  QueryResolvers,
  MutationResolvers,
  SocialMediaRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const socialMedias: QueryResolvers['socialMedias'] = () => {
  return db.socialMedia.findMany()
}

export const socialMedia: QueryResolvers['socialMedia'] = ({ id }) => {
  return db.socialMedia.findUnique({
    where: { id },
  })
}

export const createSocialMedia: MutationResolvers['createSocialMedia'] = ({
  input,
}) => {
  return db.socialMedia.create({
    data: input,
  })
}

export const updateSocialMedia: MutationResolvers['updateSocialMedia'] = ({
  id,
  input,
}) => {
  return db.socialMedia.update({
    data: input,
    where: { id },
  })
}

export const deleteSocialMedia: MutationResolvers['deleteSocialMedia'] = ({
  id,
}) => {
  return db.socialMedia.delete({
    where: { id },
  })
}

export const SocialMedia: SocialMediaRelationResolvers = {
  Project: (_obj, { root }) => {
    return db.socialMedia.findUnique({ where: { id: root?.id } }).Project()
  },
}
