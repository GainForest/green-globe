import { useEffect, useState } from 'react'

import mapboxgl from 'mapbox-gl'

import { initializeMapbox } from 'src/mapbox.config'

import { InfoOverlay } from './components/InfoOverlay'
import { fetchProjectInfo, fetchShapefiles } from './mapfetch'
import { addSourcesLayersAndMarkers } from './maputils'

import 'mapbox-gl/dist/mapbox-gl.css'

export const Map = () => {
  const [map, setMap] = useState<mapboxgl.Map>()
  const [projectPolygons, setAllProjectPolygons] = useState()
  const [activeProjectPolygon, setActiveProjectPolygon] = useState()
  const [activeProjectData, setActiveProjectData] = useState()
  const [activeProjectTreesPlanted, setActiveProjectTreesPlanted] = useState()

  useEffect(() => {
    const projectId = activeProjectPolygon?.properties?.projectId

    const fetchData = async () => {
      await fetchProjectInfo(projectId, setActiveProjectData)
    }

    fetchData().catch(console.error)
  }, [activeProjectPolygon])

  // Initialize Map
  useEffect(() => {
    initializeMapbox('map-container', setMap)
    fetchShapefiles(setAllProjectPolygons)
  }, [])

  useEffect(() => {
    const endpoint = activeProjectData?.project?.assets?.filter((d) =>
      d.name.includes('planted')
    )[0].awsCID
    console.log(endpoint)
  }, [activeProjectData])

  useEffect(() => {
    if (map && projectPolygons) {
      map.on('load', () => {
        addSourcesLayersAndMarkers(
          map,
          projectPolygons,
          setActiveProjectPolygon
        )
      })
    }
  }, [map, projectPolygons])

  return (
    <>
      <div style={{ height: '100%', width: '100%' }} id="map-container" />
      {activeProjectData && (
        <InfoOverlay
          result={activeProjectData}
          activeFeature={activeProjectPolygon}
        />
      )}
    </>
  )
}

export default Map
