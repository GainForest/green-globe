import mapboxgl from 'mapbox-gl'

const treeCrownSource = {
  type: 'vector',
  tiles: [`${process.env.AWS_STORAGE}/layers/tree_crown/{z}/{x}/{y}.pbf`],
}

const treeCrownLayer = {
  id: 'treeCrownLayer',
  type: 'line', // or 'line', 'symbol', etc. depending on your data
  source: 'treeCrownSource',
  'source-layer': 'mvt_tiles',
  paint: {
    // Define your paint properties here
    'line-color': 'blue',
  },
}

export const addTreeCrownSourceAndLayer = (map: mapboxgl.Map) => {
  if (!map.getSource('treeCrownSource')) {
    console.log('adding the tree crown source')
    map.addSource('treeCrownSource', treeCrownSource)
  }
  if (!map.getLayer('treeCrownLayer')) {
    map.addLayer(treeCrownLayer)
  }
}
