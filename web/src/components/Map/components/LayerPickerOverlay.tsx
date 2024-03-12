/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useRef } from 'react'

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
  maximize,
}) => {
  const { theme } = useThemeUI()
  const [expandLayers, setExpandLayers] = useState(false)
  const [satellite, setSatellite] = useState(false)
  const [landCover, setLandCover] = useState(false)
  const [orthomosaic, setOrthoMosaic] = useState(false)
  const [treeCover, setTreeCover] = useState(false)

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = () => {
    if (mediaSize >= breakpoints.m) {
      clearTimeout(timeoutRef.current)
      setExpandLayers(true)
    }
  }

  const handleMouseLeave = () => {
    if (mediaSize >= breakpoints.m) {
      timeoutRef.current = setTimeout(() => {
        setExpandLayers(false)
      }, 1000)
    }
  }

  return mediaSize >= breakpoints.m || !maximize ? (
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
            bottom: mediaSize < breakpoints.m ? 'auto' : 36,
            right: mediaSize < breakpoints.m ? 'auto' : 100,
            top: mediaSize < breakpoints.m ? 60 : 'auto',
            left: mediaSize < breakpoints.m ? 100 : 'auto',
            borderRadius: '8px',
            padding: '16px 8px 8px 8px',
          }}
        >
          <SatelliteLayerBox
            map={map}
            satellite={satellite}
            setSatellite={setSatellite}
          />
          <OrthomosaicToggle
            map={map}
            activeProjectMosaic={activeProjectMosaic}
            orthomosaic={orthomosaic}
            setOrthomosaic={setOrthoMosaic}
          />
          <LandCoverBox
            map={map}
            landCover={landCover}
            setLandCover={setLandCover}
            activeProjectPolygon={activeProjectPolygon}
          />
          <TreeCoverBox
            treeCover={treeCover}
            setTreeCover={setTreeCover}
            map={map}
          />
        </div>
      )}
      <div
        style={{
          cursor: 'pointer',
          display: 'flex',
          width: '60px',
          height: '60px',
          position: 'absolute',
          bottom: mediaSize < breakpoints.m ? 'auto' : 56,
          top: mediaSize < breakpoints.m ? 80 : 'auto',
          right: mediaSize < breakpoints.m ? 'auto' : 20,
          left: mediaSize < breakpoints.m ? 20 : 'auto',
          borderRadius: '8px',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'block' }}>
          <button
            onClick={() => setExpandLayers((layers) => !layers)}
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
  ) : null
}

const OrthomosaicToggle = ({
  map,
  activeProjectMosaic,
  orthomosaic,
  setOrthomosaic,
}) => {
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
        active={orthomosaic}
        onClick={() => {
          if (!orthomosaic) {
            toggleOrthomosaic(map, 'visible')
            toggleTreesPlantedLayer(map, 'visible')
            setOrthomosaic(true)
          } else {
            toggleOrthomosaic(map, 'none')
            toggleTreesPlantedLayer(map, 'visible')
            setOrthomosaic(false)
          }
        }}
      />
      <p style={{ fontSize: '10px' }}>drone {orthomosaic ? 'on' : 'off'}</p>
    </div>
  ) : null
}

// const PotentialTreeCoverBox = ({ map }) => {
//   const [isVisible, setIsVisible] = useState<boolean>(false)

//   const imageSrc = '/potentialTreeCoverDark.png'

//   return (
//     <div
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         margin: '0px 8px',
//         textAlign: 'center',
//       }}
//     >
//       <LayerPickerButton
//         type="image"
//         src={imageSrc}
//         alt="toggle potential tree cover"
//         onClick={() => {
//           if (!isVisible) {
//             togglePotentialTreeCoverLayer(map, 'visible')
//             toggleTreesPlantedLayer(map, 'visible')
//             setIsVisible(true)
//           } else {
//             togglePotentialTreeCoverLayer(map, 'none')
//             toggleTreesPlantedLayer(map, 'visible')
//             setIsVisible(false)
//           }
//         }}
//       />
//       <p
//         style={{
//           fontSize: '10px',
//           width: '48px',
//         }}
//       >
//         potential tree cover {isVisible ? 'on' : 'off'}
//       </p>
//     </div>
//   )
// }

const TreeCoverBox = ({ map, treeCover, setTreeCover }) => {
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
          if (!treeCover) {
            toggleTreeCoverLayer(map, 'visible')
            toggleTreesPlantedLayer(map, 'visible')
            setTreeCover(true)
          } else {
            toggleTreeCoverLayer(map, 'none')
            toggleTreesPlantedLayer(map, 'visible')
            setTreeCover(false)
          }
        }}
      />
      <p
        style={{
          fontSize: '10px',
          width: '48px',
        }}
      >
        tree cover {treeCover ? 'on' : 'off'}
      </p>
    </div>
  )
}

const LandCoverBox = ({
  map,
  activeProjectPolygon,
  landCover,
  setLandCover,
}) => {
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
          if (!landCover) {
            toggleLandCoverLayer(map, 'visible')
            toggleTreesPlantedLayer(map, 'visible')
            setLandCover(true)
            map.getSource('project').setData(activeProjectPolygon)
          } else {
            toggleLandCoverLayer(map, 'none')
            toggleTreesPlantedLayer(map, 'visible')
            setLandCover(false)
          }
        }}
      />
      <p
        style={{
          fontSize: '10px',
          width: '48px',
        }}
      >
        land cover {landCover ? 'on' : 'off'}
      </p>
    </div>
  )
}

const SatelliteLayerBox = ({ map, satellite, setSatellite }) => {
  const dispatch = useDispatch()

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
          if (!satellite) {
            map.setStyle(`mapbox://styles/mapbox/dark-v11`)
            togglePotentialTreeCoverLayer(map, 'visible')
            setSatellite(true)
            dispatch(setDisplaySatelliteHistory(true))
          } else {
            map.setStyle(`mapbox://styles/mapbox/satellite-v9`)
            togglePotentialTreeCoverLayer(map, 'visible')
            setSatellite(false)
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
        satellite history {satellite ? 'on' : 'off'}
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
