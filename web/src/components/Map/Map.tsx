import 'mapbox-gl/dist/mapbox-gl.css'

import { useEffect, useState } from 'react'

import bbox from '@turf/bbox'
import mapboxgl from 'mapbox-gl'

import { initializeMapbox } from 'src/mapbox.config'

import { InfoOverlay } from './components/InfoOverlay'
import { LayerPickerOverlay } from './components/LayerPickerOverlay'
import { ProjectSeriesPickerOverlay } from './components/ProjectSeriesPickerOverlay'
import { SearchOverlay } from './components/SearchOverlay'
import { TimeSlider } from './components/TimeSlider'
import {
  fetchProjectInfo,
  fetchVerraShapefiles,
  fetchTreeShapefile,
  fetchGainForestShapefiles,
  fetchAllCenterpoints,
} from './mapfetch'
import {
  addAllSourcesAndLayers,
  addMarkers,
  addTreesPlantedSourceAndLayers,
  getPopupTreeInformation,
  popup,
  toggleTreesPlantedLayer,
  treePopupHtml,
} from './maputils'

export const Map = () => {
  const [map, setMap] = useState<mapboxgl.Map>()
  const [loaded, setLoaded] = useState<boolean>(false)
  const [markers, setMarkers] = useState([])
  const [displayOverlay, setDisplayOverlay] = useState<boolean>(false)
  // TODO: Combine these two following useStates into one
  const [allCenterpoints, setAllCenterpoints] = useState()
  const [projectPolygons, setAllProjectPolygons] = useState()
  const [verraPolygons, setVerraPolygons] = useState()
  const [activeProject, setActiveProject] = useState()
  const [activeProjectPolygon, setActiveProjectPolygon] = useState() // The feature that was clicked on
  const [activeProjectData, setActiveProjectData] = useState()
  const [activeProjectTreesPlanted, setActiveProjectTreesPlanted] = useState()

  // Initialize Map
  useEffect(() => {
    initializeMapbox('map-container', setMap)
    fetchGainForestShapefiles(setAllProjectPolygons)
    fetchAllCenterpoints(setAllCenterpoints)
    fetchVerraShapefiles(setVerraPolygons)
    setLoaded(true)
  }, [])

  // Set initial layers on load
  useEffect(() => {
    if (map && projectPolygons && verraPolygons) {
      map.on('load', () => {
        addAllSourcesAndLayers(map, projectPolygons, verraPolygons)
        const gainForestMarkers = addMarkers(
          map,
          projectPolygons,
          'gainforest',
          setActiveProjectPolygon,
          setActiveProject,
          setDisplayOverlay
        )

        setMarkers([...gainForestMarkers])
      })
      map.on('styledata', () => {
        addAllSourcesAndLayers(map, projectPolygons, verraPolygons)
      })
    }
  }, [map, projectPolygons, verraPolygons])

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

  // Fetch tree data
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

  // Display tree data
  // Add trees planted source and layers on every style change
  useEffect(() => {
    if (map && projectPolygons && activeProjectTreesPlanted) {
      // Needed on initial fetch
      addTreesPlantedSourceAndLayers(map, activeProjectTreesPlanted)
      // For every upcoming style change
      map.on('styledata', () => {
        addTreesPlantedSourceAndLayers(map, activeProjectTreesPlanted)
      })
    }
  }, [map, projectPolygons, activeProjectTreesPlanted])

  // Remove layers when you exit the display overlay
  useEffect(() => {
    if (map && map.getLayer('unclusteredTrees')) {
      if (!displayOverlay) {
        toggleTreesPlantedLayer(map, 'none')
      }
    }

    if (map) {
      map.on('click', 'projectFill', () => {
        setDisplayOverlay(!displayOverlay)
        toggleTreesPlantedLayer(map, 'visible')
      })

      // Remove the on mouse move once you get out of the unclustered trees
      map.on('mousemove', 'unclusteredTrees', (e) => {
        popup.remove()

        const treeInformation = getPopupTreeInformation(e, activeProject)
        const lngLat = [e.lngLat.lng, e.lngLat.lat]
        const { treeID } = treeInformation
        if (treeID != 'unknown') {
          popup
            .setLngLat(lngLat)
            .setHTML(treePopupHtml(treeInformation))
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
      {loaded && allCenterpoints && (
        <SearchOverlay
          map={map}
          setActiveProject={setActiveProject}
          allCenterpoints={allCenterpoints}
        />
      )}
      {/* <BackToGlobe map={map} /> */}
      {displayOverlay && (
        <InfoOverlay
          activeProjectData={activeProjectData}
          setDisplayOverlay={setDisplayOverlay}
        />
      )}
      <ProjectSeriesPickerOverlay
        map={map}
        markers={markers}
        setDisplayOverlay={setDisplayOverlay}
        setActiveProject={setActiveProject}
        verraPolygons={verraPolygons}
        projectPolygons={projectPolygons}
        setMarkers={setMarkers}
        setActiveProjectPolygon={setActiveProjectPolygon}
      />
      <LayerPickerOverlay map={map} />
      <TimeSlider map={map} />
    </>
  )
}

export default Map
