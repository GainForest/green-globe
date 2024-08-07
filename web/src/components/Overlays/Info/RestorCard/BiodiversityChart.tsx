import React from 'react'

import styled from 'styled-components'

import { SmallChart } from './SmallChart'
import { SpatialResolution } from './SpatialResolution'
export const BiodiversityChart = ({
  ecoregionsBiomes,
  biodiversity,
  projectArea,
  loading,
}) => {
  const icons = {
    Plant: '🌿',
    Amphibian: '🐸',
    Mammal: '🐻',
    Bird: '🐦',
  }

  if (loading) {
    return <div style={{ margin: '16px' }}>Loading...</div>
  }

  if (!ecoregionsBiomes?.ecoregions?.data?.values?.length) {
    return <div style={{ margin: '16px' }}>No data found.</div>
  }
  const { ecoregions, biomes } = ecoregionsBiomes
  const ecoregionsData = {
    labels: ecoregions.data.values.map((entry) => entry.label),
    datasets: ecoregions.data.values.map((entry) => ({
      label: entry.label,
      backgroundColor: entry.color,
      data: [(entry.area * 100).toFixed(2)],
      borderRadius: 8,
      maxBarThickness: 32,
    })),
  }

  const biomesData = {
    labels: biomes.data.values.map((entry) => entry.label),
    datasets: biomes.data.values.map((entry) => ({
      label: entry.label,
      backgroundColor: entry.color,
      data: [entry.area],
      borderRadius: 8,
      maxBarThickness: 32,
    })),
  }

  const options = {
    indexAxis: 'y',
    layout: {
      padding: {
        top: 0,
        bottom: 10,
        left: 0,
        right: 0,
      },
    },
    scales: {
      x: {
        stacked: true,
        display: false,
      },
      y: {
        stacked: true,
        display: false,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    maintainAspectRatio: false,
  }

  return (
    <div style={{ margin: '16px' }}>
      <h2>Predicted Biodiversity</h2>
      <Container>
        <SpeciesContainer>
          <SpeciesBox>
            <CountBox>
              <span style={{ marginRight: '8px' }}>{icons.Plant}</span>
              {biodiversity.plantSpeciesCount.data.toLocaleString()}
            </CountBox>
            <p style={{ fontSize: '.8em' }}>Plant species</p>
          </SpeciesBox>
          <SpeciesBox>
            <CountBox>
              <span style={{ marginRight: '8px' }}>{icons.Amphibian}</span>
              {biodiversity.amphibianSpeciesCount.data.toLocaleString()}
            </CountBox>
            <p style={{ fontSize: '.8em' }}>Amphibian species</p>
          </SpeciesBox>
        </SpeciesContainer>
        <SpeciesContainer>
          <SpeciesBox>
            <CountBox>
              <span style={{ marginRight: '8px' }}>{icons.Bird}</span>
              {biodiversity.birdSpeciesCount.data.toLocaleString()}
            </CountBox>
            <p style={{ fontSize: '.8em' }}>Bird species</p>
          </SpeciesBox>
          <SpeciesBox>
            <CountBox>
              <span style={{ marginRight: '8px' }}>{icons.Mammal}</span>
              {biodiversity.mammalSpeciesCount.data.toLocaleString()}
            </CountBox>
            <p style={{ fontSize: '.8em' }}>Mammal species</p>
          </SpeciesBox>
        </SpeciesContainer>
        <SpatialResolution
          projectArea={projectArea}
          componentResolution={10000}
        />
      </Container>
      <BarChartContainer>
        <p style={{ marginLeft: '16px' }}>Ecoregions</p>
        <SmallChart
          styles={{ height: '150px' }}
          type="bar"
          data={ecoregionsData}
          options={options}
        />
      </BarChartContainer>
      <BarChartContainer>
        <p style={{ marginLeft: '16px' }}>Biomes</p>
        <SmallChart
          styles={{ height: '150px' }}
          type="bar"
          data={biomesData}
          options={options}
        />
      </BarChartContainer>
    </div>
  )
}

export const BarChartContainer = styled.div`
  background-color: #f2ede3;
  border-radius: 10px;
  margin: 16px 0;
`

export const Container = styled.div`
  margin-top: 24px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

export const SpeciesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  flexwrap: wrap;
`

export const SpeciesBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 150px;
  margin: 10px;
`

export const CountBox = styled.div`
  display: flex;
  font-size: 1.3em;
  align-items: center;
`
