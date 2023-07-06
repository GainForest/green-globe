import { UnstyledButton } from './UnstyledButton'

export const ExitButton = ({ style, onClick }) => {
  return (
    <UnstyledButton
      style={{
        zIndex: 2,
        height: '36px',
        width: '36px',
        ...style,
      }}
      onClick={onClick}
    >
      <div
        style={{ fontSize: '24px', lineHeight: '36px' }}
        className="material-icons-round"
      >
        close
      </div>
    </UnstyledButton>
  )
}
