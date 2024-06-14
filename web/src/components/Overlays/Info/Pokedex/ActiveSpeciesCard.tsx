/* eslint-disable jsx-a11y/media-has-caption */
import { useRef } from 'react'

import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { breakpoints } from 'src/constants'
import { toggleFullscreenOverlay } from 'src/reducers/fullscreenOverlayReducer'

const ActiveSpeciesCard = ({ species, mediaSize, backgroundColors }) => {
  const { scientificName, iucnCategory, awsUrl, info } = species

  const dispatch = useDispatch()
  const dnaAudioRef = useRef(null)
  // const cantoAudioRef = useRef(null)

  const dnaAudioUrl = `http://api.sonifyspecies.com:5000/dnamidi?taxon=${encodeURIComponent(
    scientificName
  )}&geo=&institutions=`

  // const cantoAudioUrl = `https://xeno-canto.org/api/2/recordings?query=${encodeURIComponent(
  //   scientificName
  // )}`

  const toggleAudio = async (type) => {
    const audio = dnaAudioRef.current
    // if (type === 'canto') {
    //   const res = await fetch(cantoAudioUrl)
    //   const data = await res.json()

    //   audio = cantoAudioRef.current
    // }
    console.log(audio)
    if (audio) {
      if (!audio.paused) {
        audio.pause()
      } else {
        audio.play()
      }
    }
  }

  const handleClick = () => {
    dispatch(toggleFullscreenOverlay())
  }

  return (
    <CardContainer
      backgroundColor={backgroundColors[iucnCategory] || '#ccc'}
      mediaSize={mediaSize}
    >
      <button
        onClick={handleClick}
        style={{
          position: 'absolute',
          top: '-8px',
          right: '0',
          background: 'transparent',
          border: 'none',
          color: 'white',
          fontSize: '48px',
          cursor: 'pointer',
        }}
      >
        &times;
      </button>
      <StyledImage
        src={awsUrl?.length ? awsUrl : '/placeholderPlant.png'}
        alt={scientificName}
        mediaSize={mediaSize}
      />
      <InfoContainer mediaSize={mediaSize}>
        <h3>{scientificName}</h3>
        <StyledButton onClick={() => toggleAudio('dna')}>
          {!dnaAudioRef?.current?.paused ? 'Pause' : 'Play'} DNA
        </StyledButton>
      </InfoContainer>
      <InfoContainer mediaSize={mediaSize}>
        <p>{info}</p>
      </InfoContainer>
      <audio ref={dnaAudioRef} src={dnaAudioUrl} />
    </CardContainer>
  )
}

// Styled components
const CardContainer = styled.div`
  background-color: ${(props) => props.backgroundColor};
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #fff;
  position: absolute;
  margin: 8px;
  width: ${(props) => {
    if (props.mediaSize > breakpoints.xl) {
      return '500px'
    } else if (props.mediaSize > breakpoints.m) {
      return '400px'
    } else {
      return '96px'
    }
  }};
  height: ${(props) => {
    if (props.mediaSize > breakpoints.xl) {
      return '300px'
    } else if (props.mediaSize > breakpoints.m) {
      return '300px'
    } else {
      return '96px'
    }
  }};
  transform: scale(1.5);
  z-index: 4;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out,
    top 0.3s ease-in-out, left 0.3s ease-in-out;
  opacity: 1;
  top: 20vh;
  left: 30vw;
`

const StyledButton = styled.button`
  padding: ${(props) =>
    props.mediaSize > breakpoints.xl ? '5px 10px' : '2px 4px'};
  margin: 4px;
  border: 1px solid black;
  border-radius: 4px;
  cursor: pointer;
  color: black;
  background: transparent;
  max-height: ${(props) =>
    props.mediaSize > breakpoints.xl ? '64px' : '32px'};
`

const StyledImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`

const InfoContainer = styled.div`
  display: flex;
  height: 72px;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.4);
`

export default ActiveSpeciesCard
