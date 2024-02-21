import { useEffect } from 'react'

import styled from 'styled-components'
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
      mediaSize < 480
        ? '28px'
        : mediaSize < 768
        ? '36px'
        : mediaSize < 992
        ? '40px'
        : mediaSize < 1200
        ? '42px'
        : '44px'};
    width: ${({ mediaSize }) =>
      mediaSize < 480
        ? '28px'
        : mediaSize < 768
        ? '36px'
        : mediaSize < 992
        ? '40px'
        : mediaSize < 1200
        ? '42px'
        : '44px'};
    bottom: ${({ mediaSize }) =>
      mediaSize < 480
        ? '450px'
        : mediaSize < 768
        ? '490px'
        : mediaSize < 992
        ? '530px'
        : mediaSize < 1200
        ? '570px'
        : '610px'};
    border: none;
    left: ${({ position }) => `${position * 54 - 48}px`};
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
          lineHeight: '44px',
        }}
      >
        {buttonIcon}
      </span>
    </StyledButton>
  )
}
