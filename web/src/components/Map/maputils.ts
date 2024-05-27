import mapboxgl from 'mapbox-gl'

import { setInfoOverlay } from 'src/reducers/overlaysReducer'

import {
  getDateOfMeasurement,
  getSpeciesName,
  getTreeDBH,
  getTreeHeight,
  getTreePhotos,
} from './maptreeutils'
import { addAmazonBasinSourceAndLayer } from './sourcesAndLayers/amazonBasin'
import { addHiveSourceAndLayers } from './sourcesAndLayers/beehive'
import { addCOGSourceAndLayers } from './sourcesAndLayers/cogSourceAndLayers'
import { addGreyscaleSourceAndLayers } from './sourcesAndLayers/greyscaleTerrain'
import { addHistoricalSatelliteSourceAndLayers } from './sourcesAndLayers/historicalSatellite'
import { addLandCoverSourceAndLayer } from './sourcesAndLayers/landCover'
import {
  addMeasuredTreesSourceAndLayer,
  toggleMeasuredTreesLayer,
} from './sourcesAndLayers/measuredTrees'
import {
  addAllSitesSourceAndLayer,
  addHighlightedSiteSourceAndLayer,
} from './sourcesAndLayers/projectSites'
import { addTreeCoverSourceAndLayer } from './sourcesAndLayers/treeCover'

export const addAllSourcesAndLayers = (
  map: mapboxgl.Map,
  hiveLocations,
  setMarkers
) => {
  addHistoricalSatelliteSourceAndLayers(map)
  addLandCoverSourceAndLayer(map)
  addTreeCoverSourceAndLayer(map)
  addAllSitesSourceAndLayer(map)
  addGreyscaleSourceAndLayers(map)
  addHighlightedSiteSourceAndLayer(map)
  addHiveSourceAndLayers(map, hiveLocations, setMarkers)
  addMeasuredTreesSourceAndLayer(map)
  addCOGSourceAndLayers(map)
  addAmazonBasinSourceAndLayer(map)
}

export const toggleOrthomosaic = (map: mapboxgl.Map, visibility) => {
  if (map.getLayer('orthomosaic')) {
    map.setLayoutProperty('orthomosaic', 'visibility', visibility)
  }
}

export const addClickableMarkers = (
  map: mapboxgl.Map,
  dispatch,
  geoJson: mapboxgl.geoJson,
  markerType: string,
  setActiveProject
) => {
  const markers = []
  for (const feature of geoJson.features) {
    // create the marker HTML element
    const el = document.createElement('div')
    el.className = `${markerType}-map-marker`

    // display a popup with the project name on hover
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 20,
      anchor: 'left',
      className: 'default',
    })
      .setLngLat(feature.geometry.coordinates)
      .setText(feature.properties.name)

    el.addEventListener('mouseenter', () => popup.addTo(map))
    el.addEventListener('mouseleave', () => popup.remove())

    el.addEventListener('click', () => {
      setActiveProject(feature?.properties?.projectId)
      dispatch(setInfoOverlay(1))
      toggleMeasuredTreesLayer(map, 'visible')
    })

    // finally, add the marker to the map
    const marker = new mapboxgl.Marker(el)
      .setLngLat(feature.geometry.coordinates)
      .addTo(map)

    markers.push(marker)
  }

  return markers
}

export const addMarkers = (
  map: mapboxgl.Map,
  geoJson: mapboxgl.geoJson,
  markerType: string
) => {
  const markers = []
  for (const feature of geoJson.features) {
    // create the marker HTML element
    const el = document.createElement('div')
    el.className = `${markerType}-map-marker`

    // display a popup with the project name on hover
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 20,
      anchor: 'left',
      className: 'default',
    })
      .setLngLat(feature.geometry.coordinates)
      .setText(feature.properties.name)

    el.addEventListener('mouseenter', () => popup.addTo(map))
    el.addEventListener('mouseleave', () => popup.remove())

    const marker = new mapboxgl.Marker(el)
      .setLngLat(feature.geometry.coordinates)
      .addTo(map)

    markers.push(marker)
  }

  return markers
}

export const popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false,
})

export const getTreeInformation = (e, activeProject) => {
  const tree = e?.features[0]?.properties
  const treeName = getSpeciesName(tree)

  const treeHeight = getTreeHeight(tree)
  const treeDBH = getTreeDBH(tree)
  const dateOfMeasurement = getDateOfMeasurement(tree)

  const treeID =
    tree?.['FCD-tree_records-tree_photo']?.split('?id=')?.[1] ||
    tree?.ID ||
    'unknown'

  const treePhotos = getTreePhotos(tree, activeProject, treeID)

  return {
    treeName,
    treeHeight,
    treeDBH,
    treePhotos,
    dateOfMeasurement,
  }
}

export const generateTerraSource = () => ({
  type: 'raster',
  tiles: [
    `services.terrascope.be/wmts/v2?layer=WORLDCOVER_2021_MAP&style=&tilematrixset=EPSG:3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/png&TileMatrix=EPSG:3857:{z}&TileCol={x}&TileRow={y}&TIME=2023-04-12`,
  ],
  tileSize: 256,
})

export const toggleLandCoverLayer = (map: mapboxgl.Map, visibility) => {
  if (map.getLayer('landCoverLayer')) {
    map.setLayoutProperty('landCoverLayer', 'visibility', visibility)
  }
}

export const toggleTreeCoverLayer = (map: mapboxgl.Map, visibility) => {
  if (map.getLayer('treeCoverLayer')) {
    map.setLayoutProperty('treeCoverLayer', 'visibility', visibility)
  }
}

export const togglePotentialTreeCoverLayer = (
  map: mapboxgl.Map,
  visibility
) => {
  if (map.getLayer('potentialTreeCoverLayer')) {
    map.setLayoutProperty('potentialTreeCoverLayer', 'visibility', visibility)
  }
}
