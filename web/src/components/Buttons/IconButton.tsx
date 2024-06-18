import styled from 'styled-components'

export const IconButton = ({ buttonIcon, active, onClick }) => {
  return (
    <IconButtonContainer active={active} onClick={onClick}>
      <span
        className="material-icons-round"
        style={{
          display: 'table',
          margin: '0 auto',
          fontSize: '24px',
          color: active ? '#ffffff' : '#000000',
          lineHeight: '44px',
          width: '42px',
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
  height: 42px;
  width: 42px;
  background-color: ${({ active }) => (active ? '#67962A' : '#ffffff')};
  &:hover {
    background-color: ${({ active }) => (active ? '#67962A' : '#e9f5da')};
  }
`
