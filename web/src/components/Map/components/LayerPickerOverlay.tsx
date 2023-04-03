/* eslint-disable jsx-a11y/click-events-have-key-events */
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
        cursor: 'pointer',
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
          cursor: 'pointer',
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
          cursor: 'pointer',
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
          cursor: 'pointer',
          width: '40px',
          height: '40px',
          backgroundImage: `url("data:image/jpeg;base64,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")`,
          backgroundSize: 'cover',
          borderRadius: '4px',
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
