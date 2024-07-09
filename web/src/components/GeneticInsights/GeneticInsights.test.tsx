import { render } from '@redwoodjs/testing/web'

import GeneticInsights from './GeneticInsights'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('GeneticInsights', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GeneticInsights />)
    }).not.toThrow()
  })
})
