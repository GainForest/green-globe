import mapboxgl from 'mapbox-gl'

export const addGainforestMarkersSourceAndLayer = (map: mapboxgl.Map) => {
  if (!map.getSource('gainforestMarkerSource')) {
    map.addSource('gainforestMarkerSource', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [],
      },
    })
    const sourceAddedEvent = new CustomEvent('sourceAdded', {
      detail: { sourceId: 'gainforestMarkerSource' },
    })
    map.getCanvas().dispatchEvent(sourceAddedEvent)
  }
  if (!map.getLayer('gainforestMarkerLayer')) {
    map.addLayer({
      id: 'gainforestMarkerLayer',
      type: 'symbol',
      source: 'gainforestMarkerSource',
      layout: {
        'icon-image': 'gainforestMarker',
        'icon-size': 0.1, // Adjust the size as needed
        'icon-allow-overlap': true, // Allow icons to overlap
      },
      paint: {
        'icon-opacity': 0.77, // Set the opacity of the icons
      },
    })
    const layerAddedEvent = new CustomEvent('layerAdded', {
      detail: { layerId: 'gainforestMarkerLayer' },
    })
    map.getCanvas().dispatchEvent(layerAddedEvent)
  }
}
