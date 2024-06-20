import { SmallChart } from './SmallChart'

export const CarbonChart = ({ chartData }) => {
  const carbonData = {
    labels: [
      'Above Ground Woody Carbon',
      'Below Ground Woody Carbon',
      'Soil Organic Carbon',
    ],
    datasets: [
      {
        label: 'Current',
        data: [
          chartData?.walker?.data.carbon.carbonPerType.CURRENT_AGB,
          chartData?.walker?.data.carbon.carbonPerType.CURRENT_BGB,
          chartData?.walker?.data.carbon.carbonPerType.CURRENT_SOC,
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Potential',
        data: [
          chartData?.walker?.data.carbon.carbonPerType.POTENTIAL_AGB,
          chartData?.walker?.data.carbon.carbonPerType.POTENTIAL_BGB,
          chartData?.walker?.data.carbon.carbonPerType.POTENTIAL_SOC,
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  }

  const carbonOptions = {
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

  const years = chartData?.productivityPerYear?.data?.years
  const values = chartData?.productivityPerYear?.data?.values

  if (!years || !values) {
    return null
  }
  const productivityData = {
    labels: chartData?.productivityPerYear?.data.years,
    datasets: [
      {
        label: 'Net primary productivity',
        data: chartData?.productivityPerYear?.data.values,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
        tension: 0.1,
      },
    ],
  }

  const productivityOptions = {
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
    <div>
      <div style={{ height: '300px' }}>
        <SmallChart type="bar" data={carbonData} options={carbonOptions} />
      </div>
      <div style={{ height: '300px' }}>
        <SmallChart
          type="line"
          data={productivityData}
          options={productivityOptions}
        />
      </div>
    </div>
  )
}
