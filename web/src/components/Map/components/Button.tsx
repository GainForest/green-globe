import { UnstyledButton } from './UnstyledButton'

export const Button = ({
  buttonIcon,
  position,
  active,
  onClick,
}: {
  buttonIcon: string
  position: number
  active: boolean
  onClick: () => void
}) => {
  return (
    <UnstyledButton
      style={{
        height: '48px',
        width: '48px',
        backgroundColor: active ? '#67962A' : '#ffffff',
        bottom: 500,
        left: position * 60 - 20,
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
    </UnstyledButton>
  )
}
