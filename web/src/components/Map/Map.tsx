import 'mapbox-gl/dist/mapbox-gl.css'

import { useEffect, useState } from 'react'

import bbox from '@turf/bbox'
import mapboxgl from 'mapbox-gl'
import { useColorMode } from 'theme-ui'

import { initializeMapbox } from 'src/mapbox.config'

import { InfoOverlay } from './components/InfoOverlay'
import { LayerPickerOverlay } from './components/LayerPickerOverlay'
import { SearchOverlay } from './components/SearchOverlay'
import { TimeSlider } from './components/TimeSlider'
import {
  fetchProjectInfo,
  fetchTreeShapefile,
  fetchHexagons,
  fetchGainForestCenterpoints,
  fetchProjectPolygon,
} from './mapfetch'
import { spinGlobe } from './maprotate'
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
  const [_, setColorMode] = useColorMode()
  const [__, setMarkers] = useState([])
  const [displayOverlay, setDisplayOverlay] = useState<boolean>(false)
  // TODO: Combine these two following useStates into one
  const [gainforestCenterpoints, setGainForestCenterpoints] = useState()
  const [hexagons, setHexagons] = useState()
  const [activeProjectId, setActiveProjectId] = useState()
  const [activeProjectPolygon, setActiveProjectPolygon] = useState() // The feature that was clicked on
  const [activeProjectData, setActiveProjectData] = useState()
  const [activeProjectTreesPlanted, setActiveProjectTreesPlanted] = useState()

  // Fetch all prerequisite data for map initialization
  useEffect(() => {
    fetchGainForestCenterpoints(setGainForestCenterpoints)
    fetchHexagons(setHexagons)
    setColorMode('dark')
  }, [])

  // Initialize Map
  useEffect(() => {
    if (gainforestCenterpoints) {
      initializeMapbox('map-container', setMap)
    }
  }, [gainforestCenterpoints])

  // Set initial layers on load
  useEffect(() => {
    if (map && hexagons && gainforestCenterpoints) {
      map.on('load', () => {
        addAllSourcesAndLayers(map, hexagons)
        const gainForestMarkers = addMarkers(
          map,
          gainforestCenterpoints,
          'gainforest',
          setActiveProjectId,
          setDisplayOverlay
        )

        setMarkers([...gainForestMarkers])
      })
      map.on('styledata', () => {
        addAllSourcesAndLayers(map, hexagons)
      })
    }
  }, [map, gainforestCenterpoints, hexagons])

  // Rotate the globe
  useEffect(() => {
    if (map) {
      // Start the spin
      let isGlobeSpinning = true
      spinGlobe(map, isGlobeSpinning)
      // Spin again once the animation is complete
      map.on('moveend', () => {
        spinGlobe(map, isGlobeSpinning)
      })
      map.on('mousedown', () => {
        isGlobeSpinning = false
      })
    }
  }, [map])

  // Fetch project data to display on the overlay
  // Fetch default project site
  useEffect(() => {
    if (activeProjectId) {
      const fetchData = async () => {
        const projectPolygonCID = await fetchProjectInfo(
          activeProjectId,
          setActiveProjectData
        )
        await fetchProjectPolygon(projectPolygonCID, setActiveProjectPolygon)
      }
      fetchData().catch(console.error)
    }
  }, [activeProjectId])

  // If the active project changes
  // Display project boundaries, the overlay, and the trees planted
  // Re-draw on style change.
  useEffect(() => {
    if (map && activeProjectPolygon) {
      // TODO: Take into account all of the shapefiles the project has
      map.getSource('project').setData(activeProjectPolygon)
      map.on('styledata', () => {
        map.getSource('project').setData(activeProjectPolygon)
      })
      setDisplayOverlay(true)
      toggleTreesPlantedLayer(map, 'visible')
      const boundingBox = bbox(activeProjectPolygon)
      map.fitBounds(boundingBox, {
        padding: { top: 40, bottom: 40, left: 420, right: 40 },
      })
    }
  }, [map, activeProjectPolygon])

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
    if (map && activeProjectTreesPlanted) {
      // Needed on initial fetch
      addTreesPlantedSourceAndLayers(map, activeProjectTreesPlanted)
      // For every upcoming style change
      map.on('styledata', () => {
        addTreesPlantedSourceAndLayers(map, activeProjectTreesPlanted)
      })
    }
  }, [map, activeProjectTreesPlanted])

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

        const treeInformation = getPopupTreeInformation(e, activeProjectId)
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
    // TODO: separate these out
  }, [map, activeProjectId, displayOverlay])

  useEffect(() => {
    if (map) {
      let hoveredHexagonId = null
      map.on('mousemove', 'hexagonHoverFill', (e) => {
        if (e.features.length > 0) {
          if (hoveredHexagonId !== null) {
            map.setFeatureState(
              { source: 'hexagons', id: hoveredHexagonId },
              { hover: false }
            )
          }
          hoveredHexagonId = e.features[0]?.id
          map.setFeatureState(
            { source: 'hexagons', id: hoveredHexagonId },
            { hover: true }
          )
        }
      })

      map.on('mouseleave', 'hexagonHoverFill', () => {
        if (hoveredHexagonId !== null) {
          map.setFeatureState(
            { source: 'hexagons', id: hoveredHexagonId },
            { hover: false }
          )
          hoveredHexagonId = null
        }
      })
    }
  }, [map])

  return (
    <>
      <div style={{ height: '100%', width: '100%' }} id="map-container" />
      {hexagons && gainforestCenterpoints && (
        <SearchOverlay
          map={map}
          setActiveProject={setActiveProjectId}
          allCenterpoints={gainforestCenterpoints}
        />
      )}
      {/* <BackToGlobe map={map} /> */}
      {displayOverlay && (
        <InfoOverlay
          activeProjectData={activeProjectData}
          activeProjectPolygon={activeProjectPolygon}
          setActiveProjectPolygon={setActiveProjectPolygon}
          setDisplayOverlay={setDisplayOverlay}
        />
      )}
      {/* <ProjectSeriesPickerOverlay
        map={map}
        markers={markers}
        setDisplayOverlay={setDisplayOverlay}
        setActiveProject={setActiveProjectId}
        projectPolygons={gainforestCenterpoints}
        setMarkers={setMarkers}
      /> */}
      <LayerPickerOverlay map={map} />
      <TimeSlider map={map} />
    </>
  )
}

export default Map
