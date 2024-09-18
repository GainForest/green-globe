// Create geojson centerpoints from an array of latitudes
// and longitudes
// Input: an hash of [projectName]: [lat, lon]

export const createGeojsonCenterpoints = (allProjects) => {
  // Create the GeoJSON structure
  const geoJSON = {
    type: 'FeatureCollection',
    features: [],
  }

  // Iterate through the input data
  for (const item of allProjects) {
    // Check if the item has the required properties
    if (item.name && item.lon && item.lat) {
      const feature = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [parseFloat(item.lon), parseFloat(item.lat)],
        },
        properties: {
          name: item.name,
          projectId: item.legacyId,
          country: item.country,
        },
      }
      geoJSON.features.push(feature)
    }
  }

  return geoJSON
}
