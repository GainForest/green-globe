import React from 'react'

import { SmallChart } from './SmallChart'

export const TreeCoverChart = ({ chartData }) => {
  if (!chartData?.lossPerYear) {
    return null
  }

  const { values, years } = chartData.lossPerYear.data

  const data = {
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

  const options = {
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

  return <SmallChart type="bar" data={data} options={options} />
}
