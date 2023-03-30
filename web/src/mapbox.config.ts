import mapboxgl from 'mapbox-gl'

export const initializeMapbox = (
  containerId: string,
  setMap: React.Dispatch<mapboxgl.Map>,
  bounds?: mapboxgl.LngLatBoundsLike
) => {
  mapboxgl.accessToken = process.env.MAPBOXGL_ACCESSTOKEN
  if (!bounds) {
    const map = new mapboxgl.Map({
      container: containerId,
      style: 'mapbox://styles/mapbox/dark-v10',
      fitBoundsOptions: { padding: 24 },
      zoom: 1,
      center: [0, 20],
      bounds,
    })
    map.addControl(new mapboxgl.NavigationControl())
    setMap(map)
  } else {
    const map = new mapboxgl.Map({
      container: containerId,
      style: 'mapbox://styles/mapbox/dark-v10',
      fitBoundsOptions: { padding: 24 },
      bounds,
    })
    map.addControl(new mapboxgl.NavigationControl())
    setMap(map)
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

export const clusteredTreesLayer = {
  id: 'clusteredTrees',
  type: 'circle',
  source: 'trees',
  filter: ['has', 'point_count'],
  paint: {
    'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
    'circle-opacity': 0.5,
    'circle-color': 'green',
    'circle-stroke-color': 'green',
    'circle-stroke-opacity': 1,
  },
}

export const clusteredTreesCountTextLayer = {
  id: 'clusteredTreesCountText',
  type: 'symbol',
  source: 'trees',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12,
  },
}

export const unclusteredTreesLayer = {
  id: 'unclusteredTrees',
  type: 'circle',
  source: 'trees',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': 'green',
    'circle-radius': 4,
    'circle-stroke-color': 'green',
  },
}

export const projectSource = (geoJson) => ({
  type: 'geojson',
  data: geoJson,
})

export const treesSource = (treesGeoJson) => ({
  type: 'geojson',
  data: treesGeoJson,
})
