import mapboxgl from 'mapbox-gl'

import { GeospatialLayer } from 'src/types'

export const addChoroplethSourceAndLayers = (
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
          ['get', 'species_richness'], // hardcoded for now
          0,
          '#471064',
          2.4,
          '#306D8E',
          4.8,
          '#219F86',
          7.2,
          '#68CB5C',
          9.6,
          '#71CE55',
          12,
          '#FDE724',
        ],
        'fill-opacity': 1,
      },
    })
  }
}
