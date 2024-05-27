import 'mapbox-gl/dist/mapbox-gl.css'

import { useEffect, useState } from 'react'

import bbox from '@turf/bbox'
import mapboxgl from 'mapbox-gl'
import { useDispatch, useSelector } from 'react-redux'

import { navigate } from '@redwoodjs/router'

import { MAPBOX_FOG, initializeMapbox } from 'src/mapbox.config'
// import { setClickedCoordinates } from 'src/reducers/displayReducer'
import { setInfoOverlay } from 'src/reducers/overlaysReducer'
import { setProjectId } from 'src/reducers/projectsReducer'

import { BasketDetails } from '../Overlays/BasketDetails'
import { TreeInfoBox } from '../Overlays/Info/TreeInfoBox'
import { InfoOverlay } from '../Overlays/InfoOverlay'
import { ProfileOverlay } from '../Overlays/ProfileOverlay'

import Button from './components/Button'
import { LandCoverLegend } from './components/LandCoverLegend'
import { LayerPickerOverlay } from './components/LayerPickerOverlay'
import { SearchOverlay } from './components/SearchOverlay'
import { TimeSlider } from './components/TimeSlider'
import UrlUpdater from './components/UrlUpdater'
import {
  fetchProjectInfo,
  fetchTreeShapefile,
  fetchGainForestCenterpoints,
  fetchProjectPolygon,
  fetchAllSiteData,
  // fetchHexagons,
  fetchHiveLocations,
} from './mapfetch'
import { spinGlobe } from './maprotate'
import { getSpeciesName } from './maptreeutils'
import {
  addAllSourcesAndLayers,
  addClickableMarkers,
  getTreeInformation,
} from './maputils'
import { addFlightPathSourceAndLayer } from './sourcesAndLayers/flightPath'
import { addOrthomosaic } from './sourcesAndLayers/mapboxOrthomosaic'
import { toggleMeasuredTreesLayer } from './sourcesAndLayers/measuredTrees'

export const Map = ({ initialOverlay, urlProjectId, mediaSize }) => {
  const dispatch = useDispatch()
  const activeProjectId = useSelector((state: State) => state.project.id)
  const setActiveProjectId = (id) => dispatch(setProjectId(id))
  const infoOverlay = useSelector((state: State) => state.overlays.info)
  const [map, setMap] = useState<mapboxgl.Map>()
  const [markers, setMarkers] = useState([])
  // TODO: Combine these two following useStates into one
  const [gainforestCenterpoints, setGainForestCenterpoints] = useState()
  // const [hexagons, setHexagons] = useState()
  const [hiveLocations, setHiveLocations] = useState()
  const [activeProjectPolygon, setActiveProjectPolygon] = useState() // The project's main site
  const [allSitePolygons, setAllSitePolygons] = useState()
  const [activeProjectData, setActiveProjectData] = useState()
  const [activeProjectTreesPlanted, setActiveProjectTreesPlanted] = useState()
  const [activeProjectMosaic, setActiveProjectMosaic] = useState()
  const [maximize, setMaximize] = useState<boolean>(false)
  const [treeData, setTreeData] = useState({})
  const [landCover, setLandCover] = useState(false)
  const [searchInput, setSearchInput] = useState<string>()
  const [selectedSpecies, setSelectedSpecies] = useState('')
  // const numHexagons = useRef(0)

  // Initialize map, fetch all global data
  useEffect(() => {
    fetchGainForestCenterpoints(setGainForestCenterpoints)
    // fetchHexagons(setHexagons)
    initializeMapbox(
      'map-container',
      setMap,
      [-93.518543, -25.006906, -27.073231, 12.038313]
    )
  }, [])

  useEffect(() => {
    if (urlProjectId && !activeProjectId) {
      dispatch(setProjectId(urlProjectId))
    }
  }, [urlProjectId, activeProjectId])

  // Set initial layers on load
  useEffect(() => {
    if (map && gainforestCenterpoints) {
      const onLoad = () => {
        map.setFog(MAPBOX_FOG)
        addAllSourcesAndLayers(map, hiveLocations, setMarkers)
        // if (
        //   activeProjectId ==
        //   'fd0836703e420812c278b9a90c591788e62c4aee5c6b0a98e54af750523c258a'
        // ) {
        //   addFlightPathSourceAndLayer(map)
        // }
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
        map.setFog(MAPBOX_FOG)
        addAllSourcesAndLayers(map, hiveLocations, setMarkers)
      }
      map.on('load', onLoad)
      map.on('styledata', onStyleData)
      return () => {
        map.off('load', onLoad)
        map.off('styledata', onStyleData)
      }
    }
  }, [map, gainforestCenterpoints, dispatch, hiveLocations])

  // // Rotate the globe
  // useEffect(() => {
  //   if (map) {
  //     // Start the spin
  //     let isGlobeSpinning = true
  //     spinGlobe(map, isGlobeSpinning)

  //     // Spin again once the animation is complete
  //     const onMoveEnd = () => {
  //       spinGlobe(map, isGlobeSpinning)
  //     }
  //     map.on('moveend', onMoveEnd)

  //     const onMouseDown = () => {
  //       isGlobeSpinning = false
  //     }
  //     map.on('mousedown', onMouseDown)

  //     const onTouchStart = () => {
  //       isGlobeSpinning = false
  //     }
  //     map.on('touchstart', onTouchStart)

  //     return () => {
  //       if (map) {
  //         map.off('moveend', onMoveEnd)
  //         map.off('mousedown', onMouseDown)
  //         map.off('touchstart', onTouchStart)
  //       }
  //     }
  //   }
  // }, [map])

  useEffect(() => {
    if (map && allSitePolygons) {
      map.on('styledata', () => {
        map.getSource('allSites')?.setData(allSitePolygons)
      })
    }
  }, [map, allSitePolygons])

  // Fetch project data to display on the overlay
  // Fetch default project site
  useEffect(() => {
    if (activeProjectId) {
      navigate(`/${activeProjectId}`)
      setTreeData({})
      setSelectedSpecies('')
      const fetchData = async () => {
        const result = await fetchProjectInfo(activeProjectId)
        setActiveProjectData(result)
        const shapefiles = result?.project?.assets?.filter(
          (d) => d?.classification == 'Shapefiles'
        )
        const projectPolygonCID = shapefiles?.filter(
          (d) => d?.shapefile?.default == true
        )?.[0]?.awsCID
        await fetchProjectPolygon(projectPolygonCID, setActiveProjectPolygon)
        const endpoints = shapefiles.map((d) => d?.awsCID)
        await fetchAllSiteData(endpoints, setAllSitePolygons)
        const projectMosaic = result?.project?.assets?.find(
          (d) => d.classification == 'Drone Mosaic'
        )?.awsCID
        setActiveProjectMosaic(projectMosaic)
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

  // If the active project change, zoom in to the default project site and change
  // its color
  useEffect(() => {
    if (map && activeProjectPolygon) {
      if (activeProjectData) {
        setSearchInput(activeProjectData?.project?.name)
      }
      const boundingBox = bbox(activeProjectPolygon)
      map.fitBounds(boundingBox, {
        padding: { top: 40, bottom: 40, left: 40, right: 40 },
      })
      map.getSource('highlightedSite')?.setData(activeProjectPolygon)
    }
  }, [map, activeProjectPolygon])

  // Fetch tree data
  useEffect(() => {
    if (activeProjectData) {
      const projectName = activeProjectData?.project?.name
      const dashedProjectName = projectName?.toLowerCase().replaceAll(' ', '-')
      if (dashedProjectName) {
        const treesEndpoint = `shapefiles/${dashedProjectName}-all-tree-plantings.geojson`
        const fetchData = async () => {
          await fetchTreeShapefile(treesEndpoint, setActiveProjectTreesPlanted)
        }
        fetchData().catch(console.error)
      }
    }
  }, [activeProjectData])

  useEffect(() => {
    addOrthomosaic(map, activeProjectMosaic)
  }, [map, activeProjectMosaic])

  useEffect(() => {
    if (!map) return
    const isMounted = true
    if (map && activeProjectTreesPlanted && isMounted) {
      const normalizedData = { ...activeProjectTreesPlanted }
      normalizedData.features = normalizedData.features.map((feature) => {
        feature.properties.species = getSpeciesName(feature.properties).trim()
        return feature
      })
      if (activeProjectTreesPlanted !== normalizedData) {
        const updateData = () => {
          map.getSource('trees')?.setData(normalizedData)
        }
        map.on('styledata', updateData)
        return () => {
          map.off('styledata', updateData)
        }
      }
    } else {
      map.getSource('trees')?.setData({
        type: 'FeatureCollection',
        features: [],
      })
    }
  }, [map, activeProjectTreesPlanted])

  useEffect(() => {
    if (map && map.isStyleLoaded()) {
      let colorExpression
      let radiusExpression
      if (selectedSpecies) {
        colorExpression = [
          'case',
          [
            'all',
            ['==', ['get', 'species'], selectedSpecies],
            ['boolean', ['feature-state', 'hover'], false],
          ],
          'red', // when isSelectedSpecies && hover
          ['==', ['get', 'species'], selectedSpecies],
          '#FF8101', // when isSelectedSpecies && !hover
          ['boolean', ['feature-state', 'hover'], false],
          'gray', // when !isSelectedSpecies && hover
          'gray', // when !isSelectedSpecies && !hover
        ]
        radiusExpression = [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          8, // when hover (either isSelectedSpecies or not)
          ['==', ['get', 'species'], selectedSpecies],
          6, // when isSelectedSpecies && !hover
          3, // when !isSelectedSpecies && !hover
        ]
      } else {
        colorExpression = [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          '#0883fe', // when no selectedSpecies && hover
          '#ff77c1', // when no selectedSpecies && !hover
        ]
        radiusExpression = [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          8, // when no selectedSpecies && hover
          4, // when no selectedSpecies && !hover
        ]
      }

      map.setPaintProperty('unclusteredTrees', 'circle-color', colorExpression)
      map.setPaintProperty(
        'unclusteredTrees',
        'circle-radius',
        radiusExpression
      )
    }
  }, [map, selectedSpecies])

  // Set hovered tree ID on mouse move
  useEffect(() => {
    if (map) {
      let hoveredTreeId = null
      const onClickProjectFill = () => {
        toggleMeasuredTreesLayer(map, 'visible')
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

  return (
    <>
      <div style={{ height: '100%', width: '100%' }} id="map-container" />
      <ProfileOverlay />
      <BasketDetails />
      {gainforestCenterpoints && (
        <SearchOverlay
          map={map}
          allCenterpoints={gainforestCenterpoints}
          mediaSize={mediaSize}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
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
            selectedSpecies={selectedSpecies}
            setSelectedSpecies={setSelectedSpecies}
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
      {landCover && <LandCoverLegend mediaSize={mediaSize} />}
      <LayerPickerOverlay
        map={map}
        activeProjectMosaic={activeProjectMosaic}
        activeProjectData={activeProjectData}
        activeProjectPolygon={activeProjectPolygon}
        mediaSize={mediaSize}
        maximize={maximize}
        landCover={landCover}
        setLandCover={setLandCover}
      />
      <TimeSlider map={map} mediaSize={mediaSize} />
    </>
  )
}

export default Map
