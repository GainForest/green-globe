export const fetchShapefiles = (setGeoJson) => {
  fetch(
    `${process.env.AWS_STORAGE}/shapefiles/gainforest-all-shapefiles.geojson`
  )
    .then((response) => response.json())
    .then((newGeojson) => setGeoJson(newGeojson))
}

export const fetchProjectInfo = async (projectId: number, setResult) => {
  const response = fetch('https://gainforest.app/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query {
          project(id:${projectId}) {
            id
            name
            country
            description
            assets {
              id
              name
              classification
              awsCID
            }
          }
        }
      `,
    }),
  })
    .then((res) => res.json())
    .then((result) => setResult(result.data))
  return response
}

export const fetchTreeShapefile = async (endpoint: string, setResult) => {
  const response = fetch(
    'https://gainforest-transparency-dashboard.s3.amazonaws.com/shapefiles/million-trees-project-planted.geojson/'
  )
    .then((res) => res.json())
    .then((result) => setResult(result.data))
  return response
}
