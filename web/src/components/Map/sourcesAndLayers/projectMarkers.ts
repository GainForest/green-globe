import mapboxgl from 'mapbox-gl'

import { EMPTY_GEOJSON } from 'src/constants'

export const addProjectMarkers = (map: mapboxgl.Map) => {
  if (!map.hasImage('gainforestMarker')) {
    map.loadImage('circle-gainforest.png', (error, image) => {
      if (error) throw error
      map.addImage('gainforestMarkerImage', image)
    })
  }
  if (!map.getSource('gainforestMarkerSource')) {
    map.addSource('gainforestMarkerSource', {
      type: 'geojson',
      data: EMPTY_GEOJSON,
    })
  }
  if (!map.getLayer('gainforestMarkerLayer')) {
    map.addLayer({
      id: 'gainforestMarkerLayer',
      type: 'symbol',
      source: 'gainforestMarkerSource',
      layout: {
        'icon-image': 'gainforestMarkerImage',
        'icon-size': 0.07, // Adjust the size as needed
        'icon-allow-overlap': true, // Allow icons to overlap
      },
      paint: {
        'icon-opacity': 1,
      },
    })
  }
}
