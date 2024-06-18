import { useState, useEffect } from 'react'

import Modal from 'react-modal'

import { breakpoints } from 'src/constants'

import { ActiveSpeciesCard } from './ActiveSpeciesCard'
import { SpeciesCard } from './SpeciesCard'
export const KingdomList = ({ speciesList = [], mediaSize }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [activeSpecies, setActiveSpecies] = useState(null)

  Modal.setAppElement('#redwood-app')

  const handleClick = (species) => {
    setActiveSpecies(species)
    setModalIsOpen(true)
  }

  useEffect(() => {
    if (activeSpecies) {
      setModalIsOpen(true)
    } else {
      setModalIsOpen(false)
    }
  }, [activeSpecies])

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

  if (speciesList?.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', position: 'relative' }}>
      {speciesList.map((species, idx) => (
        <SpeciesCard
          key={species.scientificName + idx}
          species={species}
          mediaSize={mediaSize}
          handleClick={handleClick}
        />
      ))}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={modalStyles}
      >
        <ActiveSpeciesCard species={activeSpecies} mediaSize={mediaSize} />
      </Modal>
    </div>
  )
}
