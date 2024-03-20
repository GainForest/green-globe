import { breakpoints } from 'src/constants'

import { UnstyledButton } from './UnstyledButton'

export const MaximizeButton = ({ style, onClick, mediaSize, maximize }) => {
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
