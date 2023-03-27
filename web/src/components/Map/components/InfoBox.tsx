export const InfoBox = ({ children, setDisplayBox }) => {
  return (
    <div
      style={{
        height: '400px',
        width: '300px',
        position: 'absolute',
        padding: '16px 24px',
        bottom: 60,
        left: 40,
        backgroundColor: '#ffffff',
        borderRadius: '0.5em',
      }}
    >
      <div
        style={{ cursor: 'pointer', marginLeft: '288px' }}
        className="material-icons-round"
        onClick={() => setDisplayBox(true)}
      >
        close
      </div>
      {children}
    </div>
  )
}
