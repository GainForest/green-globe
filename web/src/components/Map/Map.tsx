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
  popup,
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
      map.setLayoutProperty('unclusteredTrees', 'visibility', 'visible')
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

  // Add trees planted source and layers
  useEffect(() => {
    if (map && activeProjectTreesPlanted) {
      addTreesPlantedSourceAndLayers(map, activeProjectTreesPlanted)
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
        map.setLayoutProperty('unclusteredTrees', 'visibility', 'none')
      }
    }
    if (map) {
      map.on('mousemove', 'unclusteredTrees', (e) => {
        popup.remove()
        const upperCaseEveryWord = (name: string) =>
          name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
        const tree = e?.features[0]?.properties

        const treeName = tree?.Plant_Name
          ? upperCaseEveryWord(tree?.Plant_Name)
          : 'unknown'
        const treeHeight = tree?.Height
          ? `${(Math.round(tree?.Height) * 100) / 100}cm`
          : 'unknown'
        // const treeID = tree?.ID || 'unknown'
        const treeDBH = tree?.DBH || 'unknown'
        const treeID =
          tree?.['FCD-tree_records-tree_photo']?.split('?id=')?.[1] ||
          tree?.ID ||
          'unknown'

        const activeProject = activeProjectPolygon?.properties?.name

        // TODO: process in the backend
        const treePhoto = tree?.tree_photo
          ? tree?.tree_photo
          : activeProject == 'Oceanus Conservation'
          ? `${process.env.AWS_STORAGE}/trees-measured/${treeID}.jpg`
          : `${process.env.AWS_STORAGE}/miscellaneous/placeholders/taxa_plants.png`

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
  }, [map, displayOverlay])
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
      {/* <LayerPickerOverlay /> */}
    </>
  )
}

export default Map
