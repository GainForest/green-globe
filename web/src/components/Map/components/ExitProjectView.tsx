import { UnstyledButton } from './UnstyledButton'

export const ExitProjectView = ({
  setDisplayBox,
}: {
  setDisplayBox: (boolean: boolean) => void
}) => {
  return (
    <UnstyledButton
      style={{
        zIndex: 2,
        height: '36px',
        width: '36px',
        left: 320,
        bottom: 486,
      }}
      onClick={() => setDisplayBox(false)}
    >
      <span
        style={{ fontSize: '24px', lineHeight: '36px' }}
        className="material-icons-round"
      >
        close
      </span>
    </UnstyledButton>
  )
}
