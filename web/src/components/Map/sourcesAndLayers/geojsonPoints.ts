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
    })
  }
  if (!map.getLayer(`${layer.name}`)) {
    const color = layer.name.includes('Airstrip') ? 'red' : 'orange'

    map.addLayer({
      id: `${layer.name}`,
      type: 'circle',
      source: layer.name,
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': color,
        'circle-radius': 5,
        'circle-stroke-color': '#623c74',
        'circle-stroke-width': 1,
      },
    })
  }
}
