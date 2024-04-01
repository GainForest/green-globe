import { useThemeUI } from 'theme-ui'

import { breakpoints } from 'src/constants'

export const InfoBox = ({
  children,
  style,
  mediaSize,
  maximize,
}: {
  children
  style?: React.CSSProperties
  mediaSize?: number
  maximize?: State
}) => {
  const { theme } = useThemeUI()

  const height = '60vh'

  const maxedHeight =
    mediaSize > breakpoints.m
      ? '90vh'
      : mediaSize > breakpoints.s
      ? '85vh'
      : '85vh'

  const width =
    mediaSize >= breakpoints.xl
      ? '360px'
      : mediaSize > breakpoints.m
      ? '310px'
      : '98vw'

  const maxedWidth =
    mediaSize >= breakpoints.xl
      ? '700px'
      : mediaSize > breakpoints.m
      ? '660px'
      : '98vw'

  return (
    <div
      className="info-box"
      style={{
        zIndex: 2,
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        position: 'absolute',
        height: maximize ? maxedHeight : height,
        width: maximize ? maxedWidth : width,
        bottom: maximize && mediaSize > breakpoints.m ? 'auto' : 36,
        top:
          maximize && mediaSize > breakpoints.m
            ? 56
            : maximize && mediaSize > breakpoints.s
            ? 90
            : maximize && mediaSize > breakpoints.xs
            ? 80
            : 'auto',
        left: maximize && mediaSize > breakpoints.m ? 56 : 4,
        backgroundColor: theme.colors.background as string,
        color: theme.colors.text as string,
        borderRadius: '0.5em',
        overflowY: 'auto',
        paddingBottom: '8px',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
