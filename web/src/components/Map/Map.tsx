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
    if (map && geoJson) {
      map.on('load', () => {
        map.addSource('project', {
          type: 'geojson',
          data: geoJson,
        })
        map.addLayer(projectOutlineLayer('#00FF00'))
        map.addLayer(projectFillLayer('#00FF00'))
        for (const feature of geoJson.features) {
          console.log(geoJson)
          // create a HTML element for each feature
          const el = document.createElement('div')
          el.className = 'map-marker'

          // make a marker for each feature and add to the map
          new mapboxgl.Marker(el)
            .setLngLat(feature.geometry.coordinates[0][1])
            .addTo(map)
        }
      })
    }
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
