import { UnstyledButton } from './UnstyledButton'

export const ExitProjectView = ({
  setDisplayBox,
}: {
  setDisplayBox: (boolean: boolean) => void
}) => {
  return (
    <UnstyledButton
      style={{
        height: '48px',
        width: '160px',
        right: 80,
        top: 60,
      }}
      onClick={() => setDisplayBox(false)}
    >
      <p style={{ lineHeight: '40px', margin: 0 }}>Exit Project View</p>
    </UnstyledButton>
  )
}
