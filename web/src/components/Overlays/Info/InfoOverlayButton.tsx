import styled from 'styled-components'

export const InfoOverlayButton = ({
  buttonIcon,
  position,
  active,
  onClick,
}: {
  buttonIcon: string
  position: number
  active: boolean
  onClick: () => void
}) => {
  return (
    <StyledButton active={active} position={position} onClick={onClick}>
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

const StyledButton = styled.button<{
  position: number
  active: boolean
}>`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  position: absolute;
  border-radius: 0.5em;
  cursor: pointer;
  height: 44px;
  width: 44px;
  bottom: 610px;
  border: none;
  left: ${(props) => `${props.position * 54 - 48}px`};
  background-color: ${(props) => (props.active ? '#67962A' : '#ffffff')};
  :hover {
    background-color: ${(props) => (props.active ? '#67962A' : '#e9f5da')};
  }
`
