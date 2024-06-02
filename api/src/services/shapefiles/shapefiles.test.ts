import type { Shapefile } from '@prisma/client'

import {
  shapefiles,
  shapefile,
  createShapefile,
  updateShapefile,
  deleteShapefile,
} from './shapefiles'
import type { StandardScenario } from './shapefiles.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('shapefiles', () => {
  scenario('returns all shapefiles', async (scenario: StandardScenario) => {
    const result = await shapefiles()

    expect(result.length).toEqual(Object.keys(scenario.shapefile).length)
  })

  scenario('returns a single shapefile', async (scenario: StandardScenario) => {
    const result = await shapefile({ id: scenario.shapefile.one.id })

    expect(result).toEqual(scenario.shapefile.one)
  })

  scenario('deletes a shapefile', async (scenario: StandardScenario) => {
    const original = (await deleteShapefile({
      id: scenario.shapefile.one.id,
    })) as Shapefile
    const result = await shapefile({ id: original.id })

    expect(result).toEqual(null)
  })
})
