const SpeciesCard = ({ species }) => {
  const { scientificName, iucnCategory, awsUrl, info } = species

  const backgroundColors = {
    LC: '#4CAF50',
    EN: '#FFC107',
    CR: '#F44336',
  }

  return (
    <div
      style={{
        width: '300px',
        backgroundColor: backgroundColors[iucnCategory] || '#ccc',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        color: '#fff',
        position: 'relative',
        marginTop: '16px',
      }}
    >
      <img
        src={awsUrl || 'placeholderPlant.png'}
        alt={scientificName}
        style={{
          width: '100%',
          height: '150px',
          objectFit: awsUrl ? 'cover' : 'contain',
        }}
      />
      <div style={{ padding: '10px', backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
        <h3 style={{ margin: '0' }}>{scientificName}</h3>
        <p style={{ margin: '5px 0' }}>{info}</p>
      </div>
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          padding: '5px 10px',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          borderRadius: '5px',
        }}
      >
        <span>{iucnCategory}</span>
      </div>
    </div>
  )
}
export default SpeciesCard
