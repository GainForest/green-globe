import type { Prisma, Project } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ProjectCreateArgs>({
  project: {
    one: {
      data: {
        id: 'String',
        name: 'String',
        country: 'String',
        description: 'String',
        potentialIssues: 'String',
        proponents: 'String',
        sdgGoals: 4994315,
      },
    },
    two: {
      data: {
        id: 'String',
        name: 'String',
        country: 'String',
        description: 'String',
        potentialIssues: 'String',
        proponents: 'String',
        sdgGoals: 105543,
      },
    },
  },
})

export type StandardScenario = ScenarioData<Project, 'project'>
