export const CloseButton = ({ onClick, fontSize, style }) => {
  return (
    <div
      style={{
        fontSize: fontSize ? fontSize : '24px',
        lineHeight: '36px',
        justifyContent: 'space-between',
        cursor: 'pointer',
        textAlign: 'right',
        ...style,
      }}
      className="material-icons-round"
      onClick={onClick}
    >
      close
    </div>
  )
}
