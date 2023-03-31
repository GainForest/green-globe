import { useEffect, useState } from 'react'

import mapboxgl from 'mapbox-gl'

import { initializeMapbox } from 'src/mapbox.config'

import { InfoOverlay } from './components/InfoOverlay'
import { SearchOverlay } from './components/SearchOverlay'
import {
  fetchProjectInfo,
  fetchShapefiles,
  fetchTreeShapefile,
} from './mapfetch'
import {
  addSourcesLayersAndMarkers,
  addTreesPlantedSourceAndLayers,
} from './maputils'

import 'mapbox-gl/dist/mapbox-gl.css'

export const Map = () => {
  const [map, setMap] = useState<mapboxgl.Map>()
  const [displayOverlay, setDisplayOverlay] = useState<boolean>(false)
  const [projectPolygons, setAllProjectPolygons] = useState()
  const [activeProjectPolygon, setActiveProjectPolygon] = useState() // The feature that was clicked on
  const [activeProjectData, setActiveProjectData] = useState()
  const [activeProjectTreesPlanted, setActiveProjectTreesPlanted] = useState()

  // Initialize Map
  useEffect(() => {
    initializeMapbox('map-container', setMap)
    fetchShapefiles(setAllProjectPolygons)
  }, [])

  // Set initial layers on load
  useEffect(() => {
    if (map && projectPolygons) {
      map.on('load', () => {
        addSourcesLayersAndMarkers(
          map,
          projectPolygons,
          setActiveProjectPolygon,
          setDisplayOverlay
        )
      })
    }
  }, [map, activeProjectTreesPlanted, projectPolygons])

  // Fetch project data to display on the overlay
  useEffect(() => {
    if (activeProjectPolygon) {
      const projectId = activeProjectPolygon?.properties?.projectId

      const fetchData = async () => {
        await fetchProjectInfo(projectId, setActiveProjectData)
      }
      fetchData().catch(console.error)
    }
  }, [activeProjectPolygon])

  // Fetch and display tree data
  useEffect(() => {
    if (activeProjectData) {
      const treesEndpoint = activeProjectData?.project?.assets?.filter((d) =>
        d.classification.includes('Measured')
      )?.[0]?.awsCID
      const fetchData = async () => {
        await fetchTreeShapefile(treesEndpoint, setActiveProjectTreesPlanted)
      }
      fetchData().catch(console.error)
    }
  }, [map, activeProjectData])

  // Add trees planted source and layers
  useEffect(() => {
    if (map && activeProjectTreesPlanted) {
      addTreesPlantedSourceAndLayers(map, activeProjectTreesPlanted)
    }
  }, [map, activeProjectTreesPlanted])

  // Remove layers when you exit the display overlay
  useEffect(() => {
    if (map) {
      map.on('click', () => {
        if (displayOverlay) {
          setDisplayOverlay(false)
          map.setLayoutProperty('unclusteredTrees', 'visibility', 'none')
        }
      })
    }
    if (map && map.getLayer('unclusteredTrees')) {
      if (!displayOverlay) {
        map.setLayoutProperty('unclusteredTrees', 'visibility', 'none')
      }
      // if (displayOverlay) {
      //   map.setLayoutProperty('unclusteredTrees', 'visibility', 'visible')
      // }
    }
  }, [map, displayOverlay])
  return (
    <>
      <div style={{ height: '100%', width: '100%' }} id="map-container" />
      <SearchOverlay />
      {activeProjectData && displayOverlay && (
        <InfoOverlay
          activeProjectData={activeProjectData}
          activeFeature={activeProjectPolygon}
          setDisplayOverlay={setDisplayOverlay}
        />
      )}
    </>
  )
}

export default Map
