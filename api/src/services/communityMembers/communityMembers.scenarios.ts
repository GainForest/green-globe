import type { Prisma, CommunityMember } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.CommunityMemberCreateArgs>({
  communityMember: {
    one: {
      data: {
        firstName: 'String',
        lastName: 'String',
        fundsReceived: 152968.5424753402,
        bio: 'String',
        role: 'String',
      },
    },
    two: {
      data: {
        firstName: 'String',
        lastName: 'String',
        fundsReceived: 3870308.1946514286,
        bio: 'String',
        role: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<CommunityMember, 'communityMember'>
