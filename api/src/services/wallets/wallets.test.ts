import type { Wallet } from '@prisma/client'

import {
  wallets,
  wallet,
  createWallet,
  updateWallet,
  deleteWallet,
} from './wallets'
import type { StandardScenario } from './wallets.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('wallets', () => {
  scenario('returns all wallets', async (scenario: StandardScenario) => {
    const result = await wallets()

    expect(result.length).toEqual(Object.keys(scenario.wallet).length)
  })

  scenario('returns a single wallet', async (scenario: StandardScenario) => {
    const result = await wallet({ id: scenario.wallet.one.id })

    expect(result).toEqual(scenario.wallet.one)
  })

  scenario('creates a wallet', async () => {
    const result = await createWallet({
      input: {
        SOLAccounts: 'String',
        CeloAccounts: 'String',
        EthereumAccounts: 'String',
        PolygonAccounts: 'String',
      },
    })

    expect(result.SOLAccounts).toEqual('String')
    expect(result.CeloAccounts).toEqual('String')
    expect(result.EthereumAccounts).toEqual('String')
    expect(result.PolygonAccounts).toEqual('String')
  })

  scenario('updates a wallet', async (scenario: StandardScenario) => {
    const original = (await wallet({ id: scenario.wallet.one.id })) as Wallet
    const result = await updateWallet({
      id: original.id,
      input: { SOLAccounts: 'String2' },
    })

    expect(result.SOLAccounts).toEqual('String2')
  })

  scenario('deletes a wallet', async (scenario: StandardScenario) => {
    const original = (await deleteWallet({
      id: scenario.wallet.one.id,
    })) as Wallet
    const result = await wallet({ id: original.id })

    expect(result).toEqual(null)
  })
})
