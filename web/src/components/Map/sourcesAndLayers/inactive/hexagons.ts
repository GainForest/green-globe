import mapboxgl from 'mapbox-gl'

// Hexagon onclick
// useEffect(() => {
//   if (map) {
//     const onClick = (e) => {
//       console.log(e)
//       const { lat, lng } = e.lngLat
//       dispatch(setClickedCoordinates({ lat, lon: lng }))
//       dispatch(setInfoOverlay(6))
//       const hoveredHexagonId = e.features[0]?.id
//       if (
//         map.getFeatureState({ source: 'hexagons', id: hoveredHexagonId })
//           ?.clicked
//       ) {
//         map.setFeatureState(
//           { source: 'hexagons', id: hoveredHexagonId },
//           { clicked: false }
//         )
//         numHexagons.current = numHexagons.current - 1
//       } else {
//         map.setFeatureState(
//           { source: 'hexagons', id: hoveredHexagonId },
//           { clicked: true }
//         )
//         numHexagons.current = numHexagons.current + 1
//       }
//     }

//     map.on('click', 'hexagonHoverFill', onClick)

//     return () => {
//       if (map) {
//         map.off('click', 'hexagonHoverFill', onClick)
//       }
//     }
//   }
// }, [map])

// useEffect(() => {
//   if (map) {
//     let hoveredHexagonId = null
//     const onMouseMoveHexagonHoverFill = (e) => {
//       if (e.features.length > 0) {
//         if (hoveredHexagonId !== null) {
//           map.setFeatureState(
//             { source: 'hexagons', id: hoveredHexagonId },
//             { hover: false }
//           )
//         }
//         hoveredHexagonId = e.features[0]?.id
//         map.setFeatureState(
//           { source: 'hexagons', id: hoveredHexagonId },
//           { hover: true }
//         )
//       }
//     }
//     const onMouseLeaveHexagonHoverFill = () => {
//       if (hoveredHexagonId !== null) {
//         map.setFeatureState(
//           { source: 'hexagons', id: hoveredHexagonId },
//           { hover: false }
//         )
//         hoveredHexagonId = null
//       }
//     }
//     map.on('mousemove', 'hexagonHoverFill', onMouseMoveHexagonHoverFill)
//     map.on('mouseleave', 'hexagonHoverFill', onMouseLeaveHexagonHoverFill)
//     return () => {
//       if (map) {
//         map.off('mousemove', 'hexagonHoverFill', onMouseMoveHexagonHoverFill)
//         map.off(
//           'mouseleave',
//           'hexagonHoverFill',
//           onMouseLeaveHexagonHoverFill
//         )
//       }
//     }
//   }
// }, [map])

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
