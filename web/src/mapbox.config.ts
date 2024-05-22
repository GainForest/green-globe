import mapboxgl from 'mapbox-gl'

import { breakpoints } from 'src/constants'

export const initializeMapbox = (
  containerId: string,
  setMap: React.Dispatch<mapboxgl.Map>,
  mediaSize,
  bounds?: mapboxgl.LngLatBoundsLike
) => {
  mapboxgl.accessToken = process.env.MAPBOXGL_ACCESSTOKEN
  if (!bounds) {
    const map = new mapboxgl.Map({
      container: containerId,
      projection: 'globe',
      style: 'mapbox://styles/mapbox/satellite-v9',
      zoom: 2,
      center: [102, 9],
      bounds,
    })
    map.addControl(new mapboxgl.NavigationControl())
    setMap(map)
  } else {
    const map = new mapboxgl.Map({
      container: containerId,
      style: 'mapbox://styles/mapbox/satellite-v9',
      bounds,
    })
    map.addControl(new mapboxgl.NavigationControl())
    setMap(map)
  }
}

export const verraOutlineLayer = (lineColor: string) => ({
  id: 'verraOutlineLayer',
  type: 'line',
  source: 'verraSource',
  paint: {
    'line-color': lineColor,
    'line-width': 3,
  },
})

export const allSitesSource = (geoJson) => ({
  type: 'geojson',
  data: geoJson,
})

export const verraSource = (geoJson) => ({
  type: 'geojson',
  data: geoJson,
})

export const landCoverSource = {
  type: 'raster',
  tiles: [
    `https://services.terrascope.be/wmts/v2?layer=WORLDCOVER_2021_MAP&style=&tilematrixset=EPSG:3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/png&TileMatrix=EPSG:3857:{z}&TileCol={x}&TileRow={y}&TIME=2023-04-12`,
  ],
  tileSize: 256,
  attribution: `<a target="_top" rel="noopener" href="https://gainforest.earth">©2023 GainForest</a>`,
}

export const landCoverLayer = {
  id: 'landCoverLayer',
  type: 'raster',
  source: `landCoverSource`,
  layout: {
    visibility: 'none',
  },
}
