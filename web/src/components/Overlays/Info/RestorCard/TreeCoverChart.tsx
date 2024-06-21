import React from 'react'

import { SmallChart } from './SmallChart'

export const TreeCoverChart = ({ treeData, ecosystemsData }) => {
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
          data: values,
          backgroundColor: 'rgba(231, 76, 60, 0.75)',
          borderColor: 'rgba(231, 76, 60, 1)',
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

  if (displayEcosystemsData) {
    const { areaPerLandType, siteSurfaceArea } = ecosystemsData.landCover.data

    landCoverData = {
      labels: ['Land Cover'],
      datasets: [
        {
          label: 'Trees',
          backgroundColor: '#77c584',
          data: [areaPerLandType.TREES],
          borderRadius: 8,
          maxBarThickness: 32,
        },
        {
          label: 'Water',
          backgroundColor: '#4d7ddd',
          data: [areaPerLandType.WATER],
          borderRadius: 8,
          maxBarThickness: 32,
        },
        {
          label: 'Built area',
          backgroundColor: '#9d5aa2',
          data: [areaPerLandType.BUILT_AREA],
          borderRadius: 8,
          maxBarThickness: 32,
        },
      ],
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
          display: true,
          position: 'top',
          labels: {
            generateLabels: (chart) => {
              const datasets = chart.data.datasets
              return datasets.map((dataset, i) => ({
                text: `${dataset.label} - ${(
                  (dataset.data[0] / siteSurfaceArea) *
                  100
                ).toFixed(2)}%`,
                fontColor: '#ebebec',
                fillStyle: dataset.backgroundColor,
                strokeStyle: dataset.backgroundColor,
                lineWidth: 2,
                hidden: !chart.isDatasetVisible(i),
                index: i,
              }))
            },
          },
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.dataset.label
              const value = context.raw
              const percentage = ((value / siteSurfaceArea) * 100).toFixed(2)
              return `${label}: ${value.toFixed(2)} sq km (${percentage}%)`
            },
          },
        },
      },
      maintainAspectRatio: false,
    }
  }

  return (
    <div style={{ margin: '8px' }}>
      {displayTreeData && (
        <div>
          <h2>Land cover</h2>
          <SmallChart
            type="bar"
            data={landCoverData}
            options={landCoverOptions}
          />
        </div>
      )}
      {displayEcosystemsData && (
        <div>
          <h2>Tree cover loss by year</h2>
          <SmallChart
            type="bar"
            data={treeLossData}
            options={treeLossOptions}
          />
        </div>
      )}
    </div>
  )
}
