import { render } from '@redwoodjs/testing/web'

import BiodiversityPage from './BiodiversityPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('BiodiversityPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BiodiversityPage />)
    }).not.toThrow()
  })
})
