// TODO: Separate out component

export const UnstyledButton = ({ children, style, onClick }) => (
  <button
    style={{
      position: 'absolute',
      border: 'none',
      borderRadius: '0.5em',
      backgroundColor: '#ffffff',
      cursor: 'pointer',
      textAlign: 'center',
      ...style,
    }}
    onClick={onClick}
  >
    {children}
  </button>
)
