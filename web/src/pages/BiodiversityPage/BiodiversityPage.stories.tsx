import type { ComponentMeta } from '@storybook/react'

import BiodiversityPage from './BiodiversityPage'

export const generated = () => {
  return <BiodiversityPage />
}

export default {
  title: 'Pages/BiodiversityPage',
  component: BiodiversityPage,
} as ComponentMeta<typeof BiodiversityPage>
