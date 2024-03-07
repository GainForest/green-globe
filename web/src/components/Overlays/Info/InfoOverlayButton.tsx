import styled from 'styled-components'

import { breakpoints } from 'src/constants'
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
    padding: 0;
    height: ${({ mediaSize }) =>
      mediaSize < breakpoints.s
        ? '24px'
        : mediaSize < breakpoints.m
        ? '28px'
        : mediaSize < breakpoints.l
        ? '36px'
        : mediaSize < breakpoints.xl
        ? '42px'
        : '44px'};
    width: ${({ mediaSize }) =>
      mediaSize < breakpoints.s
        ? '24px'
        : mediaSize < breakpoints.m
        ? '28px'
        : mediaSize < breakpoints.l
        ? '36px'
        : mediaSize < breakpoints.xl
        ? '42px'
        : '44px'};
    bottom: ${({ mediaSize }) =>
      mediaSize < breakpoints.s
        ? '285px'
        : mediaSize < breakpoints.m
        ? '365px'
        : mediaSize < breakpoints.l
        ? '450px'
        : mediaSize < breakpoints.xl
        ? '530px'
        : '610px'};
    border: none;
    left: ${({ position, mediaSize }) =>
      `${
        position *
          (mediaSize < breakpoints.s
            ? 28
            : mediaSize < breakpoints.m
            ? 36
            : mediaSize < breakpoints.l
            ? 44
            : 52) -
        (mediaSize < breakpoints.s
          ? 24
          : mediaSize < breakpoints.m
          ? 28
          : mediaSize < breakpoints.l
          ? 36
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
          fontSize:
            mediaSize < breakpoints.s
              ? '20px'
              : mediaSize < breakpoints.m
              ? '21px'
              : mediaSize < breakpoints.l
              ? '22px'
              : mediaSize < breakpoints.xl
              ? '23px'
              : '24px',

          color: active ? '#ffffff' : '#000000',
          lineHeight:
            mediaSize < breakpoints.s
              ? '26px'
              : mediaSize < breakpoints.m
              ? '34px'
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
