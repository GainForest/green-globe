interface DataAndHandler {
  imageUrl: string
  name: string
  shortest: number
  tallest: number
  average: number
  count: number
  handleSpeciesClick: (name: string) => void
  selectedSpecies: string
}

export const MeasuredDataPhoto = (props: DataAndHandler) => {
  const src = props.imageUrl
    ? props.imageUrl
    : `https://mol.org/static/img/groups/taxa_plants.png`

  return (
    <div
      className={props.name == props.selectedSpecies ? null : 'species-button'}
      style={{
        display: 'flex',
        backgroundColor:
          props.name == props.selectedSpecies ? '#4a4a4a' : '#22252a',
        position: 'relative',
        padding: '10px',
      }}
    >
      <button
        className={
          props.name == props.selectedSpecies ? null : 'species-button'
        }
        style={{
          display: 'flex',
          backgroundColor:
            props.name == props.selectedSpecies ? '#4a4a4a' : '#22252a',
          border: 'none',
          cursor: 'pointer',
          flex: '1',
        }}
        onClick={() => props.handleSpeciesClick(props.name)}
      >
        <img
          alt={props.name}
          src={src}
          style={{
            objectFit: 'cover',
            clipPath:
              'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)',
            height: '120px',
            width: '120px',
            minWidth: '120px',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginLeft: '24px',
            flex: '1',
            position: 'relative',
          }}
        >
          <p style={{ color: 'white', fontSize: '1rem', marginBottom: '4px' }}>
            {props.name}
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              color: 'white',
              fontSize: '0.75rem',
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(+50%)',
              textAlign: 'right',
            }}
          >
            <span>Count: {props.count}</span>
            {typeof props.tallest === 'number' && !isNaN(props.tallest) && (
              <>
                <span>Tallest: {props.tallest} m</span>
                <span>Shortest: {props.shortest} m</span>
                <span>Average: {props.average} m</span>
              </>
            )}
          </div>
        </div>
      </button>
    </div>
  )
}
