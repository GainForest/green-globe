import mapboxgl from 'mapbox-gl'

const DRONE_FLIGHT_PATHS = [
  {
    name: 'Test Flight Path',
    url: '/flight-paths/testFlightPath.geojson',
  },
  {
    name: 'Drone Flight 5',
    url: '/flight-paths/DJI_0005.geojson',
  },
]

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
      const res = await fetch(`${process.env.AWS_STORAGE}${flightPath.url}`)
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
