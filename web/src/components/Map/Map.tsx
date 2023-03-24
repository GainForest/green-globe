import { useEffect, useState } from 'react'

import mapboxgl from 'mapbox-gl'

import { initializeMapbox } from 'src/mapbox.config'

import { addSourcesLayersAndMarkers, fetchShapefiles } from './maputils'

import 'mapbox-gl/dist/mapbox-gl.css'

export const Map = () => {
  const [map, setMap] = useState<mapboxgl.Map>()
  const [geoJson, setGeoJson] = useState()
  const [activeFeature, setActiveFeature] = useState()
  const [result, setResult] = useState()
  console.log(geoJson)

  useEffect(() => {
    const projectId = activeFeature?.properties?.projectId

    fetch('https://staging.gainforest.app/api/graphql', {
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
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((result) => setResult(result))
  }, [activeFeature])
  console.log(result)

  // Initialize Map
  useEffect(() => {
    initializeMapbox('map-container', setMap)
    fetchShapefiles(setGeoJson)
  }, [])

  useEffect(() => {
    if (map && geoJson) {
      map.on('load', () => {
        addSourcesLayersAndMarkers(map, geoJson, setActiveFeature)
      })
      // map.on('zoomend', () => {
      //   if (map.getZoom() >= 9) {
      //     map.setStyle('mapbox://styles/mapbox/satellite-v9')
      //   } else {
      //     map.setStyle('mapbox://styles/mapbox/light-v9')
      //   }
      // })
      // map.on('render', () => {
      // if (!map.getLayer('projectOutline') && !map.getLayer('projectFill')) {
      //   console.log('wtf')
      //   addSourcesLayersAndMarkers(map, geoJson)
      // }
      // })
    }
  }, [map, geoJson])

  console.log(activeFeature?.properties)
  return (
    <>
      <div style={{ height: '100%', width: '100%' }} id="map-container" />
      <div
        style={{
          height: '400px',
          width: '300px',
          position: 'absolute',
          bottom: 40,
          left: 40,
          backgroundColor: '#ffffff',
          borderRadius: '0.75em',
        }}
      >
        {activeFeature?.properties?.name || ''}
        {activeFeature?.properties?.projectId}
        {result?.data.project?.country}
        {result?.data.project?.description}
      </div>
    </>
  )
}

export default Map
