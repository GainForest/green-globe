import { SmallChart } from './SmallChart'
import { SpacialResolution } from './SpacialResolution'
export const NdviChart = ({ ndviData }) => {
  if (!ndviData?.ndviPerYear?.data) return
  const { values, years } = ndviData.ndviPerYear.data

  const data = {
    labels: years,
    datasets: [
      {
        label: 'Annual NDVI',
        data: values,
        fill: false,
        borderColor: '#b9eec2',
        backgroundColor: '#b9eec2',
        tension: 0.4,
      },
    ],
  }

  const options = {
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'NDVI',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Years',
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 20,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}`
          },
        },
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
    <div style={{ width: '100%', height: '400px' }}>
      <h2>Annual NDVI</h2>
      <SmallChart type="line" data={data} options={options} />
      <SpacialResolution siteSize={1636734} componentResolution={300} />
    </div>
  )
}
