import type { ComponentMeta } from '@storybook/react'

import ObservationsPage from './ObservationsPage'

export const generated = () => {
  return <ObservationsPage />
}

export default {
  title: 'Pages/ObservationsPage',
  component: ObservationsPage,
} as ComponentMeta<typeof ObservationsPage>
