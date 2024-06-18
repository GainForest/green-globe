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
        name: 'data/drone/1_webmercator.tif',
        endpoint: 'data/drone/1_webmercator.tif',
      },
      {
        name: 'data/drone/20240414_134447_ssc15_u0001_visual_clip_webmercator.tif',
        endpoint:
          'data/drone/20240414_134447_ssc15_u0001_visual_clip_webmercator.tif',
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
      <div>
        <Maximize onClick={handleShowLayers}>
          <Icon className="material-icons-round">layers</Icon>
          <Text>Show Layers</Text>
        </Maximize>
      </div>
    )
  } else
    return (
      <Container visible={visible}>
        <Minimize className="material-icons-round" onClick={handleShowLayers}>
          close
        </Minimize>
        {layers.map((layer, index) => (
          <LayerItem key={index} onClick={() => handleToggle(layer.name)}>
            <LayerLabel htmlFor={layer.name} isActive={layer.isActive}>
              {layer.name}
            </LayerLabel>
            <LayerIcon
              className="material-icons-round"
              isActive={layer.isActive}
            >
              {layer.isActive ? 'toggle_on' : 'toggle_off'}
            </LayerIcon>
          </LayerItem>
        ))}
      </Container>
    )
}

const Container = styled.div`
  position: absolute;
  top: 200px;
  right: 40px;
  background-color: #1e202480;
  border-radius: 4px;
  padding: 10px;
  transition: opacity 0.3s ease;
  opacity: ${({ visible }) => (visible ? 0 : 1)};
`

const Maximize = styled.button`
  position: absolute;
  top: 200px;
  right: 40px;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  background-color: #1e202480;
  color: black;
  display: flex;
  width: 36px;
  transition: width 0.3s ease, background-color 0.3s ease;
  overflow: hidden;
  white-space: nowrap;
  opacity: ${({ visible }) => (visible ? 0 : 1)};

  &:hover {
    width: 176px;
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

const LayerItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover label {
    color: white;
  }
`

const LayerLabel = styled.label`
  margin-right: 10px;
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? 'white' : 'black')};
  transition: color 0.3s ease;
`

const LayerIcon = styled.span`
  font-size: 36px;
  transition: color 0.3s ease;
  color: ${({ isActive }) => (isActive ? 'white' : 'black')};
`

export default XprizeLayerPicker
