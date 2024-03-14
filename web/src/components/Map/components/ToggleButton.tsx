import styled from 'styled-components'

import { breakpoints } from 'src/constants'

// Creates a toggle where the options variable is the
// first option on the left, and the right option on the right

type L = string
type R = string

export const ToggleButton = ({
  active,
  setToggle,
  options,
}: {
  active: L | R
  setToggle: (toggle: L | R) => void
  options: [L, R]
  mediaSize: number
}) => {
  const [firstOption, secondOption] = options
  return (
    <>
      <HalfButton
        active={active == firstOption}
        style={{ borderRadius: '0.5em 0 0 0.5em' }}
        onClick={() => setToggle(firstOption)}
      >
        {firstOption?.toUpperCase()}
      </HalfButton>
      <HalfButton
        style={{
          borderRadius: '0 0.5em 0.5em 0',
        }}
        active={active == secondOption}
        onClick={() => setToggle(secondOption)}
      >
        {secondOption?.toUpperCase()}
      </HalfButton>
    </>
  )
}

export const HalfButton = styled.button<{ active: boolean }>`
  postiion: static;
  border: none;
  width: 140px;
  max-width: 200px;
  height: 36px;
  cursor: pointer;
  color: ${(props) => (props.active ? '#ffffff' : '#808080')};
  background-color: ${(props) => (props.active ? '#67962A' : '#f5f5f5')};
  :hover {
    background-color: ${(props) =>
      props.active ? '#67962A' : 'rgba(103, 150, 42, 0.15)'};
  }

  @media (max-width: ${breakpoints.xl}px) {
    width: 120px;

  @media (max-width: ${breakpoints.l}px) {
    width: 110px;
`
