import { render, screen, waitFor, fireEvent } from '@redwoodjs/testing'

import { BiodiversityCard } from './BiodiversityCard'

jest.mock('theme-ui', () => ({
  useThemeUI: () => ({
    theme: {
      colors: {
        background: '#fff',
        text: '#000',
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

  beforeEach(() => {
    global.fetch = jest.fn() as jest.Mock
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('displays the fetched data correctly', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      json: () =>
        Promise.resolve([
          {
            count: 1,
            title: 'Birds',
            taxa: 'birds',
            species: [
              {
                image_url:
                  'https://lh3.googleusercontent.com/Rj4oFnJZr3BVuFtzyf365X9Ioxl-t61pIyfNMYvcAIbC3CEPp62cP4CruexAd-su0m7gCPwKevs75P4IykzNheQ',
                redlist: 'CR',
                scientificname: 'Phylloscopus umbrovirens',
                common: 'Brown Woodland-Warbler',
              },
            ],
          },
        ]),
    })
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          features: [
            {
              type: 'Feature',
              properties: {
                lat: -1.8473516,
                lon: 36.1224567,
                height: '6.0',
                diameter: '3.0',
                awsUrl:
                  'https://gainforest-transparency-dashboard.s3.amazonaws.com/trees-measured/south-rift-association-of-landowners-1696402228831.jpg',
                koboUrl:
                  'https://kf.kobotoolbox.org/api/v2/assets/aN8RA4dm45jSkiSbnMSrhs/data/275079917/attachments/130217263/',
                species: 'Acacia',
              },
            },
          ],
        }),
    })
    render(<BiodiversityCard activeProjectData={mockSoralo} />)

    await waitFor(() => {
      expect(screen.getByText('MEASURED')).toBeInTheDocument()
      expect(screen.getByText(/Phylloscopus/)).toBeInTheDocument()
    })
    const button = screen.getByRole('button', { name: 'MEASURED' })
    fireEvent.click(button)
    await waitFor(() => {
      expect(screen.getByAltText('Acacia')).toHaveAttribute(
        'src',
        'https://kf.kobotoolbox.org/api/v2/assets/aN8RA4dm45jSkiSbnMSrhs/data/275079917/attachments/130217263/'
      )
    })
  })
})
