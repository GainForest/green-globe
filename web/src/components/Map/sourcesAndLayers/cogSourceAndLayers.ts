import mapboxgl from 'mapbox-gl'

import { addGeojsonLineSourceAndLayer } from './geojsonLine'
import { addRasterSourceAndLayer } from './raster'
import { addTMSTileSourceAndLayer } from './tmsTile'

export const addNamedSource = (
  map: mapboxgl.Map,
  layer: { name: string; endpoint: string; type: string }
) => {
  if (!map.getSource(layer.name) && layer.type == 'geojson_line') {
    addGeojsonLineSourceAndLayer(map, layer)
  }
  if (!map.getSource(layer.name) && layer.type == 'tms_tile') {
    addTMSTileSourceAndLayer(map, layer)
  }
  if (!map.getLayer(layer.name) && layer.type == 'raster_tif') {
    addRasterSourceAndLayer(map, layer)
  }
  map.moveLayer(layer.name, 'highlightedSiteOutline')
  map.moveLayer('highlightedSiteOutline', 'gainforestMarkerLayer')
}

export const removeNamedSource = (
  map: mapboxgl.Map,
  layer: { name: string }
) => {
  if (map.getSource(layer.name)) {
    map.removeLayer(layer.name)
    map.removeSource(layer.name)
  }
}
