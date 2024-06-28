import { useState, useEffect } from 'react'

import styled from 'styled-components'

import {
  addNamedSource,
  removeNamedSource,
} from '../sourcesAndLayers/cogSourceAndLayers'

const XprizeLayerPicker = ({ map }) => {
  const [layers, setLayers] = useState([])
  const [showLayers, setShowLayers] = useState(false)
  const [visible, setVisible] = useState(false)

  let layersData = []
  if (window.location.host.includes('localhost')) {
    layersData = [
      {
        name: 'Competition Area Drone',
        endpoint: 'data/drone/1_webmercator.tif',
      },
      {
        name: 'Tumbira Deforestation YOD',
        endpoint:
          'data/layers/deforestation_regeneration/Tumbira_lt-gee_deforestation_Yod_w.tif',
      },
      {
        name: 'Tumbira Deforestation Dur',
        endpoint:
          'data/layers/deforestation_regeneration/Tumbira_lt-gee_deforestation_dur_w.tif',
      },
      {
        name: 'Tumbira Deforestation Mag',
        endpoint:
          'data/layers/deforestation_regeneration/Tumbira_lt-gee_deforestation_mag_w.tif',
      },
      {
        name: 'Tumbira Regrowth Map Dur',
        endpoint:
          'data/layers/deforestation_regeneration/Tumbira_lt-gee_regrowth_map_dur_w.tif',
      },
      {
        name: 'Tumbira Regrowth Map Mag',
        endpoint:
          'data/layers/deforestation_regeneration/Tumbira_lt-gee_regrowth_map_mag_w.tif',
      },
      {
        name: 'Tumbira Regrowth Map Yod',
        endpoint:
          'data/layers/deforestation_regeneration/Tumbira_lt-gee_regrowth_map_yod_w.tif',
      },
      // End
      {
        name: 'PM 2.5 2001',
        endpoint: 'data/layers/pm2.5/Rescale_rs_AVG_AOD_2001_webmercator.tif',
      },
      {
        name: 'PM 2.5 2002',
        endpoint: 'data/layers/pm2.5/Rescale_rs_AVG_AOD_2002.tif',
      },
      {
        name: 'PM 2.5 2003',
        endpoint: 'data/layers/pm2.5/Rescale_rs_AVG_AOD_2003.tif',
      },
      {
        name: 'PM 2.5 2004',
        endpoint: 'data/layers/pm2.5/Rescale_rs_AVG_AOD_2004.tif',
      },
      {
        name: 'PM 2.5 2005',
        endpoint: 'data/layers/pm2.5/Rescale_rs_AVG_AOD_2005.tif',
      },
      {
        name: 'PM 2.5 2006',
        endpoint: 'data/layers/pm2.5/Rescale_rs_AVG_AOD_2006.tif',
      },
      {
        name: 'PM 2.5 02/22 MK Tau 95 Signif',
        endpoint:
          'data/layers/pm2.5/FinalSite_RescaleAOD_01-22_MK_tau_webmercator.tif',
      },
      {
        name: 'Spectral Diversity',
        endpoint:
          'data/layers/spectral_diversity/CV_p12_sum10m-msk_mercator_bit.tif',
      },
      {
        name: 'PM 2.5 02/22 MK Tau 95 Signif',
        endpoint:
          'data/layers/pm2.5/FinalSite_RescaleAOD_01-22_MK_tau_webmercator.tif',
      },
      {
        name: 'Canopy Height',
        endpoint: 'data/layers/CH_EPSG3857-003-003.tif',
      },
    ]
  } else {
    layersData = [
      {
        name: 'water-bodies',
        endpoint: 'water_bodies.tif',
      },
      {
        name: 'soil-moisture',
        endpoint: 'soil_moisture.tif',
      },
    ]
  }

  useEffect(() => {
    setLayers(
      layersData.map((layer) => ({
        name: layer.name
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '),
        endpoint: layer.endpoint,
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
            addNamedSource(map, layer)
          } else {
            removeNamedSource(map, layer)
          }
          return { ...layer, isActive }
        }
        return layer
      })
    )
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
        <Text>Show Layers</Text>
      </Maximize>
    )
  } else
    return (
      <Container visible={visible}>
        <Minimize className="material-icons-round" onClick={handleShowLayers}>
          close
        </Minimize>
        <LayerTitle>Click on a layer to activate it.</LayerTitle>
        <br />
        {layers.map((layer, index) => (
          <LayerItem key={index} onClick={() => handleToggle(layer.name)}>
            <LayerIcon
              className="material-icons-round"
              isActive={layer.isActive}
            >
              {layer.isActive ? 'toggle_on' : 'toggle_off'}
            </LayerIcon>
            <LayerLabel htmlFor={layer.name} isActive={layer.isActive}>
              {layer.name}
            </LayerLabel>
          </LayerItem>
        ))}
      </Container>
    )
}

const Container = styled.div`
  position: absolute;
  bottom: 40px;
  right: 40px;
  background-color: #1e2024cc;
  color: white;
  border-radius: 4px;
  padding: 10px;
  transition: opacity 0.3s ease;
  opacity: ${({ visible }) => (visible ? 0 : 1)};
`

const Maximize = styled.button`
  position: absolute;
  bottom: 40px;
  right: 40px;
  border: none;
  font-size: 16px;
  font-height: 26px;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  background-color: #1e2024cc;
  color: black;
  display: flex;
  width: 36px;
  transition: width 0.3s ease, background-color 0.3s ease;
  overflow: hidden;
  white-space: nowrap;
  opacity: ${({ visible }) => (visible ? 0 : 1)};
  display: flex;
  align-items: center;

  &:hover {
    width: 160px;
  }
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

  ${Maximize}:hover & {
    opacity: 1;
  }
`

const Minimize = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  border: none;
  color: white;
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
`

const LayerLabel = styled.label`
  margin-left: 4px;
  cursor: pointer;
  color: ${({ isActive }) =>
    isActive ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.6)'};
  font-size: 14px;
  transition: color 0.3s ease;
`

const LayerIcon = styled.span`
  font-size: 36px;
  transition: color 0.3s ease;
  color: ${({ isActive }) => (isActive ? 'white' : 'black')};
`

export default XprizeLayerPicker
