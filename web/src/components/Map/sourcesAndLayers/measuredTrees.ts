import mapboxgl from 'mapbox-gl'

export const addMeasuredTreesSourceAndLayer = (map: mapboxgl.Map) => {
  if (!map.getSource('trees')) {
    map.addSource(
      'trees',
      treesSource({
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: null,
          },
        ],
      })
    )
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

export const treesSource = (treesGeoJson) => ({
  type: 'geojson',
  data: treesGeoJson,
  cluster: true,
  clusterMaxZoom: 15, // Max zoom to cluster points on
  clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
})

export const clusteredTreesLayer = {
  id: 'clusteredTrees',
  type: 'circle',
  source: 'trees',
  filter: ['has', 'point_count'],
  paint: {
    'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
    'circle-opacity': 0.5,
    'circle-color': '#ff77c1',
    'circle-stroke-color': '#ff77c1',
    'circle-stroke-opacity': 1,
  },
}

export const clusteredTreesCountTextLayer = {
  id: 'clusteredTreesCountText',
  type: 'symbol',
  source: 'trees',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12,
  },
}

export const unclusteredTreesLayer = {
  id: 'unclusteredTrees',
  type: 'circle',
  source: 'trees',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      '#0883fe',
      '#ff77c1',
    ],
    'circle-radius': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      8,
      4,
    ],
    'circle-stroke-width': 1,
    'circle-stroke-color': '#000000',
  },
}
