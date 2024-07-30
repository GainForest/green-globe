import { SmallChart } from './SmallChart'
import { SpatialResolution } from './SpatialResolution'
export const CarbonChart = ({ chartData, projectArea, loading }) => {
  console.log(chartData)
  if (loading) {
    return <div style={{ margin: '16px' }}>Loading...</div>
  }
  if (!chartData?.walker?.data?.carbon?.carbonPerType) {
    return <div style={{ margin: '16px' }}>No data found.</div>
  }

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
          chartData?.walker?.data.carbon.carbonPerType.POTENTIAL_AGB -
            chartData?.walker?.data.carbon.carbonPerType.CURRENT_AGB,
          chartData?.walker?.data.carbon.carbonPerType.POTENTIAL_BGB -
            chartData?.walker?.data.carbon.carbonPerType.CURRENT_BGB,
          chartData?.walker?.data.carbon.carbonPerType.POTENTIAL_SOC -
            chartData?.walker?.data.carbon.carbonPerType.CURRENT_SOC,
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
        <SpatialResolution
          projectArea={projectArea}
          componentResolution={500}
        />
      </div>
      <CarbonDetails chartData={chartData} />
      <div>
        <h2>Net primary productivity</h2>
        <SmallChart
          type="line"
          data={productivityData}
          options={productivityOptions}
        />
        <SpatialResolution
          projectArea={projectArea}
          componentResolution={500}
        />
      </div>
    </div>
  )
}

export const CarbonDetails = ({ chartData }) => {
  const detailData = [
    {
      type: 'Above Ground Woody Carbon',
      color: '#66c2a4',
      current: chartData?.walker?.data.carbon.carbonPerType.CURRENT_AGB,
      potential: chartData?.walker?.data.carbon.carbonPerType.POTENTIAL_AGB,
      unrealized: Math.round(
        ((chartData?.walker?.data.carbon.carbonPerType.POTENTIAL_AGB -
          chartData?.walker?.data.carbon.carbonPerType.CURRENT_AGB) /
          chartData?.walker?.data.carbon.carbonPerType.POTENTIAL_AGB) *
          100
      ),
    },
    {
      type: 'Below Ground Woody Carbon',
      color: '#fec47b',
      current: chartData?.walker?.data.carbon.carbonPerType.CURRENT_BGB,
      potential: chartData?.walker?.data.carbon.carbonPerType.POTENTIAL_BGB,
      unrealized: Math.round(
        ((chartData?.walker?.data.carbon.carbonPerType.POTENTIAL_BGB -
          chartData?.walker?.data.carbon.carbonPerType.CURRENT_BGB) /
          chartData?.walker?.data.carbon.carbonPerType.POTENTIAL_BGB) *
          100
      ),
    },
    {
      type: 'Soil Organic Carbon',
      color: '#a36f45',
      current: chartData?.walker?.data.carbon.carbonPerType.CURRENT_SOC,
      potential: chartData?.walker?.data.carbon.carbonPerType.POTENTIAL_SOC,
      unrealized: Math.round(
        ((chartData?.walker?.data.carbon.carbonPerType.POTENTIAL_SOC -
          chartData?.walker?.data.carbon.carbonPerType.CURRENT_SOC) /
          chartData?.walker?.data.carbon.carbonPerType.POTENTIAL_SOC) *
          100
      ),
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {detailData.map((item, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <div style={{ color: item.color, fontWeight: 'bold' }}>
            {item.type}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Current:</span>
            <span>{parseInt(item.current).toLocaleString()} Tonnes</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Potential:</span>
            <span>{parseInt(item.potential).toLocaleString()} Tonnes</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Unrealized:</span>
            <span>{item.unrealized} %</span>
          </div>
        </div>
      ))}
    </div>
  )
}
