import mapboxgl from 'mapbox-gl'

import { addMarkers } from '../maputils'

export const addHiveSourceAndLayers = (
  map: mapboxgl.Map,
  hiveLocations,
  setMarkers
) => {
  if (hiveLocations) {
    const newMarkers = addMarkers(map, hiveLocations, 'hive')
    setMarkers((markers) => [...markers, ...newMarkers])
  }
}
