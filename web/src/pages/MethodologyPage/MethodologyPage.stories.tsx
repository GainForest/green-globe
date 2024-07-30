import type { ComponentMeta } from '@storybook/react'

import MethodologyPage from './MethodologyPage'

export const generated = () => {
  return <MethodologyPage />
}

export default {
  title: 'Pages/MethodologyPage',
  component: MethodologyPage,
} as ComponentMeta<typeof MethodologyPage>
