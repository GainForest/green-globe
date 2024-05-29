import mapboxgl from 'mapbox-gl'

export const addAmazonBasinSourceAndLayer = async (map: mapboxgl.Map) => {
  try {
    const res = await fetch('world_without_amazon.geojson')
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
        type: 'fill',
        source: 'amazonBasinSource',
        paint: {
          'fill-color': '#FFFFFF', // fill color
          'fill-opacity': 0.65, // opacity
        },
      })
    }
  } catch {
    console.log('unable to fetch amazon basin')
  }
}
