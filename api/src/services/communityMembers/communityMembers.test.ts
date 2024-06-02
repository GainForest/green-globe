import type { CommunityMember } from '@prisma/client'

import {
  communityMembers,
  communityMember,
  createCommunityMember,
  updateCommunityMember,
  deleteCommunityMember,
} from './communityMembers'
import type { StandardScenario } from './communityMembers.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('communityMembers', () => {
  scenario(
    'returns all communityMembers',
    async (scenario: StandardScenario) => {
      const result = await communityMembers()

      expect(result.length).toEqual(
        Object.keys(scenario.communityMember).length
      )
    }
  )

  scenario(
    'returns a single communityMember',
    async (scenario: StandardScenario) => {
      const result = await communityMember({
        id: scenario.communityMember.one.id,
      })

      expect(result).toEqual(scenario.communityMember.one)
    }
  )

  scenario('creates a communityMember', async () => {
    const result = await createCommunityMember({
      input: {
        firstName: 'String',
        lastName: 'String',
        fundsReceived: 2286349.317787757,
        bio: 'String',
        role: 'String',
      },
    })

    expect(result.firstName).toEqual('String')
    expect(result.lastName).toEqual('String')
    expect(result.fundsReceived).toEqual(2286349.317787757)
    expect(result.bio).toEqual('String')
    expect(result.role).toEqual('String')
  })

  scenario('updates a communityMember', async (scenario: StandardScenario) => {
    const original = (await communityMember({
      id: scenario.communityMember.one.id,
    })) as CommunityMember
    const result = await updateCommunityMember({
      id: original.id,
      input: { firstName: 'String2' },
    })

    expect(result.firstName).toEqual('String2')
  })

  scenario('deletes a communityMember', async (scenario: StandardScenario) => {
    const original = (await deleteCommunityMember({
      id: scenario.communityMember.one.id,
    })) as CommunityMember
    const result = await communityMember({ id: original.id })

    expect(result).toEqual(null)
  })
})
