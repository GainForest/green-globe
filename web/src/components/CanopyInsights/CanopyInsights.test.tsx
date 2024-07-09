import { render } from '@redwoodjs/testing/web'

import CanopyInsights from './CanopyInsights'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CanopyInsights', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CanopyInsights />)
    }).not.toThrow()
  })
})
