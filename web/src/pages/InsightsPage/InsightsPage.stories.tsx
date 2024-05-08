import type { ComponentMeta } from '@storybook/react'

import InsightsPage from './InsightsPage'

export const generated = () => {
  return <InsightsPage />
}

export default {
  title: 'Pages/InsightsPage',
  component: InsightsPage,
} as ComponentMeta<typeof InsightsPage>
