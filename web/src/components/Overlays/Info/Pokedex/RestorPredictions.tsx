import { useEffect, useState } from 'react'

import Modal from 'react-modal'

import { KingdomList } from './KingdomList'
export const RestorPredictions = ({ activeProjectData, mediaSize }) => {
  const [loading, setLoading] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [speciesList, setSpecies] = useState([])
  const [modalWidth, setModalWidth] = useState(0)

  Modal.setAppElement('#redwood-app')

  const openModal = (speciesList) => {
    setSpecies(speciesList)
    setModalIsOpen(true)
  }

  useEffect(() => {
    // 144 is the width of the species card, 4 is the margin, and 72 is the width of the modal border
    const itemsPerRow = Math.floor(mediaSize / (144 + 4))
    setModalWidth(itemsPerRow * (144 + 4) - 72)
  }, [mediaSize])

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
        const plantList = data.items
          .sort((a, b) => {
            if (hasImage(a) === hasImage(b)) {
              return 0
            }
            return hasImage(a) ? -1 : 1
          })
          .map((d) => ({ ...d, category: 'Plant' }))
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

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      width: `${modalWidth}px`,
      height: '80%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      borderRadius: '10px',
      padding: '20px',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      scrollbarWidth: 'none',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      zIndex: 3,
    },
  }

  return (
    <div>
      {' '}
      <div>
        <h1 style={{ marginLeft: '16px' }}>Plant Predictions</h1>

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
