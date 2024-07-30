import type {
  QueryResolvers,
  MutationResolvers,
  ProjectRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const projects: QueryResolvers['projects'] = () => {
  return db.project.findMany()
}

export const project: QueryResolvers['project'] = ({ id }) => {
  return db.project.findUnique({
    where: { id },
  })
}

export const createProject: MutationResolvers['createProject'] = ({
  input,
}) => {
  return db.project.create({
    data: input,
  })
}

export const updateProject: MutationResolvers['updateProject'] = ({
  id,
  input,
}) => {
  return db.project.update({
    data: input,
    where: { id },
  })
}

export const deleteProject: MutationResolvers['deleteProject'] = ({ id }) => {
  return db.project.delete({
    where: { id },
  })
}

export const Project: ProjectRelationResolvers = {
  Wallet: (_obj, { root }) => {
    return db.project.findUnique({ where: { id: root?.id } }).Wallet()
  },
  assets: (_obj, { root }) => {
    return db.project.findUnique({ where: { id: root?.id } }).assets()
  },
  communityMembers: (_obj, { root }) => {
    return db.project.findUnique({ where: { id: root?.id } }).communityMembers()
  },
  SocialMedia: (_obj, { root }) => {
    return db.project.findUnique({ where: { id: root?.id } }).SocialMedia()
  },
  Transactions: (_obj, { root }) => {
    return db.project.findUnique({ where: { id: root?.id } }).Transactions()
  },
}
