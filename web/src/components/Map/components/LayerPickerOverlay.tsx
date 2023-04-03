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
        width: '172px',
        height: '80px',
        backgroundColor: '#ffffff',
        position: 'absolute',
        bottom: 40,
        left: displayOverlay ? 380 : 40,
        borderRadius: '8px',
        padding: '8px',
      }}
    >
      <LayersBox map={map} />
      <SatelliteLayerBox map={map} />
      <DroneLayerBox map={map} />
    </div>
  )
}

const LayersBox = ({ map }) => {
  const [baseLayer, setBaseLayer] = useState<'light' | 'dark'>('dark')

  const backgroundColor = baseLayer == 'light' ? '#282C34' : '#CAD2D3'
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin: '0px 8px',
        textAlign: 'center',
      }}
    >
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
      <p style={{ fontSize: '12px' }}>
        {baseLayer == 'light' ? 'dark' : 'light'}
      </p>
    </div>
  )
}

const SatelliteLayerBox = ({ map }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin: '0px 8px',
        textAlign: 'center',
      }}
    >
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
      <p style={{ fontSize: '12px' }}>satellite</p>
    </div>
  )
}

const DroneLayerBox = ({ map }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin: '0px 8px',
        textAlign: 'center',
      }}
    >
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
      <p style={{ fontSize: '12px' }}>drone</p>
    </div>
  )
}
