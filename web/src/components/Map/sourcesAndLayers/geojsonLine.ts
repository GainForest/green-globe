import mapboxgl from 'mapbox-gl'

import { EMPTY_GEOJSON } from 'src/constants'

const treeCrownSourcePbf = {
  type: 'vector',
  tiles: [`${process.env.AWS_STORAGE}/layers/tree_crown/{z}/{x}/{y}.pbf`],
}

const treeCrownLayerPbf = {
  id: 'treeCrownLayer',
  type: 'line', // or 'line', 'symbol', etc. depending on your data
  source: 'treeCrownSource',
  'source-layer': 'mvt_tiles',
  paint: {
    // Define your paint properties here
    'line-color': 'blue',
  },
}

const geojsonLineSource = (treeCrownGeojson = EMPTY_GEOJSON) => ({
  type: 'geojson',
  data: treeCrownGeojson,
})

const geojsonLineLayer = (layerName) => ({
  id: layerName,
  type: 'line',
  source: layerName,
  layout: {
    'line-join': 'round',
    'line-cap': 'round',
    visibility: 'visible',
  },
  paint: {
    'line-color': '#AC4197',
    'line-width': 2.5,
  },
})

export const addGeojsonLineSourceAndLayer = async (
  map: mapboxgl.Map,
  layer: { name: string; endpoint: string; type: string }
) => {
  try {
    const res = await fetch(`${process.env.AWS_STORAGE}/${layer.endpoint}`)
    const treeCrownGeojson = await res.json()

    if (!map.getSource(layer.name)) {
      map.addSource(layer.name, geojsonLineSource(treeCrownGeojson))
    }
    if (!map.getLayer(layer.name)) {
      map.addLayer(geojsonLineLayer(layer.name))
    }
  } catch (error) {
    console.error('Error reading GeoJSON file:', error)
  }
}
