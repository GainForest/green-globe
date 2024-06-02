import type { Prisma, Shapefile } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ShapefileCreateArgs>({
  shapefile: { one: { data: {} }, two: { data: {} } },
})

export type StandardScenario = ScenarioData<Shapefile, 'shapefile'>
