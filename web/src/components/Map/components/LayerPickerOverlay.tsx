/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react'

import styled from 'styled-components'
import { useThemeUI } from 'theme-ui'

import {
  toggleLandCoverLayer,
  togglePotentialTreeCoverLayer,
  toggleTreeCoverLayer,
  toggleTreesPlantedLayer,
} from '../maputils'

export const LayerPickerOverlay = ({ map, activeProjectPolygon }) => {
  const { theme } = useThemeUI()

  return (
    <div
      style={{
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        cursor: 'pointer',
        display: 'flex',
        width: '148px',
        height: '100px',
        backgroundColor: theme.colors.background as string,
        position: 'absolute',
        bottom: 108,
        right: 8,
        borderRadius: '8px',
        padding: '16px 8px 8px 8px',
      }}
    >
      <LandCoverBox map={map} activeProjectPolygon={activeProjectPolygon} />
      <TreeCoverBox map={map} />
      {/* <PotentialTreeCoverBox map={map} /> */}
    </div>
  )
}

const PotentialTreeCoverBox = ({ map }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const imageSrc = '/potentialTreeCoverDark.png'

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
        alt="toggle potential tree cover"
        onClick={() => {
          if (!isVisible) {
            togglePotentialTreeCoverLayer(map, 'visible')
            toggleTreesPlantedLayer(map, 'visible')
            setIsVisible(true)
          } else {
            togglePotentialTreeCoverLayer(map, 'none')
            toggleTreesPlantedLayer(map, 'visible')
            setIsVisible(false)
          }
        }}
      />
      <p style={{ fontSize: '10px' }}>
        potential tree cover {isVisible ? 'on' : 'off'}
      </p>
    </div>
  )
}

const TreeCoverBox = ({ map }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const imageSrc = 'treeCoverDark.png'

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
          if (!isVisible) {
            toggleTreeCoverLayer(map, 'visible')
            toggleTreesPlantedLayer(map, 'visible')
            setIsVisible(true)
          } else {
            toggleTreeCoverLayer(map, 'none')
            toggleTreesPlantedLayer(map, 'visible')
            setIsVisible(false)
          }
        }}
      />
      <p style={{ fontSize: '10px' }}>tree cover {isVisible ? 'on' : 'off'}</p>
    </div>
  )
}

const LandCoverBox = ({ map, activeProjectPolygon }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const imageSrc = 'landCover.png'

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
          if (!isVisible) {
            toggleLandCoverLayer(map, 'visible')
            toggleTreesPlantedLayer(map, 'visible')
            setIsVisible(true)
            map.getSource('project').setData(activeProjectPolygon)
          } else {
            toggleLandCoverLayer(map, 'none')
            toggleTreesPlantedLayer(map, 'visible')
            setIsVisible(false)
          }
        }}
      />
      <p style={{ fontSize: '10px' }}>land cover {isVisible ? 'on' : 'off'}</p>
    </div>
  )
}

const SatelliteLayerBox = ({ map }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

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
        objectFit="fill"
        src="/satellite.png"
        alt="toggle satellite layer"
        onClick={() => {
          if (!isVisible) {
            map.setStyle(`mapbox://styles/mapbox/satellite-streets-v12`)
            togglePotentialTreeCoverLayer(map, 'visible')
            setIsVisible(true)
          } else {
            map.setStyle(`mapbox://styles/mapbox/dark-v11`)
            togglePotentialTreeCoverLayer(map, 'visible')
            setIsVisible(false)
          }
        }}
      />
      <p style={{ fontSize: '10px' }}>
        satellite mode {isVisible ? 'on' : 'off'}
      </p>
    </div>
  )
}

const LayerPickerButton = styled.img`
  display: block;
  margin: 0 auto;
  cursor: pointer;
  width: 40px;
  object-fit: cover;
  height: 40px;
  background-size: cover;
  border-radius: 4px;
  :hover {
    border: 2px solid #67962a;
  }
`
