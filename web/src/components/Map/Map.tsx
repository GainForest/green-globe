import 'mapbox-gl/dist/mapbox-gl.css'

import { useEffect, useReducer, useState } from 'react'

import bbox from '@turf/bbox'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import mapboxgl from 'mapbox-gl'
import { useDispatch, useSelector } from 'react-redux'

import { navigate } from '@redwoodjs/router'

import XprizeLayerPicker from 'src/components/Map/components/XprizeLayerPicker'
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
// import { LayerPickerOverlay } from './components/LayerPickerOverlay'
import { SearchOverlay } from './components/SearchOverlay'
// import { TimeSlider } from './components/TimeSlider'
import UrlUpdater from './components/UrlUpdater'
import { fetchEDNALocations, fetchMeasuredTrees } from './mapfetch'
import {
  fetchProjectInfo,
  fetchTreeShapefile,
  fetchGainForestCenterpoints,
  fetchProjectPolygon,
  fetchAllSiteData,
  // fetchHexagons,
  fetchHiveLocations,
} from './mapfetch'
// import { spinGlobe } from './maprotate'
import { getSpeciesName } from './maptreeutils'
import {
  addAllSourcesAndLayers,
  addClickableMarkers,
  getTreeInformation,
} from './maputils'
import { addOrthomosaic } from './sourcesAndLayers/mapboxOrthomosaic'
import { toggleMeasuredTreesLayer } from './sourcesAndLayers/measuredTrees'
import { toggleSelectedSpecies } from './sourcesAndLayers/selectedSpecies'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export const Map = ({ initialOverlay, urlProjectId, mediaSize }) => {
  const dispatch = useDispatch()
  const activeProjectId = useSelector((state: State) => state.project.id)
  const setActiveProjectId = (id) => dispatch(setProjectId(id))
  const infoOverlay = useSelector((state: State) => state.overlays.info)
  const [map, setMap] = useState<mapboxgl.Map>()
  const [gainforestCenterpoints, setGainForestCenterpoints] = useState()
  const [sourcesAndLayersLoaded, setSourcesAndLayersLoaded] =
    useState<boolean>(false)

  // const [hexagons, setHexagons] = useState()
  const [activeProjectPolygon, setActiveProjectPolygon] = useState() // The project's main site
  const [allSitePolygons, setAllSitePolygons] = useState()
  const [activeProjectData, setActiveProjectData] = useState()
  const [activeProjectTreesPlanted, setActiveProjectTreesPlanted] = useState()
  const [activeProjectMosaic, setActiveProjectMosaic] = useState()
  const [treeData, setTreeData] = useState({})
  const [landCover, setLandCover] = useState(false)
  const [searchInput, setSearchInput] = useState<string>()
  const [selectedSpecies, setSelectedSpecies] = useState('')
  // const numHexagons = useRef(0)

  // Initialize map, fetch all global data
  useEffect(() => {
    fetchGainForestCenterpoints(setGainForestCenterpoints)
    // fetchHexagons(setHexagons)
    initializeMapbox('map-container', setMap)
  }, [])

  // Fetch all other data that can be fetched after the map is
  // loaded.
  useEffect(() => {
    if (sourcesAndLayersLoaded) {
      fetchEDNALocations(map)
      fetchHiveLocations(map, activeProjectId)
    }
  }, [map, activeProjectId, sourcesAndLayersLoaded])

  useEffect(() => {
    if (urlProjectId && !activeProjectId) {
      dispatch(setProjectId(urlProjectId))
    }
  }, [urlProjectId, activeProjectId])

  // Fetch tree data
  useEffect(() => {
    if (activeProjectData) {
      fetchMeasuredTrees(activeProjectData, setActiveProjectTreesPlanted)
    }
  }, [activeProjectData])

  // Set initial layers on load
  useEffect(() => {
    console.log('gainforestCenterpoints', gainforestCenterpoints)
    if (map && gainforestCenterpoints) {
      const onLoad = () => {
        // map.setFog(MAPBOX_FOG)
        addAllSourcesAndLayers(map)
        addClickableMarkers(
          map,
          dispatch,
          gainforestCenterpoints,
          'gainforest',
          setActiveProjectId
        )
        setSourcesAndLayersLoaded(true)
      }

      // TODO: check - I think this only displays when all the
      // sources and layers sre added
      const onStyleData = () => {
        // map.setFog(MAPBOX_FOG)
        addAllSourcesAndLayers(map)
      }
      map.on('load', onLoad)
      map.on('styledata', onStyleData)
      return () => {
        map.off('load', onLoad)
        map.off('styledata', onStyleData)
      }
    }
  }, [map, gainforestCenterpoints])

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
      toggleSelectedSpecies(map, selectedSpecies)
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
      <XprizeLayerPicker map={map} />
      {/* <LayerPickerOverlay
        map={map}
        activeProjectMosaic={activeProjectMosaic}
        activeProjectData={activeProjectData}
        activeProjectPolygon={activeProjectPolygon}
        mediaSize={mediaSize}
        maximize={maximize}
        landCover={landCover}
        setLandCover={setLandCover}
      /> */}
      {/* <TimeSlider map={map} mediaSize={mediaSize} /> */}
    </>
  )
}

export default Map
