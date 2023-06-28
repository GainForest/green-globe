import { useThemeUI } from 'theme-ui'

const Button = ({ active = true, children, onClick, style }) => {
  const { theme } = useThemeUI()

  const backgroundColor = (
    active ? theme.colors.green : theme.colors.skeletonHighlight
  ) as string

  return (
    <button
      style={{
        margin: '12px 0 24px',
        border: 'none',
        borderRadius: '960px',
        backgroundColor,
        cursor: 'pointer',
        textAlign: 'center',
        color: '#ffffff',
        padding: '8px 16px',
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
