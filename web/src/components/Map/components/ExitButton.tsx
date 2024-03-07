import { breakpoints } from 'src/constants'

import { UnstyledButton } from './UnstyledButton'

export const ExitButton = ({ style, onClick, mediaSize }) => {
  return (
    <UnstyledButton
      style={{
        zIndex: 2,
        textAlign: 'center',
        left:
          mediaSize >= breakpoints.xl
            ? 320
            : mediaSize > breakpoints.l
            ? 270
            : mediaSize > breakpoints.m
            ? 220
            : mediaSize > breakpoints.s
            ? 170
            : 130,
        bottom:
          mediaSize >= breakpoints.xl
            ? 546
            : mediaSize > breakpoints.l
            ? 466
            : mediaSize > breakpoints.m
            ? 386
            : mediaSize > breakpoints.s
            ? 306
            : 246,
        height:
          mediaSize >= breakpoints.xl
            ? '36px'
            : mediaSize > breakpoints.l
            ? '34px'
            : mediaSize > breakpoints.m
            ? '32px'
            : mediaSize > breakpoints.s
            ? '30px'
            : '28px',
        width:
          mediaSize >= breakpoints.xl
            ? '36px'
            : mediaSize > breakpoints.l
            ? '34px'
            : mediaSize > breakpoints.m
            ? '32px'
            : mediaSize > breakpoints.s
            ? '30px'
            : '28px',
        ...style,
      }}
      onClick={onClick}
    >
      <div
        style={{
          fontSize:
            mediaSize < breakpoints.s
              ? '16px'
              : mediaSize < breakpoints.m
              ? '18px'
              : mediaSize < breakpoints.l
              ? '20px'
              : mediaSize < breakpoints.xl
              ? '22px'
              : '24px',
          lineHeight:
            mediaSize < breakpoints.s
              ? '30px'
              : mediaSize < breakpoints.m
              ? '32px'
              : mediaSize < breakpoints.l
              ? '34px'
              : mediaSize < breakpoints.xl
              ? '36px'
              : '38px',
        }}
        className="material-icons-round"
      >
        close
      </div>
    </UnstyledButton>
  )
}
