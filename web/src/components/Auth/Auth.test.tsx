import { render } from '@redwoodjs/testing/web'

import Auth from './Auth'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Auth', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Auth />)
    }).not.toThrow()
  })
})
