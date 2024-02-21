import { useThemeUI } from 'theme-ui'

export const InfoBox = ({
  children,
  style,
  mediaSize,
}: {
  children
  style?: React.CSSProperties
  mediaSize?: number
}) => {
  const { theme } = useThemeUI()

  return (
    <div
      style={{
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        height:
          mediaSize >= 1200
            ? '560px'
            : mediaSize > 992
            ? '520px'
            : mediaSize > 768
            ? '480px'
            : mediaSize > 480
            ? '440px'
            : '400px',
        width:
          mediaSize >= 1200
            ? '360px'
            : mediaSize > 992
            ? '330px'
            : mediaSize > 768
            ? '300px'
            : mediaSize > 480
            ? '270px'
            : '240px',
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
