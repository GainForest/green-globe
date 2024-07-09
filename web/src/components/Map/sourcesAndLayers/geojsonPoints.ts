import mapboxgl from 'mapbox-gl'

import { EMPTY_GEOJSON } from 'src/constants'
import { GeospatialLayer } from 'src/types'

export const addGeojsonPointSourceAndLayer = async (
  map: mapboxgl.Map,
  layer: GeospatialLayer
) => {
  const res = await fetch(layer.endpoint)
  const pointsGeojson = await res.json()

  if (!map.getSource(layer.name)) {
    map.addSource(layer.name, {
      type: 'geojson',
      data: pointsGeojson || EMPTY_GEOJSON,
      // cluster: true,
      // clusterMaxZoom: 15, // Max zoom to cluster points on
      // clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
    })
  }
  if (!map.getLayer(`${layer.name}`)) {
    map.addLayer({
      id: `${layer.name}`,
      type: 'circle',
      source: layer.name,
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': '#FB281D',
        'circle-radius': 10,
        'circle-stroke-color': '#623c74',
        'circle-stroke-width': 1,
      },
    })
  }
  // if (!map.getLayer(`clustered-${layer.name}`)) {
  //   map.addLayer({
  //     id: `clustered-${layer.name}`,
  //     type: 'circle',
  //     source: layer.name,
  //     filter: ['has', 'point_count'],
  //     paint: {
  //       'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
  //       'circle-opacity': 0.5,
  //       'circle-color': '#FB281D',
  //       'circle-stroke-color': '#ff77c1',
  //       'circle-stroke-opacity': 1,
  //     },
  //   })
  // }
  // if (!map.getLayer(`clustered-count-${layer.name}`)) {
  //   map.addLayer({
  //     id: `clustered-count-${layer.name}`,
  //     type: 'symbol',
  //     source: layer.name,
  //     filter: ['has', 'point_count'],
  //     layout: {
  //       'text-field': '{point_count_abbreviated}',
  //       'text-size': 12,
  //     },
  //   })
  // }
}
