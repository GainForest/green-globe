import { useEffect, useState } from 'react'

import { initializeMapboxConfig } from 'src/mapbox.config'
import 'mapbox-gl/dist/mapbox-gl.css'

export const Map = () => {
  const [geoJson, setGeoJson] = useState()
  // Initialize Map
  useEffect(() => {
    initializeMapboxConfig('map-container')
    fetchAndSetShapefiles(setGeoJson)
  }, [])

  useEffect(() => {}, [geoJson])

  return <div style={{ height: '100%', width: '100%' }} id="map-container" />
}

export default Map

const fetchAndSetShapefiles = (setGeoJson) => {
  fetch(
    'https://gainforest-transparency-dashboard.s3.amazonaws.com/shapefiles/gainforest-all-shapefiles.geojson'
  )
    .then((response) => response.json())
    .then((newGeojson) => setGeoJson(newGeojson))
}
