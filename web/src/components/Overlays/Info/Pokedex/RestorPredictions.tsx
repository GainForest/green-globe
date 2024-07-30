import { useEffect, useState } from 'react'

import Modal from 'react-modal'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { toKebabCase } from 'src/utils/toKebabCase'

import { RestorLogo } from '../RestorCard/RestorCard'

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
  const [loading, setLoading] = useState(true)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [nativeTreeList, setNativeTreeList] = useState<Plant[]>([])
  const [nativeHerbList, setNativeHerbList] = useState<Plant[]>([])
  const [invasiveTreeList, setInvasiveTreeList] = useState<Plant[]>([])
  const [invasiveHerbList, setInvasiveHerbList] = useState<Plant[]>([])
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
    const getPlantsList = async (type, nativeSetter, invasiveSetter) => {
      try {
        const filename = `${kebabCasedProjectName}-${type}.json`
        const response = await fetch(
          `${process.env.AWS_STORAGE}/restor/${filename}`
        )
        const data = await response.json()
        console.log(data)
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
        console.log(plantList)
        const invasive = plantList.filter((plant) => plant.group == 'INVASIVE')
        const native = plantList.filter((plant) => plant.group != 'INVASIVE')
        nativeSetter(native)
        invasiveSetter(invasive)
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
    if (activeProjectData) {
      getPlantsList('trees', setNativeTreeList, setInvasiveTreeList)
      getPlantsList('herbs', setNativeHerbList, setInvasiveHerbList)
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
              See more {type}
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

  useEffect(() => {
    console.log(nativeHerbList)
  }, [nativeHerbList])

  useEffect(() => {
    console.log(invasiveHerbList)
  }, [invasiveHerbList])

  useEffect(() => {
    console.log(nativeTreeList)
  }, [nativeTreeList])

  useEffect(() => {
    console.log(invasiveTreeList)
  }, [invasiveTreeList])
  if (loading) {
    return <Loading />
  }

  if (!loading && nativeTreeList.length == 0 && nativeHerbList.length == 0) {
    return <NoData />
  }

  return (
    <div>
      {nativeTreeList?.length > 0 && (
        <Prediction speciesList={nativeTreeList} type="native trees" />
      )}
      {nativeHerbList?.length > 0 && (
        <Prediction speciesList={nativeHerbList} type="native herbs" />
      )}
      {invasiveTreeList?.length > 0 && (
        <Prediction speciesList={invasiveTreeList} type="invasive trees" />
      )}
      {invasiveHerbList?.length > 0 && (
        <Prediction speciesList={invasiveHerbList} type="invasive herbs" />
      )}
      <Footer>
        <span>API provided by</span>
        <LogoLink
          href="https://restor.eco"
          target="_blank"
          rel="noopener noreferrer"
        >
          <RestorLogo />
        </LogoLink>
      </Footer>
    </div>
  )
}

const Loading = () => <Container>Loading...</Container>

const NoData = () => <Container>No species found.</Container>

const Container = styled.div`
  margin: 16px 0px;
`
const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 8px 16px;
  margin-top: 16px;
  border-top: 1px solid #e0e0e0;
  font-size: 12px;
  color: #666;
`

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  margin-left: 8px;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(102, 150, 41, 0.1);
  }
`
