export const InfoBox = ({ children }) => {
  return (
    <div
      style={{
        height: '400px',
        width: '300px',
        position: 'absolute',
        padding: '24px',
        bottom: 40,
        left: 40,
        backgroundColor: '#ffffff',
        borderRadius: '0.5em',
      }}
    >
      {children}
    </div>
  )
}
