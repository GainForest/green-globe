import { breakpoints } from 'src/constants'

import { UnstyledButton } from './UnstyledButton'

export const MaximizeButton = ({ style, onClick, mediaSize, maximize }) => {
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
      ? 280
      : mediaSize > breakpoints.m
      ? 230
      : mediaSize > breakpoints.s
      ? null
      : null

  const maxedLeft =
    mediaSize >= breakpoints.xl
      ? 660
      : mediaSize > breakpoints.m
      ? 620
      : mediaSize > breakpoints.s
      ? null
      : null

  const right =
    mediaSize >= breakpoints.xl
      ? null
      : mediaSize > breakpoints.m
      ? null
      : mediaSize > breakpoints.s
      ? '56px'
      : '52px'

  const maxedRight =
    mediaSize >= breakpoints.xl
      ? null
      : mediaSize > breakpoints.m
      ? null
      : mediaSize > breakpoints.s
      ? '56px'
      : '56px'

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
        left: maximize ? maxedLeft : left,
        right: maximize ? maxedRight : right,
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
          fontSize: fontSize,
          lineHeight: lineHeight,
        }}
        className="material-icons-round"
      >
        <img
          alt="maximize"
          style={{ width: '80%', height: 'auto', paddingBottom: '4px' }}
          src="/maximize.png"
        />
      </div>
    </UnstyledButton>
  )
}
