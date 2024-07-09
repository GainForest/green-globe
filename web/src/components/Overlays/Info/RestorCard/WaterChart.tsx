import React from 'react'

import { SmallChart } from './SmallChart'
import { SpatialResolution } from './SpatialResolution'
export const WaterChart = ({ chartData, projectArea }) => {
  if (!chartData?.evotranspirationPerYear) {
    return null
  }
  const data = {
    labels: chartData?.evotranspirationPerYear?.data.years,
    datasets: [
      {
        label: 'Total annual evapotranspiration',
        data: chartData?.evotranspirationPerYear?.data.values,
        backgroundColor: '#4e7edf',
        borderColor: '#4e7edf',
        fill: false,
        tension: 0.1,
      },
    ],
  }
  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: 'kg/m² per annum',
        },
        beginAtZero: false,
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
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0,
        hoverRadius: 3,
      },
    },
  }
  return (
    <div style={{ margin: '16px' }}>
      <h2>Total annual evapotranspiration</h2>
      <SmallChart type="line" data={data} options={options} />
      <SpatialResolution projectArea={projectArea} componentResolution={500} />
    </div>
  )
}
