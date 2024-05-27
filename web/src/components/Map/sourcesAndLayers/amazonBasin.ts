import mapboxgl from 'mapbox-gl'

export const addAmazonBasinSourceAndLayer = async (map: mapboxgl.Map) => {
  try {
    const res = await fetch('amazonBasin.geojson')
    if (!res.ok) {
      throw new Error(`Failed to fetch amazon basin: ${res.statusText}`)
    }

    const amazonBasinSource = await res.json()
    if (!map.getSource('amazonBasinSource')) {
      map.addSource('amazonBasinSource', {
        type: 'geojson',
        data: amazonBasinSource,
      })
    }
    if (!map.getLayer('amazonBasinLayer')) {
      map.addLayer({
        id: 'amazonBasinLayer',
        type: 'line',
        source: 'amazonBasinSource',
        paint: {
          'line-color': '#FFEA00',
          'line-width': 3,
        },
      })
    }
    console.log('should show up')
  } catch {
    console.log('unable to fetch amazon basin')
  }
}
