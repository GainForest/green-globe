import { useRef } from 'react'

import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { breakpoints } from 'src/constants'
const SpeciesCard = ({
  species,
  mediaSize,
  activeSpeciesName,
  setActiveSpeciesName,
}) => {
  const maximized = useSelector((state: State) => state.overlays.maximized)
  const fullscreenOverlay = useSelector(
    (state: State) => state.fullscreenOverlay.active
  )
  const { scientificName, iucnCategory, awsUrl, info } = species

  const backgroundColors = {
    LC: '#4CAF50',
    EN: '#FFC107',
    CR: '#F44336',
  }

  const dnaAudioRef = useRef(null)
  const cantoAudioRef = useRef(null)

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
    if (fullscreenOverlay) {
      setActiveSpeciesName(
        scientificName === activeSpeciesName ? null : scientificName
      )
    }
  }

  return (
    <CardContainer
      backgroundColors={backgroundColors}
      iucnCategory={iucnCategory}
      mediaSize={mediaSize}
      maximized={maximized}
      onClick={handleClick}
      fullscreenOverlay={fullscreenOverlay}
      activeSpeciesName={activeSpeciesName}
      scientificName={scientificName}
    >
      <StyledImage
        src={awsUrl?.length ? awsUrl : '/placeholderPlant.png'}
        alt={scientificName}
        awsUrl={awsUrl}
        mediaSize={mediaSize}
        maximized={maximized}
      />
      <InfoContainer>
        <h3>{scientificName}</h3>
        <StyledButton onClick={() => toggleAudio('dna')}>
          {!dnaAudioRef.current?.paused ? 'Pause' : 'Play'} DNA
        </StyledButton>
        {/* <StyledButton onClick={() => toggleAudio('canto')}>
          {!cantoAudioRef.current?.paused ? 'Pause' : 'Play'} Call
        </StyledButton> */}
        {fullscreenOverlay && activeSpeciesName === scientificName && (
          <p>{info}</p>
        )}
      </InfoContainer>
      <CategoryTag>
        <span>{iucnCategory}</span>
      </CategoryTag>
      <audio ref={dnaAudioRef} src={dnaAudioUrl} />
      {/* <audio ref={cantoAudioRef} src={cantoAudioUrl} /> */}
    </CardContainer>
  )
}
export default SpeciesCard

const CardContainer = styled.div`
  background-color: ${(props) =>
    props.backgroundColors[props.iucnCategory] || '#ccc'};
  cursor: ${(props) => (props.fullscreenOverlay ? 'pointer' : 'default')};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #fff;
  position: relative;
  margin: 8px;
  width: ${(props) => {
    if (props.mediaSize > breakpoints.xl || props.maximized) {
      return '300px'
    } else if (props.mediaSize > breakpoints.m) {
      return '250px'
    } else {
      return '200px'
    }
  }};
  transform: ${(props) =>
    props.activeSpeciesName === props.scientificName
      ? 'scale(1.5)'
      : 'scale(1)'};
  z-index: ${(props) =>
    props.activeSpeciesName === props.scientificName ? 4 : 1};
  transition: transform 0.3s ease-in-out;
  opacity: ${(props) =>
    props.fullscreenOverlay && props.activeSpeciesName !== props.scientificName
      ? 0.5
      : 1};
`

const StyledImage = styled.img`
  width: 100%;
  height: ${(props) =>
    props.mediaSize > breakpoints.xl || props.maximized ? '150px' : '80px'};
  object-fit: ${(props) => (props.awsUrl ? 'cover' : 'contain')};
`

const InfoContainer = styled.div`
  display: flex;
  height: ${(props) =>
    props.mediaSize > breakpoints.xl || props.maximized ? '160px' : '48px'};
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.4);
`

const StyledButton = styled.button`
  padding: ${(props) =>
    props.mediaSize > breakpoints.xl || props.maximized
      ? '5px 10px'
      : '2px 4px'};
  margin: 4px;
  border: 1px solid black;
  border-radius: 4px;
  cursor: pointer;
  color: black;
  background: transparent;
  max-height: ${(props) =>
    props.mediaSize > breakpoints.xl || props.maximized ? '64px' : '32px'};
`

const CategoryTag = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 5px;
`
