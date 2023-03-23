import { useEffect, useState } from 'react'

import mapboxgl from 'mapbox-gl'

import { initializeMapboxConfig } from 'src/mapbox.config'

import { addSourcesAndLayers, fetchAndSetShapefiles } from './maputils'

import 'mapbox-gl/dist/mapbox-gl.css'

export const Map = () => {
  const [map, setMap] = useState<mapboxgl.Map>()
  const [geoJson, setGeoJson] = useState()

  // Initialize Map
  useEffect(() => {
    initializeMapboxConfig('map-container', setMap)
    fetchAndSetShapefiles(setGeoJson)
  }, [])

  useEffect(() => {
    if (map && geoJson) {
      map.on('load', () => {
        addSourcesAndLayers(map, geoJson)
      })
    }
  }, [geoJson, map])

  return <div style={{ height: '100%', width: '100%' }} id="map-container" />
}

export default Map
