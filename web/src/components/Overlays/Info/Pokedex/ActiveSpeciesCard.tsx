/* eslint-disable jsx-a11y/media-has-caption */
import styled from 'styled-components'

import { breakpoints } from 'src/constants'
import { camelCaseToTitleCase } from 'src/utils/camelCaseToTitleCase'
export const ActiveSpeciesCard = ({ species, mediaSize }) => {
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
    <CardContainer mediaSize={mediaSize}>
      <StyledImage
        src={awsUrl?.length ? awsUrl : `/placeholder${species.category}.png`}
        alt={scientificName}
        mediaSize={mediaSize}
      />
      <TextContainer mediaSize={mediaSize}>
        <CardTitle
          invasive={species.group == 'INVASIVE'}
          backgroundColor={backgroundColors[iucnCategory] || '#6e6e6e'}
        >
          {scientificName}
        </CardTitle>
      </TextContainer>
      {species.info && (
        <TextContainer mediaSize={mediaSize}>
          <p>{info}</p>
        </TextContainer>
      )}
      {species.group == 'INVASIVE' && (
        <InvasiveBar>Invasive Species</InvasiveBar>
      )}
      <InfoGrid>
        <div>
          {species.traits && (
            <>
              <h3 style={{ margin: '8px 12px' }}>Traits:</h3>
              {Object.keys(species.traits).map((trait) => (
                <TextContainer key={trait} mediaSize={mediaSize}>
                  <p style={{ margin: '0 4px', fontSize: '14px' }}>
                    {camelCaseToTitleCase(trait)}: {species.traits[trait]}
                  </p>
                </TextContainer>
              ))}
            </>
          )}
        </div>
        <div>
          {species.edibleParts?.length > 0 && (
            <>
              <h3 style={{ margin: '8px 12px' }}>Edible Parts:</h3>
              {species.edibleParts.map((part) => (
                <TextContainer key={part}>
                  <p style={{ margin: '0 4px', fontSize: '14px' }}>{part}</p>
                </TextContainer>
              ))}
            </>
          )}
        </div>
      </InfoGrid>
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
    </CardContainer>
  )
}

const CardContainer = styled.div`
  background-color: #f5f3ef;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  padding-bottom: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

const CardTitle = styled.div`
  background-color: ${(props) => props.backgroundColor};
  color: #fff;
  font-size: 24px;
  padding: 4px;
  margin-bottom: ${(props) => (props.invasive ? '2px' : '8px')};
  width: 100%;
  text-align: center;
  border-radius: 4px;
`

const InvasiveBar = styled.div`
  background-color: red;
  font-size: 20px;
  padding: 4px;
  margin: 0 8px 8px 8px;
  width: 100%;
  text-align: center;
  border-radius: 4px;
`

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; // Two equal columns
  gap: 20px; // Optional, adds some space between the columns
  align-items: start; // Aligns items at the start of each grid cell
`

const StyledImage = styled.img`
  width: 100%;
  height: ${(props) => (props.mediaSize > breakpoints.m ? '280px' : '160px')};
  object-fit: cover;
`

const TextContainer = styled.div`
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
