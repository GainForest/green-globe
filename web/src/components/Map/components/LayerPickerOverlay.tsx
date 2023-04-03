import { useState } from 'react'

import mapboxgl from 'mapbox-gl'

import { toggleTreesPlantedLayer } from '../maputils'

export const LayerPickerOverlay = ({
  map,
  displayOverlay,
}: {
  map: mapboxgl.Map
  displayOverlay: boolean
}) => {
  return (
    <div
      style={{
        display: 'flex',
        width: '240px',
        height: '80px',
        backgroundColor: '#ffffff',
        position: 'absolute',
        bottom: 40,
        left: displayOverlay ? 380 : 40,
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
    <div style={{ display: 'flex', flexDirection: 'column' }}>
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
            toggleTreesPlantedLayer(map, 'visible')
          } else {
            map.setStyle(`mapbox://styles/mapbox/dark-v10`)
            setBaseLayer('dark')
            toggleTreesPlantedLayer(map, 'visible')
          }
        }}
      />
      {baseLayer == 'light' ? 'dark' : 'light'}
    </div>
  )
}

const SatelliteLayerBox = ({ map }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <button
        style={{
          width: '40px',
          height: '40px',
        }}
        onClick={() => {
          map.setStyle(`mapbox://styles/mapbox/satellite-v9`)
          toggleTreesPlantedLayer(map, 'visible')
        }}
      />
      satellite
    </div>
  )
}
