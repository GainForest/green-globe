import React from 'react'

import styled from 'styled-components'

import { NdviChart } from './NdviChart'
import { SmallChart } from './SmallChart'

export const TreeCoverChart = ({
  treeData,
  ecosystemsData,
  scientificMonitoring,
}) => {
  const displayTreeData = !!treeData?.lossPerYear
  const displayEcosystemsData =
    !!ecosystemsData?.landCover?.data?.areaPerLandType

  if (!displayTreeData && !displayEcosystemsData) {
    return null
  }

  let treeLossData = null
  let treeLossOptions = null
  let landCoverData = null
  let landCoverOptions = null

  if (displayTreeData) {
    const { values, years } = treeData.lossPerYear.data

    treeLossData = {
      labels: years,
      datasets: [
        {
          label: 'Tree cover loss',
          data: values.map((val) => parseFloat(val.toString()) * 100),
          backgroundColor: '#cc0100',
          borderWidth: 1,
        },
      ],
    }

    treeLossOptions = {
      scales: {
        y: {
          title: {
            display: true,
            text: 'Hectares',
          },
          beginAtZero: true,
        },
        x: {
          title: {
            display: true,
            text: 'Years',
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        bar: {
          borderRadius: 4,
        },
      },
    }
  }

  const { areaPerLandType, siteSurfaceArea } = ecosystemsData.landCover.data

  const sortedLandTypes = Object.entries(areaPerLandType)
    .map(([key, value]) => [
      key
        .split('_')
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(' '),
      value,
    ])
    .sort((a, b) => parseFloat(b[1].toString()) - parseFloat(a[1].toString()))

  const colorMapping = {
    'Bare Ground': '#d4bc5e',
    'Built Area': '#d4bc5e',
    Clouds: '#F0FFFF', // Get
    Crops: '#cb7752',
    'Flooded Vegetation': '#66b2a8',
    Grass: '#61987b',
    'Scrub Shrub': '#66b2a8',
    'Snow Ice': '#FFFACD', // Get
    Trees: '#77c584',
    Water: '#4e7edf',
  }

  const landCoverDetails = sortedLandTypes
    .map(([type, areaSqKm]) => {
      const percentage =
        (parseFloat(areaSqKm.toString()) / siteSurfaceArea) * 100
      return {
        type: type,
        areaHa: (parseFloat(areaSqKm.toString()) * 100).toFixed(2),
        percentage: percentage.toFixed(2),
        color: colorMapping[type.toString()],
      }
    })
    .sort((a, b) => parseFloat(b.areaHa) - parseFloat(a.areaHa))

  landCoverData = {
    labels: ['Land Cover'],
    datasets: sortedLandTypes.map(([key, value, i]) => ({
      label: key,
      backgroundColor: colorMapping[key.toString()],
      data: [value],
      borderRadius: i == sortedLandTypes.length - 1 && {
        topRight: 16,
        bottomRight: 16,
      },
      maxBarThickness: 32,
    })),
  }

  landCoverOptions = {
    indexAxis: 'y',
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
        display: false,
      },
    },
    maintainAspectRatio: false,
  }

  const LegendContainer = styled.div`
    background-color: #f2f2f2; // Adjust color as needed
    border-radius: 10px;
    padding: 10px;
    margin-top: 10px;
  `

  const LegendItem = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  `

  const ColorIndicator = styled.span`
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    margin-right: 8px;
  `

  const LegendLabel = styled.span`
    flex-grow: 1;
  `

  const LegendData = styled.span`
    margin-left: auto;
    font-size: 0.8em;
  `

  return (
    <div style={{ margin: '16px' }}>
      {displayTreeData && (
        <div>
          <div>
            <h2>Land cover</h2>
            <SmallChart
              styles={{ height: '100px' }}
              type="bar"
              data={landCoverData}
              options={landCoverOptions}
            />
          </div>
          <LegendContainer>
            {landCoverDetails.map(
              ({ type, areaHa, percentage, color }) =>
                parseFloat(percentage) > 0 && (
                  <LegendItem key={type}>
                    <ColorIndicator color={color} />
                    <LegendLabel>{type}</LegendLabel>
                    <LegendData>{`${areaHa} ha ${percentage} %`}</LegendData>
                  </LegendItem>
                )
            )}
          </LegendContainer>
        </div>
      )}

      <div>
        <div>
          <h2>Tree cover loss by year</h2>
          <SmallChart
            type="bar"
            data={treeLossData}
            options={treeLossOptions}
          />
        </div>
      </div>
      <NdviChart ndviData={scientificMonitoring} />
    </div>
  )
}
