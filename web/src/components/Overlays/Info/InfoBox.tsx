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

  return (
    <div
      style={{
        zIndex: 1,
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        height:
          mediaSize >= breakpoints.xl
            ? '560px'
            : mediaSize > breakpoints.l
            ? '480px'
            : mediaSize > breakpoints.m
            ? '400px'
            : mediaSize > breakpoints.s
            ? '320px'
            : '240px',
        width: maximize
          ? '98vw'
          : mediaSize >= breakpoints.xl
          ? '360px'
          : mediaSize > breakpoints.l
          ? '310px'
          : mediaSize > breakpoints.m
          ? '260px'
          : mediaSize > breakpoints.s
          ? '210px'
          : '160px',
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
