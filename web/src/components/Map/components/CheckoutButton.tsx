import { useThemeUI } from 'theme-ui'

const CheckoutButton = ({ active = true, onClick, numHexagons }) => {
  const { theme } = useThemeUI()

  const backgroundColor = (
    active ? theme.colors.green : theme.colors.skeletonHighlight
  ) as string

  return (
    <button
      style={{
        position: 'absolute',
        right: '48px',
        top: '8px',
        height: '40px',
        width: '40px',
        borderRadius: '4px',
      }}
      onClick={onClick}
    >
      {numHexagons.current}
    </button>
  )
}

export default CheckoutButton
