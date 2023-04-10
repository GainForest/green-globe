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
        height: '32px',
        width: '32px',
        left: 324,
        bottom: 500,
        boxShadow:
          '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
      }}
      onClick={() => setDisplayBox(false)}
    >
      <span style={{ fontSize: '20px' }} className="material-icons-round">
        close
      </span>
    </UnstyledButton>
  )
}
