import type { Prisma, Wallet } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.WalletCreateArgs>({
  wallet: {
    one: {
      data: {
        SOLAccounts: 'String',
        CeloAccounts: 'String',
        EthereumAccounts: 'String',
        PolygonAccounts: 'String',
      },
    },
    two: {
      data: {
        SOLAccounts: 'String',
        CeloAccounts: 'String',
        EthereumAccounts: 'String',
        PolygonAccounts: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Wallet, 'wallet'>
