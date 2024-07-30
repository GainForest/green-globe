import mapboxgl from 'mapbox-gl'

export const addRasterSourceAndLayer = async (
  map: mapboxgl.Map,
  layer: { name: string; endpoint: string; type: string }
) => {
  try {
    if (!map.getSource(layer.name)) {
      map.addSource(layer.name, {
        type: 'raster',
        tiles: [layer.endpoint],
      })
    }
    if (!map.getLayer(layer.name)) {
      map.addLayer({
        id: layer.name,
        type: 'raster',
        source: layer.name,
        paint: {
          'raster-opacity': 1,
        },
      })
    }
  } catch (error) {
    console.error('Error reading GeoJSON file:', error)
  }
}
