import { breakpoints } from 'src/constants'

import { UnstyledButton } from './UnstyledButton'

export const ExitButton = ({ style, onClick, mediaSize, maximize }) => {
  const height =
    mediaSize >= breakpoints.xl
      ? '36px'
      : mediaSize > breakpoints.l
      ? '34px'
      : mediaSize > breakpoints.m
      ? '32px'
      : mediaSize > breakpoints.s
      ? '30px'
      : '28px'

  const width =
    mediaSize >= breakpoints.xl
      ? '36px'
      : mediaSize > breakpoints.l
      ? '34px'
      : mediaSize > breakpoints.m
      ? '32px'
      : mediaSize > breakpoints.s
      ? '30px'
      : '28px'

  const fontSize =
    mediaSize < breakpoints.s
      ? '16px'
      : mediaSize < breakpoints.m
      ? '18px'
      : mediaSize < breakpoints.l
      ? '20px'
      : mediaSize < breakpoints.xl
      ? '22px'
      : '24px'

  const lineHeight =
    mediaSize < breakpoints.s
      ? '30px'
      : mediaSize < breakpoints.m
      ? '32px'
      : mediaSize < breakpoints.l
      ? '34px'
      : mediaSize < breakpoints.xl
      ? '36px'
      : '38px'

  const bottom =
    mediaSize >= breakpoints.xl
      ? 546
      : mediaSize > breakpoints.l
      ? 466
      : mediaSize > breakpoints.m
      ? 386
      : mediaSize > breakpoints.s
      ? 316
      : 246

  const maxedBottom =
    mediaSize >= breakpoints.xl
      ? null
      : mediaSize > breakpoints.l
      ? null
      : mediaSize > breakpoints.m
      ? null
      : mediaSize > breakpoints.s
      ? 316
      : 246

  const left =
    mediaSize >= breakpoints.xl
      ? 320
      : mediaSize > breakpoints.l
      ? 270
      : mediaSize > breakpoints.m
      ? 230
      : mediaSize > breakpoints.s
      ? null
      : null

  const maxedLeft =
    mediaSize >= breakpoints.xl
      ? 700
      : mediaSize > breakpoints.l
      ? 660
      : mediaSize > breakpoints.m
      ? 560
      : mediaSize > breakpoints.s
      ? null
      : null

  const right =
    mediaSize >= breakpoints.xl
      ? null
      : mediaSize > breakpoints.l
      ? null
      : mediaSize > breakpoints.m
      ? null
      : mediaSize > breakpoints.s
      ? '16px'
      : '16px'

  const maxedRight =
    mediaSize >= breakpoints.xl
      ? null
      : mediaSize > breakpoints.l
      ? null
      : mediaSize > breakpoints.m
      ? null
      : mediaSize > breakpoints.s
      ? '16px'
      : '16px'

  const maxedTop =
    mediaSize >= breakpoints.xl
      ? 64
      : mediaSize > breakpoints.l
      ? 80
      : mediaSize > breakpoints.m
      ? 70
      : mediaSize > breakpoints.s
      ? null
      : null

  return (
    <UnstyledButton
      style={{
        zIndex: 2,
        textAlign: 'center',
        right: maximize ? maxedRight : right,
        left: maximize ? maxedLeft : left,
        bottom: maximize ? maxedBottom : bottom,
        top: maximize ? maxedTop : null,
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
