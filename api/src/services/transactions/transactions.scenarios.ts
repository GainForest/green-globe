import type { Prisma, Transaction } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TransactionCreateArgs>({
  transaction: {
    one: {
      data: {
        from: 'String',
        to: 'String',
        blockchain: 'String',
        token: 'String',
        timestamp: '2024-06-02T18:25:13.821Z',
      },
    },
    two: {
      data: {
        from: 'String',
        to: 'String',
        blockchain: 'String',
        token: 'String',
        timestamp: '2024-06-02T18:25:13.821Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Transaction, 'transaction'>
