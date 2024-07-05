import styled from 'styled-components'
import { useThemeUI } from 'theme-ui'

const Button = ({ active = true, children, onClick, style }) => {
  const { theme } = useThemeUI()

  const backgroundColor = (
    active ? theme.colors.green : theme.colors.skeletonHighlight
  ) as string

  const darkenedColor = '#516e16'

  return (
    <StyledButton
      backgroundColor={backgroundColor}
      darkenedColor={darkenedColor}
      extraStyles={style}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  border: none;
  border-radius: 0.5em;
  background-color: ${(props) => props.backgroundColor};
  cursor: pointer;
  text-align: center;
  color: #ffffff;
  height: 36px;
  width: 120px;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => props.darkenedColor};
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  ${(props) => props.extraStyles}
`

export default Button
