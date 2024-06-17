import { useEffect, useState } from 'react'

import Modal from 'react-modal'

import { KingdomList } from './KingdomList'
export const RestorPredictions = ({ activeProjectData, mediaSize }) => {
  const [loading, setLoading] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [speciesList, setSpecies] = useState([])

  Modal.setAppElement('#redwood-app')

  const openModal = (speciesList) => {
    setSpecies(speciesList)
    setModalIsOpen(true)
  }

  useEffect(() => {
    const getPlantsList = async () => {
      try {
        const filename =
          activeProjectData.project.name.split(' ').join('-').toLowerCase() +
          '.json'
        const response = await fetch(
          `${process.env.AWS_STORAGE}/restor/${filename}`
        )
        const data = await response.json()
        // Display plants with images first
        const hasImage = (obj) => obj.awsUrl && obj.awsUrl.trim() !== ''
        const plantList = data.items.sort((a, b) => {
          if (hasImage(a) === hasImage(b)) {
            return 0
          }
          return hasImage(a) ? -1 : 1
        })
        setSpecies(plantList)
      } catch (e) {
        console.log(e)
        setLoading(false)
      }
    }
    if (activeProjectData) {
      getPlantsList()
    }
  }, [activeProjectData])

  Modal.setAppElement('#redwood-app')

  return (
    <div>
      <div>
        <h1>Restor Plant Predictions</h1>

        {loading ? (
          <p>Loading...</p>
        ) : speciesList.length > 0 ? (
          <div>
            <KingdomList
              speciesList={speciesList.slice(0, 3)}
              mediaSize={mediaSize}
            />
            <button
              onClick={() => openModal(speciesList)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#0070f3',
                cursor: 'pointer',
                fontSize: '16px',
                marginTop: '8px',
                padding: '0',
                textDecoration: 'underline',
              }}
            >
              See more plants
            </button>
          </div>
        ) : (
          <p>No species found</p>
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
      >
        <KingdomList speciesList={speciesList} mediaSize={mediaSize} />
      </Modal>
    </div>
  )
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    width: '80%',
    height: '80%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    scrollbarColor: 'rgba(0, 0, 0, 0.6) transparent',
    overflow: 'auto',
    '::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      borderRadius: '10px',
    },
    '::-webkit-scrollbar-track': {
      background: 'rgba(0, 0, 0, 0.6)',
    },
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 3,
  },
}
