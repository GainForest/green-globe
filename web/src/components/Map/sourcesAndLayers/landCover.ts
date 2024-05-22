import mapboxgl from 'mapbox-gl'

export const addLandCoverSourceAndLayer = (map: mapboxgl.Map) => {
  if (!map.getSource('landCoverSource')) {
    map.addSource('landCoverSource', landCoverSource)
  }
  if (!map.getLayer('landCoverLayer')) {
    map.addLayer(landCoverLayer)
  }
}

const landCoverLayer = {
  id: 'landCoverLayer',
  type: 'raster',
  source: `landCoverSource`,
  layout: {
    visibility: 'none',
  },
}

const landCoverSource = {
  type: 'raster',
  tiles: [
    `https://services.terrascope.be/wmts/v2?layer=WORLDCOVER_2021_MAP&style=&tilematrixset=EPSG:3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/png&TileMatrix=EPSG:3857:{z}&TileCol={x}&TileRow={y}&TIME=2023-04-12`,
  ],
  tileSize: 256,
  attribution: `<a target="_top" rel="noopener" href="https://gainforest.earth">©2023 GainForest</a>`,
}
