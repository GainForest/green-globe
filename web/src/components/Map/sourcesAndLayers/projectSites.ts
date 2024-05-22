import mapboxgl from 'mapbox-gl'

// Both of the below layers should be added at the same time.
// This layer displays all of the sites belonging to one project.
export const addAllSitesSourceAndLayer = (map: mapboxgl.Map) => {
  if (!map.getSource('allSites')) {
    map.addSource('allSites', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: null,
          },
        ],
      },
    })
  }
  if (map.getSource('allSites') && !map.getLayer('allSitesOutline')) {
    map.addLayer(allSitesOutlineLayer('#00FF00'))
  }
  if (map.getSource('allSites') && !map.getLayer('allSitesFill')) {
    map.addLayer(allSitesFillLayer('#00FF00'))
  }
}

// This layer highlights the current selected site
export const addHighlightedSiteSourceAndLayer = (map: mapboxgl.Map) => {
  if (!map.getSource('highlightedSite')) {
    map.addSource('highlightedSite', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: null,
          },
        ],
      },
    })
  }
  if (
    map.getSource('highlightedSite') &&
    !map.getLayer('highlightedSiteOutline')
  ) {
    map.addLayer(highlightedSiteOutlineLayer('#FFEA00'))
  }
}

const highlightedSiteOutlineLayer = (lineColor: string) => ({
  id: 'highlightedSiteOutline',
  type: 'line',
  source: 'highlightedSite',
  paint: {
    'line-color': lineColor,
    'line-width': 3,
  },
})

const allSitesOutlineLayer = (lineColor: string) => ({
  id: 'allSitesOutline',
  type: 'line',
  source: 'allSites',
  paint: {
    'line-color': lineColor,
    'line-width': 3,
  },
})

const allSitesFillLayer = (lineColor: string) => ({
  id: 'allSitesFill',
  type: 'fill',
  source: 'allSites', // reference the data source
  paint: {
    'fill-color': lineColor, // gainforest color fill
    'fill-opacity': 0.05,
  },
})
