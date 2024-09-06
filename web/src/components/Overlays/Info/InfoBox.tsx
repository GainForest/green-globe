import { useSelector } from 'react-redux'
import { useThemeUI } from 'theme-ui'

import { breakpoints } from 'src/constants'

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

  const maximized = useSelector((state: State) => state.overlays.maximized)

  const height = '60vh'

  const maxedHeight =
    mediaSize > breakpoints.m
      ? '90vh'
      : mediaSize > breakpoints.s
      ? '85vh'
      : '85vh'

  const width = mediaSize >= breakpoints.m ? '400px' : '98vw'

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
        height: maximized ? maxedHeight : height,
        width: maximized ? maxedWidth : width,
        bottom: maximized && mediaSize > breakpoints.m ? 'auto' : 36,
        top:
          maximized && mediaSize > breakpoints.m
            ? 56
            : maximized && mediaSize > breakpoints.s
            ? 90
            : maximized && mediaSize > breakpoints.xs
            ? 80
            : 'auto',
        right: maximized && mediaSize > breakpoints.m ? 56 : 4,
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
