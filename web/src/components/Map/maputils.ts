import bbox from '@turf/bbox'
import center from '@turf/center'
import mapboxgl from 'mapbox-gl'

import {
  projectFillLayer,
  projectOutlineLayer,
  projectSource,
} from 'src/mapbox.config'

export const fetchShapefiles = (setGeoJson) => {
  fetch(
    'https://gainforest-transparency-dashboard.s3.amazonaws.com/shapefiles/gainforest-all-shapefiles.geojson'
  )
    .then((response) => response.json())
    .then((newGeojson) => setGeoJson(newGeojson))
}

export const fetchProjectInfo = async (projectId: number, setResult) => {
  const response = fetch('https://staging.gainforest.app/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query {
          project(id:${projectId}) {
            id
            name
            country
            description
          }
        }
      `,
    }),
  })
    .then((res) => res.json())
    .then((result) => setResult(result.data))
  return response
}

export const addMarkers = (
  map: mapboxgl.Map,
  geoJson: mapboxgl.geoJson,
  setActiveFeature
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
      map.fitBounds(boundingBox, { duration: 2500, padding: 40 })
      setActiveFeature(feature)
    })

    // finally, add the marker to the map
    new mapboxgl.Marker(el)
      .setLngLat(centerpoint.geometry.coordinates)
      .addTo(map)
  }
}

export const addSourcesLayersAndMarkers = (map, geoJson, setActiveFeature) => {
  map.addSource('project', projectSource(geoJson))
  map.addLayer(projectOutlineLayer('#00FF00'))
  map.addLayer(projectFillLayer('#00FF00'))
  addMarkers(map, geoJson, setActiveFeature)
}
