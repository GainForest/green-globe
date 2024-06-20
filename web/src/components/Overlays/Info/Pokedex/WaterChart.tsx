import React from 'react'

import { SmallChart } from './SmallChart'
export const WaterChart = ({ waterData }) => {
  const chartData = {
    labels: waterData?.evotranspirationPerYear?.data.years,
    datasets: [
      {
        label: 'Total annual evapotranspiration',
        data: waterData?.evotranspirationPerYear?.data.values,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
        tension: 0.4,
        borderWidth: 2,
      },
    ],
  }
  console.log(chartData)
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
  return <SmallChart type="line" data={chartData} options={options} />
}
