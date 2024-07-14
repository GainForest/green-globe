import mapboxgl from 'mapbox-gl'

import { GeospatialLayer } from 'src/types'

export const addChoroplethSourceAndLayers = (
  map: mapboxgl.Map,
  layer: GeospatialLayer
) => {
  console.log('layer endpoint', layer.endpoint)
  if (!map.getSource(layer.name)) {
    map.addSource(layer.name, {
      type: 'geojson',
      data: layer.endpoint,
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
          10,
          '#306D8E',
          20,
          '#219F86',
          30,
          '#68CB5C',
          40,
          '#71CE55',
          50,
          '#FDE724',
        ],
        'fill-opacity': 1,
      },
    })
  }
}
