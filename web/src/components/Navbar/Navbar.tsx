import { useThemeUI } from 'theme-ui'

const Navbar = () => {
  const { theme } = useThemeUI()
  return (
    <div
      style={{
        height: '40px',
        width: '100%',
        padding: '8px 12px',
        backgroundColor: theme.colors.background as string,
      }}
    >
      <h3>vidi.eco</h3>
    </div>
  )
}

export default Navbar
