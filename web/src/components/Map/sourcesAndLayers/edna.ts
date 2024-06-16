import mapboxgl from 'mapbox-gl'

import { EMPTY_GEOJSON } from 'src/constants'

export const addEDNASourceAndLayers = (map: mapboxgl.Map) => {
  if (!map.hasImage('ednaImage')) {
    map.loadImage('dna.png', (error, image) => {
      if (error) throw error
      map.addImage('ednaImage', image)
    })
  }
  if (!map.getSource('ednaSource')) {
    map.addSource('ednaSource', {
      type: 'geojson',
      data: EMPTY_GEOJSON,
    })
  }
  if (!map.getLayer('ednaLayer')) {
    map.addLayer({
      id: 'ednaLayer',
      type: 'circle',
      source: 'ednaSource',
      paint: {
        'circle-color': '#b284be',
        'circle-radius': 20,
        'circle-stroke-color': '#623c74',
        'circle-stroke-width': 1,
      },
    })
    map.addLayer({
      id: 'ednaImageLayers',
      type: 'symbol',
      source: 'ednaSource',
      layout: {
        'icon-image': 'ednaImage',
        'icon-size': 0.1, // Adjust the size as needed
        'icon-allow-overlap': true, // Allow icons to overlap
      },
      paint: {
        'icon-opacity': 1,
      },
    })
  }
}
