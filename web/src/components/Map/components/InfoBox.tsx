export const InfoBox = ({
  children,
  style,
}: {
  children
  style?: React.CSSProperties
}) => {
  return (
    <div
      style={{
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        height: '500px',
        width: '360px',
        position: 'absolute',
        bottom: 40,
        left: 8,
        backgroundColor: '#ffffff',
        borderRadius: '0.5em',
        overflowY: 'scroll',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
