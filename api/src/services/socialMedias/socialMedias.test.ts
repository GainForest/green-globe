import type { SocialMedia } from '@prisma/client'

import {
  socialMedias,
  socialMedia,
  createSocialMedia,
  updateSocialMedia,
  deleteSocialMedia,
} from './socialMedias'
import type { StandardScenario } from './socialMedias.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('socialMedias', () => {
  scenario('returns all socialMedias', async (scenario: StandardScenario) => {
    const result = await socialMedias()

    expect(result.length).toEqual(Object.keys(scenario.socialMedia).length)
  })

  scenario(
    'returns a single socialMedia',
    async (scenario: StandardScenario) => {
      const result = await socialMedia({ id: scenario.socialMedia.one.id })

      expect(result).toEqual(scenario.socialMedia.one)
    }
  )

  scenario('creates a socialMedia', async (scenario: StandardScenario) => {
    const result = await createSocialMedia({
      input: { projectId: scenario.socialMedia.two.projectId },
    })

    expect(result.projectId).toEqual(scenario.socialMedia.two.projectId)
  })

  scenario('updates a socialMedia', async (scenario: StandardScenario) => {
    const original = (await socialMedia({
      id: scenario.socialMedia.one.id,
    })) as SocialMedia
    const result = await updateSocialMedia({
      id: original.id,
      input: { projectId: scenario.socialMedia.two.projectId },
    })

    expect(result.projectId).toEqual(scenario.socialMedia.two.projectId)
  })

  scenario('deletes a socialMedia', async (scenario: StandardScenario) => {
    const original = (await deleteSocialMedia({
      id: scenario.socialMedia.one.id,
    })) as SocialMedia
    const result = await socialMedia({ id: original.id })

    expect(result).toEqual(null)
  })
})
