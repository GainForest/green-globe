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
        backgroundColor: ['#66c2a4', '#fec47b', '#a36f45'],
        borderRadius: 8,
      },
      {
        label: 'Potential',
        data: [
          chartData?.walker?.data.carbon.carbonPerType.POTENTIAL_AGB,
          chartData?.walker?.data.carbon.carbonPerType.POTENTIAL_BGB,
          chartData?.walker?.data.carbon.carbonPerType.POTENTIAL_SOC,
        ],
        backgroundColor: ['#244542', '#43453a', '#31342f'],
        borderRadius: 8,
      },
    ],
  }

  const carbonOptions = {
    scales: {
      y: {
        stacked: true,
        type: 'linear',
        beginAtZero: true,
      },
      x: {
        stacked: true,
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
        backgroundColor: '#669629',
        borderColor: '#669629',
        fill: false,
        tension: 0.1,
      },
    ],
  }

  const productivityOptions = {
    scales: {
      y: {
        type: 'linear',
        beginAtZero: false,
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
        display: false,
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
        radius: 0,
        hoverRadius: 3,
      },
    },
  }

  return (
    <div style={{ margin: '16px' }}>
      <div>
        <h2>Carbon</h2>
        <SmallChart type="bar" data={carbonData} options={carbonOptions} />
      </div>
      <div>
        <h2>Net primary productivity</h2>
        <SmallChart
          type="line"
          data={productivityData}
          options={productivityOptions}
        />
      </div>
    </div>
  )
}
