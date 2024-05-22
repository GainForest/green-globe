import mapboxgl from 'mapbox-gl'

export const addHexagonsSourceAndLayers = (map: mapboxgl.Map, hexagons) => {
  if (!map.getSource('hexagons')) {
    map.addSource('hexagons', hexagonsSource(hexagons))
  }
  if (!map.getLayer('hexagonClickFillLayer')) {
    map.addLayer(hexagonClickFillLayer())
  }
  if (!map.getLayer('hexagonOutline')) {
    map.addLayer(hexagonOutlineLayer('#00FF00'))
  }
  if (!map.getLayer('hexagonHoverFill')) {
    map.addLayer(hexagonHoverFillLayer())
  }
}

export const hexagonsSource = (hexagonsGeoJson) => ({
  type: 'geojson',
  data: hexagonsGeoJson,
  generateId: true,
})

const hexagonOutlineLayer = (lineColor: string) => ({
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

const hexagonHoverFillLayer = () => ({
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

const hexagonClickFillLayer = () => ({
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
