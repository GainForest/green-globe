import mapboxgl from 'mapbox-gl'

export const addTreeCoverSourceAndLayer = (map: mapboxgl.Map) => {
  if (!map.getSource('treeCoverSource')) {
    map.addSource('treeCoverSource', treeCoverSource)
  }
  if (!map.getLayer('treeCoverLayer')) {
    map.addLayer(treeCoverLayer)
  }
}

export const treeCoverLayer = {
  id: 'treeCoverLayer',
  type: 'raster',
  source: `treeCoverSource`,
  layout: {
    visibility: 'none',
  },
}

export const treeCoverSource = {
  type: 'raster',
  tiles: [
    `https://storage.googleapis.com/earthenginepartners-hansen/tiles/gfc_v1.4/tree_alpha/{z}/{x}/{y}.png`,
  ],
  tileSize: 256,
  attribution: `<a target="_top" rel="noopener" href="https://gainforest.earth">©2023 GainForest</a>`,
}
