import type {
  QueryResolvers,
  MutationResolvers,
  WalletRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const wallets: QueryResolvers['wallets'] = () => {
  return db.wallet.findMany()
}

export const wallet: QueryResolvers['wallet'] = ({ id }) => {
  return db.wallet.findUnique({
    where: { id },
  })
}

export const createWallet: MutationResolvers['createWallet'] = ({ input }) => {
  return db.wallet.create({
    data: input,
  })
}

export const updateWallet: MutationResolvers['updateWallet'] = ({
  id,
  input,
}) => {
  return db.wallet.update({
    data: input,
    where: { id },
  })
}

export const deleteWallet: MutationResolvers['deleteWallet'] = ({ id }) => {
  return db.wallet.delete({
    where: { id },
  })
}

export const Wallet: WalletRelationResolvers = {
  communityMembers: (_obj, { root }) => {
    return db.wallet.findUnique({ where: { id: root?.id } }).communityMembers()
  },
  Project: (_obj, { root }) => {
    return db.wallet.findUnique({ where: { id: root?.id } }).Project()
  },
}
