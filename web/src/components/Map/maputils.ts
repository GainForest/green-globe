import dayjs from 'dayjs'
import mapboxgl from 'mapbox-gl'

import {
  clusteredTreesCountTextLayer,
  clusteredTreesLayer,
  generatePlanetLayer,
  generatePlanetSource,
  hexagonHoverFillLayer,
  hexagonOutlineLayer,
  hexagonsSource,
  landCoverLayer,
  landCoverSource,
  projectFillLayer,
  projectOutlineLayer,
  treeCoverLayer,
  treeCoverSource,
  treesSource,
  unclusteredTreesLayer,
} from 'src/mapbox.config'

export const addAllSourcesAndLayers = (map: mapboxgl.Map, hexagonsGeoJson) => {
  addPlanetLabsSourceAndLayers(map)
  addLandCoverSourceAndLayer(map)
  addTreeCoverSourceAndLayer(map)
  addProjectPolygonsSourceAndLayer(map)
  addHexagonsSourceAndLayers(map, hexagonsGeoJson)
}

export const addMarkers = (
  map: mapboxgl.Map,
  geoJson: mapboxgl.geoJson,
  markerType: string,
  setActiveProject,
  setDisplayOverlay
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
      setDisplayOverlay(true)
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

export const popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false,
})

export const treePopupHtml = ({
  treeName,
  treeHeight,
  treeDBH,
  treeID,
  treePhoto,
}) => {
  return `<div class="default"><object width="200" height="200" data="${treePhoto}">
  <img width="200" height="200" src="${process.env.AWS_STORAGE}/miscellaneous/placeholders/taxa_plants.png" />
  </object> <br /><b>ID:</b> <div overflowWrap="break-word"> ${treeID} </div> <br /><b>Species:</b> ${treeName} <br /> <b> Plant height: </b> ${treeHeight} <br /> <b> DBH: </b> ${treeDBH}<div>`
}

export const getPopupTreeInformation = (e, activeProject) => {
  const upperCaseEveryWord = (name: string) =>
    name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())

  const tree = e?.features[0]?.properties

  const treeName = tree?.Plant_Name
    ? upperCaseEveryWord(tree?.Plant_Name)
    : 'unknown'
  const treeHeight = tree?.Height ? `${tree?.Height}m` : 'unknown'

  const treeDBH = tree?.DBH ? `${tree?.DBH}cm` : 'unknown'
  const treeID =
    tree?.['FCD-tree_records-tree_photo']?.split('?id=')?.[1] ||
    tree?.ID ||
    'unknown'

  // TODO: process in the backend
  const treePhoto = tree?.tree_photo
    ? tree?.tree_photo
    : activeProject == 24
    ? `${process.env.AWS_STORAGE}/trees-measured/${treeID}.jpg`
    : `${process.env.AWS_STORAGE}/miscellaneous/placeholders/taxa_plants.png`
  return { treeName, treeHeight, treeDBH, treeID, treePhoto }
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
      map.addLayer(newPlanetLayer, 'projectOutline')
    }
  })
}

// export const addGainForestCenterpointsSource = (
//   map: mapboxgl.Map,
//   projectCenterpoints
// ) => {
//   if (!map.getSource('gainforestCenterpoints')) {
//     map.addSource('gainforestCenterpoints', projectSource(projectCenterpoints))
//   }
// }

export const addProjectPolygonsSourceAndLayer = (map: mapboxgl.Map) => {
  if (!map.getSource('project')) {
    map.addSource('project', { type: 'geojson', data: undefined })
  }
  if (!map.getLayer('projectOutline')) {
    map.addLayer(projectOutlineLayer('#00FF00'))
  }
  if (!map.getLayer('projectFill')) {
    map.addLayer(projectFillLayer('#00FF00'))
  }
}

export const addHexagonsSourceAndLayers = (
  map: mapboxgl.Map,
  hexagonGeoJsons
) => {
  if (!map.getSource('hexagons')) {
    map.addSource('hexagons', hexagonsSource(hexagonGeoJsons))
  }
  if (!map.getLayer('hexagonOutline')) {
    map.addLayer(hexagonOutlineLayer('#FFFFFF'))
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
