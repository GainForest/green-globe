import mapboxgl from 'mapbox-gl'

import { EMPTY_GEOJSON } from 'src/constants'

export const addHiveSourceAndLayers = (map: mapboxgl.Map) => {
  if (!map.hasImage('hive')) {
    map.loadImage('hive.png', (error, image) => {
      if (error) throw error
      map.addImage('hiveImage', image)
    })
  }
  if (!map.getSource('hiveSource')) {
    map.addSource('hiveSource', {
      type: 'geojson',
      data: EMPTY_GEOJSON,
    })
  }
  if (!map.getLayer('hiveLayer')) {
    map.addLayer({
      id: 'hiveLayer',
      type: 'circle',
      source: 'hiveSource',
      paint: {
        'circle-color': '#b284be',
        'circle-radius': 20,
        'circle-stroke-color': '#623c74',
        'circle-stroke-width': 1,
      },
    })
    map.addLayer({
      id: 'hiveLImageayer',
      type: 'symbol',
      source: 'hiveSource',
      layout: {
        'icon-image': 'hiveImage',
        'icon-size': 0.1,
        'icon-allow-overlap': true,
      },
      paint: {
        'icon-opacity': 1,
      },
    })
  }
}
