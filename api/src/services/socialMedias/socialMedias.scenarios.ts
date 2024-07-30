import type { Prisma, SocialMedia } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.SocialMediaCreateArgs>({
  socialMedia: {
    one: {
      data: {
        Project: {
          create: {
            id: 'String',
            name: 'String',
            country: 'String',
            description: 'String',
            potentialIssues: 'String',
            proponents: 'String',
            sdgGoals: 4208292,
          },
        },
      },
    },
    two: {
      data: {
        Project: {
          create: {
            id: 'String',
            name: 'String',
            country: 'String',
            description: 'String',
            potentialIssues: 'String',
            proponents: 'String',
            sdgGoals: 8781519,
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<SocialMedia, 'socialMedia'>
