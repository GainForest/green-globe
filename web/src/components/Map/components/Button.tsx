import { useThemeUI } from 'theme-ui'

const Button = ({ active = true, children, onClick, style }) => {
  const { theme } = useThemeUI()

  const backgroundColor = (
    active ? theme.colors.green : theme.colors.skeletonHighlight
  ) as string

  return (
    <button
      style={{
        border: 'none',
        borderRadius: '0.5em',
        backgroundColor,
        cursor: 'pointer',
        textAlign: 'center',
        color: '#ffffff',
        height: '36px',
        width: '120px',
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
