import { useState } from 'react'

import Modal from 'react-modal'

import { breakpoints } from 'src/constants'

import ActiveSpeciesCard from './ActiveSpeciesCard'
import SpeciesCard from './SpeciesCard'
export const KingdomList = ({ speciesList = [], mediaSize }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [activeSpecies, setActiveSpecies] = useState(null)
  if (speciesList?.length === 0) {
    return <div>Loading...</div>
  }
  Modal.setAppElement('#redwood-app')

  const handleClick = (species) => {
    setModalIsOpen(true)
    setActiveSpecies(species)
  }

  const backgroundColors = {
    LC: '#4CAF50',
    EN: '#FFC107',
    VU: '#FF9800',
    CR: '#F44336',
  }

  const modalStyles = {
    content: {
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
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      padding: 0,
      overflow: 'hidden',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      zIndex: 4,
    },
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', position: 'relative' }}>
      {speciesList.map((species) => (
        <SpeciesCard
          key={species.scientificName}
          species={species}
          mediaSize={mediaSize}
          handleClick={handleClick}
          backgroundColors={backgroundColors}
        />
      ))}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={modalStyles}
      >
        <ActiveSpeciesCard
          species={activeSpecies}
          mediaSize={mediaSize}
          backgroundColors={backgroundColors}
        />
      </Modal>
    </div>
  )
}
