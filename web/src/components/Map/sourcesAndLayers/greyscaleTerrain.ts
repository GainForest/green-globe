import mapboxgl from 'mapbox-gl'

export const addGreyscaleSourceAndLayers = (map: mapboxgl.Map) => {
  if (!map.getLayer('greyscale')) {
    map.addLayer({
      id: 'greyscale',
      type: 'raster',
      source: {
        type: 'raster',
        url: 'mapbox://mapbox.satellite',
        tileSize: 256,
      },
      paint: {
        'raster-saturation': -1, // Apply greyscale by desaturating the colors
      },
    })
  }
  if (map.getLayer('whiteOverlay')) {
    map.addLayer({
      id: 'whiteOverlay',
      type: 'fill',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [-180, -85],
                [-180, 85],
                [180, 85],
                [180, -85],
                [-180, -85],
              ],
            ],
          },
        },
      },
      layout: {},
      paint: {
        'fill-color': '#ffffff',
        'fill-opacity': 0, // Adjust the opacity as needed
      },
    })
  }
}
