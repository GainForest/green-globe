import styled from 'styled-components'

const SpeciesCard = ({ species, mediaSize, handleClick, backgroundColors }) => {
  const { scientificName, iucnCategory, awsUrl } = species

  return (
    <CardContainer
      backgroundColor={backgroundColors[iucnCategory] || '#ccc'}
      mediaSize={mediaSize}
      onClick={() => handleClick(species)}
    >
      <StyledImage
        src={awsUrl?.length ? awsUrl : '/placeholderPlant.png'}
        alt={scientificName}
        mediaSize={mediaSize}
      />
      <InfoContainer mediaSize={mediaSize}>
        <h3>{scientificName}</h3>
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
  margin: 8px;
  width: 144px;
  height: 144px;
`

const StyledImage = styled.img`
  width: 100%;
  max-height: 96px;
  object-fit: ${(props) =>
    props.awsUrl?.startsWith('/placeholder') ? 'contain' : 'cover'};
`

const InfoContainer = styled.div`
  display: flex;
  height: 48px;
  justify-content: center;
  align-items: center;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.4);
`

const CategoryTag = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 5px;
`

export default SpeciesCard
