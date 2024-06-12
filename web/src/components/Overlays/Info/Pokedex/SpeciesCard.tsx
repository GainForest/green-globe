import { useRef } from 'react'

import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { breakpoints } from 'src/constants'
const SpeciesCard = ({ species, mediaSize }) => {
  const maximized = useSelector((state: State) => state.overlays.maximized)
  const { scientificName, iucnCategory, awsUrl, info } = species

  const backgroundColors = {
    LC: '#4CAF50',
    EN: '#FFC107',
    CR: '#F44336',
  }

  const audioRef = useRef(null)

  const audioUrl = `http://api.sonifyspecies.com:5000/dnamidi?taxon=${encodeURIComponent(
    scientificName
  )}&geo=&institutions=`

  const toggleAudio = () => {
    const audio = audioRef.current
    console.log(audio)
    if (audio) {
      if (!audio.paused) {
        audio.pause()
      } else {
        audio.play()
      }
    }
  }

  return (
    <CardContainer
      backgroundColors={backgroundColors}
      iucnCategory={iucnCategory}
      mediaSize={mediaSize}
      maximized={maximized}
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
        <StyledButton onClick={toggleAudio}>
          {!audioRef.current?.paused ? 'Pause' : 'Play'} DNA
        </StyledButton>
      </InfoContainer>
      <CategoryTag>
        <span>{iucnCategory}</span>
      </CategoryTag>
      <audio ref={audioRef} src={audioUrl} />
    </CardContainer>
  )
}
export default SpeciesCard

const CardContainer = styled.div`
  background-color: ${(props) =>
    props.backgroundColors[props.iucnCategory] || '#ccc'};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #fff;
  position: relative;
  margin-top: 16px;
  width: ${(props) => {
    if (props.mediaSize > breakpoints.xl || props.maximized) {
      return '300px'
    } else if (props.mediaSize > breakpoints.m) {
      return '250px'
    } else {
      return '200px'
    }
  }};
`

const StyledImage = styled.img`
  width: 100%;
  height: ${(props) =>
    props.mediaSize > breakpoints.xl || props.maximized ? '150px' : '100px'};
  object-fit: ${(props) => (props.awsUrl ? 'cover' : 'contain')};
`

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.4);
`

const StyledButton = styled.button`
  padding: 5px 10px;
  border: 1px solid black;
  border-radius: 4px;
  cursor: pointer;
  color: black;
  background: transparent;
`

const CategoryTag = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 5px;
`
