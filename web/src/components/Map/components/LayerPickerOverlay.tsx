/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react'

import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { useThemeUI } from 'theme-ui'

import { breakpoints } from 'src/constants'
import { setDisplaySatelliteHistory } from 'src/reducers/satelliteHistoryReducer'

import {
  toggleLandCoverLayer,
  toggleOrthomosaic,
  togglePotentialTreeCoverLayer,
  toggleTreeCoverLayer,
  toggleTreesPlantedLayer,
} from '../maputils'

export const LayerPickerOverlay = ({
  map,
  activeProjectPolygon,
  activeProjectMosaic,
  mediaSize,
  expand,
}) => {
  const { theme } = useThemeUI()

  if (!expand) return null
  return (
    <div
      style={{
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-around',
        width:
          mediaSize >= breakpoints.xl
            ? '250px'
            : mediaSize > breakpoints.l
            ? '230px'
            : mediaSize > breakpoints.m
            ? '210px'
            : mediaSize > breakpoints.s
            ? '190px'
            : '160px',
        height:
          mediaSize >= breakpoints.xl
            ? '100px'
            : mediaSize > breakpoints.l
            ? '92px'
            : mediaSize > breakpoints.m
            ? '86px'
            : mediaSize > breakpoints.s
            ? '78px'
            : '72px',
        backgroundColor: theme.colors.background as string,
        position: 'absolute',
        bottom: 36,
        right: 100,
        borderRadius: '8px',
        padding: '16px 8px 8px 8px',
      }}
    >
      <SatelliteLayerBox map={map} mediaSize={mediaSize} />
      <OrthomosaicToggle
        map={map}
        activeProjectMosaic={activeProjectMosaic}
        mediaSize={mediaSize}
      />
      <LandCoverBox
        map={map}
        activeProjectPolygon={activeProjectPolygon}
        mediaSize={mediaSize}
      />
      <TreeCoverBox map={map} mediaSize={mediaSize} />
    </div>
  )
}

const OrthomosaicToggle = ({ map, activeProjectMosaic, mediaSize }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true)

  const imageSrc = 'orthomosaic.png'
  return activeProjectMosaic?.length > 0 ? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin:
          mediaSize >= breakpoints.xl
            ? '0px 8px'
            : mediaSize > breakpoints.l
            ? '0px 6px'
            : mediaSize > breakpoints.m
            ? '0px 4px'
            : mediaSize > breakpoints.s
            ? '0px 2px'
            : '0px',
        textAlign: 'center',
      }}
    >
      <LayerPickerButton
        type="image"
        src={imageSrc}
        alt="toggle light/dark layer"
        active={isVisible}
        onClick={() => {
          if (!isVisible) {
            toggleOrthomosaic(map, 'visible')
            toggleTreesPlantedLayer(map, 'visible')
            setIsVisible(true)
          } else {
            toggleOrthomosaic(map, 'none')
            toggleTreesPlantedLayer(map, 'visible')
            setIsVisible(false)
          }
        }}
      />
      <p style={{ fontSize: '10px' }}>drone {isVisible ? 'on' : 'off'}</p>
    </div>
  ) : null
}

const PotentialTreeCoverBox = ({ map, mediaSize }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const imageSrc = '/potentialTreeCoverDark.png'

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin:
          mediaSize >= breakpoints.xl
            ? '0px 8px'
            : mediaSize > breakpoints.l
            ? '0px 6px'
            : mediaSize > breakpoints.m
            ? '0px 4px'
            : mediaSize > breakpoints.s
            ? '0px 2px'
            : '0px',
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
      <p
        style={{
          fontSize: '10px',
          width: '48px',
        }}
      >
        potential tree cover {isVisible ? 'on' : 'off'}
      </p>
    </div>
  )
}

const TreeCoverBox = ({ map, mediaSize }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const imageSrc = 'treeCoverDark.png'

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin:
          mediaSize >= breakpoints.xl
            ? '0px 8px'
            : mediaSize > breakpoints.l
            ? '0px 6px'
            : mediaSize > breakpoints.m
            ? '0px 4px'
            : mediaSize > breakpoints.s
            ? '0px 2px'
            : '0px',
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
      <p
        style={{
          fontSize: '10px',
          width: '48px',
        }}
      >
        tree cover {isVisible ? 'on' : 'off'}
      </p>
    </div>
  )
}

const LandCoverBox = ({ map, activeProjectPolygon, mediaSize }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const imageSrc = 'landCover.png'

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin:
          mediaSize >= breakpoints.xl
            ? '0px 8px'
            : mediaSize > breakpoints.l
            ? '0px 6px'
            : mediaSize > breakpoints.m
            ? '0px 4px'
            : mediaSize > breakpoints.s
            ? '0px 2px'
            : '0px',
        textAlign: 'center',
      }}
    >
      <LayerPickerButton
        type="image"
        src={imageSrc}
        alt="toggle land cover layer display"
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
      <p
        style={{
          fontSize: '10px',
          width: '48px',
        }}
      >
        land cover {isVisible ? 'on' : 'off'}
      </p>
    </div>
  )
}

const SatelliteLayerBox = ({ map, mediaSize }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const dispatch = useDispatch()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin:
          mediaSize >= breakpoints.xl
            ? '0px 8px'
            : mediaSize > breakpoints.l
            ? '0px 6px'
            : mediaSize > breakpoints.m
            ? '0px 4px'
            : mediaSize > breakpoints.s
            ? '0px 2px'
            : '0px',
        textAlign: 'center',
      }}
    >
      <LayerPickerButton
        src="/satellite.png"
        alt="toggle satellite layer"
        onClick={() => {
          if (!isVisible) {
            map.setStyle(`mapbox://styles/mapbox/dark-v11`)
            togglePotentialTreeCoverLayer(map, 'visible')
            setIsVisible(true)
            dispatch(setDisplaySatelliteHistory(true))
          } else {
            map.setStyle(`mapbox://styles/mapbox/satellite-v9`)
            togglePotentialTreeCoverLayer(map, 'visible')
            setIsVisible(false)
            dispatch(setDisplaySatelliteHistory(false))
          }
        }}
      />
      <p
        style={{
          fontSize: '10px',
          width: '48px',
        }}
      >
        satellite history {isVisible ? 'on' : 'off'}
      </p>
    </div>
  )
}

export const LayerPickerButton = styled.img`
  display: block;
  margin: 0 auto;
  cursor: pointer;
  width: ${({ mediaSize }) =>
    mediaSize >= breakpoints.xl
      ? '40px'
      : mediaSize > breakpoints.l
      ? '38px'
      : mediaSize > breakpoints.m
      ? '36px'
      : mediaSize > breakpoints.s
      ? '34px'
      : '32px'};
  height: ${({ mediaSize }) =>
    mediaSize >= breakpoints.xl
      ? '40px'
      : mediaSize > breakpoints.l
      ? '38px'
      : mediaSize > breakpoints.m
      ? '36px'
      : mediaSize > breakpoints.s
      ? '34px'
      : '32px'};
  object-fit: cover;
  background-size: cover;
  border-radius: 4px;
  :hover {
    border: 2px solid #67962a;
  }
`
