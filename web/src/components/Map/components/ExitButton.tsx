import { breakpoints } from 'src/constants'

import { UnstyledButton } from './UnstyledButton'

export const ExitButton = ({ style, onClick, mediaSize, maximize }) => {
  const height = '2.5em'

  const width = '2.5em'

  const lineHeight = '1.5em'

  const bottom =
    mediaSize >= breakpoints.xl
      ? 546
      : mediaSize > breakpoints.m
      ? 476
      : mediaSize > breakpoints.s
      ? 316
      : 280

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
        right: maximize ? maxedRight : right,
        left: maximize ? maxedLeft : left,
        bottom: maximize ? null : bottom,
        top: maximize ? maxedTop : null,
        height: height,
        width: width,
        ...style,
      }}
      onClick={onClick}
    >
      <div
        style={{
          lineHeight: lineHeight,
        }}
        className="material-icons-round"
      >
        close
      </div>
    </UnstyledButton>
  )
}
