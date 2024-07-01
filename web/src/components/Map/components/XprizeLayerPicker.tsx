import { useState, useEffect } from 'react'

import styled from 'styled-components'

import {
  addNamedSource,
  removeNamedSource,
} from '../sourcesAndLayers/cogSourceAndLayers'

// supported types: raster_tif

const XprizeLayerPicker = ({ map }) => {
  const [layers, setLayers] = useState([])
  const [showLayers, setShowLayers] = useState(false)
  const [visible, setVisible] = useState(false)

  // const years = [
  //   2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011,
  //   2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
  // ]

  let layersData = []

  layersData = [
    {
      name: 'Tree Crown',
      type: 'geojson_line',
      endpoint: `${process.env.AWS_STORAGE}/layers/tree_crowns.geojson`,
    },
    {
      name: 'Dry run drone flight',
      type: 'tms_tile',
      endpoint: `${process.env.AWS_STORAGE}/layers/tms_tiles/{z}/{x}/{y}.png`,
    },
    {
      name: 'Tumbira Satellite',
      type: 'raster_tif',
      endpoint: 'data/drone/tumbira/skysat/3_webmercator.tif',
    },
    {
      name: 'Competition Area Drone',
      type: 'raster_tif',
      endpoint: 'data/drone/1_webmercator.tif',
    },
    {
      name: 'Tumbira Deforestation YOD',
      type: 'raster_tif',
      endpoint:
        'data/layers/deforestation_regeneration/Tumbira_lt-gee_deforestation_Yod_w.tif',
    },
    {
      name: 'PM 2.5',
      type: 'raster_tif',
      endpoint:
        'data/layers/pm2.5/FinalSite_RescaleAOD_01-22_MK_tau_rescaled.tif',
    },
  ]

  useEffect(() => {
    setLayers(
      layersData.map((layer) => ({
        name: layer.name
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '),
        endpoint: layer.endpoint,
        type: layer.type,
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
        <Text>Toggle layers</Text>
      </Maximize>
    )
  } else
    return (
      <Container visible={visible}>
        <Minimize className="material-icons-round" onClick={handleShowLayers}>
          close
        </Minimize>
        <LayerTitle>Geospatial Data</LayerTitle>
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
  background-color: #669629;
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
