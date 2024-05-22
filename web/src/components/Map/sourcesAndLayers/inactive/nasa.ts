import mapboxgl from 'mapbox-gl'

export const addNasaSourceAndLayer = (map: mapboxgl.Map) => {
  // const tilePath =
  //   'wmts/epsg4326/best/' +
  //   'MODIS_Terra_CorrectedReflectance_TrueColor/default/' +
  //   '2018-06-01/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg'

  // const tilePath =
  //   'https://gibs-c.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?TIME=2023-07-15T00:00:00Z&layer=VIIRS_NOAA20_CorrectedReflectance_TrueColor&style=default&tilematrixset=250m&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fjpeg&TileMatrix=1&TileCol=1&TileRow=0'

  map.addSource('nasaSource', {
    type: 'raster',
    tiles: [
      'https://gitc-b.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?TIME=2023-07-16T00:00:00Z&layer=VIIRS_SNPP_CorrectedReflectance_TrueColor&style=default&tilematrixset=250m&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fjpeg&TileMatrix={z}&TileCol={x}&TileRow={y}',
    ],
    tileSize: 256,
  })
  map.addLayer({
    id: 'nasaLayer',
    type: 'raster',
    source: 'nasaSource',
  })
}
