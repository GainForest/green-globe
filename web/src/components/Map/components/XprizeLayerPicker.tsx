import { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Tooltip } from 'react-tooltip'
import styled from 'styled-components'
import { useThemeUI } from 'theme-ui'

import { setDisplaySatelliteHistory } from 'src/reducers/satelliteHistoryReducer'

import {
  addNamedSource,
  removeNamedSource,
} from '../sourcesAndLayers/cogSourceAndLayers'

const XprizeLayerPicker = ({ map }) => {
  const { theme } = useThemeUI()
  const dispatch = useDispatch()
  const satelliteEnabled = useSelector(
    (state: State) => state.satelliteHistory.enabled
  )
  const [layers, setLayers] = useState([])
  const [showLayers, setShowLayers] = useState(true)
  const [visible, setVisible] = useState(false)

  const layersData = [
    {
      name: 'Tree Crown Delineations',
      type: 'geojson_line',
      endpoint: `${process.env.AWS_STORAGE}/layers/tree_crowns.geojson`,
      description: 'Outlines the canopy extents of individual trees.',
    },
    {
      name: 'Drone Flights',
      type: 'tms_tile',
      endpoint: `${process.env.AWS_STORAGE}/layers/tms_tiles/{z}/{x}/{y}.png`,
      description: 'High-resolution drone layer of the competition area.',
    },
    {
      name: 'Tumbira Drone Flights',
      type: 'raster_tif',
      endpoint: `${process.env.TITILER_ENDPOINT}/layers/competition_area_drone_cog.tif`,
      description: 'High-resolution drone layer of the Tumbira region.',
    },
    {
      name: 'PM 2.5 (MK Tau)',
      type: 'raster_tif',
      endpoint: `${process.env.TITILER_ENDPOINT}/layers/pm2.5/FinalSite_RescaleAOD_01-22_MK_tau_rescaled.tif`,
      description:
        'Measures increased pollution. Darker colors represent increases in levels of PM2.5 (particulate matter of less than 2.5 micrometers) between 2001 and 2022.',
    },
    {
      name: 'PM 2.5 (MK Tau 95% Confidence Level)',
      type: 'raster_tif',
      endpoint: `${process.env.TITILER_ENDPOINT}/layers/pm2.5/FinalSite_RescaleAOD_01-22_MK_tau_95Signif_rescaled.tif`,
      description:
        'Measures increased pollution. Darker colors represent increases in levels of PM2.5 (particulate matter of less than 2.5 micrometers) between 2001 and 2022.',
    },
    {
      name: 'Tumbira Regrowth (Year of regrowth)',
      type: 'raster_tif',
      endpoint: `${process.env.TITILER_ENDPOINT}/layers/deforestation_regeneration/Tumbira_lt-gee_regrowth_map_yod_w_rescaled_webmercator_cog.tif`,
    },
    {
      name: 'NICFI Tiles',
      type: 'raster_tif',
      endpoint: `${process.env.TITILER_ENDPOINT}/layers/nicfi/`,
      tilePattern: 'L15-{x}E-{y}N.tif',
      tileRange: {
        x: { min: 677, max: 683 },
        y: { min: 1004, max: 1008 },
      },
    },
  ]

  useEffect(() => {
    setLayers(
      layersData
        .filter(
          (layer) =>
            !(
              layer.name == 'NICFI Tiles' &&
              !window.location.host.includes('localhost')
            )
        )
        .map((layer) => ({
          ...layer,
          name: layer.name
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '),
          isActive: false,
        }))
    )
  }, [])

  const handleToggle = (name) => {
    setLayers((prevLayers) =>
      prevLayers.map((layer) => {
        if (layer.name === name) {
          const isActive = !layer.isActive
          if (isActive) {
            if (layer.name === 'NICFI Tiles') {
              addNICFISource(map, layer)
            } else {
              addNamedSource(map, layer)
            }
          } else {
            if (layer.name === 'NICFI Tiles') {
              removeNICFISource(map, layer)
            } else {
              removeNamedSource(map, layer)
            }
          }
          return { ...layer, isActive }
        }
        return layer
      })
    )
  }

  const addNICFISource = (map, layer) => {
    const { tileRange, tilePattern, endpoint } = layer
    for (let x = tileRange.x.min; x <= tileRange.x.max; x++) {
      for (let y = tileRange.y.min; y <= tileRange.y.max; y++) {
        const tileName = tilePattern
          .replace('{x}', x.toString().padStart(4, '0'))
          .replace('{y}', y)
        const tileEndpoint = `${endpoint}${tileName}`
        addNamedSource(map, {
          ...layer,
          name: `NICFI_${x}_${y}`,
          endpoint: tileEndpoint,
        })
      }
    }
  }

  const removeNICFISource = (map, layer) => {
    const { tileRange } = layer
    for (let x = tileRange.x.min; x <= tileRange.x.max; x++) {
      for (let y = tileRange.y.min; y <= tileRange.y.max; y++) {
        removeNamedSource(map, { ...layer, name: `NICFI_${x}_${y}` })
      }
    }
  }

  const handleShowLayers = () => {
    setShowLayers((showLayers) => !showLayers)
    setVisible(true)
    setTimeout(() => setVisible(false), 100)
  }

  if (!showLayers) {
    return (
      <Maximize onClick={handleShowLayers}>
        <Icon className="material-icons-round">layers</Icon>
        <Text>Explore our layers</Text>
      </Maximize>
    )
  } else
    return (
      <Container visible={visible} theme={theme}>
        <Minimize className="material-icons-round" onClick={handleShowLayers}>
          close
        </Minimize>
        <LayerTitle>Explore the Geospatial Data</LayerTitle>
        <br />
        {layers.map((layer, index) => (
          <LayerItem key={index} onClick={() => handleToggle(layer.name)}>
            <LayerIcon
              className="material-icons-round"
              isActive={layer.isActive}
              theme={theme}
            >
              {layer.isActive ? 'toggle_on' : 'toggle_off'}
            </LayerIcon>
            <LayerLabel
              htmlFor={layer.name}
              isActive={layer.isActive}
              data-tooltip-id={`info-button-clipTip-${layer.name}`}
            >
              {layer.name}
            </LayerLabel>
            <Tooltip
              id={`info-button-clipTip-${layer.name}`}
              delayShow={10}
              place={'right'}
              opacity={1}
              style={{ maxWidth: '300px' }}
            >
              {layer.description}
            </Tooltip>
          </LayerItem>
        ))}
        <LayerItem
          key={'satellite history'}
          onClick={() => {
            if (!satelliteEnabled) {
              dispatch(setDisplaySatelliteHistory(true))
            } else {
              dispatch(setDisplaySatelliteHistory(false))
            }
          }}
        >
          <LayerIcon
            className="material-icons-round"
            isActive={satelliteEnabled}
            theme={theme}
          >
            {satelliteEnabled ? 'toggle_on' : 'toggle_off'}
          </LayerIcon>
          <LayerLabel
            data-tooltip-id={`info-button-clipTip-satellite-history`}
            htmlFor={'satellite history'}
            isActive={satelliteEnabled}
          >
            Satellite History
          </LayerLabel>
          <Tooltip id={`info-button-clipTip-satellite-history`} delayShow={10}>
            Historical monthly satellite data. (Tropical regions only)
          </Tooltip>
        </LayerItem>
      </Container>
    )
}

const LayerImage = styled.img`
  display: block;
  margin: 0 auto;
  cursor: pointer;
  width: 40px;
  object-fit: cover;
  height: 40px;
  background-size: cover;
  border-radius: 4px;
  :hover {
    border: 2px solid #669629;
  }
`

const Container = styled.div<{ theme }>`
  position: absolute;
  top: 70px;
  left: 20px;
  background-color: ${(props) => props.theme.colors.background};
  color: black;
  border-radius: 4px;
  padding: 10px;
  transition: opacity 0.3s ease;
  opacity: ${({ visible }) => (visible ? 0 : 0.95)};
`

const Maximize = styled.button`
  position: absolute;
  top: 70px;
  left: 20px;
  border: none;
  font-size: 14px;
  font-height: 26px;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  background-color: #000000;
  color: black;
  display: flex;
  width: 36px;
  transition: width 0.3s ease, background-color 0.3s ease;
  overflow: hidden;
  white-space: nowrap;
  opacity: ${({ visible }) => (visible ? 0 : 1)};
  display: flex;
  align-items: center;

  width: 180px;
`

const Icon = styled.span`
  display: inline-block;
  color: white;
  opacity: 1;
  font-size: 28px;
`

const Text = styled.span`
  margin-left: 5px;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;
  opacity: 1;
`

const Minimize = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  border: none;
  color: black;
  font-size: 24px;
  cursor: pointer;
  padding: 5px;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 4px;
  transition: background-color 0.3s ease;
`

const LayerTitle = styled.div`
  height: 10px;
`

const LayerItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 28px;
`

const LayerLabel = styled.label`
  margin-left: 4px;
  cursor: pointer;
  opacity: ${({ isActive }) => (isActive ? 1 : 0.75)};
  color: black;
  font-size: 14px;
  transition: color 0.3s ease;
`

const LayerIcon = styled.span<{ theme }>`
  font-size: 36px;
  transition: color 0.3s ease;
  color: ${({ isActive, theme }) => (isActive ? 'black' : theme.colors.hinted)};
`

export default XprizeLayerPicker
