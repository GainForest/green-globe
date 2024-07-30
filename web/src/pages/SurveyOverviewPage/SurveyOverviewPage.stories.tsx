import type { ComponentMeta } from '@storybook/react'

import SurveyOverviewPage from './SurveyOverviewPage'

export const generated = () => {
  return <SurveyOverviewPage />
}

export default {
  title: 'Pages/SurveyOverviewPage',
  component: SurveyOverviewPage,
} as ComponentMeta<typeof SurveyOverviewPage>
