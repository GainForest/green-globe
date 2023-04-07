export const InfoBox = ({ children }) => {
  return (
    <div
      style={{
        height: '500px',
        width: '360px',
        position: 'absolute',
        bottom: 40,
        left: 8,
        backgroundColor: '#ffffff',
        borderRadius: '0.5em',
        overflowY: 'scroll',
      }}
    >
      {children}
    </div>
  )
}
