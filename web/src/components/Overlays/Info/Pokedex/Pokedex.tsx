import { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'

import { ToggleButton } from 'src/components/Map/components/ToggleButton'
import { setFullscreenOverlay } from 'src/reducers/fullscreenOverlayReducer'

import { InfoBox } from '../InfoBox'

import { KingdomList } from './KingdomList'

const Pokedex = ({ activeProjectData, mediaSize }) => {
  const [predictedPlants, setPredictedPlants] = useState([])
  const [toggle, setToggle] = useState<'Predicted' | 'Measured'>('Predicted')
  // const [speciesData, setSpeciesData] = useState([])

  const dispatch = useDispatch()

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
        setPredictedPlants(plantList)
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
        <ToggleButton
          active={toggle}
          setToggle={setToggle}
          options={['Predicted', 'Measured']}
          mediaSize={mediaSize}
        />
        {toggle == 'Predicted' ? (
          <div>
            {predictedPlants?.length > 0 && (
              <div>
                <h2>Plants</h2>
                <KingdomList
                  speciesList={predictedPlants.slice(0, 3)}
                  mediaSize={mediaSize}
                />
                <button
                  onClick={() =>
                    openOverlay('KingdomList', {
                      speciesList: predictedPlants,
                      mediaSize: mediaSize,
                    })
                  }
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
                  See more Plants
                </button>
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </InfoBox>
  )
}
export default Pokedex
