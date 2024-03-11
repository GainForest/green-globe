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
    },
  }

  const mockOceanus = {
    project: {
      id: '40367dfcbafa0a8d1fa26ff481d6b2609536c0e14719f8e88060a9aee8c8ab0a',
      name: 'Oceanus Conservation',
      lat: 8.8947,
      lon: 126.31395,
    },
  }

  const mockMillionTrees = {
    project: {
      id: '4d4508e1473cdc66db75dcb18732981c0ebc1f33e87dbfad01129bfe0072f19e',
      name: 'Million Trees Project',
      lat: 27.46278,
      lon: 89.6596,
    },
  }

  beforeEach(() => {
    global.fetch = jest.fn() as jest.Mock
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('displays Soralo correctly', async () => {
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
      // displays API data
      expect(screen.getByText(/Phylloscopus/)).toBeInTheDocument()
    })
    const button = screen.getByRole('button', { name: 'MEASURED' })
    fireEvent.click(button)
    await waitFor(() => {
      // displays photo
      expect(screen.getByAltText('Acacia')).toHaveAttribute(
        'src',
        'https://kf.kobotoolbox.org/api/v2/assets/aN8RA4dm45jSkiSbnMSrhs/data/275079917/attachments/130217263/'
      )
      // displays heights
      expect(screen.getByText(/Tallest/)).toBeInTheDocument()
    })
  })

  it('displays Oceanus correctly', async () => {
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
                  'https://lh3.googleusercontent.com/p1exxcPjrpfd9JoCHu_UAfJnwhlgebavi-BJVRz2I52OD60ptqAHK-3G0DBFnbTxe3yqqsxK7FhI2TIQqPIoPEw',
                redlist: 'CR',
                scientificname: 'Muscicapa dauurica',
                common: 'Asian Brown Flycatcher',
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
                Plant_Name: 'Avicennia marina',
                latitude: 13.629125,
                longitude: 121.2098143,
                Height: '8.5',
                'FCD-tree_records-tree_photo':
                  'https://drive.google.com/open?id=1d5-szO7k15nDzuE-1cR0A1Q6lcQdXU0A',
              },
            },
          ],
        }),
    })
    render(<BiodiversityCard activeProjectData={mockOceanus} />)

    await waitFor(() => {
      expect(screen.getByText('MEASURED')).toBeInTheDocument()
      // displays API data
      expect(screen.getByText(/Muscicapa/)).toBeInTheDocument()
    })
    const button = screen.getByRole('button', { name: 'MEASURED' })
    fireEvent.click(button)

    await waitFor(() => {
      // displays photo from trees-measured AWS folder
      expect(screen.getByAltText(/Avicennia/)).toHaveAttribute(
        'src',
        'https://gainforest-transparency-dashboard.s3.amazonaws.com/trees-measured/1d5-szO7k15nDzuE-1cR0A1Q6lcQdXU0A.jpg'
      )
      // displays heights
      expect(screen.getByText(/Tallest/)).toBeInTheDocument()
    })
  })

  it('displays Million Trees Project correctly', async () => {
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
                  'https://lh3.googleusercontent.com/NMyhlMSgGj-V0C2nAGfkXJTAjayhufrtOLblgPPwTBQffh2VgvLmaiD7pLzVqwi1c3AuTNN4IAJYEvBsVkYcTJ4',
                redlist: 'CR',
                scientificname: 'Bradypterus luteoventris',
                common: 'Brown Bush-Warbler',
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
                lat: 27.46326,
                lon: 89.65918,
                Height: '0.25',
                Plant_Name: 'blue pine',
              },
            },
          ],
        }),
    })
    render(<BiodiversityCard activeProjectData={mockMillionTrees} />)

    await waitFor(() => {
      expect(screen.getByText('MEASURED')).toBeInTheDocument()
      // displays API data
      expect(screen.getByText(/Bradypterus/)).toBeInTheDocument()
    })
    const button = screen.getByRole('button', { name: 'MEASURED' })
    fireEvent.click(button)
    await waitFor(() => {
      // title cases species and correctly pulls placeholder image
      expect(screen.getByAltText('Blue Pine')).toHaveAttribute(
        'src',
        `${process.env.AWS_STORAGE}/miscellaneous/placeholders/taxa_plants.png`
      )
      // displays heights
      expect(screen.getByText(/Tallest/)).toBeInTheDocument()
    })
  })
})
