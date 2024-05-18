import { render } from '@redwoodjs/testing/web'

import SurveyOverviewPage from './SurveyOverviewPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SurveyOverviewPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SurveyOverviewPage />)
    }).not.toThrow()
  })
})
