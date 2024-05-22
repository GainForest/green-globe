import mapboxgl from 'mapbox-gl'

export const addPotentialTreeCoverSourceAndLayer = (map: mapboxgl.Map) => {
  if (!map.getSource('potentialTreeCoverSource')) {
    map.addSource('potentialTreeCoverSource', potentialTreeCoverSource)
  }
  if (!map.getLayer('potentialTreeCoverLayer')) {
    map.addLayer(potentialTreeCoverLayer)
  }
}

export const potentialTreeCoverSource = {
  type: 'raster',
  tiles: [
    `https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/61656cc4ddd685befa6e87be32c46ac8-66a6b7f6c3ac4b77c9443e4450efa009/tiles/{z}/{x}/{y}`,
  ],
  tileSize: 256,
  attribution: `<a target="_top" rel="noopener" href="https://gainforest.earth">©2023 GainForest</a>`,
}

export const potentialTreeCoverLayer = {
  id: 'potentialTreeCoverLayer',
  type: 'raster',
  source: `potentialTreeCoverSource`,
  layout: {
    visibility: 'none',
  },
}
