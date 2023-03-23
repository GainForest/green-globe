import turf from '@turf/center'
import mapboxgl from 'mapbox-gl'

import {
  projectFillLayer,
  projectOutlineLayer,
  projectSource,
} from 'src/mapbox.config'

export const fetchAndSetShapefiles = (setGeoJson) => {
  fetch(
    'https://gainforest-transparency-dashboard.s3.amazonaws.com/shapefiles/gainforest-all-shapefiles.geojson'
  )
    .then((response) => response.json())
    .then((newGeojson) => setGeoJson(newGeojson))
}

export const addMarkers = (geoJson: mapboxgl.geoJson, map: mapboxgl.Map) => {
  for (const feature of geoJson.features) {
    // create a HTML element for each feature
    const el = document.createElement('div')
    el.className = 'map-marker'
    const centerpoint = turf(feature)
    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
      .setLngLat(centerpoint.geometry.coordinates)
      .addTo(map)
  }
}

export const addSourcesAndLayers = (map, geoJson) => {
  map.addSource('project', projectSource(geoJson))
  map.addLayer(projectOutlineLayer('#00FF00'))
  map.addLayer(projectFillLayer('#00FF00'))
  addMarkers(geoJson, map)
}
