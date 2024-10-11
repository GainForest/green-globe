import mapboxgl from 'mapbox-gl'

// On mouse move and on mouse leave
export const displayProjectNamePopup = (
  e: mapboxgl.MapMouseEvent & { features?: mapboxgl.MapboxGeoJSONFeature[] },
  map: mapboxgl.Map,
  popup: mapboxgl.Popup
) => {
  if (!e.features || e.features.length === 0) return

  const feature = e.features[0]
  const coordinates = feature.geometry.coordinates.slice() as [number, number]
  const description = feature.properties?.name

  // Ensure popup appears over the correct feature copy when zoomed out
  if (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
  }

  map.getCanvas().style.cursor = 'pointer'
  popup.setLngLat(coordinates).setHTML(description).addTo(map)
}

export const removeProjectNamePopup = (
  map: mapboxgl.Map,
  popup: mapboxgl.Popup
) => {
  map.getCanvas().style.cursor = ''
  popup.remove()
}
