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
            ? 290
            : mediaSize > breakpoints.m
            ? 260
            : mediaSize > breakpoints.s
            ? 230
            : 200,
        bottom:
          mediaSize >= breakpoints.xl
            ? 546
            : mediaSize > breakpoints.l
            ? 506
            : mediaSize > breakpoints.m
            ? 466
            : mediaSize > breakpoints.s
            ? 426
            : 386,
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
