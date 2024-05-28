export const DataCard = ({ title = '', value = 0, subtitle = '' }) => (
  <div>
    <p style={{ fontSize: '10px' }}>{title.toUpperCase()}</p>
    <div style={{ display: 'flex' }}>
      <b style={{ fontSize: '30px' }}>{value}</b>
      <p style={{ fontSize: '8px' }}>{subtitle}</p>
    </div>
  </div>
)
