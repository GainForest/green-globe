/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react'

import mapboxgl from 'mapbox-gl'
import styled from 'styled-components'

import {
  addPlanetLabsSourceAndLayers,
  toggleTreesPlantedLayer,
} from '../maputils'

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
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        cursor: 'pointer',
        display: 'flex',
        width: '172px',
        height: '72px',
        backgroundColor: '#ffffff',
        position: 'absolute',
        bottom: 36,
        left: displayOverlay ? 380 : 8,
        borderRadius: '8px',
        padding: '16px 8px 8px 8px',
      }}
    >
      <LightDarkModeBox map={map} />
      <SatelliteLayerBox map={map} />
      <DroneLayerBox map={map} />
    </div>
  )
}

const LightDarkModeBox = ({ map }) => {
  const [baseLayer, setBaseLayer] = useState<'light' | 'dark'>('dark')

  const imageSrc = baseLayer == 'light' ? 'darkMode.png' : 'lightMode.png'
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin: '0px 8px',
        textAlign: 'center',
      }}
    >
      <LayerPickerButton
        type="image"
        src={imageSrc}
        alt="toggle light/dark layer"
        onClick={() => {
          if (baseLayer == 'dark') {
            map.setStyle(`mapbox://styles/mapbox/light-v11`)
            setBaseLayer('light')
            toggleTreesPlantedLayer(map, 'visible')
          } else {
            map.setStyle(`mapbox://styles/mapbox/dark-v11`)
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
      <LayerPickerButton
        type="image"
        src="/satellite.png"
        alt="toggle satellite layer"
        onClick={() => {
          map.setStyle(`mapbox://styles/mapbox/satellite-streets-v12`)
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
      <LayerPickerButton
        type="image"
        src="/satellite.png"
        alt="toggle satellite layer"
        onClick={() => {
          addPlanetLabsSourceAndLayers(map)
          toggleTreesPlantedLayer(map, 'visible')
        }}
      />
      <p style={{ fontSize: '12px' }}>history</p>
    </div>
  )
}

const LayerPickerButton = styled.input`
  display: block;
  margin: 0 auto;
  cursor: pointer;
  width: 40px;
  height: 40px;
  background-size: cover;
  border-radius: 4px;
`
