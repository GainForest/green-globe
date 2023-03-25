export const ProjectButton = ({
  buttonIcon,
  position,
  active,
}: {
  buttonIcon: string
  position: number
  active: boolean
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        height: '48px',
        width: '48px',
        borderRadius: '0.5em',
        backgroundColor: active ? '#67962A' : '#ffffff',
        textAlign: 'center',
        cursor: 'pointer',
        bottom: 500,
        left: position * 60 - 20,
      }}
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
    </div>
  )
}
