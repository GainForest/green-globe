import { useEffect, useState } from 'react'

import * as d3 from 'd3'
import Modal from 'react-modal'

import { KingdomList } from './KingdomList'

export const Pokedex = ({ mediaSize }) => {
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
    //   const updateKingdoms = (newKingdom) => {
    //     const index = allKingdoms.findIndex(
    //       (kingdom) => kingdom.name === newKingdom.name
    //     )
    //     if (index >= 0) {
    //       setAllKingdoms((allKingdoms) =>
    //         allKingdoms.map((kingdom, idx) =>
    //           idx === index ? newKingdom : kingdom
    //         )
    //       )
    //     } else {
    //       setAllKingdoms((allKingdoms) => [...allKingdoms, newKingdom])
    //     }
    //     setLoading(false)
    //   }

    const getCsv = async () => {
      const data = await d3.csv(
        `${process.env.AWS_STORAGE}/observations/semifinals.csv`
      )
      const kingdoms = {}

      data.forEach((d) => {
        let kingdom
        if (d.kingdom === 'Plantae') {
          kingdom = 'Plant'
        } else if (d.phylum === 'Arthropoda') {
          kingdom = 'Insect'
        } else kingdom = 'Animal'

        if (!kingdoms[kingdom]) {
          kingdoms[kingdom] = []
        }
        kingdoms[kingdom].push({ ...d, category: kingdom })
      })
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
    <>
      <div>
        <h1>Observations</h1>
        {loading ? (
          <p>Loading...</p>
        ) : allKingdoms.length > 0 ? (
          <div>
            {allKingdoms.map((kingdom) => (
              <div key={kingdom.name}>
                <h2>{kingdom.name}s</h2>
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
                  See more {kingdom.name.toLowerCase()}s
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
    </>
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
    scrollbarWidth: 'none',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 3,
  },
}
