import { useThemeUI } from 'theme-ui'

export const Legend = () => {
  const { theme } = useThemeUI()

  return (
    <div
      style={{
        width: '400px',
        position: 'absolute',
        height: '200px',
        bottom: '16px',
        backgroundColor: theme.colors.background as string,
        left: '20px',
      }}
    >
      <h3>Legend</h3>
    </div>
  )
}
