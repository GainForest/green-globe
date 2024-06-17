import { useEffect, useState } from 'react'

import * as d3 from 'd3'
import Modal from 'react-modal'

import { InfoBox } from '../InfoBox'

import { KingdomList } from './KingdomList'

const Pokedex = ({ mediaSize }) => {
  const [allKingdoms, setAllKingdoms] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [species, setSpecies] = useState([])
  const [loading, setLoading] = useState(true)

  Modal.setAppElement('#redwood-app')

  const openModal = (speciesList) => {
    setSpecies(speciesList)
    setModalIsOpen(true)
  }

  useEffect(() => {
    const updateKingdoms = (newKingdom) => {
      const index = allKingdoms.findIndex(
        (kingdom) => kingdom.name === newKingdom.name
      )
      if (index >= 0) {
        setAllKingdoms((allKingdoms) =>
          allKingdoms.map((kingdom, idx) =>
            idx === index ? newKingdom : kingdom
          )
        )
      } else {
        setAllKingdoms((allKingdoms) => [...allKingdoms, newKingdom])
      }
      setLoading(false)
    }

    const getCsv = async () => {
      const data = await d3.csv(
        `${process.env.AWS_STORAGE}/observations/semifinals.csv`
      )
      const kingdoms = {}

      data.forEach((d) => {
        const kingdom = d.kingdom
        if (!kingdoms[kingdom]) {
          kingdoms[kingdom] = []
        }
        kingdoms[kingdom].push(d)
      })
      // turn kingdoms into an array of objects
      const kingdomsArray = Object.entries(kingdoms).map(([name, data]) => ({
        name,
        data,
      }))
      setAllKingdoms(kingdomsArray)
      setLoading(false)
      console.log(kingdomsArray)
    }
    getCsv()
  }, [])

  return (
    <InfoBox mediaSize={mediaSize}>
      <div style={{ margin: '16px 24px' }}>
        <h1>Pokedex</h1>
        {loading ? (
          <p>Loading...</p>
        ) : allKingdoms.length > 0 ? (
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
                  See more {kingdom.name.toLowerCase()}
                </button>
              </div>
            ))}
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
        <KingdomList speciesList={species} mediaSize={mediaSize} />
      </Modal>
    </InfoBox>
  )
}

export default Pokedex

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
    scrollbarWidth: 'none',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 3,
  },
}
