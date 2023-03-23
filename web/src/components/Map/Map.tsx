import { useEffect, useState } from 'react'

import mapboxgl from 'mapbox-gl'

import {
  initializeMapboxConfig,
  projectFillLayer,
  projectOutlineLayer,
} from 'src/mapbox.config'
import 'mapbox-gl/dist/mapbox-gl.css'

export const Map = () => {
  const [map, setMap] = useState<mapboxgl.Map>()
  const [geoJson, setGeoJson] = useState()

  // Initialize Map
  useEffect(() => {
    const initializedMap = initializeMapboxConfig('map-container')
    setMap(initializedMap)
    fetchAndSetShapefiles(setGeoJson)
  }, [])

  useEffect(() => {
    map.on('load', () => {
      map.addSource('project', {
        type: 'geojson',
        data: geoJson,
      })
      map.addLayer(projectOutlineLayer('#00FF00'))
      map.addLayer(projectFillLayer('#00FF00'))
    })
  }, [geoJson, map])

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
