import mapboxgl from 'mapbox-gl'

const TITILER_ENDPOINT =
  'http://127.0.0.1:8000/cog/tiles/WebMercatorQuad/{z}/{x}/{y}@1x?url=file://'

export const addNamedSource = (
  map: mapboxgl.Map,
  layer: { name: string; endpoint: string }
) => {
  if (!map.getSource(layer.name)) {
    map.addSource(layer.name, {
      type: 'raster',
      tiles: [`${TITILER_ENDPOINT}${layer.endpoint}`],
      tileSize: 256,
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
}

export const removeNamedSource = (
  map: mapboxgl.Map,
  layer: { name: string }
) => {
  if (map.getSource(layer.name)) {
    map.removeLayer(layer.name)
    map.removeSource(layer.name)
  }
}
