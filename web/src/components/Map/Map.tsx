import 'mapbox-gl/dist/mapbox-gl.css'

import { useEffect, useState, useRef } from 'react'

import bbox from '@turf/bbox'
import mapboxgl from 'mapbox-gl'
import { useDispatch, useSelector } from 'react-redux'
import { useColorMode } from 'theme-ui'

import { navigate } from '@redwoodjs/router'

import { initializeMapbox } from 'src/mapbox.config'
import { setClickedCoordinates } from 'src/reducers/displayReducer'
import { setInfoOverlay, showBasket } from 'src/reducers/overlaysReducer'

import { BasketDetails } from './components/BasketDetails'
import { InfoOverlay } from './components/InfoOverlay'
import { LayerPickerOverlay } from './components/LayerPickerOverlay'
import ProfileButton from './components/ProfileButton'
import { SearchOverlay } from './components/SearchOverlay'
import ShoppingCartButton from './components/ShoppingCartButton'
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

export const Map = ({ urlProjectId }) => {
  const dispatch = useDispatch()
  const infoOverlay = useSelector((state: State) => state.overlays.info)

  const [map, setMap] = useState<mapboxgl.Map>()
  const [_, setColorMode] = useColorMode()
  const [__, setMarkers] = useState([])
  // TODO: Combine these two following useStates into one
  const [gainforestCenterpoints, setGainForestCenterpoints] = useState()
  const [hexagons, setHexagons] = useState()
  const [activeProjectId, setActiveProjectId] = useState(urlProjectId)
  const [activeProjectPolygon, setActiveProjectPolygon] = useState() // The feature that was clicked on
  const [activeProjectData, setActiveProjectData] = useState()
  const [activeProjectTreesPlanted, setActiveProjectTreesPlanted] = useState()
  const numHexagons = useRef(0)

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
          dispatch,
          gainforestCenterpoints,
          'gainforest',
          setActiveProjectId
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
      navigate(`/app/${activeProjectId}`)
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
      dispatch(setInfoOverlay(1))
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

  // Hexagon onclick
  useEffect(() => {
    if (map) {
      map.on('click', 'hexagonHoverFill', (e) => {
        const { lat, lng } = e.lngLat
        dispatch(setClickedCoordinates({ lat, lon: lng }))
        dispatch(setInfoOverlay(6))
        const hoveredHexagonId = e.features[0]?.id
        if (
          map.getFeatureState({ source: 'hexagons', id: hoveredHexagonId })
            ?.clicked
        ) {
          map.setFeatureState(
            { source: 'hexagons', id: hoveredHexagonId },
            { clicked: false }
          )
          numHexagons.current = numHexagons.current - 1
        } else {
          map.setFeatureState(
            { source: 'hexagons', id: hoveredHexagonId },
            { clicked: true }
          )
          numHexagons.current = numHexagons.current + 1
        }
      })
    }
  }, [map])

  // Remove layers when you exit the display overlay
  useEffect(() => {
    if (map && map.getLayer('unclusteredTrees')) {
      if (!infoOverlay) {
        toggleTreesPlantedLayer(map, 'none')
      }
    }

    if (map) {
      map.on('click', 'projectFill', () => {
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
  }, [map, activeProjectId, infoOverlay])

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

      <BasketDetails />
      {hexagons && gainforestCenterpoints && (
        <SearchOverlay
          map={map}
          setActiveProject={setActiveProjectId}
          allCenterpoints={gainforestCenterpoints}
        />
      )}
      {/* <BackToGlobe map={map} /> */}
      {infoOverlay && (
        <InfoOverlay
          numHexagons={numHexagons}
          activeProjectData={activeProjectData}
          activeProjectPolygon={activeProjectPolygon}
          setActiveProjectPolygon={setActiveProjectPolygon}
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
