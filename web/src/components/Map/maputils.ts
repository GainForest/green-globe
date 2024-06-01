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
import { addFlightPathSourceAndLayer } from './sourcesAndLayers/flightPath'
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
  setMarkers,
  ednaLocations
) => {
  addHistoricalSatelliteSourceAndLayers(map)
  addLandCoverSourceAndLayer(map)
  addTreeCoverSourceAndLayer(map)
  addAllSitesSourceAndLayer(map)
  addHighlightedSiteSourceAndLayer(map)
  addGeotiffsSourceAndLayer(map)
  addHiveSourceAndLayers(map, hiveLocations, setMarkers)
  addMeasuredTreesSourceAndLayer(map)
  addFlightPathSourceAndLayer(map)
  addCOGSourceAndLayers(map)
  addAmazonBasinSourceAndLayer(map)
  addEDNASourceAndLayers(map, ednaLocations)
}

export const addEDNASourceAndLayers = (map: mapboxgl.Map, ednaLocations) => {
  map.loadImage('dna.png', (error, image) => {
    if (error) throw error
    map.addImage('ednaImage', image)
  })
  if (!map.getSource('ednaSource') && ednaLocations) {
    map.addSource('ednaSource', {
      type: 'geojson',
      data: ednaLocations,
    })
  }
  if (!map.getLayer('ednaLayer')) {
    map.addLayer({
      id: 'ednaLayer',
      type: 'circle',
      source: 'ednaSource',
      paint: {
        'circle-color': '#b284be',
        'circle-radius': 20,
        'circle-stroke-color': '#623c74',
        'circle-stroke-width': 1,
      },
    })
    map.addLayer({
      id: 'ednaImageLayers',
      type: 'symbol',
      source: 'ednaSource',
      layout: {
        'icon-image': 'ednaImage',
        'icon-size': 0.1, // Adjust the size as needed
        'icon-allow-overlap': true, // Allow icons to overlap
      },
      paint: {
        'icon-opacity': 0.77, // Set the opacity of the icons
      },
    })
  }
}
// https://gibs-c.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?TIME=2023-07-15T00:00:00Z&layer=VIIRS_NOAA20_CorrectedReflectance_TrueColor&style=default&tilematrixset=250m&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fjpeg&TileMatrix=1&TileCol=1&TileRow=0

export const addGeotiffsSourceAndLayer = (map: mapboxgl.Map) => {
  if (!map.getSource('geotiffsSource')) {
    map.addSource('geotiffsSource', {
      type: 'raster',
      tiles: [
        'https://4dmyvh57a1.execute-api.us-east-1.amazonaws.com/cog/tiles/WebMercatorQuad/{z}/{x}/{y}?url=https://raw-drone.s3.eu-west-3.amazonaws.com/manaus_orthophoto.tiff',
      ],
      tileSize: 256,
    })
  }
  if (!map.getLayer('geotiffsLayer')) {
    map.addLayer({
      id: 'geotiffsLayer',
      type: 'raster',
      source: 'geotiffsSource',
    })
  }
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

export const addEDNAMarkers = (
  map: mapboxgl.Map,
  geoJson: mapboxgl.geoJson
) => {
  const markers = []
  for (const feature of geoJson.features) {
    // create the marker HTML element
    const el = document.createElement('div')
    el.className = `edna-sample-map-marker`

    // finally, add the marker to the map
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

export const addNamedSource = (
  map: mapboxgl.Map,
  layer: { name: string; endpoint: string }
) => {
  if (!map.getSource(layer.name)) {
    map.addSource(layer.name, {
      type: 'raster',
      tiles: [layer.endpoint],
      tileSize: 256,
    })
    if (map.getLayer(layer.name)) {
      map.addLayer({
        id: layer.name,
        type: 'raster',
        source: layer.name,
        paint: {
          'raster-opacity': 1,
        },
      })
    }
  }
}

export const removeNamedSource = (
  map: mapboxgl.Map,
  layer: { name: string }
) => {
  if (map.getSource(layer.name)) {
    map.removeLayer(layer.name)
    map.removeSource(layer.name)
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
