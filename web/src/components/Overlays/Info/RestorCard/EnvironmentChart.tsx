import { SpatialResolution } from './SpatialResolution'
export const EnvironmentChart = ({
  projectArea,
  environmentData,
  socioEconomicData,
  loading,
}) => {
  if (loading) {
    return <div style={{ margin: '16px' }}>Loading...</div>
  }
  if (!socioEconomicData?.populationCountWithinSite) {
    return <div style={{ margin: '16px' }}>No data found.</div>
  }

  const socioStats = [
    {
      title: 'Global human modification',
      data: socioEconomicData?.globalHumanModificationIndex.data.toFixed(3),
      resolution: 1000,
    },
    {
      title: 'Human population within site',
      data: new Intl.NumberFormat('en-GB').format(
        socioEconomicData?.populationCountWithinSite.data
      ),
      resolution: 250,
    },
    {
      title: 'Human population within 10km buffer',
      data: new Intl.NumberFormat('en-GB').format(
        socioEconomicData?.populationCountWithin10KmBuffer.data
      ),
      resolution: 250,
    },
    {
      title: 'Human population within 50km buffer',
      data: new Intl.NumberFormat('en-GB').format(
        socioEconomicData?.populationCountWithin50KmBuffer.data
      ),
      resolution: 250,
    },
  ]

  const SocioEconomicCharts = () => (
    <div>
      {socioStats.map((d) => (
        <div
          key={d.title}
          style={{
            marginTop: '8px',
            marginBottom: '8px',
            backgroundColor: '#f2ede3',
            borderRadius: '8px',
            display: 'inline-block',
            padding: '4px 8px',
          }}
        >
          <p>{d.title}</p>
          <h1>{d.data}</h1>
          <SpatialResolution
            projectArea={projectArea}
            componentResolution={d.resolution}
          />
        </div>
      ))}
    </div>
  )

  return (
    <div style={{ margin: '16px' }}>
      <h2>Environmental Data</h2>
      <SocioEconomicCharts />
    </div>
  )
}
