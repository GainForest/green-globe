import { render } from '@redwoodjs/testing/web'

import MethodologyPage from './MethodologyPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('MethodologyPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MethodologyPage />)
    }).not.toThrow()
  })
})
