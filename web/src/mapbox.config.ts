import mapboxgl from 'mapbox-gl'
import { offlineBasemapStyle } from './components/Map/offline/basemap'

export const initializeMapbox = (
  containerId: string,
  setMap: React.Dispatch<mapboxgl.Map>,
  bounds?: mapboxgl.LngLatBoundsLike
) => {
  mapboxgl.accessToken = process.env.MAPBOXGL_ACCESSTOKEN
  if (!bounds) {
    const map = new mapboxgl.Map({
      container: containerId,
      projection: 'globe',
      style: 'mapbox://styles/mapbox/satellite-v9',
      zoom: 2,
      center: [102, 9],
      bounds: [
        -60.647280831743664, -2.9562191572952914, -60.64187210310173,
        -2.948123839147461,
      ],
    })
    map.addControl(new mapboxgl.NavigationControl())
    setMap(map)
  } else {
    const map = new mapboxgl.Map({
      container: containerId,
      style: offlineBasemapStyle,
      bounds,
    })
    map.addControl(new mapboxgl.NavigationControl())
    setMap(map)
  }
}

export const MAPBOX_FOG = {
  color: '#000000',
  'high-color': 'rgb(36, 92, 223)',
  'horizon-blend': 0.02,
  'space-color': 'rgb(11, 11, 25)',
  'star-intensity': 0.05,
}

export const verraOutlineLayer = (lineColor: string) => ({
  id: 'verraOutlineLayer',
  type: 'line',
  source: 'verraSource',
  paint: {
    'line-color': lineColor,
    'line-width': 3,
  },
})

export const allSitesSource = (geoJson) => ({
  type: 'geojson',
  data: geoJson,
})

export const verraSource = (geoJson) => ({
  type: 'geojson',
  data: geoJson,
})
