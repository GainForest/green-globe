import mapboxgl from 'mapbox-gl'
import { useDispatch } from 'react-redux'

import { setHoveredInformation } from 'src/reducers/mapReducer'
import { GeospatialLayer } from 'src/types'

import { addChoroplethSourceAndLayers } from './choropleth'
import { addGeojsonLineSourceAndLayer } from './geojsonLine'
import { addGeojsonPointSourceAndLayer } from './geojsonPoints'
import {
  addMeasuredTreesSourceAndLayer,
  removeMeasuredTreesSourceAndLayer,
} from './measuredTrees'
import { addRasterSourceAndLayer } from './raster'
import { addShannonChoroplethSourceAndLayers } from './shannonChoropleth'
import { addTMSTileSourceAndLayer } from './tmsTile'

export const addNamedSource = (map: mapboxgl.Map, layer: GeospatialLayer) => {
  if (!map.getSource(layer.name) && layer.type == 'geojson_points') {
    addGeojsonPointSourceAndLayer(map, layer)
  }
  if (!map.getSource(layer.name) && layer.type == 'geojson_line') {
    addGeojsonLineSourceAndLayer(map, layer)
  }
  if (!map.getSource(layer.name) && layer.type == 'tms_tile') {
    addTMSTileSourceAndLayer(map, layer)
  }
  if (!map.getLayer(layer.name) && layer.type == 'raster_tif') {
    addRasterSourceAndLayer(map, layer)
  }
  if (!map.getSource(layer.name) && layer.type == 'choropleth') {
    addChoroplethSourceAndLayers(map, layer)
  }
  if (!map.getSource(layer.name) && layer.type == 'choropleth_shannon') {
    addShannonChoroplethSourceAndLayers(map, layer)
  }
  if (!map.getSource(layer.name) && layer.type == 'geojson_points_trees') {
    addMeasuredTreesSourceAndLayer(map, layer)
  }
  map.moveLayer(layer.name, 'highlightedSiteOutline')
  map.moveLayer('highlightedSiteOutline', 'gainforestMarkerLayer')
}

export const removeNamedSource = (
  map: mapboxgl.Map,
  layer: GeospatialLayer
) => {
  const dispatch = useDispatch()
  if (map.getSource(layer.name) && layer.type == 'geojson_points_trees') {
    removeMeasuredTreesSourceAndLayer(map, layer)
    dispatch(setHoveredInformation({}))
  }
  if (map.getSource(layer.name)) {
    map.removeLayer(layer.name)
    map.removeSource(layer.name)
  }
}
