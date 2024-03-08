import { breakpoints } from 'src/constants'

import { UnstyledButton } from './UnstyledButton'

export const MaximizeButton = ({ style, onClick, mediaSize, maximize }) => {
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

  if (maximize)
    return (
      <UnstyledButton
        style={{
          zIndex: 2,
          textAlign: 'center',
          right: '56px',
          bottom: bottom,
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
  else
    return (
      <UnstyledButton
        style={{
          zIndex: 2,
          textAlign: 'center',
          left:
            mediaSize >= breakpoints.xl
              ? 280
              : mediaSize > breakpoints.l
              ? 232
              : mediaSize > breakpoints.m
              ? 184
              : mediaSize > breakpoints.s
              ? 136
              : 98,
          bottom: bottom,
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
