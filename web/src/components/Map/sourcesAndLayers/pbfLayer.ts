export const addVectorTileLayer = (map) => {
  if (!map.getSource('vector-tiles-source')) {
    map.addSource('vector-tiles-source', {
      type: 'vector',
      tiles: [
        'https://storage.googleapis.com/tree-detection-vector-tiles/andrew@gainforest.net/manaus/800/mvt_tiles/{z}/{x}/{y}.pbf',
      ],
    })
  }

  if (!map.getLayer('vector-tiles-layer')) {
    map.addLayer({
      id: 'vector-tiles-layer',
      type: 'line',
      source: 'vector-tiles-source',
      'source-layer': 'mvt-tiles',
      paint: {
        'line-color': 'blue',
      },
    })
  }
}
