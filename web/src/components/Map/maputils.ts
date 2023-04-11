import bbox from '@turf/bbox'
import center from '@turf/center'
import dayjs from 'dayjs'
import mapboxgl from 'mapbox-gl'

import {
  clusteredTreesCountTextLayer,
  clusteredTreesLayer,
  projectFillLayer,
  projectOutlineLayer,
  projectSource,
  treesSource,
  unclusteredTreesLayer,
} from 'src/mapbox.config'

export const addMarkers = (
  map: mapboxgl.Map,
  geoJson: mapboxgl.geoJson,
  setActiveFeature,
  setActiveProject,
  setDisplayOverlay
) => {
  for (const feature of geoJson.features) {
    // create the marker HTML element
    const el = document.createElement('div')
    el.className = 'map-marker'

    const centerpoint = center(feature)
    const boundingBox = bbox(feature)

    // display a popup with the project name on hover
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 20,
      anchor: 'left',
    })
      .setLngLat(centerpoint.geometry.coordinates)
      .setText(feature.properties.name)

    el.addEventListener('mouseenter', () => popup.addTo(map))
    el.addEventListener('mouseleave', () => popup.remove())

    el.addEventListener('click', () => {
      map.fitBounds(boundingBox, {
        duration: 2500,
        padding: { top: 40, bottom: 40, left: 420, right: 40 },
      })
      setActiveProject(feature?.properties?.name)
      setActiveFeature(feature)
      setDisplayOverlay(true)
      toggleTreesPlantedLayer(map, 'visible')
    })

    // finally, add the marker to the map
    new mapboxgl.Marker(el)
      .setLngLat(centerpoint.geometry.coordinates)
      .addTo(map)
  }
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
  return `<object width="200" height="200" data="${treePhoto}">
  <img width="200" height="200" src="${process.env.AWS_STORAGE}/miscellaneous/placeholders/taxa_plants.png" />
  </object> <br /><b>ID:</b> <div overflowWrap="break-word"> ${treeID} </div> <br /><b>Species:</b> ${treeName} <br /> <b> Plant height: </b> ${treeHeight} <br /> <b> DBH: </b> ${treeDBH}`
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
    : activeProject == 'Oceanus Conservation'
    ? `${process.env.AWS_STORAGE}/trees-measured/${treeID}.jpg`
    : `${process.env.AWS_STORAGE}/miscellaneous/placeholders/taxa_plants.png`
  return { treeName, treeHeight, treeDBH, treeID, treePhoto }
}

export const addSourcesLayersAndMarkers = (
  map: mapboxgl.Map,
  geoJson,
  setActiveFeature,
  setActiveProject,
  setDisplayOverlay
) => {
  addProjectPolygonsSourceAndLayers(map, geoJson)
  addMarkers(
    map,
    geoJson,
    setActiveFeature,
    setActiveProject,
    setDisplayOverlay
  )
  addPlanetLabsSourceAndLayers(map)
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

export const generatePlanetSource = (planetDate: string) => ({
  type: 'raster',
  tiles: [
    `https://tiles3.planet.com/basemaps/v1/planet-tiles/planet_medres_visual_${planetDate}_mosaic/gmap/{z}/{x}/{y}.png?api_key=${process.env.NICFI_API_KEY}`,
  ],
  tileSize: 256,
  attribution: `<a target="_top" rel="noopener" href="https://gainforest.earth">Mosaic Date: ${planetDate}</a> | <a target="_top" rel="noopener" href="https://www.planet.com/nicfi/">Imagery ©2022 Planet Labs Inc</a> | <a target="_top" rel="noopener" href="https://gainforest.earth">©2022 GainForest</a>`,
})

export const generatePlanetLayer = (
  planetDate: string,
  visibility: string
) => ({
  id: `planetLayer${planetDate}`,
  type: 'raster',
  source: `planetTile${planetDate}`,
  layout: {
    visibility: visibility,
  },
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

export const addProjectPolygonsSourceAndLayers = (
  map: mapboxgl.Map,
  projectPolygons
) => {
  if (!map.getSource('project')) {
    map.addSource('project', projectSource(projectPolygons))
  }
  if (!map.getLayer('projectOutline')) {
    map.addLayer(projectOutlineLayer('#00FF00'))
  }
  if (!map.getLayer('projectFill')) {
    map.addLayer(projectFillLayer('#00FF00'))
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
