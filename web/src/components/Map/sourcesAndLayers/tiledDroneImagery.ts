import mapboxgl from 'mapbox-gl'

export const addTiledDroneImagery = (map: mapboxgl.Map) => {
  map.addSource('tms-tiles-source', {
    type: 'raster',
    tiles: [
      `${process.env.AWS_STORAGE}/layers/tms_tiles/{z}/{x}/{y}.png`, // Your TMS tile URL template
    ],
    tileSize: 256, // Tile size, usually 256 or 512
    scheme: 'tms', // Specify that the tiles are in TMS format
  })

  map.addLayer({
    id: 'tms-tiles-layer',
    type: 'raster',
    source: 'tms-tiles-source',
  })
}
