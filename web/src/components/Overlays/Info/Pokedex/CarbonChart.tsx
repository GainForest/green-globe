import { SmallChart } from './SmallChart'

export const CarbonChart = ({ carbonData }) => {
  const chartData = {
    labels: [
      'Above Ground Woody Carbon',
      'Below Ground Woody Carbon',
      'Soil Organic Carbon',
    ],
    datasets: [
      {
        label: 'Current',
        data: [
          carbonData?.walker?.data.carbon.carbonPerType.CURRENT_AGB,
          carbonData?.walker?.data.carbon.carbonPerType.CURRENT_BGB,
          carbonData?.walker?.data.carbon.carbonPerType.CURRENT_SOC,
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Potential',
        data: [
          carbonData?.walker?.data.carbon.carbonPerType.POTENTIAL_AGB,
          carbonData?.walker?.data.carbon.carbonPerType.POTENTIAL_BGB,
          carbonData?.walker?.data.carbon.carbonPerType.POTENTIAL_SOC,
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  }

  const options = {
    scales: {
      y: {
        type: 'linear',
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  }

  return (
    <div style={{ height: '300px' }}>
      <SmallChart type="bar" data={chartData} options={options} />
    </div>
  )
}

export const ProductivityChart = ({ carbonData }) => {
  const years = carbonData?.productivityPerYear?.data?.years
  const values = carbonData?.productivityPerYear?.data?.values

  if (!years || !values) {
    return <div>Loading data, please wait...</div>
  }

  const chartData = {
    labels: carbonData?.productivityPerYear?.data.years,
    datasets: [
      {
        label: 'Net primary productivity',
        data: carbonData?.productivityPerYear?.data.values,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
        tension: 0.1,
      },
    ],
  }

  const options = {
    scales: {
      y: {
        type: 'linear',
        beginAtZero: true,
        title: {
          display: true,
          text: 'Tonnes of carbon (total)',
        },
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
    },
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        radius: 3,
        backgroundColor: 'rgba(75, 192, 192, 1)',
      },
    },
  }

  return (
    <div style={{ height: '300px' }}>
      <SmallChart type="line" data={chartData} options={options} />
    </div>
  )
}
