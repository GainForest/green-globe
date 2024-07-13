import mapboxgl from 'mapbox-gl'

import { GeospatialLayer } from 'src/types'

export const addMeasuredTreesSourceAndLayer = (
  map: mapboxgl.Map,
  layer: GeospatialLayer
) => {
  if (!map.getSource(layer.name)) {
    map.addSource(layer.name, treesSource(layer.endpoint))
  }
  if (!map.getLayer(`clusteredTrees`)) {
    map.addLayer(clusteredTreesLayer(layer.name))
  }
  if (!map.getLayer(`clusteredTreesCountText`)) {
    map.addLayer(clusteredTreesCountTextLayer(layer.name))
  }
  if (!map.getLayer(`unclusteredTrees`)) {
    map.addLayer(unclusteredTreesLayer(layer.name))
  }
}

export const removeMeasuredTreesSourceAndLayer = (
  map: mapboxgl.Map,
  layer: GeospatialLayer
) => {
  map.removeLayer(`clusteredTrees`)
  map.removeLayer(`clusteredTreesCountText`)
  map.removeLayer(`unclusteredTrees`)
}

export const toggleMeasuredTreesLayer = (
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

export const treesSource = (layerEndpoint: string) => ({
  type: 'geojson',
  data: layerEndpoint,
  // cluster: true,
  // clusterMaxZoom: 15, // Max zoom to cluster points on
  // clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
})

export const clusteredTreesLayer = (layerName: string) => ({
  id: `clusteredTrees`,
  type: 'circle',
  source: layerName,
  filter: ['has', 'point_count'],
  paint: {
    'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
    'circle-opacity': 0.5,
    'circle-color': '#ff77c1',
    'circle-stroke-color': '#ff77c1',
    'circle-stroke-opacity': 1,
  },
})

export const clusteredTreesCountTextLayer = (layerName: string) => ({
  id: `clusteredTreesCountText`,
  type: 'symbol',
  source: layerName,
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12,
  },
})

export const unclusteredTreesLayer = (layerName: string) => ({
  id: `unclusteredTrees`,
  type: 'circle',
  source: layerName,
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': '#47BC85',
    'circle-radius': 2,
    'circle-stroke-color': '#47BC85',
    'circle-stroke-width': 2,
  },
})
