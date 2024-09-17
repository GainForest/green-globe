import mapboxgl from 'mapbox-gl'

import { GeospatialLayer } from 'src/types'

export const addShannonChoroplethSourceAndLayers = (
  map: mapboxgl.Map,
  layer: GeospatialLayer
) => {
  if (!map.getSource(layer.name)) {
    map.addSource(layer.name, {
      type: 'geojson',
      data: `${process.env.AWS_STORAGE}/${layer.endpoint}`,
    })
  }

  if (!map.getLayer(layer.name)) {
    map.addLayer({
      id: layer.name,
      type: 'fill',
      source: layer.name,
      paint: {
        'fill-color': [
          'interpolate',
          ['linear'],
          ['get', 'shannon_index'], // hardcoded for now
          0,
          '#471064',
          1,
          '#306D8E',
          2,
          '#219F86',
          3,
          '#68CB5C',
          4,
          '#71CE55',
          5,
          '#FDE724',
        ],
        'fill-opacity': 1,
      },
    })
  }
}
