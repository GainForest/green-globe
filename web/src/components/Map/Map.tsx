import 'mapbox-gl/dist/mapbox-gl.css'

import { useEffect, useState } from 'react'

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

import LayerPicker from 'src/components/Map/components/LayerPicker'
import { initializeMapbox } from 'src/mapbox.config'
import { setHoveredInformation } from 'src/reducers/mapReducer'
import { setInfoOverlay } from 'src/reducers/overlaysReducer'
import { setProjectId, setProjectName } from 'src/reducers/projectsReducer'
import { toKebabCase } from 'src/utils/toKebabCase'

import { BasketDetails } from '../Overlays/BasketDetails'
import { TreeInfoBox } from '../Overlays/Info/TreeInfoBox'
import { InfoOverlay } from '../Overlays/InfoOverlay'
import { ProfileOverlay } from '../Overlays/ProfileOverlay'

import Button from './components/Button'
import { LandCoverLegend } from './components/LandCoverLegend'
// import { LayerPickerOverlay } from './components/LayerPickerOverlay'
import { Legend as LayerLegend } from './components/Legend'
import { SearchOverlay } from './components/SearchOverlay'
import { TimeSlider } from './components/TimeSlider'
import UrlUpdater from './components/UrlUpdater'
import { fetchTreeShapefile } from './mapfetch'
import {
  fetchProjectInfo,
  fetchGainForestCenterpoints,
  fetchProjectPolygon,
  fetchAllSiteData,
  // fetchHexagons,
  fetchHiveLocations,
} from './mapfetch'
import { spinGlobe } from './maprotate'
import { getSpeciesName } from './maptreeutils'
import { addAllSourcesAndLayers, getTreeInformation } from './maputils'
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
  const hoveredInformation = useSelector(
    (state: State) => state.map.hoveredInformation
  )
  const setActiveProjectId = (id) => dispatch(setProjectId(id))
  const infoOverlay = useSelector((state: State) => state.overlays.info)
  const [map, setMap] = useState<mapboxgl.Map>()
  const [sourcesAndLayersLoaded, setSourcesAndLayersLoaded] =
    useState<boolean>(false)

  const kebabCasedProjectName = useSelector((state: State) =>
    toKebabCase(state.project?.name)
  )
  // const [hexagons, setHexagons] = useState()
  const [activeProjectPolygon, setActiveProjectPolygon] = useState() // The project's main site
  const [allSitePolygons, setAllSitePolygons] = useState()
  const [activeProjectData, setActiveProjectData] = useState()
  const [activeProjectTreesPlanted, setActiveProjectTreesPlanted] = useState()
  const [activeProjectMosaic, setActiveProjectMosaic] = useState()
  const [landCover, setLandCover] = useState(false)
  const [searchInput, setSearchInput] = useState<string>('')
  const [selectedSpecies, setSelectedSpecies] = useState('')
  // const numHexagons = useRef(0)

  // Initialize map, fetch all global data
  useEffect(() => {
    // fetchHexagons(setHexagons)
    initializeMapbox('map-container', setMap)
  }, [])

  // Fetch all other data that can be fetched after the map is
  // loaded.
  useEffect(() => {
    if (sourcesAndLayersLoaded) {
      fetchGainForestCenterpoints(map)
      fetchHiveLocations(map, activeProjectId)
    }
  }, [map, activeProjectId, sourcesAndLayersLoaded])

  useEffect(() => {
    if (urlProjectId && !activeProjectId) {
      dispatch(setProjectId(urlProjectId))
    }
  }, [urlProjectId, activeProjectId])

  // Set initial layers on load
  useEffect(() => {
    if (map) {
      const onLoad = () => {
        map.setFog({
          color: '#000000',
          'high-color': 'rgb(36, 92, 223)',
          'horizon-blend': 0.02,
          'space-color': 'rgb(11, 11, 25)',
          'star-intensity': 0.05,
        })
        addAllSourcesAndLayers(map)
        setSourcesAndLayersLoaded(true)
      }

      const onStyleData = () => {
        addAllSourcesAndLayers(map)
      }
      map.on('load', onLoad)
      map.on('styledata', onStyleData)
      // Create a popup, but don't add it to the map yet.
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      })

      map.on('mousemove', 'gainforestMarkerLayer', (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer'

        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice()
        const description = e.features[0].properties.name

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(description).addTo(map)
      })
      map.on('click', 'gainforestMarkerLayer', (e) => {
        const projectId = e.features[0].properties.projectId
        setActiveProjectId(projectId)
        dispatch(setInfoOverlay('info'))
      })

      map.on('mouseleave', 'gainforestMarkerLayer', () => {
        map.getCanvas().style.cursor = ''
        popup.remove()
      })
      return () => {
        map.off('load', onLoad)
        map.off('styledata', onStyleData)
      }
    }
  }, [map])

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
      setHoveredInformation({})
      setSelectedSpecies('')
      const fetchData = async () => {
        const result = await fetchProjectInfo(activeProjectId)
        setActiveProjectData(result)
        // can probably add in all the data
        dispatch(setProjectName(result?.project?.name))
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
      dispatch(setInfoOverlay(initialOverlay))
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
    if (kebabCasedProjectName) {
      const treesEndpoint = `shapefiles/${kebabCasedProjectName}-all-tree-plantings.geojson`
      const fetchData = async () => {
        await fetchTreeShapefile(treesEndpoint, setActiveProjectTreesPlanted)
      }

      fetchData().catch(console.error)
    }
  }, [kebabCasedProjectName])

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
          dispatch(setHoveredInformation(treeInformation))
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
      <SearchOverlay
        map={map}
        mediaSize={mediaSize}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      {/* <BackToGlobe map={map} /> */}

      {Object.values(hoveredInformation)?.length > 0 && (
        <TreeInfoBox mediaSize={mediaSize} />
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
          style={{ position: 'absolute', bottom: '5%', right: '3%' }}
          onClick={() => dispatch(setInfoOverlay('info'))}
        >
          Project Info
        </Button>
      )}
      {landCover && <LandCoverLegend mediaSize={mediaSize} />}
      <LayerPicker map={map} />
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
      <TimeSlider map={map} mediaSize={mediaSize} />
      <LayerLegend />
    </>
  )
}

export default Map