import { useSelector } from 'react-redux'

import { breakpoints } from 'src/constants'

import { UnstyledButton } from './UnstyledButton'

export const ExitButton = ({ style, onClick, mediaSize }) => {
  const maximized = useSelector((state: State) => state.overlays.maximized)

  const height =
    mediaSize >= breakpoints.xl
      ? '36px'
      : mediaSize > breakpoints.m
      ? '34px'
      : mediaSize > breakpoints.s
      ? '30px'
      : '28px'

  const width =
    mediaSize >= breakpoints.xl
      ? '36px'
      : mediaSize > breakpoints.m
      ? '34px'
      : mediaSize > breakpoints.s
      ? '30px'
      : '28px'

  const fontSize =
    mediaSize < breakpoints.s
      ? '16px'
      : mediaSize < breakpoints.m
      ? '18px'
      : mediaSize < breakpoints.xl
      ? '22px'
      : '24px'

  const lineHeight =
    mediaSize < breakpoints.s
      ? '30px'
      : mediaSize < breakpoints.m
      ? '32px'
      : mediaSize < breakpoints.xl
      ? '36px'
      : '38px'

  const bottom =
    mediaSize >= breakpoints.xl
      ? 'calc(60vh - 16px)'
      : mediaSize > breakpoints.m
      ? 'calc(60vh - 12px)'
      : mediaSize > breakpoints.s
      ? 'calc(60vh - 8px)'
      : 'calc(60vh - 4px)'

  const left =
    mediaSize >= breakpoints.xl
      ? 320
      : mediaSize > breakpoints.m
      ? 270
      : mediaSize > breakpoints.s
      ? null
      : null

  const maxedLeft =
    mediaSize >= breakpoints.xl
      ? 700
      : mediaSize > breakpoints.m
      ? 660
      : mediaSize > breakpoints.s
      ? null
      : null

  const right =
    mediaSize >= breakpoints.xl
      ? null
      : mediaSize > breakpoints.m
      ? null
      : mediaSize > breakpoints.s
      ? '16px'
      : '16px'

  const maxedRight =
    mediaSize >= breakpoints.xl
      ? null
      : mediaSize > breakpoints.m
      ? null
      : mediaSize > breakpoints.s
      ? '16px'
      : '16px'

  const maxedTop =
    mediaSize >= breakpoints.xl
      ? 64
      : mediaSize > breakpoints.m
      ? 80
      : mediaSize > breakpoints.s
      ? 100
      : 100

  return (
    <UnstyledButton
      style={{
        zIndex: 3,
        textAlign: 'center',
        right: maximized ? maxedRight : right,
        left: maximized ? maxedLeft : left,
        bottom: maximized ? null : bottom,
        top: maximized ? maxedTop : null,
        height: height,
        width: width,
        ...style,
      }}
      onClick={onClick}
    >
      <div
        style={{
          fontSize: fontSize,
          lineHeight: lineHeight,
        }}
        className="material-icons-round"
      >
        close
      </div>
    </UnstyledButton>
  )
}
