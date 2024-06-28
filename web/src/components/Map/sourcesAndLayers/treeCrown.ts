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

const treeCrownSource = (treeCrownGeojson = EMPTY_GEOJSON) => ({
  type: 'geojson',
  data: treeCrownGeojson,
})

const treeCrownLayer = {
  id: 'treeCrownLayer',
  type: 'line',
  source: 'treeCrownSource',
  layout: {
    'line-join': 'round',
    'line-cap': 'round',
    visibility: 'visible',
  },
  paint: {
    'line-color': '#AC4197',
    'line-width': 2.5,
  },
}

export const addTreeCrownSourceAndLayer = async (map: mapboxgl.Map) => {
  try {
    const res = await fetch(
      `${process.env.AWS_STORAGE}/layers/tree_crowns.geojson`
    )
    const treeCrownGeojson = await res.json()

    if (!map.getSource('treeCrownSource')) {
      map.addSource('treeCrownSource', treeCrownSource(treeCrownGeojson))
    }
    if (!map.getLayer('treeCrownLayer')) {
      map.addLayer(treeCrownLayer)
    }
  } catch (error) {
    console.error('Error reading GeoJSON file:', error)
  }
}
