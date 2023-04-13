export const fetchGainForestShapefiles = (setGeoJson) => {
  fetch(
    `${process.env.AWS_STORAGE}/shapefiles/gainforest-all-shapefiles.geojson`
  )
    .then((response) => response.json())
    .then((newGeojson) => setGeoJson(newGeojson))
}

export const fetchVerraShapefiles = (setVerraPolygons) => {
  fetch(`${process.env.AWS_STORAGE}/shapefiles/verra-all-shapefiles.geojson`)
    .then((response) => response.json())
    .then((newGeojson) => setVerraPolygons(newGeojson))
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
            discordId
            lat
            lon
            assets {
              id
              name
              classification
              awsCID
            }
            CommunityMember {
              id
              firstName
              lastName
              priority
              role
              bio
              Wallet {
                CeloAccount
              }
              fundsReceived
              profileUrl
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

export const fetchTreeShapefile = async (
  endpoint: string,
  setActiveProjectTreesPlanted
) => {
  const response = fetch(`${process.env.AWS_STORAGE}/${endpoint}`)
    .then((res) => res.json())
    .then((result) => {
      setActiveProjectTreesPlanted(result)
    })
  return response
}
