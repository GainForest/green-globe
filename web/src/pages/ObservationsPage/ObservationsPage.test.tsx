import { render } from '@redwoodjs/testing/web'

import ObservationsPage from './ObservationsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ObservationsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ObservationsPage />)
    }).not.toThrow()
  })
})
