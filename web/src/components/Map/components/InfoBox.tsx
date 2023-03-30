export const InfoBox = ({ children }) => {
  return (
    <div
      style={{
        height: '400px',
        width: '300px',
        position: 'absolute',
        padding: '16px 24px',
        bottom: 40,
        left: 8,
        backgroundColor: '#ffffff',
        borderRadius: '0.5em',
      }}
    >
      {children}
    </div>
  )
}
