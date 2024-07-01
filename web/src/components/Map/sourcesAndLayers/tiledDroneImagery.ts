import mapboxgl from 'mapbox-gl'

export const addTiledDroneImagery = (
  map: mapboxgl.Map,
  layer: { name: string; type: string; endpoint: string }
) => {
  map.addSource(layer.name, {
    type: 'raster',
    tiles: [layer.endpoint],
    tileSize: 256, // Tile size, usually 256 or 512
    scheme: 'tms', // Specify that the tiles are in TMS format
  })

  map.addLayer({
    id: layer.name,
    type: 'raster',
    source: layer.name,
  })
}
