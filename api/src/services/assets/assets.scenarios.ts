import type { Prisma, Asset } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.AssetCreateArgs>({
  asset: {
    one: {
      data: {
        classification: 'String',
        ipfsCID: 'String',
        type: 'String',
        geoInformation: { foo: 'bar' },
      },
    },
    two: {
      data: {
        classification: 'String',
        ipfsCID: 'String',
        type: 'String',
        geoInformation: { foo: 'bar' },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Asset, 'asset'>
