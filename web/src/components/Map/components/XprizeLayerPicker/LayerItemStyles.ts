import styled from 'styled-components'

export const LayerItemContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 28px;
`

export const LayerLabel = styled.label`
  margin-left: 4px;
  cursor: pointer;
  opacity: ${({ isActive }) => (isActive ? 1 : 0.75)};
  color: black;
  font-size: 14px;
  transition: color 0.3s ease;
`

export const LayerIcon = styled.span<{ theme }>`
  font-size: 36px;
  transition: color 0.3s ease;
  color: ${({ isActive, theme }) => (isActive ? 'black' : theme.colors.hinted)};
`
