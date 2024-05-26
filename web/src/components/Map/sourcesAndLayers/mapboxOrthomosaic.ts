// This takes in mapbox studio urls

import mapboxgl from 'mapbox-gl'

export const addOrthomosaic = (
  map: mapboxgl.Map,
  mapboxStudioEndpoint: string
) => {
  if (map && mapboxStudioEndpoint && !map.getSource('orthomosaicSource')) {
    map.addSource('orthomosaicSource', {
      type: 'raster',
      url: mapboxStudioEndpoint,
    })
    if (!map.getLayer('orthomosaicLayer')) {
      map.addLayer({
        id: 'orthomosaicLayer',
        source: 'orthomosaicSource',
        type: 'raster',
      })
    }
  }
}
