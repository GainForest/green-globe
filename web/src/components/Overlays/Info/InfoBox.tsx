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

  const height =
    mediaSize >= breakpoints.xl
      ? '560px'
      : mediaSize > breakpoints.l
      ? '480px'
      : mediaSize > breakpoints.m
      ? '400px'
      : mediaSize > breakpoints.s
      ? '320px'
      : '240px'

  const maxedHeight =
    mediaSize >= breakpoints.xl
      ? '90vh'
      : mediaSize > breakpoints.l
      ? '90vh'
      : mediaSize > breakpoints.m
      ? '90vh'
      : mediaSize > breakpoints.s
      ? '320px'
      : '240px'

  const width =
    mediaSize >= breakpoints.xl
      ? '360px'
      : mediaSize > breakpoints.l
      ? '310px'
      : mediaSize > breakpoints.m
      ? '270px'
      : mediaSize > breakpoints.s
      ? '98vw'
      : '98vw'

  const maxedWidth =
    mediaSize >= breakpoints.xl
      ? '700px'
      : mediaSize > breakpoints.l
      ? '660px'
      : mediaSize > breakpoints.m
      ? '560px'
      : mediaSize > breakpoints.s
      ? '98vw'
      : '98vw'

  return (
    <div
      style={{
        zIndex: 1,
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        position: 'absolute',
        height: maximize ? maxedHeight : height,
        width: maximize ? maxedWidth : width,
        bottom: 40,
        left: maximize && mediaSize > breakpoints.m ? 56 : 8,
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
