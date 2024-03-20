import styled from 'styled-components'

import { breakpoints } from 'src/constants'
export const InfoOverlayButton = ({
  buttonIcon,
  position,
  active,
  mediaSize,
  maximize,
  onClick,
}: {
  buttonIcon: string
  position: number
  active: boolean
  mediaSize?: number
  maximize?: boolean
  onClick: () => void
}) => {
  return (
    <StyledButton
      mediaSize={mediaSize}
      active={active}
      position={position}
      onClick={onClick}
      maximize={maximize}
    >
      <span
        className="material-icons-round"
        style={{
          fontSize:
            mediaSize < breakpoints.s
              ? '20px'
              : mediaSize < breakpoints.m
              ? '21px'
              : mediaSize < breakpoints.xl
              ? '23px'
              : '24px',

          color: active ? '#ffffff' : '#000000',
          lineHeight:
            mediaSize < breakpoints.s
              ? '26px'
              : mediaSize < breakpoints.m
              ? '34px'
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

const StyledButton = styled.button<{
  position: number
  active: boolean
  mediaSize: number
  maximize: boolean
}>`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  position: absolute;
  border-radius: 0.5em;
  cursor: pointer;
  padding: 0;
  border: none;
  background-color: ${({ active }) => (active ? '#67962A' : '#ffffff')};

  &:hover {
    background-color: ${({ active }) => (active ? '#67962A' : '#e9f5da')};
  }

  // Conditional styling based on maximize prop
  ${({ maximize, position }) =>
    maximize
      ? `
    height: 44px;
    width: 44px;
    top: ${position * 52 - 44 + 48}px;
    left: 8px;

    @media (max-width: ${breakpoints.m}px) {
      height: 28px;
      width: 28px;
      bottom: auto;
      top: 60px;
      left: ${position * 36 - 28}px;
    }

    @media (max-width: ${breakpoints.s}px) {
      height: 24px;
      width: 24px;
      bottom: auto;
      top: 54px;
      left: ${position * 28 - 24}px;
    }
  `
      : `
    // Styles when maximize is false
    height: 44px;
    width: 44px;
    bottom: 610px;
    left: ${position * 52 - 44}px;

    @media (max-width: ${breakpoints.xl}px) {
      height: 42px;
      width: 42px;
      bottom: 530px;
      left: ${position * 52 - 42}px;
    }

    @media (max-width: ${breakpoints.m}px) {
      height: 28px;
      width: 28px;
      bottom: 365px;
      left: ${position * 36 - 28}px;
    }

    @media (max-width: ${breakpoints.s}px) {
      height: 24px;
      width: 24px;
      bottom: 320px;
      left: ${position * 28 - 24 + 5}px;
    }
  `}
`
