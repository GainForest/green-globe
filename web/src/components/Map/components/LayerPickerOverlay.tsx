import { useState } from 'react'

import mapboxgl from 'mapbox-gl'

export const LayerPickerOverlay = ({ map }: { map: mapboxgl.Map }) => {
  return (
    <div
      style={{
        width: '240px',
        height: '80px',
        backgroundColor: '#ffffff',
        position: 'absolute',
        bottom: 40,
        right: 40,
        borderRadius: '8px',
      }}
    >
      <LayersBox map={map} />
      <SatelliteLayerBox map={map} />
    </div>
  )
}

const LayersBox = ({ map }) => {
  const [baseLayer, setBaseLayer] = useState<'light' | 'dark'>('dark')

  const backgroundColor = baseLayer == 'light' ? '#282C34' : '#CAD2D3'
  return (
    <button
      style={{
        width: '40px',
        height: '40px',
        backgroundColor,
      }}
      onClick={() => {
        if (baseLayer == 'dark') {
          map.setStyle(`mapbox://styles/mapbox/light-v10`)
          setBaseLayer('light')
        } else {
          map.setStyle(`mapbox://styles/mapbox/dark-v10`)
          setBaseLayer('dark')
        }
      }}
    >
      {baseLayer}
    </button>
  )
}

const SatelliteLayerBox = ({ map }) => {
  return (
    <button
      style={{
        width: '40px',
        height: '40px',
      }}
      onClick={() => {
        map.setStyle(`mapbox://styles/mapbox/satellite-v9`)
      }}
    ></button>
  )
}
