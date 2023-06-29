import { useThemeUI } from 'theme-ui'

export const InfoBox = ({
  children,
  style,
}: {
  children
  style?: React.CSSProperties
}) => {
  const { theme } = useThemeUI()

  return (
    <div
      style={{
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        height: '500px',
        width: '360px',
        position: 'absolute',
        bottom: 40,
        left: 8,
        backgroundColor: theme.colors.background as string,
        color: theme.colors.text as string,
        borderRadius: '0.5em',
        overflowY: 'auto',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
