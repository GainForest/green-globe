export const CloseButton = ({ onClick }) => {
  return (
    <div
      style={{
        fontSize: '24px',
        lineHeight: '36px',
        justifyContent: 'space-between',
        cursor: 'pointer',
      }}
      className="material-icons-round"
      onClick={onClick}
    >
      close
    </div>
  )
}
