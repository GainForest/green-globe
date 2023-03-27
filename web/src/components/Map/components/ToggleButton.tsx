import styled from 'styled-components'

export const ToggleButton = ({
  active,
  setToggle,
}: {
  active: 'photo' | 'video'
  setToggle: (toggle: 'photo' | 'video') => void
}) => {
  return (
    <>
      <HalfButton
        active={active == 'photo'}
        style={{ borderRadius: '0.5em 0 0 0.5em' }}
        onClick={() => setToggle('photo')}
      >
        Photos
      </HalfButton>
      <HalfButton
        style={{
          borderRadius: '0 0.5em 0.5em 0',
        }}
        active={active == 'video'}
        onClick={() => setToggle('video')}
      >
        Videos
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
`
