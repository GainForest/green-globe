/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react'

import mapboxgl from 'mapbox-gl'
import styled from 'styled-components'
import { useColorMode, useThemeUI } from 'theme-ui'

import {
  toggleLandCoverLayer,
  togglePotentialTreeCoverLayer,
  toggleTreeCoverLayer,
  toggleTreesPlantedLayer,
} from '../maputils'

export const LayerPickerOverlay = ({ map }: { map: mapboxgl.Map }) => {
  const { theme } = useThemeUI()

  return (
    <div
      style={{
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        cursor: 'pointer',
        display: 'flex',
        width: '304px',
        height: '96px',
        backgroundColor: theme.colors.background as string,
        position: 'absolute',
        bottom: 108,
        right: 8,
        borderRadius: '8px',
        padding: '16px 8px 8px 8px',
      }}
    >
      <LightDarkModeBox map={map} />
      <SatelliteLayerBox map={map} />
      <LandCoverBox map={map} />
      <TreeCoverBox map={map} />
      <PotentialTreeCoverBox map={map} />
    </div>
  )
}

const PotentialTreeCoverBox = ({ map }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const imageSrc = '/potentialTreeCoverDark.png'

  // Retain tree cover layer state when the map changes
  useEffect(() => {
    if (map) {
      map.on('styledata', () => {
        if (!isVisible) {
          togglePotentialTreeCoverLayer(map, 'none')
        } else {
          togglePotentialTreeCoverLayer(map, 'visible')
        }
      })
    }
  }, [map, isVisible])
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
      <p style={{ fontSize: '10px', margin: '3px' }}>
        potential tree cover {isVisible ? 'on' : 'off'}
      </p>
    </div>
  )
}

const TreeCoverBox = ({ map }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true)

  const imageSrc = '/treeCoverDark.png'

  // Retain tree cover layer state when the map changes
  useEffect(() => {
    if (map) {
      map.on('styledata', () => {
        if (!isVisible) {
          toggleTreeCoverLayer(map, 'none')
        } else {
          toggleTreeCoverLayer(map, 'visible')
        }
      })
    }
  }, [map, isVisible])
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
      <p style={{ fontSize: '10px', margin: '2px' }}>
        current tree cover {isVisible ? 'on' : 'off'}
      </p>
    </div>
  )
}

const LandCoverBox = ({ map }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const imageSrc = '/landCover.png'

  // Retain land cover layer state when the map changes
  useEffect(() => {
    if (map) {
      map.on('styledata', () => {
        if (!isVisible) {
          toggleLandCoverLayer(map, 'none')
        } else {
          toggleLandCoverLayer(map, 'visible')
        }
      })
    }
  }, [map, isVisible])

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

const LightDarkModeBox = ({ map }) => {
  const [theme, setTheme] = useColorMode()

  const oppositeTheme = theme == 'light' ? 'dark' : 'light'

  const imageSrc = theme == 'light' ? '/darkMode.png' : '/lightMode.png'
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
          map.setStyle(`mapbox://styles/mapbox/${oppositeTheme}-v11`)
          setTheme(oppositeTheme)
          toggleTreesPlantedLayer(map, 'visible')
        }}
      />
      <p style={{ fontSize: '10px' }}>{oppositeTheme} mode</p>
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
      <p style={{ fontSize: '10px' }}>satellite mode</p>
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
  :hover {
    border: 2px solid #67962a;
  }
`
