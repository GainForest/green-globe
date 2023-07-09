import { useThemeUI } from 'theme-ui'

const Navbar = () => {
  const { theme } = useThemeUI()
  return (
    <div
      style={{
        height: '48px',
        width: '100%',
        padding: '12px',
        backgroundColor: theme.colors.secondaryBackground as string,
      }}
    >
      <h3>vidi.eco</h3>
    </div>
  )
}

export default Navbar
