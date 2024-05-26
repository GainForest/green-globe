import mapboxgl from 'mapbox-gl'

export const addCOGSourceAndLayers = (map: mapboxgl.Map) => {
  if (!map.getSource('COGSource')) {
    map.addSource('COGSource', {
      type: 'raster',
      tiles: [
        'http://127.0.0.1:8000/cog/tiles/WebMercatorQuad/{z}/{x}/{y}@1x?url=file:///Users/sharfy/Downloads/mosaic/1_webmercator.tif',
      ],
      tileSize: 256,
    })
  }
  if (!map.getLayer('COGLayer')) {
    map.addLayer({
      id: 'COGLayer',
      type: 'raster',
      source: 'COGSource',
      paint: {
        'raster-opacity': 1,
      },
    })
  }
}
