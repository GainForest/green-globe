export const InfoTag = ({ style, children, ...props }) => {
  return (
    <div
      style={{
        width: 'fit-content',
        borderRadius: '5px',
        textAlign: 'center',
        userSelect: 'none',
        border: `1px solid`,
        borderColor: style?.color,
        padding: '4px 8px',
        ...style,
      }}
      {...props}
    >
      <div
        style={{
          letterSpacing: '0.02em',
          fontSize: '0.75rem',
          color: style?.color,
        }}
      >
        {children}
      </div>
    </div>
  )
}
