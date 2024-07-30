import { render } from '@redwoodjs/testing/web'

import CircularMultiLineChart from './CircularMultiLineChart'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CircularMultiLineChart', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CircularMultiLineChart />)
    }).not.toThrow()
  })
})
