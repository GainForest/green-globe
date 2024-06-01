import mapboxgl from 'mapbox-gl'

import { DRONE_FLIGHT_PATHS } from '../../../../../data/flight_paths/config'

export const addFlightPathSourceAndLayer = async (map: mapboxgl.Map) => {
  const stringToColor = (str: string) => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    const color = Math.floor(Math.abs(Math.sin(hash) * 16777215) % 16777215)
    return `#${('000000' + color.toString(16)).slice(-6)}`
  }

  for (const flightPath of DRONE_FLIGHT_PATHS) {
    try {
      const res = await fetch(flightPath.url)
      if (!res.ok) {
        throw new Error(`Failed to fetch ${flightPath.url}: ${res.statusText}`)
      }

      const flightPathSource = await res.json()

      const sourceId = `flightPathSource-${flightPath.name}`
      const layerId = `flightPathLayer-${flightPath.name}`

      if (!map.getSource(sourceId)) {
        map.addSource(sourceId, {
          type: 'geojson',
          data: flightPathSource,
        })
      }

      const color = stringToColor(sourceId)

      if (!map.getLayer(layerId)) {
        map.addLayer({
          id: layerId,
          type: 'line',
          source: sourceId,
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
            visibility: 'visible',
          },
          paint: {
            'line-color': color,
            'line-width': 2,
          },
        })
      }
    } catch (error) {
      console.error('Error reading GeoJSON file:', error)
    }
  }
}
