import { UnstyledButton } from './UnstyledButton'

export const ExitButton = ({ style, onClick, mediaSize }) => {
  return (
    <UnstyledButton
      style={{
        zIndex: 2,
        textAlign: 'center',
        left:
          mediaSize >= 1200
            ? 320
            : mediaSize > 992
            ? 290
            : mediaSize > 768
            ? 260
            : mediaSize > 480
            ? 230
            : 200,
        bottom:
          mediaSize >= 1200
            ? 546
            : mediaSize > 992
            ? 506
            : mediaSize > 768
            ? 466
            : mediaSize > 480
            ? 426
            : 386,
        height:
          mediaSize >= 1200
            ? '36px'
            : mediaSize > 992
            ? '34px'
            : mediaSize > 768
            ? '32px'
            : mediaSize > 480
            ? '30px'
            : '28px',
        width:
          mediaSize >= 1200
            ? '36px'
            : mediaSize > 992
            ? '34px'
            : mediaSize > 768
            ? '32px'
            : mediaSize > 480
            ? '30px'
            : '28px',
        ...style,
      }}
      onClick={onClick}
    >
      <div
        style={{
          fontSize:
            mediaSize < 480
              ? '16px'
              : mediaSize < 768
              ? '18px'
              : mediaSize < 992
              ? '20px'
              : mediaSize < 1200
              ? '22px'
              : '24px',
          lineHeight:
            mediaSize < 480
              ? '30px'
              : mediaSize < 768
              ? '32px'
              : mediaSize < 992
              ? '34px'
              : mediaSize < 1200
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
