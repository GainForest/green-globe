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
    const layerNameLower = layer.name.toLowerCase()
    let color = '#FFA500' // 🎨 Default: Vibrant orange
    let emoji = '📍' // Default emoji

    // 🌈 Colorful layer identification
    switch (true) {
      case layerNameLower.includes('airstrip'):
        color = '#FF4136' // 🛫 Airstrip: Vibrant red
        emoji = '✈️'
        break
      case layerNameLower.includes('water'):
        color = '#7FDBFF' // 💧 Water: Bright sky blue
        emoji = '💧'
        break
      case layerNameLower.includes('surface'):
        color = '#85144b' // 🏔️ Surface: Deep maroon
        emoji = '🏔️'
        break
      case layerNameLower.includes('raft'):
        color = '#000000' // 🛶 Raft: Teal
        emoji = '🛶'
        break
    }

    console.log(`Adding layer: ${emoji} ${layer.name} (${color})`)

    map.addLayer({
      id: `${layer.name}`,
      type: 'circle',
      source: layer.name,
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': color,
        'circle-radius': 6,
        'circle-stroke-color': '#FFFFFF',
        'circle-stroke-width': 2,
      },
    })
  }
}
