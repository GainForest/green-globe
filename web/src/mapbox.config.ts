import mapboxgl from 'mapbox-gl'

import { breakpoints } from 'src/constants'

export const initializeMapbox = (
  containerId: string,
  setMap: React.Dispatch<mapboxgl.Map>,
  mediaSize,
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
      bounds,
    })
    map.addControl(new mapboxgl.NavigationControl())
    setMap(map)
  } else {
    const map = new mapboxgl.Map({
      container: containerId,
      style: 'mapbox://styles/mapbox/dark-v11',
      bounds,
    })
    map.addControl(new mapboxgl.NavigationControl())
    setMap(map)
  }
}

export const allSitesOutlineLayer = (lineColor: string) => ({
  id: 'allSitesOutline',
  type: 'line',
  source: 'allSites',
  paint: {
    'line-color': lineColor,
    'line-width': 3,
  },
})

export const allSitesFillLayer = (lineColor: string) => ({
  id: 'allSitesFill',
  type: 'fill',
  source: 'allSites', // reference the data source
  paint: {
    'fill-color': lineColor, // gainforest color fill
    'fill-opacity': 0.05,
  },
})

export const highlightedSiteOutlineLayer = (lineColor: string) => ({
  id: 'highlightedSiteOutline',
  type: 'line',
  source: 'highlightedSite',
  paint: {
    'line-color': lineColor,
    'line-width': 3,
  },
})

export const verraOutlineLayer = (lineColor: string) => ({
  id: 'verraOutlineLayer',
  type: 'line',
  source: 'verraSource',
  paint: {
    'line-color': lineColor,
    'line-width': 3,
  },
})

export const hexagonOutlineLayer = (lineColor: string) => ({
  id: 'hexagonOutline',
  type: 'line',
  source: 'hexagons',
  paint: {
    'line-color': lineColor,
    'line-width': 3,
    'line-opacity': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      1,
      0.2,
    ],
  },
})

export const hexagonHoverFillLayer = () => ({
  id: 'hexagonHoverFill',
  type: 'fill',
  source: 'hexagons',
  paint: {
    'fill-color': '#627BC1',
    'fill-opacity': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      1,
      0.2,
    ],
  },
})

export const hexagonClickFillLayer = () => ({
  id: 'hexagonClickFillLayer',
  type: 'fill',
  source: 'hexagons',
  paint: {
    'fill-color': '#627BC1',
    'fill-opacity': [
      'case',
      ['boolean', ['feature-state', 'clicked'], false],
      1,
      0.2,
    ],
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
    'circle-color': '#ff77c1',
    'circle-stroke-color': '#ff77c1',
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
    'circle-color': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      '#0883fe',
      '#ff77c1',
    ],
    'circle-radius': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      8,
      4,
    ],
    'circle-stroke-width': 1,
    'circle-stroke-color': '#000000',
  },
}
export const allSitesSource = (geoJson) => ({
  type: 'geojson',
  data: geoJson,
})

export const verraSource = (geoJson) => ({
  type: 'geojson',
  data: geoJson,
})

export const hexagonsSource = (hexagonsGeoJson) => ({
  type: 'geojson',
  data: hexagonsGeoJson,
  generateId: true,
})

export const treesSource = (treesGeoJson) => ({
  type: 'geojson',
  data: treesGeoJson,
  cluster: true,
  clusterMaxZoom: 15, // Max zoom to cluster points on
  clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
})

export const generatePlanetSource = (planetDate: string) => ({
  type: 'raster',
  tiles: [
    `https://tiles3.planet.com/basemaps/v1/planet-tiles/planet_medres_visual_${planetDate}_mosaic/gmap/{z}/{x}/{y}.png?api_key=${process.env.NICFI_API_KEY}`,
  ],
  tileSize: 256,
  attribution: `<a target="_top" rel="noopener" href="https://gainforest.earth">Mosaic Date: ${planetDate}</a> | <a target="_top" rel="noopener" href="https://www.planet.com/nicfi/">Imagery ©2023 Planet Labs Inc</a> | <a target="_top" rel="noopener" href="https://gainforest.earth">©2023 GainForest</a>`,
})

export const treeCoverLayer = {
  id: 'treeCoverLayer',
  type: 'raster',
  source: `treeCoverSource`,
  layout: {
    visibility: 'none',
  },
}

export const treeCoverSource = {
  type: 'raster',
  tiles: [
    `https://storage.googleapis.com/earthenginepartners-hansen/tiles/gfc_v1.4/tree_alpha/{z}/{x}/{y}.png`,
  ],
  tileSize: 256,
  attribution: `<a target="_top" rel="noopener" href="https://gainforest.earth">©2023 GainForest</a>`,
}

export const potentialTreeCoverSource = {
  type: 'raster',
  tiles: [
    `https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/61656cc4ddd685befa6e87be32c46ac8-66a6b7f6c3ac4b77c9443e4450efa009/tiles/{z}/{x}/{y}`,
  ],
  tileSize: 256,
  attribution: `<a target="_top" rel="noopener" href="https://gainforest.earth">©2023 GainForest</a>`,
}

export const landCoverSource = {
  type: 'raster',
  tiles: [
    `https://services.terrascope.be/wmts/v2?layer=WORLDCOVER_2021_MAP&style=&tilematrixset=EPSG:3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/png&TileMatrix=EPSG:3857:{z}&TileCol={x}&TileRow={y}&TIME=2023-04-12`,
  ],
  tileSize: 256,
  attribution: `<a target="_top" rel="noopener" href="https://gainforest.earth">©2023 GainForest</a>`,
}

export const landCoverLayer = {
  id: 'landCoverLayer',
  type: 'raster',
  source: `landCoverSource`,
  layout: {
    visibility: 'none',
  },
}

export const potentialTreeCoverLayer = {
  id: 'potentialTreeCoverLayer',
  type: 'raster',
  source: `potentialTreeCoverSource`,
  layout: {
    visibility: 'none',
  },
}

export const generatePlanetLayer = (
  planetDate: string,
  visibility: string
) => ({
  id: `planetLayer${planetDate}`,
  type: 'raster',
  source: `planetTile${planetDate}`,
  layout: {
    visibility: visibility,
  },
})
