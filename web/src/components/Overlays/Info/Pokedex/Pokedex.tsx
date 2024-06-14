import { useEffect, useState } from 'react'

import Modal from 'react-modal'
import { useDispatch } from 'react-redux'

import { setFullscreenOverlay } from 'src/reducers/fullscreenOverlayReducer'

import { InfoBox } from '../InfoBox'

import { KingdomList } from './KingdomList'

const Pokedex = ({ activeProjectData, mediaSize }) => {
  // const [speciesData, setSpeciesData] = useState([])
  const [allKingdoms, setAllKingdoms] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [species, setSpecies] = useState([])
  const dispatch = useDispatch()

  Modal.setAppElement('#redwood-app')

  const openModal = (speciesList) => {
    setModalIsOpen(true)
    setSpecies(speciesList)
  }

  const openOverlay = (component, props) => {
    dispatch(
      setFullscreenOverlay({
        source: null,
        type: 'component',
        component: component,
        props: props,
        active: true,
      })
    )
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
        setAllKingdoms([...allKingdoms, { name: 'Plants', data: plantList }])
      } catch (e) {
        console.log(e)
      }
    }
    if (activeProjectData) {
      getPlantsList()
    }
  }, [activeProjectData])

  // useEffect(() => {
  //   const getSpeciesData = async () => {
  //     const res = await Promise.all(
  //       speciesList.map((species) =>
  //         fetch(`${process.env.AWS_STORAGE}/restor/${species.name}.json`)
  //       )
  //     )
  //     setSpeciesData(res)
  //   }
  //   getSpeciesData()
  // }, [speciesList])

  return (
    <InfoBox mediaSize={mediaSize}>
      <div style={{ margin: '16px 24px' }}>
        <h1>Pokedex</h1>
        <div>
          {allKingdoms.map((kingdom) => (
            <div key={kingdom.name}>
              <h2>{kingdom.name}</h2>
              <KingdomList
                speciesList={kingdom.data.slice(0, 3)}
                mediaSize={mediaSize}
              />
              <button
                onClick={() => openModal(kingdom.data)}
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
                See more {kingdom.name.toLowerCase}
              </button>
            </div>
          ))}
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={customStyles}
        >
          <KingdomList speciesList={species} mediaSize={mediaSize} />
        </Modal>
      </div>
    </InfoBox>
  )
}

export default Pokedex

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    width: '80%',
    maxWidth: '800px',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: 'black',
    overflowY: 'auto',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
}
