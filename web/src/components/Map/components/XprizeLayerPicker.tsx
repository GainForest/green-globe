import { useState, useEffect } from 'react'

import mapboxgl from 'mapbox-gl'
const XprizeLayerPicker = ({ map }) => {
  const [layers, setLayers] = useState([])

  const layersData = [
    {
      name: 'forest-density-layer',
      endpoint: 'forest_density.tif',
    },
    {
      name: 'urban-heat-island-layer',
      endpoint: 'urban_heat_island.tif',
    },
    {
      name: 'water-bodies-layer',
      endpoint: 'water_bodies.tif',
    },
    {
      name: 'soil-moisture-layer',
      endpoint: 'soil_moisture.tif',
    },
  ]

  useEffect(() => {
    setLayers(
      layersData.map((layer) => ({
        name: layer.name,
        endpoint: layer.endpoint,
        isActive: false,
      }))
    )
  }, [])

  const handleToggle = (name) => {
    setLayers((prevLayers) =>
      prevLayers.map((layer) => {
        if (layer.name === name) {
          const isActive = !layer.isActive
          if (isActive) {
            addSource(map, layer)
          } else {
            removeSource(map, layer)
          }
          return { ...layer, isActive }
        }
        return layer
      })
    )
  }

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '200px',
        right: '100px',
        backgroundColor: '#1E202480',
      }}
    >
      {layers.map((layer, index) => (
        <div key={index}>
          <ToggleButton
            name={layer.name}
            isActive={layer.isActive}
            onToggle={handleToggle}
          />
          <label htmlFor={layer.name}>{layer.name}</label>
        </div>
      ))}
    </div>
  )
}

export default XprizeLayerPicker

export const addSource = (
  map: mapboxgl.Map,
  layer: { name: string; endpoint: string }
) => {
  if (!map.getSource(layer.name)) {
    map.addSource(layer.name, {
      type: 'raster',
      tiles: [layer.endpoint],
      tileSize: 256,
    })
    if (map.getLayer(layer.name)) {
      map.addLayer({
        id: layer.name,
        type: 'raster',
        source: layer.name,
        paint: {
          'raster-opacity': 1,
        },
      })
    }
  }
}

export const ToggleButton = ({ name, isActive, onToggle }) => {
  return (
    <button onClick={() => onToggle(name)}>
      <span className="material-icons-round">
        {isActive ? 'toggle_on' : 'toggle_off'}
      </span>
    </button>
  )
}

export const removeSource = (map: mapboxgl.Map, layer: { name: string }) => {
  if (map.getSource(layer.name)) {
    map.removeLayer(layer.name)
    map.removeSource(layer.name)
  }
}
