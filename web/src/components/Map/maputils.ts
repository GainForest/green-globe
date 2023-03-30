import bbox from '@turf/bbox'
import center from '@turf/center'
import mapboxgl from 'mapbox-gl'

import {
  clusteredTreesCountTextLayer,
  clusteredTreesLayer,
  projectFillLayer,
  projectOutlineLayer,
  projectSource,
  treesSource,
  unclusteredTreesLayer,
} from 'src/mapbox.config'

export const addMarkers = (
  map: mapboxgl.Map,
  geoJson: mapboxgl.geoJson,
  setActiveFeature,
  setDisplayOverlay
) => {
  for (const feature of geoJson.features) {
    // create the marker HTML element
    const el = document.createElement('div')
    el.className = 'map-marker'

    const centerpoint = center(feature)
    const boundingBox = bbox(feature)

    // display a popup with the project name on hover
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 20,
      anchor: 'left',
    })
      .setLngLat(centerpoint.geometry.coordinates)
      .setText(feature.properties.name)

    el.addEventListener('mouseenter', () => popup.addTo(map))
    el.addEventListener('mouseleave', () => popup.remove())

    el.addEventListener('click', () => {
      map.fitBounds(boundingBox, {
        duration: 2500,
        padding: { top: 40, bottom: 40, left: 420, right: 40 },
      })
      setActiveFeature(feature)
      setDisplayOverlay(true)
    })

    // finally, add the marker to the map
    new mapboxgl.Marker(el)
      .setLngLat(centerpoint.geometry.coordinates)
      .addTo(map)
  }
}

export const addSourcesLayersAndMarkers = (
  map,
  geoJson,
  treesGeoJson,
  setActiveFeature,
  setDisplayOverlay
) => {
  map.addSource('project', projectSource(geoJson))
  map.addSource('trees', treesSource(treesGeoJson))
  map.addLayer(clusteredTreesLayer)
  map.addLayer(clusteredTreesCountTextLayer)
  map.addLayer(unclusteredTreesLayer)
  map.addLayer(projectOutlineLayer('#00FF00'))
  map.addLayer(projectFillLayer('#00FF00'))
  addMarkers(map, geoJson, setActiveFeature, setDisplayOverlay)
}
