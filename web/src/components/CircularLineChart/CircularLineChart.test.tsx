import { render } from '@redwoodjs/testing/web'

import CircularLineChart from './CircularLineChart'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CircularLineChart', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CircularLineChart />)
    }).not.toThrow()
  })
})
