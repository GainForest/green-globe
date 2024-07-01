import mapboxgl from 'mapbox-gl'

export const addNamedSource = (
  map: mapboxgl.Map,
  layer: { name: string; endpoint: string }
) => {
  if (!map.getSource(layer.name)) {
    map.addSource(layer.name, {
      type: 'raster',
      tiles: [`${process.env.TITILER_ENDPOINT}${layer.endpoint}`],
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
  map.moveLayer(layer.name, 'highlightedSiteOutline')
  map.moveLayer('highlightedSiteOutline', 'gainforestMarkerLayer')
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
