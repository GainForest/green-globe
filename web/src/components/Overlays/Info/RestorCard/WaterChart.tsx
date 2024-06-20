import React from 'react'

import { SmallChart } from './SmallChart'
export const WaterChart = ({ chartData }) => {
  if (!chartData?.evotranspirationPerYear) {
    return null
  }
  const data = {
    labels: chartData?.evotranspirationPerYear?.data.years,
    datasets: [
      {
        label: 'Total annual evapotranspiration',
        data: chartData?.evotranspirationPerYear?.data.values,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
        tension: 0.4,
        borderWidth: 2,
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
        display: true,
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
        radius: 3,
        hoverRadius: 5,
      },
    },
  }
  return <SmallChart type="line" data={data} options={options} />
}
