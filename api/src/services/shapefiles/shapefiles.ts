import type {
  QueryResolvers,
  MutationResolvers,
  ShapefileRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const shapefiles: QueryResolvers['shapefiles'] = () => {
  return db.shapefile.findMany()
}

export const shapefile: QueryResolvers['shapefile'] = ({ id }) => {
  return db.shapefile.findUnique({
    where: { id },
  })
}

export const createShapefile: MutationResolvers['createShapefile'] = ({
  input,
}) => {
  return db.shapefile.create({
    data: input,
  })
}

export const updateShapefile: MutationResolvers['updateShapefile'] = ({
  id,
  input,
}) => {
  return db.shapefile.update({
    data: input,
    where: { id },
  })
}

export const deleteShapefile: MutationResolvers['deleteShapefile'] = ({
  id,
}) => {
  return db.shapefile.delete({
    where: { id },
  })
}

export const Shapefile: ShapefileRelationResolvers = {
  asset: (_obj, { root }) => {
    return db.shapefile.findUnique({ where: { id: root?.id } }).asset()
  },
}
