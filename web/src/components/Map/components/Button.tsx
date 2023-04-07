import styled from 'styled-components'

export const Button = ({
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
  position: absolute;
  border-radius: 0.5em;
  cursor: pointer;
  height: 44px;
  width: 44px;
  bottom: 550px;
  border: none;
  left: ${(props) => `${props.position * 54 - 48}px`};
  background-color: ${(props) => (props.active ? '#67962A' : '#ffffff')};
  :hover {
    background-color: ${(props) => (props.active ? '#67962A' : '#e9f5da')};
  }
`
