import type { ComponentMeta } from '@storybook/react'

import HomePage from './MapPage'

export const generated = () => {
  return <HomePage />
}

export default {
  title: 'Pages/HomePage',
  component: HomePage,
} as ComponentMeta<typeof HomePage>
