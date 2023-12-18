import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('https://api.mol.org/1.x/spatial/species/list', (req) => {
    const lat = req.url.searchParams.get('lat')
    const lon = req.url.searchParams.get('lon')
    if (lat === '-1.779576122951023' && lon === '36.40950852048098') {
      return HttpResponse.json([
        {
          count: 833,
          title: 'Birds',
          taxa: 'birds',
          species: [
            {
              image_url:
                'https://lh3.googleusercontent.com/Rj4oFnJZr3BVuFtzyf365X9Ioxl-t61pIyfNMYvcAIbC3CEPp62cP4CruexAd-su0m7gCPwKevs75P4IykzNheQ',
              sequenceid: 1000,
              _order: null,
              family: 'Sylviidae',
              redlist: 'CR',
              scientificname: 'Phylloscopus umbrovirens',
              common: 'Brown Woodland-Warbler',
              family_common: 'Sylviid Babblers',
            },
          ],
        },
      ])
    }
  }),
]
