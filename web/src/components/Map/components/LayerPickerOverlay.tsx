/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useRef } from 'react'

import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { useThemeUI } from 'theme-ui'

import { countryCodes } from 'src/constants'
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
  activeProjectMosaic,
  activeProjectData,
}) => {
  const { theme } = useThemeUI()
  const [expandLayers, setExpandLayers] = useState(false)

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current)
    setExpandLayers(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setExpandLayers(false)
    }, 1000)
  }

  return (
    <div>
      {expandLayers && (
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-around',
            width: '250px',
            height: '100px',
            backgroundColor: theme.colors.background as string,
            position: 'absolute',
            bottom: 36,
            right: 100,
            borderRadius: '8px',
            padding: '16px 8px 8px 8px',
          }}
        >
          <SatelliteLayerBox activeProjectData={activeProjectData} map={map} />
          <OrthomosaicToggle
            map={map}
            activeProjectMosaic={activeProjectMosaic}
          />
          <LandCoverBox map={map} />
          <TreeCoverBox map={map} />
        </div>
      )}
      <div
        style={{
          cursor: 'pointer',
          display: 'flex',
          width: '60px',
          height: '60px',
          position: 'absolute',
          bottom: 56,
          right: 20,
          borderRadius: '8px',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'block' }}>
          <button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              width: '60px',
              height: '60px',
              background: `url(/satellite.png) no-repeat center center`,
              border: '2px solid black',
              padding: 0,
              color: 'white',
              fontSize: '12px',
              textShadow:
                '1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, -1px 1px 1px black',
              cursor: 'pointer',
              overflow: 'hidden',
              borderRadius: '4px',
            }}
          >
            <img
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                borderRadius: '4px',
                objectFit: 'cover',
                backgroundSize: 'cover',
              }}
              src="/satellite.png"
              alt="layers"
            />
            Layers
          </button>
        </div>
      </div>
    </div>
  )
}

const OrthomosaicToggle = ({ map, activeProjectMosaic }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true)

  const imageSrc = '/orthomosaic.png'
  return activeProjectMosaic?.length > 0 ? (
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

const TreeCoverBox = ({ map }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const imageSrc = '/treeCoverDark.png'

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
            setIsVisible(true)
          } else {
            toggleTreeCoverLayer(map, 'none')
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

const LandCoverBox = ({ map }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const imageSrc = '/landCover.png'

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
        alt="toggle land cover layer display"
        onClick={() => {
          if (!isVisible) {
            toggleLandCoverLayer(map, 'visible')
            setIsVisible(true)
          } else {
            toggleLandCoverLayer(map, 'none')
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

const SatelliteLayerBox = ({ map, activeProjectData }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const dispatch = useDispatch()

  return countryCodes.includes(activeProjectData?.project?.country) ? (
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
            map.setStyle(`mapbox://styles/mapbox/dark-v11`)
            setIsVisible(true)
            dispatch(setDisplaySatelliteHistory(true))
          } else {
            map.setStyle(`mapbox://styles/mapbox/satellite-v9`)
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
  ) : null
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
