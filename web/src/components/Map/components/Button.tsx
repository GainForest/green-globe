import { useThemeUI } from 'theme-ui'

export const Button = ({ active = true, children, onClick }) => {
  const { theme } = useThemeUI()

  const backgroundColor = (
    active ? theme.colors.green : theme.colors.skeletonHighlight
  ) as string

  return (
    <button
      style={{
        margin: '12px 0 24px',
        border: 'none',
        borderRadius: '0.5em',
        backgroundColor,
        cursor: 'pointer',
        textAlign: 'center',
        color: '#ffffff',
        height: '36px',
        width: '120px',
      }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
