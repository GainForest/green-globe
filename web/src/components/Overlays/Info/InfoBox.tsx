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

  return (
    <div
      style={{
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        height:
          mediaSize >= breakpoints.xl
            ? '560px'
            : mediaSize > breakpoints.l
            ? '520px'
            : mediaSize > breakpoints.m
            ? '480px'
            : mediaSize > breakpoints.s
            ? '440px'
            : '400px',
        width:
          mediaSize >= breakpoints.xl
            ? '360px'
            : mediaSize > breakpoints.l
            ? '330px'
            : mediaSize > breakpoints.m
            ? '300px'
            : mediaSize > breakpoints.s
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
