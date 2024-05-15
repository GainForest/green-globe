import { MetaTags } from '@redwoodjs/web'

const instruments = [
  {
    name: 'DJI Matrice 300 RTK',
    url: 'https://gainforest-transparency-dashboard.s3.amazonaws.com/instruments/matrice300rtk.png',
  },
  {
    name: 'DJI Mavic 3 Multispectral',
    url: 'https://gainforest-transparency-dashboard.s3.amazonaws.com/instruments/Mavic+3+Multispectral.png',
  },
  {
    name: 'DJI Matic 3 Classic',
    url: 'https://gainforest-transparency-dashboard.s3.amazonaws.com/instruments/Mavic+3+Classic.webp',
  },
]

const InsightsPage = () => {
  return (
    <div style={{ padding: '0px 30px' }}>
      <MetaTags title="Insights" description="Insights page" />

      <h1 style={{ fontSize: '40px' }}>
        XPRIZE Finals Site Survey: July 11-12, 2024
      </h1>
      <h2 style={{ fontSize: '30px' }}>Instruments</h2>
      <div>
        {instruments.map((d) => (
          <Instrument name={d.name} url={d.url} />
        ))}
      </div>
      <div>
        <h1 style={{ fontSize: '32px' }}>
          Observations from current selection
        </h1>
      </div>
    </div>
  )
}

const Instrument = ({ name, url }) => (
  <div
    style={{
      width: '240px',
      height: '140px',
      margin: '16px 0px',
      border: '1px solid white',
      padding: '8px',
    }}
  >
    <h3 style={{ fontSize: '16px', margin: '0px 0px 12px 12px' }}>
      <b>{name}</b>
    </h3>
    <div style={{ textAlign: 'center' }}>
      <img
        style={{
          width: '120px',
          height: '80px',
          objectFit: 'cover',
          backgroundColor: 'transparent',
        }}
        src={url}
      />
    </div>
  </div>
)
export default InsightsPage
