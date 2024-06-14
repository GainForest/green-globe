import styled from 'styled-components'

import { breakpoints } from 'src/constants'

export const IconButton = ({ buttonIcon, active, mediaSize }) => {
  return (
    <IconButtonContainer active={active}>
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
    </IconButtonContainer>
  )
}

export const IconButtonContainer = styled.button<{
  active: boolean
}>`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 0.5em;
  cursor: pointer;
  padding: 0;
  border: none;
  background-color: ${({ active }) => (active ? '#67962A' : '#ffffff')};

  &:hover {
    background-color: ${({ active }) => (active ? '#67962A' : '#e9f5da')};
  }
`
