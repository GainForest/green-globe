export const Button = ({
  buttonIcon,
  position,
  active,
  minimized,
  onClick,
}: {
  buttonIcon: string
  position: number
  active: boolean
  minimized: boolean
  onClick: () => void
}) => {
  return (
    <button
      style={{
        position: 'absolute',
        height: '48px',
        width: '48px',
        borderRadius: '0.5em',
        border: 'none',
        backgroundColor: active ? '#67962A' : '#ffffff',
        textAlign: 'center',
        bottom: 40,
        left: position * 60 - 20,
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <span
        className="material-icons-round"
        style={{
          fontSize: '32px',
          color: active ? '#ffffff' : '#000000',
          lineHeight: '48px',
        }}
      >
        {buttonIcon}
      </span>
    </button>
  )
}
