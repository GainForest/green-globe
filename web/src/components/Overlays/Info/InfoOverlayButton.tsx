import styled from 'styled-components'
import { breakpoints } from 'src/constants'}
export const InfoOverlayButton = ({
  buttonIcon,
  position,
  active,
  mediaSize,
  onClick,
}: {
  buttonIcon: string
  position: number
  active: boolean
  mediaSize?: number
  onClick: () => void
}) => {
  const StyledButton = styled.button<{
    position: number
    active: boolean
    mediaSize: number
  }>`
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    position: absolute;
    border-radius: 0.5em;
    cursor: pointer;
    height: ${({ mediaSize }) =>
      mediaSize < breakpoints.s
        ? '28px'
        : mediaSize < breakpoints.m
        ? '36px'
        : mediaSize < breakpoints.l
        ? '40px'
        : mediaSize < breakpoints.xl
        ? '42px'
        : '44px'};
    width: ${({ mediaSize }) =>
      mediaSize < breakpoints.s
        ? '28px'
        : mediaSize < breakpoints.m
        ? '36px'
        : mediaSize < breakpoints.l
        ? '40px'
        : mediaSize < breakpoints.xl
        ? '42px'
        : '44px'};
    bottom: ${({ mediaSize }) =>
      mediaSize < breakpoints.s
        ? '450px'
        : mediaSize < breakpoints.m
        ? '485px'
        : mediaSize < breakpoints.l
        ? '530px'
        : mediaSize < breakpoints.xl
        ? '570px'
        : '610px'};
    border: none;
    left: ${({ position, mediaSize }) =>
      `${
        position *
          (mediaSize < breakpoints.s
            ? 44
            : mediaSize < breakpoints.m
            ? 46
            : mediaSize < breakpoints.l
            ? 50
            : 54) -
        (mediaSize < breakpoints.s
          ? 28
          : mediaSize < breakpoints.m
          ? 36
          : mediaSize < breakpoints.l
          ? 40
          : mediaSize < breakpoints.xl
          ? 42
          : 44)
      }px`};
    background-color: ${({ active }) => (active ? '#67962A' : '#ffffff')};
    :hover {
      background-color: ${({ active }) => (active ? '#67962A' : '#e9f5da')};
    }
  `

  return (
    <StyledButton
      mediaSize={mediaSize}
      active={active}
      position={position}
      onClick={onClick}
    >
      <span
        className="material-icons-round"
        style={{
          fontSize: '24px',
          color: active ? '#ffffff' : '#000000',
          lineHeight:
            mediaSize < breakpoints.s
              ? '28px'
              : mediaSize < breakpoints.m
              ? '36px'
              : mediaSize < breakpoints.l
              ? '40px'
              : mediaSize < breakpoints.xl
              ? '42px'
              : '44px',
        }}
      >
        {buttonIcon}
      </span>
    </StyledButton>
  )
}
