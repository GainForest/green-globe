import mapboxgl from 'mapbox-gl'

export const initializeMapboxConfig = (
  containerId: string,
  bounds?: mapboxgl.LngLatBoundsLike
) => {
  mapboxgl.accessToken = process.env.MAPBOXGL_ACCESSTOKEN
  if (!bounds) {
    const map = new mapboxgl.Map({
      container: containerId,
      style: 'mapbox://styles/mapbox/light-v11',
      fitBoundsOptions: { padding: 24 },
      zoom: 1,
      center: [0, 20],
      bounds,
    })
    map.addControl(new mapboxgl.NavigationControl())
    return map
  } else {
    const map = new mapboxgl.Map({
      container: containerId,
      style: 'mapbox://styles/mapbox/light-v11',
      fitBoundsOptions: { padding: 24 },
      bounds,
    })
    map.addControl(new mapboxgl.NavigationControl())
    return map
  }
}

export const projectOutlineLayer = (lineColor: string) => ({
  id: 'projectOutline',
  type: 'line',
  source: 'project',
  paint: {
    'line-color': lineColor,
    'line-width': 3,
  },
})

export const projectFillLayer = (lineColor: string) => ({
  id: 'projectFill',
  type: 'fill',
  source: 'project', // reference the data source
  paint: {
    'fill-color': lineColor, // gainforest color fill
    'fill-opacity': 0.05,
  },
})
