import { useEffect, useState } from 'react'

import mapboxgl from 'mapbox-gl'

import { initializeMapbox } from 'src/mapbox.config'

import { addSourcesLayersAndMarkers, fetchShapefiles } from './maputils'

import 'mapbox-gl/dist/mapbox-gl.css'

export const Map = () => {
  const [map, setMap] = useState<mapboxgl.Map>()
  const [geoJson, setGeoJson] = useState()

  // Initialize Map
  useEffect(() => {
    initializeMapbox('map-container', setMap)
    fetchShapefiles(setGeoJson)
  }, [])

  useEffect(() => {
    if (map && geoJson) {
      map.on('load', () => {
        addSourcesLayersAndMarkers(map, geoJson)
      })
      // map.on('zoomend', () => {
      //   if (map.getZoom() >= 9) {
      //     map.setStyle('mapbox://styles/mapbox/satellite-v9')
      //   } else {
      //     map.setStyle('mapbox://styles/mapbox/light-v9')
      //   }
      // })
      map.on('render', () => {
        // if (!map.getLayer('projectOutline') && !map.getLayer('projectFill')) {
        //   console.log('wtf')
        //   addSourcesLayersAndMarkers(map, geoJson)
        // }
      })
    }
  }, [map, geoJson])

  return <div style={{ height: '100%', width: '100%' }} id="map-container" />
}

export default Map
