export const ExitProjectView = ({
  setDisplayBox,
}: {
  setDisplayBox: (boolean: boolean) => void
}) => {
  return (
    <button
      style={{
        position: 'absolute',
        border: 'none',
        backgroundColor: '#ffffff',
        height: '48px',
        width: '160px',
        textAlign: 'center',
        right: 80,
        top: 60,
        cursor: 'pointer',
        borderRadius: '0.5em',
      }}
      onClick={() => setDisplayBox(true)}
    >
      <p style={{ lineHeight: '40px', margin: 0 }}>Exit Project View</p>
    </button>
  )
}
