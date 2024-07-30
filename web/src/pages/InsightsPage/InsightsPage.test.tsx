import { render } from '@redwoodjs/testing/web'

import InsightsPage from './InsightsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('InsightsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<InsightsPage />)
    }).not.toThrow()
  })
})
