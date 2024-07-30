import type { Transaction } from '@prisma/client'

import {
  transactions,
  transaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from './transactions'
import type { StandardScenario } from './transactions.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('transactions', () => {
  scenario('returns all transactions', async (scenario: StandardScenario) => {
    const result = await transactions()

    expect(result.length).toEqual(Object.keys(scenario.transaction).length)
  })

  scenario(
    'returns a single transaction',
    async (scenario: StandardScenario) => {
      const result = await transaction({ id: scenario.transaction.one.id })

      expect(result).toEqual(scenario.transaction.one)
    }
  )

  scenario('creates a transaction', async () => {
    const result = await createTransaction({
      input: {
        from: 'String',
        to: 'String',
        blockchain: 'String',
        token: 'String',
        timestamp: '2024-06-02T18:25:13.811Z',
      },
    })

    expect(result.from).toEqual('String')
    expect(result.to).toEqual('String')
    expect(result.blockchain).toEqual('String')
    expect(result.token).toEqual('String')
    expect(result.timestamp).toEqual(new Date('2024-06-02T18:25:13.811Z'))
  })

  scenario('updates a transaction', async (scenario: StandardScenario) => {
    const original = (await transaction({
      id: scenario.transaction.one.id,
    })) as Transaction
    const result = await updateTransaction({
      id: original.id,
      input: { from: 'String2' },
    })

    expect(result.from).toEqual('String2')
  })

  scenario('deletes a transaction', async (scenario: StandardScenario) => {
    const original = (await deleteTransaction({
      id: scenario.transaction.one.id,
    })) as Transaction
    const result = await transaction({ id: original.id })

    expect(result).toEqual(null)
  })
})
