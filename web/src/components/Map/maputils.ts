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
import { addEDNASourceAndLayers } from './sourcesAndLayers/edna'
import { addFlightPathSourceAndLayer } from './sourcesAndLayers/flightPath'
import { addHistoricalSatelliteSourceAndLayers } from './sourcesAndLayers/historicalSatellite'
import { addLandCoverSourceAndLayer } from './sourcesAndLayers/landCover'
import {
  addMeasuredTreesSourceAndLayer,
  toggleMeasuredTreesLayer,
} from './sourcesAndLayers/measuredTrees'
import { addProjectMarkers } from './sourcesAndLayers/projectMarkers'
import {
  addAllSitesSourceAndLayer,
  addHighlightedSiteSourceAndLayer,
} from './sourcesAndLayers/projectSites'
import { addTreeCoverSourceAndLayer } from './sourcesAndLayers/treeCover'

export const addAllSourcesAndLayers = (map: mapboxgl.Map) => {
  // addEDNASourceAndLayers(map)
  addHistoricalSatelliteSourceAndLayers(map)
  // addLandCoverSourceAndLayer(map)
  // addTreeCoverSourceAndLayer(map)
  addAllSitesSourceAndLayer(map)
  addHighlightedSiteSourceAndLayer(map)
  // addHiveSourceAndLayers(map)
  // addMeasuredTreesSourceAndLayer(map)
  // addFlightPathSourceAndLayer(map)
  addAmazonBasinSourceAndLayer(map)
  addProjectMarkers(map)
}

// https://gibs-c.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?TIME=2023-07-15T00:00:00Z&layer=VIIRS_NOAA20_CorrectedReflectance_TrueColor&style=default&tilematrixset=250m&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fjpeg&TileMatrix=1&TileCol=1&TileRow=0

export const toggleOrthomosaic = (map: mapboxgl.Map, visibility) => {
  if (map.getLayer('orthomosaic')) {
    map.setLayoutProperty('orthomosaic', 'visibility', visibility)
  }
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
