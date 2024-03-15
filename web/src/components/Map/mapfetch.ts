import geojson2h3 from 'geojson2h3'

export const fetchHiveLocations = (setHiveLocations) => {
  fetch(`${process.env.AWS_STORAGE}/points-of-interest/hive-locations.geojson`)
    .then((response) => response.json())
    .then((hiveLocations) => {
      setHiveLocations(hiveLocations)
    })
}

export const fetchHexagons = (setHexagons) => {
  fetch(`${process.env.AWS_STORAGE}/h3/defensores-del-chaco-h3.json`)
    .then((response) => response.json())
    .then((hexagonIds) => {
      setHexagons(
        geojson2h3.h3SetToFeatureCollection(hexagonIds.all, (id) => ({
          id,
        }))
      )
    })
}

export const fetchGainForestCenterpoints = (setGeoJson) => {
  fetch(
    `${process.env.AWS_STORAGE}/shapefiles/gainforest-all-shapefiles.geojson`
  )
    .then((response) => response.json())
    .then((newGeojson) => setGeoJson(newGeojson))
}

export const fetchProjectInfo = async (projectId) => {
  const response = fetch(`${process.env.GAINFOREST_ENDPOINT}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query {
          project(id:"${projectId}") {
            id
            name
            country
            dataDownloadUrl
            dataDownloadInfo
            description
            longDescription
            stripeUrl
            discordId
            lat
            lon
            area
            assets {
              id
              name
              classification
              awsCID
              shapefile {
                default
                isReference
                shortName
              }
            }
            CommunityMember {
              id
              firstName
              lastName
              priority
              role
              bio
              Wallet {
                CeloAccounts
                SOLAccounts
              }
              fundsReceived
              profileUrl
            }
            Wallet {
              CeloAccounts
              SOLAccounts
            }
          }
        }
      `,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      return result.data
    })

  return response
}
export const fetchProjectPolygon = async (
  endpoint: string,
  setActiveProjectPolygon
) => {
  const response = fetch(`${process.env.AWS_STORAGE}/${endpoint}`)
    .then((res) => res.json())
    .then((result) => {
      setActiveProjectPolygon(result)
    })
  return response
}

export const fetchAllSiteData = async (endpoints, setAllSiteData) => {
  const fetchPromises = endpoints.map((url) =>
    fetch(`${process.env.AWS_STORAGE}/${url}`).then((res) => res.json())
  )

  Promise.all(fetchPromises)
    .then((results) => {
      const features = results.flatMap((result) => result.features)
      setAllSiteData({
        type: 'FeatureCollection',
        features,
      })
    })
    .catch((error) => console.error('Error fetching site data:', error))
}

export const fetchTreeShapefile = async (
  endpoint: string,
  setActiveProjectTreesPlanted
) => {
  const response = fetch(`${process.env.AWS_STORAGE}/${endpoint}`)
    .then((res) => res.json())
    .then((result) => {
      const indexedFeatures = result.features.map((feature, index) => ({
        ...feature,
        id: index,
      }))
      result.features = indexedFeatures
      setActiveProjectTreesPlanted(result)
    })
  return response
}
