import mapboxgl from 'mapbox-gl'

const TITILER_ENDPOINT =
  'http://127.0.0.1:8000/cog/tiles/WebMercatorQuad/{z}/{x}/{y}@1x?url=file://'

const ALLTILES = [
  '/Users/sharfy/Code/xprize-2/web/public/data/drone/1_webmercator.tif',
  '/Users/sharfy/Code/xprize-2/web/public/data/drone/20240414_134447_ssc15_u0001_visual_clip_webmercator.tif',
  '/Users/sharfy/Code/xprize-2/web/public/data/drone/20240414_134447_ssc15_u0002_visual_clip_webmercator.tif',
  '/Users/sharfy/Code/xprize-2/web/public/data/drone/20240428_191813_ssc16_u0001_visual_clip_webmercator.tif',
  '/Users/sharfy/Code/xprize-2/web/public/data/drone/20240428_191813_ssc16_u0002_visual_clip_webmercator.tif',
]

export const addCOGSourceAndLayers = (map: mapboxgl.Map) => {
  ALLTILES.forEach((d) => {
    if (!map.getSource(`${d}Source`)) {
      map.addSource(`${d}Source`, {
        type: 'raster',
        tiles: [`${TITILER_ENDPOINT}${d}`],
        tileSize: 256,
      })
    }
    if (!map.getLayer(`${d}Layer`)) {
      map.addLayer({
        id: `${d}Layer`,
        type: 'raster',
        source: `${d}Source`,
        paint: {
          'raster-opacity': 1,
        },
      })
    }
  })
}
