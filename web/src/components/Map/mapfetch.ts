import geojson2h3 from 'geojson2h3'

export const fetchMeasuredTrees = (
  activeProjectData,
  setActiveProjectTreesPlanted
) => {
  const projectName = activeProjectData?.project?.name
  const dashedProjectName = projectName?.toLowerCase().replaceAll(' ', '-')
  if (dashedProjectName) {
    const treesEndpoint = `canopy/${dashedProjectName}.geojson`
    const fetchData = async () => {
      await fetchTreeShapefile(treesEndpoint, setActiveProjectTreesPlanted)
    }
    fetchData().catch(console.error)
  }
}

export const fetchHiveLocations = async (map, activeProjectId) => {
  if (
    activeProjectId ==
    '7f7b643aca10dae0c71afc9910b3f67bff441504d97e0d90a12c40db5d2d02c1'
  ) {
    let hiveLocations = undefined

    await fetch(
      `${process.env.AWS_STORAGE}/points-of-interest/hive-locations.geojson`
    )
      .then((response) => response.json())
      .then((res) => {
        hiveLocations = res
      })
    map.getSource('hiveSource')?.setData(hiveLocations)
  }
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

export const fetchGainForestCenterpoints = async (map) => {
  let gainforestCenterpoints = undefined
  await fetch(
    `${process.env.AWS_STORAGE}/shapefiles/gainforest-all-shapefiles.geojson`
  )
    .then((response) => response.json())
    .then((res) => (gainforestCenterpoints = res))
  map.getSource('gainforestMarkerSource')?.setData(gainforestCenterpoints)
}

export const fetchProjectInfo = async (projectId) => {
  const endpoint = `${process.env.DIRECTUS_ENDPOINT}/graphql/items/project`

  const response = fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query {
        project(filter: {legacyId:{ _eq: "${projectId}"}}) {
            id: legacyId
            name
            country
            dataDownloadUrl
            dataDownloadInfo
            description
            longDescription
            stripeUrl
            lat
            lon
            area
            objective

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
  const response = await fetch(`${process.env.AWS_STORAGE}/${endpoint}`)
  if (response.ok) {
    const result = await response.json()
    const indexedFeatures = result.features.map((feature, index) => ({
      ...feature,
      id: index,
    }))
    result.features = indexedFeatures
    setActiveProjectTreesPlanted(result)
    return response
  } else {
    setActiveProjectTreesPlanted(null)
  }
}
