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

  // Mask
  map.addLayer({
    id: 'mask-area-fill',
    type: 'fill',
    source: 'allSites',
    paint: {
      'fill-color': 'rgba(0, 0, 0, 0)', // Transparent fill to create the mask
    },
  })

  map.addLayer({
    id: 'mask-area-fill-inverse',
    type: 'fill',
    source: 'allSites',
    paint: {
      'fill-color': '#FFFFFF',
      'fill-opacity': 0.6,
    },
  })

  if (map.getLayer('whiteOverlay')) {
    map.addLayer({
      id: 'whiteOverlay',
      type: 'fill',
      source: 'allSites',
      paint: {
        'fill-color': '#ffffff',
        'fill-opacity': 1, // Adjust the opacity as needed
      },
    })
  }
}
