import { render, screen, waitFor } from '@redwoodjs/testing'

import { BiodiversityCard } from './BiodiversityCard'

jest.mock('theme-ui', () => ({
  useThemeUI: () => ({
    theme: {
      colors: {
        background: '#fff', // Mock background color
        text: '#000', // Mock text color
        // Add other color or theme properties used by your component
      },
    },
  }),
}))

describe('BiodiversityCard', () => {
  const mockSoralo = {
    project: {
      id: '9744630d6b4cdfdaf687bf289de011c04272d63ecb486ffc91bacde385740208',
      name: 'South Rift Association of Landowners',
      lat: -1.779576122951023,
      lon: 36.40950852048098,
      area: 14299756170.56434,
    },
  }

  it('displays the fetched data correctly', async () => {
    render(<BiodiversityCard activeProjectData={mockSoralo} />)

    await waitFor(() => {
      expect(screen.getByText('MEASURED')).toBeInTheDocument()
      expect(screen.getByText('Phylloscopus')).toBeInTheDocument()
    })
  })

  // Add more tests to cover different scenarios
})
