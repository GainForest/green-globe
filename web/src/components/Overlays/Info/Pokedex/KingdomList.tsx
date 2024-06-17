import { useState } from 'react'

import Modal from 'react-modal'

import { breakpoints } from 'src/constants'

import { ActiveSpeciesCard } from './ActiveSpeciesCard'
import { SpeciesCard } from './SpeciesCard'
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
    LC: '#388E3C',
    EN: '#FFA000',
    VU: '#F57C00',
    CR: '#D32F2F',
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
          : '300px',
      height:
        mediaSize > breakpoints.xl || mediaSize > breakpoints.m
          ? '300px'
          : '300px',

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
