import 'mapbox-gl/dist/mapbox-gl.css'

import { useEffect, useState, useRef } from 'react'

import bbox from '@turf/bbox'
import mapboxgl from 'mapbox-gl'
import { useDispatch, useSelector } from 'react-redux'

import { navigate } from '@redwoodjs/router'

import { initializeMapbox } from 'src/mapbox.config'
import { setClickedCoordinates } from 'src/reducers/displayReducer'
import { setInfoOverlay } from 'src/reducers/overlaysReducer'
import { setProjectId } from 'src/reducers/projectsReducer'

import { BasketDetails } from '../Overlays/BasketDetails'
import { TreeInfoBox } from '../Overlays/Info/TreeInfoBox'
import { InfoOverlay } from '../Overlays/InfoOverlay'
import { ProfileOverlay } from '../Overlays/ProfileOverlay'

import Button from './components/Button'
import { LayerPickerOverlay } from './components/LayerPickerOverlay'
import { SearchOverlay } from './components/SearchOverlay'
import { TimeSlider } from './components/TimeSlider'
import UrlUpdater from './components/UrlUpdater'
import {
  fetchProjectInfo,
  fetchTreeShapefile,
  fetchGainForestCenterpoints,
  fetchProjectPolygon,
  fetchHexagons,
  fetchHiveLocations,
} from './mapfetch'
import { spinGlobe } from './maprotate'
import {
  addAllSourcesAndLayers,
  addClickableMarkers,
  addTreesPlantedSourceAndLayers,
  getTreeInformation,
  toggleTreesPlantedLayer,
} from './maputils'

export const Map = ({ initialOverlay, mediaSize }) => {
  const dispatch = useDispatch()
  const activeProjectId = useSelector((state: State) => state.project.id)
  const setActiveProjectId = (id) => dispatch(setProjectId(id))
  const infoOverlay = useSelector((state: State) => state.overlays.info)
  const [map, setMap] = useState<mapboxgl.Map>()
  const [markers, setMarkers] = useState([])
  // TODO: Combine these two following useStates into one
  const [gainforestCenterpoints, setGainForestCenterpoints] = useState()
  const [hexagons, setHexagons] = useState()
  const [hiveLocations, setHiveLocations] = useState()
  const [activeProjectPolygon, setActiveProjectPolygon] = useState() // The feature that was clicked on
  const [activeProjectData, setActiveProjectData] = useState()
  const [activeProjectTreesPlanted, setActiveProjectTreesPlanted] = useState()
  const [activeProjectMosaic, setActiveProjectMosaic] = useState()
  const [maximize, setMaximize] = useState<boolean>(false)
  const [treeData, setTreeData] = useState({})
  const numHexagons = useRef(0)

  // Fetch all prerequisite data for map initialization
  useEffect(() => {
    fetchGainForestCenterpoints(setGainForestCenterpoints)
    fetchHexagons(setHexagons)
  }, [])

  // Initialize Map
  useEffect(() => {
    if (gainforestCenterpoints) {
      initializeMapbox('map-container', setMap, mediaSize)
    }
  }, [gainforestCenterpoints])

  // Set initial layers on load
  useEffect(() => {
    if (map && gainforestCenterpoints && hexagons) {
      const onLoad = () => {
        map.setFog({
          color: '#000000', // Lower atmosphere
          'high-color': 'rgb(36, 92, 223)', // Upper atmosphere
          'horizon-blend': 0.02, // Atmosphere thickness
          'space-color': 'rgb(11, 11, 25)', // Background color
          'star-intensity': 0.05, // Background star brightness
        })
        addAllSourcesAndLayers(map, hexagons, hiveLocations, setMarkers)
        const gainForestMarkers = addClickableMarkers(
          map,
          dispatch,
          gainforestCenterpoints,
          'gainforest',
          setActiveProjectId
        )

        setMarkers([...gainForestMarkers])
      }

      const onStyleData = () => {
        map.setFog({
          color: '#000000', // Lower atmosphere
          'high-color': 'rgb(36, 92, 223)', // Upper atmosphere
          'horizon-blend': 0.02, // Atmosphere thickness
          'space-color': 'rgb(11, 11, 25)', // Background color
          'star-intensity': 0.05, // Background star brightness
        })
        addAllSourcesAndLayers(map, hexagons, hiveLocations, setMarkers)
      } // This was a misplaced closing parenthesis, corrected to a curly brace

      // These event listeners or similar logic were presumably intended to be set here
      map.on('load', onLoad)
      map.on('styledata', onStyleData)
    }
  }, [map, gainforestCenterpoints, hexagons, dispatch, hiveLocations]) // Added missing closing bracket for useEffect

  // Rotate the globe
  useEffect(() => {
    if (map) {
      // Start the spin
      let isGlobeSpinning = true
      spinGlobe(map, isGlobeSpinning)

      // Spin again once the animation is complete
      const onMoveEnd = () => {
        spinGlobe(map, isGlobeSpinning)
      }
      map.on('moveend', onMoveEnd)

      const onMouseDown = () => {
        isGlobeSpinning = false
      }
      map.on('mousedown', onMouseDown)

      const onTouchStart = () => {
        isGlobeSpinning = false
      }
      map.on('touchstart', onTouchStart)

      return () => {
        if (map) {
          map.off('moveend', onMoveEnd)
          map.off('mousedown', onMouseDown)
          map.off('touchstart', onTouchStart)
        }
      }
    }
  }, [map])

  // Fetch project data to display on the overlay
  // Fetch default project site
  useEffect(() => {
    if (activeProjectId) {
      navigate(`/${activeProjectId}`)
      setTreeData({})
      const fetchData = async () => {
        const result = await fetchProjectInfo(activeProjectId)
        const projectPolygonCID = result?.project?.assets
          ?.filter((d) => d?.classification == 'Shapefiles')
          .filter((d) => d?.shapefile?.default == true)?.[0]?.awsCID
        const projectMosaic = result?.project?.assets?.filter(
          (d) => d?.classification == 'Drone Mosaic'
        )
        setActiveProjectData(result)
        setActiveProjectMosaic(projectMosaic)
        await fetchProjectPolygon(projectPolygonCID, setActiveProjectPolygon)
      }
      if (
        activeProjectId ==
          '7f7b643aca10dae0c71afc9910b3f67bff441504d97e0d90a12c40db5d2d02c1' &&
        !hiveLocations
      ) {
        fetchHiveLocations(setHiveLocations)
      } else {
        const nonHiveMarkers = markers.filter((marker) => {
          if (marker._element.className.includes('hive')) {
            marker.remove()
            return false
          }
          return true
        })
        setMarkers(nonHiveMarkers)
        setHiveLocations(null)
      }
      fetchData().catch(console.error)
    }
  }, [activeProjectId])

  useEffect(() => {
    if (initialOverlay) {
      const overlayValue = parseInt(initialOverlay, 10)
      dispatch(setInfoOverlay(overlayValue))
    }
  }, [initialOverlay, dispatch])

  // If the active project changes
  // Display project boundaries, the overlay, and the trees planted
  // Re-draw on style change.
  useEffect(() => {
    if (map && activeProjectPolygon) {
      // TODO: Take into account all of the shapefiles the project has
      map.getSource('project')?.setData(activeProjectPolygon)
      !infoOverlay && dispatch(setInfoOverlay(1))
      toggleTreesPlantedLayer(map, 'visible')
      const boundingBox = bbox(activeProjectPolygon)
      map.fitBounds(boundingBox, {
        padding: { top: 40, bottom: 40, left: 40, right: 40 },
      })
    }
  }, [map, activeProjectPolygon])

  // Fetch tree data
  useEffect(() => {
    if (activeProjectData) {
      const projectName = activeProjectData?.project?.name
        .toLowerCase()
        .replaceAll(' ', '-')
      if (projectName) {
        const treesEndpoint = `shapefiles/${projectName}-all-tree-plantings.geojson`
        const fetchData = async () => {
          await fetchTreeShapefile(treesEndpoint, setActiveProjectTreesPlanted)
        }
        fetchData().catch(console.error)
      }
    }
  }, [activeProjectData])

  // Display tree data
  // Add trees planted source and layers on every style change
  useEffect(() => {
    if (map && activeProjectTreesPlanted) {
      // Needed on initial fetch
      addTreesPlantedSourceAndLayers(map, activeProjectTreesPlanted)
    }
  }, [map, activeProjectTreesPlanted])

  // Hexagon onclick
  useEffect(() => {
    if (map) {
      const onClick = (e) => {
        console.log(e)
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
      }

      map.on('click', 'hexagonHoverFill', onClick)

      return () => {
        if (map) {
          map.off('click', 'hexagonHoverFill', onClick)
        }
      }
    }
  }, [map])

  // Remove layers when you exit the display overlay
  useEffect(() => {
    if (map) {
      let hoveredTreeId = null
      const onClickProjectFill = () => {
        toggleTreesPlantedLayer(map, 'visible')
      }
      const onMouseMoveUnclusteredTrees = (e) => {
        if (e.features.length > 0) {
          const treeInformation = getTreeInformation(e, activeProjectId)
          setTreeData(treeInformation)
          if (hoveredTreeId !== null) {
            map.setFeatureState(
              { source: 'trees', id: hoveredTreeId },
              { hover: false }
            )
          }
          hoveredTreeId = e.features[0].id
          map.setFeatureState(
            { source: 'trees', id: hoveredTreeId },
            { hover: true }
          )
        }
      }
      map.on('click', 'projectFill', onClickProjectFill)
      map.on('mousemove', 'unclusteredTrees', onMouseMoveUnclusteredTrees)
      return () => {
        if (map) {
          map.off('click', 'projectFill', onClickProjectFill)
          map.off('mousemove', 'unclusteredTrees', onMouseMoveUnclusteredTrees)
        }
      }
    }
  }, [map, activeProjectId, infoOverlay])

  useEffect(() => {
    if (map) {
      let hoveredHexagonId = null
      const onMouseMoveHexagonHoverFill = (e) => {
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
      }
      const onMouseLeaveHexagonHoverFill = () => {
        if (hoveredHexagonId !== null) {
          map.setFeatureState(
            { source: 'hexagons', id: hoveredHexagonId },
            { hover: false }
          )
          hoveredHexagonId = null
        }
      }
      map.on('mousemove', 'hexagonHoverFill', onMouseMoveHexagonHoverFill)
      map.on('mouseleave', 'hexagonHoverFill', onMouseLeaveHexagonHoverFill)
      return () => {
        if (map) {
          map.off('mousemove', 'hexagonHoverFill', onMouseMoveHexagonHoverFill)
          map.off(
            'mouseleave',
            'hexagonHoverFill',
            onMouseLeaveHexagonHoverFill
          )
        }
      }
    }
  }, [map])

  return (
    <>
      <div
        style={{ height: 'calc(100% - 52px)', width: '100%' }}
        id="map-container"
      />
      <ProfileOverlay />
      <BasketDetails />
      {gainforestCenterpoints && (
        <SearchOverlay
          map={map}
          allCenterpoints={gainforestCenterpoints}
          mediaSize={mediaSize}
        />
      )}
      {/* <BackToGlobe map={map} /> */}

      {Object.values(treeData)?.length > 0 && (
        <TreeInfoBox
          treeData={treeData}
          setTreeData={setTreeData}
          mediaSize={mediaSize}
        />
      )}
      {infoOverlay && (
        <>
          <UrlUpdater />
          <InfoOverlay
            // numHexagons={numHexagons}
            activeProjectData={activeProjectData}
            activeProjectPolygon={activeProjectPolygon}
            setActiveProjectPolygon={setActiveProjectPolygon}
            mediaSize={mediaSize}
            maximize={maximize}
            setMaximize={setMaximize}
          />
        </>
      )}
      {activeProjectPolygon && !infoOverlay && (
        <Button
          style={{ position: 'absolute', bottom: '5%', left: '3%' }}
          onClick={() => dispatch(setInfoOverlay(1))}
        >
          Project Info
        </Button>
      )}
      {/* <ProjectSeriesPickerOverlay
        map={map}
        markers={markers}
        setDisplayOverlay={setDisplayOverlay}
        setActiveProject={setActiveProjectId}
        projectPolygons={gainforestCenterpoints}
        setMarkers={setMarkers}
      /> */}
      <LayerPickerOverlay
        map={map}
        activeProjectPolygon={activeProjectPolygon}
        activeProjectMosaic={activeProjectMosaic}
        mediaSize={mediaSize}
        maximize={maximize}
      />
      <TimeSlider map={map} mediaSize={mediaSize} />
    </>
  )
}

export default Map
