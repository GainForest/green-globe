import styled from 'styled-components'

import { MetaTags } from '@redwoodjs/web'

import { DataCard } from './DataCard'
import { DroneFlightsMap } from './Map/DroneFlightsMap'

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
    <div style={{ padding: '0px 40px', fontFamily: 'molengo' }}>
      <MetaTags title="Insights" description="Insights page" />

      <h1 style={{ fontSize: '42px' }}>
        XPRIZE Finals Site Survey: July 11-12, 2024
      </h1>
      <FlexContainer style={{ justifyContent: 'space-between' }}>
        <h2 style={{ fontSize: '28px' }}>Time Period</h2>
        <FlexContainer style={{ justifyContent: 'right' }}>
          <DataCard title={'Mission Hours'} value={220} />
          <DataCard title={'Samples Collected'} value={82} />
          <DataCard title={'Observations'} value={2938} />
        </FlexContainer>
      </FlexContainer>

      <FlexContainer>
        <div>
          <h2>Instruments</h2>
          <div>
            {instruments.map((d) => (
              <Instrument name={d.name} url={d.url} />
            ))}
          </div>
        </div>
        <div>
          <DroneFlightsMap />
        </div>
      </FlexContainer>
    </div>
  )
}

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  & > div {
    margin: 0px 24px 0px 0px;
  }
`

const Instrument = ({ name, url }) => (
  <div
    style={{
      width: '200px',
      height: '120px',
      margin: '16px 0px',
      border: '1px solid white',
      padding: '8px',
    }}
  >
    <h3 style={{ fontSize: '12px', margin: '0px 0px 12px 12px' }}>
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
