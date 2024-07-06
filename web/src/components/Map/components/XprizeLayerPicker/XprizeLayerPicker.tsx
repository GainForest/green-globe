import { useState, useEffect } from 'react'

import styled from 'styled-components'
import { useThemeUI } from 'theme-ui'

import {
  addNamedSource,
  removeNamedSource,
} from '../../sourcesAndLayers/cogSourceAndLayers'
import { layersData } from '../../sourcesAndLayers/xprizeLayers'

import { LayerItem } from './LayerItem'
import { LayerItemHistoricalSatellite } from './LayerItemHistoricalSatellite'

const XprizeLayerPicker = ({ map }) => {
  const [layers, setLayers] = useState([])
  const [searchTerm, setSearchTerm] = useState<string>()
  const [filteredLayers, setFilteredLayers] = useState([])
  const { theme } = useThemeUI()
  const [showLayers, setShowLayers] = useState(true)
  const [visible, setVisible] = useState(false)

  const groupedData = filteredLayers.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {})

  useEffect(() => {
    if (layers) {
      const filteredLayers = layers.filter((item) =>
        searchTerm
          ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
          : true
      )
      setFilteredLayers(filteredLayers)
    }
  }, [searchTerm, layers])

  useEffect(() => {
    setLayers(
      layersData
        .filter(
          (layer) =>
            // Don't show nicfi tiles when you're offline
            !(
              layer.name == 'NICFI Tiles' &&
              !window.location.host.includes('localhost')
            )
        )
        .map((layer) => ({
          ...layer,
          isActive: false,
        }))
    )
  }, [])

  const handleToggle = (name: string) => {
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
        <input
          type="text"
          placeholder="Search for layers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            marginBottom: '1rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <LayerListContainer>
          {Object.entries(groupedData).map(([category]) => (
            <div style={{ marginBottom: '12px' }} key={`${category}-category`}>
              <div
                style={{
                  fontSize: '14px',
                  textTransform: 'capitalize',
                  fontWeight: 'bolder',
                }}
              >
                {category}
              </div>
              {category == 'global' && <LayerItemHistoricalSatellite />}
              {filteredLayers
                .filter((layer) => layer.category == category)
                .map((layer) => (
                  <LayerItem
                    layer={layer}
                    handleToggle={handleToggle}
                    key={`${layer.name}-layer-toggle`}
                  />
                ))}
            </div>
          ))}
        </LayerListContainer>
      </Container>
    )
}

const LayerListContainer = styled.div`
  max-height: calc(80vh - 100px);
  overflow-y: scroll;
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
  min-width: 288px;
  max-height: 80vh;
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

export default XprizeLayerPicker