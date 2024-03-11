import dayjs from 'dayjs'
import mapboxgl from 'mapbox-gl'

import {
  allSitesOutlineLayer,
  clusteredTreesCountTextLayer,
  clusteredTreesLayer,
  generatePlanetLayer,
  generatePlanetSource,
  hexagonClickFillLayer,
  hexagonHoverFillLayer,
  hexagonOutlineLayer,
  hexagonsSource,
  landCoverLayer,
  landCoverSource,
  potentialTreeCoverLayer,
  potentialTreeCoverSource,
  projectFillLayer,
  projectOutlineLayer,
  treeCoverLayer,
  treeCoverSource,
  treesSource,
  unclusteredTreesLayer,
} from 'src/mapbox.config'
import { setInfoOverlay } from 'src/reducers/overlaysReducer'

import {
  getDateOfMeasurement,
  getSpeciesName,
  getTreeDBH,
  getTreeHeight,
  getTreePhoto,
} from './maptreeutils'

export const addAllSourcesAndLayers = (
  map: mapboxgl.Map,
  hexagons,
  hiveLocations,
  setMarkers
) => {
  addPlanetLabsSourceAndLayers(map)
  addLandCoverSourceAndLayer(map)
  addTreeCoverSourceAndLayer(map)
  addPotentialTreeCoverSourceAndLayer(map)
  addProjectPolygonsSourceAndLayer(map)
  addAllSitesSourceAndLayer(map)
  // addNasaSourceAndLayer(map)
  addHexagonsSourceAndLayers(map, hexagons)
  addOrthomosaicSourceAndLayer(map)
  addHiveSourceAndLayers(map, hiveLocations, setMarkers)
}

// https://gibs-c.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?TIME=2023-07-15T00:00:00Z&layer=VIIRS_NOAA20_CorrectedReflectance_TrueColor&style=default&tilematrixset=250m&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fjpeg&TileMatrix=1&TileCol=1&TileRow=0

export const addHiveSourceAndLayers = (
  map: mapboxgl.Map,
  hiveLocations,
  setMarkers
) => {
  if (hiveLocations) {
    const newMarkers = addMarkers(map, hiveLocations, 'hive')
    setMarkers((markers) => [...markers, ...newMarkers])
  }
}

export const addOrthomosaicSourceAndLayer = (map: mapboxgl.Map) => {
  if (!map.getSource('orthomosaic')) {
    map.addSource('orthomosaic', {
      type: 'raster',
      url: 'mapbox://dwddao.0muxuhbk',
    })
  }
  if (!map.getLayer('orthomosaic')) {
    map.addLayer({
      id: 'orthomosaic',
      source: 'orthomosaic',
      type: 'raster',
    })
  }
}

export const toggleOrthomosaic = (map: mapboxgl.Map, visibility) => {
  if (map.getLayer('orthomosaic')) {
    map.setLayoutProperty('orthomosaic', 'visibility', visibility)
  }
}

export const addNasaSourceAndLayer = (map: mapboxgl.Map) => {
  // const tilePath =
  //   'wmts/epsg4326/best/' +
  //   'MODIS_Terra_CorrectedReflectance_TrueColor/default/' +
  //   '2018-06-01/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg'

  const tilePath =
    'https://gibs-c.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?TIME=2023-07-15T00:00:00Z&layer=VIIRS_NOAA20_CorrectedReflectance_TrueColor&style=default&tilematrixset=250m&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fjpeg&TileMatrix=1&TileCol=1&TileRow=0'

  console.log('im adding nasa ')
  map.addSource('nasaSource', {
    type: 'raster',
    tiles: [
      'https://gitc-b.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?TIME=2023-07-16T00:00:00Z&layer=VIIRS_SNPP_CorrectedReflectance_TrueColor&style=default&tilematrixset=250m&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fjpeg&TileMatrix={z}&TileCol={x}&TileRow={y}',
    ],
    tileSize: 256,
  })
  map.addLayer({
    id: 'nasaLayer',
    type: 'raster',
    source: 'nasaSource',
  })
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
      toggleTreesPlantedLayer(map, 'visible')
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

// export const treePopupHtml = ({
//   treeName,
//   treeHeight,
//   treeDBH,
//   treePhoto,
//   dateOfMeasurement,
// }) => {
//   if (
//     treePhoto.includes('.mp4') ||
//     treePhoto.includes('.mov') ||
//     treePhoto.includes('.MOV')
//   ) {
//     return `<div class="default">
//     <video width="100%" maxHeight="160px" autoPlay>
//     <source src="${treePhoto}" type="video/mp4">
//     </video>
//   <br /> <br /><b>Species:</b> ${treeName} <br /> <b> Plant height: </b> ${treeHeight} <br /> <b> DBH: </b> ${treeDBH}<div>`
//   } else {
//     return `<div class="default">
//   <img width="200" height="200" src="${treePhoto}" style="object-fit: contain;"/>
// <br /> <br /><b>Date of measurement:</b> ${dateOfMeasurement}<br /><b>Species:</b> ${treeName} <br /> <b> Plant height: </b> ${treeHeight} <br /> <b> DBH: </b> ${treeDBH}<div>`
//   }
// }

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

  const treePhoto = getTreePhoto(tree, activeProject, treeID)
  return { treeName, treeHeight, treeDBH, treeID, treePhoto, dateOfMeasurement }
}

const addPotentialTreeCoverSourceAndLayer = (map: mapboxgl.Map) => {
  if (!map.getSource('potentialTreeCoverSource')) {
    map.addSource('potentialTreeCoverSource', potentialTreeCoverSource)
  }
  if (!map.getLayer('potentialTreeCoverLayer')) {
    map.addLayer(potentialTreeCoverLayer)
  }
}

const addTreeCoverSourceAndLayer = (map: mapboxgl.Map) => {
  if (!map.getSource('treeCoverSource')) {
    map.addSource('treeCoverSource', treeCoverSource)
  }
  if (!map.getLayer('treeCoverLayer')) {
    map.addLayer(treeCoverLayer)
  }
}

const addLandCoverSourceAndLayer = (map: mapboxgl.Map) => {
  if (!map.getSource('landCoverSource')) {
    map.addSource('landCoverSource', landCoverSource)
  }
  if (!map.getLayer('landCoverLayer')) {
    map.addLayer(landCoverLayer)
  }
}

const getPlanetDates = (minDate: dayjs.Dayjs, maxDate: dayjs.Dayjs) => {
  const res = []
  let monthsBetween = maxDate.diff(minDate, 'month')
  while (monthsBetween >= 0) {
    res.push(minDate.format('YYYY-MM'))
    minDate = minDate.add(1, 'month')
    monthsBetween--
  }
  return res
}

export const generateTerraSource = () => ({
  type: 'raster',
  tiles: [
    `services.terrascope.be/wmts/v2?layer=WORLDCOVER_2021_MAP&style=&tilematrixset=EPSG:3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/png&TileMatrix=EPSG:3857:{z}&TileCol={x}&TileRow={y}&TIME=2023-04-12`,
  ],
  tileSize: 256,
})

// TODO needs to have a current planet labs layer
export const addPlanetLabsSourceAndLayers = (map: mapboxgl) => {
  const minDate = dayjs('2020-09-01')
  const maxDate = dayjs().subtract(6, 'week').set('date', 1)

  const planetDates = getPlanetDates(minDate, maxDate)
  planetDates.map((planetDate) => {
    if (!map.getSource(`planetTile${planetDate}`)) {
      map.addSource(`planetTile${planetDate}`, generatePlanetSource(planetDate))
    }
  })
  planetDates.map((planetDate) => {
    const visibility = 'none'
    const newPlanetLayer = generatePlanetLayer(planetDate, visibility)
    if (!map.getLayer(`planetLayer${planetDate}`)) {
      map.addLayer(newPlanetLayer)
    }
  })
}
export const addProjectPolygonsSourceAndLayer = (map: mapboxgl.Map) => {
  if (!map.getSource('project')) {
    map.addSource('project', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: null,
          },
        ],
      },
    })
  }
  // if (map.getSource('project') && !map.getLayer('projectOutline')) {
  //   map.addLayer(projectOutlineLayer('#00FF00'))
  // }
  if (map.getSource('project') && !map.getLayer('projectFill')) {
    map.addLayer(projectFillLayer('#00FF00'))
  }
}

export const addAllSitesSourceAndLayer = (map: mapboxgl.Map) => {
  if (!map.getSource('allSites')) {
    map.addSource('allSites', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: null,
          },
        ],
      },
    })
  }
  if (map.getSource('allSites') && !map.getLayer('allSitesOutline')) {
    map.addLayer(allSitesOutlineLayer('#00FF00'))
  }
}

export const addHexagonsSourceAndLayers = (map: mapboxgl.Map, hexagons) => {
  if (!map.getSource('hexagons')) {
    map.addSource('hexagons', hexagonsSource(hexagons))
  }
  if (!map.getLayer('hexagonClickFillLayer')) {
    map.addLayer(hexagonClickFillLayer())
  }
  if (!map.getLayer('hexagonOutline')) {
    map.addLayer(hexagonOutlineLayer('#00FF00'))
  }
  if (!map.getLayer('hexagonHoverFill')) {
    map.addLayer(hexagonHoverFillLayer())
  }
}

export const addTreesPlantedSourceAndLayers = (
  map: mapboxgl.Map,
  treesGeoJson
) => {
  if (!map.getSource('trees')) {
    map.addSource('trees', treesSource(treesGeoJson))
  } else {
    map.getSource('trees').setData(treesGeoJson)
  }
  if (!map.getLayer('clusteredTrees')) {
    map.addLayer(clusteredTreesLayer)
  }
  if (!map.getLayer('clusteredTreesCountText')) {
    map.addLayer(clusteredTreesCountTextLayer)
  }
  if (!map.getLayer('unclusteredTrees')) {
    map.addLayer(unclusteredTreesLayer)
  }
}

export const toggleTreesPlantedLayer = (
  map: mapboxgl.Map,
  visibility: 'visible' | 'none'
) => {
  if (map.getLayer('clusteredTrees')) {
    map.setLayoutProperty('clusteredTrees', 'visibility', visibility)
  }
  if (map.getLayer('clusteredTreesCountText')) {
    map.setLayoutProperty('clusteredTreesCountText', 'visibility', visibility)
  }
  if (map.getLayer('unclusteredTrees')) {
    map.setLayoutProperty('unclusteredTrees', 'visibility', visibility)
  }
}

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
