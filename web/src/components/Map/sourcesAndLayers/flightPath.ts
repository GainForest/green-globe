import mapboxgl from 'mapbox-gl'

export const addFlightPathSourceAndLayer = async (map: mapboxgl.Map) => {
  const links = [
    `${process.env.AWS_STORAGE}/flight-paths/testFlightPath.geojson`,
    `${process.env.AWS_STORAGE}/flight-paths/DJI_0005.geojson`,
    `${process.env.AWS_STORAGE}/flight-paths/DJI_0006.geojson`,
    `${process.env.AWS_STORAGE}/flight-paths/DJI_0007.geojson`,
  ]

  const stringToColor = (str: string) => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    const color = Math.floor(Math.abs(Math.sin(hash) * 16777215) % 16777215)
    return `#${('000000' + color.toString(16)).slice(-6)}`
  }

  for (const link of links) {
    try {
      const res = await fetch(link)
      if (!res.ok) {
        throw new Error(`Failed to fetch ${link}: ${res.statusText}`)
      }

      const flightPathSource = await res.json()

      const sourceId = `flightPathSource-${link}`
      const layerId = `flightPathLayer-${link}`

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
      console.error(`Error processing ${link}:`, error)
    }
  }
}
