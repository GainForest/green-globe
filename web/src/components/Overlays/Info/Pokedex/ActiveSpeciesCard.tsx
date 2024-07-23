/* eslint-disable jsx-a11y/media-has-caption */
import { Info } from 'lucide-react'
import styled from 'styled-components'

import { breakpoints } from 'src/constants'
import { camelCaseToTitleCase } from 'src/utils/camelCaseToTitleCase'
export const ActiveSpeciesCard = ({ species, mediaSize }) => {
  console.log(species)
  const { scientificName, iucnCategory, awsUrl, info } = species

  // const dnaAudioRef = useRef(null)
  // const cantoAudioRef = useRef(null)

  // const dnaAudioUrl = `http://api.sonifyspecies.com:5000/dnamidi?taxon=${encodeURIComponent(
  //   scientificName
  // )}&geo=&institutions=`

  // const cantoAudioUrl = `https://xeno-canto.org/api/2/recordings?query=${encodeURIComponent(
  //   scientificName
  // )}`

  // const toggleAudio = async (type) => {
  //   const audio = dnaAudioRef.current
  //   if (type === 'canto') {
  //     const res = await fetch(cantoAudioUrl)
  //     const data = await res.json()
  //     console.log(data)
  //     audio = cantoAudioRef.current
  //   }
  //   console.log(audio)
  //   if (audio) {
  //     if (!audio.paused) {
  //       audio.pause()
  //     } else {
  //       audio.play()
  //     }
  //   }
  // }

  const backgroundColors = {
    LC: '#388E3C',
    EN: '#FFA000',
    VU: '#F57C00',
    CR: '#D32F2F',
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const titleCaseToSpaces = (str) => {
    if (str === 'eDNA') return str
    return str.replace(/([A-Z])/g, ' $1').trim()
  }

  return (
    <CardContainer
      backgroundColor={backgroundColors[iucnCategory] || '#6e6e6e'}
      mediaSize={mediaSize}
    >
      <StyledImage
        src={awsUrl?.length ? awsUrl : `/placeholder${species.category}.png`}
        alt={scientificName}
        mediaSize={mediaSize}
      />
      <InfoContainer mediaSize={mediaSize}>
        <h2 style={{ marginTop: '0', marginBottom: '16px' }}>
          {scientificName}
        </h2>
        {/* <StyledButton onClick={() => toggleAudio('dna')}>
          {!dnaAudioRef?.current?.paused ? 'Pause' : 'Play'} DNA
        </StyledButton> */}
      </InfoContainer>
      {species.info && (
        <InfoContainer mediaSize={mediaSize}>
          <p>{info}</p>
        </InfoContainer>
      )}
      {species.traits &&
        Object.keys(species.traits).map((trait) => (
          <InfoContainer key={trait} mediaSize={mediaSize}>
            <p style={{ margin: '4px' }}>
              {camelCaseToTitleCase(trait)}: {species.traits[trait]}
            </p>
          </InfoContainer>
        ))}
      {species.edibleParts?.length > 0 && (
        <div>
          <h3 style={{ margin: '8px' }}>Edible Parts:</h3>
          {species.edibleParts.map((part) => (
            <InfoContainer key={part}>
              <p>{part}</p>
            </InfoContainer>
          ))}
        </div>
      )}
      {species.eventDate && (
        <ObservationContainer mediaSize={mediaSize}>
          <Observation>
            Date Observed: {formatDate(species.eventDate)}
          </Observation>
          {species.fileName && (
            <Observation>fileName: {species.fileName}</Observation>
          )}
          <Observation>
            Basis of Record: {titleCaseToSpaces(species.basisOfRecord)}
          </Observation>
          {species['Confidence %'] && (
            <Observation>Confidence %: {species['Confidence %']}</Observation>
          )}
          {species.location && (
            <Observation>Location: {species.location}</Observation>
          )}
        </ObservationContainer>
      )}
      {/* <audio ref={dnaAudioRef} src={dnaAudioUrl} /> */}
    </CardContainer>
  )
}

const CardContainer = styled.div`
  background-color: ${(props) => props.backgroundColor};
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  padding-bottom: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #fff;
  width: ${(props) => {
    if (props.mediaSize > breakpoints.xl) {
      return '500px'
    } else if (props.mediaSize > breakpoints.m) {
      return '400px'
    } else {
      return '300px'
    }
  }};
  height: ${(props) => (props.mediaSize > breakpoints.m ? '600px' : '400px')};
  z-index: 4;
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
  height: ${(props) => (props.mediaSize > breakpoints.m ? '160px' : '120px')};
  object-fit: cover;
`

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
`
const Observation = styled.p`
  margin: 0;
  padding: 2px 8px;
`

const ObservationContainer = styled.div`
  display: flex;
  height: 72px;
  flex-direction: column;
  // justify-content: space-between;
  // align-items: center;
  padding: 0;
`
