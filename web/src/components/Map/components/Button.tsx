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
        height: '44px',
        width: '44px',
        backgroundColor: active ? '#67962A' : '#ffffff',
        bottom: 550,
        left: position * 54 - 48,
      }}
      onClick={onClick}
    >
      <span
        className="material-icons-round"
        style={{
          fontSize: '24px',
          color: active ? '#ffffff' : '#000000',
          lineHeight: '44px',
        }}
      >
        {buttonIcon}
      </span>
    </UnstyledButton>
  )
}
