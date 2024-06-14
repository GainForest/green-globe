import { useState } from 'react'

import Modal from 'react-modal'
import styled from 'styled-components'

import { breakpoints } from 'src/constants'

import ActiveSpeciesCard from './ActiveSpeciesCard'
const SpeciesCard = ({ species, mediaSize }) => {
  const { scientificName, iucnCategory, awsUrl } = species
  const [modalIsOpen, setModalIsOpen] = useState(false)

  Modal.setAppElement('#redwood-app')

  const openModal = () => {
    setModalIsOpen(true)
  }

  const backgroundColors = {
    LC: '#4CAF50',
    EN: '#FFC107',
    VU: '#FF9800',
    CR: '#F44336',
  }

  const modalStyles = {
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width:
        mediaSize > breakpoints.xl
          ? '500px'
          : mediaSize > breakpoints.m
          ? '400px'
          : '96px',
      height:
        mediaSize > breakpoints.xl || mediaSize > breakpoints.m
          ? '300px'
          : '96px',

      transform: 'translate(-50%, -50%)',
      border: '1px solid #ccc',
      borderRadius: '10px',
      backgroundColor: 'transparent',
      padding: 0,
      overflow: 'hidden',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 4,
    },
  }

  return (
    <CardContainer
      backgroundColor={backgroundColors[iucnCategory] || '#ccc'}
      mediaSize={mediaSize}
      onClick={openModal}
    >
      <StyledImage
        src={awsUrl?.length ? awsUrl : '/placeholderPlant.png'}
        alt={scientificName}
        mediaSize={mediaSize}
      />
      <InfoContainer mediaSize={mediaSize}>
        <h3>{scientificName}</h3>
      </InfoContainer>
      <CategoryTag>
        <span>{iucnCategory}</span>
      </CategoryTag>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={modalStyles}
      >
        <ActiveSpeciesCard
          species={species}
          mediaSize={mediaSize}
          backgroundColors={backgroundColors}
        />
      </Modal>
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
  position: relative;
  margin: 8px;
  width: 144px;
  height: 144px;
`

const StyledImage = styled.img`
  width: 100%;
  max-height: 96px;
  object-fit: contain;
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
