import { useEffect, useState } from 'react'

import mapboxgl from 'mapbox-gl'

import { initializeMapbox } from 'src/mapbox.config'

import { InfoOverlay } from './components/InfoOverlay'
import {
  addSourcesLayersAndMarkers,
  fetchProjectInfo,
  fetchShapefiles,
} from './maputils'

import 'mapbox-gl/dist/mapbox-gl.css'

export const Map = () => {
  const [map, setMap] = useState<mapboxgl.Map>()
  const [geoJson, setGeoJson] = useState()
  const [activeFeature, setActiveFeature] = useState()
  const [result, setResult] = useState()

  useEffect(() => {
    const projectId = activeFeature?.properties?.projectId

    const fetchData = async () => {
      await fetchProjectInfo(projectId, setResult)
    }

    fetchData().catch(console.error)
  }, [activeFeature])

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

  return (
    <>
      <div style={{ height: '100%', width: '100%' }} id="map-container" />
      {result && <InfoOverlay result={result} activeFeature={activeFeature} />}
    </>
  )
}

export default Map
