import { useEffect, useState } from 'react'

import * as d3 from 'd3'
import Modal from 'react-modal'
import { useSelector } from 'react-redux'

import { toKebabCase } from 'src/utils/toKebabCase'

import { KingdomList } from './KingdomList'

export const Pokedex = ({ mediaSize }) => {
  const [allKingdoms, setAllKingdoms] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [species, setSpecies] = useState([])
  const [modalWidth, setModalWidth] = useState(0)
  const kebabCasedProjectName = useSelector((state: State) =>
    toKebabCase(state.project.name)
  )

  Modal.setAppElement('#redwood-app')

  const openModal = (speciesList) => {
    setSpecies(speciesList)
    setModalIsOpen(true)
  }

  useEffect(() => {
    // 144 is the width of the species card, 4 is the margin, and 78 is the width of the modal border
    const itemsPerRow = Math.floor(mediaSize / (144 + 4))
    setModalWidth(itemsPerRow * (144 + 4) - 4 - 78)
  }, [mediaSize])

  useEffect(() => {
    const getCsv = async () => {
      const data = await d3.csv(
        `${process.env.AWS_STORAGE}/observations/${kebabCasedProjectName}.csv`
      )
      const kingdoms = {}

      const uniqueSpecies = Object.values(
        data.reduce((acc, item) => {
          acc[item.scientificName] = item
          return acc
        }, {})
      )

      uniqueSpecies.forEach((d) => {
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
    }
    getCsv()
  }, [kebabCasedProjectName])

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

  if (!kebabCasedProjectName) {
    return <p>Loading....</p>
  }
  return (
    <>
      <div>
        <h2>All observations</h2>
        <p style={{ fontSize: '14px' }}>
          All species recorded in this project. Species are observed using
          various technologies, such as from eDNA samplings, audiomoth
          recordings, or insect photo traps.
        </p>
        {allKingdoms.length > 0 ? (
          <div>
            {allKingdoms.map((kingdom) => (
              <div key={kingdom.name}>
                <h2>{kingdom.name}s</h2>
                <KingdomList
                  speciesList={kingdom.data.slice(0, 4)}
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
                  See {kingdom.data.length - 3} more{' '}
                  {kingdom.name.toLowerCase()}s
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', marginTop: '16px' }}>
            No species found.
          </p>
        )}
      </div>
      <Modal
        key={modalWidth}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
      >
        <KingdomList speciesList={species} mediaSize={mediaSize} />
      </Modal>
    </>
  )
}
