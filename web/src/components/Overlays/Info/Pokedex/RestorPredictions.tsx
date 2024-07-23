import { useEffect, useState } from 'react'

import Modal from 'react-modal'
import { useSelector } from 'react-redux'

import { toKebabCase } from 'src/utils/toKebabCase'

import { KingdomList } from './KingdomList'

interface Trait {
  barkThickness: number
  rootDepth: number
  stemConduitDiameter: number
  stemDiameter: number
  treeHeight: number
  woodDensity: number
}
interface Plant {
  key: string
  scientificName: string
  iucnTaxonId: number
  iucnCategory: string
  group: string
  edibleParts: string[]
  traits: Trait[]
}

export const RestorPredictions = ({ activeProjectData, mediaSize }) => {
  const [loading, setLoading] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [treeList, setTreeList] = useState<Plant[]>([])
  const [herbList, setHerbList] = useState<Plant[]>([])
  const [modalWidth, setModalWidth] = useState(0)
  const [modalList, setModalList] = useState<Plant[]>([])

  const kebabCasedProjectName = useSelector((state: any) =>
    toKebabCase(state.project.name)
  )
  Modal.setAppElement('#redwood-app')

  const openModal = (speciesList) => {
    setModalList(speciesList)
    setModalIsOpen(true)
  }

  useEffect(() => {
    // 144 is the width of the species card, 4 is the margin, and 72 is the width of the modal border
    const itemsPerRow = Math.floor(mediaSize / (144 + 4))
    setModalWidth(itemsPerRow * (144 + 4) - 72)
  }, [mediaSize])

  useEffect(() => {
    const getPlantsList = async (type, setter) => {
      try {
        const filename = `${kebabCasedProjectName}-${type}.json`
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
          .map((d) => ({ ...d, category: type }))
        setter(plantList)
      } catch (e) {
        console.log(e)
        setLoading(false)
      }
    }
    if (activeProjectData) {
      getPlantsList('trees', setTreeList)
      getPlantsList('herbs', setHerbList)
    }
  }, [activeProjectData, kebabCasedProjectName])

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

  const Prediction = ({ type, speciesList }) => (
    <div>
      <div>
        <h2>Predicted {type}</h2>

        {loading ? (
          <p>Loading...</p>
        ) : speciesList?.length > 0 ? (
          <div>
            <p className="text-lg font-semibold mb-2">
              🌿 Total {type} predicted: {speciesList.length}
            </p>
            <KingdomList
              speciesList={speciesList.slice(0, 4)}
              mediaSize={mediaSize}
            />
            <button
              onClick={() => openModal(speciesList)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#669629',
                cursor: 'pointer',
                fontSize: '16px',
                marginTop: '8px',
                padding: '0',
              }}
            >
              See more plants
            </button>
          </div>
        ) : (
          <p>No species found.</p>
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
      >
        <KingdomList speciesList={modalList} mediaSize={mediaSize} />
      </Modal>
    </div>
  )
  return (
    <div>
      {treeList?.length > 0 && (
        <Prediction speciesList={treeList} type="trees" />
      )}
      {herbList?.length > 0 && (
        <Prediction speciesList={herbList} type="herbs" />
      )}
    </div>
  )
}
