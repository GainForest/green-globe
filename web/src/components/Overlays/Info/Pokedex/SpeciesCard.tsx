import styled from 'styled-components'

export const SpeciesCard = ({
  species,
  mediaSize,
  handleClick,
}: {
  species: Species
  mediaSize: number
  handleClick: (species: Species) => void
}) => {
  const { scientificName, iucnCategory, awsUrl } = species

  const backgroundColors = {
    LC: '#388E3C',
    EN: '#FFA000',
    VU: '#F57C00',
    CR: '#D32F2F',
  }

  return (
    <CardContainer
      backgroundColor={
        backgroundColors[iucnCategory]
          ? `${backgroundColors[iucnCategory]}`
          : '#6e6e6e'
      }
      mediaSize={mediaSize}
      onClick={() => handleClick(species)}
    >
      <StyledImage
        src={awsUrl?.length ? awsUrl : `/placeholder${species.category}.png`}
        alt={scientificName}
        mediaSize={mediaSize}
      />
      <InfoContainer mediaSize={mediaSize}>
        <p style={{ margin: 0, textAlign: 'center' }}>{scientificName}</p>
      </InfoContainer>
      {iucnCategory && (
        <CategoryTag>
          <span>{iucnCategory}</span>
        </CategoryTag>
      )}
    </CardContainer>
  )
}

const CardContainer = styled.div`
  background-color: ${(props) => props.backgroundColor};
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #fff;
  position: relative;
  margin: 4px;
  width: 144px;
  height: 144px;
  &:hover {
    filter: grayscale(80%);
  }
`

const StyledImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: ${(props) =>
    props.awsUrl?.startsWith('/placeholder') ? 'contain' : 'cover'};
`

const InfoContainer = styled.div`
  display: flex;
  height: auto;
  justify-content: center;
  align-items: center;
`

const CategoryTag = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 5px;
`
