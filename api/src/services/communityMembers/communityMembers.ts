import type {
  QueryResolvers,
  MutationResolvers,
  CommunityMemberRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const communityMembers: QueryResolvers['communityMembers'] = () => {
  return db.communityMember.findMany()
}

export const communityMember: QueryResolvers['communityMember'] = ({ id }) => {
  return db.communityMember.findUnique({
    where: { id },
  })
}

export const createCommunityMember: MutationResolvers['createCommunityMember'] =
  ({ input }) => {
    return db.communityMember.create({
      data: input,
    })
  }

export const updateCommunityMember: MutationResolvers['updateCommunityMember'] =
  ({ id, input }) => {
    return db.communityMember.update({
      data: input,
      where: { id },
    })
  }

export const deleteCommunityMember: MutationResolvers['deleteCommunityMember'] =
  ({ id }) => {
    return db.communityMember.delete({
      where: { id },
    })
  }

export const CommunityMember: CommunityMemberRelationResolvers = {
  Project: (_obj, { root }) => {
    return db.communityMember.findUnique({ where: { id: root?.id } }).Project()
  },
  Wallet: (_obj, { root }) => {
    return db.communityMember.findUnique({ where: { id: root?.id } }).Wallet()
  },
  transactions: (_obj, { root }) => {
    return db.communityMember
      .findUnique({ where: { id: root?.id } })
      .transactions()
  },
}
