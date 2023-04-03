import { useEffect, useState } from 'react'

import bbox from '@turf/bbox'
import mapboxgl from 'mapbox-gl'

import { initializeMapbox } from 'src/mapbox.config'

import { InfoOverlay } from './components/InfoOverlay'
import { LayerPickerOverlay } from './components/LayerPickerOverlay'
import { SearchOverlay } from './components/SearchOverlay'
import {
  fetchProjectInfo,
  fetchShapefiles,
  fetchTreeShapefile,
} from './mapfetch'
import {
  addSourcesLayersAndMarkers,
  addTreesPlantedSourceAndLayers,
  getPopupTreeInformation,
  popup,
  toggleTreesPlantedLayer,
} from './maputils'

import 'mapbox-gl/dist/mapbox-gl.css'

export const Map = () => {
  const [map, setMap] = useState<mapboxgl.Map>()
  const [displayOverlay, setDisplayOverlay] = useState<boolean>(false)
  const [projectPolygons, setAllProjectPolygons] = useState()
  const [activeProject, setActiveProject] = useState()
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
          setActiveProject,
          setDisplayOverlay
        )
      })
    }
  }, [map, projectPolygons])

  // If the active project changes, always display overlay and tree data again
  useEffect(() => {
    // TODO: a lot of error checking
    const projectPolygon = projectPolygons?.features.find((d) =>
      d.properties.name.includes(activeProject)
    )
    setActiveProjectPolygon(projectPolygon)

    if (map && projectPolygon) {
      setDisplayOverlay(true)
      toggleTreesPlantedLayer(map, 'visible')
      const boundingBox = bbox(projectPolygon)
      map.fitBounds(boundingBox, {
        padding: { top: 40, bottom: 40, left: 420, right: 40 },
      })
    }
  }, [map, activeProject, projectPolygons])

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
  }, [activeProjectData])

  // Add trees planted source and layers on every stsyle change
  useEffect(() => {
    if (map && activeProjectTreesPlanted) {
      addTreesPlantedSourceAndLayers(map, activeProjectTreesPlanted)
      map.on('styledata', () => {
        addTreesPlantedSourceAndLayers(map, activeProjectTreesPlanted)
      })
    }
  }, [map, activeProjectTreesPlanted])

  // Remove layers when you exit the display overlay
  useEffect(() => {
    if (map) {
      // map.on('click', (e) => {
      //   console.log(map.getCanvas().style)
      //   if (displayOverlay) {
      //     setDisplayOverlay(false)
      //     map.setLayoutProperty('unclusteredTrees', 'visibility', 'none')
      //   }
      // })
    }
    if (map && map.getLayer('unclusteredTrees')) {
      if (!displayOverlay) {
        toggleTreesPlantedLayer(map, 'none')
      }
    }

    if (map) {
      // Remove the on mouse move once you get out of the unclustered trees
      map.on('mousemove', 'unclusteredTrees', (e) => {
        popup.remove()

        const { treePhoto, treeID, treeName, treeHeight, treeDBH } =
          getPopupTreeInformation(e, activeProject)
        const lngLat = [e.lngLat.lng, e.lngLat.lat]

        if (treeID != 'unknown') {
          popup
            .setLngLat(lngLat)
            .setHTML(
              `<object width="200" height="200" data="${treePhoto}">
            <img width="200" height="200" src="${process.env.AWS_STORAGE}/miscellaneous/placeholders/taxa_plants.png" />
            </object> <br /><b>ID:</b> <div overflowWrap="break-word"> ${treeID} </div> <br /><b>Species:</b> ${treeName} <br /> <b> Plant height: </b> ${treeHeight} <br /> <b> DBH: </b> ${treeDBH} cm`
            )
            .addTo(map)
        }
      })
      map.on('mouseleave', 'unclusteredTrees', (e) => {
        popup.remove()
      })
    }
  }, [map, activeProject, displayOverlay])
  return (
    <>
      <div style={{ height: '100%', width: '100%' }} id="map-container" />
      <SearchOverlay setActiveProject={setActiveProject} />
      {displayOverlay && (
        <InfoOverlay
          activeProjectData={activeProjectData}
          setDisplayOverlay={setDisplayOverlay}
        />
      )}
      <LayerPickerOverlay map={map} displayOverlay={displayOverlay} />
    </>
  )
}

export default Map
